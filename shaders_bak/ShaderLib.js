/**
 * Created by yaozh on 2017/5/25.
 */
var ShaderLib = ShaderLib || {};
ShaderLib.point = {
    vert:
    'attribute vec4 a_Position;\n' +
    'void main(){\n'+
    '   gl_Position = a_Position;\n' +
    '   gl_PointSize = 1.0;\n' +
    '}\n',
    frag:
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' +
    'void main() {\n' +
    '   gl_FragColor = u_FragColor;\n' + // Set the color
    '}\n'
};

ShaderLib.getShader = function(key){
    return this[key];
};