import RenderContext from "../RenderContext";
/**
 * Created by yaozh on 2017/6/6.
 */
export default class Geometry
{
    protected _vertexPositions:Float32Array;
    protected _vertexNormals:Float32Array;
    protected _vertexColors:Float32Array;
    protected _indices:Uint16Array;
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

    public get indices():Uint16Array
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

    private a_Position:number;
    private a_Normal:number;
    private a_Color:number;

    protected createBufferData():void
    {
        this.gl = RenderContext.context;
        this.a_Position = this.gl.getAttribLocation(this.gl['program'], 'a_Position');
        this.a_Normal = this.gl.getAttribLocation(this.gl['program'], 'a_Normal');
        this.a_Color = this.gl.getAttribLocation(this.gl['program'], 'a_Color');

        if (this.a_Position < 0 || this.a_Normal < 0 || this.a_Color < 0) {
            console.log('Failed to get the storage location');
            return;
        }

        this.vertexBuffer = this.createArrayBuffer(this.gl, this.a_Position, this.vertexPosNum, this.gl.FLOAT, this._vertexPositions);
        this.normalBuffer = this.createArrayBuffer(this.gl, this.a_Normal, this.vertexNormalNum, this.gl.FLOAT, this._vertexNormals);
        this.colorBuffer = this.createArrayBuffer(this.gl, this.a_Color, this.vertexColorNum, this.gl.FLOAT, this._vertexColors);
        //this.uvBuffer = this.createEmptyArrayBuffer(this.gl, a_Color, this.vertexColorNum, this.gl.FLOAT);
        this.indexBuffer = this.gl.createBuffer();
        if (!this.vertexBuffer || !this.normalBuffer || !this.colorBuffer || !this.indexBuffer)
        {
            console.log('buffer create failed.');
            return ;
        }
        // Write the indices to the buffer object
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this._indices, this.gl.STATIC_DRAW);
    }

    private createArrayBuffer(gl:WebGLRenderingContext, a_attribute:number, num:number, type:number, bufferData):WebGLBuffer
    {
        let buffer =  gl.createBuffer();  // Create a buffer object
        if (!buffer) {
            console.log('Failed to create the buffer object');
            return null;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);
        gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);  // Assign the buffer object to the attribute variable
        gl.enableVertexAttribArray(a_attribute);  // Enable the assignment

        return buffer;
    }

    public setBuffersAndAttribs():void
    {
        this.setBufferAndAttrib(this.gl, this.vertexBuffer, this.a_Position, this.vertexPosNum, this.gl.FLOAT);
        this.setBufferAndAttrib(this.gl, this.normalBuffer, this.a_Normal, this.vertexNormalNum, this.gl.FLOAT);
        this.setBufferAndAttrib(this.gl, this.colorBuffer, this.a_Color, this.vertexColorNum, this.gl.FLOAT);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    }

    private setBufferAndAttrib(gl:WebGLRenderingContext,buffer:WebGLBuffer, a_attribute:number, num:number, type:number):void
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);  // Assign the buffer object to the attribute variable
        gl.enableVertexAttribArray(a_attribute);
    }
}