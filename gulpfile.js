var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var coffee = require('gulp-coffee');
var coffeelint = require('gulp-coffeelint');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./www/js/*.js'],
  coffee: ['./www/coffee/*.coffee']
};

gulp.task('default', ['sass', 'lint', 'scripts', 'watch']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['lint', 'scripts']);
  gulp.watch(paths.coffee, ['compile-coffee']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('./www/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concat & minify JS & generate source maps
gulp.task('scripts', ['compile-coffee'], function() {
    return gulp.src('./www/js/*.js')
        .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(concat('all.min.js'))
            .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./www/js'))

});

// Minify HTML
gulp.task('minify-html', function() {
    return gulp.src('./www/templates/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('./dist'));
});

// Compile CoffeeScript and generate source maps
gulp.task('compile-coffee', ['coffee-lint'], function() {
    return gulp.src('./www/coffee/*.coffee')
        .pipe(sourcemaps.init())
            .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./www/js'));
});

// CoffeeScript Linting
gulp.task('coffee-lint', function() {
    return gulp.src('./www/coffee/*.coffee')
        .pipe(coffeelint())
        .pipe(coffeelint.reporter());
});