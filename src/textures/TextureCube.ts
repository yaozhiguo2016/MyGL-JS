import Texture from "./Texture";
import RenderContext from "../RenderContext";
/**
 * Created by yaozh on 2017/7/3.
 */
export default class TextureCube extends Texture
{
    private _images:Array<HTMLImageElement>;

    public constructor(images:Array<HTMLImageElement>)
    {
        super();
        this._images = images;
    }

    public setTextureAttribute():void
    {
        let gl:WebGLRenderingContext = RenderContext.context;
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);//this._flipY ? 1 : 0); // Flip the image's y axis
        // Enable the texture unit 0
        gl.activeTexture(gl.TEXTURE0);
        // Bind the texture object to the target
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._buffer);

        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this._images[0]);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this._images[1]);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this._images[2]);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this._images[3]);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this._images[4]);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this._images[5]);

        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    }
}