import Object3D from "../core/Object3D";
import Matrix4 from "../math/Matrix4";
import Vector3 from "../math/Vector3";
/**
 * Created by yaozh on 2017/6/6.
 */
export default class Camera extends Object3D
{
    protected _viewMatrix:Matrix4;

    public get viewMatrix():Matrix4
    {
        return this._viewMatrix;
    }

    public constructor(pos?:Vector3)
    {
        super(pos);
        this._viewMatrix = new Matrix4();
    }

    public lookAt(targetPos:Vector3, upVec3:Vector3):void
    {
        this._viewMatrix.identity();
        this._viewMatrix.makeLookAt(this.pos, targetPos, upVec3);
    }
}