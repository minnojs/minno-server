// eslint env:"node"

import {version} from './package.json';
const bannerIAT = `/**
 * @preserve minnojs-iat-dashboard v${version}
 * @license Apache-2.0 (${(new Date()).getFullYear()})
 */
`;

const bannerBIAT = `/**
* @preserve minnojs-biat-dashboard v${version}
* @license Apache-2.0 (${(new Date()).getFullYear()})
*/
`;


const configIAT = {
    input: './IAT/iat.index.standalone.js',
    output: {
        file: 'iat_index.js',
        format: 'iife', 
        name: 'iatDashboard',
        sourcemap:true,
        banner: bannerIAT
    }
};

const configBIAT = {
    input: './BIAT/biat.index.standalone.js',
    output: {
        file: 'biat_index.js',
        format: 'iife', 
        name: 'biatDashboard',
        sourcemap:true,
        banner: bannerBIAT
    }
};

// at some time we might want to outputs, one as a standalone, one as a plugin
export default [ configIAT, configBIAT ];
