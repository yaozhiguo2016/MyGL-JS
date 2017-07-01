import Vector3 from "../math/Vector3";
import Texture2D from "../textures/Texture2D";
/**
 * Created by yaozh on 2017/6/6.
 */
export default class Material
{
    protected _type:string;
    public get type():string
    {
        return this._type;
    }

    protected _emissiveColor:Vector3;
    protected _ambientColor:Vector3;
    protected _diffuseColor:Vector3;
    protected _specularColor:Vector3;
    protected _shininess:number;
    protected _texture:Texture2D;

    protected _alpha:number;

    /**
     * 物体本身的表面颜色，即自发的光线
     * @returns {Vector3}
     */
    public get emissiveColor():Vector3
    {
        return this._emissiveColor;
    }

    public set emissiveColor(value:Vector3)
    {
        this._emissiveColor = value;
    }

    /**
     * 物体的环境色
     * @returns {Vector3}
     */
    public get ambientColor():Vector3
    {
        return this._ambientColor;
    }

    public set ambientColor(value:Vector3)
    {
        this._ambientColor = value;
    }

    /**
     * 漫反射光
     * @returns {Vector3}
     */
    public get diffuseColor():Vector3
    {
        return this._diffuseColor;
    }

    public set diffuseColor(value:Vector3)
    {
        this._diffuseColor = value;
    }

    /**
     * 镜面反射光
     * @returns {Vector3}
     */
    public get specularColor():Vector3
    {
        return this._specularColor;
    }

    public set specularColor(value:Vector3)
    {
        this._specularColor = value;
    }

    /**
     * 物体表面镜面反射的高光系数
     * @returns {number}
     */
    public get shininess():number
    {
        return this._shininess;
    }

    public set shininess(value:number)
    {
        this._shininess = value;
    }

    /**
     * 物体表面纹理
     * @returns {Texture2D}
     */
    public get texture():Texture2D
    {
        return this._texture;
    }

    public set texture(value:Texture2D)
    {
        this._texture = value;
    }

    public get alpha():number
    {
        return this._alpha;
    }

    public set alpha(value:number)
    {
        this._alpha = value;
    }

    public constructor()
    {
        this._type = 'Material';
        this._emissiveColor = new Vector3(0.2, 0.2, 0.2);
        this._ambientColor = new Vector3(0.1, 0.1, 0.1);
        this._diffuseColor = new Vector3(0.6, 0.6, 0.6);
        this._specularColor = new Vector3(0.3, 0.3, 0.3);
        this._shininess = 100.0;
        this._alpha = 1.0;
    }
}