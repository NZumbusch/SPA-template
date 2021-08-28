// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
// const gls = require('gulp-live-server');

// Use dart-sass for @use
//sass.compiler = require('dart-sass');

// Sass Task
function scssTask() {
	return src('src/scss/styles.scss', { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(dest('dist', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask() {
	return src('src/js/**/*.js', { sourcemaps: true })
		.pipe(babel({ presets: ['@babel/preset-env']}))
		//.pipe(terser())
		.pipe(dest('dist/script/', { sourcemaps: '.' }));
}

// function serverTask() {
// 	//2. serve at custom port
// 	server = gls.static('.', 8888);
// 	server.start();
// }

// Watch Task
function watchTask() {
	// watch('*.html', file => {
	// 	server.notify.apply(server, [file]);
	// });
	watch(
		['src/scss/**/*.scss', 'src/**/*.js'],
		series(scssTask, jsTask)
	);
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, watchTask);
