import Object3D from "../core/Object3D";
import Matrix4 from "../math/Matrix4";
import Vector3 from "../math/Vector3";
/**
 * Created by yaozh on 2017/6/6.
 */
export default class Camera extends Object3D
{
    protected _projMatrix:Matrix4;
    protected _inverseMatrix:Matrix4;

    public get projMatrix():Matrix4
    {
        return this._projMatrix;
    }

    public constructor()
    {
        super();
        this._projMatrix = new Matrix4();
        this._inverseMatrix = new Matrix4();
        this._type = 'Camera';
    }

    public lookAt(targetPos:Vector3, upVec3:Vector3):void
    {
        let lookAtMatrix:Matrix4 = new Matrix4();
        lookAtMatrix.lookAt(this.position, targetPos, upVec3);
        this._quaternion.setFromRotationMatrix(lookAtMatrix);
    }

    /**
     * 这个世界坐标系的逆矩阵反映了摄影机的世界变换的逆操作，让场景的顶点执行此操作可以转换视图到世界标架
     */
    public get inverseWorldMatrix():Matrix4
    {
        //this.updateWorldMatrix();
        return this._inverseMatrix.getInverse(this.worldMatrix, false);
    }
}