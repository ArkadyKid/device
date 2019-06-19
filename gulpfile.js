var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    cssNano     = require('gulp-cssnano'),
    rename      = require('gulp-rename');

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.{sass,scss}')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('cssMin', function() {
    return gulp.src('app/css/**/*.css')
    .pipe(cssNano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'));
})

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

gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('code'));
    gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('sass','browser-sync','watch'));
