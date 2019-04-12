'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

sass.compiler = require('node-sass');

gulp.task('connect', function() {
  connect.server({
	port: 8888,
	root: 'app',
    	livereload: true
  });
connect.serverClose();
});

gulp.task('html', function () {
  gulp.src('app/**/*.html')
    .pipe(gulp.dest('./app'))
    .pipe(connect.reload());
});

gulp.task('html:watch', function () {
  gulp.watch(['app/**/*.html'], gulp.serie('html'));
});

gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('app/sass/**/*.scss', gulp.series('sass'));
});



/*
*/
