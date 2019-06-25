import Scene3D from "./Scene3D";
import Mesh from "./Mesh";
import RenderContext from "../RenderContext";
import ShaderFactory from "../shaders/ShaderFactory";

export default class WebGLRenderer {

  public render(scene: Scene3D):void {
    const gl:WebGLRenderingContext = RenderContext.context;
    gl.viewport(0,0,RenderContext.viewportWidth, RenderContext.viewportHeight);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

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
    mesh.shader.setAttributesAndUniforms(scene, mesh);
    mesh.setGLState();
    if (mesh.geometry.indexDraw) {
      gl.drawElements(gl.TRIANGLES, mesh.geometry.indices.length, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.drawArrays(gl.TRIANGLES, 0, mesh.geometry.vertexNum);
    }
    mesh.clearGLState();
  }
}