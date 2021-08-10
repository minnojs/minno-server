function maybeNumber(string)
{
    let result=Number(string);
    if(!Number.isNaN(result))
    {
        return result;
    }
    else
    {
        return string;
    }
}

exports.RulesComparator = {
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
    'in': function(element, participant) {
		if(element.field)
		{
			if(participant[element.field][element.value])
			{
				return true
			}
		}
    return false;
    },
     '!in': function(element, participant) {
		 return !exports.RulesComparator['in'](element,participant);
    },
    '&': function(array, participant) {
        if ((array.data == null || array.data.length == 0) && (array.sub_sets == null || array.sub_sets.length == 0) ) {
            return true;
        }
		if(array.data)
		{
        for (const element of array.data) {
            if (!exports.RulesComparator[element.comparator](element, participant)) {
                return false;
            }
        }
	}
	if(array.sub_sets)
		{
        for (const element of array.sub_sets) {
            if (!exports.RulesComparator[element.comparator](element, participant)) {
                return false;
            }
        }
	}
        return true;
    },
    '|': function(array, participant) {
        if ((array.data == null || array.data.length == 0) && (array.sub_sets == null || array.sub_sets.length == 0) ) {
            return true;
        }
		if(array.data)
		{
        for (const element of array.data) {
            if (exports.RulesComparator[element.comparator](element, participant)) {
                return true;
            }
        }
	}
	if(array.sub_sets)
	{
    for (const element of array.sub_sets) {
        if (exports.RulesComparator[element.comparator](element, participant)) {
            return true;
        }
    }
}
        return false;
    },
	    '&&': function(array, participant) {
        if ((array.data == null || array.data.length == 0) && (array.sub_sets == null || array.sub_sets.length == 0) ) {
            return true;
        }
		if(array.data)
		{
        for (const element of array.data) {
            if (!exports.RulesComparator[element.comparator](element, participant)) {
                return false;
            }
        }
	}
	if(array.sub_sets)
		{
        for (const element of array.sub_sets) {
            if (!exports.RulesComparator[element.comparator](element, participant)) {
                return false;
            }
        }
	}
        return true;
    },
    '||': function(array, participant) {
        if ((array.data == null || array.data.length == 0) && (array.sub_sets == null || array.sub_sets.length == 0) ) {
            return true;
        }
		if(array.data)
		{
        for (const element of array.data) {
            if (exports.RulesComparator[element.comparator](element, participant)) {
                return true;
            }
        }
	}
	if(array.sub_sets)
	{
    for (const element of array.sub_sets) {
        if (exports.RulesComparator[element.comparator](element, participant)) {
            return true;
        }
    }
}
        return false;
    }
};