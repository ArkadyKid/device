'use strict';

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    cssMin       = require('gulp-clean-css'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return gulp.src('app/sass/**/*.{sass,scss}')
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(autoprefixer(['last 15 versions', '> 1%'], { cascade: true }))
  .pipe(cssMin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('autoprefixer', function() {
  return gulp.src('app/css/stylenative.css')
  .pipe(autoprefixer())
  .pipe(rename({suffix: '.pref'}))
  .pipe(gulp.dest('app/css'))
});

gulp.task('cssMin', function() {
  return gulp.src('app/css/**/*.css')
  .pipe(cssMin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('app/css'))
});

gulp.task('nativecss', function() {
  return gulp.src('app/sass/**/*.{sass,scss}')
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(gulp.dest('dist/css'))
});

gulp.task('browser-sync', function() {
  browserSync({
      server: {
          baseDir: 'app'
      },
      notify: false
  })
});

gulp.task('scripts', function() {
  return gulp.src(['app/js/common.js', 'app/libs/**/*.js'])
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('code', function() {
  return gulp.src('app/*.html')
  .pipe(browserSync.reload({ stream: true }))
});

gulp.task('clean', async function() {
  return del.sync('dist');
});

gulp.task('clear', function (callback) {
  return cache.clearAll();
});

gulp.task('prebuild', async function() {

  var buildCss = gulp.src('app/css/**/*')
  .pipe(gulp.dest('dist/css'))

  var buildFonts = gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))

  var buildJs = gulp.src('app/js/**/*.js')
  .pipe(gulp.dest('dist/js'))

  var buildHtml = gulp.src('app/*.html')
  .pipe(gulp.dest('dist'));

});

gulp.task('img', function() {
  return gulp.src('app/img/**/*')
  .pipe(cache (imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
  })))
  .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function() {
  gulp.watch('app/sass/**/*.{sass,scss}', gulp.parallel('sass'));
  gulp.watch('app/*.html', gulp.parallel('code'));
  gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'nativecss', 'img', 'sass'));
