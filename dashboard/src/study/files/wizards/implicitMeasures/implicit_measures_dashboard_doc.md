# Implicit Measures Wizard for Dashboard Documentation
#### Written by Elinor Bengayev, elinorb240@gmail.com

This file presents minimal documentation for the Implicit Measures Wizard as a feature in the Dashboard. You can find the documentation for the Stand Alone version [here](https://minnojs.github.io/minno-server/implicitMeasures/implicit_measures_SA_doc.md).
Only the major parts of the wizard are covered, the rest seems to be straightforward and intuitive, but you can contact me for additional support.   

First and foremost, to get started working on the project, please install the minno-server following [this guide](https://docs.google.com/document/d/1ZbobgBbhOvoREsod0ms4BYWDsafiIQozZJBDmKfptYI). 
It will get you all the Dahboard files, both server and client sides, but you will only need the client side ('dashboard' directory) and a specific part of it. 

To run the dashboard in the working environment and to update changes, enter this command:
```
npm run watch
```

The Implicit Measures Wizards folder is located in `minno-server/dashboard/src/study/files/wizards/implicitMeasures`. In this folder, there is a different folder for each task, and an additional folder called `resources`, which holds components that are used by multiple tasks wizards.
The style settings (i.e the css file) are defined in the global `minno-server/dashboard/src/style/style.scss` file (which bundled to a css file - `minno-server/dashboard/dist/style.css`).

#### General Info regarding all tasks:
*Note: I will refer to the iat files but it applies to all of the other task files as well.*

#### fileContext.js `(minno-server/dashboard/src/study/files/sidebar/fileContext.js)`
> In the sidebar of the study files window there is an option to create a file with a wizard `('+' button -> Wizard -> IAT Task)`.
> Here you can add the tasks' buttons to this sidebar, configuring its text and onclick action. Clicking the task's button, activates the function `createImplicitMeasure()` (located in 'fileActions.js') with the wanted type as parameter.

#### fileActions.js `(minno-server/dashboard/src/study/files/sidebar/fileActions.js)`
> By pressing the `IAT Task`, a pop-up window appears and asks to name the file **without** an extension.
> Pressing the button calls `createImplicitMeasure()`, which is defined in `fileActions.js`.
> This function creates two files: newTASK.taskType (i.e `newIAT.iat`) and a .js file with the same given name (i.e `newIAT.js`).

#### editorComponent.js `(minno-server/dashboard/src/study/files/editorComponent.js)`
> This file maps between the file type (identified by the file extrnsion) and it's appropriate editor. For example, a .txt file is managed with `textEditor.js`.
> In our case, for a `newIAT.iat` file, the `editorComponent.js` uses `iat.js`, and for 'newSPF.spf', `spf.js` is used, etc. 

#### iat.js `(minno-server/dashboard/src/study/files/wizards/implicitMeasures/IAT/iat.js)`
> This file is the root of the wizard. 

> For identifying whether it's the dashboard or the stand-alone version that called the component, there is the `external` variable which is a flag with false as a default value (the default version is the dashboard).
>> The meaning of `external = True` is that the we are in the SA version and it's practically means:
>> - `Output` and `Import` tabs will be displayed
>> - `save` button won't be shown
>> - `Image URL` default value changing accordingly
>> - Qualtrics related parameters won't be shown
>> - Additional minor differences

> The main functions of this file are:
> - Loading the previous session data from the server, and if there isn’t one, loading the default values of the task (`load()`). 
> - Display the task wizard by calling `tabsComponent.js`.
> - Save the data (`do_save()` that calls `save()` that in `implicitMeasuresGeneratorModel.js`)

#### implicitMeasuresGeneratorModel.js `(minno-server/dashboard/src/study/generator/implicitMeasuresGeneratorModel.js)`
> This file responsible for sending the data of the gui file (with `save()`) and the data of the .js file (with `saveToJS()`) to the server. So, we could load it in the next session. 

#### tabsComponent.js `(minno-server/dashboard/src/study/files/wizards/implicitMeasures/resources/tabsComponent.js)`
> Every wizard has a tabs file (i.e `iatTabs.js`) and a default settings (i.e `iatDefaultSettings.js`).
>> #### iatTabs.js `(minno-server/dashboard/src/study/files/wizards/implicitMeasures/IAT/iatTabs.js)`
>> Defines the wizard's various tabs, and the parameters for each tab (script name, label in the gui and a tooltip).
>> #### iatDefaultSettings.js `(minno-server/dashboard/src/study/files/wizards/implicitMeasures/IAT/iatDefaultSettings.js)`
>> Defines the initial settings for the script, according to the values defined in the extension file (i.e `iat9.js`). 

> The file tabsComponent.js gets both of those files and loads all the tabs components and the sub-tabs components (categories tab) according to them.  

#### utilities.js `(minno-server/dashboard/src/study/files/wizards/implicitMeasures/resources/utilities.js)`
> Includes various helper functions used by all wizards. 

#### iatOutputComponent.js `(minno-server/dashboard/src/study/files/wizards/implicitMeasures/IAT/iatOutputComponent.js)`
> There is an outputComponent for every wizard, that outputs a .js and JSON file. 
> #### createFile():
> Outputs the .js and JSON files.
> #### validityCheck():
> Checks the validity of the fields. Checks for main issues like - No Category's titles, no image URL entered but there is presence of images in the study (as stimuli), blocks' values are zeros, etc. For every wizard, there are different tests. 
> After every test, if there is an error, we push the relavent error to the main message variable, that displayed in the output tab if it isn't empty.
> #### updateSettings():
> Creates an object  out of all the `settings` attributes, according to the structure of the extension script.
> *Note: There are wizards that their attribute are called in different names. For example, in IAT, the CSS of the category is called 'stimulusCss' and in the STIAT it called 'css'. So, as a shortcut and so I could use the same components, I changed those names to 'stimulusCss' in the `defaultSettings` and then changed it back to 'css' in `updateMediaSettings()` (in the `outputComponent` file). I made those kinds of changes in multiple attributes in the various wizards.* 
> #### toScript(): 
> Creates the actual script by adding the header of the extension URL.
> #### toString():
> Returns the final script object. 

#### iatImportComponent.js `(minno-server/dashboard/src/study/files/wizards/implicitMeasures/IAT/iatImportComponent.js)`
> converts the JSON file to an object.  Here, like the output component in some wizards, the function updateMediaSettings() changes the attributes names that will be suitable to the gui fields names (as described before). 
