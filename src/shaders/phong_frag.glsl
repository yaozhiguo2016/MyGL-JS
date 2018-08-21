#ifdef GL_ES
precision mediump float;
#endif

struct Material
{
    vec3 emissive; //自身光线放射系数
    vec3 ambient;  //环境光
    vec3 diffuse;  //漫反射系数
    vec3 specular; //镜面反射系数
    float shininess; //高光系数
    float alpha; //透明度
};

struct Light
{
    vec4 position; //对于点光源，w==1, 平行光源w==0
    vec3 color; //光源颜色
    vec3 intensity; //光源强度系数
    bool enabled; //是否开启光源

    float scope; //对于点光源scope是有限的，平行光不设置
    float attenuate; //衰减因子，对点光源有效
};

const int MAX_LIGHT_NUM = 8; //最大光源数

//光源数组
uniform Light lights[MAX_LIGHT_NUM];
//表面材质
Material material;

//渲染的面，1 正面  2背面  3双面
uniform int side;

uniform Material frontMaterial; //正面材质
uniform Material backMaterial;  //背面材质


uniform vec3 globalAmbient;

uniform vec3 materialEmissive;
uniform vec3 materialAmbient;
uniform vec3 materialDiffuse;
uniform vec3 materialSpecular;
uniform float materialShiness;

varying vec3 v_ViewFragCood; //在视坐标系中，片元坐标
varying vec3 v_FragNormal;   //片元的法线，由顶点法线插值而来

uniform sampler2D u_sampler2d;  //2维纹理采样器
varying vec2 v_TexCood;  //片元纹理坐标

vec3 lighting(vec3 fragCoodInView, vec3 viewDirection, vec3 normal)
{
    vec3 textureColor = vec3(texture2D(u_sampler2d, v_TexCood));
    vec3 color = textureColor * materialAmbient * globalAmbient;//环境光反射

    for (int i = 0; i < 2; i++)
    {
        Light light = lights[i];

        //光源关闭
        if (!light.enabled) continue;

        //color += textureColor * materialAmbient * light.color;
        vec3 lightDirection;
        if (light.position.w == 0.0)//平行光源
        {
            lightDirection = normalize( light.position.xyz );
        }
        else //点光源
        {
            lightDirection = normalize( light.position.xyz / light.position.w - fragCoodInView );
        }
        float angle = max(dot(lightDirection, normal), 0.0);

        if (angle <= 0.0)continue;
        //漫反射分量
        color += textureColor * angle * (light.intensity * materialDiffuse) * light.color;

        //镜面反射方向
        vec3 reflectDirection = (2.0 * angle) * normal - lightDirection;
        float VRAngle = max(dot(viewDirection, reflectDirection), 0.0);
        if (VRAngle <= 0.0)continue;
        color += pow(VRAngle, materialShiness) * (light.intensity * materialSpecular) * light.color;
    }

    return color;
}

void main()
{
    vec3 tnormal = normalize(v_FragNormal);
    if (side == 2 || side == 3)//背面或双面渲染
    {
        if (!gl_FrontFacing)tnormal = -tnormal;
    }
    gl_FragColor = vec4(lighting(v_ViewFragCood, normalize(-v_ViewFragCood), tnormal), 1.0);
}