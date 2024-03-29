import {load_studies} from 'study/studyModel';

export default args => m.component(copyFileComponent, args);

let copyFileComponent = {
    controller({new_study_id, new_study_name, study_id}){
        let studies = m.prop([]);
        let loaded = m.prop(false);
        let error = m.prop(null);
        load_studies()


            .then(response => studies(response.studies.sort(sort_studies_by_name2).filter(template_filter())))

            .catch(error)
            .then(loaded.bind(null, true))
            .then(m.redraw);
        return {studies, study_id, new_study_id, new_study_name, loaded, error};
    },
    view: ({studies, study_id, new_study_id, new_study_name, loaded, error}) => m('div', [
        loaded() ? '' : m('.loader'),
        error() ? m('.alert.alert-warning', error().message): '',
        loaded() && !studies().length ? m('.alert.alert-info', 'You have no studies yet') : '',

        m('select.form-control', {value:new_study_id(), onchange: e => update_study_details(e, new_study_id, new_study_name)}, [
            m('option',{value:'', disabled: true}, 'Select Study'),
            studies()
                .filter(study => study.permission!=='archive' && !study.is_locked && !study.is_public && !study.isReadonly && study.permission!=='read only' && study.id!=study_id())
                .map(study => m('option',{value:study.id, selected: new_study_id() === study.id}, study.name))
        ])
    ])
};

function update_study_details(event, new_study_id, new_study_name){
    new_study_id(event.target.value);
    new_study_name(event.target[event.target.selectedIndex].text);
}


function sort_studies_by_name2(study1, study2){
    return study1.name.toLowerCase() === study2.name.toLowerCase() ? 0 : study1.name.toLowerCase() > study2.name.toLowerCase() ? 1 : -1;
}

let template_filter = () => study => {
    return study.study_type === 'regular' && !study.is_template;
};
