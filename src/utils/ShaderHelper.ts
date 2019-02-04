import RenderContext from "../RenderContext";

/**
 * Created by yaozh on 2017/6/29.
 */
export default class ShaderHelper {
  private static program: WebGLProgram;
  private static gl: WebGLRenderingContext;

  public static reset(usedProgram:WebGLProgram): void {
    this.gl = RenderContext.context;
    this.program = usedProgram;
  }

  public static getUniformLocation(uniformName: string): WebGLUniformLocation {
    let gl: WebGLRenderingContext = this.gl;
    let uniformLocation: WebGLUniformLocation = gl.getUniformLocation(this.program, uniformName);
    if (!uniformLocation) {
      console.error('uniformLocation get failed.', uniformName);
      return null;
    }
    return uniformLocation;
  }

  public static getAttributeLocation(atrributeName: string): number {
    let gl: WebGLRenderingContext = this.gl;
    let attributeLocation: number = gl.getAttribLocation(this.program, atrributeName);
    if (attributeLocation <= -1) {
      console.error('attributeLocation get failed.', atrributeName);
      return null;
    }
    return attributeLocation;
  }

  public static assignMatrix4fv(uniformName: string, tranpose: boolean, elements: Float32Array): void {
    this.gl.uniformMatrix4fv(this.getUniformLocation(uniformName), tranpose, elements);
  }

  public static assign4fv(uniformName: string, elements: Float32Array): void {
    this.gl.uniform4fv(this.getUniformLocation(uniformName), elements);
  }

  public static assign3fv(uniformName: string, elements: Float32Array): void {
    this.gl.uniform3fv(this.getUniformLocation(uniformName), elements);
  }

  public static assign4f(uniformName: string, x, y, z, w): void {
    this.gl.uniform4f(this.getUniformLocation(uniformName), x, y, z, w);
  }

  public static assign3f(uniformName: string, x, y, z): void {
    this.gl.uniform3f(this.getUniformLocation(uniformName), x, y, z);
  }

  public static assign1i(uniformName: string, iv: number): void {
    this.gl.uniform1i(this.getUniformLocation(uniformName), iv);
  }

  public static assign1f(uniformName: string, fv: number): void {
    this.gl.uniform1f(this.getUniformLocation(uniformName), fv);
  }

  public static uniformMatrix4fv(uniformLocation: WebGLUniformLocation, tranpose: boolean, elements: Float32Array): void {
    this.gl.uniformMatrix4fv(uniformLocation, tranpose, elements);
  }

  public static uniform4fv(uniformLocation: WebGLUniformLocation, elements: Float32Array): void {
    this.gl.uniform4fv(uniformLocation, elements);
  }

  public static uniform3fv(uniformLocation: WebGLUniformLocation, elements: Float32Array): void {
    this.gl.uniform3fv(uniformLocation, elements);
  }

  public static uniform4f(uniformLocation: WebGLUniformLocation, x, y, z, w): void {
    this.gl.uniform4f(uniformLocation, x, y, z, w);
  }

  public static uniform3f(uniformLocation: WebGLUniformLocation, x, y, z): void {
    this.gl.uniform3f(uniformLocation, x, y, z);
  }

  public static uniform1i(uniformLocation: WebGLUniformLocation, iv: number): void {
    this.gl.uniform1i(uniformLocation, iv);
  }

  public static uniform1f(uniformLocation: WebGLUniformLocation, fv: number): void {
    this.gl.uniform1f(uniformLocation, fv);
  }

  public static assignAttribute(buffer: WebGLBuffer, a_attribute: number, num: number, type: number): void {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    // Assign the buffer object to the attribute variable
    this.gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    this.gl.enableVertexAttribArray(a_attribute);
  }
}