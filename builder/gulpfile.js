////http://habrahabr.ru/post/250569/

'use strict';

var gulp = require('gulp'),
    //watch = require('gulp-watch'),
    //rigger = require('gulp-rigger'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

//var path = {
//    build: {
//        html: '../'
//    },
//    src: {
//        html: '../templates/index.html'
//    },
//    watch: {
//        html: '../templates/*.html'
//    }
//};

var config = {
    server: {
        baseDir: "../"
    },
    tunnel: true,
    host: 'localhost',
    port: 8000,
    logPrefix: "Frontend"
};

gulp.task('webserver', function () {
    browserSync(config);
});

//
//gulp.task('html:build', function () {
//    gulp.src(path.src.html)
//        .pipe(rigger())
//        .pipe(gulp.dest(path.build.html));
//});
//
//gulp.task('clean', function (cb) {
//    rimraf(path.clean, cb);
//});
//
//gulp.task('build', [
//    'html:build'
//]);
//
//
//gulp.task('watch', function () {
//    watch([path.watch.html], function (event, cb) {
//        gulp.start('html:build');
//    });
//});

gulp.task('default', ['webserver']);