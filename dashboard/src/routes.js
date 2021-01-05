import statisticsComponent from './study/statistics/statisticsComponent';
import statistics_oldComponent from './study/statistics_old/statisticsComponent';


import poolComponent from './pool/poolComponent';
import historyComponent from './pool/historyComponent';
import downloadsComponent from './downloads/downloadsComponent';
import downloadsAccessComponent from './downloadsAccess/downloadsAccessComponent';

import loginComponent from './login/loginComponent';
import filesComponent from './study/files/filesComponent';
import viewFilesComponent from './study/files/viewFilesComponent';

import studiesComponent from './study/studiesComponent';


import deployListComponent from 'deploy/forms/deployList/deployListComponent';
import changeRequestListComponent from 'deploy/forms/changeRequestList/changeRequestListComponent';
import removalListComponent from 'deploy/forms/removalList/removalListComponent';

import deployComponent from './deploy/deployComponent';
import removalComponent from './deploy/removalComponent';
import changeRequestComponent from './deploy/changeRequestComponent';

import addUserComponent from './addUser/addUserComponent';
import usersComponent from './admin/users/usersComponent';
import configComponent from './admin/config/configComponent';
import homepageComponent from './admin/homepage/homepageComponent';
import settingsComponent from './settings/settingsComponent';
import messagesComponent from './messages/messagesComponent';
import massMailComponent from './massMail/massMailComponent';

import activationComponent from './activation/activationComponent';
import collaborationComponent from './collaboration/collaborationComponent';
import resetPasswordComponent from './settings/resetPasswordComponent';
import recoveryComponent from './recovery/recoveryComponent';

import sharingComponent from 'study/sharing/sharingComponent';
import propertiesComponent from 'study/properties/propertiesComponent';
import ruletableComponent from 'ruletable/ruletableComponent';

import tagsComponent from 'tags/tagsComponent';
import translateComponent from 'study/templates/pagesComponent';

export default routes;

let routes = {
    '/tags':  tagsComponent,
    '/translate/:templateId':  translateComponent,
    '/translate/:templateId/:pageId':  translateComponent,
    '/template_studies' : studiesComponent,


    '/recovery':  recoveryComponent,
    '/activation/:code':  activationComponent,
    '/collaboration/:code':  collaborationComponent,
    '/settings':  settingsComponent,
    '/messages':  messagesComponent,
    '/reset_password/:code':  resetPasswordComponent,

    '/deployList': deployListComponent,
    '/removalList': removalListComponent,
    '/changeRequestList': changeRequestListComponent,
    '/addUser':  addUserComponent,
    '/users':  usersComponent,
    '/config':  configComponent,
    '/homepage':  homepageComponent,
    '/massMail':  massMailComponent,

    '/changeRequest/:studyId':  changeRequestComponent,
    '/studyRemoval/:studyId':  removalComponent,
    '/deploy/:studyId': deployComponent,
    '/login': loginComponent,
    '/studies' : studiesComponent,
    '/studies/statistics_old' : statistics_oldComponent,
    '/studies/statistics' : statisticsComponent,

    '/view/:code': viewFilesComponent,
    '/view/:code/version/:version_id': viewFilesComponent,

    '/view/:code/file/:fileId': viewFilesComponent,
    '/view/:code/version/:version_id/file/:fileId': viewFilesComponent,



    '/editor/:studyId': filesComponent,
    '/editor/:studyId/:version_id': filesComponent,
    '/editor/:studyId/:resource/:fileId': filesComponent,
    '/editor/:studyId/:version_id/:resource/:fileId': filesComponent,

    '/pool': poolComponent,
    '/pool/history': historyComponent,
    '/downloads': downloadsComponent,
    '/downloadsAccess': downloadsAccessComponent,
    '/sharing/:studyId': sharingComponent,
    '/properties/:studyId': propertiesComponent,
    '/ruletable': ruletableComponent,
    '/autupauseruletable': ruletableComponent

};

