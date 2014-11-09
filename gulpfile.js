var gulp = require('gulp'),
	watch = require('gulp-watch'),
	stylus = require('gulp-stylus'),
	uglify = require('gulp-uglifyjs'),
	lazy = require('lazypipe'),

	templatizer = require('templatizer'),

	tplSrc = './client/tpl/',
	tplMatch = tplSrc + '**/*.jade',
	tplDest = './public/js/',
	tplFile = tplDest + 'templates.js',

	cssSrc = './client/css/',
	cssMatch = cssSrc + '*.styl',
	cssDest = './public/css/',

	compose = {
		tpl: lazy()
			.pipe(uglify)
			.pipe(gulp.dest, tplDest),
		css: lazy()
			.pipe(stylus, {
				compress: true
			})
			.pipe(gulp.dest, cssDest)
	};

gulp.task('default', ['compile', 'watch'], function() {

});

gulp.task('compile', ['tpl', 'css'], function() {

});

gulp.task('watch', ['tplw', 'cssw'], function() {

});

gulp.task('tpl', function() {
	templatizer(tplSrc, tplFile);
	gulp.src(tplFile).pipe(compose.tpl());
});

gulp.task('css', function() {
	gulp.src(cssMatch).pipe(compose.css());
});

gulp.task('tplw', function() {
	gulp.src(tplMatch)
		.pipe(watch(tplMatch, function(files) {
			gulp.start('tpl');
		}));
	// gulp.watch(tplMatch, ['tpl']);
});

gulp.task('cssw', function() {
	gulp.src(cssMatch)
		.pipe(watch(cssMatch, function(files) {
			return files.pipe(compose.css());
		}));
});
