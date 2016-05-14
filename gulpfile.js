var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    inject = require('gulp-inject')
    bowerFiles = require('main-bower-files'),
    runSequence = require('run-sequence'),
    merge = require('merge-stream'),
    series = require('stream-series');

gulp.task('clean', function(){
    return gulp.src('dist', {read: false})
		.pipe(clean({force: true}));
});

gulp.task('index', function () {
  gulp.src('./src/index.html')
  .pipe(inject(series(
    gulp.src(bowerFiles(), {read: false}),
    gulp.src('./src/**/*.css', {read: false}),
    gulp.src('./src/**/*.js', {read: false})
  ), {relative: true}))
  .pipe(gulp.dest('./src'));
});

//create distribution
gulp.task('concat-js', function(){
  return gulp.src(['src/js/**/*.js'], { base: 'src' })
      .pipe(concat('app.js'))
      .pipe(gulp.dest('dist'))
});

gulp.task('concat-css', function(){
  return gulp.src(['src/css/**/*.css'], { base: 'src' })
      .pipe(concat('app.css'))
      .pipe(gulp.dest('dist'))
});

gulp.task('build', function (cb) {
  runSequence('clean', ['concat-js', 'concat-css', 'copy'], cb)
});

gulp.task('dist', ['build'], function(done) {
  var vendorJSStream = gulp.src('./dist/vendors/**/*.js', {read: false});
  var appJSStream = gulp.src('./dist/*.js', {read: false});

  var vendorCSSStream = gulp.src('./dist/vendors/**/*.css', {read: false});
  var appCSSStream = gulp.src('./dist/*.css', {read: false});

  return gulp.src('./src/index.html')
  .pipe(inject(series(vendorJSStream,appJSStream,
    vendorCSSStream,appCSSStream), {relative: true}))
  .pipe(gulp.dest('./dist'));
});

gulp.task('copy', function () {

  var paths = [
    { src: './bower_components/semantic/dist/semantic.min.js', dest: './dist/vendors/semantic' },
    { src: './bower_components/semantic/dist/*.min.css', dest: './dist/vendors/semantic' },
    { src: './bower_components/semantic/dist/themes/**/*', dest: './dist/vendors/semantic/themes' },
    { src: './bower_components/jquery/dist/jquery.min.js', dest: './dist/vendors/jquery' },
    { src: './bower_components/jsoneditor/dist/jsoneditor.min.js', dest: './dist/vendors/jsoneditor' },
    { src: './bower_components/jsoneditor/dist/*.min.css', dest: './dist/vendors/jsoneditor' },
    { src: './bower_components/jsoneditor/dist/img/**/*', dest: './dist/vendors/jsoneditor/img' }
  ];

  var tasks = paths.map(function (path) {
    return gulp.src(path.src).pipe(gulp.dest(path.dest));
  })

  return merge(tasks);
});
