attribute vec3 coords;
 attribute vec3 normal;
 uniform mat4 modelview;
 uniform mat4 projection;
 varying vec3 viewCoords;
 varying vec3 vNormal;
 void main() {
    vec4 tcoords = modelview*vec4(coords,1.0);
    viewCoords = tcoords.xyz;
    gl_Position = projection * tcoords;
    vNormal = normal;
 }