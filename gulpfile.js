const gulp = require('gulp');
const clean = require('gulp-clean');
const compass = require('gulp-compass');
const minifyCSS = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const babelify = require('babelify');
const cache = require('gulp-cached');
const foreach = require('gulp-foreach');
const initialParam = require('./public/js/dev/self/env/initial');
const basicVendors = initialParam.libVendors;
const path = {
    SASS_SRC: 'scss',
    WORK_SRC: 'public',
    CSS_SRC: 'public/css',
    ASSET_SRC: 'public/assets',
    JS_SRC: 'public/js',
    JS_SRC_WORK: 'public/js/dev/self',
    DEST_SRC: 'dest',
    DEST_CSS_SRC: 'dest/css',
    DEST_ASSET_SRC: 'dest/assets',
    DEST_JS_SRC: 'dest/js'
};

gulp.task('compass-dev', function () {
    gulp.src(path.SASS_SRC + '/basic.scss').pipe(compass({
        sass: path.SASS_SRC,
        css: path.CSS_SRC
    })).pipe(gulp.dest(path.CSS_SRC));
});

gulp.task('compass-prod', function () {
    gulp.src(path.SASS_SRC + '/basic.scss').pipe(compass({
        sass: path.SASS_SRC,
        css: path.CSS_SRC
    })).pipe(minifyCSS()).pipe(gulp.dest(path.DEST_CSS_SRC));
});

gulp.task('copy-once', function () {
    gulp.src('node_modules/bootstrap-sass/assets/fonts/bootstrap/*').pipe(gulp.dest('public/assets/fonts/bootstrap/'));
    gulp.src('node_modules/holderjs/holder.min.js').pipe(gulp.dest(path.JS_SRC + '/dev'));
});
gulp.task('copy-main', function () {
    gulp.src(path.WORK_SRC + '/**/*.html').pipe(gulp.dest(path.DEST_SRC));
    gulp.src(path.ASSET_SRC + '/**').pipe(gulp.dest(path.DEST_ASSET_SRC));
    gulp.src(path.JS_SRC + '/dev/holder.min.js').pipe(gulp.dest(path.DEST_JS_SRC + '/dev/'));
});

gulp.task('browserify-vendor', function () {
    var b = browserify('basic.js', {basedir: path.JS_SRC_WORK});
    basicVendors.forEach(function (vendor) {
        if (vendor.expose) {
            b.require(vendor.name, {expose: vendor.expose});
        } else {
            b.require(vendor.name);
        }
    });
    var stream = b.transform('babelify', {presets: ['es2015', 'react']}).bundle().pipe(source('basic.js'));
    if (process.env.NODE_ENV == 'development') {
        stream.pipe(gulp.dest(path.JS_SRC));
    } else {
        stream.pipe(streamify(uglify())).pipe(gulp.dest(path.DEST_JS_SRC));
    }

});

gulp.task('browserify-app', function () {
    gulp.src([path.JS_SRC + '/dev/self/react/module/**/*.jsx']).pipe(cache('linting')).pipe(foreach(function (stream, file) {
        console.log(file.path);
        var b = browserify(file.path);
        var fileName = file.path.replace(/^.*[\\\/]/, '');
        var subPath = file.path.split(/[\\\/]react[\\\/]module[\\\/]/);
        subPath = subPath[1].replace(fileName, '').replace(/[\\]/, '\/');
        fileName = fileName.substr(0, fileName.lastIndexOf('.'));
        basicVendors.forEach(function (vendor) {
            if (vendor.expose) {
                b = b.external(vendor.expose);
            } else {
                b = b.external(vendor.name);
            }
        });
        var stream = b.transform('babelify', {presets: ['es2015', 'react']}).bundle().pipe(source(fileName + '.js'));
        if (process.env.NODE_ENV == 'development') {
            return stream.pipe(gulp.dest(path.JS_SRC + '/react/module/' + subPath));
        } else {
            return stream.pipe(streamify(uglify())).pipe(gulp.dest(path.DEST_JS_SRC + '/react/module/' + subPath));
        }
    }));
});


gulp.task('watch', function () {
    process.env.NODE_ENV = 'development';
    gulp.watch(path.SASS_SRC + '/**/*.scss', ['compass-dev']);
    gulp.watch(path.JS_SRC + '/dev/self/react/module/**/*.jsx', ['browserify-app']);
});

gulp.task('init', ['copy-once']);
//need a param to show if is needed to be node env
gulp.task('pre-dev', function () {
    process.env.NODE_ENV = 'development';
});
gulp.task('dev', ['pre-dev', 'browserify-vendor', 'browserify-app', 'compass-dev']);

gulp.task('pre-build', function () {
    process.env.NODE_ENV = 'production';
    return gulp.src(path.DEST_SRC, {read: false})
        .pipe(clean());
});
gulp.task('build', ['pre-build', 'browserify-vendor', 'browserify-app', 'compass-prod', 'copy-main']);
//next do intl and multi-module