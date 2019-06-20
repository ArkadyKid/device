/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var cssMin = require('gulp-clean-css');
var rename = require('gulp-rename');
var del = require('del');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

gulp.task('sass', () => gulp.src('app/sass/style.{sass,scss}')
  .pipe(plumber())
  .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
  .pipe(autoprefixer(['last 15 versions', '> 1%'], { cascade: true }))
  .pipe(cssMin())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({ stream: true })));

gulp.task('autoprefixer', () => gulp.src('app/css/**/*.css')
  .pipe(autoprefixer())
  .pipe(rename({ suffix: '.pref' }))
  .pipe(gulp.dest('app/css')));

gulp.task('cssMin', () => gulp.src('app/css/**/*.css')
  .pipe(cssMin())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('app/css')));

gulp.task('cssNative', () => gulp.src('app/sass/style.{sass,scss}')
  .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
  .pipe(gulp.dest('dist/css')));

gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: 'app',
    },
    notify: false,
  });
});

gulp.task('scripts', () => gulp.src('app/libs/**/*.js')
  .pipe(browserSync.reload({ stream: true })));

gulp.task('code', () => gulp.src('app/*.html')
  .pipe(browserSync.reload({ stream: true })));

gulp.task('clean', async () => del.sync('dist'));

gulp.task('clear', callback => cache.clearAll());

gulp.task('prebuild', async () => {
  const buildCss = gulp.src('app/css/**/*')
    .pipe(gulp.dest('dist/css'));

  const buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

  const buildJs = gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'));

  const buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('img', () => gulp.src('app/img/**/*')
  .pipe(cache(imagemin({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{ removeViewBox: false }],
    use: [pngquant()],
  })))
  .pipe(gulp.dest('dist/img')));

gulp.task('watch', () => {
  gulp.watch('app/sass/**/*.{sass,scss}', gulp.parallel('sass', 'cssNative'));
  gulp.watch('app/*.html', gulp.parallel('code'));
  gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('sass', 'browserSync', 'watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'cssNative', 'img', 'sass'));
