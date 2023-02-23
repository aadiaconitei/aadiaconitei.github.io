"use strict";
const gulp = require("gulp");
// Load plugin
const sass = require("gulp-sass")(require("node-sass"));
var rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css'); 
var minify = require('gulp-minify');
var concat = require('gulp-concat');
// ca sa transformam fisiere sass/scss in fisiere css: gulp sass
gulp.task("sass", function () {
  return gulp
    .src("dev/scss/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dev/css"));
});

// ca sa optimizam fisierele css : gulp css
gulp.task("css", () => {
  return gulp
    .src("dev/css/style.css")

    .pipe(
      cleanCSS({ debug: true }, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
      }),
    )
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("assets/css/"));
});
// ca sa optimizam fisierele js : gulp pack-js
gulp.task('pack-js', function () {    
  return gulp.src(['dev/js/*.js'])
      .pipe(concat('custom.js'))
      .pipe(gulp.dest('assets/js'))
      .pipe(minify())
      .pipe(gulp.dest('assets/js'));
});

// genereaza in mod automat fisierul css la modificarile diin fisierele scss
gulp.task('sass:watch', function () {
  gulp.watch('dev/scss/style.scss', gulp.series('sass','css'));
  
});

// optional pentru imagini : gulp images
/*
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageResize = require('gulp-image-resize');
*/
gulp.task('images', () => {
  
//   specificam dimensiunea imaginilor
  const sizes = [
    { width: 576, quality: 100, suffix: 'small' },
    { width: 768, quality: 60, suffix: 'medium' },
    { width: 992, quality: 80, suffix: 'large' },
  ];
  let stream;
  sizes.forEach((size) => {
    stream = gulp
//     calea catre imaginile pe care le dorim sa le optimizam
      .src('assets/images/call-to-action.jpg')
      ///.src('assets/**/*')  // recursiv in toate subfolderele
      // daca apare o eroare nu se opreste si sare peste
      .pipe(plumber())
//     resize image
      .pipe(imageResize({ width: size.width }))
//       add suffix to image
      .pipe(
        rename((path) => {
          path.basename += `-${size.suffix}`;
        }),
      )
//     reduce image quality based on the size
      .pipe(
        imagemin(
          [
            imageminMozjpeg({
              quality: size.quality,
            }),
          ],
          {
            verbose: true,
          },
        ),
      )
//     output optimized images to a destination folder
      .pipe(gulp.dest('assets/images'));
  });
  return stream;
});
