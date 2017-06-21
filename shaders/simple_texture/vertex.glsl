attribute vec4 a_Position;
attribute vec2 a_TexCood;
varying vec2 v_TexCood;

void main() {
    gl_Position = a_Position;
    v_TexCood = a_TexCood;
}
