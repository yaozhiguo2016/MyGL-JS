import RenderContext from "../RenderContext";
/**
 * Created by yaozh on 2017/6/29.
 */
export default class UniformUtil
{
    private static program:WebGLProgram;
    private static gl:WebGLRenderingContext;

    public static setProgrom(program:WebGLProgram):void
    {
        this.program = program;
        this.gl = RenderContext.context;
    }

    public static getUniformLocation(uniformName:string):WebGLUniformLocation
    {
        let gl:WebGLRenderingContext = this.gl;
        let uniformLocation:WebGLUniformLocation = gl.getUniformLocation(this.program, uniformName);
        if (!uniformLocation){
            console.error('uniformLocation get failed.', uniformName);
            return null;
        }
        return uniformLocation;
    }

    public static assignMatrix4fv(uniformName:string, tranpose:boolean, elements:Float32Array):void
    {
        this.gl.uniformMatrix4fv(this.getUniformLocation(uniformName), tranpose, elements);
    }

    public static assign4fv(uniformName:string, elements:Float32Array):void
    {
        this.gl.uniform4fv(this.getUniformLocation(uniformName), elements);
    }

    public static assign3fv(uniformName:string, elements:Float32Array):void
    {
        this.gl.uniform3fv(this.getUniformLocation(uniformName), elements);
    }

    public static assign4f(uniformName:string, x, y, z, w):void
    {
        this.gl.uniform4f(this.getUniformLocation(uniformName), x, y, z, w);
    }

    public static assign3f(uniformName:string, x, y, z):void
    {
        this.gl.uniform3f(this.getUniformLocation(uniformName), x, y, z);
    }

    public static assign1i(uniformName:string, iv:number):void
    {
        this.gl.uniform1i(this.getUniformLocation(uniformName), iv);
    }

    public static assign1f(uniformName:string, fv:number):void
    {
        this.gl.uniform1f(this.getUniformLocation(uniformName), fv);
    }
}