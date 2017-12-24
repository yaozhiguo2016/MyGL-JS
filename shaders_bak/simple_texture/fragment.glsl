precision mediump float;

uniform sampler2D u_sampler2d;
varying vec2 v_TexCood;

void main() {
    gl_FragColor = texture2D(u_sampler2d, v_TexCood);
}
