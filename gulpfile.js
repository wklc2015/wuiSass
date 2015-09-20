'use strict';

var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    notify     = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    plumber    = require('gulp-plumber'),
    connect    = require('gulp-connect')
	;

/**
 * project path
 * */
var path = {
	sass: ['sass/*.scss'],
	css:  'css/',
	html: 'demo/*.html'
};

gulp.task('sass', function () {
	gulp.src(path.sass)
		.pipe(plumber()) //plumber给pipe打补丁
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(gulp.dest(path.css))
		.pipe(notify({
			message: 'sass task complete'
		}))
		.pipe(connect.reload());
});

gulp.task('html', function () {
	gulp.src(path.html)
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(path.sass, ['sass']);
	gulp.watch(path.html, ['html']);
});

gulp.task('server', function () {
	connect.server({
		livereload: true,
		port:       8082
	});
});

gulp.task('default', ['server', 'watch']);