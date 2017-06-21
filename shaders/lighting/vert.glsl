attribute vec4 a_Position;
attribute vec4 a_Color;
attribute vec4 a_Normal;

uniform mat4 mvpMatrix;
uniform vec3 u_LightColor;
uniform vec3 u_LightDirection;
uniform vec3 u_AmbientLight;

varying vec4 v_Color;

void main()
{
    gl_Position = mvpMatrix * a_Position;
    // Make the length of the normal 1.0
    vec3 normal = normalize(vec3(a_Normal));
    // Dot product of light direction and orientation of a surface
    float angle = max(dot(u_LightDirection, normal), 0.0);
    // Calculate the color due to diffuse reflection
    vec3 diffuse = u_LightColor * vec3(a_Color) * angle;//光的混合是相乘，光的叠加是相加
    vec3 ambient = vec3(a_Color) * u_AmbientLight;
    v_Color = vec4(diffuse + ambient, a_Color.a);
}
