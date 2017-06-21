/**
 * Created by yaozh on 2017/5/25.
 */

/**
 * Create a program object and make current
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return true, if the program object was created and successfully made current
 */
declare function initShaders(gl:WebGLRenderingContext, vshader:string, fshader:string):boolean;

/**
 * Initialize and get the rendering for WebGL
 * @param canvas <cavnas> element
 * @param opt_debug flag to initialize the context for debugging
 * @return the rendering context for WebGL
 */
declare function getWebGLContext(canvas:HTMLCanvasElement, options?:any):WebGLRenderingContext;

declare class ShaderResult
{
    vert:string;
    frag:string;
}

declare module ShaderLib
{
    function getShader(key:string):ShaderResult;
}