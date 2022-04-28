# Implicit Measures Wizard for Stand-Alone Documentation
#### Written by Elinor Bengayev, elinorb240@gmail.com

This file presents minimal documentation for the Implicit Measures Wizard as the Stand Alone (SA) version. 
It's recommended to first view [the documentation of the Dashboard version](https://github.com/minnojs/minno-server/blob/master/dashboard/src/study/files/wizards/implicitMeasures/implicit_measures_dashboard_doc.md). It covers the core componentes of the wizards, whereas the current documentation covers only the SA specific files. 

To run the project in the working environment and to update changes, enter this command:

```
npm run watch-implicit
```

This command bundles all the wizards' .js files to a `task_index.js` (i.e `iat_index.js`) file. 
Changes for the different components will be made in the .js files of the wizards located in `minno-server/dashboard/src/study/files/wizards/implicitMeasures`.

The SA version is powered by `GitHub pages`. For this purpose, in the repository settings, the `pages` option must be enabled. In addition, the source of the publication needs to be the `docs` directory in the master branch. That’s the reason the SA is located in `docs/implicitMeasures`. 

> #### index.html `(minno-server/docs/implicitMeasures/index.html)`
> This is the main page that displays all the wizards. By clicking on a wizard button, the page referenced to `implicit.html` with the wizard's type. 
> #### implicit.html `(minno-server/docs/implicitMeasures/view/implicit.html)`
> Here, the file loads the page script by its type (given in the URL - i.e `href="view/implicit.html?type=iat"`). 
> The script loaded is `../jsFiles/type_index.js (i.e iat_index.js)`.
> #### iat_index.js `(minno-server/docs/implicitMeasures/jsFiles/iat_index.js)`
> Created with [rollup](https://rollupjs.org/guide/en/). Simply, it bundles all the components into one big .js file. The setting for the rollup is in `rollup.config-implicit.js`. This rollup is calling `iat.index.standalone.js` which calls the `iat.js` with the `external = True`, that indicates that we are calling the wizard for SA purposes. 
> #### style.css `(minno-server/docs/implicitMeasures/view/style.css)`
> Also rolled up, from `dashboard/src/style/style.scss`.
