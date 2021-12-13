
let tabsComponent = {
    controller: function(tabs, settings, defaultSettings, external = false){
        let tab = tabs[0].value;
        let index = setIndex(tab);

        return {tab: tab, index: index, setIndex:setIndex};
        function setIndex(tab){return tabs.findIndex((element) => (element.value === tab));}

    },
    view:
        function(ctrl, tabs, settings, defaultSettings, external = false){
            return m('.container',{id:'tabs'},[
                m('.tab',
                tabs.map(function(tab){
                    if (!external && (tab.value === 'output' || tab.value === 'import'))
                        return;
                    if (tab.value === 'practice' && settings.parameters.practiceBlock === false)
                        return;
                    return m('button.tablinks', {
                        class: ctrl.tab === tab.value ? 'active' : '', onclick:function(){
                            ctrl.tab = tab.value;ctrl.index = ctrl.setIndex(tab.value)}},
                        tab.text);})),
                m('.div',{key:tabs[ctrl.index].value},
                    m.component(tabs[ctrl.index].component, settings, defaultSettings, tabs[ctrl.index].rowsDesc, tabs[ctrl.index].subTabs, tabs[ctrl.index].type))
            ]);
    }
};

export default tabsComponent;
