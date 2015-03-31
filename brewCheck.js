var fs = require('fs');
var exec = require('child_process').exec,
    child;

var pkgName = 'semver'

var tags = ['rhscl-1.0-rhel-6',
    'rhscl-1.1-rhel-6',
    'rhscl-1.1-rhel-7',
    'rhscl-1.2-rhel-6',
    'rhscl-1.2-rhel-7',
    'rhscl-2.0-rhel-6',
    'rhscl-2.0-rhel-7'];

tags.forEach(function(tag) {
    var cmd = 'brew latest-pkg ' + tag + '-build nodejs010-nodejs-' + pkgName;
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



