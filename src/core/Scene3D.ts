import Light from "../lights/Light";
import Camera from "../cameras/Camera";
import Vector3 from "../math/Vector3";
import Mesh from "./Mesh";
/**
 * Created by yaozh on 2017/6/6.
 */
export default class Scene3D
{
    private _lights:Light[];
    private _camera:Camera;
    private _meshes:Mesh[];
    private _ambientColor:Vector3;

    public get currentCamera():Camera
    {
        return this._camera;
    }

    public set currentCamera(value:Camera)
    {
        this._camera = value;
    }

    public constructor()
    {
        this._lights = [];
        this._meshes = [];
        this._ambientColor = new Vector3(0.2, 0.2, 0.2);
    }

    public addLight(light:Light):void
    {
        if (light)
        {
            this._lights.push(light);
        }
    }

    public get lights():Light[]
    {
        return this._lights;
    }

    public addMesh(mesh:Mesh):void
    {
        mesh.traverse((child:Mesh)=>{
            this._meshes.push(child);
            child['_scene'] = this;
        });
    }

    public set ambientColor(color:Vector3)
    {
        this._ambientColor = color;
    }

    public get ambientColor():Vector3
    {
        return this._ambientColor;
    }

    public get meshes():Mesh[] {
        return this._meshes;
    }
}