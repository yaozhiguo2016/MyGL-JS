uniform mat4 u_MvpMatrix;

attribute vec4 a_Position;
varying vec3 v_TexCood;

void main()
{
    gl_Position = u_MvpMatrix * a_Position;
    v_TexCood = a_Position.xyz;
}