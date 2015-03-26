#!/usr/bin/env node

/*
 * Compares module's dependencies and devDependencies with brew
 */

console.log(process.argv);

var request = require("superagent");
var cheerio = require("cheerio");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var pkgName = String((process.argv).slice(-1));
// pkgName = "buffer-equal";

request
    .get('http://registry.npmjs.org/' + pkgName)
    .end(function(err, res) {
        var info = res.body;
        var latestVersion = info['dist-tags'].latest;
        console.log(latestVersion);
        var deps = (info.versions[latestVersion].dependencies);
        var devDeps = info.versions[latestVersion].devDependencies;
        console.log("Dependencies: " + JSON.stringify(deps));
        console.log("devDeps: " + JSON.stringify(devDeps));

        if (typeof deps !== "undefined") {
            Object.keys(deps).forEach(function (dep) {
                (function () {
                    request
                        .get(dep)
                        .end(function (err, res) {
                            //console.log(err);
                            var $ = cheerio.load(res.text);
                            var html = $('tr[class=row-odd] td').html();
                            if (html == 'No search results') {
                                console.log("404 " + dep)
                            }
                            else {
                                console.log("200 " + dep)
                            }
                            //console.log(html)
                        });
                })();
            });
        } else {
            console.log("No deps.")
        }

        if (typeof devDeps !== "undefined") {
            Object.keys(devDeps).forEach(function (devDep) {
                var url = devDep;
                (function () {
                    request
                        .get(url)
                        .end(function (err, res) {
                            var $ = cheerio.load(res.text);
                            var html = $('tr[class=row-odd] td').html();
                            if (html == 'No search results') {
                                console.log("404 " + devDep)
                            }
                            else {
                                console.log("200 " + devDep)
                            }
                            //console.log(html)
                        });
                })();
            });
        } else {
            console.log("No devDeps.");
        }
    });

