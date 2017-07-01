/**
 * Created by yaozh on 2017/6/27.
 */
export default class ShaderUtil
{
    /**
     * 初始化shader
     * @param gl
     * @param vs
     * @param fs
     * @returns {boolean} 是否初始化成功
     */
    public static initShaders(gl:WebGLRenderingContext, vs:string, fs:string):boolean
    {
        let program:WebGLProgram = ShaderUtil.createProgram(gl, vs, fs);
        if (!program)
        {
            console.log('Failed to create program');
            return false;
        }
        gl.useProgram(program);
        gl['program'] = program;
        return true;
    }

    /**
     * 创建一个shader程序，留给WebGLRenderingContext使用。
     * @param gl
     * @param vshader
     * @param fshader
     * @returns {WebGLProgram||null}
     */
    public static createProgram(gl:WebGLRenderingContext, vshader:string, fshader:string):WebGLProgram
    {
        // Create shader object
        let vertexShader:WebGLShader = ShaderUtil.createShader(gl, gl.VERTEX_SHADER, vshader);
        let fragmentShader:WebGLShader = ShaderUtil.createShader(gl, gl.FRAGMENT_SHADER, fshader);
        if (!vertexShader || !fragmentShader) {
            return null;
        }

        // Create a program object
        let program:WebGLProgram = gl.createProgram();
        if (!program)
        {
            return null;
        }

        // Attach the shader objects
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        // Link the program object
        gl.linkProgram(program);

        // Check the result of linking
        let linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked)
        {
            let error:string = gl.getProgramInfoLog(program);
            console.log('Failed to link program: ' + error);
            gl.deleteProgram(program);
            gl.deleteShader(fragmentShader);
            gl.deleteShader(vertexShader);
            return null;
        }
        return program;
    }

    /**
     * 删除WebGLProgram对象
     * @param gl
     * @param program
     * @returns {boolean}
     */
    public static deleteProgram(gl:WebGLRenderingContext, program:WebGLProgram):boolean
    {
        let shaders:Array<WebGLShader> = gl.getAttachedShaders(program);
        if (!shaders)return false;
        if (shaders.length <= 1)return false;
        gl.deleteShader(shaders[0]);
        gl.deleteShader(shaders[1]);
        gl.deleteProgram(program);
        return true;
    }

    /**
     * 创建shader对象
     * @param gl
     * @param type shader类型，gl.VERTEX_SHADER, gl.FRAGMENT_SHADER
     * @param source shader代码
     * @returns {WebGLShader||null}
     */
    public static createShader(gl:WebGLRenderingContext, type:number, source:string):WebGLShader
    {
        // Create shader object
        let shader:WebGLShader = gl.createShader(type);
        if (!shader)
        {
            console.log('unable to create shader');
            return null;
        }

        // Set the shader program
        gl.shaderSource(shader, source);

        // Compile the shader
        gl.compileShader(shader);

        // Check the result of compilation
        let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled)
        {
            let error:string = gl.getShaderInfoLog(shader);
            console.log('Failed to compile shader: ' + error);
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
}