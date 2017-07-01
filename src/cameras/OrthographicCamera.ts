import Camera from "./Camera";
/**
 * Created by yaozh on 2017/6/24.
 */
export default class OrthographicCamera extends Camera
{
    private _left:number;
    private _right:number;
    private _top:number;
    private _bottom:number;
    private _near:number;
    private _far:number;

    constructor(left?:number, right?:number, top?:number, bottom?:number, near?:number, far?:number )
    {
        super();
        this._left = left || -0.5;
        this._right = right || 0.5;
        this._top = top || -0.5;
        this._bottom = bottom || 0.5;
        this._near = near || 0.1;
        this._far = far || 10000;
        this._projMatrix.makeOrthographic(this._left, this._right, this._top, this._bottom, this._near, this._far);

        this._type = 'OrthographicCamera';
    }
}