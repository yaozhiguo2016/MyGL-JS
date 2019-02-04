/**
 * Created by yaozh on 2019/1/30.
 */
import Mesh from "../core/Mesh";
import RenderContext from "../RenderContext";
import ShaderHelper from "../utils/ShaderHelper";
import StandardMaterial from "../materials/StandardMaterial";
import StandardShader from "./StandardShader";

export default class PhongTextureShader extends StandardShader {

  protected u_sampler2d:WebGLUniformLocation;
  protected a_TexCood: number;

  public extractAttributeAndUniforms():void {
    super.extractAttributeAndUniforms();
    this.a_TexCood = ShaderHelper.getAttributeLocation('a_TexCood');
    this.u_sampler2d = ShaderHelper.getUniformLocation('u_sampler2d');
  }

  protected setShaderDataFromMesh(mesh:Mesh):void {
    super.setShaderDataFromMesh(mesh);
    this.handleTexture(mesh);
    mesh.setBufferAttribute(mesh.uvBuffer, this.a_TexCood, mesh.geometry.vertexUVNum, RenderContext.context.FLOAT);
  }

  protected handleTexture(mesh:Mesh):void {
    ShaderHelper.uniform1i(this.u_sampler2d, 0);
    let colorMat:StandardMaterial = <StandardMaterial>(mesh.material);
    colorMat.texture.setTextureAttribute();
  }
}