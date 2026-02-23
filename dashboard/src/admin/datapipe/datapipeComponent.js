import {get_tokens, remove_token} from './datapipeModel';

import messages from 'utils/messagesComponent';



let datapipeComponent = {
    controller(){
        let ctrl = {
            tokens:m.prop(),
            loaded:false,
            col_error:m.prop(''),
            order_by:m.prop(''),
            sort_studies_by,

            remove};

        function remove(token_id){
            messages.confirm({header:'Delete token ' + token_id, content:'Are you sure?'})
                .then(response => {
                    if (response)
                        remove_token(token_id)
                            .then(()=> load())
                            .catch(error => {
                                ctrl.col_error(error.message);
                            })
                            .then(m.redraw);
                });
        }

        function load() {
            get_tokens()
                .then(response =>ctrl.tokens(response.tokens))
                .then(()=>ctrl.loaded = true)
                .then(()=>console.log(ctrl.tokens()))

                .catch(error => {
                    ctrl.col_error(error.message);
                }).then(m.redraw);
        }
        load();
        return ctrl;
        function sort_studies_by_uses(study1, study2){
            ctrl.order_by('uses');
            return study1.uses === study2.uses ? 0 : study1.uses < study2.uses ? 1 : -1;
        }

        function sort_studies_by_uses_dec(study1, study2){
            ctrl.order_by('uses_dec');
            return study1.uses === study2.uses ? 0 : study1.uses > study2.uses ? 1 : -1;
        }


        function sort_studies_by_domain(study1, study2){
            study1.domain = study1.domain ? study1.domain : '';
            study2.domain = study2.domain ? study2.domain : '';
            ctrl.order_by('domain');
            return study1.domain.toLowerCase() === study2.domain.toLowerCase() ? 0 : study1.domain.toLowerCase() < study2.domain.toLowerCase() ? -1 : 1;
        }

        function sort_studies_by_domain_dec(study1, study2){
            ctrl.order_by('domain_dec');
            return study1.domain.toLowerCase() === study2.domain.toLowerCase() ? 0 : study1.domain.toLowerCase() < study2.domain.toLowerCase() ? 1 : -1;
        }

        function sort_studies_by_first(study1, study2){
            ctrl.order_by('first');
            return study1.first_use === study2.first_use ? 0 : study1.first_use < study2.first_use ? -1 : 1;
        }

        function sort_studies_by_first_dec(study1, study2){
            ctrl.order_by('first_dec');
            return study1.first_use === study2.first_use ? 0 : study1.first_use > study2.first_use ? -1 : 1;
        }

        function sort_studies_by_last(study1, study2){
            ctrl.order_by('last');
            return study1.last_use === study2.last_use ? 0 : study1.last_use < study2.last_use ? -1 : 1;
        }

        function sort_studies_by_last_dec(study1, study2){
            ctrl.order_by('last_dec');
            return study1.last_use === study2.last_use ? 0 : study1.last_use > study2.last_use ? -1 : 1;
        }

        function sort_studies_by_debug(study1, study2){
            ctrl.order_by('debug');
            study1.debug = study1.debug ? 1 : 0;
            study2.debug = study2.debug ? 1 : 0;
            return study1.debug === study2.debug ? 0 : study1.debug < study2.debug ? -1 : 1;
        }

        function sort_studies_by_debug_dec(study1, study2){
            ctrl.order_by('debug_dec');
            return study1.debug === study2.debug ? 0 : study1.debug > study2.debug ? -1 : 1;
        }

        function sort_studies_by(name){
            if (name==='uses') {
                if (ctrl.order_by() === 'uses')
                    return ctrl.tokens(ctrl.tokens().sort(sort_studies_by_uses_dec));
                return ctrl.tokens(ctrl.tokens().sort(sort_studies_by_uses));
            }
            if (name==='domain') {
                if (ctrl.order_by() === 'domain')
                    return ctrl.tokens(ctrl.tokens().sort(sort_studies_by_domain_dec));
                return ctrl.tokens(ctrl.tokens().sort(sort_studies_by_domain));
            }
            if (name==='first') {
                if (ctrl.order_by() === 'first')
                    return ctrl.tokens(ctrl.tokens().sort(sort_studies_by_first_dec));
                return ctrl.tokens(ctrl.tokens().sort(sort_studies_by_first));
            }
            if (name==='last') {
                if (ctrl.order_by() === 'last')
                    return ctrl.tokens(ctrl.tokens().sort(sort_studies_by_last_dec));
                return ctrl.tokens(ctrl.tokens().sort(sort_studies_by_last));
            }
            if (name==='debug') {
                if (ctrl.order_by() === 'debug')
                    return ctrl.tokens(ctrl.tokens().sort(sort_studies_by_debug_dec));
                return ctrl.tokens(ctrl.tokens().sort(sort_studies_by_debug));
            }
        }
    },
    view(ctrl){
        return  !ctrl.loaded
            ?
            m('.loader')
            :
            m('.container.sharing-page', [
                m('.row',[
                    m('.col-sm-12', [
                        m('h3', 'DataPipe')
                    ])
                ]),
                m('table', {class:'table table-striped table-hover'}, [
                    m('thead', [
                        m('tr', [
                            m('th.',
                                m('.form-control-static',{onclick:()=>ctrl.sort_studies_by('domain'), style:'cursor:pointer'},[
                                    m('i', ''),
                                    m('p', m('strong', 'Token '))
                                ])
                            ),
                            m('th',
                                m('.form-control-static',{onclick:()=>ctrl.sort_studies_by('domain'), style:'cursor:pointer'},[
                                    m('i.fa.fa-sort', {style: {color: ctrl.order_by()==='domain' ? 'black' : 'grey'}}),
                                    m('p', m('strong', 'Domain '))
                                ])
                            ),
                            m('th.col-md-3',
                                m('.form-control-static',{onclick:()=>ctrl.sort_studies_by('uses'), style:'cursor:pointer'},[
                                    m('i.fa.fa-sort', {style: {color: ctrl.order_by()==='uses' ? 'black' : 'grey'}}),
                                    m('p', m('strong', 'Uses '))

                                ])
                            ),
                            m('th',
                                m('.form-control-static',{onclick:()=>ctrl.sort_studies_by('first'), style:'cursor:pointer'},[
                                    m('i.fa.fa-sort', {style: {color: ctrl.order_by()==='first' ? 'black' : 'grey'}}),
                                    m('p', m('strong', 'First use '))

                                ])
                            ),
                            m('th',
                                m('.form-control-static',{onclick:()=>ctrl.sort_studies_by('last'), style:'cursor:pointer'},[
                                    m('i.fa.fa-sort', {style: {color: ctrl.order_by()==='last' ? 'black' : 'grey'}}),
                                    m('p', m('strong', 'Last use '))

                                ])
                            ),
                            m('th',  m('.form-control-static',{onclick:()=>ctrl.sort_studies_by('debug'), style:'cursor:pointer'},[
                                m('i.fa.fa-sort', {style: {color: ctrl.order_by()==='debug' ? 'black' : 'grey'}}),
                                m('p', m('strong', 'Debug '))

                            ])),
                            m('th.',
                                m('.form-control-static',{onclick:()=>ctrl.sort_studies_by('domain'), style:'cursor:pointer'},[
                                    m('i', ''),
                                    m('p', m('strong', 'Remove '))
                                ])
                            ),

                        ])
                    ]),
                    m('tbody', [
                        ctrl.tokens().map(token => m('tr', [
                            m('td', token._id),
                            m('td', token.domain),
                            m('td', token.uses),
                            m('td', token.first_use),
                            m('td', token.last_use),
                            m('td', token.debug ? 'Debug' : ''),
                            m('td', m('button.btn.btn-danger', {onclick:()=>ctrl.remove(token._id)}, 'Remove'))
                        ]))
                    ]),
                ])
            ]);
    }
};

export default datapipeComponent;
