export default {"cubemap_frag.glsl":"#ifdef GL_ES\nprecision mediump float;\n#endif\nuniform samplerCube texMap;\nvarying vec3 v_TexCood;\nvoid main()\n{\n    vec4 color = textureCube(texMap, v_TexCood);\n    gl_FragColor = color;\n}","cubemap_vert.glsl":"uniform mat4 u_MvpMatrix;\nattribute vec4 a_Position;\nvarying vec3 v_TexCood;\nvoid main()\n{\n    gl_Position = u_MvpMatrix * a_Position;\n    v_TexCood = a_Position.xyz;\n}","phong_frag.glsl":"#ifdef GL_ES\nprecision mediump float;\n#endif\nstruct Material\n{\n    vec3 emissive;     vec3 ambient;      vec3 diffuse;      vec3 specular;     float shininess;     float alpha; };\nstruct Light\n{\n    vec4 position;     vec3 color;     vec3 intensity;     bool enabled; \n    float scope;     float attenuate; };\nconst int MAX_LIGHT_NUM = 8; \nuniform Light lights[MAX_LIGHT_NUM];\nMaterial material;\nuniform int side;\nuniform Material frontMaterial; uniform Material backMaterial;  \nuniform vec3 globalAmbient;\nuniform vec3 materialEmissive;\nuniform vec3 materialAmbient;\nuniform vec3 materialDiffuse;\nuniform vec3 materialSpecular;\nuniform float materialShiness;\nvarying vec3 v_ViewFragCood; varying vec3 v_FragNormal;   \nuniform sampler2D u_sampler2d;  varying vec2 v_TexCood;  \nvec3 lighting(vec3 fragCoodInView, vec3 viewDirection, vec3 normal)\n{\n    vec3 textureColor = vec3(texture2D(u_sampler2d, v_TexCood));\n    vec3 color = textureColor * materialAmbient * globalAmbient;\n    for (int i = 0; i < 2; i++)\n    {\n        Light light = lights[i];\n                if (!light.enabled) continue;\n                vec3 lightDirection;\n        if (light.position.w == 0.0)        {\n            lightDirection = normalize( light.position.xyz );\n        }\n        else         {\n            lightDirection = normalize( light.position.xyz / light.position.w - fragCoodInView );\n        }\n        float angle = max(dot(lightDirection, normal), 0.0);\n        if (angle <= 0.0)continue;\n                color += textureColor * angle * (light.intensity * materialDiffuse) * light.color;\n                vec3 reflectDirection = (2.0 * angle) * normal - lightDirection;\n        float VRAngle = max(dot(viewDirection, reflectDirection), 0.0);\n        if (VRAngle <= 0.0)continue;\n        color += pow(VRAngle, materialShiness) * (light.intensity * materialSpecular) * light.color;\n    }\n    return color;\n}\nvoid main()\n{\n    vec3 tnormal = normalize(v_FragNormal);\n    if (side == 2 || side == 3)    {\n        if (!gl_FrontFacing)tnormal = -tnormal;\n    }\n    gl_FragColor = vec4(lighting(v_ViewFragCood, normalize(-v_ViewFragCood), tnormal), 1.0);\n}","phong_no_texture_frag.glsl":"#ifdef GL_ES\nprecision mediump float;\n#endif\nstruct Material\n{\n    vec3 emissive;\n    vec3 ambient;\n    vec3 diffuse;\n    vec3 specular;\n    float shininess;\n    float alpha;\n};\nstruct Light\n{\n    vec4 position;     vec3 color;\n    vec3 intensity;\n    bool enabled;\n    float scope;    float attenuate; };\nconst int MAX_LIGHT_NUM = 8;\nuniform Light lights[MAX_LIGHT_NUM];\nMaterial material;\nuniform int side;\nuniform Material frontMaterial;\nuniform Material backMaterial;\nuniform vec3 globalAmbient;\nuniform vec3 materialEmissive;\nuniform vec3 materialAmbient;\nuniform vec3 materialDiffuse;\nuniform vec3 materialSpecular;\nuniform float materialShiness;\nvarying vec3 v_ViewFragCood;\nvarying vec3 v_FragNormal;\nvec3 lighting(vec3 fragCoodInView, vec3 viewDirection, vec3 normal)\n{\n    vec3 color = materialEmissive + materialAmbient * globalAmbient;\n    for (int i = 0; i < 2; i++)\n    {\n        Light light = lights[i];\n                if (!light.enabled) continue;\n        color += materialAmbient * light.color;\n        vec3 lightDirection;\n        if (light.position.w == 0.0)        {\n            lightDirection = normalize( light.position.xyz );\n        }\n        else         {\n            lightDirection = normalize( light.position.xyz / light.position.w - fragCoodInView );\n        }\n        float angle = max(dot(lightDirection, normal), 0.0);\n        if (angle <= 0.0)continue;\n                color += angle * (light.intensity * materialDiffuse) * light.color;\n                vec3 reflectDirection = (2.0 * angle) * normal - lightDirection;\n        float VRAngle = max(dot(viewDirection, reflectDirection), 0.0);\n        if (VRAngle <= 0.0)continue;\n        color += pow(VRAngle, materialShiness) * (light.intensity * materialSpecular) * light.color;\n    }\n    return color;\n}\nvoid main()\n{\n    vec3 tnormal = normalize(v_FragNormal);\n    if (side == 2 || side == 3)    {\n        if (!gl_FrontFacing)tnormal = -tnormal;\n    }\n    gl_FragColor = vec4(lighting(v_ViewFragCood, normalize(-v_ViewFragCood), tnormal), 1.0);\n}","phong_no_texture_vert.glsl":"uniform mat4 u_mvMatrix;\nuniform mat4 u_ProjMatrix;\nuniform mat4 u_NormalMatrix;\nattribute vec4 a_Normal;\nattribute vec4 a_Position;\nvarying vec3 v_ViewFragCood;\nvarying vec3 v_FragNormal;\nvoid main()\n{\n    vec4 modelViewCood = u_mvMatrix * a_Position;\n    gl_Position = u_ProjMatrix * modelViewCood;\n    v_FragNormal = (u_NormalMatrix * a_Normal).xyz;\n    v_ViewFragCood = modelViewCood.xyz;\n}","phong_vert.glsl":"uniform mat4 u_mvMatrix;\nuniform mat4 u_ProjMatrix;\nuniform mat4 u_NormalMatrix;\nattribute vec4 a_Normal;\nattribute vec4 a_Position;\nvarying vec3 v_ViewFragCood;\nvarying vec3 v_FragNormal;\nattribute vec2 a_TexCood;\nvarying vec2 v_TexCood;\nvoid main()\n{\n    vec4 modelViewCood = u_mvMatrix * a_Position;\n    gl_Position = u_ProjMatrix * modelViewCood;\n    v_FragNormal = (u_NormalMatrix * a_Normal).xyz;\n    v_ViewFragCood = modelViewCood.xyz;\n    v_TexCood = a_TexCood;\n}"}