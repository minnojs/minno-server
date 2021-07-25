const studyController = require('./data_server/controllers/controller');
const PI_notifications = require('./PI_notifications');
const Pool= require('./researchpool');
const PI_API = require('./PI');
const Rules=require('./researchrules');
let autopauseRunning=false;
exports.startAutopause= async function(){
    if(autopauseRunning)
    {
        return;
    }
	    await exports.runAutopause();	
	    setInterval(exports.runAutopause, 1000 * 60 * 60);
    autopauseRunning=true;
};
    
exports.runAutopause = async function() {
    let arrayOfPoolStudies=await Pool.getPoolStudies();
	let arrayCopy=[...arrayOfPoolStudies];
    for (let poolStudy of arrayCopy) {
        if (poolStudy.study_status != 'running') {
            continue;
        }
        let params = {
            poolId: poolStudy._id
        };
        let completions = await studyController.getExperimentStatusCount(params);
        let completesObject = {
            startedSessions: 0,
            completedSessions:0,
            completionRate : 0
        };
        for (let x = 0; x < completions.length; x++) {
            completesObject[completions[x]._id] = completions[x].total;
        }
        let updateObject = {};
        if (completesObject.started) {
            completesObject.startedSessions += completesObject.started;
        }
        if (completesObject.completed) {
            updateObject.completes = completesObject.completed;
            completesObject.startedSessions+= completesObject.completed;
            if (completesObject.startedSessions>0) {
                completesObject.completionRate = completesObject.completed / (completesObject.startedSessions);
            } else {
                completesObject.completionRate = 1;
            }
        }
        updateObject.starts = completesObject.startedSessions;
        if (Object.keys(updateObject).length === 0) {
            continue;
        }
        await Pool.updateStudyPool(poolStudy._id, updateObject);
        if (completesObject.completed && poolStudy.target_number && completesObject.completed >= poolStudy.target_number) {
            PI_notifications.update_status(poolStudy.deploy_id, 'auto-paused', 'Target completions reached');
            await PI_API.pause_study(poolStudy.deploy_id, 'paused');
            continue;
        }
        if (completesObject != {
            startedSessions: 0
        } && poolStudy.pause_rules && poolStudy.pause_rules.comparator && Rules.RulesComparator[poolStudy.pause_rules.comparator](poolStudy.pause_rules, completesObject)) {
            PI_notifications.update_status(poolStudy.deploy_id, 'auto-paused', 'Low completion rate');
            await PI_API.pause_study(poolStudy.deploy_id, 'paused');
            continue;
        }
    }
};
