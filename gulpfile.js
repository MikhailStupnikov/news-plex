var gulp = require('gulp'),
	browserSync = require('browser-sync');

gulp.task('server', function() {
	browserSync({
		port: 9000,
		server: {
		baseDir: 'app'
		}
	});
});

gulp.watch([
	'app/*.html',
	'app/css/**/*.css',
	'app/js/**/*.js'
]).on('change', browserSync.reload);

gulp.task('default', ['server']);