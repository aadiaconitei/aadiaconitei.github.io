"use strict";
const gulp = require('gulp');
// Load plugin
const sass = require('gulp-sass')(require('node-sass'));

// ca sa transformam fisiere sass/scss in fisiere css: gulp sass
gulp.task('sass', function () {
   return gulp.src('dev/scss/style.scss')
   .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest('assets/css'));
});