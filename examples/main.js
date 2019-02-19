/**
 * Created by yaozh on 2017/12/19.
 */
function Main() {

  MyGL.AssetsManager.getInstance().addGroup([
    //new MyGL.AssetData('standard_mat_bp_vshader', MyGL.AssetData.TEXT, './src/shaders/standard_material/phong-f/vert.glsl'),
    //new MyGL.AssetData('standard_mat_bp_fshader', MyGL.AssetData.TEXT, './src/shaders/standard_material/phong-f/frag.glsl'),
    //new MyGL.AssetData('standard_mat_bp_vshader_nt', MyGL.AssetData.TEXT, './src/shaders/standard_material/phong-f/vert_no_texture.glsl'),
    //new MyGL.AssetData('standard_mat_bp_fshader_nt', MyGL.AssetData.TEXT, './src/shaders/standard_material/phong-f/frag_no_texture.glsl'),
    new MyGL.AssetData('img_earth', MyGL.AssetData.IMAGE, './resource/earth.bmp'),
    new MyGL.AssetData('img_earth01', MyGL.AssetData.IMAGE, './resource/earth01.jpg'),
    new MyGL.AssetData('img_crate', MyGL.AssetData.IMAGE, './resource/crate.gif'),

    //new MyGL.AssetData('cube_mat_vshader', MyGL.AssetData.TEXT, './src/shaders/cube_material/base/vert.glsl'),
    //new MyGL.AssetData('cube_mat_fshader', MyGL.AssetData.TEXT, './src/shaders/cube_material/base/frag.glsl'),
    /*new AssetData('sky_n_x', AssetData.IMAGE, './resource/sky_n_x.jpg'),
    new AssetData('sky_n_y', AssetData.IMAGE, './resource/sky_n_y.jpg'),
    new AssetData('sky_n_z', AssetData.IMAGE, './resource/sky_n_z.jpg'),
    new AssetData('sky_p_x', AssetData.IMAGE, './resource/sky_p_x.jpg'),
    new AssetData('sky_p_y', AssetData.IMAGE, './resource/sky_p_y.jpg'),
    new AssetData('sky_p_z', AssetData.IMAGE, './resource/sky_p_z.jpg'),*/

    new MyGL.AssetData('cloudy_noon_nx', MyGL.AssetData.IMAGE, './resource/cloudy_noon_nx.jpg'),
    new MyGL.AssetData('cloudy_noon_ny', MyGL.AssetData.IMAGE, './resource/cloudy_noon_ny.jpg'),
    new MyGL.AssetData('cloudy_noon_nz', MyGL.AssetData.IMAGE, './resource/cloudy_noon_nz.jpg'),
    new MyGL.AssetData('cloudy_noon_px', MyGL.AssetData.IMAGE, './resource/cloudy_noon_px.jpg'),
    new MyGL.AssetData('cloudy_noon_py', MyGL.AssetData.IMAGE, './resource/cloudy_noon_py.jpg'),
    new MyGL.AssetData('cloudy_noon_pz', MyGL.AssetData.IMAGE, './resource/cloudy_noon_pz.jpg'),

    new MyGL.AssetData('land', MyGL.AssetData.IMAGE, './resource/land.png'),
    new MyGL.AssetData('grass', MyGL.AssetData.IMAGE, './resource/grass.png'),

    new MyGL.AssetData('drone', MyGL.AssetData.TEXT, './resource/drone.obj')
    //new AssetData('drone_diffuse', AssetData.IMAGE, './resource/drone_diffuse_01.png')
  ]);
  MyGL.AssetsManager.getInstance().addEventListener(MyGL.AssetsManager.GROUP_LOAD_COMPLETE, this.loadComplete, this);
  MyGL.AssetsManager.getInstance().load();
}

Main.prototype.loadComplete = function (event) {
  console.log(event);
  this.engine = new MyGL.Engine(true);
  this.engine.setRenderLoop(this.loop, this);

  this.scene = new MyGL.Scene3D();
  this.scene.ambientColor = new MyGL.Vector3(1.0, 1.0, 1.0);
  //this.scene.initialize();

  //透视摄影机
  this.camera = new MyGL.PerspectiveCamera();
  this.camera.position = new MyGL.Vector3(0.0, 25, 20.0);
  this.scene.currentCamera = this.camera;
  this.camera.lookAt(new MyGL.Vector3(0.0, 0.0, 0.0), MyGL.Vector3.UP);
  MyGL.MouseCameraHelper.attach(this.camera);

  var cubeMat = new MyGL.StandardMaterial();
  //cubeMat.emissiveColor = new MyGL.Vector3(0.2, 0.2, 0.2);
  cubeMat.ambientColor = new MyGL.Vector3(0.6, 0.6, 0.6);
  cubeMat.diffuseColor = new MyGL.Vector3(0.6, 0.6, 0.6);
  cubeMat.specularColor = new MyGL.Vector3(1.0, 1.0, 1.0);
  cubeMat.texture = new MyGL.Texture2D(MyGL.AssetsManager.getInstance().getAsset('img_crate'), true);

  //立方体
  this.cube = new MyGL.Mesh(new MyGL.Cube(4, 4, 4), cubeMat);
  this.cube.position = new MyGL.Vector3(-7, 0.0, 0.0);
  this.scene.addMesh(this.cube);

  var colorMaterial = new MyGL.StandardMaterial();
  //colorMaterial.emissiveColor = new MyGL.Vector3(0.2, 0.2, 0.2);
  colorMaterial.ambientColor = new MyGL.Vector3(0.6, 0.6, 0.6);
  colorMaterial.diffuseColor = new MyGL.Vector3(0.6, 0.6, 0.6);
  colorMaterial.specularColor = new MyGL.Vector3(1.0, 1.0, 1.0);
  colorMaterial.shininess = 300;
  colorMaterial.texture = new MyGL.Texture2D(MyGL.AssetsManager.getInstance().getAsset('img_earth'), true);

  //地球
  this.sphere = new MyGL.Mesh(new MyGL.Sphere(3, 24, 24), colorMaterial);
  this.sphere.position = new MyGL.Vector3(7, 0.0, 0.0);
  //this.cube.addChild(this.cube2);
  this.scene.addMesh(this.sphere);

  //平面
  this.plane = new MyGL.Mesh(new MyGL.Plane(6, 4), colorMaterial);
  this.plane.position = new MyGL.Vector3(0, 0, 0);
  this.plane.rotation.x = 0.6;
  this.scene.addMesh(this.plane);
  this.plane.surfaceSide = MyGL.Mesh.SURFACE_SIDE_DOUBLE;

  //平行光源
  this.directionLight = new MyGL.DirectionalLight();
  this.directionLight.color = new MyGL.Vector3(1.0, 1.0, 1.0);
  this.directionLight.position = new MyGL.Vector3(0, 0, 1);
  this.scene.addLight(this.directionLight);

  //点光源
  this.pointLight = new MyGL.PointLight();
  this.scene.addLight(this.pointLight);
  this.pointLight.color = new MyGL.Vector3(1.0, 1.0, 1.0);
  this.pointLight.intensity = 1.0;
  this.pointLight.position.x = 5;
  this.pointLight.position.z = 5;

  // 聚光灯
  this.spotLight = new MyGL.SpotLight(new MyGL.Vector3(6.0, -1.0, -1.0), Math.cos(Math.PI / 180));
  this.spotLight.color = new MyGL.Vector3(1.0, 1.0, 1.0);
  this.spotLight.position = new MyGL.Vector3(0, 25, 20);
  this.scene.addLight(this.spotLight);

  var sm2 = new MyGL.StandardMaterial();
  sm2.emissiveColor = new MyGL.Vector3(0.6, 0.1, 0.1);
  //sm2.texture = new MyGL.Texture2D();
  this.pointSphere = new MyGL.Mesh(new MyGL.Sphere(0.2, 16, 12), sm2);
  this.pointSphere.position.x = 5;
  this.pointSphere.position.z = 5;
  this.scene.addMesh(this.pointSphere);

  //茶壶
  var teapot = new MyGL.Teapot();
  var sm = new MyGL.StandardMaterial();
  //sm.emissiveColor = new MyGL.Vector3(0.2, 0.2, 0.0);
  sm.texture = new MyGL.Texture2D();
  this.teapot = new MyGL.Mesh(teapot, sm);
  this.teapot.position.y = 4;
  this.teapot.scale = new MyGL.Vector3(0.2, 0.2, 0.2);
  this.scene.addMesh(this.teapot);

  //立方体盒子
  var cubeMate = new MyGL.CubeMapMaterial();
  var cubeTexture = new MyGL.TextureCube([
    MyGL.AssetsManager.getInstance().getAsset('cloudy_noon_px'),
    MyGL.AssetsManager.getInstance().getAsset('cloudy_noon_nx'),
    MyGL.AssetsManager.getInstance().getAsset('cloudy_noon_py'),
    MyGL.AssetsManager.getInstance().getAsset('cloudy_noon_ny'),
    MyGL.AssetsManager.getInstance().getAsset('cloudy_noon_pz'),
    MyGL.AssetsManager.getInstance().getAsset('cloudy_noon_nz')
  ]);
  cubeMate.textureCube = cubeTexture;
  //var skyBox = new MyGL.SkyBox(80, cubeMate);
  //skyBox.position = this.camera.position;
  //this.scene.addMesh(skyBox);

  var img = MyGL.AssetsManager.getInstance().getAsset('land');
  var terrainMat = new MyGL.StandardMaterial();
  //terrainMat.emissiveColor = new MyGL.Vector3(0.2, 0.2, 0.2);
  terrainMat.ambientColor = new MyGL.Vector3(0.6, 0.6, 0.6);
  terrainMat.diffuseColor = new MyGL.Vector3(0.6, 0.6, 0.6);
  terrainMat.specularColor = new MyGL.Vector3(1.0, 1.0, 1.0);
  terrainMat.texture = new MyGL.Texture2D(MyGL.AssetsManager.getInstance().getAsset('grass'));
  this.terrain = new MyGL.Mesh(new MyGL.ColorHeightMap(img), terrainMat);
  this.terrain.position = new MyGL.Vector3(0, -20, 0);
  this.scene.addMesh(this.terrain);

  var droneMat = new MyGL.StandardMaterial();
  //droneMat.emissiveColor = new MyGL.Vector3(0.2, 0.2, 0.2);
  //droneMat.texture = new Texture2D(AssetsManager.getInstance().getAsset('drone_diffuse'));
  //加载Obj格式无人机模型
  var objparser = new MyGL.ObjParser(MyGL.AssetsManager.getInstance().getAsset('drone'));
  this.drone = new MyGL.Mesh(new MyGL.ObjGeometry(objparser), terrainMat);
  this.drone.position = new MyGL.Vector3(-10, 8, 3);
  this.drone.rotation.x = 90;
  this.drone.scale = new MyGL.Vector3(0.005, 0.005, 0.005);
  this.scene.addMesh(this.drone);

  this.engine.setScene(this.scene);
  this.engine.start();
};

Main.prototype.loop = function () {
  //this.cube.position.z -= 0.05;
  this.cube.rotation.x += 0.01;
  this.cube.rotation.y += 0.01;

  //this.sphere.translate(this.dis, Vector3.UP);
  this.sphere.rotation.y += 0.01;
  this.plane.rotation.x += 0.01;

  this.teapot.rotation.x += 0.01;
  this.teapot.rotation.y += 0.01;

  this.drone.translate(-0.1, MyGL.Vector3.UP);
  this.drone.rotation.z += 0.01;

  //this.camera.rotation.x += 0.02;
  // this.camera.rotation.y += 0.02;

  this.pointLight.translate(0.1, MyGL.Vector3.UP);
  this.pointLight.rotation.z += 0.02;

  this.pointSphere.translate(0.1, MyGL.Vector3.UP);
  this.pointSphere.rotation.z += 0.02;

  this.scene.draw();
};

new Main();