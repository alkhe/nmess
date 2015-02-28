var gulp = require('gulp'),
	cached = require('gulp-cached'),
	stylus = require('gulp-stylus'),
	uglify = require('gulp-uglify'),
	babel = require('gulp-babel'),

	jsmatch = './client/js/**/*.js',
	jsdest = './public/js/',

	cssmatch = './client/css/**/*.styl',
	cssdest = './public/css/';

gulp.task('default', ['compile', 'watch'], function() {

});

gulp.task('compile', ['js', 'css'], function() {

});

gulp.task('watch', ['jsw', 'cssw'], function() {

});

gulp.task('js', function() {
	gulp.src(jsmatch)
		.pipe(cached('js'))
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest(jsdest));
});

gulp.task('css', function() {
	gulp.src(cssmatch)
		.pipe(cached('js'))
		.pipe(stylus({
			compress: true
		}))
		.pipe(gulp.dest(cssdest));
});

gulp.task('jsw', function() {
	gulp.watch(jsmatch, ['js']);
});

gulp.task('cssw', function() {
	gulp.watch(cssmatch, ['css']);
});
