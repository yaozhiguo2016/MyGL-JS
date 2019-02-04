/**
 * Created by yaozh on 2017/12/22.
 */
const fs = require('fs');

var files = {};
function compress(path, fileName) {
    var that = this;
    if (fs.statSync(path).isFile()) {
        var content = fs.readFileSync(path, {encoding:'utf8'});
        var transformCode = content.replace(/[\t]*\/\/.*\n/g, '') // remove //
            .replace(/[\t]*\/\*[\s\S]*?\*\//g, '') // remove /* */
            .replace(/\n{2,}/g, '\n'); // # \n+ to \n
        if (fileName)files[fileName] = transformCode;
    }
    try {
        fs.readdirSync(path).forEach(function (file) {
            compress.call(that, path + '/' + file, file)
        })
    } catch (e) {
        //console.log(e);
    }
}

module.exports = function () {
    compress('./src/shader_src/');
    fs.writeFileSync('./src/utils/ShaderSourceLib.ts', 'export default ' + JSON.stringify(files));
};