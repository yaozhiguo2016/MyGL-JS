import Camera from "./Camera";
import Matrix4 from "../math/Matrix4";
import Vector3 from "../math/Vector3";
/**
 * Created by yaozh on 2017/6/6.
 */
export default class PerspectiveCamera extends Camera
{
    private _fov:number = 60;
    private _near:number = 0.1;
    private _far:number = 10000;
    private _perspectiveMatrix:Matrix4;

    public get perpectiveMatrix():Matrix4
    {
        return this._perspectiveMatrix;
    }

    public constructor(pos?:Vector3, fov?:number, near?:number, far?:number)
    {
        super(pos);
        this._fov = fov || 45;
        this._near = near || 0.1;
        this._far = far || 10000;
        this._perspectiveMatrix = new Matrix4();
        this._perspectiveMatrix.makePerspective(this._fov, 1.0, this._near, this._far);
    }
}