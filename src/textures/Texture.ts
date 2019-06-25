import RenderContext from "../RenderContext";
import Constant from "../enum/Constant";
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

    protected _flipY: boolean;

    protected _wrapS: number = Constant.REPEAT; // u坐标溢出的渲染模式
    protected _wrapT: number = Constant.REPEAT; // v坐标溢出的渲染模式
    protected _magFilter: number = Constant.NEAREST; // 纹理放大和缩小时默认都使用 点采样的方式
    protected _minFilter: number = Constant.NEAREST;

    protected _useMipMap: boolean = false;

    public set wrapS(value:number) {
        this._wrapS = value;
      }
    
      public get wrapS():number {
        return this._wrapS;
      }
    
      public set wrapT(value:number) {
        this._wrapT = value;
      }
    
      public get wrapT():number {
        return this._wrapT;
      }
    
      public set minFilter(value:number) {
        this._minFilter = value;
      }
    
      public get minFilter():number {
        return this._minFilter;
      }
    
      public set magFilter(value:number) {
        this._magFilter = value;
      }
    
      public get magFilter():number {
        return this._magFilter;
      }
    
      public set useMipMap(value:boolean) {
        this._useMipMap = value;
      }
    
      public get useMipMap():boolean {
        return this._useMipMap;
      }

}