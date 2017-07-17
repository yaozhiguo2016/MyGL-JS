import Texture from "./Texture";
import RenderContext from "../RenderContext";
/**
 * Created by yaozh on 2017/6/28.
 */
export default class Texture2D extends Texture
{
    public static DEFAULT_TEXTURE_SIZE:number = 64;

    protected _pixels:any;

    protected _width:number;
    protected _height:number;

    protected _flipY:boolean;

    public constructor(pixels?:any, flipY:boolean = false)
    {
        super();

        this._pixels = pixels || this.createDefaultTexture();
        this._width = pixels ? pixels.width : 0;
        this._height = pixels ? pixels.height : 0;
        this._flipY = flipY;
    }

    public get pixels():any
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
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,
                Texture2D.DEFAULT_TEXTURE_SIZE, Texture2D.DEFAULT_TEXTURE_SIZE,
                0, gl.RGBA, gl.UNSIGNED_BYTE, this._pixels);
        }
        else
        {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this._pixels);
        }
    }

    private createDefaultTexture():Uint8ClampedArray
    {
        const TEXTURE_SIZE:number = Texture2D.DEFAULT_TEXTURE_SIZE;
        const NUM_ROW:number = 8;
        const NUM_COL:number = 8;

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