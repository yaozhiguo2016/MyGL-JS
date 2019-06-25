import ShaderObject from "./ShaderObject";
import Mesh from "../core/Mesh";
import ShaderHelper from "../utils/ShaderHelper";
import RenderContext from "../RenderContext";
import Scene3D from "../core/Scene3D";
import Camera from "../cameras/Camera";
import Quaternion from "../math/Quaternion";
import Vector3 from "../math/Vector3";
import Matrix4 from "../math/Matrix4";
import Light from "../lights/Light";
import Vector4 from "../math/Vector4";
import StandardMaterial from "../materials/StandardMaterial";
import Geometry from "../primitives/Geometry";
import PointLight from "../lights/PointLight";
import SpotLight from "../lights/SpotLight";

/**
 * Created by yaozh on 2019/5/27.
 * 
 */

 export default class StandardShaderObject extends ShaderObject {
    public static MAX_NUM_LIGHTS:number = 8;

    public extractAttributesAndUniforms():void {
      const attrs = [
        'a_Position', 
        'a_Normal', 
        'a_TexCood'
      ];
      for (let attr of attrs) {
        this.addAttribute(attr);
      }

      const uniforms = [
        'u_mvMatrix',
        'u_ProjMatrix',
        'u_NormalMatrix',
        'u_globalAmbient',
        'u_materialAmbient',
        'u_materialDiffuse',
        'u_materialSpecular',
        'u_materialShiness',
        'side',
        'u_materialEmissive',
        'u_sampler2d',
        'u_NumLight',
        'u_HasTexture'
      ];

      for (let i:number = 0; i < StandardShaderObject.MAX_NUM_LIGHTS; i++) {
        uniforms.push("lights[" + i + "].position");
        uniforms.push("lights[" + i + "].color");
        uniforms.push("lights[" + i + "].intensity");
        uniforms.push("lights[" + i + "].scope");
        uniforms.push("lights[" + i + "].attenuate");
        uniforms.push("lights[" + i + "].direction");
        uniforms.push("lights[" + i + "].theta");
      }

      for (let uniform of uniforms) {
        this.addUniform(uniform);
      }
    }

    public setAttributesAndUniforms(scene: Scene3D, mesh: Mesh):void {
      ShaderHelper.uniform1i(this.getUniform('side'), mesh.surfaceSide);
      ShaderHelper.uniform1i(this.getUniform('u_NumLight'), mesh.scene.lights.length);
      this.handleMVP(scene, mesh);
      this.handleLights(scene, mesh);
      this.handleMaterials(scene, mesh);
      this.setShaderDataFromMesh(mesh);
    }

    protected handleMVP(scene: Scene3D, mesh:Mesh):void {
      let camera:Camera = scene.currentCamera;
  
      //Model-View-Projection
      mesh.updateWorldMatrix();
      camera.updateWorldMatrix();
      mesh.modelViewMatrix.multiplyMatrices(camera.inverseWorldMatrix, mesh.worldMatrix);
      ShaderHelper.uniformMatrix4fv(this.getUniform('u_mvMatrix'), false, mesh.modelViewMatrix.elements);
      ShaderHelper.uniformMatrix4fv(this.getUniform('u_ProjMatrix'), false, camera.projMatrix.elements);
  
      //法线转换
      mesh.normalMatrix.getInverse(mesh.worldMatrix, true);
      mesh.normalMatrix.transpose();
      let q:Quaternion = new Quaternion();
      camera.inverseWorldMatrix.decompose(new Vector3(), q, new Vector3());
      let qm:Matrix4 = new Matrix4();
      mesh.normalMatrix.premultiply(qm.makeRotationFromQuaternion(q));
      ShaderHelper.uniformMatrix4fv(this.getUniform('u_NormalMatrix'), false, mesh.normalMatrix.elements);
    }
  
    protected handleLights(scene: Scene3D, mesh:Mesh):void {
      let cameraInverseMatrix:Matrix4 = scene.currentCamera.inverseWorldMatrix;
  
      let numLights:number = scene.lights.length;
      numLights = numLights <= StandardShaderObject.MAX_NUM_LIGHTS ? numLights : StandardShaderObject.MAX_NUM_LIGHTS; // 保证最多只有8个光源起作用
  
      for (let i:number = 0; i < numLights; i++) {
        let light:Light = scene.lights[i];
        if (!light.enabled) continue; // 关闭的光源无需渲染
        light.updateWorldMatrix();
  
        let pos:Vector3 = light.getWorldPosition();
        let np:Vector3 = new Vector3();
        let lightPos:Vector4;
  
        //对于平行光源（只有方向）而言，只考虑其从世界坐标系到视角坐标系变换的旋转分量，平移和缩放不予考虑
        switch (light.type) {
          case 'DirectionalLight': {
            let rm:Matrix4 = (new Matrix4()).extractRotation(cameraInverseMatrix);
            np.copyFrom(pos).applyMatrix4(rm);
            lightPos = new Vector4(np.x, np.y, np.z, 0.0);
            break;
          }
          case 'PointLight': {
            let lit = light as PointLight;
            np.copyFrom(pos).applyMatrix4(cameraInverseMatrix);
            lightPos = new Vector4(np.x, np.y, np.z, 1.0);
            ShaderHelper.uniform1f(this.getUniform('lightProperties[' + i + '].scope'), lit.scope);
            ShaderHelper.uniform1f(this.getUniform('lightProperties[' + i + '].attenuate'), lit.attenuate);
            break;
          }
          case 'SpotLight': {
            let lit = light as SpotLight;
            np.copyFrom(pos).applyMatrix4(cameraInverseMatrix);
            let dir = lit.direction.clone();
            dir.applyMatrix4(cameraInverseMatrix);
            lightPos = new Vector4(np.x, np.y, np.z, 1.0);
            ShaderHelper.uniform1f(this.getUniform('lightProperties[' + i + '].scope'), lit.scope);
            ShaderHelper.uniform1f(this.getUniform('lightProperties[' + i + '].attenuate'), lit.attenuate);
            ShaderHelper.uniform1f(this.getUniform('lightProperties[' + i + '].theta'), lit.theta);
            ShaderHelper.uniform3f(this.getUniform('lightProperties[' + i + '].direction'), dir.x, dir.y, dir.z);
            break;
          }
        }
  
        ShaderHelper.uniform4fv(this.getUniform('lightProperties[' + i + '].position'), lightPos.elements);
        let lightColor:Vector3 = light.color;
        ShaderHelper.uniform3f(this.getUniform('lightProperties[' + i + '].color'), lightColor.x, lightColor.y, lightColor.z);
        let lightIntensity:number = light.intensity;
        ShaderHelper.uniform1f(this.getUniform('lightProperties[' + i + '].intensity'), lightIntensity);
      }
    }
  
    protected handleMaterials(scene: Scene3D, mesh:Mesh):void {
      //全局环境光
      let globalAmbient:Vector3 = scene.ambientColor;
      ShaderHelper.uniform3f(this.getUniform('u_globalAmbient'), globalAmbient.x, globalAmbient.y, globalAmbient.z);
      let colorMat:StandardMaterial = <StandardMaterial>(mesh.material);
      let am:Vector3 = colorMat.ambientColor;
      ShaderHelper.uniform3f(this.getUniform('u_materialAmbient'), am.x, am.y, am.z);
      let dc:Vector3 = colorMat.diffuseColor;
      ShaderHelper.uniform3f(this.getUniform('u_materialDiffuse'), dc.x, dc.y, dc.z);
      let sc:Vector3 = colorMat.specularColor;
      ShaderHelper.uniform3f(this.getUniform('u_materialSpecular'), sc.x, sc.y, sc.z);
      ShaderHelper.uniform1f(this.getUniform('u_materialShiness'), colorMat.shininess);
      let em: Vector3 = colorMat.emissiveColor;
      ShaderHelper.uniform3f(this.getUniform('u_materialEmissive'), em.x, em.y, em.z);
      ShaderHelper.uniform1i(this.getUniform('u_sampler2d'), 0);
      if (mesh.material.texture)colorMat.texture.setTextureAttribute();
      mesh.setBufferAttribute(mesh.uvBuffer, this.getAttribute('a_TexCood'), mesh.geometry.vertexUVNum, RenderContext.context.FLOAT);
      ShaderHelper.uniform1i(this.getUniform('u_HasTexture'), mesh.material.texture ? 1 : 0);
    }
  
    protected setShaderDataFromMesh(mesh:Mesh):void {
      let gl:WebGLRenderingContext = RenderContext.context;
      let geometry:Geometry = mesh.geometry;
      mesh.setBufferAttribute(mesh.vertexBuffer, this.getAttribute('a_Position'), geometry.vertexPosNum, gl.FLOAT);
      mesh.setBufferAttribute(mesh.normalBuffer, this.getAttribute('a_Normal'), geometry.vertexNormalNum, gl.FLOAT);
      if (mesh.geometry.indexDraw) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
      }
    }
 }