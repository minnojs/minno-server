import parametersComponent from '../resources/parametersComponent.js';
import outputComponent from './spfOutputComponent.js';
import textComponent from '../resources/textComponent.js';
import blocksComponent from '../resources/blocksComponent.js';
import categoriesComponent from '../resources/categoriesComponent.js';
import importComponent from './spfImportComponent.js';
import helpComponent from '../resources/helpComponent.js';

let parametersDesc = [
    {name: 'keyTopLeft', label:'Top left key', desc: 'Set top left key'},
    {name: 'keyTopRight', label:'Top right key', desc: 'Set top right key'},
    {name: 'keyBottomLeft', label:'Bottom left key', desc: 'Set bottom left key'},
    {name: 'keyBottomRight', label:'Bottom right key', desc: 'Set top left key'},
    {keyTopLeft: '', keyTopRight: '', keyBottomLeft: '', keyBottomRight: '', base_url:''}
];

let textDesc=[
    {name: 'firstBlock', label:'First Block\'\s Instructions', desc:'First\'\s Block Instructions'},
    {name: 'middleBlock', label:'Middle Block\'\s Instructions', desc: 'Middle Block\'\s Instructions'},
    {name: 'lastBlock', label:'Last Block\'\s Instructions', desc: 'Last Block\'\s Instructions'},
    {firstBlock: '', middleBlock:'', lastBlock:''},
    {} //an empty element

];

let blocksDesc = [
    {name: 'nBlocks', label: 'Number of blocks', desc: 'Set the number of blocks in the task'},
    {name: 'nTrialsPerPrimeTargetPair', label: 'Number of trials in a block, per prime-target combination', desc: 'How many trials in a block, per prime-target combination (always three blocks).'},
    {name: 'randomCategoryLocation', label: 'Randomly choose categories location', desc: 'Whether to randomly select which category is on top. If false, then the first category is on top.', options: ['true','false']},
    {name: 'randomAttributeLocation', label: 'Randomly choose attributes location', desc: 'Whether to randomly select which attribute is on the left. If false, the first attribute is on the left.', options: ['true','false']},
    {nBlocks: 0, nTrialsPerPrimeTargetPair: 0, randomCategoryLocation : 'false', randomAttributeLocation: 'false'}
];

let categoryClear = [{
    name: '', 
    title: {media: {word: ''}, 
    css: {color: '#000000', 'font-size': '1em'}, height: 4},
    stimulusMedia: [],
    stimulusCss : {color:'#000000', 'font-size':'1em'}
}];

let categoriesTabs = [
    {value: 'objectCat1', text: 'First Category'},
    {value: 'objectCat2', text: 'Second Category'},
]

let attributesTabs = [
    {value: 'attribute1', text: 'First Attribute'},
    {value: 'attribute2', text: 'Second Attribute'},
]

let tabs = [
    {value: 'parameters', text: 'General parameters', component: parametersComponent, rowsDesc: parametersDesc },
    {value: 'blocks', text: 'Blocks', component: blocksComponent, rowsDesc: blocksDesc},
    {value: 'categories', text: 'Categories', component: categoriesComponent, rowsDesc: categoryClear, subTabs:categoriesTabs},
    {value: 'attributes', text: 'Attributes', component: categoriesComponent, rowsDesc: categoryClear, subTabs:attributesTabs},
    {value: 'text', text: 'Texts', component: textComponent, rowsDesc: textDesc},
    {value: 'output', text: 'Complete', component: outputComponent, rowsDesc: blocksDesc},
    {value: 'import', text: 'Import', component: importComponent},
    {value: 'help', text: 'Help', component: helpComponent, rowsDesc:'SPF'}
];

export default tabs;