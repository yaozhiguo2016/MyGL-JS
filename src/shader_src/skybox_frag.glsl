#ifdef GL_ES
precision mediump float;
#endif

uniform samplerCube u_samplerCube;
varying vec3 v_TexCood;

void main() {
    gl_FragColor = textureCube(u_samplerCube, v_TexCood);
}