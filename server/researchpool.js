const PoolStudyController = require('./data_server/controllers/poolStudyController');
const DemographicsStudyController = require('./data_server/controllers/demographicsController');

let arrayOfPoolStudies = null;
const loadPoolStudies = async function() {
    arrayOfPoolStudies = await PoolStudyController.getAllPoolStudies();
};
exports.setPoolStudies = function(array_of_poolstudies) {
    arrayOfPoolStudies = array_of_poolstudies;
};
exports.getPoolStudies = async function() {
    if (!arrayOfPoolStudies) {
        await loadPoolStudies();
    }
    return arrayOfPoolStudies;
};
exports.addPoolStudy = async function(deploy) {
    if (!arrayOfPoolStudies) {
        await loadPoolStudies();
    }
	//console.log(deploy);
	//console.log("insert");
	if(deploy.running_id){
    for (let x = 0; x < arrayOfPoolStudies.length; x++) {
        if (arrayOfPoolStudies[x].deploy_id == deploy.deploy_id) { //update instead of insert if running_id exists
			deploy.poolId=arrayOfPoolStudies[x]._id;
			return await updatePoolStudy(deploy);	
		}
	}
    }
    let newPoolStudy = await PoolStudyController.insertPoolStudy(deploy);
    arrayOfPoolStudies.push(newPoolStudy);
};
exports.updateStudyPool= async function(study_id, params)
{
	params._id=study_id;
	return await updatePoolStudy(params);
}
exports.pauseStudyPool= async function(study_id)
{
	let params={study_status:"paused"};
	exports.updateStudyPool(study_id,params);
}
exports.unpauseStudyPool= async function(study_id)
{
	let params={study_status:"running"};
	exports.updateStudyPool(study_id,params);
}
exports.removeStudyPool= async function(study_id)
{
	let params={_id:study_id};
	removePoolStudy(params);
}
updatePoolStudy = async function(change_request) {
	//console.log(change_request);
	//console.log("change");
    let newPoolStudy=await PoolStudyController.updatePoolStudy(change_request);
	updateRunningStudies(newPoolStudy);
};
function updateRunningStudies(newStudy)
{
    for (let x = 0; x < arrayOfPoolStudies.length; x++) {
        if (arrayOfPoolStudies[x]._id == newStudy._id) {
			arrayOfPoolStudies.splice(x, 1);
			break;
		}
	}
			if(newStudy.study_status)
			{
				arrayOfPoolStudies.push(newStudy);	
				return true;
			}	
}
removePoolStudy = async function(poolStudy) {
    if (!arrayOfPoolStudies) {
        await loadPoolStudies();
    }
    for (let x = 0; x < arrayOfPoolStudies.length; x++) {
        if (arrayOfPoolStudies[x]._id == poolStudy._id) {
            arrayOfPoolStudies.splice(x, 1);
            await PoolStudyController.deletePoolStudy(poolStudy);
            return true;
        }
    }
    return false;
};
exports.assignStudy = async function(registration_id) {

    if (!arrayOfPoolStudies) {
        await loadPoolStudies();
    }
    let user_demographics = DemographicsStudyController.getUserDemographics(registration_id);
    let legalStudies = [];
    for (const element of arrayOfPoolStudies) {
        if (element && element.comparator && RulesComparator[element.comparator](element, user_demographics)) {
            legalStudies.push(element);
        } else if (element && element.priority) {
            legalStudies.push(element); //study without rules gets assigned to everyone
        }
    }

    if (legalStudies.length == 0) {
        console.log('No studies available');
        return Promise.reject({status: 200, message: 'No studies available.'});
}
    let totalPriority = 0;
    for (const element of legalStudies) {
        let priority = element.priority;
        if (Number.isInteger(priority)) {
            totalPriority += priority;
        }
    }

    let randValue = Math.floor(Math.random() * totalPriority) + 1;
    let result = null;
    for (const element of legalStudies) {
        let priority = element.priority;
        if (Number.isInteger(priority)) {
            randValue -= priority;
            if (randValue <= 0) {
                result = element;
                break;
            }
        }
    }
    if (result == null){
        console.log('No studies available');
        return Promise.reject({status:200, message:'No studies available.'});
    }
    // if (!result.experiment_file)
    //
    //     {
    //         console.log('bang!');
    //
    //         // console.log(result);
    //         return this.removeStudyPool(result._id);
    //
    //     }
    return {experiment_file: result.experiment_file.id, version_hash: result.version_hash};
    // else {
    //     res.redirect('/launch/' + result.experiment_file.id + '/' + result.version_hash + '/' + registration_id);
    // }

};
exports.checkRules = function(target, rules) {
    if (RulesComparator[rules.comparator](rules, target)) {
        return true;
    } else {
        return false;
    }
};



const RulesComparator = {
    '>': function(element, participant) {
        return participant[element.field] > element.value;
    },
    '>=': function(element, participant) {
        return participant[element.field] >= element.value;
    },
    '<': function(element, participant) {
        return participant[element.field] < element.value;
    },
    '<=': function(element, participant) {
        return participant[element.field] <= element.value;
    },
    '==': function(element, participant) {
        return element.value == participant[element.field];
    },
    '!=': function(element, participant) {
        return !(element.value == participant[element.field]);
    },
    '&&': function(array, participant) {
        if (array.data == null || array.data.length == 0) {
            return true;
        }
        for (const element of array.data) {
            if (!RulesComparator[element.comparator](element, participant)) {
                return false;
            }
        }
        return true;
    },
    '||': function(array, participant) {
        if (array.data == null || array.data.length == 0) {
            return true;
        }
        for (const element of array.data) {
            if (RulesComparator[element.comparator](element, participant)) {
                return true;
            }
        }
        return false;
    }
};
