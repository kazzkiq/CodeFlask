import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/codeflask.js',
	output: [
		{
			sourcemap: false,
			format: 'umd',
			name: 'CodeFlask',
			file: 'build/codeflask.min.js'
		},
		{
			sourcemap: false,
			format: 'es',
			name: 'CodeFlask',
			file: 'build/codeflask.module.js'
		},
	],
	plugins: [
		resolve(),
		commonjs(),
		production && terser()
	]
};
