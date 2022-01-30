import {version} from './package.json';

function createBanner(type){
    return `/**
    * @preserve minnojs-${type}-dashboard v${version}
    * @license Apache-2.0 (${(new Date()).getFullYear()})
    */
    `;
}

function configTask(type){
    return {
        input: `./dashboard/src/study/files/wizards/implicitMeasures/${type.toUpperCase()}/${type}.index.standalone.js`,
        output: {
            file: `./docs/implicitMeasures/jsFiles/${type}_index.js`,
            format: 'iife',
            name: `${type}Dashboard`,
            sourcemap:true,
            banner: createBanner(type)
        }
    };
}



export default [configTask('iat'), configTask('biat'), configTask('stiat'),
    configTask('spf'), configTask('ep'), configTask('amp')];