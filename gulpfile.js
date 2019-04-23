'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var react = require('gulp-react');
var runSequence = require('run-sequence');
var gulpif = require('gulp-if');
var minifyCss = require('gulp-minify-css');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');

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
    .pipe(gulp.dest('app'))
    .pipe(connect.reload());
});

gulp.task('html:watch', function () {
  gulp.watch(['app/**/*.html'], gulp.serie('html'));
});

gulp.task('sass', function () {
  return gulp.src('app/assets/sass/**/app.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('sass:watch', function () {
  gulp.watch('app/assets/sass/**/*.scss',['sass']);
});

gulp.task('jsx', function () {
    return gulp.src('app/assets/js/src/app.jsx')
        .pipe(react())
        .pipe(gulp.dest('app/assets/js'));
});
// Probleme à régler
gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('app'));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('watch', ['browserSync', 'sass:watch'], function (){
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/assets/js/**/*.js', browserSync.reload);
});

gulp.task('build', function(callback) {
  runSequence('sass','connect','watch', callback);
});
