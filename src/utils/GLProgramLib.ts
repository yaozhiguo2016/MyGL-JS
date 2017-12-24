import RenderContext from "../RenderContext";
import ShaderUtil from "./ShaderUtil";
/**
 * Created by yaozh on 2017/6/27.
 */
export default class GLProgramLib
{
    private static _programs:Object = {};

    public static addProgram(key:string, program:WebGLProgram):void
    {
        this._programs[key] = program;
    }

    public static getProgram(key:string):WebGLProgram
    {
        return this._programs[key];
    }

    public static removeProgram(key:string):void
    {
        let program:WebGLProgram = this._programs[key];
        if (!program)return;
        ShaderUtil.deleteProgram(RenderContext.context, program);
        delete this._programs[key];
    }
}