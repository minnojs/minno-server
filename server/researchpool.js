const PoolStudyController = require('./data_server/controllers/poolStudyController');
const DemographicsStudyController = require('./data_server/controllers/demographicsController');
const studyController = require('./data_server/controllers/controller');
const PI_notifications = require('./PI_notifications');
const legalStudyStatus = {
    completed: true,
    started: true
}
let arrayOfPoolStudies = null;
const loadPoolStudies = async function() {
    let autopause = false;
    if (!arrayOfPoolStudies) {
        autopause = true;
    }
    arrayOfPoolStudies = await PoolStudyController.getAllPoolStudies();
    if (autopause) {
        exports.runAutopause();
        setInterval(exports.runAutopause, 1000 * 60 * 60);
    }

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
exports.runAutopause = async function() {
    if (!arrayOfPoolStudies) {
        await loadPoolStudies();
    }
    for (let poolStudy of arrayOfPoolStudies) {
        if (poolStudy.study_status != 'running') {
            continue;
        }
        const params = {
            poolId: poolStudy._id
        };
        let completions = await studyController.getExperimentStatusCount(params);
        let completesObject = {
            startedSessions: 0
        };
        for (let x = 0; x < completions.length; x++) {
            completesObject[completions[x]._id] = completions[x].total;
        }
        let updateObject = {};
        if (completesObject.started) {
            if (completesObject.completed) {
                completesObject.started += completesObject.completed;

            }
			else
			{
				completesObject.completionRate=0;
			}
            completesObject.startedSessions += completesObject.started;
            updateObject.starts = completesObject.started;
        }
        if (completesObject.completed) {
            updateObject.completes = completesObject.completed;
            completesObject.startedSessions += completesObject.completed;
            if (completesObject.started) {
                completesObject.completionRate = completesObject.completed / (completesObject.startedSessions);
            } else {
                completesObject.completionRate = 1
            }

        }
        if (Object.keys(updateObject).length === 0) {
            continue;
        }
        await exports.updateStudyPool(poolStudy._id, updateObject);
        if (completesObject.completed && poolStudy.target_number && completesObject.completed >= poolStudy.target_number) {
            PI_notifications.update_status(poolStudy.deploy_id, 'auto-paused', 'Something');
            await exports.pauseStudyPool(poolStudy._id);
            continue;
        }
        if (completesObject != {
                startedSessions: 0
            } && poolStudy.pause_rules && poolStudy.pause_rules.comparator && RulesComparator[poolStudy.pause_rules.comparator](poolStudy.pause_rules, completesObject)) {
            PI_notifications.update_status(poolStudy.deploy_id, 'auto-paused', 'Something');
            await exports.pauseStudyPool(poolStudy._id);
            continue;
        }
    }
}
const checkAutopause = function(poolStudy, completesObject) {
    if (completesObject.completed && completesObject.completed >= poolStudy.target_number) {
        return true;
    }
    if (poolStudy.pause_rules && poolStudy.pause_rules.comparator && RulesComparator[poolStudy.pause_rules.comparator](poolStudy.pause_rules, completesObject)) {
        return true;
    }
    return false;
}
exports.addPoolStudy = async function(deploy) {
    if (!arrayOfPoolStudies) {
        await loadPoolStudies();
    }
    //console.log(deploy);
    //console.log("insert");
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
}
exports.pauseStudyPool = async function(study_id) {
    let params = {
        study_status: "paused"
    };
    return await exports.updateStudyPool(study_id, params);
}
exports.unpauseStudyPool = async function(study_id) {
    let params = {
        study_status: "running"
    };
    return await exports.updateStudyPool(study_id, params);
}
exports.removeStudyPool = async function(study_id) {
    let params = {
        _id: study_id
    };
    return await removePoolStudy(params);
}
updatePoolStudy = async function(change_request) {
    if (!change_request || Object.keys(change_request).length < 2 || !change_request._id) {
        return;
    }
    let newPoolStudy = await PoolStudyController.updatePoolStudy(change_request);
    if (newPoolStudy) {
        updateRunningStudies(newPoolStudy);
    }
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
    let user_demographics = await DemographicsStudyController.getUserDemographics(registration_id);
    if (!user_demographics) {
        return Promise.reject({
            status: 200,
            message: 'No studies available.'
        });
    }

    let previousStudies = await studyController.getExperimentCountByRegistrationId(registration_id);
    let legalStudies = [];
    for (const element of arrayOfPoolStudies) {
        if (previousStudies[element._id] && !element.multiple_sessions) {
            continue;
        }
        if (element.rules && element.rules.comparator && RulesComparator[element.rules.comparator](element.rules, user_demographics)) {
            legalStudies.push(element);
        } else if (element && element.priority) {
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
    if (RulesComparator[rules.comparator](rules, target)) {
        return true;
    } else {
        return false;
    }
};
exports.updateExperimentStatus = async function(sessionId, status, res) {
    if (!legalStudyStatus[status]) {
        res.status(500).json({
            message: "missing or illegal study status"
        });
        return;
    }
    if (!sessionId || sessionId < 0) {
        res.status(500).json({
            message: "missing or illegal sessionId"
        });
        return;
    }
    let params = {
        sessionId: sessionId,
        status: status
    };
    try {
        let result = await studyController.updateExperimentStatus(params);
        res.status(200).json({
            message: "success"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

function maybeNumber(string)
{
	let result=Number(string);
	if(result!=NaN)
	{
		return result;
	}
	else
	{
		return string;
	}
}

const RulesComparator = {
    '>': function(element, participant) {
        return maybeNumber(participant[element.field]) > maybeNumber(element.value);
    },
    '>=': function(element, participant) {
        return maybeNumber(participant[element.field]) >= maybeNumber(element.value);
    },
    '<': function(element, participant) {
        return maybeNumber(participant[element.field]) < maybeNumber(element.value);
    },
    '<=': function(element, participant) {
        return maybeNumber(participant[element.field]) <= maybeNumber(element.value);
    },
    '==': function(element, participant) {
        return maybeNumber(element.value) == maybeNumber(participant[element.field]);
    },
    '!=': function(element, participant) {
        return !(maybeNumber(element.value) == maybeNumber(participant[element.field]));
    },
    '&': function(array, participant) {
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
    '|': function(array, participant) {
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
