import Quaternion from "../math/Quaternion";
import Matrix4 from "../math/Matrix4";
import Vector3 from "../math/Vector3";
import EulerAngle from "../math/EulerAngle";
import EventDispatcher from "../base/EventDispatcher";
import BaseEvent from "../base/BaseEvent";
import MathEx from "../math/MathEx";
/**
 * Created by yaozh on 2017/6/6.
 */
export default class Object3D extends EventDispatcher
{
    public static ADDED:string = 'added';
    public static REMOVED:string = 'removed';

    protected _localMatrix:Matrix4;
    protected _worldMatrix:Matrix4;
    private _modelViewMatrix:Matrix4;
    private _normalMatrix:Matrix4;
    /**
     * 局部坐标矩阵
     */
    public get localMatrix():Matrix4
    {
        return this._localMatrix;
    }

    /**
     * 世界坐标矩阵
     */
    public get worldMatrix():Matrix4
    {
        return this._worldMatrix;
    }

    /**
     * model-view矩阵，用来标记模型视图转换矩阵的，在draw的时候使用
     */
    public get modelViewMatrix():Matrix4
    {
        return this._modelViewMatrix;
    }

    /**
     * 由于顶点法线是变化的，所以本矩阵用来标记法线的变化，在draw的时候使用
     */
    public get normalMatrix():Matrix4
    {
        return this._normalMatrix;
    }

    private _parent:Object3D;
    private _children:Array<Object3D>;
    private _visible:boolean = true;

    public get children():Array<Object3D>
    {
        return this._children;
    }

    public get parent():Object3D
    {
        return this._parent;
    }

    public get visible():boolean
    {
        return this._visible;
    }

    public set visible(value:boolean)
    {
        this._visible = value;
    }

    private _name:string = 'object3d';
    private _id:string = MathEx.generateUUID();
    private _position:Vector3 = new Vector3();
    private _rotation:EulerAngle = new EulerAngle();
    private _quaternion:Quaternion = new Quaternion();
    private _scale:Vector3 = new Vector3(1, 1, 1);

    public get name():string
    {
        return this._name;
    }

    public set name(value:string)
    {
        this._name = value;
    }

    public get id():string
    {
        return this._id;
    }

    public get position():Vector3
    {
        return this._position;
    }

    public set position(value:Vector3)
    {
        this._position = value;
    }

    public get rotation():EulerAngle
    {
        return this._rotation;
    }

    public set rotation(value:EulerAngle)
    {
        this._rotation = value;
    }

    public get quaternion():Quaternion
    {
        return this._quaternion;
    }

    public set quaternion(value:Quaternion)
    {
        this._quaternion = value;
    }

    public get scale():Vector3
    {
        return this._scale;
    }

    public set scale(value:Vector3)
    {
        this._scale = value;
    }

    public constructor()
    {
        super();
        this._children = [];
        this._localMatrix = new Matrix4();
        this._worldMatrix = new Matrix4();
        this._modelViewMatrix = new Matrix4();
        this._normalMatrix = new Matrix4();

        this._rotation.onChange(()=>{
            this._quaternion.setFromEuler( this._rotation, false );
        }, this);
        this._quaternion.onChange(()=>{
            this._rotation.setFromQuaternion( this._quaternion, undefined, false );
        }, this);
    }

    /**
     * 把一个矩阵运用到本对象上。矩阵会被分解成对应的位置，旋转和缩放信息，保存在本对象的数据结构中。
     * @param matrix
     */
    public doMatrix(matrix:Matrix4):void
    {
        //注意顺序，是先作自我信息中的转换
        this._localMatrix.multiplyMatrices(matrix, this._localMatrix);
        //把转换后的组合矩阵分解到各个转换分量中
        this._localMatrix.decompose(this._position, this._quaternion, this._scale);
    }

    public addChild(child:Object3D):void
    {
        if (child != this)
        {
            if (child.parent)
            {
                child.parent.removeChild(child);
            }
            child._parent = this;
            child.dispatch(new BaseEvent(Object3D.ADDED));
            this.children.push(child);
        }
    }

    public removeChild(child:Object3D):void
    {
        let index:number = this.children.indexOf(child);
        if ( index !== - 1 )
        {
            child._parent = null;
            child.dispatch(new BaseEvent(Object3D.REMOVED));
            this.children.splice( index, 1 );
        }
    }

    /**
     * 绕某轴旋转一定弧度。
     * @param axis {Vector3}旋转轴，向量表示。
     * @param theta {number} 旋转角度，弧度表示。
     * @returns {Object3D}
     */
    public rotate(axis:Vector3, theta:number):Object3D
    {
        let q:Quaternion = new Quaternion();
        q.setFromAxisAngle(axis, theta);
        this._quaternion.multiply(q);
        return this;
    }

    /**
     * 让当前对象沿着某个轴平移一段距离。
     * @param distance {number}平移距离。
     * @param axis {Vector3} 平移时沿用的轴（方向）。注意，这个方向是相对于本对象的本地坐标系。
     * @returns {Object3D}
     */
    public translate(distance:number, axis:Vector3):Object3D
    {
        let v:Vector3 = new Vector3();
        v.copyFrom(axis).applyQuaternion(this._quaternion);
        this._position.add(v.multiplyScalar(distance));
        return this;
    }

    public getChildByName(name:string):Object3D
    {
        for (let child of this._children)
        {
            if (child.name == name)return child;
        }
        return null;
    }

    public getChildByID(id:string):Object3D
    {
        for (let child of this._children)
        {
            if (child.id == id)return child;
        }
        return null;
    }

    public getWorldPosition():Vector3
    {
        let result = new Vector3();
        this.updateWorldMatrix();
        return result.setFromMatrixPosition(this._worldMatrix);
    }

    public getWorldRotation():EulerAngle
    {
        let result = new EulerAngle();
        let quaternion = this.getWorldQuaternion();
        return result.setFromQuaternion(quaternion, this.rotation.order, false);
    }

    public getWorldScale():Vector3
    {
        let position = new Vector3();
        let quaternion = new Quaternion();
        let result = new Vector3();
        this.updateWorldMatrix();
        this._worldMatrix.decompose(position, quaternion, result);
        return result;
    }

    public getWorldQuaternion():Quaternion
    {
        let position = new Vector3();
        let scale = new Vector3();
        let result = new Quaternion();
        this.updateWorldMatrix();

        this._worldMatrix.decompose( position, result, scale );
        return result;
    }

    protected updateMatrix():void
    {
        this._localMatrix.compose(this._position, this._quaternion, this._scale);
    }

    public updateWorldMatrix():void
    {
        this.updateMatrix();

        if (!this.parent)
        {
            this._worldMatrix.copy(this.localMatrix);
        }
        else
        {
            this._worldMatrix.multiplyMatrices(this.parent._worldMatrix, this.localMatrix);
        }

        // update children
        let children = this.children;
        for (let i = 0, l = children.length; i < l; i++)
        {
            children[i].updateWorldMatrix();
        }
    }

    /**
     * 递归遍历所有的对象，包括自身
     * @param callback {Function | (Object3d)=>{}}
     */
    public traverse(callback:Function):void
    {
        callback(this);
        let children = this.children;

        for (let i = 0, l = children.length; i < l; i++)
        {
            children[i].traverse(callback);
        }
    }

    /**
     * 递归遍历所有可见对象。包括自身
     * @param callback{Function | (Object3d)=>{}}
     */
    public traverseVisible(callback:Function):void
    {
        if (!this.visible) return;
        callback(this);

        let children = this.children;

        for (let i = 0, l = children.length; i < l; i++)
        {
            children[i].traverseVisible(callback);
        }
    }

    /**
     * 递归遍历当前对象的所有父容器对象，即容器链，比如A包含B，B又包含C，则遍历C的父容器结果应该是B->A.
     * @param callback{Function | (Object3d)=>{}}
     */
    public traverseAncestors(callback:Function):void
    {
        let parent = this.parent;

        if (parent !== null)
        {
            callback(parent);
            parent.traverseAncestors(callback);
        }
    }
}