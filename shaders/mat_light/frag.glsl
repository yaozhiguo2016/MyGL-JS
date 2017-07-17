precision mediump float;
struct materialProperties {  // A type that defines the set of material properties.
   vec3 ambient;
   vec3 diffuse;
   vec3 specular;
   vec3 emissive;
   float shininess;
};
struct lightProperties {  // A type that defines the set of light properties.
   vec4 position;   // position.w == 0 for a directional light.
   vec3 intensity;  // This is the color, but not restricted to the range 0 to 1.
   vec3 ambient;    // Amount added to global ambient when this light is enabled.
   bool enabled;
};
uniform materialProperties frontMaterial;
          // material for front faces (and for back faces if twoSided is false)
uniform materialProperties backMaterial;
          // material for back faces, used only if twoSided is true
materialProperties material;
          // This is the material that will actually be used on this fragment
uniform bool twoSided;
          // If true, back faces will have a different material from front faces
uniform mat3 normalMatrix;  // Matrix for transforming the normal vector.
uniform lightProperties light[4];  // data for four lights
uniform bool lit; // If false, no lighting is done;
                  // instead the unmodified diffuse material color is used.
uniform vec3 globalAmbient;
     // Amount of global ambient illumination, independent of the four lights.
varying vec3 viewCoords; // position in viewing coordinates, used for lighting.
varying vec3 vNormal;  // The interpolated normal vector.


vec3 lighting(vec3 fragCoodInView, vec3 viewDirection, vec3 normal)
{
       // A function to compute the color of this fragment using the lighting
       // equation.  vertex contains the coords of the points; V is a unit
       // vector pointing to viewer;  N is the normal vector.  This function
       // also uses the values in the global variables material and
       // light[0]..light[3].
   vec3 color = material.emissive + material.ambient * globalAmbient;//环境光反射
   for (int i = 0; i < 4; i++)
   {
       if (!light[i].enabled)continue;

       color += material.ambient * light[i].ambient;
       vec3 lightDirection;
       if (light[i].position.w == 0.0)//平行光源
       {
           lightDirection = normalize( light[i].position.xyz );
       }
       else //点光源
       {
           lightDirection = normalize( light[i].position.xyz / light[i].position.w - fragCoodInView );
       }
       float angle = dot(lightDirection,normal);
       if (angle  > 0.0)
       {
          //漫反射分量
          color += angle * (light[i].intensity * material.diffuse);
          //镜面反射方向
          vec3 reflectDirection = (2.0 * angle) * normal - lightDirection;
          float VRAngle = dot(viewDirection, reflectDirection);
          if ( VRAngle > 0.0)
          {
             color += pow(VRAngle, material.shininess) * (light[i].intensity * material.specular);
          }
       }
   }
   return color;
}

void main() {
   if (lit) {
      vec3 tnormal = normalize(normalMatrix*vNormal);
      if (!gl_FrontFacing)
          tnormal = -tnormal;
      if ( gl_FrontFacing || !twoSided)
         material = frontMaterial;
      else
         material = backMaterial;
      gl_FragColor = vec4( lighting(viewCoords, normalize(-viewCoords),tnormal), 1.0 );
   }
   else {
      if ( gl_FrontFacing || !twoSided )
          gl_FragColor = vec4(frontMaterial.diffuse, 1.0);
      else
          gl_FragColor = vec4(backMaterial.diffuse, 1.0);
   }
}