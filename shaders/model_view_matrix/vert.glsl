attribute vec4 a_Position;
attribute vec4 a_Color;
varying vec4 v_Color;
uniform mat4 mvpMatrix;

void main()
{
    gl_Position = mvpMatrix * a_Position;
    v_Color = a_Color;
}