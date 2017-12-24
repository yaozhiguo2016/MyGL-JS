# MyGL-JS
一个基于webgl和typescript的3D库，对WebGL的基础API做了封装，初步实现了以下功能：
* 基于树形结构的场景图管理，场景对象Object3D可以添加子对象，也可被添加到某个对象中，
  子对象转换都会依赖于父对象的坐标系，如无父对象，则依赖于世界坐标系
* 透视投影摄影机(PerspectiveCamera)，平行投影摄影机(OrthographicCamera)
* 点光源，平行光源，聚光灯光源，环境光
* 2D纹理，立方体纹理
* 天空盒
* 基础几何体：球体，立方体，Plane
* 资源管理器(AssetsManager)
* 灰度图地形
* Obj格式加载和解析
* 基于Flat，Gouraud，Phong，Blinn-Phong着色模型
* 实时阴影(正在进行)
# install
npm install
# run
gulp

#case screenshot
下图演示了场景中模型变换，平行光和点光源,高度地形图，Obj文件解析，在线浏览：
<http://works.yaozhiguo.site/mygl/>

![快照](https://github.com/yaozhiguo2016/MyGL-JS/blob/master/screenshot.png)
