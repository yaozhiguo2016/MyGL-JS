import Object3D from "./Object3D";
import Geometry from "../primitives/Geometry";
import RenderContext from "../RenderContext";
import Scene3D from "./Scene3D";
import StandardMaterial from "../materials/StandardMaterial";

/**
 * Created by yaozh on 2017/6/14.
 */
export default class Mesh extends Object3D {
  public vertexBuffer: WebGLBuffer;
  public normalBuffer: WebGLBuffer;
  public colorBuffer: WebGLBuffer;
  public uvBuffer: WebGLBuffer;
  public indexBuffer: WebGLBuffer;

  protected _geometry: Geometry;
  protected _material: StandardMaterial;
  //protected _usedProgram: WebGLProgram;
  protected _scene: Scene3D;
  protected gl: WebGLRenderingContext;

  //for public properties
  public static SURFACE_SIDE_FRONT: number = 1;
  public static SURFACE_SIDE_BACK: number = 2;
  public static SURFACE_SIDE_DOUBLE: number = 3;

  protected _surfaceSide: number;
  protected _castShadow: boolean;
  protected _receiveShadow: boolean;

  public constructor(geometry: Geometry, material: StandardMaterial) {
    super();
    this.gl = RenderContext.context;
    this._geometry = geometry;
    this._material = material;

    this._surfaceSide = Mesh.SURFACE_SIDE_FRONT;
    this._castShadow = false;
    this._receiveShadow = false;

    this.material.getShader(); // 根据传入的material生成对应的shader
    this.createMeshBuffers();

    this._type = 'Mesh';
  }

  protected createMeshBuffers(): void {
    this.vertexBuffer = this.createArrayBuffer(this.geometry.vertexPositions);
    this.normalBuffer = this.createArrayBuffer(this.geometry.vertexNormals);
    this.uvBuffer = this.createArrayBuffer(this.geometry.uvs);
    if (this.geometry.indexDraw) {
      this.indexBuffer = this.createIndexBuffer();
    }
  }

  public get geometry(): Geometry {
    return this._geometry;
  }

  public get material(): StandardMaterial {
    return this._material;
  }

  /*public get usedProgram(): WebGLProgram {
    return this._usedProgram;
  }

  public set usedProgram(value: WebGLProgram) {
    this._usedProgram = value;
  }*/

  public get scene(): Scene3D {
    return this._scene;
  }

  public set surfaceSide(value: number) {
    this._surfaceSide = value;
  }

  public get surfaceSide(): number {
    return this._surfaceSide;
  }

  public draw(): void {
    let gl: WebGLRenderingContext = RenderContext.context;
    this.material.shader.setAttributeAndUniforms(this);
    if (this.geometry.indexDraw) {
      gl.drawElements(gl.TRIANGLES, this.geometry.indices.length, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.drawArrays(gl.TRIANGLES, 0, this.geometry.vertexNum);
    }
  }

  public createArrayBuffer(bufferData): WebGLBuffer {
    let buffer = this.gl.createBuffer();  // Create a buffer object
    if (!buffer) {
      console.error('Mesh::createArrayBuffer(): create the buffer object failed.');
      return null;
    }
    // Write the attribute data into the buffer object
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, bufferData, this.gl.STATIC_DRAW);
    return buffer;
  }

  public createIndexBuffer(): WebGLBuffer {
    let indexBuffer = this.gl.createBuffer();
    if (!indexBuffer) {
      console.error('Mesh::createIndexBuffer(): create index buffer failed.');
      return;
    }
    // Write the indices into the buffer object
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this._geometry.indices, this.gl.STATIC_DRAW);
    return indexBuffer;
  }

  public setBufferAttribute(buffer: WebGLBuffer, a_attribute: number, num: number, type: number): void {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    // Assign the buffer object to the attribute variable
    this.gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    this.gl.enableVertexAttribArray(a_attribute);
  }

  public dispose(): void {
    this.gl.deleteBuffer(this.vertexBuffer);
    this.gl.deleteBuffer(this.normalBuffer);
    this.gl.deleteBuffer(this.indexBuffer);
    this.gl.deleteBuffer(this.uvBuffer);
    this.gl.deleteBuffer(this.colorBuffer);
  }
}