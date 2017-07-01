import Camera from "./Camera";
/**
 * Created by yaozh on 2017/6/6.
 */
export default class PerspectiveCamera extends Camera
{
    private _fov:number;
    private _near:number;
    private _far:number;
    private _aspeact:number;

    public constructor(fov?:number, aspeact?:number, near?:number, far?:number)
    {
        super();
        this._fov = fov || 45;
        this._near = near || 0.1;
        this._far = far || 10000;
        this._aspeact = aspeact || 1.0;
        this._projMatrix.makePerspective(this._fov, this._aspeact, this._near, this._far);

        this._type = 'PerspectiveCamera';
    }
}