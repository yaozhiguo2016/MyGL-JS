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

export default class StandardShader extends Shader {

  protected a_Position: number;
  protected a_Normal: number;

  protected u_mvMatrix: WebGLUniformLocation;
  protected u_ProjMatrix: WebGLUniformLocation;
  protected u_NormalMatrix: WebGLUniformLocation;
  protected globalAmbient: WebGLUniformLocation;

  protected materialAmbient: WebGLUniformLocation;
  protected materialDiffuse: WebGLUniformLocation;
  protected materialSpecular: WebGLUniformLocation;
  protected materialShiness: WebGLUniformLocation;
  protected u_sampler2d: WebGLUniformLocation;

  protected side: WebGLUniformLocation;

  protected lightProperties:{
    position: WebGLUniformLocation,
    color: WebGLUniformLocation,
    intensity: WebGLUniformLocation,
    enabled: WebGLUniformLocation
  }[];

  public extractAttributeAndUniforms():void {
    super.extractAttributeAndUniforms();

    this.a_Position = ShaderHelper.getAttributeLocation('a_Position');
    this.a_Normal = ShaderHelper.getAttributeLocation('a_Normal');

    this.u_mvMatrix = ShaderHelper.getUniformLocation('u_mvMatrix');
    this.u_ProjMatrix = ShaderHelper.getUniformLocation('u_ProjMatrix');
    this.u_NormalMatrix = ShaderHelper.getUniformLocation('u_NormalMatrix');
    this.globalAmbient = ShaderHelper.getUniformLocation('globalAmbient');
    this.materialAmbient = ShaderHelper.getUniformLocation('materialAmbient');
    this.materialDiffuse = ShaderHelper.getUniformLocation('materialDiffuse');
    this.materialSpecular = ShaderHelper.getUniformLocation('materialSpecular');
    this.materialShiness = ShaderHelper.getUniformLocation('materialShiness');
    this.side = ShaderHelper.getUniformLocation('side');

    this.lightProperties = [];
    //let scene:Scene3D = mesh.scene;
    //let numLights:number = scene.lights.length;
    for (let i:number = 0; i < 2; i++) {
      let position = ShaderHelper.getUniformLocation("lights[" + i + "].position");
      let color = ShaderHelper.getUniformLocation("lights[" + i + "].color");
      let intensity = ShaderHelper.getUniformLocation("lights[" + i + "].intensity");
      let enabled = ShaderHelper.getUniformLocation("lights[" + i + "].enabled");
      this.lightProperties.push({position, color, intensity, enabled});
    }
  }

  public setAttributeAndUniforms(mesh: Mesh): void {
    super.setAttributeAndUniforms(mesh);

    ShaderHelper.uniform1i(this.side, mesh.surfaceSide);
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
    let numLights:number = scene.lights.length;
    for (let i:number = 0; i < numLights; i++) {
      let light:Light = scene.lights[i];
      light.updateWorldMatrix();

      let pos:Vector3 = light.getWorldPosition();
      let np:Vector3 = new Vector3();
      let lightPos:Vector4;

      //对于平行光源（只有方向）而言，只考虑其从世界坐标系到视角坐标系变换的旋转分量，平移和缩放不予考虑
      if(light.type == 'DirectionLight') {
        let rm:Matrix4 = (new Matrix4()).extractRotation(scene.currentCamera.inverseWorldMatrix);
        np.copyFrom(pos).applyMatrix4(rm);
        lightPos = new Vector4(np.x, np.y, np.z, 0.0);
      } else {
        np.copyFrom(pos).applyMatrix4(scene.currentCamera.inverseWorldMatrix);
        lightPos = new Vector4(np.x, np.y, np.z, 1.0);
      }

      ShaderHelper.uniform4fv(this.lightProperties[i].position, lightPos.elements);
      let lightColor:Vector3 = light.color;
      ShaderHelper.uniform3f(this.lightProperties[i].color, lightColor.x, lightColor.y, lightColor.z);
      let lightIntensity:Vector3 = light.intensity;
      ShaderHelper.uniform3f(this.lightProperties[i].intensity, lightIntensity.x, lightIntensity.y, lightIntensity.z);
      ShaderHelper.uniform1i(this.lightProperties[i].enabled, light.enabled ? 1 : 0);
    }
  }

  protected handleMaterials(mesh:Mesh):void {
    //全局环境光
    let globalAmbient:Vector3 = mesh.scene.ambientColor;
    ShaderHelper.uniform3f(this.globalAmbient, globalAmbient.x, globalAmbient.y, globalAmbient.z);
    let colorMat:StandardMaterial = <StandardMaterial>(mesh.material);
    let am:Vector3 = colorMat.ambientColor;
    ShaderHelper.uniform3f(this.materialAmbient, am.x, am.y, am.z);
    let dc:Vector3 = colorMat.diffuseColor;
    ShaderHelper.uniform3f(this.materialDiffuse, dc.x, dc.y, dc.z);
    let sc:Vector3 = colorMat.specularColor;
    ShaderHelper.uniform3f(this.materialSpecular, sc.x, sc.y, sc.z);
    ShaderHelper.uniform1f(this.materialShiness, colorMat.shininess);
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