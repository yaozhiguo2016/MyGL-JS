import MaterialResolver from "./MaterialResolver";
import Mesh from "../../core/Mesh";
import RenderContext from "../../RenderContext";
import Geometry from "../../primitives/Geometry";
import GLProgramLib from "../../shaders/GLProgramLib";
import ShaderUtil from "../../utils/ShaderUtil";
import AssetsManager from "../../managers/AssetsManager";
import Vector3 from "../../math/Vector3";
import StandardMaterial from "../StandardMaterial";
import Camera from "../../cameras/Camera";
import UniformUtil from "../../utils/UniformUtil";
import Vector4 from "../../math/Vector4";
import Quaternion from "../../math/Quaternion";
import Matrix4 from "../../math/Matrix4";
import Scene3D from "../../core/Scene3D";
import Light from "../../lights/Light";
/**
 * Created by yaozh on 2017/6/28.
 */
export default class StandardMaterialResolver extends MaterialResolver
{
    public constructor(mesh:Mesh, material:StandardMaterial)
    {
        super(mesh, material);
    }

    public initMeshData():void
    {
        let gl:WebGLRenderingContext = RenderContext.context;
        let mesh:Mesh = this._mesh;
        let geometry:Geometry = mesh.geometry;

        let glProgram:WebGLProgram;
        if (this._material.texture)
        {
            glProgram = GLProgramLib.getProgram(this._material.type);
            if (!glProgram)
            {
                glProgram = ShaderUtil.createProgram(gl,
                    AssetsManager.getInstance().getAsset('standard_mat_bp_vshader'),
                    AssetsManager.getInstance().getAsset('standard_mat_bp_fshader'));
                GLProgramLib.addProgram(this._material.type, glProgram);
            }
        }
        else
        {
            glProgram = GLProgramLib.getProgram(this._material.type + '_nt');
            if (!glProgram)
            {
                glProgram = ShaderUtil.createProgram(gl,
                    AssetsManager.getInstance().getAsset('standard_mat_bp_vshader_nt'),
                    AssetsManager.getInstance().getAsset('standard_mat_bp_fshader_nt'));
                GLProgramLib.addProgram(this._material.type + '_nt', glProgram);
            }
        }

        mesh.usedProgram = glProgram;
        //gl.useProgram(mesh.usedProgram);
        mesh.a_Position = gl.getAttribLocation(glProgram, 'a_Position');
        mesh.a_Normal = gl.getAttribLocation(glProgram, 'a_Normal');

        mesh.vertexBuffer = mesh.createArrayBuffer(geometry.vertexPositions);
        mesh.normalBuffer = mesh.createArrayBuffer(geometry.vertexNormals);
        if (this._material.texture)
        {
            mesh.a_UV = gl.getAttribLocation(glProgram, 'a_TexCood');
            mesh.uvBuffer = mesh.createArrayBuffer(geometry.uvs);
        }
        if (mesh.geometry.indexDraw)mesh.indexBuffer = mesh.createIndexBuffer();
    }

    public resetAttribsAndUniforms():void
    {
        let mesh:Mesh = this._mesh;
        RenderContext.context.useProgram(mesh.usedProgram);
        this.setGLStates(mesh);
        this.handleMVP(mesh);
        this.handleLights(mesh);
        this.handleMaterials(mesh);
        this.setBuffersAndAttribs();
    }

    private setGLStates(mesh:Mesh):void
    {
        UniformUtil.setProgrom(mesh.usedProgram);
        let gl:WebGLRenderingContext = RenderContext.context;
        if (mesh.surfaceSide == Mesh.SURFACE_SIDE_FRONT)
        {
            gl.enable(gl.CULL_FACE);
            gl.cullFace(gl.BACK);
        }
        else if (mesh.surfaceSide == Mesh.SURFACE_SIDE_BACK)
        {
            gl.enable(gl.CULL_FACE);
            gl.cullFace(gl.FRONT);
        }
        else
        {
            gl.disable(gl.CULL_FACE);
        }
        UniformUtil.assign1i('side', mesh.surfaceSide);
    }

    private handleMVP(mesh:Mesh):void
    {
        UniformUtil.setProgrom(mesh.usedProgram);

        let camera:Camera = mesh.scene.currentCamera;

        //Model-View-Projection
        mesh.updateWorldMatrix();
        camera.updateWorldMatrix();
        mesh.modelViewMatrix.multiplyMatrices(camera.inverseWorldMatrix, mesh.worldMatrix);

        UniformUtil.assignMatrix4fv('u_mvMatrix', false, mesh.modelViewMatrix.elements);
        UniformUtil.assignMatrix4fv('u_ProjMatrix', false, camera.projMatrix.elements);

        //法线转换
        mesh.normalMatrix.getInverse(mesh.worldMatrix, true);
        mesh.normalMatrix.transpose();

        let q:Quaternion = new Quaternion();
        camera.inverseWorldMatrix.decompose(new Vector3, q, new Vector3);
        let qm:Matrix4 = new Matrix4();
        mesh.normalMatrix.premultiply(qm.makeRotationFromQuaternion(q));

        UniformUtil.assignMatrix4fv('u_NormalMatrix', false, mesh.normalMatrix.elements);
    }

    private handleLights(mesh:Mesh):void
    {
        UniformUtil.setProgrom(mesh.usedProgram);
        //全局环境光
        let globalAmbient:Vector3 = mesh.scene.ambientColor;
        UniformUtil.assign3f('globalAmbient', globalAmbient.x, globalAmbient.y, globalAmbient.z);

        let scene:Scene3D = mesh.scene;
        let numLights:number = scene.lights.length;
        for (let i:number = 0; i < numLights; i++)
        {
            let light:Light = scene.lights[i];
            light.updateWorldMatrix();

            let pos:Vector3 = light.getWorldPosition();
            let np:Vector3 = new Vector3();
            let lightPos:Vector4;

            //对于平行光源（只有方向）而言，只考虑其从世界坐标系到视角坐标系变换的旋转分量，平移和缩放不予考虑
            if(light.type == 'DirectionLight')
            {
                let rm:Matrix4 = (new Matrix4()).extractRotation(scene.currentCamera.inverseWorldMatrix);
                np.copyFrom(pos).applyMatrix4(rm);
                lightPos = new Vector4(np.x, np.y, np.z, 0.0);
            }
            else
            {
                np.copyFrom(pos).applyMatrix4(scene.currentCamera.inverseWorldMatrix);
                lightPos = new Vector4(np.x, np.y, np.z, 1.0);
            }

            UniformUtil.assign4fv("lights[" + i + "].position", lightPos.elements);
            let lightColor:Vector3 = light.color;
            UniformUtil.assign3f("lights[" + i + "].color", lightColor.x, lightColor.y, lightColor.z);
            let intensity:Vector3 = light.intensity;
            UniformUtil.assign3f("lights[" + i + "].intensity", intensity.x, intensity.y, intensity.z);
            UniformUtil.assign1i("lights[" + i + "].enabled", light.enabled ? 1 : 0);
        }
    }

    private handleMaterials(mesh:Mesh):void
    {
        let colorMat:StandardMaterial = <StandardMaterial>(this._material);

        UniformUtil.setProgrom(mesh.usedProgram);


        let am:Vector3 = colorMat.ambientColor;
        UniformUtil.assign3f('materialAmbient', am.x, am.y, am.z);
        let dc:Vector3 = colorMat.diffuseColor;
        UniformUtil.assign3f('materialDiffuse', dc.x, dc.y, dc.z);
        let sc:Vector3 = colorMat.specularColor;
        UniformUtil.assign3f('materialSpecular', sc.x, sc.y, sc.z);
        UniformUtil.assign1f('materialShiness', colorMat.shininess);

        if (colorMat.texture)
        {
            UniformUtil.assign1i('u_sampler2d', 0);
            colorMat.texture.setTextureAttribute();
        }
        else
        {
            let em:Vector3 = colorMat.emissiveColor;
            UniformUtil.assign3f('materialEmissive', em.x, em.y, em.z);
        }
    }

    private setBuffersAndAttribs():void
    {
        let gl:WebGLRenderingContext = RenderContext.context;
        let mesh:Mesh = this._mesh;
        let geometry:Geometry = mesh.geometry;

        mesh.setBufferAttribute(mesh.vertexBuffer, mesh.a_Position, geometry.vertexPosNum, gl.FLOAT);
        mesh.setBufferAttribute(mesh.normalBuffer, mesh.a_Normal, geometry.vertexNormalNum, gl.FLOAT);
        if (this._material.texture)
        {
            mesh.setBufferAttribute(mesh.uvBuffer, mesh.a_UV, geometry.vertexUVNum, gl.FLOAT);
        }
        else
        {
            //console.log(this._material.texture, this._mesh.geometry);
        }
        if (mesh.geometry.indexDraw)gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
    }
}