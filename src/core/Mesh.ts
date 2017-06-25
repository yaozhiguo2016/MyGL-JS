import Object3D from "./Object3D";
import Geometry from "../primitives/Geometry";
/**
 * Created by yaozh on 2017/6/14.
 */
export default class Mesh extends Object3D
{
    private _geometry:Geometry;

    public constructor(geometry:Geometry)
    {
        super();
        this._geometry = geometry;
    }

    public get geometry():Geometry
    {
        return this._geometry;
    }
}