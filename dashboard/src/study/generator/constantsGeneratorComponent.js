export default constants_view;

let constants_view = args => m.component(constantsGeneratorComponent, args);


let constantsGeneratorComponent = {
    controller({fixation, iti}){
        let ctrl = {
            fixation,
            iti,
            update_duration
        };

        function update_duration(duration, new_duration) {
            ctrl[duration](new_duration);
        }

        return ctrl;
    },
    view(ctrl){
        return m('.row', [
            m('h4.space', 'Durations'),
            m('.row',[
                m('.col-sm-5',[
                    m('.row', [
                        m('.col-sm-2', 'Fixation'),
                        m('.col-sm-3', m('input.form-control', {type:'number', min:'0', value: ctrl.fixation(), placeholder: 'Fixation', onchange:function(){ctrl.update_duration('fixation', this.value)}}))
                    ]),
                    m('.row', [
                        m('.col-sm-2', 'ITI'),
                        m('.col-sm-3', m('input.form-control', {type:'number', min:'0', value: ctrl.iti(), placeholder: 'ITI', onchange:function(){ctrl.update_duration('iti', this.value)}}))
                    ]),
                ]),

            ])
        ])


    }
};

