import AssetsManager from "../managers/AssetsManager";
import AssetData from "../managers/AssetData";
import Engine from "../Engine";
import Scene3D from "../core/Scene3D";
import PerspectiveCamera from "../cameras/PerspectiveCamera";
import Mesh from "../core/Mesh";
import DirectionLight from "../lights/DirectionLight";
import PointLight from "../lights/PointLight";
import Vector3 from "../math/Vector3";
import StandardMaterial from "../materials/StandardMaterial";
import Cube from "../primitives/Cube";
import Sphere from "../primitives/Sphere";
import Plane from "../primitives/Plane";
import Teapot from "../primitives/Teapot";
import Example from "./Example";
import Texture2D from "../textures/Texture2D";
import SkyBox from "../core/SkyBox";
import CubeMapMaterial from "../materials/CubeMapMaterial";
import TextureCube from "../textures/TextureCube";
import MouseCameraHelper from "../utils/MouseCameraHelper";
import ColorHeightMap from "../primitives/ColorHeightMap";
import ObjParser from "../parsers/obj/ObjParser";
import ObjGeometry from "../parsers/obj/ObjGeometry";
import EulerAngle from "../math/EulerAngle";
/**
 * Created by yaozh on 2017/7/6.
 */
export default class ModelAndTexture extends Example
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

    private skyCube:Mesh;

    private terrain:Mesh;
    private drone:Mesh;

    public run():void
    {
        AssetsManager.getInstance().addGroup([
            new AssetData('standard_mat_bp_vshader', AssetData.TEXT, './src/shaders/standard_material/phong-f/vert.glsl'),
            new AssetData('standard_mat_bp_fshader', AssetData.TEXT, './src/shaders/standard_material/phong-f/frag.glsl'),
            new AssetData('standard_mat_bp_vshader_nt', AssetData.TEXT, './src/shaders/standard_material/phong-f/vert_no_texture.glsl'),
            new AssetData('standard_mat_bp_fshader_nt', AssetData.TEXT, './src/shaders/standard_material/phong-f/frag_no_texture.glsl'),
            new AssetData('img_earth', AssetData.IMAGE, './resource/earth.bmp'),
            new AssetData('img_earth01', AssetData.IMAGE, './resource/earth01.jpg'),
            new AssetData('img_crate', AssetData.IMAGE, './resource/crate.gif'),

            new AssetData('cube_mat_vshader', AssetData.TEXT, './src/shaders/cube_material/base/vert.glsl'),
            new AssetData('cube_mat_fshader', AssetData.TEXT, './src/shaders/cube_material/base/frag.glsl'),
            /*new AssetData('sky_n_x', AssetData.IMAGE, './resource/sky_n_x.jpg'),
            new AssetData('sky_n_y', AssetData.IMAGE, './resource/sky_n_y.jpg'),
            new AssetData('sky_n_z', AssetData.IMAGE, './resource/sky_n_z.jpg'),
            new AssetData('sky_p_x', AssetData.IMAGE, './resource/sky_p_x.jpg'),
            new AssetData('sky_p_y', AssetData.IMAGE, './resource/sky_p_y.jpg'),
            new AssetData('sky_p_z', AssetData.IMAGE, './resource/sky_p_z.jpg'),

            new AssetData('cloudy_noon_nx', AssetData.IMAGE, './resource/cloudy_noon_nx.jpg'),
            new AssetData('cloudy_noon_ny', AssetData.IMAGE, './resource/cloudy_noon_ny.jpg'),
            new AssetData('cloudy_noon_nz', AssetData.IMAGE, './resource/cloudy_noon_nz.jpg'),
            new AssetData('cloudy_noon_px', AssetData.IMAGE, './resource/cloudy_noon_px.jpg'),
            new AssetData('cloudy_noon_py', AssetData.IMAGE, './resource/cloudy_noon_py.jpg'),
            new AssetData('cloudy_noon_pz', AssetData.IMAGE, './resource/cloudy_noon_pz.jpg'),*/

            new AssetData('land', AssetData.IMAGE, './resource/land.png'),
            new AssetData('grass', AssetData.IMAGE, './resource/grass.png'),

            new AssetData('drone', AssetData.TEXT, './resource/drone.obj')
            //new AssetData('drone_diffuse', AssetData.IMAGE, './resource/drone_diffuse_01.png')
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
        this.camera.position = new Vector3(0.0, 25, 35.0);
        this.scene.currentCamera = this.camera;
        this.camera.lookAt(new Vector3(0.0, 0.0, 0.0), Vector3.UP);
        MouseCameraHelper.attach(this.camera);

        let cubeMat:StandardMaterial = new StandardMaterial();
        cubeMat.texture = new Texture2D(AssetsManager.getInstance().getAsset('img_crate'), true);

        this.cube = new Mesh(new Cube(2.0, 2, 2), cubeMat);
        this.cube.position = new Vector3(-5, 0.0, 0.0);
        this.scene.addMesh(this.cube);

        let colorMaterial:StandardMaterial = new StandardMaterial();
        colorMaterial.emissiveColor = new Vector3(0.2, 0.2, 0.2);
        colorMaterial.diffuseColor = new Vector3(0.2, 0.2, 0.2);
        colorMaterial.specularColor = new Vector3(0.5, 0.5, 0.5);
        colorMaterial.shininess = 50;
        colorMaterial.texture = new Texture2D(AssetsManager.getInstance().getAsset('img_earth'), true);

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
        //sm2.texture = new Texture2D();
        this.pointSphere = new Mesh(new Sphere(0.2, 16, 12), sm2);
        this.pointSphere.position.x = 5;
        this.pointSphere.position.z = 5;
        this.scene.addMesh(this.pointSphere);

        let teapot:Teapot = new Teapot();
        let sm:StandardMaterial = new StandardMaterial();
        sm.emissiveColor = new Vector3(0.2, 0.2, 0.0);
        sm.texture = new Texture2D();
        this.teapot = new Mesh(teapot, sm);
        this.teapot.position.y = 4;
        this.teapot.scale = new Vector3(0.15, 0.15, 0.15);
        this.scene.addMesh(this.teapot);

        /*let cubeMate:CubeMapMaterial = new CubeMapMaterial();
        let cubeTexture:TextureCube = new TextureCube([
            AssetsManager.getInstance().getAsset('cloudy_noon_px'),
            AssetsManager.getInstance().getAsset('cloudy_noon_nx'),
            AssetsManager.getInstance().getAsset('cloudy_noon_py'),
            AssetsManager.getInstance().getAsset('cloudy_noon_ny'),
            AssetsManager.getInstance().getAsset('cloudy_noon_pz'),
            AssetsManager.getInstance().getAsset('cloudy_noon_nz')
        ]);
        cubeMate.textureCube = cubeTexture;
        let skyBox:SkyBox = new SkyBox(80, cubeMate);
        skyBox.position = this.camera.position;
        this.scene.addMesh(skyBox);*/

        let img:HTMLImageElement = AssetsManager.getInstance().getAsset('land');
        let terrainMat:StandardMaterial = new StandardMaterial();
        terrainMat.texture = new Texture2D(AssetsManager.getInstance().getAsset('grass'));
        this.terrain = new Mesh(new ColorHeightMap(img), terrainMat);
        this.terrain.position = new Vector3(0, -20, 0);
        this.scene.addMesh(this.terrain);

        let droneMat:StandardMaterial = new StandardMaterial();
        droneMat.emissiveColor = new Vector3(0.6, 0.6, 0.6);
        //droneMat.texture = new Texture2D(AssetsManager.getInstance().getAsset('drone_diffuse'));
        let objparser:ObjParser = new ObjParser(AssetsManager.getInstance().getAsset('drone'));
        this.drone = new Mesh(new ObjGeometry(objparser), droneMat);
        this.drone.position = new Vector3(-10, 8, 3);
        this.drone.rotation.x = 90;
        this.drone.scale = new Vector3(0.005, 0.005,0.005);
        this.scene.addMesh(this.drone);

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
        // this.camera.rotation.y += 0.02;

        this.pointLight.translate(0.1, Vector3.UP);
        this.pointLight.rotation.z += 0.02;

        this.pointSphere.translate(0.1, Vector3.UP);
        this.pointSphere.rotation.z += 0.02;


        this.drone.translate(-0.1, Vector3.UP);
        this.drone.rotation.z += 0.01;

        this.scene.draw();
    }
}