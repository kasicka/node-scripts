var fs = require('fs');
var exec = require('child_process').exec,
    child;

var pkgName = 'semver'

var tags = ['']

tags.forEach(function(tag) {
    var cmd = "";
    child = exec(cmd, function (error, stdout, stderr) {
            if (stdout.length > 153) {
                var version = stdout.substr((172 + pkgName.length), 7);
                console.log('pkg version: ' + version);
                console.log(typeof (version));
            } else {
                console.log('exec error: ' + error);
            }
        });
});



