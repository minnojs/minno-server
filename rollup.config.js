import {version} from './package.json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import buble from '@rollup/plugin-buble';
import { terser } from '@rollup/plugin-terser';
import includePaths from 'rollup-plugin-includepaths';


const production = process.env.NODE_ENV == 'production';
const banner = `/**
 * @preserve minno-dashboard v${version}
 * @license Apache-2.0 (${(new Date()).getFullYear()})
 */
`;

export default {
    input: 'dashboard/src/main.js',
    output :{
        format: 'iife',
        file: 'dashboard/dist/main.js',
        sourcemap: true,
        banner
    },
plugins: [
    nodeResolve(),
	commonjs({
	  requireReturnsDefault: true
	}),


    includePaths({ paths: ['dashboard/src'] }),
    buble(),
    production && terser()
]

};
