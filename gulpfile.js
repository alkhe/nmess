var gulp = require('gulp'),
	cached = require('gulp-cached'),
	stylus = require('gulp-stylus'),
	uglify = require('gulp-uglify'),
	to5 = require('gulp-6to5'),

	jsDir = './client/js/',
	jsMatch = jsDir + '**/*.js',
	jsDest = './public/js/',

	cssDir = './client/css/',
	cssMatch = cssDir + '**/*.styl',
	cssDest = './public/css/';

gulp.task('default', ['compile', 'watch'], function() {

});

gulp.task('compile', ['js', 'css'], function() {

});

gulp.task('watch', ['jsw', 'cssw'], function() {

});

gulp.task('js', function() {
	gulp.src(jsMatch)
		.pipe(cached('js'))
		.pipe(to5())
		.pipe(uglify())
		.pipe(gulp.dest(jsDest));
});

gulp.task('css', function() {
	gulp.src(cssMatch)
		.pipe(cached('js'))
		.pipe(stylus({
			compress: true
		}))
		.pipe(gulp.dest(cssDest));
});

gulp.task('jsw', function() {
	gulp.watch(jsMatch, ['js']);
});

gulp.task('cssw', function() {
	gulp.watch(cssMatch, ['css']);
});
