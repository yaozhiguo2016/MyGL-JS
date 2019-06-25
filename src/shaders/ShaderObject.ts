/**
 * Created by yaozh on 2019/5/27.
 * 对Shader的抽象，包含提取shader变量(常量)和为Shader变量赋值
 */

import ShaderUtil from "../utils/ShaderUtil";
import Mesh from "../core/Mesh";
import ShaderHelper from "../utils/ShaderHelper";
import Scene3D from "../core/Scene3D";

export default class ShaderObject {

  private _attributes: Object = {};
  private _uniforms: Object = {};
  protected _program: WebGLProgram;
  protected _gl: WebGLRenderingContext;

  public get program(): WebGLProgram {
    return this._program;
  }

  public constructor(gl: WebGLRenderingContext, vertSrc?: string, fragSrc?: string) {
    this._gl = gl;
    if (vertSrc && fragSrc) {
      this._program = ShaderUtil.createProgram(gl, vertSrc, fragSrc);
    }
  }

  public createProgram(vertSrc: string, fragSrc: string): WebGLProgram {
    this._program = ShaderUtil.createProgram(this._gl, vertSrc, fragSrc);
    return this._program;
  }

  /**
   * 调用本方法之前需要确保已经通过着色器源码创建了WebGLProgram对象
   */
  public extractAttributesAndUniforms():void {

  }

  public setAttributesAndUniforms(scene: Scene3D, mesh: Mesh):void {

  }

  public addAttribute(attributeName: string):void {
    this._attributes[attributeName] = ShaderHelper.getAttributeLocation(this._program, attributeName);
  }

  public addUniform(uniformName: string):void {
    this._uniforms[uniformName] = ShaderHelper.getUniformLocation(this._program, uniformName);
  }

  public getUniform(uniformName: string): WebGLUniformLocation {
    return this._uniforms[uniformName];
  }

  public getAttribute(attributeName: string): number {
    return this._attributes[attributeName];
  }

  public dispose():void {  
    ShaderUtil.deleteProgram(this._gl, this._program);
    this._uniforms = null;
    this._attributes = null;
    this._gl = null;
  }
}