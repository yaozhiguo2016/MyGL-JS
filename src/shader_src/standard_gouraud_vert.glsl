uniform mat4 u_mvMatrix;
uniform mat4 u_ProjMatrix;
uniform mat4 u_NormalMatrix;

attribute vec4 a_Normal;
attribute vec4 a_Position;

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
    float intensity; //光源强度系数

    float scope; //对于点光源scope是有限的，平行光不设置
    float attenuate; //衰减因子，对点光源有效

    vec3 direction; // 聚光灯半轴方向
    float theta; // 聚光灯半径边沿与半轴方向的夹角
};

const int MAX_LIGHT_NUM = 8; //最大光源数

//光源数组
uniform Light lights[MAX_LIGHT_NUM];


//渲染的面，1 正面  2背面  3双面
uniform int side;

//uniform Material frontMaterial; //正面材质
//uniform Material backMaterial;  //背面材质
//表面材质
//Material material;


uniform vec3 u_globalAmbient;

uniform vec3 u_materialEmissive;
uniform vec3 u_materialAmbient;
uniform vec3 u_materialDiffuse;
uniform vec3 u_materialSpecular;
uniform float u_materialShiness;

//varying vec3 v_ViewFragCood; //在视坐标系中，片元坐标
//varying vec3 v_FragNormal;   //片元的法线，由顶点法线插值而来
attribute vec2 a_TexCood;
varying vec2 v_TexCood;  //片元纹理坐标

uniform int u_NumLight;

uniform bool u_HasTexture;

varying vec3 v_color;

/**
 * 计算环境光反射后的颜色值；同时判断是否有纹理，有纹理时需要计算纹理颜色和反射颜色的调制结果；反之使用自发光的颜色和反射光叠加
*/
vec3 calculateAmbientColor() {
   if (u_HasTexture) {
       return u_materialAmbient * u_globalAmbient;
   }
   return u_materialEmissive + u_materialAmbient * u_globalAmbient;
}

/**
* 光的衰减函数：
* @param light 光源信息
* @param distance 当前片元与光源的距离
* @return 片元处的光强
*/
float lightIntensity(Light light, float distance) {
    float att = 1.0 / pow(distance, 0.9) * light.attenuate;
    return att * light.intensity;
    //return light.intensity;
}

vec3 lighting(vec3 fragCoodInView, vec3 viewDirection, vec3 normal) {
    //vec3 textureColor = vec3(1.0, 1.0, 1.0);
    vec3 color = calculateAmbientColor();

    for (int i = 0; i < MAX_LIGHT_NUM; i++) {
        if (i >= u_NumLight) break; // 超过实际光源数量时，不再执行
        Light light = lights[i];
        bool isDirectionalLight = light.position.w == 0.0; // 是否平行光源
        vec3 lightDirection = isDirectionalLight ? normalize( light.position.xyz ) :
            normalize( light.position.xyz / light.position.w - fragCoodInView );
        float angle = max(dot(lightDirection, normal), 0.0); // 光源方向和法线夹角
        if (angle <= 0.0)continue; // 片元位于背光面， 不计算本光源的光照

        float intensity = light.intensity;

        if (!isDirectionalLight) {//点光源
            float distance = distance(fragCoodInView, light.position.xyz);
            if (distance > light.scope) continue; // 超出光源范围， 不计算本光源的光照
            if (light.theta > 0.0) { // 聚光灯是点光源的特例
                float fragTheta = dot(-lightDirection, normalize(light.direction)); // 片元与聚光灯方向的夹角
                fragTheta = max(fragTheta, 0.0);
                if (fragTheta < light.theta) continue; // 夹角过大，超出光源区域
            }
            intensity = lightIntensity(light, distance);
        }

        //漫反射分量，如果没有纹理，纹理颜色值默认是(1.0, 1.0, 1.0)，即乘以单位1，不变
        color += angle * (intensity * u_materialDiffuse) * light.color;

        //镜面反射分量
        // Phong
        /*vec3 reflectDirection = reflect(-lightDirection, normal);//(2.0 * angle) * normal - lightDirection;
        float VRAngle = max(dot(viewDirection, reflectDirection), 0.0);
        if (VRAngle <= 0.0)continue;
        color += pow(VRAngle, u_materialShiness) * (intensity * u_materialSpecular) * light.color;*/

        // Blinn-Phong
        vec3 halfDirection = (viewDirection + lightDirection); // 视线方向和光源方向的二分夹角
        float halfAngle = max(dot(normalize(halfDirection), normal), 0.0);
        if (halfAngle == 0.0) continue;
        color += pow(halfAngle, u_materialShiness) * (intensity * u_materialSpecular) * light.color;
    }

    return color;
}

void main()
{
    /*vec4 modelViewCood = u_mvMatrix * a_Position;
    gl_Position = u_ProjMatrix * modelViewCood;
    v_FragNormal = (u_NormalMatrix * a_Normal).xyz;
    v_ViewFragCood = modelViewCood.xyz;
    if (u_HasTexture) {
        v_TexCood = a_TexCood;
    }*/

    vec4 pos = u_ProjMatrix * u_mvMatrix * a_Position;
    gl_Position = pos;
    vec3 normal = (u_NormalMatrix * a_Normal).xyz;
    if (side == 2 || side == 3)//背面或双面渲染
    {
        //if (!gl_FrontFacing)tnormal = -tnormal;
    }
    v_color = lighting(pos.xyz, normalize(-pos).xyz, normalize(normal));
    if (u_HasTexture) {
        v_TexCood = a_TexCood;
    }
}
