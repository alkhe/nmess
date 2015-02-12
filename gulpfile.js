var gulp = require('gulp'),
	watch = require('gulp-watch'),
	stylus = require('gulp-stylus'),
	uglify = require('gulp-uglify'),
	to5 = require('gulp-6to5'),
	lazy = require('lazypipe'),

	jsSrc = './client/js/',
	jsMatch = jsSrc + '**/*.js',
	jsDest = './public/js/',

	cssSrc = './client/css/',
	cssMatch = cssSrc + '**/*.styl',
	cssDest = './public/css/',

	compose = {
		js: lazy()
			.pipe(uglify)
			.pipe(to5)
			.pipe(gulp.dest, jsDest),
		css: lazy()
			.pipe(stylus, {
				compress: true
			})
			.pipe(gulp.dest, cssDest)
	};

gulp.task('default', ['compile', 'watch'], function() {

});

gulp.task('compile', ['js', 'css'], function() {

});

gulp.task('watch', ['jsw', 'cssw'], function() {

});

gulp.task('js', function() {
	gulp.src(jsMatch).pipe(compose.js());
});

gulp.task('css', function() {
	gulp.src(cssMatch).pipe(compose.css());
});

gulp.task('jsw', function() {
	watch(jsMatch, function(files, next) {
		files.pipe(compose.js());
		next();
	});
});

gulp.task('cssw', function() {
	watch(cssMatch, function(files, next) {
		files.pipe(compose.css());
		next();
	});
});
