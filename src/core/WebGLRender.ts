import Scene3D from "./Scene3D";
import Mesh from "./Mesh";
import RenderContext from "../RenderContext";
import ShaderFactory from "../shaders/ShaderFactory";
import Camera from "../cameras/Camera";
import Quaternion from "../math/Quaternion";
import Matrix4 from "../math/Matrix4";
import Vector3 from "../math/Vector3";
import Light from "../lights/Light";
import Vector4 from "../math/Vector4";
import SpotLight from "../lights/SpotLight";

interface LightObject {
  lightPos:Vector4,
  dir:Vector3,
  light: Light
}

export default class WebGLRenderer {

  public currentCamera:Camera = null;
  public cameraInverseMatrix: Matrix4 = null;
  public viewRotationMatrix: Matrix4 = null;
  public lightObjects: LightObject[];

  public render(scene: Scene3D):void {
    const gl:WebGLRenderingContext = RenderContext.context;
    gl.viewport(0,0,RenderContext.viewportWidth, RenderContext.viewportHeight);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    this.transformCamera(scene);
    this.transformLights(scene);

    for (let mesh of scene.meshes){
      if (!mesh.visible)continue;
      this.update(scene, mesh, gl)
    }
  }

  private update(scene: Scene3D, mesh: Mesh, gl: WebGLRenderingContext):void {
    if (!mesh.shader) {
      mesh.shader = ShaderFactory.getShader(scene, mesh);
      mesh.shader.extractAttributesAndUniforms();
    }
    gl.useProgram(mesh.shader.program);
    mesh.shader.setAttributesAndUniforms(scene, mesh, this);
    mesh.setGLState();
    if (mesh.geometry.indexDraw) {
      gl.drawElements(gl.TRIANGLES, mesh.geometry.indices.length, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.drawArrays(gl.TRIANGLES, 0, mesh.geometry.vertexNum);
    }
    mesh.clearGLState();
  }

  private transformCamera(scene: Scene3D):void {
    let camera: Camera = scene.currentCamera;
    camera.updateWorldMatrix();
    // 通过摄影机逆变换来求取视觉坐标系下物体的旋转矩阵
    const cameraInverseMatrix: Matrix4 = camera.inverseWorldMatrix;
    let q:Quaternion = new Quaternion();
    cameraInverseMatrix.decompose(new Vector3(), q, new Vector3());
    let qm: Matrix4 = new Matrix4();
    this.viewRotationMatrix = qm.makeRotationFromQuaternion(q);
    this.cameraInverseMatrix = cameraInverseMatrix;
    this.currentCamera = camera;
  }

  private transformLights(scene: Scene3D):void {
    let lightObjects: LightObject[] = [];
    let numLights:number = scene.lights.length;
    for (let i:number = 0; i < numLights; i++) {
      let light:Light = scene.lights[i];
      if (!light.enabled) continue; // 关闭的光源无需渲染
      light.updateWorldMatrix();

      let pos:Vector3 = light.getWorldPosition();
      let np:Vector3 = new Vector3();
      let lightPos:Vector4;
      let dir = null;

      //对于平行光源（只有方向）而言，只考虑其从世界坐标系到视角坐标系变换的旋转分量，平移和缩放不予考虑
      switch (light.type) {
        case 'DirectionalLight': {
          let rm:Matrix4 = (new Matrix4()).extractRotation(this.cameraInverseMatrix);
          np.copyFrom(pos).applyMatrix4(rm);
          lightPos = new Vector4(np.x, np.y, np.z, 0.0);
          break;
        }
        case 'PointLight': {
          np.copyFrom(pos).applyMatrix4(this.cameraInverseMatrix);
          lightPos = new Vector4(np.x, np.y, np.z, 1.0);
          break;
        }
        case 'SpotLight': {
          let lit = light as SpotLight;
          np.copyFrom(pos).applyMatrix4(this.cameraInverseMatrix);
          dir = lit.direction.clone();
          dir.applyMatrix4(this.cameraInverseMatrix);
          lightPos = new Vector4(np.x, np.y, np.z, 1.0);
          break;
        }
      }

      lightObjects.push({ lightPos, dir, light });
    }
    this.lightObjects = lightObjects;
  }
}