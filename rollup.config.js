import {version} from './package.json';
import bubel from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import includePaths from 'rollup-plugin-includepaths';
import { terser } from 'rollup-plugin-terser';

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
        resolve(),
        commonjs(),
        // load paths without a leading slash of src
        includePaths({ paths: ['dashboard/src'] }),
        bubel(),
        production && terser() // minify, but only in production
    ]
};
