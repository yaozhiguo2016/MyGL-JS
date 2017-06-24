/// <reference path="../typings/index.d.ts" />
/**
 * Created by yaozh on 2017/5/25.
 */

import Engine from "./Engine";
import Scene3D from "./core/Scene3D";
import PerspectiveCamera from "./cameras/PerspectiveCamera";
import Cube from "./primitives/Cube";
import Vector3 from "./math/Vector3";

export default class Main
{
    private engine:Engine;
    private scene:Scene3D;

    private camera:PerspectiveCamera;
    private cube:Cube;
    private cube2:Cube;

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
        this.camera.position = new Vector3(0.0, 0, 15.0);
        this.scene.addCamera(this.camera);
        // this.camera.rotation.x = 0.2;
        this.camera.lookAt(new Vector3(0.0, 0.0, 0.0), Vector3.UP);

        this.cube = new Cube();
        this.cube.position = new Vector3(0, 0.0, -5.0);
        this.scene.addGeometry(this.cube);

        this.cube2 = new Cube();
        this.cube2.position = new Vector3(0, 0.0, -10.0);
        //this.cube.addChild(this.cube2);
        this.scene.addGeometry(this.cube2);

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

        this.cube2.translate(this.dis, Vector3.UP);
        this.cube2.rotation.x = this.rotation+=0.01;

        //this.camera.position.z += 0.02;

        this.scene.draw();
    }
}