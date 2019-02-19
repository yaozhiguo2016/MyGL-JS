/**
 * @author stanley.yzg
 * Date 2019/2/1
 * Desc:
 */
import Shader from "./Shader";
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

export default class StandardShader extends Shader {

  public static MAX_NUM_LIGHTS:number = 8;

  protected a_Position: number;
  protected a_Normal: number;
  protected a_TexCood: number;

  protected u_mvMatrix: WebGLUniformLocation;
  protected u_ProjMatrix: WebGLUniformLocation;
  protected u_NormalMatrix: WebGLUniformLocation;

  protected u_globalAmbient: WebGLUniformLocation;
  protected u_materialAmbient: WebGLUniformLocation;
  protected u_materialDiffuse: WebGLUniformLocation;
  protected u_materialSpecular: WebGLUniformLocation;
  protected u_materialShiness: WebGLUniformLocation;
  protected u_materialEmissive:WebGLUniformLocation;

  protected u_sampler2d:WebGLUniformLocation;

  protected side: WebGLUniformLocation;

  protected lightProperties:{
    position: WebGLUniformLocation,
    color: WebGLUniformLocation,
    intensity: WebGLUniformLocation,
    scope: WebGLUniformLocation,
    attenuate: WebGLUniformLocation,
    direction: WebGLUniformLocation,
    theta: WebGLUniformLocation
  }[];

  protected u_NumLight:WebGLUniformLocation;

  protected u_HasTexture: WebGLUniformLocation;

  public extractAttributeAndUniforms():void {
    super.extractAttributeAndUniforms();

    this.a_Position = ShaderHelper.getAttributeLocation('a_Position');
    this.a_Normal = ShaderHelper.getAttributeLocation('a_Normal');
    this.a_TexCood = ShaderHelper.getAttributeLocation('a_TexCood');

    console.log(this.a_Position, this.a_Normal, this.a_TexCood);

    this.u_mvMatrix = ShaderHelper.getUniformLocation('u_mvMatrix');
    this.u_ProjMatrix = ShaderHelper.getUniformLocation('u_ProjMatrix');
    this.u_NormalMatrix = ShaderHelper.getUniformLocation('u_NormalMatrix');
    this.u_globalAmbient = ShaderHelper.getUniformLocation('u_globalAmbient');
    this.u_materialAmbient = ShaderHelper.getUniformLocation('u_materialAmbient');
    this.u_materialDiffuse = ShaderHelper.getUniformLocation('u_materialDiffuse');
    this.u_materialSpecular = ShaderHelper.getUniformLocation('u_materialSpecular');
    this.u_materialShiness = ShaderHelper.getUniformLocation('u_materialShiness');
    this.side = ShaderHelper.getUniformLocation('side');

    this.u_materialEmissive = ShaderHelper.getUniformLocation('u_materialEmissive');
    this.u_sampler2d = ShaderHelper.getUniformLocation('u_sampler2d');

    this.lightProperties = [];

    for (let i:number = 0; i < StandardShader.MAX_NUM_LIGHTS; i++) {
      let position = ShaderHelper.getUniformLocation("lights[" + i + "].position");
      let color = ShaderHelper.getUniformLocation("lights[" + i + "].color");
      let intensity = ShaderHelper.getUniformLocation("lights[" + i + "].intensity");
      let scope = ShaderHelper.getUniformLocation("lights[" + i + "].scope");
      let attenuate = ShaderHelper.getUniformLocation("lights[" + i + "].attenuate");
      let direction = ShaderHelper.getUniformLocation("lights[" + i + "].direction");
      let theta = ShaderHelper.getUniformLocation("lights[" + i + "].theta");
      this.lightProperties.push({position, color, intensity, scope, attenuate, direction, theta});
    }

    this.u_NumLight = ShaderHelper.getUniformLocation('u_NumLight');

    this.u_HasTexture = ShaderHelper.getUniformLocation('u_HasTexture');
  }

  public setAttributeAndUniforms(mesh: Mesh): void {
    super.setAttributeAndUniforms(mesh);

    ShaderHelper.uniform1i(this.side, mesh.surfaceSide);
    ShaderHelper.uniform1i(this.u_NumLight, mesh.scene.lights.length);
    this.handleMVP(mesh);
    this.handleLights(mesh);
    this.handleMaterials(mesh);
    this.setShaderDataFromMesh(mesh);
  }

  protected handleMVP(mesh:Mesh):void {
    let camera:Camera = mesh.scene.currentCamera;

    //Model-View-Projection
    mesh.updateWorldMatrix();
    camera.updateWorldMatrix();
    mesh.modelViewMatrix.multiplyMatrices(camera.inverseWorldMatrix, mesh.worldMatrix);
    ShaderHelper.uniformMatrix4fv(this.u_mvMatrix, false, mesh.modelViewMatrix.elements);
    ShaderHelper.uniformMatrix4fv(this.u_ProjMatrix, false, camera.projMatrix.elements);

    //法线转换
    mesh.normalMatrix.getInverse(mesh.worldMatrix, true);
    mesh.normalMatrix.transpose();
    let q:Quaternion = new Quaternion();
    camera.inverseWorldMatrix.decompose(new Vector3(), q, new Vector3());
    let qm:Matrix4 = new Matrix4();
    mesh.normalMatrix.premultiply(qm.makeRotationFromQuaternion(q));
    ShaderHelper.uniformMatrix4fv(this.u_NormalMatrix, false, mesh.normalMatrix.elements);
  }

  protected handleLights(mesh:Mesh):void {
    let scene:Scene3D = mesh.scene;
    let cameraInverseMatrix:Matrix4 = scene.currentCamera.inverseWorldMatrix;

    let numLights:number = scene.lights.length;
    numLights = numLights <= StandardShader.MAX_NUM_LIGHTS ? numLights : StandardShader.MAX_NUM_LIGHTS; // 保证最多只有8个光源起作用

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
          ShaderHelper.uniform1f(this.lightProperties[i].scope, lit.scope);
          ShaderHelper.uniform1f(this.lightProperties[i].attenuate, lit.attenuate);
          break;
        }
        case 'SpotLight': {
          let lit = light as SpotLight;
          np.copyFrom(pos).applyMatrix4(cameraInverseMatrix);
          let dir = lit.direction.clone();
          dir.applyMatrix4(cameraInverseMatrix);
          lightPos = new Vector4(np.x, np.y, np.z, 1.0);
          ShaderHelper.uniform1f(this.lightProperties[i].scope, lit.scope);
          ShaderHelper.uniform1f(this.lightProperties[i].attenuate, lit.attenuate);
          ShaderHelper.uniform1f(this.lightProperties[i].theta, lit.theta);
          ShaderHelper.uniform3f(this.lightProperties[i].direction, dir.x, dir.y, dir.z);
          break;
        }
      }

      ShaderHelper.uniform4fv(this.lightProperties[i].position, lightPos.elements);
      let lightColor:Vector3 = light.color;
      ShaderHelper.uniform3f(this.lightProperties[i].color, lightColor.x, lightColor.y, lightColor.z);
      let lightIntensity:number = light.intensity;
      ShaderHelper.uniform1f(this.lightProperties[i].intensity, lightIntensity);
    }
  }

  protected handleMaterials(mesh:Mesh):void {
    //全局环境光
    let globalAmbient:Vector3 = mesh.scene.ambientColor;
    ShaderHelper.uniform3f(this.u_globalAmbient, globalAmbient.x, globalAmbient.y, globalAmbient.z);
    let colorMat:StandardMaterial = <StandardMaterial>(mesh.material);
    let am:Vector3 = colorMat.ambientColor;
    ShaderHelper.uniform3f(this.u_materialAmbient, am.x, am.y, am.z);
    let dc:Vector3 = colorMat.diffuseColor;
    ShaderHelper.uniform3f(this.u_materialDiffuse, dc.x, dc.y, dc.z);
    let sc:Vector3 = colorMat.specularColor;
    ShaderHelper.uniform3f(this.u_materialSpecular, sc.x, sc.y, sc.z);
    ShaderHelper.uniform1f(this.u_materialShiness, colorMat.shininess);
    let em: Vector3 = colorMat.emissiveColor;
    ShaderHelper.uniform3f(this.u_materialEmissive, em.x, em.y, em.z);
    ShaderHelper.uniform1i(this.u_sampler2d, 0);
    if (mesh.material.texture)colorMat.texture.setTextureAttribute();
    mesh.setBufferAttribute(mesh.uvBuffer, this.a_TexCood, mesh.geometry.vertexUVNum, RenderContext.context.FLOAT);
    ShaderHelper.uniform1i(this.u_HasTexture, mesh.material.texture ? 1 : 0);
  }

  protected setShaderDataFromMesh(mesh:Mesh):void {
    let gl:WebGLRenderingContext = RenderContext.context;
    let geometry:Geometry = mesh.geometry;
    mesh.setBufferAttribute(mesh.vertexBuffer, this.a_Position, geometry.vertexPosNum, gl.FLOAT);
    mesh.setBufferAttribute(mesh.normalBuffer, this.a_Normal, geometry.vertexNormalNum, gl.FLOAT);
    if (mesh.geometry.indexDraw) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
    }
  }
}