const PoolStudyController = require('./data_server/controllers/poolStudyController');

let arrayOfPoolStudies = null;
const loadPoolStudies = async function() {
    arrayOfPoolStudies = await PoolStudyController.getRunningPoolStudies();
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
exports.addPoolStudy = async function(poolStudy) {
    if (!arrayOfPoolStudies) {
        await loadPoolStudies();
    }
    let newPoolStudy = await PoolStudyController.insertPoolStudy(poolStudy);
    arrayOfPoolStudies.push(newPoolStudy);
};
exports.removePoolStudy = async function(poolStudy) {
    if (!arrayOfPoolStudies) {
        await loadPoolStudies();
    }
    for (let x = 0; x < arrayOfPoolStudies.length; x++) {
        if (arrayOfPoolStudies[x] == poolStudy) {
            arrayOfPoolStudies.splice(x, 1);
            PoolStudyController.deletePoolStudy(poolStudy);
            return true;
        }
    }
    return false;
};
exports.assignStudy = async function(user_demographics) {
    if (!arrayOfPoolStudies) {
        await loadPoolStudies();
    }
    let legalStudies = [];
    for (const element of arrayOfPoolStudies) {
        if (RulesComparator[element.comparator](element, user_demographics)) {
            legalStudies.push(element);
        }
    }
    if (legalStudies.length == 0) {
        return null;
    }
    let totalPriority = 0;
    for (const element of legalStudies) {
        let priority = element.priority;
        if (Number.isInteger(priority)) {
            totalPriority += priority;
        }
    }
    let randValue = Math.floor(Math.random() * totalPriority) + 1;
    for (const element of legalStudies) {
        let priority = element.priority;
        if (Number.isInteger(priority)) {
            randValue -= priority;
            if (randValue <= 0) {
                return element;
            }
        }
    }

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
        return participant[element.field]>element.value  ;
    },
    '>=': function(element, participant) {
        return participant[element.field]>=element.value;
    },
    '<': function(element, participant) {
        return participant[element.field]<element.value  ;
    },
    '<=': function(element, participant) {
        return participant[element.field]<=element.value;
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
            if (RulesComparator[element.comparator](element,participant)) {
                return true;
            }
        }
        return false;
    }
};
