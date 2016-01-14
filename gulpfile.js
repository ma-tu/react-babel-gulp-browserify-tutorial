var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');

var config = {
  watchFiles: ['./src/jsx/*.jsx','./src/**/*.js'],
  entryFile: './src/jsx/example.jsx',
  destDir: './public/scripts/',
  destFile: 'example.js',
};

//Browserify
gulp.task('browserify', function() {
  browserify(config.entryFile, {debug: true})
    .transform(babelify)
    .bundle()
    .on("error", function (err) {console.log("ERROR: " + err.message);})
    .pipe(source(config.destFile))
    .pipe(gulp.dest(config.destDir))
});

//Watch Task
gulp.task('watch', function() {
  gulp.watch(config.watchFiles, ['browserify'])
});

//Server
gulp.task('server', function () {
  nodemon({ script: './server.js'
          , ext: 'html js json'
          , ignore: ['./node_modules', './src']})
    .on('restart', function () {
      console.log('restarted!')
    })
})

gulp.task('default', ['browserify', 'watch', 'server']);
