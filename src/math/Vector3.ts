import Quaternion from "./Quaternion";
import Matrix3 from "./Matrix3";
import Matrix4 from "./Matrix4";
import EulerAngle from "./EulerAngle";
/**
 * Created by yaozh on 2017/6/11.
 */
export default class Vector3
{
    public static FORWARD:Vector3 = new Vector3(0, 0, 1);//positive z-axis
    public static UP:Vector3 = new Vector3(0, 1, 0);//positive y-axis
    public static RIGHT:Vector3 = new Vector3(1, 0, 0);//positive x-axis
    public static ZERO:Vector3 = new Vector3(0, 0, 0);

    public x:number;
    public y:number;
    public z:number;

    private _elements:Float32Array;

    public get elements():Float32Array
    {
        return new Float32Array([
            this.x,
            this.y,
            this.z
        ]);
    }

    public constructor(x?:number, y?:number, z?:number)
    {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this._elements = new Float32Array([
            this.x,
            this.y,
            this.z
        ]);
    }

    public set ( x:number, y:number, z:number ):Vector3
    {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    /**
     * 把本向量的每个分量设置为某个相同的数值
     * @param scalar 
     */
    public setScalar ( scalar:number ) :Vector3
    {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;

        return this;
    }

    public setX ( x:number ):Vector3
    {
        this.x = x;
        return this;
    }

    public setY ( y:number ):Vector3
    {
        this.y = y;
        return this;
    }

    public setZ ( z:number ):Vector3
    {
        this.z = z;
        return this;
    }

    /**
     * 设置本向量某个分量的值
     * @param index 分量索引，从0开始 
     * @param value 欲设置的分量的值
     */
    public setComponent( index:number, value:number ):Vector3
    {
        switch ( index )
        {
            case 0: this.x = value; break;
            case 1: this.y = value; break;
            case 2: this.z = value; break;
            default: throw new Error( 'index is out of range: ' + index );
        }
        return this;
    }

    public getComponent ( index:number ):number
    {
        switch ( index )
        {
            case 0: return this.x;
            case 1: return this.y;
            case 2: return this.z;
            default: throw new Error( 'index is out of range: ' + index );
        }
    }

    /**
     * 获取当前向量的副本），不影响当前向量
     */
    public clone ():Vector3
    {
        return new Vector3( this.x, this.y, this.z );
    }

    /**
     * 用某个向量为当前向量赋值(分量分别赋值，不影响参数向量)
     * @param v 
     */
    public copyFrom ( v:Vector3 ):Vector3
    {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;

        return this;
    }

    public add( v:Vector3):Vector3
    {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;

        return this;
    }

    /**
     * 为当前向量的每个分量都增加一个相同标量数
     * @param s 
     */
    public addScalar( s:number ):Vector3
    {
        this.x += s;
        this.y += s;
        this.z += s;

        return this;
    }

    /**
     * 同时把两个向量与当前向量相加：相当于a,b先相加，然后把结果与当前向量相加
     * @param a 
     * @param b 
     */
    public addVectors ( a:Vector3, b:Vector3 ):Vector3
    {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        return this;
    }

    /**
     * 将一个缩放的向量与当前向量相加
     * @param v 将缩放的向量
     * @param s 缩放倍数
     */
    public addScaledVector ( v:Vector3, s:number ):Vector3
    {
        this.x += v.x * s;
        this.y += v.y * s;
        this.z += v.z * s;

        return this;
    }

    public sub( v:Vector3):Vector3
    {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;

        return this;
    }

    /**
     * 为当前向量的每个分量都减去一个相同标量数
     * @param s 
     */
    public subScalar( s:number ):Vector3
    {
        this.x -= s;
        this.y -= s;
        this.z -= s;

        return this;
    }

    /**
     * 求两个向量的差，并保存在当前向量中
     * @param a 
     * @param b 
     */
    public subVectors (a:Vector3, b:Vector3):Vector3
    {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;

        return this;
    }

    public multiply( v:Vector3):Vector3
    {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;

        return this;
    }

    /**
     * 将当前向量的每个分量都乘以一个相同标量数
     * @param s 
     */
    public multiplyScalar ( scalar:number ):Vector3
    {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;

        return this;
    }

    public multiplyVectors ( a:Vector3, b:Vector3 ):Vector3
    {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;

        return this;
    }

    public applyEuler (euler:EulerAngle):Vector3
    {
        let quaternion:Quaternion = new Quaternion();
        return this.applyQuaternion(quaternion.setFromEuler(euler));
    }

    public applyAxisAngle (axis:Vector3, angle:number):Vector3
    {
        let quaternion:Quaternion = new Quaternion();
        return this.applyQuaternion(quaternion.setFromAxisAngle(axis, angle));
    }

    public applyMatrix3 ( m:Matrix3 ):Vector3
    {
        let x = this.x, y = this.y, z = this.z;
        let e = m.elements;

        this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
        this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
        this.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;

        return this;
    }

    public applyMatrix4 ( m:Matrix4 ):Vector3
    {
        let x = this.x, y = this.y, z = this.z;
        let e = m.elements;

        this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z + e[ 12 ];
        this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z + e[ 13 ];
        this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ];
        let w =  e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ];

        return this.divideScalar( w );
    }

    public applyQuaternion ( q:Quaternion ):Vector3
    {
        let x = this.x, y = this.y, z = this.z;
        let qx = q.x, qy = q.y, qz = q.z, qw = q.w;

        // calculate quat * vector

        let ix =  qw * x + qy * z - qz * y;
        let iy =  qw * y + qz * x - qx * z;
        let iz =  qw * z + qx * y - qy * x;
        let iw = - qx * x - qy * y - qz * z;

        // calculate result * inverse quat

        this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
        this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
        this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

        return this;
    }

    /*project: function () {

        var matrix = new Matrix4();

        return function project( camera ) {

            matrix.multiplyMatrices( camera.projectionMatrix, matrix.getInverse( camera.matrixWorld ) );
            return this.applyMatrix4( matrix );

        };

    }(),

    unproject: function () {

        var matrix = new Matrix4();

        return function unproject( camera ) {

            matrix.multiplyMatrices( camera.matrixWorld, matrix.getInverse( camera.projectionMatrix ) );
            return this.applyMatrix4( matrix );

        };

    }(),*/

    public transformDirection ( m:Matrix3|Matrix4 ):Vector3
    {
        // input: Matrix4 affine matrix
        // vector interpreted as a direction

        let x = this.x, y = this.y, z = this.z;
        let e = m.elements;

        this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z;
        this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z;
        this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

        return this.normalize();
    }

    public divide ( v:Vector3 ):Vector3
    {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;

        return this;
    }

    /**
     * 将当前向量的每个分量都除以一个相同标量数
     * @param s 
     */
    public divideScalar ( scalar:number ):Vector3
    {
        return this.multiplyScalar( 1 / scalar );
    }

    public min ( v:Vector3 ):Vector3
    {
        this.x = Math.min( this.x, v.x );
        this.y = Math.min( this.y, v.y );
        this.z = Math.min( this.z, v.z );

        return this;
    }

    public max ( v:Vector3 ):Vector3
    {
        this.x = Math.max( this.x, v.x );
        this.y = Math.max( this.y, v.y );
        this.z = Math.max( this.z, v.z );

        return this;
    }

    public clamp( min:Vector3, max:Vector3 ):Vector3
    {
        // This function assumes min < max, if this assumption isn't true it will not operate correctly
        this.x = Math.max( min.x, Math.min( max.x, this.x ) );
        this.y = Math.max( min.y, Math.min( max.y, this.y ) );
        this.z = Math.max( min.z, Math.min( max.z, this.z ) );

        return this;
    }

    public clampScalar (minVal:number, maxVal:number):Vector3
    {
        let min:Vector3 = new Vector3();
        let max:Vector3 = new Vector3();

        min.set( minVal, minVal, minVal );
        max.set( maxVal, maxVal, maxVal );

        return this.clamp( min, max );
    }

    public clampLength ( min:number, max:number ):Vector3
    {
        let length:number = this.length();
        return this.multiplyScalar( Math.max( min, Math.min( max, length ) ) / length );
    }

    public floor ():Vector3
    {
        this.x = Math.floor( this.x );
        this.y = Math.floor( this.y );
        this.z = Math.floor( this.z );

        return this;
    }

    public ceil ():Vector3
    {
        this.x = Math.ceil( this.x );
        this.y = Math.ceil( this.y );
        this.z = Math.ceil( this.z );

        return this;
    }

    public round ():Vector3
    {
        this.x = Math.round( this.x );
        this.y = Math.round( this.y );
        this.z = Math.round( this.z );

        return this;
    }

    public roundToZero ():Vector3
    {
        this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
        this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
        this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );

        return this;
    }

    public negate ():Vector3
    {
        this.x = - this.x;
        this.y = - this.y;
        this.z = - this.z;

        return this;
    }

    /**
     * 点乘，结果是一个标量，衡量两个向量的相似度
     * @param v 
     */
    public dot ( v:Vector3 ):number
    {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    // TODO lengthSquared?

    public lengthSq ():number
    {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    public length ():number
    {
        return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
    }

    public lengthManhattan ():number
    {
        return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );
    }

    /**
     * 向量归一化，变为单位向量
     */
    public normalize ():Vector3
    {
        return this.divideScalar( this.length() );
    }

    public setLength ( length:number ):Vector3
    {
        return this.multiplyScalar( length / this.length() );
    }

    /**
     * 线性插值
     * @param v 目标向量 
     * @param alpha 目标向量和当前向量之间的递进度，小于1
     */
    public lerp ( v:Vector3, alpha:number ):Vector3
    {
        this.x += ( v.x - this.x ) * alpha;
        this.y += ( v.y - this.y ) * alpha;
        this.z += ( v.z - this.z ) * alpha;

        return this;
    }

    public lerpVectors( v1:Vector3, v2:Vector3, alpha:number ):Vector3
    {
        return this.subVectors( v2, v1 ).multiplyScalar( alpha ).add( v1 );
    }

    /**
     * 向量叉乘，获取与目标向量和当前向量所确定平面垂直的向量，新向量的方向满足右手定则
     * @param v 
     */
    public cross ( v:Vector3):Vector3
    {
        let x = this.x, y = this.y, z = this.z;

        this.x = y * v.z - z * v.y;
        this.y = z * v.x - x * v.z;
        this.z = x * v.y - y * v.x;

        return this;
    }

    /**
     * 把两个向量叉乘的结果，存储于当前向量中。
     * @param a 
     * @param b 
     */
    public crossVectors ( a:Vector3, b:Vector3 ):Vector3
    {
        let ax = a.x, ay = a.y, az = a.z;
        let bx = b.x, by = b.y, bz = b.z;

        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;

        return this;
    }

    public projectOnVector ( vector:Vector3 ):Vector3
    {
        let scalar = vector.dot( this ) / vector.lengthSq();
        return this.copyFrom( vector ).multiplyScalar( scalar );
    }

    public projectOnPlane (planeNormal:Vector3):Vector3
    {
        let v1 = new Vector3();
        v1.copyFrom( this ).projectOnVector( planeNormal );
        return this.sub( v1 );
    }

    /**
     * 当前向量基于某法线的对称向量
     * @param normal 
     */
    public reflect (normal:Vector3):Vector3
    {
        // reflect incident vector off plane orthogonal to normal
        // normal is assumed to have unit length
        let v1 = new Vector3();
        return this.sub( v1.copyFrom( normal ).multiplyScalar( 2 * this.dot( normal ) ) );
    }

    /**
     * 相对于目标向量的夹角
     * @param v 
     */
    public angleTo ( v:Vector3 ):number
    {
        let theta = this.dot( v ) / ( Math.sqrt( this.lengthSq() * v.lengthSq() ) );
        // clamp, to handle numerical problems

        //return Math.acos( _Math.clamp( theta, - 1, 1 ) );
        return Math.acos(theta);
    }

    public distanceTo ( v:Vector3 ):number
    {
        return Math.sqrt( this.distanceToSquared( v ) );
    }

    public distanceToSquared ( v:Vector3 ):number
    {
        let dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
        return dx * dx + dy * dy + dz * dz;
    }

    public distanceToManhattan ( v:Vector3 ):number
    {
        return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y ) + Math.abs( this.z - v.z );
    }

    public setFromMatrixPosition ( m:Matrix3 ):Vector3
    {
        return this.setFromMatrixColumn( m, 3 );
    }

    public setFromMatrixScale ( m:Matrix3|Matrix4 ):Vector3
    {
        let sx = this.setFromMatrixColumn( m, 0 ).length();
        let sy = this.setFromMatrixColumn( m, 1 ).length();
        let sz = this.setFromMatrixColumn( m, 2 ).length();

        this.x = sx;
        this.y = sy;
        this.z = sz;

        return this;
    }

    /**
     * 从矩阵的某列获取数值，重置当前向量的分量
     * @param m 
     * @param index 
     */
    public setFromMatrixColumn ( m:Matrix3|Matrix4, index )
    {
        return this.fromArray( m.elements, index * 4 );
    }

    /**
     * 判断两个向量的每个分量是否完全一致
     * @param v 
     */
    public equals ( v:Vector3 ):boolean
    {
        return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );
    }

    /**
     * 从数组的某个位置开始依次对当前向量的每个分量赋值
     * @param array 来源数组
     * @param offset 数组中对应的第一个分量的位置
     */
    public fromArray ( array:Array<number>|Float32Array, offset:number = 0 ):Vector3
    {
        this.x = array[ offset ];
        this.y = array[ offset + 1 ];
        this.z = array[ offset + 2 ];

        return this;
    }

    /**
     * 将当前向量的分量按序传给既定数组的特定索引位置
     * @param array 
     * @param offset 
     */
    public toArray ( array?:Array<any>, offset:number=0 ):Array<number>
    {
        if ( array === undefined ) array = [];
        if ( offset === undefined ) offset = 0;

        array[ offset ] = this.x;
        array[ offset + 1 ] = this.y;
        array[ offset + 2 ] = this.z;

        return array;
    }

    public fromBufferAttribute ( attribute, index:number, offset:number=0 ):Vector3
    {
        if ( offset !== undefined ) {
            console.warn( 'Vector3: offset has been removed from .fromBufferAttribute().' );
        }

        this.x = attribute.getX( index );
        this.y = attribute.getY( index );
        this.z = attribute.getZ( index );

        return this;
    }
}