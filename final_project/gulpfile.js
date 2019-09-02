var gulp = require('gulp')
var sass = require('gulp-sass')
var babel = require('gulp-babel')

gulp.task('css',function(){
	return gulp.src('./week10homework1.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./build'))
})

gulp.task('js',function(){
	return gulp.src('./week10homework1.js')
		.pipe(babel({
            presets: ['@babel/env']
        }))
		.pipe(gulp.dest('./build'))
})

gulp.task('default', gulp.series('css','js'))