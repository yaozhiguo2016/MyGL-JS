/// <reference path="../typings/index.d.ts" />
/**
 * Created by yaozh on 2017/5/25.
 */

import Engine from "./Engine";
import Scene3D from "./core/Scene3D";
import Camera from "./cameras/Camera";
import PerspectiveCamera from "./cameras/PerspectiveCamera";
import Cube from "./primitives/Cube";
import Vector3 from "./math/Vector3";
import Matrix4 from "./math/Matrix4";
import Quaternion from "./math/Quaternion";

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
        // new DrawImage();
        //new GLClock();
        //new LookAtRotateTriangle();
        // new SimpleCube();
        //new ColorCube();


        this.engine = new Engine(true);
        this.engine.setRenderLoop(this.loop, this);

        this.scene = new Scene3D();
        this.scene.initialize();

        this.camera = new PerspectiveCamera();
        this.camera.pos = new Vector3(0.0, 5.0, 15.0);
        this.scene.addCamera(this.camera);

        this.cube = new Cube();
        this.cube.transformMatrix.makeTranslation(0.0, 0.0, -5.0);
        this.scene.addGeometry(this.cube);

        this.cube2 = new Cube();
        this.cube2.transformMatrix.makeTranslation(-1.5, 0.0, -20.0);
        this.scene.addGeometry(this.cube2);

        this.engine.setScene(this.scene);

        this.engine.start();
    }

    private rotation:number = 30;

    private loop():void
    {
        // this.cube.matrix.setIdentity();
        //this.cube.pos = new Vector3([1.5, 0.0, 0.0]);
        //this.cube2.transformMatrix.mu(1, 0.0, 0.0, 1.0);
        this.cube2.transformMatrix.makeRotationAxis(Vector3.FORWARD, this.rotation+=0.01);
        let q:Quaternion = new Quaternion();
        q.setFromAxisAngle(Vector3.UP, 0.02);

        let ro:Matrix4 = new Matrix4();
        //ro.makeRotationAxis(Vector3.UP, 0.02);
        ro.makeRotationFromQuaternion(q);
        this.cube.transformMatrix.premultiply(ro);
        this.camera.lookAt(new Vector3(0.0, 0.0, 0.0), Vector3.UP);
        this.scene.draw();
    }
}