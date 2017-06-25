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

export default class Main
{
    private engine:Engine;
    private scene:Scene3D;

    private camera:PerspectiveCamera;
    private cube:Mesh;
    private sphere:Mesh;
    private plane:Mesh;

    /**
     * 本方法会被自动执行。
     */
    public start():void
    {
        this.engine = new Engine(true);
        this.engine.setRenderLoop(this.loop, this);

        this.scene = new Scene3D();
        this.scene.initialize();

        this.camera = new PerspectiveCamera();
        this.camera.position = new Vector3(0.0, 0, 20.0);
        this.scene.addCamera(this.camera);
        // this.camera.rotation.x = 0.2;
        this.camera.lookAt(new Vector3(0.0, 0.0, 0.0), Vector3.UP);

        this.cube = new Mesh(new Cube());
        this.cube.position = new Vector3(-5, 0.0, 0.0);
        this.scene.addMesh(this.cube);

        this.sphere = new Mesh(new Sphere(2, 16, 12));
        this.sphere.position = new Vector3(5, 0.0, 0.0);
        //this.cube.addChild(this.cube2);
        this.scene.addMesh(this.sphere);

        this.plane = new Mesh(new Plane(6, 6));
        this.plane.position = new Vector3(0, 0, 0);
        this.plane.rotation.x = 0.6;
        this.scene.addMesh(this.plane);

        this.engine.setScene(this.scene);

        this.engine.start();
    }

    private rotation:number = 30;
    private dis:number = 0.15;

    private loop():void
    {
        //this.cube.position.z -= 0.05;
        this.cube.rotation.x = this.rotation+=0.01;
        this.cube.rotation.y = this.rotation+=0.01;

        //this.sphere.translate(this.dis, Vector3.UP);
        this.sphere.rotation.y = this.rotation+=0.01;

        // this.camera.rotation.y += 0.02;

        this.scene.draw();
    }
}