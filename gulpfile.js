var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var open = require('open');

var browserYetOpen = false;

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});

gulp.task('livereload', function() {
    gulp.src('./index.html')
        .pipe(connect.reload())
        .on('error', handleError);

    if (!browserYetOpen) {
        open('http://localhost:8080');
        browserYetOpen = true;
    }
});

gulp.task('javascript', function() {
    gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(concat('app.min.js'))
            /*.pipe(uglify())*/
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build'));
});

gulp.task('vendors', function() {
    gulp.src('src/vendors/**/*.js')
        .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(concat('vendors.js'))
            /*.pipe(uglify())*/
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
    watch('src/js/**/*.js', function() {
        gulp.start('javascript');
    });
    watch('src/vendors/**/*.js', function() {
        gulp.start('vendors');
    });
});

gulp.task('default', ['javascript', 'vendors', 'watch'], function(){});

gulp.task('server', ['connect', 'default'], function() {
    gulp.watch('build/**', ['livereload']);
});