import RenderContext from "../RenderContext";
/**
 * Created by yaozh on 2017/6/28.
 */
export default class Texture
{
    protected _buffer:WebGLTexture;
    protected _gl:WebGLRenderingContext;

    public constructor()
    {
        this._gl = RenderContext.context;
        let texture:WebGLTexture = this._gl.createTexture(); // Create a texture object

        this._buffer = texture;
    }

    public setTextureAttribute():void
    {

    }

    public get buffer():WebGLTexture
    {
        return this._buffer;
    }

    public dispose():void
    {
        this._gl.deleteBuffer(this._buffer);
    }
}