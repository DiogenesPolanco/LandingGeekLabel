var gulp = require("gulp"),
  util = require("gulp-util"),
  sass = require("gulp-sass"),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  serve = require('gulp-serve'),
  log = util.log;

var sassFiles = "sass/**/*.scss";

gulp.task("sass", function () {
  log("Generate css files " + (new Date()).toString());
  gulp.src(sassFiles)
    .pipe(sass({
      style: 'expanded'
    }))
    .pipe(autoprefixer("last 3 version", "safari 5", "ie 8", "ie 9"))
    .pipe(gulp.dest("assets/css"))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/css'));
});

gulp.task("watch", function () {
  log("Watching scss...");
  gulp.watch(sassFiles, ["sass"]);
});

gulp.task('copy', function () {
  return gulp
    .src('assets/**/*')
    .pipe(gulp.dest('dist/assets'));
}); 

gulp.task('html', function () {
  return gulp
    .src('index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ["sass", "html", "copy"]);

gulp.task('serve', ["build"], serve('./dist'));

gulp.task("default", ["serve"]);