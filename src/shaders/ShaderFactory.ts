import Scene3D from "../core/Scene3D";
import Mesh from "../core/Mesh";
import ShaderObject from "./ShaderObject";
import Geometry from "../primitives/Geometry";
import Material from "../materials/Material";
import Camera from "../cameras/Camera";
import StandardMaterial from "../materials/StandardMaterial";
import ShaderManager from "./ShaderManager";
import StandardShaderObject from "./StandardShaderObject";
import ShaderSourceLib from "../utils/ShaderSourceLib";

export default class ShaderFactory {
  public static getShader(scene: Scene3D, mesh: Mesh): ShaderObject {
    const camera: Camera = scene.currentCamera;
    const geometry: Geometry = mesh.geometry;
    const material: Material = mesh.material;

    if(material instanceof StandardMaterial) {
      const key: string = `standard_${material.shadingType}`;
      const vertSrc = ShaderSourceLib[`${key}_vert.glsl`];
      const fragSrc = ShaderSourceLib[`${key}_frag.glsl`];
      return  ShaderManager.createShader(key, StandardShaderObject, vertSrc, fragSrc);
    }
  }
}