import ShaderObject from "./ShaderObject";
import Scene3D from "../core/Scene3D";
import WebGLRenderer from "../core/WebGLRender";
import Mesh from "../core/Mesh";
import ShaderHelper from "../utils/ShaderHelper";
import CubeMapMaterial from "../materials/CubeMapMaterial";
import RenderContext from "../RenderContext";
import Geometry from "../primitives/Geometry";

export default class SkyBoxShaderObject extends ShaderObject {
    public extractAttributesAndUniforms():void {
        this.addAttribute('a_Position');
        this.addUniform('u_ViewMatrix');
        this.addUniform('u_ProjMatrix');
        this.addUniform('u_samplerCube');
    }
  
    public setAttributesAndUniforms(scene: Scene3D, mesh: Mesh, renderer: WebGLRenderer):void {
        //mesh.updateWorldMatrix();

        ShaderHelper.uniformMatrix4fv(this.getUniform('u_ProjMatrix'), false, renderer.currentCamera.projMatrix.elements);
        ShaderHelper.uniformMatrix4fv(this.getUniform('u_ViewMatrix'), false, renderer.viewRotationMatrix.elements);

        const skyMat = mesh.material as CubeMapMaterial;
        ShaderHelper.uniform1i(this.getUniform('u_samplerCube'), 0);
        skyMat.textureCude.setTextureAttribute();
        
        let gl:WebGLRenderingContext = RenderContext.context;
        let geometry:Geometry = mesh.geometry;
        mesh.setBufferAttribute(mesh.vertexBuffer, this.getAttribute('a_Position'), geometry.vertexPosNum, gl.FLOAT);
        if (mesh.geometry.indexDraw) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
        }
    }
}