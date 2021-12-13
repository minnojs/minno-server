import elementComponent from './biatElementComponent.js';
import {clone, showClearOrReset, showRestrictions} from '../resources/utilities.js';
import messages from "../../../../../utils/messagesComponent";

let categoriesComponent = {
    controller:controller,
    view:view
};

function controller(settings, defaultSettings, clearElement){
    let categories = settings.categories;
    categories.forEach(element => { //adding a random key for each category
        element.key = Math.random();
    });
    let headlines = ['First','Second','Third','Fourth','Fifth','Sixth','Seventh','Eighth'];
    let addFlag =  m.prop('visible');
    let removeFlag = m.prop('hidden');
    let chooseFlag = m.prop('hidden');
    let choosenCategoriesList = m.prop([]);
    let chooseClicked = m.prop(false);
    let curr_tab = m.prop(0)

    return {reset, clear, addFlag, removeFlag, chooseFlag, unChooseCategories,categories, headlines, addCategory, choosenCategoriesList,
        updateChoosenBlocks, showRemoveCategories, chooseCategories, curr_tab, getDefaultValues};

    function clear(){showClearOrReset(categories[curr_tab()], clearElement[0], 'clear')}
    function reset(){showClearOrReset(categories[curr_tab()], defaultSettings.categories[curr_tab()], 'reset')
    }
    function addCategory() {
        categories.push(clone(clearElement[0]));
        let last = categories.length - 1
        categories[last].key = Math.random()
        if (categories.length === 8) addFlag('hidden');
    }
    function updateChoosenBlocks(e, index){
        //if clicked the checkbox to uncheck the item
        if (choosenCategoriesList().includes(index) && !e.target.checked){
            var i = choosenCategoriesList().indexOf(index);
            if (i !== -1) choosenCategoriesList().splice(i, 1);
            return;
        }
        if (e.target.checked) choosenCategoriesList().push(index);
    }
    function unChooseCategories(){
        chooseFlag('hidden');
        choosenCategoriesList().length = 0;
    }
    function chooseCategories(){
        if(categories.length < 3){
            showRestrictions('error','It\'s not possible to remove categories because there must be at least 2 categories.','Error');
            return;
        }
        chooseFlag('visible');
        if (!chooseClicked()) { //show the info msg only for the first time the choose button has been clicked
            showRestrictions('info','To choose categories to remove, please tik the checkbox near the wanted category, and to remove them click the \'Remove Choosen Categories\' button.', 'Choose categories to remove')
            chooseClicked(true)
        }
    }
    function showRemoveCategories(){
        if ((categories.length - choosenCategoriesList().length) < 2){
            showRestrictions('error','Minimum number of categories needs to be 2, please choose less categories to remove', 'Error Removing Choosen Categories')
            return;
        }
        return messages.confirm({header: 'Are you sure?', content:
                m('', 'This action is permanent')})
            .then(response => {
                if (response) {
                    removeCategories()
                    m.redraw();
                }
                else {
                    choosenCategoriesList().length = 0;
                    chooseFlag('hidden');
                    m.redraw();
                }
            }).catch(error => messages.alert({header: 'Error in removing categories' , content: m('p.alert.alert-danger', error.message)}))
            .then(m.redraw());

        function removeCategories(){
            choosenCategoriesList().sort();
            for (let i = choosenCategoriesList().length - 1; i >=0; i--)
                categories.splice(choosenCategoriesList()[i],1)

            choosenCategoriesList().length = 0;
            chooseFlag('hidden');
            addFlag(categories.length < 8 ? 'visible' : 'hidden');
            curr_tab(categories.length - 1);
        }
    }

    function getDefaultValues(){
        let stimulusMedia = null;
        let startStimulus = null;
        if(curr_tab() < 2){
            stimulusMedia = defaultSettings.categories[curr_tab()].stimulusMedia;
            startStimulus = defaultSettings.categories[curr_tab()].title.startStimulus;
        }
        return [stimulusMedia, startStimulus]
    }
}

function view(ctrl,settings) {
    return m('.container.space',[
        m('.subtab', ctrl.categories.map(function(tab, index){
            return m('button',{
                    class: ctrl.curr_tab() === index ? 'active' : '',
                    onclick:function(){
                        ctrl.curr_tab(index);
                    }}, ctrl.headlines[index] + ' Category',
                m('input[type=checkbox].space', {checked : ctrl.choosenCategoriesList().includes(index), style:{'margin-left':'1em',visibility: ctrl.chooseFlag()}, onclick: (e) => ctrl.updateChoosenBlocks(e, index)}));
        })),
        m('.row.space',[
            m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons',display: 'flex','justify-content': 'center'}},[
                m('button.btn btn btn-info',{title:'You can add up to 8 categories',onclick: ctrl.addCategory, style:{'padding-right':'60px','padding-left':'60px' ,visibility: ctrl.addFlag()}}, [m('i.fa.fa-plus')],' Add Category'),
                ctrl.chooseFlag() === 'hidden' ?
                    m('button.btn btn btn-secondary',{onclick: ctrl.chooseCategories},[
                        m('i.fa.fa-check'), ' Choose Categories to Remove'])
                    :
                    m('button.btn btn btn-warning',{onclick: ctrl.unChooseCategories},[
                        m('i.fa.fa-minus-circle'), ' Un-Choose Categories to Remove']),
                ctrl.choosenCategoriesList().length !== 0 ?
                    m('button.btn btn btn-danger',{onclick: ctrl.showRemoveCategories},[
                        m('i.fa.fa-eraser'), ' Remove Choosen Categories']) : ''

            ])
        ]),
        m('.div.space',{key:ctrl.categories[ctrl.curr_tab()].key},
            m.component(elementComponent, {key:'categories'}, settings, ctrl.getDefaultValues()[0], ctrl.getDefaultValues()[1], ctrl.curr_tab())),
        m('.row.space',[
            m('.col',{style:{'margin-bottom':'7px'}},[
                m('.btn-group btn-group-toggle', {style:{'data-toggle':'buttons', float: 'right'}},[
                    ctrl.curr_tab() < 2?
                        m('button.btn btn-secondary',
                            {title:'Reset all current fields to default values', onclick: () => ctrl.reset()},
                            m('i.fa.fa-undo.fa-sm'), ' Reset') : null,
                    m('button.btn btn-danger',
                        {title:'Clears all current values',onclick:() => ctrl.clear()},
                        m('i.fa.fa-trash.fa-sm'), ' Clear'),
                ])
            ])
        ])
    ]);
}

export default categoriesComponent;

