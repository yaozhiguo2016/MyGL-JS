import Object3D from "./Object3D";
import Geometry from "../primitives/Geometry";
import Material from "../materials/Material";
import RenderContext from "../RenderContext";
import Scene3D from "./Scene3D";
import MaterialResolver from "../materials/materialresolvers/MaterialResolver";
import ResolverGenerator from "../materials/materialresolvers/ResolverGenerator";
import Texture from "../textures/Texture";
/**
 * Created by yaozh on 2017/6/14.
 */
export default class Mesh extends Object3D
{
    public vertexBuffer:WebGLBuffer;
    public normalBuffer:WebGLBuffer;
    public colorBuffer:WebGLBuffer;
    public uvBuffer:WebGLBuffer;
    public indexBuffer:WebGLBuffer;

    public a_Position:number;
    public a_Normal:number;
    public a_Color:number;
    public a_UV:number;

    private _geometry:Geometry;
    private _material:Material;
    private _usedProgram:WebGLProgram;
    private _scene:Scene3D;
    private gl:WebGLRenderingContext;

    private _resolver:MaterialResolver;

    //for public properties
    public static SURFACE_SIDE_FRONT:number = 1;
    public static SURFACE_SIDE_BACK:number = 2;
    public static SURFACE_SIDE_DOUBLE:number = 3;

    private _surfaceSide:number;
    private _castShadow:boolean;
    private _receiveShadow:boolean;

    public constructor(geometry:Geometry, material:Material)
    {
        super();
        this.gl = RenderContext.context;
        this._geometry = geometry;
        this._material = material;
        this._resolver = ResolverGenerator.createResolver(material.type, this, material);
        this._resolver.initMeshData();

        this._surfaceSide = Mesh.SURFACE_SIDE_FRONT;
        this._castShadow = false;
        this._receiveShadow = false;

        this._type = 'Mesh';
    }

    public get geometry():Geometry
    {
        return this._geometry;
    }

    public get material():Material
    {
        return this._material;
    }

    public get usedProgram():WebGLProgram
    {
        return this._usedProgram;
    }

    public set usedProgram(value:WebGLProgram)
    {
        this._usedProgram = value;
    }

    public get scene():Scene3D
    {
        return this._scene;
    }

    public set surfaceSide(value:number)
    {
        this._surfaceSide = value;
    }

    public get surfaceSide():number
    {
        return this._surfaceSide;
    }

    public draw():void
    {
        let gl:WebGLRenderingContext = RenderContext.context;
        this._resolver.resetAttribsAndUniforms();
        gl.drawElements(gl.TRIANGLES, this.geometry.indices.length, gl.UNSIGNED_SHORT, 0);
    }

    public createArrayBuffer(bufferData):WebGLBuffer
    {
        let buffer =  this.gl.createBuffer();  // Create a buffer object
        if (!buffer)
        {
            console.log('Failed to create the buffer object');
            return null;
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, bufferData, this.gl.STATIC_DRAW);

        return buffer;
    }

    public createIndexBuffer():WebGLBuffer
    {
        let indexBuffer = this.gl.createBuffer();
        if (!indexBuffer)
        {
            console.log('index buffer create failed.');
            return ;
        }
        // Write the indices to the buffer object
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this._geometry.indices, this.gl.STATIC_DRAW);
        return indexBuffer;
    }

    public setBufferAttribute(buffer:WebGLBuffer, a_attribute:number, num:number, type:number):void
    {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        // Assign the buffer object to the attribute variable
        this.gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
        this.gl.enableVertexAttribArray(a_attribute);
    }
}