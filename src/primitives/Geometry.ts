import Object3D from "../core/Object3D";
import RenderContext from "../RenderContext";
import Vector3 from "../math/Vector3";
/**
 * Created by yaozh on 2017/6/6.
 */
export default class Geometry extends Object3D
{
    protected _vertexPositions:Float32Array;
    protected _vertexNormals:Float32Array;
    protected _vertexColors:Float32Array;
    protected _indices:Uint8Array;
    protected _vertexUVs:Float32Array;

    public get vertexPositions():Float32Array
    {
        return this._vertexPositions;
    }

    public get vertexNormals():Float32Array
    {
        return this._vertexNormals;
    }

    public get vertexColors():Float32Array
    {
        return this._vertexColors;
    }

    public get indices():Uint8Array
    {
        return this._indices;
    }

    public vertexPosNum:number = 3;
    public vertexNormalNum:number = 3;
    public vertexColorNum:number = 3;
    public vertexUVNum:number = 2;

    public vertexBuffer:WebGLBuffer;
    public normalBuffer:WebGLBuffer;
    public colorBuffer:WebGLBuffer;
    public uvBuffer:WebGLBuffer;
    public indexBuffer:WebGLBuffer;

    protected gl:WebGLRenderingContext;

    public constructor()
    {
        super();

        this.gl = RenderContext.context;
        let a_Position:number = this.gl.getAttribLocation(this.gl['program'], 'a_Position');
        let a_Normal:number = this.gl.getAttribLocation(this.gl['program'], 'a_Normal');
        let a_Color:number = this.gl.getAttribLocation(this.gl['program'], 'a_Color');

        if (a_Position < 0 || a_Normal < 0 || a_Color < 0) {
            console.log('Failed to get the storage location');
            return;
        }

        this.vertexBuffer = this.createEmptyArrayBuffer(this.gl, a_Position, this.vertexPosNum, this.gl.FLOAT);
        this.normalBuffer = this.createEmptyArrayBuffer(this.gl, a_Normal, this.vertexNormalNum, this.gl.FLOAT);
        this.colorBuffer = this.createEmptyArrayBuffer(this.gl, a_Color, this.vertexColorNum, this.gl.FLOAT);
        //this.uvBuffer = this.createEmptyArrayBuffer(this.gl, a_Color, this.vertexColorNum, this.gl.FLOAT);
        this.indexBuffer = this.gl.createBuffer();
        if (!this.vertexBuffer || !this.normalBuffer || !this.colorBuffer || !this.indexBuffer)
        {
            console.log('buffer create failed.');
            return ;
        }

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }

    private createEmptyArrayBuffer(gl, a_attribute, num, type) :WebGLBuffer
    {
        let buffer =  gl.createBuffer();  // Create a buffer object
        if (!buffer) {
            console.log('Failed to create the buffer object');
            return null;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);  // Assign the buffer object to the attribute variable
        gl.enableVertexAttribArray(a_attribute);  // Enable the assignment

        return buffer;
    }
}