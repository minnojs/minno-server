export default constants_view;

let constants_view = args => m.component(constantsGeneratorComponent, args);


let constantsGeneratorComponent = {
    controller({mode, constants, imgs}){
        let ctrl = {
            mode,
            constants,
            imgs,
            update_constant
        };

        function update_constant(type, param, value) {
            ctrl.constants[type][param](value);
        }

        return ctrl;
    },
    view(ctrl){
        return m('.row',  {style:{display: ctrl.mode()==='constants' ? 'block': 'none'}},[
            m('h4.space', 'Durations'),
            m('.row',[
                m('.col-sm-5',[
                    m('.row', [
                        m('.col-sm-2', 'Fixation'),
                        m('.col-sm-3', m('input.form-control', { type:'number', min:'0', value: ctrl.constants.durations.fixation(), placeholder: 'Fixation', onchange:function(){ctrl.update_constant('durations', 'fixation', this.value)}}))
                    ]),
                    m('.row', [
                        m('.col-sm-2', 'ITI'),
                        m('.col-sm-3', m('input.form-control', {type:'number', min:'0', value: ctrl.constants.durations.iti(), placeholder: 'ITI', onchange:function(){ctrl.update_constant('durations', 'iti', this.value)}}))
                    ]),
                    m('.row', [
                        m('.col-sm-2', 'Feedback'),
                        m('.col-sm-3', m('input.form-control', {type:'number', min:'0', value: ctrl.constants.durations.feedback(), placeholder: 'Feedback', onchange:function(){ctrl.update_constant('durations', 'feedback', this.value)}}))
                    ]),
                ]),

            ]),
            m('h4.space', 'Instructions'),
            m('.row',[
                m('.col-sm-9',[
                    m('.row', [
                        m('.col-sm-3', 'Beginning of experiment'),
                        m('.col-sm-5',
                            m('select.form-control', {onchange:function(){ctrl.update_constant('instructions',  'welcome', this.value);}}, [
                                m('option',{value:'', disabled: true, selected: ctrl.constants.instructions.welcome() === ''},  'Select image'),
                                m('option',{value:'None',  selected: ctrl.constants.instructions.start() === 'None'},  'None'),
                                ctrl.imgs().map(img=>m('option',{value:img.path, selected: ctrl.constants.instructions.welcome() === img.path},  img.path))
                            ])
                        )
                    ]),
                    m('.row', [
                        m('.col-sm-3', 'Ending of practice'),
                        m('.col-sm-5',
                            m('select.form-control', {onchange:function(){ctrl.update_constant('instructions',  'start', this.value);}}, [
                                m('option',{value:'', disabled: true, selected: ctrl.constants.instructions.start() === ''},  'Select image'),
                                m('option',{value:'None',  selected: ctrl.constants.instructions.start() === 'None'},  'None'),

                                ctrl.imgs().map(img=>m('option',{value:img.path, selected: ctrl.constants.instructions.start() === img.path},  img.path))
                            ])
                        )
                    ]),
                    m('.row', [
                        m('.col-sm-3', 'Ending of experiment'),
                        m('.col-sm-5',
                            m('select.form-control', {onchange:function(){ctrl.update_constant('instructions',  'end', this.value);}}, [
                                m('option',{value:'', disabled: true, selected: ctrl.constants.instructions.end() === ''},  'Select image'),
                                m('option',{value:'None',  selected: ctrl.constants.instructions.start() === 'None'},  'None'),
                                ctrl.imgs().map(img=>m('option',{value:img.path, selected: ctrl.constants.instructions.end() === img.path},  img.path))
                            ])
                        )
                    ]),
                ]),
            ]),
            m('h4.space', 'Feedback'),
            m('.row',[
                m('.col-sm-7',[
                    m('.row', [
                        m('.col-sm-2', 'Correct'),
                        m('.col-sm-5', m('input.form-control', {value: ctrl.constants.feedback.correct(), placeholder: 'Correct', onchange:function(){ctrl.update_constant('feedback',  'correct', this.value)}}))
                    ]),
                    m('.row', [
                        m('.col-sm-2', 'Incorrect'),
                        m('.col-sm-5', m('input.form-control', {value: ctrl.constants.feedback.incorrect(), placeholder: 'Incorrect', onchange:function(){ctrl.update_constant('feedback', 'incorrect', this.value)}}))
                    ]),
                    m('.row', [
                        m('.col-sm-2', 'No response'),
                        m('.col-sm-5', m('input.form-control', {value: ctrl.constants.feedback.noresponse(), placeholder: 'No response', onchange:function(){ctrl.update_constant('feedback', 'noresponse', this.value)}}))
                    ]),
                ]),
            ]),
        ])


    }
};

