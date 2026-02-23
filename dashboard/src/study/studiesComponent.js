import {load_studies} from './studyModel';
import {get_tags} from 'tags/tagsModel';
import {createNotifications} from 'utils/notifyComponent';

import dropdown from 'utils/dropdown';
import {do_create} from './studyActions';
import {draw_menu} from './studyMenu';

import classNames from 'utils/classNames';
import formatDate from 'utils/formatDate';

const mainComponent = {

    controller: function(){
        const ctrl = {
            studies:m.prop([]),
            have_templates:m.prop(false),
            tags:m.prop([]),
            user_name:m.prop(''),
            globalSearch: m.prop(''),
            permissionChoice: m.prop('all'),
            loaded:false,
            notifications: createNotifications(),
            order_by_name: true,
            loadStudies,
            loadTags,
            type: m.prop(''),
            sort_studies_by_name,
            sort_studies_by_date,
        };

        loadTags();
        loadStudies();
        function loadStudies() {

            ctrl.type(m.route() == '/studies' ? 'regular' : 'template');
            // console.log(ctrl.type());
            load_studies()
                .then(response => response.studies)
                .then(ctrl.studies)
                .then(()=>ctrl.loaded = true)
                .then(sort_studies_by_name)
            .then(m.redraw);
        }

        function loadTags() {
            get_tags()
                .then(response => response.tags)
                .then(ctrl.tags)
                .then(m.redraw);
        }

        return ctrl;
        function sort_studies_by_name2(study1, study2){
            ctrl.order_by_name = true;
            return study1.name.toLowerCase() === study2.name.toLowerCase() ? 0 : study1.name.toLowerCase() > study2.name.toLowerCase() ? 1 : -1;
        }

        function sort_studies_by_date2(study1, study2){
            ctrl.order_by_name = false;
            return study1.last_modified === study2.last_modified ? 0 : study1.last_modified < study2.last_modified ? 1 : -1;
        }

        function sort_studies_by_date(){
            ctrl.studies(ctrl.studies().sort(sort_studies_by_date2));
        }
        function sort_studies_by_name(){
            ctrl.studies(ctrl.studies().sort(sort_studies_by_name2));
        }


    },
    view({loaded, studies, tags, permissionChoice, globalSearch, sort_studies_by_date, sort_studies_by_name, order_by_name, type, notifications}){
        if (!loaded) return m('.loader');

        return m('.container.studies', [

            m('div', notifications.view()),
            m('.row.p-t-1', [
                m('.col-sm-4', [
                    m('h3', ['My ', type()=='regular' ? 'Studies' : 'Template Studies'])
                ]),

                m('.col-sm-8', [
                    m('button.btn.btn-success.btn-sm.pull-right', {onclick:function(){do_create(type(), studies().filter(typeFilter(type())));}}, [
                        m('i.fa.fa-plus'), '  Add new study'
                    ]),

                    m('.pull-right.m-r-1', [
                        dropdown({toggleSelector:'button.btn.btn-sm.btn-secondary.dropdown-toggle', toggleContent: [m('i.fa.fa-tags'), ' Tags'], elements:[
                            m('h6.dropdown-header', 'Filter by tags'),
                            !tags().length
                                ? m('em.dropdown-header', 'You do not have any tags yet')
                                : tags().map(tag =>  m('a.dropdown-item',m('label.custom-control.custom-checkbox', [
                                    m('input.custom-control-input', {
                                        type: 'checkbox',
                                        checked: tag.used,
                                        onclick: function(){ tag.used = !tag.used; }
                                    }),
                                    m('span.custom-control-indicator'),
                                    m('span.custom-control-description.m-r-1.study-tag',{style: {'background-color': '#'+tag.color}}, tag.text)
                                ]))),
                            m('.dropdown-divider'),
                            m('a.dropdown-item', { href: `/tags`, config: m.route }, 'Manage tags')
                        ]})
                    ]),

                    m('.input-group.pull-right.m-r-1', [
                        m('select.c-select.form-control', {onchange: e => permissionChoice(e.target.value)}, [
                            m('option', {value:'all'}, 'Show all my studies'),
                            m('option', {value:'owner'}, 'Show only studies I created'),
                            m('option', {value:'collaboration'}, 'Show only studies shared with me'),
                            m('option', {value:'public'}, 'Show public studies'),
                            m('option', {value:'bank-iat'}, 'Show IAT bank studies'),
                            m('option', {value:'archive'}, 'Show archive studies'),
                            studies()
                                .filter(typeFilter('bank-cognitive')).length===0 ? '' :
                                m('option', {value:'bank-cognitive'}, 'Show cognitive bank studies')
                        ])
                    ])
                ])
            ]),

            m('.card.studies-card', [
                m('.card-block', [
                    m('.row', {key: '@@notid@@'}, [
                        m('.col-sm-5', [
                            m('.form-control-static',{onclick:sort_studies_by_name, style:'cursor:pointer'},[
                                m('strong', 'Study Name '),
                                m('i.fa.fa-sort', {style: {color: order_by_name ? 'black' : 'grey'}})
                            ])
                        ]),
                        m('.col-sm-3', [
                            m('.form-control-static',{onclick:sort_studies_by_date, style:'cursor:pointer'},[
                                m('strong', ' Last Changed '),
                                m('i.fa.fa-sort', {style: {color: !order_by_name ? 'black' : 'grey'}})
                            ])
                        ]),
                        m('.col-sm-4', [
                            m('input.form-control', {placeholder: 'Search...', config: focus_it, value: globalSearch(), oninput: m.withAttr('value', globalSearch)})
                        ])
                    ]),
                    studies()
                        .filter(typeFilter(type()))
                        .filter(tagFilter(tags().filter(uesedFilter()).map(tag=>tag.text)))
                        .filter(permissionFilter(permissionChoice()))
                        .filter(searchFilter(globalSearch()))
                        // .filter(study=>!study.archive)
                        .map(study => m('a', {href: m.route() != '/studies' ? `/translate/${study.id}` : `/properties/${study.id}`,config:routeConfig, key: study.id}, [
                            m('.row.study-row', [
                                m('.col-sm-5', [
                                    m('.study-text', [
                                        m('i.fa.fa-fw.owner-icon', {
                                            class: classNames({
                                                'fa-lock':  study.is_locked,
                                                'fa-globe': study.is_public,
                                                'fa-flag':  study.is_template,
                                                'fa-university':  study.is_bank,
                                                'fa-users': !study.is_public && study.permission !== 'owner'
                                            }),
                                            title: study.is_public
                                                ? study.is_bank
                                                    ? 'Bank'
                                                    : 'Public'
                                                : study.permission === 'owner'
                                                    ? ''
                                                    : 'Collaboration'
                                        }),
                                        m('strong', study.name)
                                    ]),
                                    !study.description ? '' : m('.study-description', [
                                        study.description,
                                        m('.study-tip', study.description)
                                    ])
                                ]),
                                m('.col-sm-3', [
                                    m('.study-text', formatDate(new Date(study.last_modified)))
                                ]),
                                m('.col-sm-4', [
                                    study.tags.map(tag=> m('span.study-tag',  {style: {'background-color': '#' + tag.color}}, tag.text))
                                ])
                            ])
                        ]))
                ])
            ])
        ]);
    }
};


const typeFilter = type => study => {
    return study.study_type === type;
};

const permissionFilter = permission => study => {
    if(permission === 'archive') return study.permission==='archive';
    if(permission === 'all') return study.accessible && study.permission!=='archive';
    if(permission === 'public') return study.is_public && !study.is_bank && study.permission!=='archive';
    if(permission === 'collaboration') return study.permission !== 'owner' && study.accessible  && study.permission!=='archive';
    if(permission === 'template') return study.is_template  && study.permission!=='archive';
    if(permission === 'bank-iat') return study.is_bank && study.bank_type==='iat'  && study.permission!=='archive';
    if(permission === 'bank-cognitive') return study.is_bank && study.bank_type==='cognitive'  && study.permission!=='archive';


    return study.permission === permission;
}; 

let tagFilter = tags => study => {
    if (tags.length==0)
        return true;
    return study.tags.map(tag=>tag.text).some(tag => tags.indexOf(tag) != -1);
};

let uesedFilter = () => tag => tag.used;

let searchFilter = searchTerm => study => !study.name || study.name.match(new RegExp(searchTerm, 'i')) || (study.description && study.description.match(new RegExp(searchTerm, 'i')));

function routeConfig(el, isInit, ctx, vdom) {

    el.href = location.pathname + '?' + vdom.attrs.href;

    if (!isInit) el.addEventListener('click', route);

    function route(e){
        let el = e.currentTarget;

        if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return;
        if (e.defaultPrevented) return;

        e.preventDefault();
        if (e.target.tagName === 'A' && e.target !== el) return;

        m.route(el.search.slice(1));
    }
}

const focus_it = (element, isInitialized) => {
    if (!isInitialized) setTimeout(() => element.focus());};


export default mainComponent;
