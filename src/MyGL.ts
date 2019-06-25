/**
 * Created by yaozh on 2017/12/18.
 */
import Engine from './Engine';
import RenderContext from './RenderContext';
import BaseEvent from './base/BaseEvent';
import EventDispatcher from './base/EventDispatcher';
import Camera from './cameras/Camera';
import OrthographicCamera from './cameras/OrthographicCamera';
import PerspectiveCamera from './cameras/PerspectiveCamera';
import Mesh from './core/Mesh';
import Object3D from './core/Object3D';
import Scene3D from './core/Scene3D';
import SkyBox from './core/SkyBox';
import LoadProgressEvent from './events/LoaderProgressEvent';
import DirectionalLight from './lights/DirectionalLight';
import Light from './lights/Light';
import PointLight from './lights/PointLight';
import SpotLight from './lights/SpotLight';
import HttpRequest from './loaders/HttpRequest';
import ImageLoader from './loaders/ImageLoader';
import ShaderLoader from './loaders/ShaderLoader';
import TextFileLoader from './loaders/TextFileLoader';

import AssetData from './managers/AssetData';
import AssetsManager from './managers/AssetsManager';
import CubeMapMaterialResolver from "./materials/materialresolvers/CubeMapMaterialResolver";
import MaterialResolver from "./materials/materialresolvers/MaterialResolver";
import ResolverGenerator from "./materials/materialresolvers/ResolverGenerator";
import StandardMaterialResolver from "./materials/materialresolvers/StandardMaterialResolver";
import CubeMapMaterial from "./materials/CubeMapMaterial";
import Material from "./materials/Material";
import ShaderMaterial from "./materials/ShaderMaterial";
import StandardMaterial from "./materials/StandardMaterial";
import EulerAngle from "./math/EulerAngle";
import MathEx from "./math/MathEx";
import Matrix3 from "./math/Matrix3";
import Matrix4 from "./math/Matrix4";
import Quaternion from "./math/Quaternion";
import Vector3 from "./math/Vector3";
import Vector4 from "./math/Vector4";
import ObjGeometry from "./parsers/obj/ObjGeometry";
import ObjParser from "./parsers/obj/ObjParser";
import ColorHeightMap from "./primitives/ColorHeightMap";
import Cube from "./primitives/Cube";
import Geometry from "./primitives/Geometry";
import Plane from "./primitives/Plane";
import Sphere from "./primitives/Sphere";
import Teapot from "./primitives/Teapot";
import Texture from "./textures/Texture";
import Texture2D from "./textures/Texture2D";
import TextureCube from "./textures/TextureCube";
import TextureVideo from "./textures/TextureVideo";
import MouseCameraHelper from "./utils/MouseCameraHelper";
import ShaderUtil from "./utils/ShaderUtil";
import UniformUtil from "./utils/ShaderHelper";
import ShaderLib from './utils/ShaderSourceLib';
import Constant from "./enum/Constant";
import WebGLRenderer from './core/WebGLRender';

let MyGL = {
  Engine,
  RenderContext,
  BaseEvent,
  EventDispatcher,
  Camera,
  OrthographicCamera,
  PerspectiveCamera,
  Mesh,
  Object3D,
  Scene3D,
  SkyBox,
  LoadProgressEvent,
  DirectionalLight,
  Light,
  PointLight,
  SpotLight,
  HttpRequest,
  ImageLoader,
  ShaderLoader,
  TextFileLoader,
  AssetData,
  AssetsManager,
  CubeMapMaterialResolver,
  MaterialResolver,
  ResolverGenerator,
  StandardMaterialResolver,
  CubeMapMaterial,
  Material,
  ShaderMaterial,
  StandardMaterial,
  EulerAngle,
  MathEx,
  Matrix3,
  Matrix4,
  Quaternion,
  Vector3,
  Vector4,
  ObjGeometry,
  ObjParser,
  ColorHeightMap,
  Cube,
  Geometry,
  Plane,
  Sphere,
  Teapot,
  Texture,
  Texture2D,
  TextureCube,
  TextureVideo,
  MouseCameraHelper,
  ShaderUtil,
  UniformUtil,
  ShaderLib,
  WebGLRenderer
};

(<any>Object).assign(MyGL, Constant);

export default MyGL;