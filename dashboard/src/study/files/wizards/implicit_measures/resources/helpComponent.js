
let links = {IAT: 'https://minnojs.github.io/minnojs-blog/qualtrics-iat/', BIAT: 'https://minnojs.github.io/minnojs-blog/qualtrics-biat/'};

let helpComponent = {view: function(ctrl, settings, defaultSettings, type){return m('.activation.centrify', [m('.alert.alert-info',{role:'alert'}, m('p',{style:{margin:'0.5em 1em 0.5em 1em'}}, 'This tool creates a script for running an '+type+' in your online study. The script uses Project Implicit’s '+type+ ' extension, which runs on MinnoJS, a JavaScript player for online studies. ', m('a',{href: 'http://projectimplicit.net/'}, 'Project Implicit '), 'has developed MinnoJS to program web studies. To create '+type+'s, we programmed a general script (the “extension”) that runs an '+type+
					' based on parameters provided by another, more simple script. In this page, you can create a script that uses our '+type+' extension. You can read more about the basic idea of using extensions in Minno ', m('a',{href: 'https://github.com/baranan/minno-tasks/blob/master/implicitmeasures.md'}, 'on this page. '), 'We run those scripts in ', m('a',{href: 'https://minnojs.github.io/docsite/minnosuitedashboard/'}, 'Open Minno Suite, '), 'our platform for running web studies. You can install that platform on your own server, use a more simple ', m('a',{href: 'https://minnojs.github.io/minnojs-blog/csv-server/'}, 'php server for Minno, '), 'or run ', m('a',{href: links[type]}, 'this script directly from Qualtrics.')))]);}
};

export default helpComponent;
