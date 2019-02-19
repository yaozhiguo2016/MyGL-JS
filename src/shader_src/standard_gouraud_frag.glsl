#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_sampler2d;  //2维纹理采样器
varying vec2 v_TexCood;  //片元纹理坐标
varying vec3 v_color;

uniform bool u_HasTexture;

void main() {
    vec3 textureColor = vec3(1.0, 1.0, 1.0);
    if (u_HasTexture) {
        textureColor = vec3(texture2D(u_sampler2d, v_TexCood));
    }
    gl_FragColor = vec4(textureColor * v_color, 1.0);
}
