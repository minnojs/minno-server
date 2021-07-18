const PoolStudyController = require('./data_server/controllers/poolStudyController');
const DemographicsStudyController = require('./data_server/controllers/demographicsController');
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
		try{
	    await exports.runAutopause();}
			catch(e)
			{
				console.log(e);
			}
		
	    setInterval(exports.runAutopause, 1000 * 60 * 60);
		autopauseRunning=true;
		console.log("autotest");
};
    
exports.runAutopause = async function() {
    let arrayOfPoolStudies=await Pool.getPoolStudies();
	console.log(arrayOfPoolStudies);
    for (let poolStudy of arrayOfPoolStudies) {
        if (poolStudy.study_status != 'running') {
            continue;
        }
        const params = {
            poolId: poolStudy._id
        };
		console.log("paramsA");
		console.log(poolStudy);
		console.log(params);
        let completions = await studyController.getExperimentStatusCount(params);
        let completesObject = {
            startedSessions: 0,
			completionRate : 0
        };
		console.log(completions);
        for (let x = 0; x < completions.length; x++) {
            completesObject[completions[x]._id] = completions[x].total;
        }
        let updateObject = {};
        if (completesObject.started) {
            completesObject.startedSessions += completesObject.started;
        }
		console.log(completesObject);
        if (completesObject.completed) {
            updateObject.completes = completesObject.completed;
            completesObject.started+= completesObject.completed;
            if (completesObject.started) {
                completesObject.completionRate = completesObject.completed / (completesObject.started);
            } else {
                completesObject.completionRate = 1
            }
        }
		updateObject.starts = completesObject.started;
        if (Object.keys(updateObject).length === 0) {
            continue;
        }
		//const researchPool=require('./researchpool');
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
}
const checkAutopause = function(poolStudy, completesObject) {
    if (completesObject.completed && completesObject.completed >= poolStudy.target_number) {
        return true;
    }
    if (poolStudy.pause_rules && poolStudy.pause_rules.comparator && Rules.RulesComparator[poolStudy.pause_rules.comparator](poolStudy.pause_rules, completesObject)) {
        return true;
    }
    return false;
}