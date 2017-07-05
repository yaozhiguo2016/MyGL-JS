/// <reference path="../typings/index.d.ts" />
/**
 * Created by yaozh on 2017/5/25.
 */

import Engine from "./Engine";
import Scene3D from "./core/Scene3D";
import PerspectiveCamera from "./cameras/PerspectiveCamera";
import Cube from "./primitives/Cube";
import Vector3 from "./math/Vector3";
import Mesh from "./core/Mesh";
import Sphere from "./primitives/Sphere";
import Plane from "./primitives/Plane";
import StandardMaterial from "./materials/StandardMaterial";
import AssetsManager from "./managers/AssetsManager";
import AssetData from "./managers/AssetData";
import DirectionLight from "./lights/DirectionLight";
import PointLight from "./lights/PointLight";
import Teapot from "./primitives/Teapot";
import MouseCameraHelper from "./utils/MouseCameraHelper";
import Texture from "./textures/Texture";

export default class Main
{
    private engine:Engine;
    private scene:Scene3D;

    private camera:PerspectiveCamera;
    private cube:Mesh;
    private sphere:Mesh;
    private plane:Mesh;
    private teapot:Mesh;

    private directionLight:DirectionLight;
    private pointLight:PointLight;
    private pointSphere:Mesh;

    /**
     * 本方法会被自动执行。
     */
    public start():void
    {
        AssetsManager.getInstance().addGroup([
            new AssetData('standard_mat_bp_vshader', AssetData.TEXT, './src/shaders/standard_material/phong-f/vert.glsl'),
            new AssetData('standard_mat_bp_fshader', AssetData.TEXT, './src/shaders/standard_material/phong-f/frag.glsl'),
            new AssetData('standard_mat_bp_vshader_nt', AssetData.TEXT, './src/shaders/standard_material/phong-f/vert_no_texture.glsl'),
            new AssetData('standard_mat_bp_fshader_nt', AssetData.TEXT, './src/shaders/standard_material/phong-f/frag_no_texture.glsl'),
            new AssetData('img_earth', AssetData.IMAGE, './resource/earth.bmp'),
            new AssetData('img_earth01', AssetData.IMAGE, './resource/earth01.jpg')
        ]);
        AssetsManager.getInstance().addEventListener(AssetsManager.GROUP_LOAD_COMPLETE, this.loadComplete, this);
        AssetsManager.getInstance().load();
    }

    private loadComplete(event):void
    {
        this.engine = new Engine(true);
        this.engine.setRenderLoop(this.loop, this);

        this.scene = new Scene3D();
        //this.scene.ambientColor = new Vector3(0, 0,0);
        //this.scene.initialize();

        this.camera = new PerspectiveCamera();
        this.camera.position = new Vector3(0.0, 0, 20.0);
        this.scene.currentCamera = this.camera;
        this.camera.lookAt(new Vector3(0.0, 0.0, 0.0), Vector3.UP);
        //MouseCameraHelper.attach(this.camera);

        let colorMaterial:StandardMaterial = new StandardMaterial();
        colorMaterial.emissiveColor = new Vector3(0.2, 0.2, 0.2);
        colorMaterial.diffuseColor = new Vector3(0.2, 0.2, 0.2);
        colorMaterial.specularColor = new Vector3(0.5, 0.5, 0.5);
        colorMaterial.shininess = 50;
        colorMaterial.texture = new Texture(AssetsManager.getInstance().getAsset('img_earth'), true);

        this.cube = new Mesh(new Cube(2.0, 2, 2), colorMaterial);
        this.cube.position = new Vector3(-5, 0.0, 0.0);
        this.scene.addMesh(this.cube);

        this.sphere = new Mesh(new Sphere(2, 16, 12),colorMaterial);
        this.sphere.position = new Vector3(5, 0.0, 0.0);
        //this.cube.addChild(this.cube2);
        this.scene.addMesh(this.sphere);

        this.plane = new Mesh(new Plane(6, 4),colorMaterial);
        this.plane.position = new Vector3(0, 0, 0);
        this.plane.rotation.x = 0.6;
        this.scene.addMesh(this.plane);
        this.plane.surfaceSide = Mesh.SURFACE_SIDE_DOUBLE;

        this.directionLight = new DirectionLight();
        this.directionLight.color = new Vector3(0.4, 0.0, 0.0);
        this.directionLight.position = new Vector3(0, 0, 1);
        this.scene.addLight(this.directionLight);

        this.pointLight = new PointLight();
        this.scene.addLight(this.pointLight);
        this.pointLight.color = new Vector3(0.6, 0.6, 0.6);
        this.pointLight.intensity = new Vector3(1.0, 1.0, 1.0);
        this.pointLight.position.x = 5;
        this.pointLight.position.z = 5;

        let sm2:StandardMaterial = new StandardMaterial();
        sm2.emissiveColor = new Vector3(0.6, 0.6, 0.6);
        //sm2.texture = new Texture();
        this.pointSphere = new Mesh(new Sphere(0.2, 16, 12), sm2);
        this.pointSphere.position.x = 5;
        this.pointSphere.position.z = 5;
        this.scene.addMesh(this.pointSphere);

        let teapot:Teapot = new Teapot();
        let sm:StandardMaterial = new StandardMaterial();
        sm.emissiveColor = new Vector3(0.2, 0.2, 0.0);
        sm.texture = new Texture();
        this.teapot = new Mesh(teapot, sm);
        this.teapot.position.y = 4;
        this.teapot.scale = new Vector3(0.15, 0.15, 0.15);
        this.scene.addMesh(this.teapot);

        this.engine.setScene(this.scene);

        this.engine.start();
    }

    private rotation:number = 30;
    private dis:number = 0.15;

    private loop():void
    {
        //this.cube.position.z -= 0.05;
        this.cube.rotation.x +=0.01;
        this.cube.rotation.y +=0.01;

        //this.sphere.translate(this.dis, Vector3.UP);
        this.sphere.rotation.y +=0.01;
        this.plane.rotation.x += 0.01;

        this.teapot.rotation.x += 0.01;
        this.teapot.rotation.y += 0.01;

        //this.camera.rotation.x += 0.02;

        this.pointLight.translate(0.1, Vector3.UP);
        this.pointLight.rotation.z += 0.02;

        this.pointSphere.translate(0.1, Vector3.UP);
        this.pointSphere.rotation.z += 0.02;


        this.scene.draw();
    }
}