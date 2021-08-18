import {load_studies} from '../study/studyModel';

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


function get_all_rules(deployer=false)
{
    return load_studies()
        .then(response =>
        {
            const studies = response.studies.filter(study=>study.has_data_permission).sort(sort_studies_by_name);
            if (deployer)
                return JSON.parse(JSON.stringify(autupause_rules));
            let full_rules = JSON.parse(JSON.stringify(rules));
			full_rules.push({
			                name:'Did not Start or Complete Study',
			                nameXML:"previousStudies",
			                equal:['Study name'],
			                equalXML:['!in'],
			                values:studies.map(study=>study.name),
			                valuesXML:studies.map(study=>study.id)
			            });
            return full_rules;
        });
}


let autupause_rules = [
    {
        name:'Started sessions',
        nameXML:'startedSessions',
        equal:['>','<','=','>=','<=','!='],
        equalXML:['>','<','==','>=','<=','!='],
        values:['Started sessions'],
        numeric:true,
        valuesXML:[]
    },
    {
        name:'Completion rate',
        nameXML:'completionRate',
        equal:['>','<','=','>=','<=','!='],
        equalXML:['>','<','==','>=','<=','!='],
        values:['Completion rate'],
        numeric:true,
        valuesXML:[]
    }
];

let rules = [
        {   
            name:'gender',
            nameXML:'gender',//fixed accoding to rule.
            equal:['Is','Is Not'],
            equalXML:['==','!='],
            values:[ 'Man or boy', 'Woman or girl', 'Genderqueer, non-binary, agender, or a different identity' ],
            valuesXML:[ 'm', 'f', 'other' ]
        },

        {
            name:'Month of birth',
            nameXML:'birthmonth', //demographics
            equal:['>','<','=','>=','<=','!='],
            equalXML:['>','<','==','>=','<=','!='],
            values:['January','February','March','April','May','June','July','August','September','October','November','December'],
            valuesXML:['1','2','3','4','5','6','7','8','9','10','11','12']
        },
		{
        name:'Year of birth',
        nameXML:'birthyear',
        equal:['>','<','=','>=','<=','!='],
        equalXML:['>','<','==','>=','<=','!='],
        values:generate_years(),
        valuesXML:generate_years()
    },

        {
            name:'Education',
            nameXML:'education',//demographics
            equal:['>','<','=','>=','<=','!='],
            equalXML:['>','<','==','>=','<=','!='],
            values:['elementary school','junior high','some high school','high school graduate','some college','associates degree','bachelors degree','some graduate school','masters degree','JD','MD','PhD','other advanced degree','MBA'],
            valuesXML:['1','2','3','4','5','6','7','8','9','10','11','12','13','14']
        },

    

      
        {
            name:'Political Identity',
            nameXML:'politicalid',//demographics
            equal:['>','<','=','>=','<=','!='],
            equalXML:['>','<','==','>=','<=','!='],
            values:['Strongly conservative','Moderately conservative','Slightly conservative','moderate/neutral','Slightly liberal','Moderately liberal','Strongly liberal'],
            valuesXML:['-3','-2','-1','0','1','2','3']
        },

        {
            name:'Religiosity',
            nameXML:'religionid',//demographics
            equal:['>','<','=','>=','<=','!='],
            equalXML:['>','<','==','>=','<=','!='],
            values:['Very Religious','Moderately Religious','Somewhat Religious','Not at all Religious'],
            valuesXML:['4','3','2','1']
        },

       
        {
            name:'race/ethnic',
            nameXML:'raceethnic',//demographics
            equal:['Is','Is Not'],
            equalXML:['==','!='],
            values:[ "White", "Black or African American", "Hispanic, Latino, or Spanish Origin ", "Asian", "American Indian or Alaska Native", "Middle Eastern or North African", "Native Hawaiian or Other Pacific Islander", "More than one race or ethnicity" ],
            valuesXML:[ "white", "black", "hispanic", "asian", "native", "middleeastern", "pacificislander", "multi" ]
        },
        {
            name:'multiracial',
            nameXML:'raceethnic2',//demographics
            equal:['Is','Is Not'],
            equalXML:['==','!='],
            values:[ "Filtering for specific kinds of multiracial people needs to be manually added in the rules file"," and is not currently supported by this version of the rule generator." ],
            valuesXML:["multi","multi2" ]
        },
        {
            name:'state',
            nameXML:'state',//demographics
            equal:['Is','Is Not'],
            equalXML:['==','!='],
            values:["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Guam","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Minor Outlying Islands","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Virgin Islands","Washington","West Virginia","Wisconsin","Wyoming","Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland and Labrador","Northwest Territories","Nova Scotia","Nunavut","Ontario","Prince Edward Island","Quebec","Saskatchewan","Yukon"],
            valuesXML:["al","ak","as","az","ar","ca","co","ct","de","dc","fl","ga","gu","hi","id","il","in","ia","ks","ky","la","me","md","ma","mi","mn","ms","mo","ym","mt","ne","nv","nh","nj","nm","ny","nc","nd","mp","oh","ok","or","pa","pr","ri","sc","sd","tn","tx","ut","vt","va","vi","wa","wv","wi","wy","ab","bc","mb","nb","nl","nt","ns","nu","on","pe","qc","sk","yt"]
        },
         {
            name:'General Occupation',
            nameXML:'genoccupation',//taken from demographics
            equal:['Is','Is Not'],
            equalXML:['==','!='],
            values:["Administrative Support","Arts/Design/Entertainment/Sports","Business","Computer/Math","Construction/Extraction","Education","Engineers/Architects","Farming, Fishing, Forestry","Food Service","Healthcare","Homemaker or Parenting","Legal","Maintenance","Management","Military","Production","Protective Service","Repair/Installation","Sales","Science","Service and Personal Care","Social Service","Transportation","Unemployed"],
            valuesXML:["43-","27-","13-","15-","47-","25-","17-","45-","35-","2931","00-","23-","37-","11-","55-","51-","33-","49-","41-","19-","39-","21-","53-","9998"]
        },
    
        {
            name:'Specific Occupation',
            nameXML:'occupation',//demographics
            equal:['Is','Is Not'],
            equalXML:['==','!='],
            values:["Supervisors","Financial Clerks","Information and Records","Recording, Scheduling, Dispatching, Distributing","Secretaries and Assistants","Other Support (data entry, office clerk, proofreaders)","Art and Design","Entertainers and Performers","Media and communication","Media Equipment workers","Business Operations","Financial Specialists","Computer Specialists","Math Scientists","Math Technicians","Supervisors","Construction Trades","Helpers, Construction Trades","Extraction (e.g., mining, oil)","Other","Postsecondary Teachers","Primary, Secondary, and Special Ed Teachers","Other teachers and instructors","Librarians, Curators, Archivists","Other education, training, and library occupations","Student","Architects, Surveyors, Cartographers","Engineers","Drafters, Engineering and Mapping Technicians","Supervisors","Agriculture","Fishing and Hunting","Forest, Conservation, Logging","Other","Supervisors","Cooks and food prep","Servers","Other food service workers (e.g., dishwasher, host)","Diagnosing and Treating Practitioners (MD, Dentist, etc.)","Technologists and Technicians","Nursing and Home Health Assistants","Occupational and Physical Therapist Assistants","Other healthcare support","Homemaker or Parenting","Lawyers, Judges, and related workers","Legal support workers","Building and Grounds Supervisors","Building workers","Grounds Maintenance","Top Executives","Advertising, Sales, PR, Marketing","Operations Specialists","Other Management Occupations","Officer and Tactical Leaders/Managers","First-line enlisted supervisor/manager","Enlisted tactical, air/weapons, crew, other","Supervisors","Assemblers and Fabricators","Food processing","Metal and Plastic","Printers","Textile, Apparel, Furnishings","Woodworkers","Plant and System Operators","Other","Supervisors","Fire fighting and prevention","Law Enforcement","Other (e.g., security, lifeguards, crossing guards)","Supervisors","Electrical and Electronic","Vehicle and Mobile Equipment","Other","Supervisors","Retail","Sales Representatives and Services","Wholesale and Manufacturing","Other sales (e.g., telemarketers, real estate)","Life Scientists","Physical scientists","Social Scientists","Life, Physical, Social Science Technicians","Supervisors","Animal Care","Entertainment attendants","Funeral Service","Personal Appearance","Transportation, Tourism, Lodging","Other service (e.g., child care, fitness)","Counselors, Social Workers, Community specialists","Religious Workers","Supervisors","Air Transportation","Motor Vehicle Operators","Rail Transport","Water Transport","Material Moving","Other"],



valuesXML:["43-1000","43-3000","43-4000","43-5000","43-6000","43-7000","27-1000","27-2000","27-3000","27-4000","13-1000","13-2000","15-1000","15-2000","15-3000","47-1000","47-2000","47-3000","47-5000","47-4000","25-1000","25-2000","25-3000","25-4000","25-9000","25-9999","17-1000","17-2000","17-3000","45-1000","45-2000","45-3000","45-4000","45-9000","35-1000","35-2000","35-3000","35-9000","29-1000","29-2000","31-1000","31-2000","31-9000","00-0000","23-1000","23-2000","37-1000","37-2000","37-3000","1","11-2000","11-3000","11-9000","55-1000","55-2000","55-3000","51-1000","51-2000","51-3000","51-4000","51-5000","51-6000","51-7000","51-8000","51-9000","33-1000","33-2000","33-3000","33-9000","49-1000","49-2000","49-3000","49-9000","1000","41-2000","41-3000","41-4000","41-9000","19-1000","19-2000","19-3000","19-4000","39-1000","39-2000","39-3000","39-4000","39-5000","39-6000","39-9000","21-1000","21-2000","53-1000","53-2000","53-3000","53-4000","53-5000","53-7000","53-6000"]
},

{
    name:'Citizenship',
    nameXML:'citizenship',
    equal:['Is','Is Not'],
    equalXML:['==','!='],
    values:["United States of America ","Afghanistan","Albania","Algeria","Andorra","Angola","Antarctica","Antigua And Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas, The","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo, Democratic Republic of the","Congo, Republic of the","Cook Islands","Costa Rica","Cote D'Ivoire (Ivory Coast)","Croatia (Hrvatska)","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor/Timor-Leste","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini, Kingdom of ","Ethiopia","Falkland Islands (Islas Malvinas)","Fiji Islands","Finland","France","Gabon","Gambia, The","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras ","Hungary ","Iceland ","India ","Indonesia ","Iran ","Iraq ","Ireland ","Israel ","Italy ","Jamaica ","Japan ","Jordan ","Kazakhstan ","Kenya ","Kiribati ","Korea, North","Korea, South","Kosovo","Kuwait ","Kyrgyzstan ","Laos ","Latvia ","Lebanon ","Lesotho ","Liberia ","Libya ","Liechtenstein ","Lithuania ","Luxembourg ","Madagascar ","Malawi ","Malaysia ","Maldives ","Mali ","Malta ","Marshall Islands ","Mauritania ","Mauritius ","Mexico ","Micronesia, Federated States of","Moldova ","Monaco ","Mongolia ","Montenegro ","Morocco ","Mozambique ","Myanmar/Burma ","Namibia ","Nauru ","Nepal ","Netherlands, The","New Zealand ","Nicaragua ","Niger ","Nigeria ","Niue ","North Macedonia, Republic of ","Norway ","Oman ","Pakistan ","Palau ","Palestine","Panama ","Papua new Guinea ","Paraguay ","Peru ","Philippines ","Poland ","Portugal ","Qatar ","Romania ","Russia ","Rwanda ","Saint Kitts And Nevis ","Saint Lucia ","Saint Vincent And The Grenadines ","Samoa ","San Marino ","Sao Tome and Principe ","Saudi Arabia ","Senegal ","Serbia","Seychelles ","Sierra Leone ","Singapore ","Slovakia ","Slovenia ","Solomon Islands ","Somalia ","South Africa ","South Sudan","Spain ","Sri Lanka ","Sudan ","Suriname ","Sweden ","Switzerland ","Syria ","Taiwan ","Tajikistan ","Tanzania ","Thailand ","Togo ","Tonga ","Trinidad And Tobago ","Tunisia ","Turkey ","Turkmenistan ","Tuvalu ","Uganda ","Ukraine ","United Arab Emirates ","United Kingdom ","Uruguay ","Uzbekistan ","Vanuatu ","Vatican City State (Holy See) ","Venezuela ","Vietnam ","Yemen ","Zambia ","Zimbabwe"],

   valuesXML:["us","af","al","dz","ad","ao","aq","ag","ar","am","au","at","az","bs","bh","bd","bb","by","be","bz","bj","bt","bo","ba","bw","br","bn","bg","bf","bi","kh","cm","ca","cv","cf","td","cl","cn","co","km","cd","cg","ck","cr","ci","hr","cu","cy","cz","dk","dj","dm","do","tp","ec","eg","sv","gq","er","ee","sz","et","fk","fj","fi","fr","ga","gm","ge","de","gh","gr","gd","gt","gn","gw","gy","ht","hn","hu","is","in","id","ir","iq","ie","il","it","jm","jp","jo","kz","ke","ki","kp","kr","ko","kw","kg","la","lv","lb","ls","lr","ly","li","lt","lu","mg","mw","my","mv","ml","mt","mh","mr","mu","mx","fm","md","mc","mn","me","ma","mz","mm","na","nr","np","nl","nz","ni","ne","ng","nu","mk","no","om","pk","pw","ps","pa","pg","py","pe","ph","pl","pt","qa","ro","ru","rw","kn","lc","vc","ws","rs","st","sa","sn","sx","sc","sl","sg","sk","si","sb","so","za","ss","es","lk","sd","sr","se","ch","sy","tw","tj","tz","th","tg","to","tt","tn","tr","tm","tv","ug","ua","ae","uk","uy","uz","vu","va","ve","vn","ye","zm","zw"]
},

{
    name:'Residence',
    nameXML:'residence',
    equal:['Is','Is Not'],
    equalXML:['==','!='],
    values:["Same as above","United States of America ","Afghanistan","Albania","Algeria","Andorra","Angola","Antarctica","Antigua And Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas, The","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo, Democratic Republic of the","Congo, Republic of the","Cook Islands","Costa Rica","Cote D'Ivoire (Ivory Coast)","Croatia (Hrvatska)","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor/Timor-Leste","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini, Kingdom of ","Ethiopia","Falkland Islands (Islas Malvinas)","Fiji Islands","Finland","France","Gabon","Gambia, The","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras ","Hungary ","Iceland ","India ","Indonesia ","Iran ","Iraq ","Ireland ","Israel ","Italy ","Jamaica ","Japan ","Jordan ","Kazakhstan ","Kenya ","Kiribati ","Korea, North","Korea, South","Kosovo","Kuwait ","Kyrgyzstan ","Laos ","Latvia ","Lebanon ","Lesotho ","Liberia ","Libya ","Liechtenstein ","Lithuania ","Luxembourg ","Madagascar ","Malawi ","Malaysia ","Maldives ","Mali ","Malta ","Marshall Islands ","Mauritania ","Mauritius ","Mexico ","Micronesia, Federated States of","Moldova ","Monaco ","Mongolia ","Montenegro ","Morocco ","Mozambique ","Myanmar/Burma ","Namibia ","Nauru ","Nepal ","Netherlands, The","New Zealand ","Nicaragua ","Niger ","Nigeria ","Niue ","North Macedonia, Republic of ","Norway ","Oman ","Pakistan ","Palau ","Palestine","Panama ","Papua new Guinea ","Paraguay ","Peru ","Philippines ","Poland ","Portugal ","Qatar ","Romania ","Russia ","Rwanda ","Saint Kitts And Nevis ","Saint Lucia ","Saint Vincent And The Grenadines ","Samoa ","San Marino ","Sao Tome and Principe ","Saudi Arabia ","Senegal ","Serbia","Seychelles ","Sierra Leone ","Singapore ","Slovakia ","Slovenia ","Solomon Islands ","Somalia ","South Africa ","South Sudan","Spain ","Sri Lanka ","Sudan ","Suriname ","Sweden ","Switzerland ","Syria ","Taiwan ","Tajikistan ","Tanzania ","Thailand ","Togo ","Tonga ","Trinidad And Tobago ","Tunisia ","Turkey ","Turkmenistan ","Tuvalu ","Uganda ","Ukraine ","United Arab Emirates ","United Kingdom ","Uruguay ","Uzbekistan ","Vanuatu ","Vatican City State (Holy See) ","Venezuela ","Vietnam ","Yemen ","Zambia ","Zimbabwe"],

   valuesXML:["sm","us","af","al","dz","ad","ao","aq","ag","ar","am","au","at","az","bs","bh","bd","bb","by","be","bz","bj","bt","bo","ba","bw","br","bn","bg","bf","bi","kh","cm","ca","cv","cf","td","cl","cn","co","km","cd","cg","ck","cr","ci","hr","cu","cy","cz","dk","dj","dm","do","tp","ec","eg","sv","gq","er","ee","sz","et","fk","fj","fi","fr","ga","gm","ge","de","gh","gr","gd","gt","gn","gw","gy","ht","hn","hu","is","in","id","ir","iq","ie","il","it","jm","jp","jo","kz","ke","ki","kp","kr","ko","kw","kg","la","lv","lb","ls","lr","ly","li","lt","lu","mg","mw","my","mv","ml","mt","mh","mr","mu","mx","fm","md","mc","mn","me","ma","mz","mm","na","nr","np","nl","nz","ni","ne","ng","nu","mk","no","om","pk","pw","ps","pa","pg","py","pe","ph","pl","pt","qa","ro","ru","rw","kn","lc","vc","ws","rs","st","sa","sn","sx","sc","sl","sg","sk","si","sb","so","za","ss","es","lk","sd","sr","se","ch","sy","tw","tj","tz","th","tg","to","tt","tn","tr","tm","tv","ug","ua","ae","uk","uy","uz","vu","va","ve","vn","ye","zm","zw"]},

{
            name:'General Religious Affiliation',
            nameXML:'religion',//demographics
            equal:['Is','Is Not'],
            equalXML:['==','!='],
            values:['Buddhist/Confucian/Shinto','Christian: Catholic or Orthodox','Christian: Protestant or Other','Hindu','Jewish','Muslim/Islamic','Not Religious','Other Religion'],
            valuesXML:['buddhist','catholic','protestant','hindu','jewish','muslim','none','otherrelig'],
},
{
            name:'Specific Religious Affiliation',
            nameXML:'relfamily',//demographics
            equal:['Is','Is Not'],
            equalXML:['==','!='],
            values:["BuddhistMahayana","BuddhistTheravada","BuddhistTibetan","Chinese Folk Religion","Confucian","Shinto","Taoist","Tenrikyo","Other Buddhist/Confucian/Shinto","OrthodoxAntiochian","OrthodoxArmenian","OrthodoxAssyrian","OrthodoxCoptic","OrthodoxEastern","OrthodoxGreek","OrthodoxRomanian","OrthodoxRussian","OrthodoxSerbian","Roman Catholic","Other Catholic","Other Orthodox","OrthodoxAntiochian","OrthodoxArmenian","OrthodoxAssyrian","OrthodoxCoptic","OrthodoxEastern","OrthodoxGreek","OrthodoxRomanian","OrthodoxRussian","OrthodoxSerbian","Roman Catholic","Other Catholic","Other Orthodox","Adventist","Anglican/Episcopalian","Baptist","Brethren","Church/Churches of Christ","Church of God","Congregationalist","Methodist/Wesleyan","Latter Day Saints","Lutheran","Pentecostal/Holiness/Charismatic","Presbyterian or Reformed","Other Christian","Nondenominational/Independent","Neo-Hindu/Reform Hindu","Shaivite","Veerashaiva/Lingayat","Vaishnavite","Other Hindu","Conservative","Orthodox","Reconstructionist","Reform","Secular","Other Jewish","Ahmadi","Druze","Sunni","Shiite","Other Muslim","Agnostic","Atheist","Deist","Spiritual, No Organized Religion","Theist","Other Non-Religious","African Tribal Religion","Baha\"i","Indigenous","Interfaith","Jain","Native American","Pagan or Neo-Pagan","Rastafarian","Scientologist","Sikh","Spiritist","Unitarian-Universalist","Vodoun","Zoroastrian","OtherNot listed"],
            valuesXML:["mahayana","theravada","tibetan","chinesefolk","confucian","shinto","taoist","tenrikyo","otherbuddhist","antiochian","armenian","assyrian","coptic","eastern","greek","romanian","russian","serbian","romancatholic","othercatholic","otherorthodox","antiochian","armenian","assyrian","coptic","eastern","greek","romanian","russian","serbian","romancatholic","othercatholic","otherorthodox","adventist","anglican","baptist","brethren","churchofchrist","churchofgod","congregationalist","methodist","latterdaysaints","lutheran","pentecostal","presbyterian","otherchristian","nondenominational","neohindu","shaivite","veerashaiva","vaishnavite","otherhindu","conservative","orthodox","reconstructionist","reform","secular","otherjewish","ahmadi","druze","sunni","shiite","othermuslim","agnostic","atheist","deist","spiritual","theist","othernone","africantribal","bahai","indigenous","interfaith","jain","nativeamerican","pagan","rastafarian","scientologist","sikh","spiritist","unitarian","vodoun","zoroastrian","notlisted"]
},
{
            name:'Specific Religious Denomination',
            nameXML:'reldenom',//demographics
            equal:['Is','Is Not'],
            equalXML:['==','!='],
            values:["Jehovah\"s Witness","Seventh Day Adventist","Other Adventist","Anglican","Church of England","Church of Ireland","Episcopalian","Other Anglican","American Baptist Association","Baptist Bible Fellowship","Baptist General Conference","Conservative Baptist Association","Free Will Baptist","Fundamentalist Baptist","General Association of Regular Baptists","Independent Baptist (no denominational ties)","Missionary Baptist","National Baptist Convention","Northern Baptist","Primitive Baptist","Progressive Baptist","Southern Baptist","Other Baptist Church","Baptist, Do not know which","Church of the Brethren","Evangelical United Brethren","Grace Brethren","Plymouth Brethren","United Brethren/United Brethren in Christ","Other Brethren","Brethren-Do not know which","Christian Churches & Churches of Christ","Church of Christ","United Church of Christ","Other Church of Christ","Church of Christ-do not know which","Church of God (Anderson, IN)","Church of God (Cleveland, TN)","Church of God in Christ","Church of the Living God","Pentecostal Church of God","Worldwide Church of God","Other Church of God","Church of God-do not know which","African Methodist Episcopal","African Methodist Episcopal (Zion)","Christian Methodist Episcopal","Church of the Nazarene","Evangelical Methodist","Evangelical Covenant (Church)","Free Methodist","United Methodist","Wesleyan Methodist","Other Methodist Church","Other Wesleyan Church","Methodist-do not know which","Church of Jesus Christ of Latter Day Saints","Community of Christ","Other Latter Day Saint","LDS-do not know which","Evangelical Lutheran","Latvian Lutheran","Lutheran Church-Missouri Synod","Lutheran Church-Wisconsin Synod","Other Lutheran Church","Lutheran-do not know which","Assemblies of God","Christian & Missionary Alliance","Church of God of Prophecy","Foursquare Gospel","Full Gospel Fellowship","Holiness Church of God","House of Prayer","Open Bible Churches","Pentecostal Apostolic","Pilgrim Holiness","Pentecostal Assemblies of the World","Pentecostal Holiness Church","Pentecostal Church of God","Triumph Church of God","United Holiness","Other Apostolic","Other Charismatic","Other Holiness/Church of Holiness","Other Pentecostal","Cumberland Presbyterian Church","Evangelical Presbyterian Church","Orthodox Presbyterian Church","Presbyterian Church in America (PCA)","Presbyterian Church in the USA (PCUSA)","United Presbyterian Church in the USA","Other Presbyterian Church","Presbyterian-do not know which","Dutch Reformed","Evangelical and Reformed Church","International Council of Community Churches","Protestant Reformed Churches","Reformed Church in America","Reformed United Church of Christ","Other Reformed Church","Reformed-do not know which","Amish","Christian Scientist","Friend/Quaker","Mennonite","Metropolitan Community Churches","Religious Society of Friends (Conservative)","Salvation Army","Unitarian-Universalist","Other Christian","Calvary Chapel","Disciples of Christ","Churches of Christ in Christian Union","Evangelical","Grace Gospel Fellowship","Independent Fundamentalist","Interdenominational Church","Metropolitan Community Churches","Nondenominational church","United Church","Just a Christian"],
            valuesXML:["jehovahswitness","SDA","otheradventist","anglican","churchofengland","churchofireland","episcopalian","otheranglican","americanbaptist","baptistbible","baptistgeneral","conservativebaptist","freewillbaptist","fundamentalistbaptist","regularbaptist","independentbaptist","missionarybaptist","nationalbaptist","northernbaptist","primitivebaptist","progressivebaptist","southernbaptist","otherbaptist","unknownbaptist","churchofbrethren","evangelicalbrethren","gracebrethren","plymouthbrethren","unitedbrethren","otherbrethren","unknownbrethren","christianchurches","churchofchrist","unitedchurchofchrist","otherchurchofchrist","unknownchurchofchrist","churchofgodanderson","churchofgodcleveland","churchofgodinchrist","churchoflivinggod","pentecostalchurchofgod","worldwidechurchofGod","otherchurchofgod","unknownchurchofgod","africanmethodist","africanmethodistzion","christianmethodist","churchofnazarene","evangelicalmethodist","evangelicalcovenant","freemethodist","unitedmethodist","wesleyanmethodist","othermethodist","otherwesleyan","unknownmethodist","churchofjesuschrist","communityofchrist","otherlatterdaysaint","unknownlatterdaysaints","evangelicallutheran","latvianlutheran","lutheranchurchmissouri","lutheranchurchwisconsin","otherlutheran","unknownlutheran","assembliesofgod","christianmissionary","churchofgodprophecy","foursquaregospel","fullgospel","holinesschurch","houseofprayer","openbible","pentecostalapostolic","pilgrimholiness","pentecostalassemblies","pentecostalholiness","pentecostalchurch","triumphchurch","unitedholiness","otherapostolic","othercharismatic","otherholiness","otherpentecostal","cumberlandpresbyterian","evangelicalpresbyterian","orthodoxpresbyterian","pca","pcusa","unitedpresbyterian","otherpresbyterian","unknownpresbyterian","dutchreformed","evangelicalreformed","internationalcouncil","protestantreformed","reformedchurch","reformedunited","otherreformed","unknownreformed","amish","christianscientist","friend","mennonite","metropolitancommunity","religioussociety","salvationarmy","unitarian","otherchristian","calvarychapel","disciplesofchrist","churchesofchrist","evangelical","gracegospel","independentfundamentalist","interdenominational","metropolitancommunity","nondenominational","unitedchurch","justchristian"]
}


];