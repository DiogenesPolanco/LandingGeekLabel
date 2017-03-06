var gulp = require("gulp"), 
		util = require("gulp-util"), 
		sass = require("gulp-sass"), 
		autoprefixer = require('gulp-autoprefixer'), 
		minifycss = require('gulp-minify-css'), 
		rename = require('gulp-rename'), 
		log = util.log;
 
var sassFiles = "sass/**/*.scss";

gulp.task("sass", function(){ 
		log("Generate css files " + (new Date()).toString());
    gulp.src(sassFiles)
            .pipe(sass({ style: 'expanded' }))
						.pipe(autoprefixer("last 3 version","safari 5", "ie 8", "ie 9"))
            .pipe(gulp.dest("assets/css"))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest('assets/css'));
});

gulp.task("watch", function(){
    log("Watching scss...");
    gulp.watch(sassFiles, ["sass"]);
});

gulp.task("default", ["sass"]);