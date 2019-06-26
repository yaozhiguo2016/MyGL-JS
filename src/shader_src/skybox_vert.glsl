attribute vec3 a_Position;

uniform mat4 u_ViewMatrix;
uniform mat4 u_ProjMatrix;

varying vec3 v_TexCood;

void main() {
    vec4 pos = u_ProjMatrix * u_ViewMatrix * vec4(a_Position, 1.0);
    /**
    透视除法（perspective division）是在顶点着色器运行之后执行的，把gl_Position的xyz坐标除以w元素。
    利用这个信息，我们可以把输出位置的z元素设置为它的w元素，
    这样就会导致z元素等于1.0了，因为，当透视除法应用后，它的z元素转换为w/w = 1.0：
    https://www.cnblogs.com/alps/p/7112872.html
    */
    gl_Position = pos.xyww; 
    v_TexCood = a_Position;
}