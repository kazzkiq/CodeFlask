import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

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
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve(),
		commonjs(),

		// If we're building for production (npm run build
		// instead of npm run dev), transpile and minify
		production && buble({ exclude: 'node_modules/**' }),
		production && uglify()
	]
};
