/**
 * Created by yjtx on 16/4/27.
 */

var file = require('./file.js');
var child_process = require('child_process');


var list = file.getDirectoryAllListing(file.joinPath('../Examples/src/examples/'));

var projectRoot = "projects";

for (var i = 0; i < list.length; i++) {
    var filePath = list[i];
    var fileName = file.getFileName(filePath);

    var content = file.read(filePath);
    content = content.replace(fileName, "Main");
    
    var names = content.match(/\/\/name:.*/);
    if (names) {
        content = content.replace(names[0], "");

        var name = names[0];
        name = name.substring(name.indexOf(":") + 1);
        name = name.trim();
        if (name.length != 0) {
            fileName = name;
        }
    }
    else {
        console.warn(fileName + " 没有写 docs");
    }

    var output = file.joinPath('..', projectRoot, fileName);

    file.remove(output);
    file.createDirectory(output);
    
    file.copy(file.joinPath('../Examples/template'), file.joinPath(output, "template"));
    file.copy(file.joinPath('../Examples/favicon.ico'), file.joinPath(output, "favicon.ico"));


    var libs = content.match(/\/\/libs:.*/);
    if (libs) {
        content = content.replace(libs[0], "");
        
        var propertystr = file.read(file.joinPath('../Examples/egretProperties.json'));
        var properties = JSON.parse(propertystr);
        
        var modules = properties["modules"];
        var modulePaths = {};
        for (var ii = 0; ii < modules.length; ii++) {
            var tmodule = modules[ii];
            modulePaths[tmodule["name"]] = tmodule["path"];
        }
        properties["modules"] = [];

        var lib = libs[0];
        lib = lib.substring(lib.indexOf(":") + 1);
        lib = lib.trim();
        if (lib.length > 0) {
            libs = lib.split(",");
            for (var j = 0; j < libs.length; j++) {
                if (modulePaths[libs[j]]) {
                    properties["modules"].push(
                        {
                            "name": libs[j],
                            "path": modulePaths[libs[j]]
                        }
                    );
                }
                else {
                    properties["modules"].push(
                        {
                            "name": libs[j]
                        }
                    );
                }
            }
        }

        file.save(file.joinPath(output, "egretProperties.json"), JSON.stringify(properties, null, 4));
    }
    else {
        console.warn(fileName + " 没有写 libs");
    }

    var resources = content.match(/\/\/resources:.*/);
    if (resources) {
        content = content.replace(resources[0], "");

        var resource = resources[0];
        resource = resource.substring(resource.indexOf(":") + 1);
        resource = resource.trim();
        if (resource.length == 0) {
            file.createDirectory(file.joinPath(output, 'resource'));
        }
        else {
            resources = resource.split(",");
            for (var j = 0; j < resources.length; j++) {
                file.copy(file.joinPath('../Examples', resources[j]), file.joinPath(output, resources[j]));
            }
        }
    }
    else {
        console.warn(fileName + " 没有写 resources");
    }

    var contentDoc = "";
    var docs = content.match(/\/\/docs:.*/);
    if (docs) {
        content = content.replace(docs[0], "");
        
        var doc = docs[0];
        doc = doc.substring(doc.indexOf(":") + 1);
        contentDoc = doc.replace(/\\n/g, "\n *      ");
        doc = doc.replace(/\\n/g, "\n\n");
        doc = doc.trim();
        file.save(file.joinPath(output, "README.md"), doc);
    }
    else {
        console.warn(fileName + " 没有写 docs");
    }

    var logHtml = content.match(/\/\/log:.*/);
    if (logHtml) {
        content = content.replace(logHtml[0], "");
        
        var htmlContent = file.read(file.joinPath('../Examples/test.html'));
        htmlContent = htmlContent.replace(/data-show-log=".*?"/, 'data-show-log="true"');
        
        file.save(file.joinPath(output, "index.html"), htmlContent);
    }
    else {
        file.copy(file.joinPath('../Examples/test.html'), file.joinPath(output, "index.html"));
    }

    content = content.trim();
    
    content = 
`/**
 * @copyright www.egret.com
 * @author yjtx
 * @desc ` + contentDoc + `
 */

` + content;
    file.save(file.joinPath(output, "src/Main.ts"), content);
    
    var buildCmd = function (output) {
        var build = child_process.exec('egret b ' + output + ' -e', {});
        build.stdout.on("data", function (data) {
            console.log(data);
        });
        build.stderr.on("data", function (data) {
            console.log(data);
        });
        build.on("exit", function (result) {
            if (result == 0) {
                publishCmd(output);
            }
            else {
                
            }
        });
        return build;
    }
    var publishCmd = function (output) {
        var build = child_process.exec('egret publish ' + output + ' --version 001', {});
        build.stdout.on("data", function (data) {
            console.log(data);
        });
        build.stderr.on("data", function (data) {
            console.log(data);
        });
        build.on("exit", function (result) {
            if (result == 0) {
                console.log(output + " finish!")
            }
            else {
                
            }
        });
        return build;
    }
    
    buildCmd(file.joinPath(output));
}
