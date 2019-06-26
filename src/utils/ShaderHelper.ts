import RenderContext from "../RenderContext";

/**
 * Created by yaozh on 2017/6/29.
 */
export default class ShaderHelper {

  public static getUniformLocation(program: WebGLProgram, uniformName: string): WebGLUniformLocation {
    let gl: WebGLRenderingContext = RenderContext.context;
    let uniformLocation: WebGLUniformLocation = gl.getUniformLocation(program, uniformName);
    if (!uniformLocation) {
      console.error('uniformLocation get failed.', uniformName);
      return null;
    }
    return uniformLocation;
  }

  public static getAttributeLocation(program: WebGLProgram, atrributeName: string): number {
    let gl: WebGLRenderingContext = RenderContext.context;
    let attributeLocation: number = gl.getAttribLocation(program, atrributeName);
    if (attributeLocation <= -1) {
      console.error('attributeLocation get failed.', atrributeName);
      return null;
    }
    return attributeLocation;
  }

  public static uniformMatrix4fv(uniformLocation: WebGLUniformLocation, tranpose: boolean, elements: Float32Array): void {
    this.checkError(uniformLocation);
    RenderContext.context.uniformMatrix4fv(uniformLocation, tranpose, elements);
  }

  public static uniform4fv(uniformLocation: WebGLUniformLocation, elements: Float32Array): void {
    this.checkError(uniformLocation);
    RenderContext.context.uniform4fv(uniformLocation, elements);
  }

  public static uniform3fv(uniformLocation: WebGLUniformLocation, elements: Float32Array): void {
    this.checkError(uniformLocation);
    RenderContext.context.uniform3fv(uniformLocation, elements);
  }

  public static uniform4f(uniformLocation: WebGLUniformLocation, x, y, z, w): void {
    this.checkError(uniformLocation);
    RenderContext.context.uniform4f(uniformLocation, x, y, z, w);
  }

  public static uniform3f(uniformLocation: WebGLUniformLocation, x, y, z): void {
    this.checkError(uniformLocation);
    RenderContext.context.uniform3f(uniformLocation, x, y, z);
  }

  public static uniform1i(uniformLocation: WebGLUniformLocation, iv: number): void {
    this.checkError(uniformLocation);
    RenderContext.context.uniform1i(uniformLocation, iv);
  }

  public static uniform1f(uniformLocation: WebGLUniformLocation, fv: number): void {
    this.checkError(uniformLocation);
    RenderContext.context.uniform1f(uniformLocation, fv);
  }

  public static assignAttribute(buffer: WebGLBuffer, a_attribute: number, num: number, type: number): void {
    let gl: WebGLRenderingContext = RenderContext.context;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // Assign the buffer object to the attribute variable
    gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    gl.enableVertexAttribArray(a_attribute);
  }

  private static checkError(uniformLocation:WebGLUniformLocation):void {
    if (!uniformLocation) {
      console.error(`uniformLocation is null.`);
    }
  }
}