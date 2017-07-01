uniform mat4 u_mvMatrix;
uniform mat4 u_ProjMatrix;
uniform mat4 u_NormalMatrix;

attribute vec4 a_Normal;
attribute vec4 a_Position;

varying vec3 v_ViewFragCood;
varying vec3 v_FragNormal;

void main()
{
    vec4 modelViewCood = u_mvMatrix * a_Position;
    gl_Position = u_ProjMatrix * modelViewCood;
    v_FragNormal = (u_NormalMatrix * a_Normal).xyz;
    v_ViewFragCood = modelViewCood.xyz;
}