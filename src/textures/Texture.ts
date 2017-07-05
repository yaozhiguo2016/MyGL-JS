import RenderContext from "../RenderContext";
/**
 * Created by yaozh on 2017/6/28.
 */
export default class Texture
{
    protected _pixels:any;

    protected _width:number;
    protected _height:number;

    protected _flipY:boolean;

    protected _buffer:WebGLTexture;

    public constructor(pixels?:any, flipY:boolean = false)
    {
        this._pixels = pixels || this.createDefaultTexture();
        this._width = pixels ? pixels.width : 0;
        this._height = pixels ? pixels.height : 0;
        this._flipY = flipY;

        let gl:WebGLRenderingContext = RenderContext.context;
        let texture:WebGLTexture = gl.createTexture(); // Create a texture object

        this._buffer = texture;
    }

    public get buffer():WebGLTexture
    {
        return this._buffer;
    }

    public get pixels():ImageData|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement
    {
        return this._pixels;
    }

    public setTextureAttribute():void
    {
        let gl:WebGLRenderingContext = RenderContext.context;
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._flipY ? 1 : 0); // Flip the image's y axis
        // Enable the texture unit 0
        gl.activeTexture(gl.TEXTURE0);
        // Bind the texture object to the target
        gl.bindTexture(gl.TEXTURE_2D, this._buffer);

        // Set the texture parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        // Set the texture image
        if (this._pixels instanceof Uint8Array)
        {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 64, 64, 0, gl.RGBA, gl.UNSIGNED_BYTE, this._pixels);
        }
        else
        {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this._pixels);
        }
    }

    private createDefaultTexture():Uint8ClampedArray
    {
        let TEXTURE_SIZE:number = 64;
        let NUM_ROW:number = 8;
        let NUM_COL:number = 8;

        let initTexels:Uint8Array = new Uint8Array(4 * TEXTURE_SIZE * TEXTURE_SIZE);

        for (let i:number = 0; i < TEXTURE_SIZE; i++)
        {
            for (let j:number = 0; j < TEXTURE_SIZE; j++)
            {
                let patchX:number = Math.floor(i / (TEXTURE_SIZE / NUM_ROW));
                let patchY:number = Math.floor(j / (TEXTURE_SIZE / NUM_COL));

                let c = (patchX % 2 != patchY % 2 ? 255 : 0);

                initTexels[ 4 * i * TEXTURE_SIZE + 4 * j] = c;
                initTexels[ 4 * i * TEXTURE_SIZE + 4 * j + 1] = c;
                initTexels[ 4 * i * TEXTURE_SIZE + 4 * j + 2] = c;
                initTexels[ 4 * i * TEXTURE_SIZE + 4 * j + 3] = 255;
            }
        }

        return initTexels;
    }
}