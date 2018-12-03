var fs = require('fs');
var path = require('path');
var filePath = path.resolve('./../dist');
var fileOutputPath = path.resolve('./../build');
(() => {
    String.prototype.replacePx2Rem = function(str) {
        str = str.substring(0, str.length - 2);
        str /= 100;
        str += 'rem';
        return str;
    }
    fs.exists(fileOutputPath, (exists) => {
        if (!exists) {
            fs.mkdir(fileOutputPath, (err) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    start();
                }
            });
        } else start();
    });

    function start() {
        fs.readdir(filePath, (err, files) => {
            if (err) {
                console.log(err);
                return;
            }
            files.forEach((fileName) => {
                let inputFile = path.join(filePath, fileName);
                fs.stat(inputFile, (err, stat) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    let isFile = stat.isFile();
                    if (isFile) {
                        var content = fs.readFileSync(inputFile, 'utf-8');
                        content = content.replace(/\b((\d+)|(\d+\.\d+))px/igm, '$1'.replacePx2Rem);
                        var outputFlie = path.join(fileOutputPath, fileName);
                        fs.writeFile(outputFlie, content, 'utf-8', function(error) {
                            if (error) {
                                console.log(error);
                                return false;
                            }
                            console.log('写入成功');
                        });
                    }
                });
            });
        })
    }
})();