/**
 * Created by yaozh on 2019/1/30.
 */

import RenderContext from "../RenderContext";
import ShaderUtil from "../utils/ShaderUtil";
import ShaderSourceLib from '../utils/ShaderSourceLib';
import Mesh from "../core/Mesh";
import ShaderHelper from "../utils/ShaderHelper";

export default class Shader {

  protected _program: WebGLProgram;

  public get program(): WebGLProgram {
    return this._program;
  }

  private createProgram(vertSrc: string, fragSrc: string): WebGLProgram {
    this._program = ShaderUtil.createProgram(RenderContext.context, vertSrc, fragSrc);
    return this._program;
  }

  private createProgramWithKey(key: string): WebGLProgram {
    this._program = ShaderUtil.createProgram(RenderContext.context, ShaderSourceLib[`${key}_vert.glsl`], ShaderSourceLib[`${key}_frag.glsl`]);
    return this._program;
  }

  public constructor(key: string, vertSrc?: string, fragSrc?: string) {
    if (!ShaderSourceLib[`${key}_vert.glsl`] || !ShaderSourceLib[`${key}_frag.glsl`]) {
      this.createProgram(vertSrc, fragSrc);
    } else {
      this.createProgramWithKey(key);
    }
  }

  public extractAttributeAndUniforms():void {
    ShaderHelper.reset(this.program);
  }

  public setAttributeAndUniforms(mesh: Mesh): void {
    if (RenderContext.usedProgram !== this.program) {
      RenderContext.usedProgram = this.program;
      ShaderHelper.reset(this.program);
    }
  }
}