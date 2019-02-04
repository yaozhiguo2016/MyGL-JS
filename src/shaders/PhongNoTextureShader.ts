/**
 * Created by yaozh on 2019/1/30.
 */
import Mesh from "../core/Mesh";
import ShaderHelper from "../utils/ShaderHelper";
import Vector3 from "../math/Vector3";
import StandardMaterial from "../materials/StandardMaterial";
import StandardShader from "./StandardShader";

export default class PhongNoTextureShader extends StandardShader {

  protected materialEmissive:WebGLUniformLocation;

  public extractAttributeAndUniforms():void {
    super.extractAttributeAndUniforms();
    this.materialEmissive = ShaderHelper.getUniformLocation('materialEmissive');
  }

  protected handleMaterials(mesh:Mesh):void {
    super.handleMaterials(mesh);
    let colorMat: StandardMaterial = <StandardMaterial>(mesh.material);
    let em: Vector3 = colorMat.emissiveColor;
    ShaderHelper.uniform3f(this.materialEmissive, em.x, em.y, em.z);
  }
}