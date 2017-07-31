/**
 * Created by sachin on 26/7/17.
 */
var requirejs = require('requirejs'),
    fs = require('fs'),
    config = {
        baseUrl: '../javascripts',
        mainConfigFile: 'common.js',
        dir: './js-built',
        optimize: 'uglify2',
        modules: [
            {
                name: 'common'
            },
            {
                name: 'index',
                exclude: ['common']
            },
            {
                name: 'header',
                exclude: ['common']
            },
            {
                name:'sellbook',
                exclude:['common']
            }

        ]
    },
    deleteFolderRecursive = function (path) {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
            return true;
        }
        return false;
    }
    ;

//  cleanup previous build dir
if( deleteFolderRecursive(config.dir) ) {
    console.log("\nold build directory deleted.");
}

// build
requirejs.optimize(config, function (buildResponse) {
    console.log("\nproject built in " + config.dir + ' :');
    console.log(buildResponse);
}, function(err) {
    console.log("\nerror creating build !");
    console.log(err);
});