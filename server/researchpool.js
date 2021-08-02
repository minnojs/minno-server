const PoolStudyController = require('./data_server/controllers/poolStudyController');
const DemographicsStudyController = require('./data_server/controllers/demographicsController');
const studyController = require('./data_server/controllers/controller');
const Rules=require('./researchrules');
const legalStudyStatus = {
    completed: true,
    started: true
};
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
    /*for(let study of arrayOfPoolStudies)
	    {
	        await removePoolStudy(study);
	    }*/
    return arrayOfPoolStudies;
};
async function updatePoolStudy(change_request) {
    if (!change_request || Object.keys(change_request).length < 2 || !change_request._id) {
        return;
    }
    let newPoolStudy = await PoolStudyController.updatePoolStudy(change_request);
    if (newPoolStudy) {
        updateRunningStudies(newPoolStudy);
    }
}
exports.addPoolStudy = async function(deploy) {
    if (!arrayOfPoolStudies) {
        await loadPoolStudies();
    }
    if (deploy.running_id) {
        for (let x = 0; x < arrayOfPoolStudies.length; x++) {
            if (arrayOfPoolStudies[x].deploy_id == deploy.deploy_id) { //update instead of insert if running_id exists
                deploy.poolId = arrayOfPoolStudies[x]._id;
                return await updatePoolStudy(deploy);
            }
        }
    }
    let newPoolStudy = await PoolStudyController.insertPoolStudy(deploy);
    arrayOfPoolStudies.push(newPoolStudy);
};

exports.updateStudyPool = async function(study_id, params) {
    params._id = study_id;
    return await updatePoolStudy(params);
};
exports.pauseStudyPool = async function(study_id) {
    let params = {
        study_status: 'paused'
    };
    return await exports.updateStudyPool(study_id, params);
};
exports.unpauseStudyPool = async function(study_id) {
    let params = {
        study_status: 'running'
    };
    return await exports.updateStudyPool(study_id, params);
};
async function removePoolStudy(poolStudy) {
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
}
exports.removeStudyPool = async function(study_id) {
    let params = {
        _id: study_id
    };
    return await removePoolStudy(params);
};


function updateRunningStudies(newStudy) {
    for (let x = 0; x < arrayOfPoolStudies.length; x++) {
        if (arrayOfPoolStudies[x]._id == newStudy._id) {
            arrayOfPoolStudies.splice(x, 1);
            break;
        }
    }
    if (newStudy.study_status) {
        arrayOfPoolStudies.push(newStudy);
        return true;
    }
}

exports.assignStudy = async function(registration_id) {
    if (!arrayOfPoolStudies) {
        await loadPoolStudies();
    }
    let user_demographics = await DemographicsStudyController.getUserDemographics(registration_id);
    if (!user_demographics) { //TODO: maybe send them to fill out demographics?
        return Promise.reject({
            status: 200,
            message: 'No studies available.'
        });
    }

    let previousStudies = await studyController.getExperimentCountByRegistrationId(registration_id);
    let legalStudies = [];
	user_demographics['takenStudies']=previousStudies;
	console.log(previousStudies);
    for (const element of arrayOfPoolStudies) {
        if (element.study_status != 'running') {
            continue;
        }
        if (previousStudies[element._id] && !element.multiple_sessions) {
            continue;
        }
        if (element && element.rules && element.rules.comparator ) {
			if(Rules.RulesComparator[element.rules.comparator](element.rules, user_demographics)){
        		legalStudies.push(element);}
		
        } else if (element && element.priority ) {
            legalStudies.push(element); //study without rules gets assigned to everyone
        }
    }

    if (legalStudies.length == 0) {
        return Promise.reject({
            status: 200,
            message: 'No studies available.'
        });
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
    if (result == null) {
        return Promise.reject({
            status: 200,
            message: 'No studies available.'
        });
    }
    // if (!result.experiment_file)
    //
    //     {
    //         console.log(result);
    //
    //         // console.log(result);
    //
    //     }
    return {
        experiment_file: result.experiment_file.id,
        version_hash: result.version_hash,
        pool_id: result._id
    };
    // else {
    //     res.redirect('/launch/' + result.experiment_file.id + '/' + result.version_hash + '/' + registration_id);
    // }
};
exports.checkRules = function(target, rules) {
    if (Rules.RulesComparator[rules.comparator](rules, target)) {
        return true;
    } else {
        return false;
    }
};
exports.updateExperimentStatus = async function(sessionId, status, res) {
    if (!legalStudyStatus[status]) {
        res.status(500).json({
            message: 'missing or illegal study status'
        });
        return;
    }
    if (!sessionId || sessionId < 0) {
        res.status(500).json({
            message: 'missing or illegal sessionId'
        });
        return;
    }
    let params = {
        sessionId: sessionId,
        status: status
    };
    try {
        await studyController.updateExperimentStatus(params);
        res.status(200).json({
            message: 'success'
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};