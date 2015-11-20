var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    del = require('del'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    runSequence = require('run-sequence');

var config = {
    srcPath:'./assets/',
    bowerPath: './bower_components/',
    mainPath: './',
    libPath: 'lib/',
    assetPath: 'assets/',
    cssPath: 'css/',
    jsPath: 'js/',
    imgPath: 'img/'
};

gulp.task('Styles.clean', function (callback) {
    return del(config.mainPath + config.assetPath + config.cssPath + '*.*', callback);
});

gulp.task('Styles.scss', function () {
    return sass(config.srcPath + 'scss/main.scss')
        .on('error', function (error) {
            var lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';
            notify({
                title: 'Task Failed [' + error.plugin + ']',
                message: lineNumber + 'See console.',
                sound: 'Sosumi'
            }).write(error);
            gutil.beep();
            var report = '';
            var chalk = gutil.colors.white.bgRed;
            report += chalk('TASK:') + ' [' + error.plugin + ']\n';
            report += chalk('PROB:') + ' ' + error.message + '\n';
            if (error.lineNumber) {
                report += chalk('LINE:') + ' ' + error.lineNumber + '\n';
            }
            if (error.fileName) {
                report += chalk('FILE:') + ' ' + error.fileName + '\n';
            }
            console.error(report);
            this.emit('end');
        })
        .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gulp.dest(config.mainPath + config.assetPath + config.cssPath));
});

gulp.task('Styles.plaincss', function () {
    return gulp.src([config.bowerPath + 'normalize-css/*.css',config.bowerPath + 'animate.css/animate.min.css', 'src/assets/css/*.css'])
        .pipe(gulp.dest(config.mainPath + config.assetPath + config.cssPath));
});

gulp.task('Styles.minifycss', function () {
    return gulp.src([config.mainPath + config.assetPath + config.cssPath + 'normalize.css', config.mainPath + config.assetPath + config.cssPath + 'animate.min.css' , config.mainPath + config.assetPath + config.cssPath + 'main.css'])
        .pipe(concat('style.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(config.mainPath + config.assetPath + config.cssPath))
});



gulp.task('Styles', function (callback) {
    runSequence(
        'Styles.clean',
        'Styles.scss',
        'Styles.plaincss',
        'Styles.minifycss',
        callback);
});

gulp.task('Watch', function () {
    gulp.watch('assets/scss/**/*.scss', ['Styles']);
});




