import {load_studies} from "../study/studyModel";

export default get_all_rules;

function generate_years() {
    const end = new Date().getFullYear();
    const start = end-100;
    return  Array(end - start + 1)
        .fill(start)
        .map((year, index) => year + index);
}
function sort_studies_by_name(study1, study2){
    return study1.name.toLowerCase() === study2.name.toLowerCase() ? 0 : study1.name.toLowerCase() > study2.name.toLowerCase() ? 1 : -1;
}

function get_all_rules()
{
    return load_studies()
        .then(response =>
        {
            const studies = response.studies.filter(study=>study.has_data_permission).sort(sort_studies_by_name);
            let full_rules = JSON.parse(JSON.stringify(rules));
            full_rules.push({
                    name:'Did not Start or Complete Study',
                    nameXML:'study',
                    equal:['Study name'],
                    equalXML:['Study name'],
                    values:studies.map(study=>study.name),
                    valuesXML:studies.map(study=>study.id)
            })
            return full_rules;
        });
}

let rules = [
    {
        name:'Sex',
        nameXML:'sex',
        equal:['Is','Is Not'],
        equalXML:['eq','neq'],
        values:['Male','Female'],
        valuesXML:['m','f']
    },
    {
        name:'Month of birth',
        nameXML:'birthmonth',
        equal:['>','<','=','>=','<=','!='],
        equalXML:['gt','lt','eq','gte','lte','neq'],
        values:['January','February','March','April','May','June','July','August','September','October','November','December'],
        valuesXML:['1','2','3','4','5','6','7','8','9','10','11','12']
    },

    {
        name:'Year of birth',
        nameXML:'birthyear',
        equal:['>','<','=','>=','<=','!='],
        equalXML:['gt','lt','eq','gte','lte','neq'],
        values:generate_years(),
        valuesXML:[]
    },
    {
        name:'Education',
        nameXML:'education',
        equal:['>','<','=','>=','<=','!='],
        equalXML:['gt','lt','eq','gte','lte','neq'],
        values:['elementary school','junior high','some high school','high school graduate','some college','associates degree','bachelors degree','some graduate school','masters degree','JD','MD','PhD','other advanced degree','MBA'],
        valuesXML:['1','2','3','4','5','6','7','8','9','10','11','12','13','14']
    },

    {
        name:'Major field of study',
        nameXML:'major',
        equal:['Is','Is Not'],
        equalXML:['eq','neq'],
        values:[
            'Biological sciences/life sciences',
            'Business',
            'Communications',
            'Computer and information sciences',
            'Education',
            'Engineering, mathematics, physical sciences/technologies',
            'Health professions or related sciences',
            'Humanities/liberal arts',
            'Law or legal studies',
            'Psychology',
            'Social sciences or history',
            'Visual or performing arts',
            'Other'
        ],
        valuesXML:['1','2','3','4','5','6','7','8','9','10','11','12','13']
    },

    {
        name:'Political Identity',
        nameXML:'politicalid',
        equal:['>','<','=','>=','<=','!='],
        equalXML:['gt','lt','eq','gte','lte','neq'],
        values:['Strongly conservative','Moderately conservative','Slightly conservative','moderate/neutral','Slightly liberal','Moderately liberal','Strongly liberal'],
        valuesXML:['-3','-2','-1','0','1','2','3']
    },

    {
        name:'Religiosity',
        nameXML:'religionid',
        equal:['>','<','=','>=','<=','!='],
        equalXML:['gt','lt','eq','gte','lte','neq'],
        values:['Very Religious','Moderately Religious','Somewhat Religious','Not at all Religious'],
        valuesXML:['4','3','2','1']
    },

    {
        name:'Postal Code',
        nameXML:'zipcode',
        equal:['>','<','=','>=','<=','!='],
        equalXML:['gt','lt','eq','gte','lte','neq'],
        values:['Code'],
        valuesXML:[]
    },
    {
        name:'Race',
        nameXML:'raceomb',
        equal:['Is','Is Not'],
        equalXML:['eq','neq'],
        values:['American Indian/Alaska Native','East Asian','South Asian','Native Hawaiian or other Pacific Islander',
            'Black or African American','White','More than one race - Black/White','More than one race - Other','Other or Unknown'],
        valuesXML:['1','2','3','4','5','6','7','8','9']
    },

    {
        name:'Ethnicity',
        nameXML:'ethnicityomb',
        equal:['Is','Is Not'],
        equalXML:['eq','neq'],
        values:['Hispanic or Latino','Not Hispanic or Latino','Unknown']
    },
    {
        name:'General Occupation',
        nameXML:'genoccupation',
        equal:['Is','Is Not'],
        equalXML:['eq','neq'],
        values:[
            'Administrative Support',
            'Arts/Design/Entertainment/Sports',
            'Business',
            'Computer/Math',
            'Construction/Extraction',
            'Education',
            'Engineers/Architects',
            'Farming, Fishing, Forestry',
            'Healthcare',
            'Homemaker or Parenting',
            'Legal',
            'Maintenance',
            'Management',
            'Military',
            'Production',
            'Protective Service',
            'Repair/Installation',
            'Retired',
            'Sales',
            'Science',
            'Service and Personal Care',
            'Student',
            'Social Service',
            'Transportation',
            'Unemployed'
        ],
        valuesXML:[
            '43','27','13','15','47','25','17','45','2931','00-0000','23','37','11','55',
            '51','33','49','99-0001','41','19','39','25-9999','21','53','99-9999'
        ]
    },

    {
        name:'Specific Occupation',
        nameXML:'occupation',//demographics
        equal:['Is','Is Not'],
        equalXML:['eq','neq'],
        values:[
            ///administrator support 43-000
            {type:'Administrator support'},
            'Supervisors',
            'Financial Clerks',
            'Information and Records',
            'Recording, Scheduling, Dispatching, Distributing',
            'Secretaries and Assistants',
            'Other Support (data entry, office clerk, proofreaders)',

            //Arts - 27-x000
            {type:'Arts'},
            'Art and Design',
            'Entertainers and Performers',
            'Media and communication',
            'Media Equipment workers',
            'Other Arts/Design/Entertainment/Sports',

            //Business -13-x000
            {type:'Business'},
            'Business - Business Operations',
            'Business - Financial Specialists',
            'Other business',

            //compuet/math
            {type:'Compute/Math'},
            'Computer Specialists',
            'Math Scientists',
            'Math Technicians',
            'Other math/computer',

            //construction
            {type:'Construction'},
            'Supervisors',
            'Construction Trades',
            'Helpers, Construction Trades',
            'Extraction (e.g., mining, oil)',
            'Other',

            //education
            {type:'Education'},
            'Administrators',
            'Postsecondary Teachers',
            'Primary, Secondary, and Special Ed Teachers',
            'Other teachers and instructors',
            'Librarians, Curators, Archvists',
            'Other education, training, and library occupations',

            //student
            {type:'Student'},
            'Student',

            //engineers
            {type:'Engineers'},
            'Architects, Surveyors, Cartographers',
            'Engineers',
            'Drafters, Engineering and Mapping Technicians',
            'Other Engineer/Architect',

            //farming
            {type:'Farming'},
            'Supervisors',
            'Agriculture',
            'Fishing and Hunting',
            'Forest, Conservation, Logging',
            'Other Farming, Fishing, Forestry',

            //food
            {type:'Food'},
            'Supervisors',
            'Cooks and food prep',
            'servers',
            'Other food service workers (e.g., dishwasher, host)',

            //Healthcare
            {type:'Health-care'},
            'Diagnosing and Treating Practitioners (MD, Dentist, etc.)',
            'Technologists and Technicians',
            'Nursing and Home Health Assistants',
            'Occupational and Physical Therapist Assistants',
            'Other healthcare support',

            //parenting
            {type:'Parenting'},

            'Homemaker or Parenting',

            //legal
            {type:'Legal'},

            'Legal - Lawyers, Judges, and related workers',
            'Legal - Legal support workers',
            'Other legal',

            //maintenance
            {type:'Maintenance'},

            'Building and Grounds Supervisors',
            'Building workers',
            'Grounds Maintenance',
            'Other maintenance',


            //managment
            {type:'Management'},

            'Top Executives',
            'Advertising, Sales, PR, Marketing',
            'Operations Specialists',
            'Other Management Occupations',

            //military
            {type:'Military'},
            'Officer and Tactical Leaders/Managers',
            'First-line enlisted supervisor/manager',
            'enlisted tactical, air/weapons, crew, other',

            //production
            {type:'Production'},

            'Supervisors',
            'Assemblers and Fabricators',
            'Food processing',
            'Metal and Plastic',
            'Printers',
            'Textile, Apparel, Furnishings',
            'Woodworkers',
            'Plant and System Operators',
            'Other',


            //Protective Services
            {type:'Protective Services'},
            'Supervisors',
            'Fire fighting and prevention',
            'Law Enforcement',
            'Other (e.g., security, lifeguards, crossing guards)',


            //Repair/Installation
            {type:'Repair/Installation'},
            'Supervisors',
            'Electrical and Electronic',
            'Vehicle and Mobile Equipment',
            'Other repair or installation',
            'Retired',

            //sales
            {type:'Sales'},
            'Supervisors',
            'Retail',
            'Sales Representatives and Services',
            'Wholesale and Manufacturing',
            'Other sales (e.g., telemarketers, real estate)',

            //science
            {type:'Science'},
            'Life Scientists',
            'Physical scientists',
            'Social Scientists',
            'Life, Physical, Social Science Technicians',
            'Other science',

            //personal care
            {type:'Personal care'},
            'Supervisors',
            'Animal Care',
            'Entertainment attendants',
            'Funeral Service',
            'Personal Appearance',
            'Transportation, Tourism, Lodging',
            'Other service',

            //social
            {type:'Social'},
            'Counselors, Social Workers, Community specialists',
            'Religious Workers',//23
            'Other social service',

            //transportation
            {type:'Transportation'},
            'Supervisors',
            'Air Transportation',
            'Motor Vehicle Operators',
            'Rail Transport',
            'Water Transport',
            'Material Moving',
            'Other',

            'Unemployed'
        ],
        valuesXML:[
            '43-1000','43-3000','43-4000','43-5000','43-6000','43-9000',{type:''},//administrators
            '27-1000','27-2000','27-3000','27-4000','27-9999',{type:''},//arts
            '13-1000','13-2000', '13-9999',{type:''},//business
            '15-1000','15-2000','15-3000','15-9999', {type:''},//computer
            '47-1000','47-2000','47-3000','47-5000','47-4000',{type:''},//construction
            '25-5000','25-1000','25-2000','25-3000','25-4000','25-9000',{type:''},//education
            '25-9999',{type:''},//student
            '17-1000','17-2000','17-3000','17-9999',{type:''},//engineers
            '45-1000','45-2000','45-3000','45-4000','45-9000',{type:''},//forestry
            '35-1000','35-2000','35-3000','35-9000',{type:''},//food
            '29-1000','29-2000','31-1000','31-2000','31-9000',{type:''},//healthcare
            '00-0000',{type:''},//parenting
            '23-1000','23-2000','23-9999',{type:''},//legal
            '37-1000','37-2000','37-3000','37-9999',{type:''},//maintenance
            '11-0000','11-2000','11-3000','11-9000',{type:''},//managment
            '55-1000','55-2000','55-3000',{type:''},//military
            '51-1000','51-2000','51-3000','51-4000','51-5000','51-6000','51-7000','51-8000','51-9000',{type:''},//production
            '33-1000','33-2000','33-3000','33-9000',{type:''},//Protective
            '49-1000','49-2000','49-3000','49-9000',{type:''},//Repair
            '99-0001',{type:''},//retired
            '41-1000','41-2000','41-3000','41-4000','41-9000',{type:''},//sales
            '19-1000','19-2000','19-3000','19-4000','19-9999',{type:''},//science
            '39-1000','39-2000','39-3000','39-4000','39-5000','39-6000','39-9000',{type:''},//personal care
            '21-1000','21-2000','21-9999',{type:''},//social
            '53-1000','53-2000','53-3000','53-4000','53-5000','53-7000','53-6000',{type:''},//transportation
            '99-9999',{type:''},//unemployed
        ]
    },

    {
        name:'Citizenship',
        nameXML:'citizenship',
        equal:['Is','Is Not'],
        equalXML:['eq','neq'],
        values:[
            'U.S.A.','Afghanistan','Albania',
            'Algeria','American Samoa','Andorra',
            'Angola','Anguilla','Antarctica',
            'Antigua And Barbuda','Argentina','Armenia',
            'Aruba','Australia','Austria',
            'Azerbaijan','Bahamas','Bahrain',
            'Bangladesh','Barbados','Belarus',
            'Belgium','Belize','Benin',
            'Bermuda','Bhutan','Bolivia',
            'Bosnia and Herzegovina','Botswana','Bouvet Island',
            'Brazil','British Indian Ocean Territory','Brunei',
            'Bulgaria','Burkina Faso','Burundi',
            'Cambodia','Cameroon','Canada',
            'Cape Verde','Cayman Islands','Central African Republic',
            'Chad','Chile','China',
            'Christmas Island','Cocos (Keeling) Islands','Colombia',
            'Comoros','Congo','Congo, Democractic Republic of the',
            'Cook Islands','Costa Rica','Cote DIvoire (Ivory Coast)',
            'Croatia (Hrvatska)','Cuba','Cyprus',
            'Czech Republic','Denmark','Djibouti',
            'Dominica','Dominican Republic','East Timor',
            'Ecuador','Egypt','El Salvador',
            'Equatorial Guinea','Eritrea','Estonia',
            'Ethiopia','Falkland Islands (Islas Malvinas)','Faroe Islands',
            'Fiji Islands','Finland','France',
            'French Guiana','French Polynesia','French Southern Territories',
            'Gabon','Gambia, The','Georgia',
            'Germany','Ghana','Gibraltar',
            'Greece','Greenland','Grenada',
            'Guadeloupe','Guam','Guatemala',
            'Guinea','Guinea-Bissau','Guyana',
            'Haiti','Heard and McDonald? Islands','Honduras',
            'Hong Kong S.A.R.','Hungary','Iceland',
            'India','Indonesia','Iran',
            'Iraq','Ireland','Israel',
            'Italy','Jamaica','Japan',
            'Jordan','Kazakhstan','Kenya',
            'Kiribati','Korea','Korea, North',
            'Kuwait','Kyrgyzstan','Laos',
            'Latvia','Lebanon','Lesotho',
            'Liberia','Libya','Liechtenstein',
            'Lithuania','Luxembourg','Macau S.A.R.',
            'Macedonia, Former Yugoslav Republic of','Madagascar','Malawi',
            'Malaysia','Maldives','Mali',
            'Malta','Marshall Islands','Martinique',
            'Mauritania','Mauritius','Mayotte',
            'Mexico','Micronesia','Moldova',
            'Monaco','Mongolia','Montserrat',
            'Morocco','Mozambique','Myanmar',
            'Namibia','Nauru','Nepal',
            'Netherlands Antilles','Netherlands, The','New Caledonia',
            'New Zealand','Nicaragua','Niger',
            'Nigeria','Niue','Norfolk Island',
            'Northern Mariana Islands','Norway','Oman',
            'Pakistan','Palau','Panama',
            'Papua new Guinea','Paraguay','Peru',
            'Philippines','Pitcairn Island','Poland',
            'Portugal','Puerto Rico','Qatar',
            'Reunion','Romania','Russia',
            'Rwanda','Saint Helena','Saint Kitts And Nevis',
            'Saint Lucia','Saint Pierre and Miquelon','Saint Vincent And The Grenadines',
            'Samoa','San Marino','Sao Tome and Principe',
            'Saudi Arabia','Senegal','Seychelles',
            'Sierra Leone','Singapore','Slovakia',
            'Slovenia','Solomon Islands','Somalia',
            'South Africa','South Georgia And The South Sandwich Islands','Spain',
            'Sri Lanka','Sudan','Suriname',
            'Svalbard And Jan Mayen Islands','Swaziland','Sweden',
            'Switzerland','Syria','Taiwan',
            'Tajikistan','Tanzania','Thailand',
            'Togo','Tokelau','Tonga',
            'Trinidad And Tobago','Tunisia','Turkey',
            'Turkmenistan','Turks And Caicos Islands','Tuvalu',
            'Uganda','Ukraine','United Arab Emirates',
            'United Kingdom','U.S.A.','United States Minor Outlying Islands',
            'Uruguay','Uzbekistan','Vanuatu',
            'Vatican City State (Holy See)','Venezuela','Vietnam',
            'Virgin Islands (British)','Virgin Islands (US)','Wallis And Futuna Islands',
            'Yemen','Yugoslavia','Zambia',
            'Zimbabwe'
        ],
        valuesXML:[
            'us','af','al',
            'dz','as','ad',
            'ao','ai','aq',
            'ag','ar','am',
            'aw','au','at',
            'az','bs','bh',
            'bd','bb','by',
            'be','bz','bj',
            'bm','bt','bo',
            'ba','bw','bv',
            'br','io','bn',
            'bg','bf','bi',
            'kh','cm','ca',
            'cv','ky','cf',
            'td','cl','cn',
            'cx','cc','co',
            'km','cg','cd',
            'ck','cr','ci',
            'hr','cu','cy',
            'cz','dk','dj',
            'dm','do','tp',
            'ec','eg','sv',
            'gq','er','ee',
            'et','fk','fo',
            'fj','fi','fr',
            'gf','pf','tf',
            'ga','gm','ge',
            'de','gh','gi',
            'gr','gl','gd',
            'gp','gu','gt',
            'gn','gw','gy',
            'ht','hm','hn',
            'hk','hu','is',
            'in','id','ir',
            'iq','ie','il',
            'it','jm','jp',
            'jo','kz','ke',
            'ki','kr','kp',
            'kw','kg','la',
            'lv','lb','ls',
            'lr','ly','li',
            'lt','lu','mo',
            'mk','mg','mw',
            'my','mv','ml',
            'mt','mh','mq',
            'mr','mu','yt',
            'mx','fm','md',
            'mc','mn','ms',
            'ma','mz','mm',
            'na','nr','np',
            'an','nl','nc',
            'nz','ni','ne',
            'ng','nu','nf',
            'mp','no','om',
            'pk','pw','pa',
            'pg','py','pe',
            'ph','pn','pl',
            'pt','pr','qa',
            're','ro','ru',
            'rw','sh','kn',
            'lc','pm','vc',
            'ws','sm','st',
            'sa','sn','sc',
            'sl','sg','sk',
            'si','sb','so',
            'za','gs','es',
            'lk','sd','sr',
            'sj','sz','se',
            'ch','sy','tw',
            'tj','tz','th',
            'tg','tk','to',
            'tt','tn','tr',
            'tm','tc','tv',
            'ug','ua','ae',
            'uk','us','um',
            'uy','uz','vu',
            'va','ve','vn',
            'vg','vi','wf',
            'ye','yu','zm',
            'zw'
        ]
    },
    {
        name:'Residence',
        nameXML:'residence',
        equal:['Is','Is Not'],
        equalXML:['eq','neq'],
        values:[
            'U.S.A.','Afghanistan','Albania',
            'Algeria','American Samoa','Andorra',
            'Angola','Anguilla','Antarctica',
            'Antigua And Barbuda','Argentina','Armenia',
            'Aruba','Australia','Austria',
            'Azerbaijan','Bahamas','Bahrain',
            'Bangladesh','Barbados','Belarus',
            'Belgium','Belize','Benin',
            'Bermuda','Bhutan','Bolivia',
            'Bosnia and Herzegovina','Botswana','Bouvet Island',
            'Brazil','British Indian Ocean Territory','Brunei',
            'Bulgaria','Burkina Faso','Burundi',
            'Cambodia','Cameroon','Canada',
            'Cape Verde','Cayman Islands','Central African Republic',
            'Chad','Chile','China',
            'Christmas Island','Cocos (Keeling) Islands','Colombia',
            'Comoros','Congo','Congo, Democractic Republic of the',
            'Cook Islands','Costa Rica','Cote DIvoire (Ivory Coast)',
            'Croatia (Hrvatska)','Cuba','Cyprus',
            'Czech Republic','Denmark','Djibouti',
            'Dominica','Dominican Republic','East Timor',
            'Ecuador','Egypt','El Salvador',
            'Equatorial Guinea','Eritrea','Estonia',
            'Ethiopia','Falkland Islands (Islas Malvinas)','Faroe Islands',
            'Fiji Islands','Finland','France',
            'French Guiana','French Polynesia','French Southern Territories',
            'Gabon','Gambia, The','Georgia',
            'Germany','Ghana','Gibraltar',
            'Greece','Greenland','Grenada',
            'Guadeloupe','Guam','Guatemala',
            'Guinea','Guinea-Bissau','Guyana',
            'Haiti','Heard and McDonald? Islands','Honduras',
            'Hong Kong S.A.R.','Hungary','Iceland',
            'India','Indonesia','Iran',
            'Iraq','Ireland','Israel',
            'Italy','Jamaica','Japan',
            'Jordan','Kazakhstan','Kenya',
            'Kiribati','Korea','Korea, North',
            'Kuwait','Kyrgyzstan','Laos',
            'Latvia','Lebanon','Lesotho',
            'Liberia','Libya','Liechtenstein',
            'Lithuania','Luxembourg','Macau S.A.R.',
            'Macedonia, Former Yugoslav Republic of','Madagascar','Malawi',
            'Malaysia','Maldives','Mali',
            'Malta','Marshall Islands','Martinique',
            'Mauritania','Mauritius','Mayotte',
            'Mexico','Micronesia','Moldova',
            'Monaco','Mongolia','Montserrat',
            'Morocco','Mozambique','Myanmar',
            'Namibia','Nauru','Nepal',
            'Netherlands Antilles','Netherlands, The','New Caledonia',
            'New Zealand','Nicaragua','Niger',
            'Nigeria','Niue','Norfolk Island',
            'Northern Mariana Islands','Norway','Oman',
            'Pakistan','Palau','Panama',
            'Papua new Guinea','Paraguay','Peru',
            'Philippines','Pitcairn Island','Poland',
            'Portugal','Puerto Rico','Qatar',
            'Reunion','Romania','Russia',
            'Rwanda','Saint Helena','Saint Kitts And Nevis',
            'Saint Lucia','Saint Pierre and Miquelon','Saint Vincent And The Grenadines',
            'Samoa','San Marino','Sao Tome and Principe',
            'Saudi Arabia','Senegal','Seychelles',
            'Sierra Leone','Singapore','Slovakia',
            'Slovenia','Solomon Islands','Somalia',
            'South Africa','South Georgia And The South Sandwich Islands','Spain',
            'Sri Lanka','Sudan','Suriname',
            'Svalbard And Jan Mayen Islands','Swaziland','Sweden',
            'Switzerland','Syria','Taiwan',
            'Tajikistan','Tanzania','Thailand',
            'Togo','Tokelau','Tonga',
            'Trinidad And Tobago','Tunisia','Turkey',
            'Turkmenistan','Turks And Caicos Islands','Tuvalu',
            'Uganda','Ukraine','United Arab Emirates',
            'United Kingdom','U.S.A.','United States Minor Outlying Islands',
            'Uruguay','Uzbekistan','Vanuatu',
            'Vatican City State (Holy See)','Venezuela','Vietnam',
            'Virgin Islands (British)','Virgin Islands (US)','Wallis And Futuna Islands',
            'Yemen','Yugoslavia','Zambia',
            'Zimbabwe'],
        valuesXML:[
            'us','af','al',
            'dz','as','ad',
            'ao','ai','aq',
            'ag','ar','am',
            'aw','au','at',
            'az','bs','bh',
            'bd','bb','by',
            'be','bz','bj',
            'bm','bt','bo',
            'ba','bw','bv',
            'br','io','bn',
            'bg','bf','bi',
            'kh','cm','ca',
            'cv','ky','cf',
            'td','cl','cn',
            'cx','cc','co',
            'km','cg','cd',
            'ck','cr','ci',
            'hr','cu','cy',
            'cz','dk','dj',
            'dm','do','tp',
            'ec','eg','sv',
            'gq','er','ee',
            'et','fk','fo',
            'fj','fi','fr',
            'gf','pf','tf',
            'ga','gm','ge',
            'de','gh','gi',
            'gr','gl','gd',
            'gp','gu','gt',
            'gn','gw','gy',
            'ht','hm','hn',
            'hk','hu','is',
            'in','id','ir',
            'iq','ie','il',
            'it','jm','jp',
            'jo','kz','ke',
            'ki','kr','kp',
            'kw','kg','la',
            'lv','lb','ls',
            'lr','ly','li',
            'lt','lu','mo',
            'mk','mg','mw',
            'my','mv','ml',
            'mt','mh','mq',
            'mr','mu','yt',
            'mx','fm','md',
            'mc','mn','ms',
            'ma','mz','mm',
            'na','nr','np',
            'an','nl','nc',
            'nz','ni','ne',
            'ng','nu','nf',
            'mp','no','om',
            'pk','pw','pa',
            'pg','py','pe',
            'ph','pn','pl',
            'pt','pr','qa',
            're','ro','ru',
            'rw','sh','kn',
            'lc','pm','vc',
            'ws','sm','st',
            'sa','sn','sc',
            'sl','sg','sk',
            'si','sb','so',
            'za','gs','es',
            'lk','sd','sr',
            'sj','sz','se',
            'ch','sy','tw',
            'tj','tz','th',
            'tg','tk','to',
            'tt','tn','tr',
            'tm','tc','tv',
            'ug','ua','ae',
            'uk','us','um',
            'uy','uz','vu',
            'va','ve','vn',
            'vg','vi','wf',
            'ye','yu','zm',
            'zw'
        ]
    },
    {
        name:'Number of Studies Started',
        nameXML:'started_studies',
        equal:['>','<','=','>=','<='],
        equalXML:['gt','lt','eq','gte','lte',],
        values:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        valuesXML:[]
    },
    {
        name:'Did not Take a Study in the Last 15min',
        nameXML:'previous_study_id',
        equal:[],
        equalXML:[],
        values:[],
        valuesXML:[]
    },

    {
        name:'General Religious Affiliation',
        nameXML:'religion',
        equal:['Is','Is Not'],
        equalXML:['eq','neq'],
        values:['Buddhist/Confucian/Shinto','Christian: Catholic or Orthodox','Christian: Protestant or Other','Hindu','Jewish','Muslim/Islamic','Not Religious','Other Religion'],
        valuesXML:['buddhist','catholic','protestant','hindu','jewish','muslim','none','otherrelig']
    },
    {
        name:'Specific Religious Affiliation',
        nameXML:'relfamily',
        equal:['Is','Is Not'],
        equalXML:['eq','neq'],
        values:[
            {type: 'protestant'},
            'Adventist',
            'Anglican/Episcopalian',
            'Baptist',
            'Brethren',
            'Church/Churches of Christ',
            'Church of God',
            'Congregationalist',
            'Methodist/Wesleyan',
            'Latter Day Saints',
            'Lutheran',
            'Pentecostal/Holiness/Charismatic',
            'Presbyterian or Reformed',
            'Other Christian',
            'Nondenominational/Independent',

            {type: 'catholic'},
            'Orthodox: Antiochian',
            'Orthodox: Armenian',
            'Orthodox: Assyrian',
            'Orthodox: Coptic',
            'Orthodox: Eastern',
            'Orthodox: Greek',
            'Orthodox: Romanian',
            'Orthodox: Russian',
            'Orthodox: Serbian',
            'Roman Catholic',
            'Other Catholic',
            'Other Orthodox',

            //None
            {type: 'None'},

            'Agnostic',
            'Atheist',
            'Deist',
            'Spiritual, No Organized Religion',
            'Theist',
            'Other Non-Religious',

            //Buddhist
            {type: 'Buddhist'},
            'Buddhist: Mahayana',
            'Buddhist: Theravada',
            'Buddhist: Tibetan',
            'Chinese Folk Religion',
            'Confucian',
            'Shinto',
            'Taoist',
            'Tenrikyo',
            'Other Buddhist/Confucian/Shinto',


            //Hindu
            {type: 'Hindu'},
            'Neo-Hindu/Reform Hindu',
            'Shaivite',
            'Veerashaiva/Lingayat',
            'Vaishnavite',
            'Other Hindu',

            //OtherRelig
            {type: 'Other Religion'},
            'African Tribal Religion',
            'Bahai',
            'Indigenous',
            'Interfaith',
            'Jain',
            'Native American',
            'Pagan or Neo-Pagan',
            'Rastafarian',
            'Scientologist',
            'Sikh',
            'Spiritist',
            'Unitarian-Universalist',
            'Vodoun',
            'Zoroastrian',
            'Other: Not listed',

            //Jewish
            {type: 'Jewish'},
            'Conservative',
            'Orthodox',
            'Reconstructionist',
            'Reform',
            'Secular',
            'Other Jewish',

            //Muslim
            {type: 'Muslim'},
            'Ahmadi',
            'Druze',
            'Sunni',
            'Shiite',
            'Other Muslim',
        ],
        valuesXML:[
            //protestant
            {type:'Protestant'},
            'adventist',
            'anglican',
            'baptist',
            'brethren',
            'churchesofchrist',
            'churchofgod',
            'congregationalist',
            'methodist',
            'lds',
            'lutheran',
            'pentecostal',
            'presbyterian',
            'otherchristian',
            'nondenominational',

            //catholic
            {type:'Catholic'},
            'orthodox: antiochian',
            'orthodox: armenian',
            'orthodox: assyrian',
            'orthodox: coptic',
            'orthodox: eastern',
            'orthodox: greek',
            'orthodox: romanian',
            'orthodox: russian',
            'orthodox: serbian',
            'roman catholic',
            'other catholic',
            'other orthodox',

            //None
            {type:'None'},
            'agnostic',
            'atheist',
            'deist',
            'spiritual, no organized religion',
            'theist',
            'other non-religious',

            //Buddhist
            {type:'Buddhist'},
            'buddhist: mahayana',
            'buddhist: theravada',
            'buddhist: tibetan',
            'chinese folk religion',
            'confucian',
            'shinto',
            'taoist',
            'tenrikyo',
            'other buddhist/confucian/shinto',

            //Hindu
            {type:'Hindu'},
            'neo-hindu/reform hindu',
            'shaivite',
            'veerashaiva/lingayat',
            'vaishnavite',
            'other hindu',

            //OtherRelig
            {type:'Other'},
            'african tribal religion',
            'baha\'i',
            'indigenous',
            'interfaith',
            'jain',
            'native american',
            'pagan or neo-pagan',
            'rastafarian',
            'scientologist',
            'sikh',
            'spiritist',
            'unitarian-universalist',
            'vodoun',
            'zoroastrian',
            'other: not listed',

            //Jewish
            {type:'Jewish'},
            'conservative',
            'orthodox',
            'reconstructionist',
            'reform',
            'secular',
            'other jewish',

            //Muslim
            {type:'Muslim'},
            'ahmadi',
            'druze',
            'sunni',
            'shiite',
            'other muslim',
        ]
    },
    {
        name:'Specific Religious Denomination',
        nameXML:'reldenom',
        equal:['Is','Is Not'],
        equalXML:['eq','neq'],
        values:[
            // Protestant/OtherChristian
            {type:'Protestant/Other Christian'},
            'Amish',
            'Christian Scientist',
            'Friend/Quaker',
            'Mennonite',
            'Metropolitan Community Churches',
            'Religious Society of Friends (Conservative)',
            'Salvation Army',
            'Unitarian-Universalist',
            'Other Christian',

            // Protestant/Nondenominational
            {type:'Protestant/Nondenominational'},
            'Calvary Chapel',
            'Disciples of Christ',
            'Churches of Christ in Christian Union',
            'Evangelical',
            'Grace Gospel Fellowship',
            'Independent Fundamentalist',
            'Interdenominational Church',
            'Metropolitan Community Churches',
            'Nondenominational church',
            'United Church',
            'Just a Christian',

            //Protestant/Adventist
            {type:'Protestant/Adventist'},
            'Jehovah\'s Witness',
            'Seventh Day Adventist',
            'Other Adventist',

            //Protestant/Anglican
            {type:'Protestant/Anglican'},
            'Anglican',
            'Church of England',
            'Church of Ireland',
            'Episcopalian',
            'Other Anglican',

            //Protestant/Baptist
            {type:'Protestant/Baptist'},
            'American Baptist Association',
            'Baptist Bible Fellowship',
            'Baptist General Conference',
            'Conservative Baptist Association',
            'Free Will Baptist',
            'Fundamentalist Baptist',
            'General Association of Regular Baptists',
            'Independent Baptist (no denominational ties)',
            'Missionary Baptist',
            'National Baptist Convention',
            'Northern Baptist',
            'Primitive Baptist',
            'Progressive Baptist',
            'Southern Baptist',
            'Other Baptist Church',
            'Baptist: Don\'t know which',

            //Protestant/Brethren
            {type:'Protestant/Brethren'},
            'Church of the Brethren',
            'Evangelical United Brethren',
            'Grace Brethren',
            'Plymouth Brethren',
            'United Brethren/United Brethren in Christ',
            'Other Brethren',
            'Brethren: Don\'t know which',

            //Protestant/ChurchesofChrist
            {type:'Protestant/Churches of Christ'},

            'Christian Churches & Churches of Christ',
            'Church of Christ',
            'United Church of Christ',
            'Other Church of Christ',
            'Church of Christ: Don\'t know which',

            //Protestant/ChurchofGod
            {type:'Protestant/Church of God'},

            'Church of God (Anderson, IN)',
            'Church of God (Cleveland, TN)',
            'Church of God in Christ',
            'Church of the Living God',
            'Pentecostal Church of God',
            'Worldwide Church of God',
            'Other Church of God',
            'Church of God: Don\'t know which',

            //Protestant/LDS
            {type:'Protestant/LDS'},
            'Church of Jesus Christ of Latter Day Saints',
            'Community of Christ',
            'Other Latter Day Saint',
            'LDS: Don\'t know which',

            //Protestant/Methodist
            {type:'Protestant/Methodist'},
            'African Methodist Episcopal',
            'African Methodist Episcopal (Zion)',
            'Christian Methodist Episcopal',
            'Church of the Nazarene',
            'Evangelical Methodist',
            'Evangelical Covenant (Church)',
            'Free Methodist',
            'United Methodist',
            'Wesleyan Methodist',
            'Other Methodist Church',
            'Other Wesleyan Church',
            'Methodist: Don\'t know which',

            //Protestant//Lutheran
            {type:'Protestant/Lutheran'},
            'Evangelical Lutheran',
            'Latvian Lutheran',
            'Lutheran Church: Missouri Synod',
            'Lutheran Church: Wisconsin Synod',
            'Other Lutheran Church',
            'Lutheran: Don\'t know which',

            //Protestant/Pentecostal
            {type:'Protestant/Pentecostal'},
            'Assemblies of God',
            'Christian & Missionary Alliance',
            'Church of God of Prophecy',
            'Foursquare Gospel',
            'Full Gospel Fellowship',
            'Holiness Church of God',
            'House of Prayer',
            'Open Bible Churches',
            'Pentecostal Apostolic',
            'Pilgrim Holiness',
            'Pentecostal Assemblies of the World',
            'Pentecostal Holiness Church',
            'Pentecostal Church of God',
            'Triumph Church of God',
            'United Holiness',
            'Other Apostolic',
            'Other Charismatic',
            'Other Holiness/Church of Holiness',
            'Other Pentecostal',

            //Protestant/Presbyterian
            {type:'Protestant/Presbyterian'},
            'Cumberland Presbyterian Church',
            'Evangelical Presbyterian Church',
            'Orthodox Presbyterian Church',
            'Presbyterian Church in America (PCA)',
            'Presbyterian Church in the USA (PCUSA)',
            'United Presbyterian Church in the USA',
            'Other Presbyterian Church',
            'Presbyterian: Don\'t know which',
            'Dutch Reformed',
            'Evangelical and Reformed Church',
            'International Council of Community Churches',
            'Protestant Reformed Churches',
            'Reformed Church in America',
            'Reformed United Church of Christ',
            'Other Reformed Church',
            'Reformed: Don\'t know which'
        ],
        valuesXML:[
            // Protestant/OtherChristian
            {type:''},
            'amish',
            'christian scientist',
            'friend/quaker',
            'mennonite',
            'metropolitan community churches',
            'religious society of friends (Conservative)',
            'salvation army',
            'unitarian-universalist',
            'other christian',

            // Protestant/Nondenominational
            {type:''},
            'calvary chapel',
            'disciples of christ',
            'churches of christ in christian union',
            'evangelical',
            'grace gospel fellowship',
            'independent fundamentalist',
            'interdenominational church',
            'metropolitan community churches',
            'nondenominational church',
            'united church',
            'just a christian',

            //Protestant/Adventist
            {type:''},
            'jehovah\'s witness',
            'seventh day adventist',
            'other adventist',

            //Protestant/Anglican
            {type:''},
            'anglican',
            'church of england',
            'church of ireland',
            'episcopalian',
            'other anglican',

            //Protestant/Baptist
            {type:''},
            'american baptist association',
            'baptist bible fellowship',
            'baptist general conference',
            'conservative baptist association',
            'free will baptist',
            'fundamentalist baptist',
            'general association of regular baptists',
            'independent baptist (no denominational ties)',
            'missionary baptist',
            'national baptist convention',
            'northern baptist',
            'primitive baptist',
            'progressive baptist',
            'southern baptist',
            'other baptist church',
            'baptist: don\'t know which',

            //Protestant/Brethren
            {type:''},
            'church of the brethren',
            'evangelical united brethren',
            'grace brethren',
            'plymouth brethren',
            'united brethren/united brethren in christ',
            'other brethren',
            'brethren: don\'t know which',

            //Protestant/ChurchesofChrist
            {type:''},
            'christian churches & churches of christ',
            'church of christ',
            'united church of christ',
            'other church of christ',
            'church of christ: don\'t know which',

            //Protestant/ChurchofGod
            {type:''},
            'church of god (anderson, in)',
            'church of god (cleveland, tn)',
            'church of god in christ',
            'church of the living god',
            'pentecostal church of god',
            'worldwide church of god',
            'other church of god',
            'church of god: don\'t know which',

            //Protestant/LDS
            {type:''},
            'church of jesus christ of latter day saints',
            'community of christ',
            'other latter day saint',
            'lds: don\'t know which',

            //Protestant/Methodist
            {type:''},
            'african methodist episcopal',
            'african methodist episcopal (zion)',
            'christian methodist episcopal',
            'church of the nazarene',
            'evangelical methodist',
            'evangelical covenant (church)',
            'free methodist',
            'united methodist',
            'wesleyan methodist',
            'other methodist church',
            'other wesleyan church',
            'methodist: don\'t know which',

            //Protestant//Lutheran
            {type:''},
            'evangelical lutheran',
            'latvian lutheran',
            'lutheran church: missouri synod',
            'lutheran church: wisconsin synod',
            'other lutheran church',
            'lutheran: don\'t know which',

            //Protestant/Pentecostal
            {type:''},
            'assemblies of god',
            'christian & missionary alliance',
            'church of god of prophecy',
            'foursquare gospel',
            'full gospel fellowship',
            'holiness church of god',
            'house of prayer',
            'open bible churches',
            'pentecostal apostolic',
            'pilgrim holiness',
            'pentecostal assemblies of the world',
            'pentecostal holiness church',
            'pentecostal church of god',
            'triumph church of god',
            'united holiness',
            'other apostolic',
            'other charismatic',
            'other holiness/church of holiness',
            'other pentecostal',

            //Protestant/Presbyterian
            {type:''},
            'cumberland presbyterian church',
            'evangelical presbyterian church',
            'orthodox presbyterian church',
            'presbyterian church in america (pca)',
            'presbyterian church in the usa (pcusa)',
            'united presbyterian church in the usa',
            'other presbyterian church',
            'presbyterian: don\'t know which',
            'dutch reformed',
            'evangelical and reformed church',
            'international council of community churches',
            'protestant reformed churches',
            'reformed church in america',
            'reformed united church of christ',
            'other reformed church',
            'reformed: don\'t know which'
        ]
    }
];