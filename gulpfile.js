/**
 * Created by sachin on 24/7/17.
 */
var gulp  = require('gulp');

var watch = require('gulp-watch');
var rename  = require('gulp-rename');
var notify  = require('gulp-notify');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var crypto = require('crypto');

// css Build Dependencies
var less  = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var autoprefixer  = require('gulp-autoprefixer');

// JS Build Dependencies
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var preprocess = require('gulp-preprocess');
var exec = require('child_process').exec;
var color = require('gulp-color');
var cleanDest = require('gulp-clean-dest');

// prod task to compile and concat js files into a minified bundle
gulp.task('js',function(cb){

    process.chdir('./public/javascripts/'); // Changing the directory
    console.log(color('Starting JS Bundling!', 'BLUE'));
    exec('node build.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        console.log(color('Finished JS Bundling', 'GREEN'));
        console.log(' ');
        // cb();
    });

});


/* Task to minify css */
gulp.task('less', function() {

    console.log('Hash code in prodless - ', hash);

    return gulp.src(['./assets/less/main.less'])
        .pipe(cleanDest('./public/css/'))
        .pipe(less({
            compress: false,
            globalVars: {
                hash: 'gphash'+ hash.toString('utf8')
            }
        }).on('error', function(err){
            gutil.log(err);
            this.emit('end');
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%', 'not ie < 8', 'ff >= 20', 'last 2 Chrome versions']
        }))
        .pipe(rename('main.css'))
        .pipe(gulp.dest('./public/css/'))
        .pipe(minifyCSS({keepBreaks: false}))
        .pipe(rename('main.min.css'))
        // .pipe(rename('main-' + hash + '.min.css'))
        .pipe(gulp.dest('./public/css/'))
        .pipe(notify('(PROD)Less Compiled, Prefixed and Minified'));

});


/* dev task that watches the files for changes and performs respective tasks */
gulp.task('watch', ["browser-sync"],function(){
    gulp.watch('./assets/less/**/*.less', ['devless','browser-reload']);
    // gulp.watch('./public/javascripts/dev/**/*.js', ['js','browser-reload']);
    // gulp.watch('./assets/js/**/*.js', ['browser-reload']);
});


/* Proxying our local server http://localhost:<port>*/
gulp.task('browser-sync', function() {
    // browserSync.init({
    //     // proxy: "localhost:" + config.port
    //     proxy: "localhost:3000"
    // });
});

/*Task to reload the browser*/
gulp.task('browser-reload', function(){
    // browserSync.reload();
})

gulp.task('hbs', ['hash', 'less','js'], function() {

    console.log('Hash code in hbs - ', hash);

    return gulp.src('./views/layout.handlebars')
        .pipe(preprocess({
            context: {
                hash : hash
            }
        }))
        .pipe(rename('layout.handlebars'))
        .pipe(gulp.dest('./views/'))
        .pipe(notify('(PROD) MainProd hbs file created'));
});
/* default task to be executed on running gulp */
// gulp.task('default', ['hash','less','js'], function() {

// });
gulp.task('default', ['hbs'], function() {

});
var hash = "";
gulp.task('hash', function(){
    // create a unique hash code
    hash = crypto.createHash('sha1').update((new Date().getTime().toString())).digest('hex');
    console.log('Hash code generated - ', hash);
    return hash;
});
