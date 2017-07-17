#ifdef GL_ES
precision mediump float;
#endif

uniform samplerCube texMap;
varying vec3 v_TexCood;

void main()
{
    vec4 color = textureCube(texMap, v_TexCood);
    gl_FragColor = color;
}