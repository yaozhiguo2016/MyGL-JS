import Light from "../lights/Light";
import Camera from "../cameras/Camera";
import Geometry from "../primitives/Geometry";
import RenderContext from "../RenderContext";
import PerspectiveCamera from "../cameras/PerspectiveCamera";
import Vector3 from "../math/Vector3";
import Matrix4 from "../math/Matrix4";
/**
 * Created by yaozh on 2017/6/6.
 */
export default class Scene3D
{
    private VSHADER_SOURCE =
        'attribute vec4 a_Position;\n'+
        'attribute vec4 a_Color;\n'+
        'attribute vec4 a_Normal;\n'+

        'uniform mat4 mvpMatrix;\n'+
        'uniform mat4 u_NormalMatrix;\n'+
        'uniform vec3 u_LightColor;\n'+
        'uniform vec3 u_LightDirection;\n'+
        'uniform vec3 u_AmbientLight;\n'+

        'varying vec4 v_Color;\n'+

        'void main()\n'+
        '{\n'+
        '    gl_Position = mvpMatrix * a_Position;\n'+
        '    // Make the length of the normal 1.0\n'+
        '    vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n'+
        '    // Dot product of light direction and orientation of a surface\n'+
        '    float angle = max(dot(u_LightDirection, normal), 0.0);\n'+
        '    // Calculate the color due to diffuse reflection\n'+
        '    vec3 diffuse = u_LightColor * vec3(a_Color) * angle;//光的混合是相乘，光的叠加是相加\n'+
        '    vec3 ambient = vec3(a_Color) * u_AmbientLight;\n'+
        '    v_Color = vec4(diffuse + ambient, a_Color.a);\n'+
        '}\n';

    private FSHADER_SOURCE =
        '#ifdef GL_ES\n' +
        'precision mediump float;\n' +
        '#endif\n' +
        'varying vec4 v_Color;\n' +
        'void main() {\n' +
        '  gl_FragColor = v_Color;\n' +
        '}\n';

    private _lights:Light[];
    private _cameras:Camera[];
    private _objectes:Geometry[];
    private _ambientColor:Vector3;
    private _directionLightColor:Vector3;
    private _directionLightDirection:Vector3;

    private _currentCamera:Camera;

    public get currentCamera():Camera
    {
        return this._cameras[0];
    }

    private gl:WebGLRenderingContext;

    public constructor()
    {
        this._lights = [];
        this._cameras = [];
        this._objectes = [];

        this._ambientColor = new Vector3(0.2, 0.2, 0.2);
        this._directionLightColor = new Vector3(1.0, 1.0, 1.0);
        this._directionLightDirection = new Vector3(0.0, 0.0, -1.0);
    }

    public addLight(light:Light):void
    {
        if (light)
        {
            this._lights.push(light);
        }
    }

    public addCamera(camera:Camera):void
    {
        if (camera)
        {
            this._cameras.push(camera);
        }
    }

    public addGeometry(geometry:Geometry):void
    {
        this._objectes.push(geometry);
    }

    public setAmbientColor(color:Vector3):void
    {
        this._ambientColor = color;
    }

    public setDirectionLight(color:Vector3, direction:Vector3):void
    {
        this._directionLightColor = color;
        this._directionLightDirection = direction;
    }

    private uMVP:WebGLUniformLocation;
    private uNormal:WebGLUniformLocation;

    private mvpMatrix:Matrix4;

    public initialize():void
    {
        this.gl = RenderContext.context;
        let init:boolean = initShaders(this.gl, this.VSHADER_SOURCE, this.FSHADER_SOURCE);
        if (!init){
            console.log('shader init failed.');
            return;
        }
        this.mvpMatrix = new Matrix4();
    }

    public draw():void
    {
        let gl:WebGLRenderingContext = this.gl;
        gl.viewport(0,0,RenderContext.viewportWidth, RenderContext.viewportHeight);
        // Set the clear color and enable the depth test
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        // Clear color and depth buffer
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // Draw the cube

        for (let geo of this._objectes)
        {
            this.uMVP = gl.getUniformLocation(gl['program'], 'mvpMatrix');
            this.uNormal = gl.getUniformLocation(gl['program'], 'u_NormalMatrix');

            if (!this.uMVP || !this.uNormal) {
                console.log('Failed to get the storage location of mvpMatrix');
            }

            this.mvpMatrix.identity();
            this.mvpMatrix.copy((<PerspectiveCamera>(this.currentCamera)).perpectiveMatrix);
            this.mvpMatrix.multiply(this.currentCamera.viewMatrix);
            this.mvpMatrix.multiply(geo.transformMatrix);
            gl.uniformMatrix4fv(this.uMVP, false, this.mvpMatrix.elements);

            let normalM:Matrix4 = new Matrix4();
            normalM.getInverse(geo.transformMatrix, true);
            normalM.transpose();
            gl.uniformMatrix4fv(this.uNormal, false, normalM.elements);

            //光照处理
            let u_LightColor:WebGLUniformLocation = gl.getUniformLocation(gl['program'], 'u_LightColor');
            let u_LightDirection:WebGLUniformLocation = gl.getUniformLocation(gl['program'], 'u_LightDirection');
            let u_AmbientColor:WebGLUniformLocation = gl.getUniformLocation(gl['program'], 'u_AmbientLight');
            if (!u_AmbientColor || !u_LightColor || !u_LightDirection) {
                console.log('Failed to get the storage location');
                return;
            }

            // Set the light color (white)
            gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
            gl.uniform3f(u_AmbientColor, 0.2, 0.2, 0.2);
            // Set the light direction (in the world coordinate)
            let lightDirection:Vector3 = new Vector3(0.5, 3.0, 4.0);
            lightDirection.normalize();     // Normalize
            gl.uniform3fv(u_LightDirection, lightDirection.elements);

            gl.drawElements(gl.TRIANGLES, geo.indices.length, gl.UNSIGNED_BYTE, 0);
        }
    }
}