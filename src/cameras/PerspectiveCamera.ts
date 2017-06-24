import Camera from "./Camera";
/**
 * Created by yaozh on 2017/6/6.
 */
export default class PerspectiveCamera extends Camera
{
    private _fov:number = 60;
    private _near:number = 0.1;
    private _far:number = 10000;

    public constructor(fov?:number, near?:number, far?:number)
    {
        super();
        this._fov = fov || 45;
        this._near = near || 0.1;
        this._far = far || 10000;
        this._projMatrix.makePerspective(this._fov, 1.0, this._near, this._far);
    }
}