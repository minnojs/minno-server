export let print_rules = (set) =>{
    const clean_rules   = set.data.map(rule=>(rule.field==='' ? '_' : rule.field_text) + ' ' + (rule.comparator==='' ? '_' : rule.comparator_text) + ' ' + (rule.value==='' ? '_' : rule.value_text));
    const sub_sets_data =  set.sub_sets.map(sub_set=> print_rules(sub_set));

    const print_both = set.data.length>0 && set.sub_sets.length>0 ? ', ' : '';
    return set.comparator_str + ' {'+ clean_rules.join(', ') +  print_both + sub_sets_data.join(', ')+ '} ' ;
}
