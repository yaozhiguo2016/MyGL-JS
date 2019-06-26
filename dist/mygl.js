(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var RenderContext_1 = require("./RenderContext");
var Driver_1 = require("./driver/Driver");
var DriverManager_1 = require("./driver/DriverManager");
var Engine = (function () {
    function Engine(canvas, antialias) {
        this._context = RenderContext_1.default.createConext(canvas, antialias);
        console.log(this._context.getContextAttributes());
    }
    Engine.prototype.setRenderLoop = function (looper, context) {
        this._loopExecutor = {
            loopFunc: looper,
            context: context
        };
    };
    Engine.prototype.start = function () {
        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom);
        var renderDriver = new Driver_1.default('renderDriver', 60);
        DriverManager_1.default.addDriver(renderDriver.name, renderDriver);
        DriverManager_1.default.start();
        renderDriver.addTicker(this);
        renderDriver.start();
    };
    Engine.prototype.update = function () {
        this.stats.begin();
        if (this._loopExecutor) {
            this._loopExecutor.loopFunc.call(this._loopExecutor.context);
        }
        this.stats.end();
    };
    return Engine;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Engine;
},{"./RenderContext":3,"./driver/Driver":14,"./driver/DriverManager":15}],2:[function(require,module,exports){
"use strict";
/**
 * Created by yaozh on 2017/12/18.
 */
var Engine_1 = require('./Engine');
var RenderContext_1 = require('./RenderContext');
var BaseEvent_1 = require('./base/BaseEvent');
var EventDispatcher_1 = require('./base/EventDispatcher');
var Camera_1 = require('./cameras/Camera');
var OrthographicCamera_1 = require('./cameras/OrthographicCamera');
var PerspectiveCamera_1 = require('./cameras/PerspectiveCamera');
var Mesh_1 = require('./core/Mesh');
var Object3D_1 = require('./core/Object3D');
var Scene3D_1 = require('./core/Scene3D');
var SkyBox_1 = require('./core/SkyBox');
var LoaderProgressEvent_1 = require('./events/LoaderProgressEvent');
var DirectionalLight_1 = require('./lights/DirectionalLight');
var Light_1 = require('./lights/Light');
var PointLight_1 = require('./lights/PointLight');
var SpotLight_1 = require('./lights/SpotLight');
var HttpRequest_1 = require('./loaders/HttpRequest');
var ImageLoader_1 = require('./loaders/ImageLoader');
var ShaderLoader_1 = require('./loaders/ShaderLoader');
var TextFileLoader_1 = require('./loaders/TextFileLoader');
var AssetData_1 = require('./managers/AssetData');
var AssetsManager_1 = require('./managers/AssetsManager');
var CubeMapMaterial_1 = require("./materials/CubeMapMaterial");
var Material_1 = require("./materials/Material");
var ShaderMaterial_1 = require("./materials/ShaderMaterial");
var StandardMaterial_1 = require("./materials/StandardMaterial");
var EulerAngle_1 = require("./math/EulerAngle");
var MathEx_1 = require("./math/MathEx");
var Matrix3_1 = require("./math/Matrix3");
var Matrix4_1 = require("./math/Matrix4");
var Quaternion_1 = require("./math/Quaternion");
var Vector3_1 = require("./math/Vector3");
var Vector4_1 = require("./math/Vector4");
var ObjGeometry_1 = require("./parsers/obj/ObjGeometry");
var ObjParser_1 = require("./parsers/obj/ObjParser");
var ColorHeightMap_1 = require("./primitives/ColorHeightMap");
var Cube_1 = require("./primitives/Cube");
var Geometry_1 = require("./primitives/Geometry");
var Plane_1 = require("./primitives/Plane");
var Sphere_1 = require("./primitives/Sphere");
var Teapot_1 = require("./primitives/Teapot");
var Texture_1 = require("./textures/Texture");
var Texture2D_1 = require("./textures/Texture2D");
var TextureCube_1 = require("./textures/TextureCube");
var TextureVideo_1 = require("./textures/TextureVideo");
var MouseCameraHelper_1 = require("./utils/MouseCameraHelper");
var ShaderUtil_1 = require("./utils/ShaderUtil");
var ShaderHelper_1 = require("./utils/ShaderHelper");
var ShaderSourceLib_1 = require('./utils/ShaderSourceLib');
var Constant_1 = require("./enum/Constant");
var WebGLRender_1 = require('./core/WebGLRender');
var MyGL = {
    Engine: Engine_1.default,
    RenderContext: RenderContext_1.default,
    BaseEvent: BaseEvent_1.default,
    EventDispatcher: EventDispatcher_1.default,
    Camera: Camera_1.default,
    OrthographicCamera: OrthographicCamera_1.default,
    PerspectiveCamera: PerspectiveCamera_1.default,
    Mesh: Mesh_1.default,
    Object3D: Object3D_1.default,
    Scene3D: Scene3D_1.default,
    SkyBox: SkyBox_1.default,
    LoadProgressEvent: LoaderProgressEvent_1.default,
    DirectionalLight: DirectionalLight_1.default,
    Light: Light_1.default,
    PointLight: PointLight_1.default,
    SpotLight: SpotLight_1.default,
    HttpRequest: HttpRequest_1.default,
    ImageLoader: ImageLoader_1.default,
    ShaderLoader: ShaderLoader_1.default,
    TextFileLoader: TextFileLoader_1.default,
    AssetData: AssetData_1.default,
    AssetsManager: AssetsManager_1.default,
    CubeMapMaterial: CubeMapMaterial_1.default,
    Material: Material_1.default,
    ShaderMaterial: ShaderMaterial_1.default,
    StandardMaterial: StandardMaterial_1.default,
    EulerAngle: EulerAngle_1.default,
    MathEx: MathEx_1.default,
    Matrix3: Matrix3_1.default,
    Matrix4: Matrix4_1.default,
    Quaternion: Quaternion_1.default,
    Vector3: Vector3_1.default,
    Vector4: Vector4_1.default,
    ObjGeometry: ObjGeometry_1.default,
    ObjParser: ObjParser_1.default,
    ColorHeightMap: ColorHeightMap_1.default,
    Cube: Cube_1.default,
    Geometry: Geometry_1.default,
    Plane: Plane_1.default,
    Sphere: Sphere_1.default,
    Teapot: Teapot_1.default,
    Texture: Texture_1.default,
    Texture2D: Texture2D_1.default,
    TextureCube: TextureCube_1.default,
    TextureVideo: TextureVideo_1.default,
    MouseCameraHelper: MouseCameraHelper_1.default,
    ShaderUtil: ShaderUtil_1.default,
    UniformUtil: ShaderHelper_1.default,
    ShaderLib: ShaderSourceLib_1.default,
    WebGLRenderer: WebGLRender_1.default
};
Object.assign(MyGL, Constant_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MyGL;
},{"./Engine":1,"./RenderContext":3,"./base/BaseEvent":4,"./base/EventDispatcher":5,"./cameras/Camera":6,"./cameras/OrthographicCamera":7,"./cameras/PerspectiveCamera":8,"./core/Mesh":9,"./core/Object3D":10,"./core/Scene3D":11,"./core/SkyBox":12,"./core/WebGLRender":13,"./enum/Constant":16,"./events/LoaderProgressEvent":17,"./lights/DirectionalLight":19,"./lights/Light":20,"./lights/PointLight":21,"./lights/SpotLight":22,"./loaders/HttpRequest":23,"./loaders/ImageLoader":24,"./loaders/ShaderLoader":25,"./loaders/TextFileLoader":26,"./managers/AssetData":27,"./managers/AssetsManager":28,"./materials/CubeMapMaterial":29,"./materials/Material":30,"./materials/ShaderMaterial":31,"./materials/StandardMaterial":32,"./math/EulerAngle":33,"./math/MathEx":34,"./math/Matrix3":35,"./math/Matrix4":36,"./math/Quaternion":37,"./math/Vector3":38,"./math/Vector4":39,"./parsers/obj/ObjGeometry":40,"./parsers/obj/ObjParser":41,"./primitives/ColorHeightMap":42,"./primitives/Cube":43,"./primitives/Geometry":44,"./primitives/Plane":45,"./primitives/Sphere":46,"./primitives/Teapot":47,"./textures/Texture":53,"./textures/Texture2D":54,"./textures/TextureCube":55,"./textures/TextureVideo":56,"./utils/MouseCameraHelper":57,"./utils/ShaderHelper":58,"./utils/ShaderSourceLib":59,"./utils/ShaderUtil":60}],3:[function(require,module,exports){
"use strict";
/**
 * Created by yaozh on 2017/6/1.
 */
var RenderContext = (function () {
    function RenderContext() {
    }
    Object.defineProperty(RenderContext, "viewportWidth", {
        get: function () {
            return this._viewportWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderContext, "viewportHeight", {
        get: function () {
            return this._viewportHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderContext, "context", {
        get: function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderContext, "isSupportWebGL", {
        get: function () {
            var canvas = document.createElement('canvas');
            var names = ["webgl2", "webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
            var context = null;
            for (var i = 0; i < names.length; i++) {
                try {
                    var name_1 = names[i];
                    context = (canvas.getContext(name_1));
                }
                catch (e) {
                }
                if (context)
                    return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    RenderContext.createConext = function (canvas, antialias) {
        var names = ["webgl2", "webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
        var param = {
            alpha: true,
            antialias: antialias || true,
            depth: true,
            failIfMajorPerformanceCaveat: false,
            premultipliedAlpha: true,
            preserveDrawingBuffer: false,
            stencil: false
        };
        var context = null;
        for (var i = 0; i < names.length; i++) {
            try {
                var name_2 = names[i];
                context = (canvas.getContext(name_2, param));
            }
            catch (e) {
                console.log(e);
            }
            if (context) {
                console.log('NOTICE:', 'The current WebGL version is', names[i]);
                break;
            }
        }
        this._viewportWidth = canvas.width;
        this._viewportHeight = canvas.height;
        this._context = context;
        return context;
    };
    Object.defineProperty(RenderContext, "usedProgram", {
        get: function () {
            return this._usedProgram;
        },
        set: function (value) {
            this.context.useProgram(value);
            this._usedProgram = value;
        },
        enumerable: true,
        configurable: true
    });
    RenderContext._viewportWidth = 0;
    RenderContext._viewportHeight = 0;
    return RenderContext;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RenderContext;
},{}],4:[function(require,module,exports){
"use strict";
/**
 * Created by yaozh on 2017/6/1.
 */
var BaseEvent = (function () {
    function BaseEvent(type, data) {
        this.type = type;
        this.data = data;
    }
    return BaseEvent;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaseEvent;
},{}],5:[function(require,module,exports){
"use strict";
/**
 * Created by yaozh on 2017/6/1.
 */
var EventDispatcher = (function () {
    function EventDispatcher() {
        this._listeners = {};
    }
    EventDispatcher.prototype.addEventListener = function (type, listener, context) {
        var listeners = this._listeners;
        if (listeners[type] === void 0) {
            listeners[type] = [];
        }
        if (listeners[type].indexOf(listener) === -1) {
            listeners[type].push(new EventContext(listener, context));
        }
    };
    EventDispatcher.prototype.removeEventListener = function (type, listener, context) {
        var listeners = this._listeners;
        var listenerArray = listeners[type];
        if (listenerArray !== undefined) {
            for (var index in listenerArray) {
                if (listenerArray[index].listener == listener && listenerArray[index].context == context) {
                    listenerArray.splice(parseInt(index), 1);
                }
            }
        }
    };
    EventDispatcher.prototype.hasEventListener = function (type, listener) {
        return !!this.findEventContext(type, listener);
    };
    EventDispatcher.prototype.dispatch = function (event) {
        var listeners = this._listeners;
        var listenerArray = listeners[event.type];
        if (listenerArray !== void 0) {
            event.currentTarget = this;
            for (var _i = 0, listenerArray_1 = listenerArray; _i < listenerArray_1.length; _i++) {
                var context = listenerArray_1[_i];
                context.listener.call(context.context || this, event);
            }
        }
    };
    EventDispatcher.prototype.findEventContext = function (eventType, listener) {
        var listeners = this._listeners;
        var listenerArray = listeners[eventType];
        if (listenerArray !== undefined) {
            for (var _i = 0, listenerArray_2 = listenerArray; _i < listenerArray_2.length; _i++) {
                var context = listenerArray_2[_i];
                if (context.listener == listener) {
                    return context;
                }
            }
        }
        return null;
    };
    return EventDispatcher;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventDispatcher;
var EventContext = (function () {
    function EventContext(listener, context) {
        this.listener = listener;
        this.context = context;
    }
    return EventContext;
}());
},{}],6:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Object3D_1 = require("../core/Object3D");
var Matrix4_1 = require("../math/Matrix4");
var Vector3_1 = require("../math/Vector3");
/**
 * Created by yaozh on 2017/6/6.
 */
var Camera = (function (_super) {
    __extends(Camera, _super);
    function Camera() {
        _super.call(this);
        this._projMatrix = new Matrix4_1.default();
        this._inverseMatrix = new Matrix4_1.default();
        this._type = 'Camera';
    }
    Object.defineProperty(Camera.prototype, "projMatrix", {
        get: function () {
            return this._projMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Camera.prototype.lookAt = function (targetPos, upVec3) {
        var lookAtMatrix = new Matrix4_1.default();
        lookAtMatrix.lookAt(this.position, targetPos, upVec3);
        this._quaternion.setFromRotationMatrix(lookAtMatrix);
    };
    Object.defineProperty(Camera.prototype, "inverseWorldMatrix", {
        /**
         * 这个世界坐标系的逆矩阵反映了摄影机的世界变换的逆操作，让场景的顶点执行此操作可以转换视图到世界标架
         */
        get: function () {
            //this.updateWorldMatrix();
            return this._inverseMatrix.getInverse(this.worldMatrix, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "worldDirection", {
        get: function () {
            var dir = new Vector3_1.default(0, 0, -1);
            var quaternion = this.getWorldQuaternion();
            return dir.applyQuaternion(quaternion);
        },
        enumerable: true,
        configurable: true
    });
    return Camera;
}(Object3D_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Camera;
},{"../core/Object3D":10,"../math/Matrix4":36,"../math/Vector3":38}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Camera_1 = require("./Camera");
/**
 * Created by yaozh on 2017/6/24.
 */
var OrthographicCamera = (function (_super) {
    __extends(OrthographicCamera, _super);
    function OrthographicCamera(left, right, top, bottom, near, far) {
        _super.call(this);
        this._left = left || -0.5;
        this._right = right || 0.5;
        this._top = top || -0.5;
        this._bottom = bottom || 0.5;
        this._near = near || 0.1;
        this._far = far || 10000;
        this._projMatrix.makeOrthographic(this._left, this._right, this._top, this._bottom, this._near, this._far);
        this._type = 'OrthographicCamera';
    }
    return OrthographicCamera;
}(Camera_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OrthographicCamera;
},{"./Camera":6}],8:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Camera_1 = require("./Camera");
/**
 * Created by yaozh on 2017/6/6.
 */
var PerspectiveCamera = (function (_super) {
    __extends(PerspectiveCamera, _super);
    function PerspectiveCamera(fov, aspeact, near, far) {
        _super.call(this);
        this._fov = fov || 45;
        this._near = near || 0.1;
        this._far = far || 10000;
        this._aspeact = aspeact || 1.0;
        this._projMatrix.makePerspective(this._fov, this._aspeact, this._near, this._far);
        this._type = 'PerspectiveCamera';
    }
    return PerspectiveCamera;
}(Camera_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PerspectiveCamera;
},{"./Camera":6}],9:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Object3D_1 = require("./Object3D");
var RenderContext_1 = require("../RenderContext");
/**
 * Created by yaozh on 2017/6/14.
 */
var Mesh = (function (_super) {
    __extends(Mesh, _super);
    function Mesh(geometry, material) {
        _super.call(this);
        this.gl = RenderContext_1.default.context;
        this._geometry = geometry;
        this._material = material;
        this._surfaceSide = Mesh.SURFACE_SIDE_FRONT;
        this._castShadow = false;
        this._receiveShadow = false;
        this.createMeshBuffers();
        this._type = 'Mesh';
    }
    Mesh.prototype.createMeshBuffers = function () {
        this.vertexBuffer = this.createArrayBuffer(this.geometry.vertexPositions);
        this.normalBuffer = this.createArrayBuffer(this.geometry.vertexNormals);
        this.uvBuffer = this.createArrayBuffer(this.geometry.uvs);
        if (this.geometry.indexDraw) {
            this.indexBuffer = this.createIndexBuffer();
        }
    };
    Object.defineProperty(Mesh.prototype, "geometry", {
        get: function () {
            return this._geometry;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "material", {
        get: function () {
            return this._material;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "shader", {
        get: function () {
            return this._shader;
        },
        set: function (value) {
            this._shader = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "scene", {
        get: function () {
            return this._scene;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mesh.prototype, "surfaceSide", {
        get: function () {
            return this._surfaceSide;
        },
        set: function (value) {
            this._surfaceSide = value;
        },
        enumerable: true,
        configurable: true
    });
    Mesh.prototype.setGLState = function () {
        var gl = this.gl;
        if (this.surfaceSide == Mesh.SURFACE_SIDE_FRONT) {
            gl.enable(gl.CULL_FACE);
            gl.cullFace(gl.BACK);
        }
        else if (this.surfaceSide == Mesh.SURFACE_SIDE_BACK) {
            gl.enable(gl.CULL_FACE);
            gl.cullFace(gl.FRONT);
        }
        else {
            gl.disable(gl.CULL_FACE);
        }
    };
    Mesh.prototype.clearGLState = function () {
    };
    Mesh.prototype.createArrayBuffer = function (bufferData) {
        var buffer = this.gl.createBuffer(); // Create a buffer object
        if (!buffer) {
            console.error('Mesh::createArrayBuffer(): create the buffer object failed.');
            return null;
        }
        // Write the attribute data into the buffer object
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, bufferData, this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        return buffer;
    };
    Mesh.prototype.createIndexBuffer = function () {
        var indexBuffer = this.gl.createBuffer();
        if (!indexBuffer) {
            console.error('Mesh::createIndexBuffer(): create index buffer failed.');
            return;
        }
        // Write the indices into the buffer object
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this._geometry.indices, this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        return indexBuffer;
    };
    Mesh.prototype.setBufferAttribute = function (buffer, a_attribute, num, type) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        // Assign the buffer object to the attribute variable
        this.gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
        this.gl.enableVertexAttribArray(a_attribute);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    };
    Mesh.prototype.dispose = function () {
        this.shader = null;
        this.gl.deleteBuffer(this.vertexBuffer);
        this.gl.deleteBuffer(this.normalBuffer);
        this.gl.deleteBuffer(this.indexBuffer);
        this.gl.deleteBuffer(this.uvBuffer);
        this.gl.deleteBuffer(this.colorBuffer);
    };
    //for public properties
    Mesh.SURFACE_SIDE_FRONT = 1;
    Mesh.SURFACE_SIDE_BACK = 2;
    Mesh.SURFACE_SIDE_DOUBLE = 3;
    return Mesh;
}(Object3D_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Mesh;
},{"../RenderContext":3,"./Object3D":10}],10:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Quaternion_1 = require("../math/Quaternion");
var Matrix4_1 = require("../math/Matrix4");
var Vector3_1 = require("../math/Vector3");
var EulerAngle_1 = require("../math/EulerAngle");
var EventDispatcher_1 = require("../base/EventDispatcher");
var BaseEvent_1 = require("../base/BaseEvent");
var MathEx_1 = require("../math/MathEx");
/**
 * Created by yaozh on 2017/6/6.
 */
var Object3D = (function (_super) {
    __extends(Object3D, _super);
    function Object3D() {
        var _this = this;
        _super.call(this);
        this._visible = true;
        this._name = 'object3d';
        this._id = MathEx_1.default.generateUUID();
        this._position = new Vector3_1.default();
        this._rotation = new EulerAngle_1.default();
        this._quaternion = new Quaternion_1.default();
        this._scale = new Vector3_1.default(1, 1, 1);
        this._children = [];
        this._localMatrix = new Matrix4_1.default();
        this._worldMatrix = new Matrix4_1.default();
        this._modelViewMatrix = new Matrix4_1.default();
        this._normalMatrix = new Matrix4_1.default();
        this._rotation.onChange(function () {
            _this._quaternion.setFromEuler(_this._rotation, false);
        }, this);
        this._quaternion.onChange(function () {
            _this._rotation.setFromQuaternion(_this._quaternion, undefined, false);
        }, this);
        this._type = 'Object3D';
    }
    Object.defineProperty(Object3D.prototype, "localMatrix", {
        /**
         * 局部坐标矩阵
         */
        get: function () {
            return this._localMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "worldMatrix", {
        /**
         * 世界坐标矩阵
         */
        get: function () {
            return this._worldMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "modelViewMatrix", {
        /**
         * model-view矩阵，用来标记模型视图转换矩阵的，在draw的时候使用
         */
        get: function () {
            return this._modelViewMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "normalMatrix", {
        /**
         * 由于顶点法线是变化的，所以本矩阵用来标记法线的变化，在draw的时候使用
         */
        get: function () {
            return this._normalMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            this._visible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (value) {
            this._position = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "rotation", {
        get: function () {
            return this._rotation;
        },
        set: function (value) {
            this._rotation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "quaternion", {
        get: function () {
            return this._quaternion;
        },
        set: function (value) {
            this._quaternion = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        set: function (value) {
            this._scale = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Object3D.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 把一个矩阵运用到本对象上。矩阵会被分解成对应的位置，旋转和缩放信息，保存在本对象的数据结构中。
     * @param matrix
     */
    Object3D.prototype.doMatrix = function (matrix) {
        //注意顺序，是先作自我信息中的转换
        this._localMatrix.multiplyMatrices(matrix, this._localMatrix);
        //把转换后的组合矩阵分解到各个转换分量中
        this._localMatrix.decompose(this._position, this._quaternion, this._scale);
    };
    Object3D.prototype.addChild = function (child) {
        if (child != this) {
            if (child.parent) {
                child.parent.removeChild(child);
            }
            child._parent = this;
            child.dispatch(new BaseEvent_1.default(Object3D.ADDED));
            this.children.push(child);
        }
    };
    Object3D.prototype.removeChild = function (child) {
        var index = this.children.indexOf(child);
        if (index !== -1) {
            child._parent = null;
            child.dispatch(new BaseEvent_1.default(Object3D.REMOVED));
            this.children.splice(index, 1);
        }
    };
    /**
     * 绕某轴旋转一定弧度。
     * @param axis {Vector3}旋转轴，向量表示。
     * @param theta {number} 旋转角度，弧度表示。
     * @returns {Object3D}
     */
    Object3D.prototype.rotate = function (axis, theta) {
        var q = new Quaternion_1.default();
        q.setFromAxisAngle(axis, theta);
        this._quaternion.multiply(q);
        return this;
    };
    /**
     * 让当前对象沿着某个轴平移一段距离。
     * @param distance {number}平移距离。
     * @param axis {Vector3} 平移时沿用的轴（方向）。注意，这个方向是相对于本对象的本地坐标系。
     * @returns {Object3D}
     */
    Object3D.prototype.translate = function (distance, axis) {
        var v = new Vector3_1.default();
        v.copyFrom(axis).applyQuaternion(this._quaternion);
        this._position.add(v.multiplyScalar(distance));
        return this;
    };
    Object3D.prototype.getChildByName = function (name) {
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.name == name)
                return child;
        }
        return null;
    };
    Object3D.prototype.getChildByID = function (id) {
        for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.id == id)
                return child;
        }
        return null;
    };
    Object3D.prototype.getWorldPosition = function () {
        var result = new Vector3_1.default();
        this.updateWorldMatrix();
        return result.setFromMatrixPosition(this._worldMatrix);
    };
    Object3D.prototype.getWorldRotation = function () {
        var result = new EulerAngle_1.default();
        var quaternion = this.getWorldQuaternion();
        return result.setFromQuaternion(quaternion, this.rotation.order, false);
    };
    Object3D.prototype.getWorldScale = function () {
        var position = new Vector3_1.default();
        var quaternion = new Quaternion_1.default();
        var result = new Vector3_1.default();
        this.updateWorldMatrix();
        this._worldMatrix.decompose(position, quaternion, result);
        return result;
    };
    Object3D.prototype.getWorldQuaternion = function () {
        var position = new Vector3_1.default();
        var scale = new Vector3_1.default();
        var result = new Quaternion_1.default();
        this.updateWorldMatrix();
        this._worldMatrix.decompose(position, result, scale);
        return result;
    };
    Object3D.prototype.updateMatrix = function () {
        this._localMatrix.compose(this._position, this._quaternion, this._scale);
    };
    Object3D.prototype.updateWorldMatrix = function () {
        this.updateMatrix();
        if (!this.parent) {
            this._worldMatrix.copy(this.localMatrix);
        }
        else {
            this._worldMatrix.multiplyMatrices(this.parent._worldMatrix, this.localMatrix);
        }
        // update children
        var children = this.children;
        for (var i = 0, l = children.length; i < l; i++) {
            children[i].updateWorldMatrix();
        }
    };
    /**
     * 递归遍历所有的对象，包括自身
     * @param callback {Function | (Object3d)=>{}}
     */
    Object3D.prototype.traverse = function (callback) {
        callback(this);
        var children = this.children;
        for (var i = 0, l = children.length; i < l; i++) {
            children[i].traverse(callback);
        }
    };
    /**
     * 递归遍历所有可见对象。包括自身
     * @param callback{Function | (Object3d)=>{}}
     */
    Object3D.prototype.traverseVisible = function (callback) {
        if (!this.visible)
            return;
        callback(this);
        var children = this.children;
        for (var i = 0, l = children.length; i < l; i++) {
            children[i].traverseVisible(callback);
        }
    };
    /**
     * 递归遍历当前对象的所有父容器对象，即容器链，比如A包含B，B又包含C，则遍历C的父容器结果应该是B->A.
     * @param callback{Function | (Object3d)=>{}}
     */
    Object3D.prototype.traverseAncestors = function (callback) {
        var parent = this.parent;
        if (parent !== null) {
            callback(parent);
            parent.traverseAncestors(callback);
        }
    };
    Object3D.ADDED = 'added';
    Object3D.REMOVED = 'removed';
    return Object3D;
}(EventDispatcher_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Object3D;
},{"../base/BaseEvent":4,"../base/EventDispatcher":5,"../math/EulerAngle":33,"../math/MathEx":34,"../math/Matrix4":36,"../math/Quaternion":37,"../math/Vector3":38}],11:[function(require,module,exports){
"use strict";
var Vector3_1 = require("../math/Vector3");
/**
 * Created by yaozh on 2017/6/6.
 */
var Scene3D = (function () {
    function Scene3D() {
        this._lights = [];
        this._meshes = [];
        this._ambientColor = new Vector3_1.default(0.2, 0.2, 0.2);
    }
    Object.defineProperty(Scene3D.prototype, "currentCamera", {
        get: function () {
            return this._camera;
        },
        set: function (value) {
            this._camera = value;
        },
        enumerable: true,
        configurable: true
    });
    Scene3D.prototype.addLight = function (light) {
        if (light) {
            this._lights.push(light);
        }
    };
    Object.defineProperty(Scene3D.prototype, "lights", {
        get: function () {
            return this._lights;
        },
        enumerable: true,
        configurable: true
    });
    Scene3D.prototype.addMesh = function (mesh) {
        var _this = this;
        mesh.traverse(function (child) {
            _this._meshes.push(child);
            child['_scene'] = _this;
        });
    };
    Object.defineProperty(Scene3D.prototype, "ambientColor", {
        get: function () {
            return this._ambientColor;
        },
        set: function (color) {
            this._ambientColor = color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene3D.prototype, "meshes", {
        get: function () {
            return this._meshes;
        },
        enumerable: true,
        configurable: true
    });
    return Scene3D;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Scene3D;
},{"../math/Vector3":38}],12:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Mesh_1 = require("./Mesh");
var Cube_1 = require("../primitives/Cube");
var RenderContext_1 = require("../RenderContext");
/**
 * Created by yaozh on 2017/7/6.
 */
var SkyBox = (function (_super) {
    __extends(SkyBox, _super);
    function SkyBox(size, material) {
        _super.call(this, new Cube_1.default(size, size, size), material);
        this._type = 'SkyBox';
    }
    SkyBox.prototype.setGLState = function () {
        var gl = RenderContext_1.default.context;
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.FRONT);
    };
    SkyBox.prototype.clearGLState = function () {
        var gl = RenderContext_1.default.context;
        gl.depthFunc(gl.LESS);
        gl.disable(gl.CULL_FACE);
    };
    return SkyBox;
}(Mesh_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SkyBox;
},{"../RenderContext":3,"../primitives/Cube":43,"./Mesh":9}],13:[function(require,module,exports){
"use strict";
var RenderContext_1 = require("../RenderContext");
var ShaderFactory_1 = require("../shaders/ShaderFactory");
var Quaternion_1 = require("../math/Quaternion");
var Matrix4_1 = require("../math/Matrix4");
var Vector3_1 = require("../math/Vector3");
var Vector4_1 = require("../math/Vector4");
var WebGLRenderer = (function () {
    function WebGLRenderer() {
        this.currentCamera = null;
        this.cameraInverseMatrix = null;
        this.viewRotationMatrix = null;
    }
    WebGLRenderer.prototype.render = function (scene) {
        var gl = RenderContext_1.default.context;
        gl.viewport(0, 0, RenderContext_1.default.viewportWidth, RenderContext_1.default.viewportHeight);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        this.transformCamera(scene);
        this.transformLights(scene);
        for (var _i = 0, _a = scene.meshes; _i < _a.length; _i++) {
            var mesh = _a[_i];
            if (!mesh.visible)
                continue;
            this.update(scene, mesh, gl);
        }
    };
    WebGLRenderer.prototype.update = function (scene, mesh, gl) {
        if (!mesh.shader) {
            mesh.shader = ShaderFactory_1.default.getShader(scene, mesh);
            mesh.shader.extractAttributesAndUniforms();
        }
        gl.useProgram(mesh.shader.program);
        mesh.shader.setAttributesAndUniforms(scene, mesh, this);
        mesh.setGLState();
        if (mesh.geometry.indexDraw) {
            gl.drawElements(gl.TRIANGLES, mesh.geometry.indices.length, gl.UNSIGNED_SHORT, 0);
        }
        else {
            gl.drawArrays(gl.TRIANGLES, 0, mesh.geometry.vertexNum);
        }
        mesh.clearGLState();
    };
    WebGLRenderer.prototype.transformCamera = function (scene) {
        var camera = scene.currentCamera;
        camera.updateWorldMatrix();
        // 通过摄影机逆变换来求取视觉坐标系下物体的旋转矩阵
        var cameraInverseMatrix = camera.inverseWorldMatrix;
        var q = new Quaternion_1.default();
        cameraInverseMatrix.decompose(new Vector3_1.default(), q, new Vector3_1.default());
        var qm = new Matrix4_1.default();
        this.viewRotationMatrix = qm.makeRotationFromQuaternion(q);
        this.cameraInverseMatrix = cameraInverseMatrix;
        this.currentCamera = camera;
    };
    WebGLRenderer.prototype.transformLights = function (scene) {
        var lightObjects = [];
        var numLights = scene.lights.length;
        for (var i = 0; i < numLights; i++) {
            var light = scene.lights[i];
            if (!light.enabled)
                continue; // 关闭的光源无需渲染
            light.updateWorldMatrix();
            var pos = light.getWorldPosition();
            var np = new Vector3_1.default();
            var lightPos = void 0;
            var dir = null;
            //对于平行光源（只有方向）而言，只考虑其从世界坐标系到视角坐标系变换的旋转分量，平移和缩放不予考虑
            switch (light.type) {
                case 'DirectionalLight': {
                    var rm = (new Matrix4_1.default()).extractRotation(this.cameraInverseMatrix);
                    np.copyFrom(pos).applyMatrix4(rm);
                    lightPos = new Vector4_1.default(np.x, np.y, np.z, 0.0);
                    break;
                }
                case 'PointLight': {
                    np.copyFrom(pos).applyMatrix4(this.cameraInverseMatrix);
                    lightPos = new Vector4_1.default(np.x, np.y, np.z, 1.0);
                    break;
                }
                case 'SpotLight': {
                    var lit = light;
                    np.copyFrom(pos).applyMatrix4(this.cameraInverseMatrix);
                    dir = lit.direction.clone();
                    dir.applyMatrix4(this.cameraInverseMatrix);
                    lightPos = new Vector4_1.default(np.x, np.y, np.z, 1.0);
                    break;
                }
            }
            lightObjects.push({ lightPos: lightPos, dir: dir, light: light });
        }
        this.lightObjects = lightObjects;
    };
    return WebGLRenderer;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WebGLRenderer;
},{"../RenderContext":3,"../math/Matrix4":36,"../math/Quaternion":37,"../math/Vector3":38,"../math/Vector4":39,"../shaders/ShaderFactory":48}],14:[function(require,module,exports){
"use strict";
var Driver = (function () {
    function Driver(name, fps) {
        if (name === void 0) { name = 'defaultDriver'; }
        if (fps === void 0) { fps = 60; }
        this._tickList = [];
        this._pause = true;
        this._fps = 60;
        this._name = '';
        this._frameElapse = 1000 / 60;
        //private _lastRenderTime = 0;
        this._now = 0; // 即将执行当前帧是的时间
        this._lastTime = 0; // 执行上一帧时的时间
        this._accumulatedBumpTime = 0; //前后帧真实的时间差和理想的时间差之间的误差，用于积累补偿
        this._fps = fps;
        this._frameElapse = 1000 / fps;
        this._name = name;
    }
    Driver.prototype.start = function () {
        this._pause = false;
        //this._lastRenderTime = Date.now();
    };
    Driver.prototype.stop = function () {
        this._pause = true;
    };
    Object.defineProperty(Driver.prototype, "pause", {
        get: function () {
            return this._pause;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Driver.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Driver.prototype.addTicker = function (ticker) {
        if (this._tickList.indexOf(ticker) == -1) {
            this._tickList.push(ticker);
        }
    };
    Driver.prototype.removeTicker = function (ticker) {
        var index = this._tickList.indexOf(ticker);
        if (index != -1) {
            this._tickList.splice(index, 1);
        }
    };
    Driver.prototype.update = function (time) {
        if (this._pause)
            return;
        this._now = time;
        var elapsed = this._now - this._lastTime;
        var offset = elapsed + this._accumulatedBumpTime - this._frameElapse;
        if (offset >= 0) {
            this._lastTime = this._now;
            this._accumulatedBumpTime = offset;
            for (var _i = 0, _a = this._tickList; _i < _a.length; _i++) {
                var tick = _a[_i];
                tick.update();
            }
        }
    };
    return Driver;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Driver;
},{}],15:[function(require,module,exports){
"use strict";
var DriverManager = (function () {
    function DriverManager() {
    }
    DriverManager.addDriver = function (name, driver) {
        if (!this._drivers[name]) {
            this._drivers[name] = driver;
            driver.name = name;
        }
        else {
            console.warn('driver with name ' + name + ' has already exist.');
        }
    };
    DriverManager.removeDriver = function (name) {
        if (this._drivers[name]) {
            this._drivers[name].stop();
            delete this._drivers[name];
        }
    };
    DriverManager.getDriver = function (name) {
        return this._drivers[name];
    };
    DriverManager.getAll = function () {
        var result = [];
        for (var key in this._drivers) {
            result.push(this._drivers[key]);
        }
        return result;
    };
    DriverManager.start = function () {
        this._pause = false;
        this.tick();
    };
    DriverManager.stop = function () {
        this._pause = true;
    };
    DriverManager.tick = function () {
        if (DriverManager._pause)
            return;
        DriverManager.step();
        requestAnimationFrame(DriverManager.tick);
    };
    DriverManager.step = function () {
        for (var key in this._drivers) {
            var driver = this._drivers[key];
            if (driver.pause)
                continue;
            driver.update(performance.now());
        }
    };
    DriverManager._drivers = {};
    DriverManager._pause = false;
    return DriverManager;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DriverManager;
},{}],16:[function(require,module,exports){
/**
 * @author stanley.yzg
 * Date 2019/3/1
 * Desc:
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * shading types
     */
    FLAT_SHADING: 'flat',
    GOURAUD_SHADING: 'gouraud',
    PHONG_SHADING: 'phong',
    NEAREST: 9728,
    LINEAR: 9729,
    CLAMP_TO_EDGE: 33071,
    REPEAT: 10497,
    NEAREST_MIPMAP_NEAREST: 9984,
    LINEAR_MIPMAP_NEAREST: 9985,
    NEAREST_MIPMAP_LINEAR: 9986,
    LINEAR_MIPMAP_LINEAR: 9987
};
},{}],17:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseEvent_1 = require("../base/BaseEvent");
/**
 * Created by yaozh on 2017/6/26.
 */
var LoaderProgressEvent = (function (_super) {
    __extends(LoaderProgressEvent, _super);
    function LoaderProgressEvent(type, loaded, total, data) {
        _super.call(this, type, data);
        this.loaded = loaded;
        this.total = total;
    }
    LoaderProgressEvent.PROGRESS = 'loadProgress';
    return LoaderProgressEvent;
}(BaseEvent_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoaderProgressEvent;
},{"../base/BaseEvent":4}],18:[function(require,module,exports){
/**
 * Created by yaozh on 2017/12/19.
 */
window.MyGL = require('./MyGL').default;
},{"./MyGL":2}],19:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Light_1 = require("./Light");
/**
 * Created by yaozh on 2017/6/28.
 */
var DirectionalLight = (function (_super) {
    __extends(DirectionalLight, _super);
    function DirectionalLight(color, intensity) {
        _super.call(this, color, intensity);
        this.position.y = 1; //默认光源方向竖直向下
        this._type = 'DirectionalLight';
    }
    return DirectionalLight;
}(Light_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DirectionalLight;
},{"./Light":20}],20:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Object3D_1 = require("../core/Object3D");
var Vector3_1 = require("../math/Vector3");
/**
 * Created by yaozh on 2017/6/6.
 */
var Light = (function (_super) {
    __extends(Light, _super);
    function Light(color, intensity) {
        _super.call(this);
        this._color = color || new Vector3_1.default(1.0, 1.0, 1.0);
        this._intensity = intensity || 1.0;
        this._enabled = true;
        this._type = 'Light';
    }
    Object.defineProperty(Light.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Light.prototype, "intensity", {
        get: function () {
            return this._intensity;
        },
        set: function (value) {
            this._intensity = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Light.prototype, "enabled", {
        get: function () {
            return this._enabled;
        },
        set: function (value) {
            this._enabled = value;
        },
        enumerable: true,
        configurable: true
    });
    return Light;
}(Object3D_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Light;
},{"../core/Object3D":10,"../math/Vector3":38}],21:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Light_1 = require("./Light");
/**
 * Created by yaozh on 2017/6/6.
 * 点光源，描述了这样一种特性：拥有位置属性，自发从位置点向四周发射光线，光线会衰减，衰减系数为attenuate，值越大，衰减越快。
 */
var PointLight = (function (_super) {
    __extends(PointLight, _super);
    function PointLight(scope, attenuate, color, intensity) {
        _super.call(this, color, intensity);
        this._scope = scope || 100;
        this._attenuate = attenuate || 10;
        this._type = 'PointLight';
    }
    Object.defineProperty(PointLight.prototype, "scope", {
        get: function () {
            return this._scope;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointLight.prototype, "attenuate", {
        get: function () {
            return this._attenuate;
        },
        enumerable: true,
        configurable: true
    });
    return PointLight;
}(Light_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PointLight;
},{"./Light":20}],22:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PointLight_1 = require("./PointLight");
/**
 * Created by yaozh on 2017/6/28.
 */
var SpotLight = (function (_super) {
    __extends(SpotLight, _super);
    function SpotLight(direction, theta, scope, attenuate, color, intensity) {
        _super.call(this, scope, attenuate, color, intensity);
        this._direction = direction;
        this._theta = theta;
        this._type = 'SpotLight';
    }
    Object.defineProperty(SpotLight.prototype, "direction", {
        /**
         * 聚光灯的中轴线方向
         * @returns {Vector3}
         */
        get: function () {
            return this._direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpotLight.prototype, "theta", {
        /**
         * 聚光灯范围半径的夹角，弧度表示; 取值应该小于 Math.PI,否则将退化成点光源 ∈[0, Math.PI/2]
         * @returns {number}
         */
        get: function () {
            return this._theta;
        },
        enumerable: true,
        configurable: true
    });
    return SpotLight;
}(PointLight_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SpotLight;
},{"./PointLight":21}],23:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcher_1 = require("../base/EventDispatcher");
var BaseEvent_1 = require("../base/BaseEvent");
var LoaderProgressEvent_1 = require("../events/LoaderProgressEvent");
/**
 * Created by yaozh on 2017/6/26.
 */
var HttpRequest = (function (_super) {
    __extends(HttpRequest, _super);
    /**
     * @private
     */
    function HttpRequest() {
        _super.call(this);
        /**
         * @private
         */
        this._url = "";
        this._method = "";
    }
    Object.defineProperty(HttpRequest.prototype, "response", {
        /**
         * @private
         * 本次请求返回的数据，数据类型根据responseType设置的值确定。
         */
        get: function () {
            if (!this._xhr) {
                return null;
            }
            if (this._xhr.response != undefined) {
                return this._xhr.response;
            }
            if (this._responseType == "text") {
                return this._xhr.responseText;
            }
            if (this._responseType == "arraybuffer" && /msie 9.0/i.test(navigator.userAgent)) {
                var w = window;
                return w.convertResponseBodyToText(this._xhr["responseBody"]);
            }
            if (this._responseType == "document") {
                return this._xhr.responseXML;
            }
            /*if (this._xhr.responseXML) {
             return this._xhr.responseXML;
             }
             if (this._xhr.responseText != undefined) {
             return this._xhr.responseText;
             }*/
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HttpRequest.prototype, "responseType", {
        /**
         * @private
         * 设置返回的数据格式，请使用 HttpResponseType 里定义的枚举值。设置非法的值或不设置，都将使用HttpResponseType.TEXT。
         */
        get: function () {
            return this._responseType;
        },
        set: function (value) {
            this._responseType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HttpRequest.prototype, "withCredentials", {
        /**
         * @private
         * 表明在进行跨站(cross-site)的访问控制(Access-Control)请求时，是否使用认证信息(例如cookie或授权的header)。 默认为 false。(这个标志不会影响同站的请求)
         */
        get: function () {
            return this._withCredentials;
        },
        set: function (value) {
            this._withCredentials = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     *
     * @returns
     */
    HttpRequest.prototype.getXHR = function () {
        if (window["XMLHttpRequest"]) {
            return new window["XMLHttpRequest"]();
        }
        else {
            return new ActiveXObject("MSXML2.XMLHTTP");
        }
    };
    /**
     * @private
     * 初始化一个请求.注意，若在已经发出请求的对象上调用此方法，相当于立即调用abort().
     * @param url 该请求所要访问的URL该请求所要访问的URL
     * @param method 请求所使用的HTTP方法， 请使用 HttpMethod 定义的枚举值.
     */
    HttpRequest.prototype.open = function (url, method) {
        if (method === void 0) { method = "GET"; }
        this._url = url;
        this._method = method;
        if (this._xhr) {
            this._xhr.abort();
            this._xhr = null;
        }
        this._xhr = this.getXHR(); //new XMLHttpRequest();
        this._xhr.onreadystatechange = this.onReadyStateChange.bind(this);
        this._xhr.onprogress = this.updateProgress.bind(this);
        this._xhr.open(this._method, this._url, true);
    };
    /**
     * @private
     * 发送请求.
     * @param data 需要发送的数据
     */
    HttpRequest.prototype.send = function (data) {
        if (this._responseType != null) {
            this._xhr.responseType = this._responseType;
        }
        if (this._withCredentials != null) {
            this._xhr.withCredentials = this._withCredentials;
        }
        if (this.headerObj) {
            for (var key in this.headerObj) {
                this._xhr.setRequestHeader(key, this.headerObj[key]);
            }
        }
        this._xhr.send(data);
    };
    /**
     * @private
     * 如果请求已经被发送,则立刻中止请求.
     */
    HttpRequest.prototype.abort = function () {
        if (this._xhr) {
            this._xhr.abort();
        }
    };
    /**
     * @private
     * 返回所有响应头信息(响应头名和值), 如果响应头还没接受,则返回"".
     */
    HttpRequest.prototype.getAllResponseHeaders = function () {
        if (!this._xhr) {
            return null;
        }
        var result = this._xhr.getAllResponseHeaders();
        return result ? result : "";
    };
    /**
     * @private
     * 给指定的HTTP请求头赋值.在这之前,您必须确认已经调用 open() 方法打开了一个url.
     * @param header 将要被赋值的请求头名称.
     * @param value 给指定的请求头赋的值.
     */
    HttpRequest.prototype.setRequestHeader = function (header, value) {
        if (!this.headerObj) {
            this.headerObj = {};
        }
        this.headerObj[header] = value;
    };
    /**
     * @private
     * 返回指定的响应头的值, 如果响应头还没被接受,或该响应头不存在,则返回"".
     * @param header 要返回的响应头名称
     */
    HttpRequest.prototype.getResponseHeader = function (header) {
        if (!this._xhr) {
            return null;
        }
        var result = this._xhr.getResponseHeader(header);
        return result ? result : "";
    };
    /**
     * @private
     */
    HttpRequest.prototype.onReadyStateChange = function () {
        var _this = this;
        var xhr = this._xhr;
        if (xhr.readyState == 4) {
            var ioError_1 = (xhr.status >= 400 || xhr.status == 0);
            window.setTimeout(function () {
                if (ioError_1) {
                    _this.dispatch(new BaseEvent_1.default('IO_ERROR', 'ioError'));
                }
                else {
                    _this.dispatch(new BaseEvent_1.default('COMPLETE', 'ioError'));
                }
            }, 0);
        }
    };
    /**
     * @private
     */
    HttpRequest.prototype.updateProgress = function (event) {
        if (event.lengthComputable) {
            this.dispatch(new LoaderProgressEvent_1.default(LoaderProgressEvent_1.default.PROGRESS, event.loaded, event.total));
        }
    };
    return HttpRequest;
}(EventDispatcher_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HttpRequest;
},{"../base/BaseEvent":4,"../base/EventDispatcher":5,"../events/LoaderProgressEvent":17}],24:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcher_1 = require("../base/EventDispatcher");
var HttpRequest_1 = require("./HttpRequest");
var BaseEvent_1 = require("../base/BaseEvent");
/**
 * Created by yaozh on 2017/6/26.
 */
var winURL = window["URL"] || window["webkitURL"];
var ImageLoader = (function (_super) {
    __extends(ImageLoader, _super);
    function ImageLoader() {
        _super.call(this);
        /**
         * @private
         * 使用 load() 方法加载成功的 BitmapData 图像数据。
         */
        //public data:BitmapData = null;
        this.image = null;
        /**
         * @private
         * 当从其他站点加载一个图片时，指定是否启用跨域资源共享(CORS)，默认值为null。
         * 可以设置为"anonymous","use-credentials"或null,设置为其他值将等同于"anonymous"。
         */
        this._crossOrigin = null;
        /**
         * @private
         * 标记crossOrigin有没有被设置过,设置过之后使用设置的属性
         */
        this._hasCrossOriginSet = false;
        /**
         * @private
         */
        this.currentImage = null;
        /**
         * @private
         */
        this.request = null;
    }
    Object.defineProperty(ImageLoader.prototype, "crossOrigin", {
        get: function () {
            return this._crossOrigin;
        },
        set: function (value) {
            this._hasCrossOriginSet = true;
            this._crossOrigin = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * 启动一次图像加载。注意：若之前已经调用过加载请求，重新调用 load() 将终止先前的请求，并开始新的加载。
     * @param url 要加载的图像文件的地址。
     */
    ImageLoader.prototype.load = function (url) {
        if (this.blobSupport()
            && url.indexOf("wxLocalResource:") != 0 //微信专用不能使用 blob
            && url.indexOf("data:") != 0
            && url.indexOf("http:") != 0
            && url.indexOf("https:") != 0) {
            var request = this.request;
            if (!request) {
                request = this.request = new HttpRequest_1.default();
                request.addEventListener('COMPLETE', this.onBlobLoaded, this);
                request.addEventListener('IO_ERROR', this.onBlobError, this);
                request.responseType = "blob";
            }
            request.open(url);
            request.send();
        }
        else {
            this.loadImage(url);
        }
    };
    /**
     * @private
     */
    ImageLoader.prototype.onBlobLoaded = function (event) {
        var blob = this.request.response;
        this.loadImage(winURL.createObjectURL(blob));
    };
    /**
     * @private
     */
    ImageLoader.prototype.onBlobError = function (event) {
        this.dispatchIOError(this.currentURL);
    };
    /**
     * @private
     */
    ImageLoader.prototype.loadImage = function (src) {
        var image = new Image();
        //this.data = null;
        this.currentImage = image;
        if (this._hasCrossOriginSet) {
            if (this._crossOrigin) {
                image.crossOrigin = this._crossOrigin;
            }
        }
        else {
            if (ImageLoader.crossOrigin) {
                image.crossOrigin = ImageLoader.crossOrigin;
            }
        }
        /*else {
         if (image.hasAttribute("crossOrigin")) {//兼容猎豹
         image.removeAttribute("crossOrigin");
         }
         }*/
        image.onload = this.onImageComplete.bind(this);
        image.onerror = this.onLoadError.bind(this);
        image.src = src;
    };
    /**
     * @private
     */
    ImageLoader.prototype.onImageComplete = function (event) {
        var _this = this;
        var image = this.getImage(event);
        if (!image) {
            return;
        }
        //this.data = new egret.BitmapData(image);
        this.image = image;
        window.setTimeout(function () {
            _this.dispatch(new BaseEvent_1.default('COMPLETE', image));
        }, 0);
    };
    /**
     * @private
     */
    ImageLoader.prototype.onLoadError = function (event) {
        var image = this.getImage(event);
        if (!image) {
            return;
        }
        this.dispatchIOError(image.src);
    };
    ImageLoader.prototype.dispatchIOError = function (url) {
        var _this = this;
        window.setTimeout(function () {
            _this.dispatch(new BaseEvent_1.default('IO_ERROR'));
        }, 0);
    };
    /**
     * @private
     */
    ImageLoader.prototype.getImage = function (event) {
        var image = event.target;
        var url = image.src;
        if (url.indexOf("blob:") == 0) {
            try {
                winURL.revokeObjectURL(image.src);
            }
            catch (e) {
                console.warn('get blob error.');
            }
        }
        image.onerror = null;
        image.onload = null;
        if (this.currentImage !== image) {
            return null;
        }
        this.currentImage = null;
        return image;
    };
    //check blob data format support
    ImageLoader.prototype.blobSupport = function () {
        var ua = navigator.userAgent.toLowerCase();
        var ma = ua.toLowerCase().match(/cpu [^\d]*\d.*like mac os x/);
        if (!ma)
            return false;
        var value = ma[0];
        var iOSVersion = parseInt(value.match(/\d+(_\d)*/)[0]) || 0;
        return iOSVersion >= 7;
    };
    /**
     * @private
     * 指定是否启用跨域资源共享,如果ImageLoader实例有设置过crossOrigin属性将使用设置的属性
     */
    ImageLoader.crossOrigin = null;
    return ImageLoader;
}(EventDispatcher_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImageLoader;
},{"../base/BaseEvent":4,"../base/EventDispatcher":5,"./HttpRequest":23}],25:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextFileLoader_1 = require("./TextFileLoader");
var BaseEvent_1 = require("../base/BaseEvent");
var EventDispatcher_1 = require("../base/EventDispatcher");
/**
 * Created by yaozh on 2017/6/1.
 */
var ShaderLoader = (function (_super) {
    __extends(ShaderLoader, _super);
    function ShaderLoader() {
        _super.apply(this, arguments);
    }
    ShaderLoader.prototype.load = function (vert, frag) {
        var _this = this;
        var vertDone = false;
        var fragDone = false;
        this.vertLoader = new TextFileLoader_1.default();
        this.vertLoader.load(vert);
        this.fragLoader = new TextFileLoader_1.default();
        this.fragLoader.load(frag);
        this.vertLoader.addEventListener(TextFileLoader_1.default.TEXT_LOADED, function (event) {
            vertDone = true;
            if (vertDone && fragDone) {
                _this.dispatch(new BaseEvent_1.default('ShaderComplete', { vert: _this.vertLoader.text, frag: _this.fragLoader.text }));
            }
        }, this);
        this.fragLoader.addEventListener(TextFileLoader_1.default.TEXT_LOADED, function (event) {
            fragDone = true;
            if (vertDone && fragDone) {
                _this.dispatch(new BaseEvent_1.default('ShaderComplete', { vert: _this.vertLoader.text, frag: _this.fragLoader.text }));
            }
        }, this);
    };
    return ShaderLoader;
}(EventDispatcher_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ShaderLoader;
},{"../base/BaseEvent":4,"../base/EventDispatcher":5,"./TextFileLoader":26}],26:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcher_1 = require("../base/EventDispatcher");
var BaseEvent_1 = require("../base/BaseEvent");
/**
 * Created by yaozh on 2017/6/1.
 */
var TextFileLoader = (function (_super) {
    __extends(TextFileLoader, _super);
    function TextFileLoader() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(TextFileLoader.prototype, "text", {
        get: function () {
            return this._text;
        },
        enumerable: true,
        configurable: true
    });
    TextFileLoader.prototype.load = function (url) {
        var _this = this;
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === request.DONE && request.status !== 404) {
                _this._text = request.responseText;
                _this.dispatch(new BaseEvent_1.default(TextFileLoader.TEXT_LOADED, request.responseText));
            }
        };
        request.open('GET', url, true);
        request.send();
    };
    TextFileLoader.TEXT_LOADED = 'FileLoadComplete';
    return TextFileLoader;
}(EventDispatcher_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TextFileLoader;
},{"../base/BaseEvent":4,"../base/EventDispatcher":5}],27:[function(require,module,exports){
"use strict";
/**
 * Created by yaozh on 2017/6/26.
 */
var AssetData = (function () {
    function AssetData(key, type, url, version) {
        this.key = key;
        this.type = type;
        this.url = url;
        this.version = version || '1.0.0';
    }
    Object.defineProperty(AssetData.prototype, "versionUrl", {
        get: function () {
            return this.url + '?ver=' + this.version;
        },
        enumerable: true,
        configurable: true
    });
    AssetData.IMAGE = 'typeImage';
    AssetData.JSON = 'typeJson';
    AssetData.TEXT = 'typeText';
    AssetData.BIN = 'typeBinary';
    return AssetData;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AssetData;
},{}],28:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcher_1 = require("../base/EventDispatcher");
var AssetData_1 = require("./AssetData");
var BaseEvent_1 = require("../base/BaseEvent");
var ImageLoader_1 = require("../loaders/ImageLoader");
var TextFileLoader_1 = require("../loaders/TextFileLoader");
/**
 * Created by yaozh on 2017/6/26.
 */
var AssetsManager = (function (_super) {
    __extends(AssetsManager, _super);
    function AssetsManager() {
        _super.apply(this, arguments);
        this.assetsData = [];
        this._isLoading = false;
        this.assets = {};
    }
    AssetsManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new AssetsManager();
        }
        return this._instance;
    };
    AssetsManager.prototype.add = function (asset) {
        this.assetsData.push(asset);
    };
    AssetsManager.prototype.addGroup = function (assets) {
        this.assetsData = this.assetsData.concat(assets);
    };
    AssetsManager.prototype.load = function () {
        if (this.assetsData.length == 0)
            return;
        this.next();
    };
    AssetsManager.prototype.next = function () {
        var assetData = this.assetsData.shift();
        if (assetData) {
            this.loadByType(assetData.key, assetData.type, assetData.versionUrl);
        }
        else {
            this.dispatch(new BaseEvent_1.default(AssetsManager.GROUP_LOAD_COMPLETE));
        }
    };
    AssetsManager.prototype.loadByType = function (key, type, url) {
        switch (type) {
            case AssetData_1.default.IMAGE:
                {
                    this.createImageLoader(key, url);
                    break;
                }
            case AssetData_1.default.TEXT:
                {
                    this.createTextLoader(key, url);
                    break;
                }
        }
    };
    AssetsManager.prototype.createImageLoader = function (key, url) {
        var _this = this;
        var loader = new ImageLoader_1.default();
        loader.addEventListener("COMPLETE", function (event) {
            _this.assets[key] = event.data;
            _this.next();
        }, this);
        loader.addEventListener("IO_ERROR", function (event) {
            _this.next();
        }, this);
        loader.load(url);
    };
    AssetsManager.prototype.createTextLoader = function (key, url) {
        var _this = this;
        var loader = new TextFileLoader_1.default();
        loader.load(url);
        loader.addEventListener(TextFileLoader_1.default.TEXT_LOADED, function (event) {
            _this.assets[key] = event.data;
            _this.next();
        }, this);
    };
    AssetsManager.prototype.getAsset = function (key) {
        return this.assets[key];
    };
    AssetsManager.LOAD_COMPLETE = "loadComplete";
    AssetsManager.GROUP_LOAD_COMPLETE = "groupLoadComplete";
    return AssetsManager;
}(EventDispatcher_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AssetsManager;
},{"../base/BaseEvent":4,"../base/EventDispatcher":5,"../loaders/ImageLoader":24,"../loaders/TextFileLoader":26,"./AssetData":27}],29:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StandardMaterial_1 = require("./StandardMaterial");
/**
 * Created by yaozh on 2017/7/6.
 */
var CubeMapMaterial = (function (_super) {
    __extends(CubeMapMaterial, _super);
    function CubeMapMaterial() {
        _super.call(this);
        this._type = 'CubeMapMaterial';
    }
    Object.defineProperty(CubeMapMaterial.prototype, "textureCube", {
        set: function (value) {
            this._textureCube = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CubeMapMaterial.prototype, "textureCude", {
        get: function () {
            return this._textureCube;
        },
        enumerable: true,
        configurable: true
    });
    return CubeMapMaterial;
}(StandardMaterial_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CubeMapMaterial;
},{"./StandardMaterial":32}],30:[function(require,module,exports){
/**
 * Created by yaozh on 2017/6/6.
 */
"use strict";
var Material = (function () {
    function Material() {
        this._type = 'Material';
    }
    Object.defineProperty(Material.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    return Material;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Material;
},{}],31:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Material_1 = require("./Material");
/**
 * Created by yaozh on 2017/6/26.
 */
var ShaderMaterial = (function (_super) {
    __extends(ShaderMaterial, _super);
    function ShaderMaterial() {
        _super.apply(this, arguments);
    }
    return ShaderMaterial;
}(Material_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ShaderMaterial;
},{"./Material":30}],32:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Material_1 = require("./Material");
var Vector3_1 = require("../math/Vector3");
var Constant_1 = require("../enum/Constant");
/**
 * Created by yaozh on 2017/6/6.
 */
var StandardMaterial = (function (_super) {
    __extends(StandardMaterial, _super);
    function StandardMaterial() {
        _super.call(this);
        this._backCulling = true;
        this._renderMode = 'wireframe';
        this._shadingType = Constant_1.default.PHONG_SHADING; // 着色方式
        this._type = 'StandardMaterial';
        this._emissiveColor = new Vector3_1.default(0.1, 0.1, 0.1);
        this._ambientColor = new Vector3_1.default(0.3, 0.3, 0.3);
        this._diffuseColor = new Vector3_1.default(0.6, 0.6, 0.6);
        this._specularColor = new Vector3_1.default(0.6, 0.6, 0.6);
        this._shininess = 100.0;
        this._alpha = 1.0;
    }
    Object.defineProperty(StandardMaterial.prototype, "emissiveColor", {
        /**
         * 物体本身的表面颜色，即自发的光线
         * @returns {Vector3}
         */
        get: function () {
            return this._emissiveColor;
        },
        set: function (value) {
            this._emissiveColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StandardMaterial.prototype, "ambientColor", {
        /**
         * 物体的环境色
         * @returns {Vector3}
         */
        get: function () {
            return this._ambientColor;
        },
        set: function (value) {
            this._ambientColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StandardMaterial.prototype, "diffuseColor", {
        /**
         * 漫反射光
         * @returns {Vector3}
         */
        get: function () {
            return this._diffuseColor;
        },
        set: function (value) {
            this._diffuseColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StandardMaterial.prototype, "specularColor", {
        /**
         * 镜面反射光
         * @returns {Vector3}
         */
        get: function () {
            return this._specularColor;
        },
        set: function (value) {
            this._specularColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StandardMaterial.prototype, "shininess", {
        /**
         * 物体表面镜面反射的高光系数
         * @returns {number}
         */
        get: function () {
            return this._shininess;
        },
        set: function (value) {
            this._shininess = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StandardMaterial.prototype, "texture", {
        /**
         * 物体表面纹理
         * @returns {Texture}
         */
        get: function () {
            return this._texture;
        },
        set: function (value) {
            this._texture = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StandardMaterial.prototype, "alpha", {
        get: function () {
            return this._alpha;
        },
        set: function (value) {
            this._alpha = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StandardMaterial.prototype, "shadingType", {
        get: function () {
            return this._shadingType;
        },
        set: function (value) {
            this._shadingType = value;
        },
        enumerable: true,
        configurable: true
    });
    return StandardMaterial;
}(Material_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StandardMaterial;
},{"../enum/Constant":16,"../math/Vector3":38,"./Material":30}],33:[function(require,module,exports){
"use strict";
var MathEx_1 = require("./MathEx");
var Matrix4_1 = require("./Matrix4");
var Quaternion_1 = require("./Quaternion");
var Vector3_1 = require("./Vector3");
/**
 * Created by yaozh on 2017/6/11.
 */
var EulerAngle = (function () {
    function EulerAngle(x, y, z, order) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (order === void 0) { order = 'XYZ'; }
        this._x = x;
        this._y = y;
        this._z = z;
        this._order = order;
    }
    Object.defineProperty(EulerAngle.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
            this.onChangeCallback();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EulerAngle.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
            this.onChangeCallback();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EulerAngle.prototype, "z", {
        get: function () {
            return this._z;
        },
        set: function (value) {
            this._z = value;
            this.onChangeCallback();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EulerAngle.prototype, "order", {
        get: function () {
            return this._order;
        },
        set: function (value) {
            this._order = value;
            this.onChangeCallback();
        },
        enumerable: true,
        configurable: true
    });
    EulerAngle.prototype.set = function (x, y, z, order) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._order = order || this._order;
        this.onChangeCallback();
        return this;
    };
    EulerAngle.prototype.clone = function () {
        return new EulerAngle(this._x, this._y, this._z, this._order);
    };
    EulerAngle.prototype.copy = function (euler) {
        this._x = euler._x;
        this._y = euler._y;
        this._z = euler._z;
        this._order = euler._order;
        this.onChangeCallback();
        return this;
    };
    EulerAngle.prototype.setFromRotationMatrix = function (m, order, update) {
        if (update === void 0) { update = false; }
        var clamp = MathEx_1.default.clamp;
        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
        var te = m.elements;
        var m11 = te[0], m12 = te[4], m13 = te[8];
        var m21 = te[1], m22 = te[5], m23 = te[9];
        var m31 = te[2], m32 = te[6], m33 = te[10];
        order = order || this._order;
        if (order === 'XYZ') {
            this._y = Math.asin(clamp(m13, -1, 1));
            if (Math.abs(m13) < 0.99999) {
                this._x = Math.atan2(-m23, m33);
                this._z = Math.atan2(-m12, m11);
            }
            else {
                this._x = Math.atan2(m32, m22);
                this._z = 0;
            }
        }
        else if (order === 'YXZ') {
            this._x = Math.asin(-clamp(m23, -1, 1));
            if (Math.abs(m23) < 0.99999) {
                this._y = Math.atan2(m13, m33);
                this._z = Math.atan2(m21, m22);
            }
            else {
                this._y = Math.atan2(-m31, m11);
                this._z = 0;
            }
        }
        else if (order === 'ZXY') {
            this._x = Math.asin(clamp(m32, -1, 1));
            if (Math.abs(m32) < 0.99999) {
                this._y = Math.atan2(-m31, m33);
                this._z = Math.atan2(-m12, m22);
            }
            else {
                this._y = 0;
                this._z = Math.atan2(m21, m11);
            }
        }
        else if (order === 'ZYX') {
            this._y = Math.asin(-clamp(m31, -1, 1));
            if (Math.abs(m31) < 0.99999) {
                this._x = Math.atan2(m32, m33);
                this._z = Math.atan2(m21, m11);
            }
            else {
                this._x = 0;
                this._z = Math.atan2(-m12, m22);
            }
        }
        else if (order === 'YZX') {
            this._z = Math.asin(clamp(m21, -1, 1));
            if (Math.abs(m21) < 0.99999) {
                this._x = Math.atan2(-m23, m22);
                this._y = Math.atan2(-m31, m11);
            }
            else {
                this._x = 0;
                this._y = Math.atan2(m13, m33);
            }
        }
        else if (order === 'XZY') {
            this._z = Math.asin(-clamp(m12, -1, 1));
            if (Math.abs(m12) < 0.99999) {
                this._x = Math.atan2(m32, m22);
                this._y = Math.atan2(m13, m11);
            }
            else {
                this._x = Math.atan2(-m23, m33);
                this._y = 0;
            }
        }
        else {
            console.warn('THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order);
        }
        this._order = order;
        if (update !== false)
            this.onChangeCallback();
        return this;
    };
    EulerAngle.prototype.setFromQuaternion = function (q, order, update) {
        var matrix = new Matrix4_1.default();
        matrix.makeRotationFromQuaternion(q);
        return this.setFromRotationMatrix(matrix, order, update);
    };
    EulerAngle.prototype.setFromVector3 = function (v, order) {
        return this.set(v.x, v.y, v.z, order || this._order);
    };
    EulerAngle.prototype.reorder = function (newOrder) {
        // WARNING: this discards revolution information -bhouston
        var q = new Quaternion_1.default();
        q.setFromEuler(this);
        return this.setFromQuaternion(q, newOrder, false);
    };
    EulerAngle.prototype.equals = function (euler) {
        return (euler._x === this._x) && (euler._y === this._y) && (euler._z === this._z) && (euler._order === this._order);
    };
    EulerAngle.prototype.fromArray = function (array) {
        this._x = array[0];
        this._y = array[1];
        this._z = array[2];
        if (array[3] !== undefined)
            this._order = array[3];
        this.onChangeCallback();
        return this;
    };
    EulerAngle.prototype.toArray = function (array, offset) {
        if (array === undefined)
            array = [];
        if (offset === undefined)
            offset = 0;
        array[offset] = this._x;
        array[offset + 1] = this._y;
        array[offset + 2] = this._z;
        array[offset + 3] = this._order;
        return array;
    };
    EulerAngle.prototype.toVector3 = function (optionalResult) {
        if (optionalResult) {
            return optionalResult.set(this._x, this._y, this._z);
        }
        else {
            return new Vector3_1.default(this._x, this._y, this._z);
        }
    };
    EulerAngle.prototype.onChange = function (callback, context) {
        this._changeCallback = callback;
        this._changeCallbackContext = context;
        return this;
    };
    EulerAngle.prototype.onChangeCallback = function () {
        if (this._changeCallback) {
            this._changeCallback.call(this._changeCallbackContext);
        }
    };
    EulerAngle.ROTATION_ORDERS = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];
    EulerAngle.DEFAULT_ORDER = 'XYZ';
    return EulerAngle;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EulerAngle;
},{"./MathEx":34,"./Matrix4":36,"./Quaternion":37,"./Vector3":38}],34:[function(require,module,exports){
"use strict";
/**
 * Created by yaozh on 2017/6/13.
 */
var MathEx = (function () {
    function MathEx() {
    }
    MathEx.generateUUID = function () {
        // http://www.broofa.com/Tools/Math.uuid.htm
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = new Array(36);
        var rnd = 0, r;
        for (var i = 0; i < 36; i++) {
            if (i === 8 || i === 13 || i === 18 || i === 23) {
                uuid[i] = '-';
            }
            else if (i === 14) {
                uuid[i] = '4';
            }
            else {
                if (rnd <= 0x02)
                    rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }
        return uuid.join('');
    };
    MathEx.clamp = function (value, min, max) {
        return Math.max(min, Math.min(max, value));
    };
    // compute euclidian modulo of m % n
    // https://en.wikipedia.org/wiki/Modulo_operation
    MathEx.euclideanModulo = function (n, m) {
        return ((n % m) + m) % m;
    };
    // Linear mapping from range <a1, a2> to range <b1, b2>
    MathEx.mapLinear = function (x, a1, a2, b1, b2) {
        return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
    };
    // https://en.wikipedia.org/wiki/Linear_interpolation
    MathEx.lerp = function (x, y, t) {
        return (1 - t) * x + t * y;
    };
    // http://en.wikipedia.org/wiki/Smoothstep
    MathEx.smoothstep = function (x, min, max) {
        if (x <= min)
            return 0;
        if (x >= max)
            return 1;
        x = (x - min) / (max - min);
        return x * x * (3 - 2 * x);
    };
    MathEx.smootherstep = function (x, min, max) {
        if (x <= min)
            return 0;
        if (x >= max)
            return 1;
        x = (x - min) / (max - min);
        return x * x * x * (x * (x * 6 - 15) + 10);
    };
    // Random integer from <low, high> interval
    MathEx.randInt = function (low, high) {
        return low + Math.floor(Math.random() * (high - low + 1));
    };
    // Random float from <low, high> interval
    MathEx.randFloat = function (low, high) {
        return low + Math.random() * (high - low);
    };
    // Random float from <-range/2, range/2> interval
    MathEx.randFloatSpread = function (range) {
        return range * (0.5 - Math.random());
    };
    MathEx.degToRad = function (degrees) {
        return degrees * MathEx.DEG2RAD;
    };
    MathEx.radToDeg = function (radians) {
        return radians * MathEx.RAD2DEG;
    };
    MathEx.isPowerOfTwo = function (value) {
        return (value & (value - 1)) === 0 && value !== 0;
    };
    MathEx.nearestPowerOfTwo = function (value) {
        return Math.pow(2, Math.round(Math.log(value) / Math.LN2));
    };
    MathEx.nextPowerOfTwo = function (value) {
        value--;
        value |= value >> 1;
        value |= value >> 2;
        value |= value >> 4;
        value |= value >> 8;
        value |= value >> 16;
        value++;
        return value;
    };
    MathEx.DEG2RAD = Math.PI / 180;
    MathEx.RAD2DEG = 180 / Math.PI;
    return MathEx;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MathEx;
},{}],35:[function(require,module,exports){
"use strict";
/**
 * Created by yaozh on 2017/6/11.
 */
var Matrix3 = (function () {
    function Matrix3() {
    }
    return Matrix3;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Matrix3;
},{}],36:[function(require,module,exports){
/**
 * Created by yaozh on 2017/6/11.
 */
"use strict";
var Vector3_1 = require('./Vector3');
var Matrix4 = (function () {
    function Matrix4() {
        this._elements = new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }
    Object.defineProperty(Matrix4.prototype, "elements", {
        get: function () {
            return this._elements;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置矩阵的元素。WebGL采用列向量，所以第一列是[n11, n21, n31, n41], 依次类推；数组存储也按照此顺序
     * @param n11 n{row}{col}
     * @param ...
     */
    Matrix4.prototype.set = function (n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
        var te = this.elements;
        te[0] = n11;
        te[4] = n12;
        te[8] = n13;
        te[12] = n14;
        te[1] = n21;
        te[5] = n22;
        te[9] = n23;
        te[13] = n24;
        te[2] = n31;
        te[6] = n32;
        te[10] = n33;
        te[14] = n34;
        te[3] = n41;
        te[7] = n42;
        te[11] = n43;
        te[15] = n44;
        return this;
    };
    /**
     * 把当前矩阵设置为单位矩阵
     */
    Matrix4.prototype.identity = function () {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this;
    };
    Matrix4.prototype.clone = function () {
        return new Matrix4().fromArray(this.elements);
    };
    Matrix4.prototype.copy = function (m) {
        var te = this.elements;
        var me = m.elements;
        te[0] = me[0];
        te[1] = me[1];
        te[2] = me[2];
        te[3] = me[3];
        te[4] = me[4];
        te[5] = me[5];
        te[6] = me[6];
        te[7] = me[7];
        te[8] = me[8];
        te[9] = me[9];
        te[10] = me[10];
        te[11] = me[11];
        te[12] = me[12];
        te[13] = me[13];
        te[14] = me[14];
        te[15] = me[15];
        return this;
    };
    /**
     * 从目标矩阵中提取出位置信息，并赋给当前矩阵
     * @param m
     */
    Matrix4.prototype.copyPosition = function (m) {
        var te = this.elements, me = m.elements;
        te[12] = me[12];
        te[13] = me[13];
        te[14] = me[14];
        return this;
    };
    /**
     * 提取除平移外的基础信息(转换矩阵坐标系的基向量)，并存储于传入的三个向量参数
     * @param xAxis x基向量
     * @param yAxis y基向量
     * @param zAxis z基向量
     */
    Matrix4.prototype.extractBasis = function (xAxis, yAxis, zAxis) {
        xAxis.setFromMatrixColumn(this, 0);
        yAxis.setFromMatrixColumn(this, 1);
        zAxis.setFromMatrixColumn(this, 2);
        return this;
    };
    /**
     * 根据传入的三个向量参数，设置除平移外的基础信息
     * @param xAxis x基向量
     * @param yAxis y基向量
     * @param zAxis z基向量
     */
    Matrix4.prototype.makeBasis = function (xAxis, yAxis, zAxis) {
        this.set(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, 0, 0, 0, 1);
        return this;
    };
    /**
     * 从给定的矩阵中提取旋转信息，并保存于当前矩阵中。
     * @param m
     */
    Matrix4.prototype.extractRotation = function (m) {
        var v1 = new Vector3_1.default();
        var te = this.elements;
        var me = m.elements;
        var scaleX = 1 / v1.setFromMatrixColumn(m, 0).length();
        var scaleY = 1 / v1.setFromMatrixColumn(m, 1).length();
        var scaleZ = 1 / v1.setFromMatrixColumn(m, 2).length();
        te[0] = me[0] * scaleX;
        te[1] = me[1] * scaleX;
        te[2] = me[2] * scaleX;
        te[4] = me[4] * scaleY;
        te[5] = me[5] * scaleY;
        te[6] = me[6] * scaleY;
        te[8] = me[8] * scaleZ;
        te[9] = me[9] * scaleZ;
        te[10] = me[10] * scaleZ;
        return this;
    };
    /**
     * 从欧拉角中提取旋转信息，并保存于当前矩阵中。
     * @param euler
     */
    Matrix4.prototype.makeRotationFromEuler = function (euler) {
        var te = this.elements;
        var x = euler.x, y = euler.y, z = euler.z;
        var a = Math.cos(x), b = Math.sin(x);
        var c = Math.cos(y), d = Math.sin(y);
        var e = Math.cos(z), f = Math.sin(z);
        if (euler.order === 'XYZ') {
            var ae = a * e, af = a * f, be = b * e, bf = b * f;
            te[0] = c * e;
            te[4] = -c * f;
            te[8] = d;
            te[1] = af + be * d;
            te[5] = ae - bf * d;
            te[9] = -b * c;
            te[2] = bf - ae * d;
            te[6] = be + af * d;
            te[10] = a * c;
        }
        else if (euler.order === 'YXZ') {
            var ce = c * e, cf = c * f, de = d * e, df = d * f;
            te[0] = ce + df * b;
            te[4] = de * b - cf;
            te[8] = a * d;
            te[1] = a * f;
            te[5] = a * e;
            te[9] = -b;
            te[2] = cf * b - de;
            te[6] = df + ce * b;
            te[10] = a * c;
        }
        else if (euler.order === 'ZXY') {
            var ce = c * e, cf = c * f, de = d * e, df = d * f;
            te[0] = ce - df * b;
            te[4] = -a * f;
            te[8] = de + cf * b;
            te[1] = cf + de * b;
            te[5] = a * e;
            te[9] = df - ce * b;
            te[2] = -a * d;
            te[6] = b;
            te[10] = a * c;
        }
        else if (euler.order === 'ZYX') {
            var ae = a * e, af = a * f, be = b * e, bf = b * f;
            te[0] = c * e;
            te[4] = be * d - af;
            te[8] = ae * d + bf;
            te[1] = c * f;
            te[5] = bf * d + ae;
            te[9] = af * d - be;
            te[2] = -d;
            te[6] = b * c;
            te[10] = a * c;
        }
        else if (euler.order === 'YZX') {
            var ac = a * c, ad = a * d, bc = b * c, bd = b * d;
            te[0] = c * e;
            te[4] = bd - ac * f;
            te[8] = bc * f + ad;
            te[1] = f;
            te[5] = a * e;
            te[9] = -b * e;
            te[2] = -d * e;
            te[6] = ad * f + bc;
            te[10] = ac - bd * f;
        }
        else if (euler.order === 'XZY') {
            var ac = a * c, ad = a * d, bc = b * c, bd = b * d;
            te[0] = c * e;
            te[4] = -f;
            te[8] = d * e;
            te[1] = ac * f + bd;
            te[5] = a * e;
            te[9] = ad * f - bc;
            te[2] = bc * f - ad;
            te[6] = b * e;
            te[10] = bd * f + ac;
        }
        // last column
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;
        // bottom row
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;
        return this;
    };
    /**
     * 从四元数中提取旋转信息，并保存于当前矩阵中。
     * @param euler
     */
    Matrix4.prototype.makeRotationFromQuaternion = function (q) {
        var te = this.elements;
        var x = q.x, y = q.y, z = q.z, w = q.w;
        var x2 = x + x, y2 = y + y, z2 = z + z;
        var xx = x * x2, xy = x * y2, xz = x * z2;
        var yy = y * y2, yz = y * z2, zz = z * z2;
        var wx = w * x2, wy = w * y2, wz = w * z2;
        te[0] = 1 - (yy + zz);
        te[4] = xy - wz;
        te[8] = xz + wy;
        te[1] = xy + wz;
        te[5] = 1 - (xx + zz);
        te[9] = yz - wx;
        te[2] = xz - wy;
        te[6] = yz + wx;
        te[10] = 1 - (xx + yy);
        // last column
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;
        // bottom row
        te[12] = 0;
        te[13] = 0;
        te[14] = 0;
        te[15] = 1;
        return this;
    };
    /**
     * 把当前矩阵设置为一个lookAt 形式的矩阵
     * @param eye
     * @param target
     * @param up
     */
    Matrix4.prototype.makeLookAt = function (eye, target, up) {
        var eyeX = eye.elements[0];
        var eyeY = eye.elements[1];
        var eyeZ = eye.elements[2];
        var centerX = target.elements[0];
        var centerY = target.elements[1];
        var centerZ = target.elements[2];
        var upX = up.elements[0];
        var upY = up.elements[1];
        var upZ = up.elements[2];
        var e, fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz;
        fx = centerX - eyeX;
        fy = centerY - eyeY;
        fz = centerZ - eyeZ;
        // Normalize f.
        rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
        fx *= rlf;
        fy *= rlf;
        fz *= rlf;
        // Calculate cross product of f and up.
        sx = fy * upZ - fz * upY;
        sy = fz * upX - fx * upZ;
        sz = fx * upY - fy * upX;
        // Normalize s.
        rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
        sx *= rls;
        sy *= rls;
        sz *= rls;
        // Calculate cross product of s and f.
        ux = sy * fz - sz * fy;
        uy = sz * fx - sx * fz;
        uz = sx * fy - sy * fx;
        // Set to this.
        e = this.elements;
        e[0] = sx;
        e[4] = sy;
        e[8] = sz;
        e[12] = 0;
        e[1] = ux;
        e[5] = uy;
        e[9] = uz;
        e[13] = 0;
        e[2] = -fx;
        e[6] = -fy;
        e[10] = -fz;
        e[14] = 0;
        e[3] = 0;
        e[7] = 0;
        e[11] = 0;
        e[15] = 1;
        // Translate.
        var translation = new Matrix4().makeTranslation(-eyeX, -eyeY, -eyeZ);
        return this.multiply(translation);
    };
    /**
     * 将当前矩阵与一个lookAt相乘，结果保存在当前矩阵中
     * @param eye
     * @param target
     * @param up
     */
    Matrix4.prototype.lookAt = function (eye, target, up) {
        var x = new Vector3_1.default();
        var y = new Vector3_1.default();
        var z = new Vector3_1.default();
        var te = this.elements;
        z.subVectors(eye, target);
        if (z.lengthSq() === 0) {
            // eye and target are in the same position
            z.z = 1;
        }
        z.normalize();
        x.crossVectors(up, z);
        if (x.lengthSq() === 0) {
            // eye and target are in the same vertical
            z.z += 0.0001;
            x.crossVectors(up, z);
        }
        x.normalize();
        y.crossVectors(z, x);
        te[0] = x.x;
        te[4] = y.x;
        te[8] = z.x;
        te[1] = x.y;
        te[5] = y.y;
        te[9] = z.y;
        te[2] = x.z;
        te[6] = y.z;
        te[10] = z.z;
        return this;
    };
    Matrix4.prototype.multiply = function (m) {
        return this.multiplyMatrices(this, m);
    };
    Matrix4.prototype.premultiply = function (m) {
        return this.multiplyMatrices(m, this);
    };
    /**
     * 两个矩阵相乘，并把结果存储于当前矩阵中。
     * @param a
     * @param b
     */
    Matrix4.prototype.multiplyMatrices = function (a, b) {
        var ae = a.elements;
        var be = b.elements;
        var te = this.elements;
        var a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
        var a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
        var a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
        var a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];
        var b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
        var b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
        var b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
        var b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];
        te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
        te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
        te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
        te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
        return this;
    };
    Matrix4.prototype.multiplyScalar = function (s) {
        var te = this.elements;
        te[0] *= s;
        te[4] *= s;
        te[8] *= s;
        te[12] *= s;
        te[1] *= s;
        te[5] *= s;
        te[9] *= s;
        te[13] *= s;
        te[2] *= s;
        te[6] *= s;
        te[10] *= s;
        te[14] *= s;
        te[3] *= s;
        te[7] *= s;
        te[11] *= s;
        te[15] *= s;
        return this;
    };
    Matrix4.prototype.applyToBufferAttribute = function (attribute) {
        var v1 = new Vector3_1.default();
        for (var i = 0, l = attribute.count; i < l; i++) {
            v1.x = attribute.getX(i);
            v1.y = attribute.getY(i);
            v1.z = attribute.getZ(i);
            v1.applyMatrix4(this);
            attribute.setXYZ(i, v1.x, v1.y, v1.z);
        }
        return attribute;
    };
    /**
     * 求当前矩阵的行列式
     */
    Matrix4.prototype.determinant = function () {
        var te = this.elements;
        var n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
        var n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
        var n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
        var n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];
        //TODO: make this more efficient
        //( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )
        return (n41 * (+n14 * n23 * n32
            - n13 * n24 * n32
            - n14 * n22 * n33
            + n12 * n24 * n33
            + n13 * n22 * n34
            - n12 * n23 * n34) +
            n42 * (+n11 * n23 * n34
                - n11 * n24 * n33
                + n14 * n21 * n33
                - n13 * n21 * n34
                + n13 * n24 * n31
                - n14 * n23 * n31) +
            n43 * (+n11 * n24 * n32
                - n11 * n22 * n34
                - n14 * n21 * n32
                + n12 * n21 * n34
                + n14 * n22 * n31
                - n12 * n24 * n31) +
            n44 * (-n13 * n22 * n31
                - n11 * n23 * n32
                + n11 * n22 * n33
                + n13 * n21 * n32
                - n12 * n21 * n33
                + n12 * n23 * n31));
    };
    /**
     * 转置当前矩阵
     */
    Matrix4.prototype.transpose = function () {
        var te = this.elements;
        var tmp;
        tmp = te[1];
        te[1] = te[4];
        te[4] = tmp;
        tmp = te[2];
        te[2] = te[8];
        te[8] = tmp;
        tmp = te[6];
        te[6] = te[9];
        te[9] = tmp;
        tmp = te[3];
        te[3] = te[12];
        te[12] = tmp;
        tmp = te[7];
        te[7] = te[13];
        te[13] = tmp;
        tmp = te[11];
        te[11] = te[14];
        te[14] = tmp;
        return this;
    };
    /**
     * 向当前矩阵中注入位置信息
     * @param v
     */
    Matrix4.prototype.setPosition = function (v) {
        var te = this.elements;
        te[12] = v.x;
        te[13] = v.y;
        te[14] = v.z;
        return this;
    };
    /**
     * 转换当前矩阵为它的逆矩阵。当行列式为0时，它是投影矩阵，没有逆矩阵，会抛出错误。
     * @param m
     * @param throwOnDegenerate
     */
    Matrix4.prototype.getInverse = function (m, throwOnDegenerate) {
        // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
        var te = this.elements, me = m.elements, n11 = me[0], n21 = me[1], n31 = me[2], n41 = me[3], n12 = me[4], n22 = me[5], n32 = me[6], n42 = me[7], n13 = me[8], n23 = me[9], n33 = me[10], n43 = me[11], n14 = me[12], n24 = me[13], n34 = me[14], n44 = me[15], t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44, t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44, t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44, t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
        var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;
        if (det === 0) {
            var msg = "Matrix4.getInverse(): can't invert matrix, determinant is 0";
            if (throwOnDegenerate === true) {
                throw new Error(msg);
            }
            else {
                console.warn(msg);
            }
            return this.identity();
        }
        var detInv = 1 / det;
        te[0] = t11 * detInv;
        te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
        te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
        te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;
        te[4] = t12 * detInv;
        te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
        te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
        te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;
        te[8] = t13 * detInv;
        te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
        te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
        te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;
        te[12] = t14 * detInv;
        te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
        te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
        te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;
        return this;
    };
    Matrix4.prototype.scale = function (v) {
        var te = this.elements;
        var x = v.x, y = v.y, z = v.z;
        te[0] *= x;
        te[4] *= y;
        te[8] *= z;
        te[1] *= x;
        te[5] *= y;
        te[9] *= z;
        te[2] *= x;
        te[6] *= y;
        te[10] *= z;
        te[3] *= x;
        te[7] *= y;
        te[11] *= z;
        return this;
    };
    Matrix4.prototype.getMaxScaleOnAxis = function () {
        var te = this.elements;
        var scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
        var scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
        var scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
        return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
    };
    Matrix4.prototype.makeTranslation = function (x, y, z) {
        this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
        return this;
    };
    Matrix4.prototype.makeRotationX = function (theta) {
        var c = Math.cos(theta), s = Math.sin(theta);
        this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
        return this;
    };
    Matrix4.prototype.makeRotationY = function (theta) {
        var c = Math.cos(theta), s = Math.sin(theta);
        this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
        return this;
    };
    Matrix4.prototype.makeRotationZ = function (theta) {
        var c = Math.cos(theta), s = Math.sin(theta);
        this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this;
    };
    Matrix4.prototype.makeRotationAxis = function (axis, angle) {
        // Based on http://www.gamedev.net/reference/articles/article1199.asp
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var t = 1 - c;
        var x = axis.x, y = axis.y, z = axis.z;
        var tx = t * x, ty = t * y;
        this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1);
        return this;
    };
    Matrix4.prototype.makeScale = function (x, y, z) {
        this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
        return this;
    };
    /**
     * 把当前矩阵设置为某个错切变换
     * @param x
     * @param y
     * @param z
     * @returns {Matrix4}
     */
    Matrix4.prototype.makeShear = function (x, y, z) {
        this.set(1, y, z, 0, x, 1, z, 0, x, y, 1, 0, 0, 0, 0, 1);
        return this;
    };
    /**
     * 把位置向量，方位四元数，缩放系数组合到当前矩阵
     * @param position {Vector3}
     * @param quaternion {Quaternion}
     * @param scale {Vector3}
     * @returns {Matrix4}
     */
    Matrix4.prototype.compose = function (position, quaternion, scale) {
        this.makeRotationFromQuaternion(quaternion);
        this.scale(scale);
        this.setPosition(position);
        return this;
    };
    /**
     * 分解一个3D变换矩阵为缩放系数，旋转分量和平移向量。
     * @param position
     * @param quaternion
     * @param scale
     * @returns {Matrix4}
     */
    Matrix4.prototype.decompose = function (position, quaternion, scale) {
        var vector = new Vector3_1.default();
        var matrix = new Matrix4();
        var te = this.elements;
        var sx = vector.set(te[0], te[1], te[2]).length();
        var sy = vector.set(te[4], te[5], te[6]).length();
        var sz = vector.set(te[8], te[9], te[10]).length();
        // if determine is negative, we need to invert one scale
        var det = this.determinant();
        if (det < 0)
            sx = -sx;
        position.x = te[12];
        position.y = te[13];
        position.z = te[14];
        // scale the rotation part
        matrix.copy(this);
        var invSX = 1 / sx;
        var invSY = 1 / sy;
        var invSZ = 1 / sz;
        matrix.elements[0] *= invSX;
        matrix.elements[1] *= invSX;
        matrix.elements[2] *= invSX;
        matrix.elements[4] *= invSY;
        matrix.elements[5] *= invSY;
        matrix.elements[6] *= invSY;
        matrix.elements[8] *= invSZ;
        matrix.elements[9] *= invSZ;
        matrix.elements[10] *= invSZ;
        quaternion.setFromRotationMatrix(matrix);
        scale.x = sx;
        scale.y = sy;
        scale.z = sz;
        return this;
    };
    /**
     * 把当前矩阵设置成圆台形透视投影矩阵
     * @param left
     * @param right
     * @param top
     * @param bottom
     * @param near
     * @param far
     * @returns {Matrix4}
     */
    Matrix4.prototype.makeFrustum = function (left, right, top, bottom, near, far) {
        var te = this.elements;
        var x = 2 * near / (right - left);
        var y = 2 * near / (top - bottom);
        var a = (right + left) / (right - left);
        var b = (top + bottom) / (top - bottom);
        var c = -(far + near) / (far - near);
        var d = -2 * far * near / (far - near);
        te[0] = x;
        te[4] = 0;
        te[8] = a;
        te[12] = 0;
        te[1] = 0;
        te[5] = y;
        te[9] = b;
        te[13] = 0;
        te[2] = 0;
        te[6] = 0;
        te[10] = c;
        te[14] = d;
        te[3] = 0;
        te[7] = 0;
        te[11] = -1;
        te[15] = 0;
        return this;
    };
    /**
     * 把当前矩阵设置成圆台形透视投影矩阵,和makeFrustum的不同在于参数设置不同
     * @param fovy
     * @param aspect
     * @param near
     * @param far
     * @returns {Matrix4}
     */
    Matrix4.prototype.makePerspective = function (fovy, aspect, near, far) {
        var e;
        var rd;
        var s;
        var ct;
        if (near === far || aspect === 0) {
            throw 'null frustum';
        }
        if (near <= 0) {
            throw 'near <= 0';
        }
        if (far <= 0) {
            throw 'far <= 0';
        }
        fovy = Math.PI * fovy / 180 / 2;
        s = Math.sin(fovy);
        if (s === 0) {
            throw 'null frustum';
        }
        rd = 1 / (far - near);
        ct = Math.cos(fovy) / s;
        e = this.elements;
        e[0] = ct / aspect;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 0;
        e[5] = ct;
        e[6] = 0;
        e[7] = 0;
        e[8] = 0;
        e[9] = 0;
        e[10] = -(far + near) * rd;
        e[11] = -1;
        e[12] = 0;
        e[13] = 0;
        e[14] = -2 * near * far * rd;
        e[15] = 0;
        return this;
    };
    /**
     * 把当前矩阵设置成圆台形平行投影矩阵
     * @param left
     * @param right
     * @param top
     * @param bottom
     * @param near
     * @param far
     * @returns {Matrix4}
     */
    Matrix4.prototype.makeOrthographic = function (left, right, top, bottom, near, far) {
        var te = this.elements;
        var w = 1.0 / (right - left);
        var h = 1.0 / (top - bottom);
        var p = 1.0 / (far - near);
        var x = (right + left) * w;
        var y = (top + bottom) * h;
        var z = (far + near) * p;
        te[0] = 2 * w;
        te[4] = 0;
        te[8] = 0;
        te[12] = -x;
        te[1] = 0;
        te[5] = 2 * h;
        te[9] = 0;
        te[13] = -y;
        te[2] = 0;
        te[6] = 0;
        te[10] = -2 * p;
        te[14] = -z;
        te[3] = 0;
        te[7] = 0;
        te[11] = 0;
        te[15] = 1;
        return this;
    };
    /**
     * 判断两个矩阵内的元素是否全部相同
     * @param matrix
     */
    Matrix4.prototype.equals = function (matrix) {
        var te = this.elements;
        var me = matrix.elements;
        for (var i = 0; i < 16; i++) {
            if (te[i] !== me[i])
                return false;
        }
        return true;
    };
    Matrix4.prototype.fromArray = function (array, offset) {
        if (offset === void 0) { offset = 0; }
        for (var i = 0; i < 16; i++) {
            this.elements[i] = array[i + offset];
        }
        return this;
    };
    Matrix4.prototype.toArray = function (array, offset) {
        if (array === undefined)
            array = [];
        if (offset === undefined)
            offset = 0;
        var te = this.elements;
        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];
        array[offset + 3] = te[3];
        array[offset + 4] = te[4];
        array[offset + 5] = te[5];
        array[offset + 6] = te[6];
        array[offset + 7] = te[7];
        array[offset + 8] = te[8];
        array[offset + 9] = te[9];
        array[offset + 10] = te[10];
        array[offset + 11] = te[11];
        array[offset + 12] = te[12];
        array[offset + 13] = te[13];
        array[offset + 14] = te[14];
        array[offset + 15] = te[15];
        return array;
    };
    return Matrix4;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Matrix4;
},{"./Vector3":38}],37:[function(require,module,exports){
"use strict";
var Vector3_1 = require('./Vector3');
var Quaternion = (function () {
    function Quaternion(x, y, z, w) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (w === void 0) { w = 1; }
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }
    Object.defineProperty(Quaternion.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
            this.onChangeCallback();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
            this.onChangeCallback();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "z", {
        get: function () {
            return this._z;
        },
        set: function (value) {
            this._z = value;
            this.onChangeCallback();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "w", {
        get: function () {
            return this._w;
        },
        set: function (value) {
            this._w = value;
            this.onChangeCallback();
        },
        enumerable: true,
        configurable: true
    });
    Quaternion.slerp = function (qa, qb, qm, t) {
        return qm.copy(qa).slerp(qb, t);
    };
    Quaternion.slerpFlat = function (dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
        // fuzz-free, array-based Quaternion SLERP operation
        var x0 = src0[srcOffset0 + 0], y0 = src0[srcOffset0 + 1], z0 = src0[srcOffset0 + 2], w0 = src0[srcOffset0 + 3], x1 = src1[srcOffset1 + 0], y1 = src1[srcOffset1 + 1], z1 = src1[srcOffset1 + 2], w1 = src1[srcOffset1 + 3];
        if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {
            var s = 1 - t, cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1, dir = (cos >= 0 ? 1 : -1), sqrSin = 1 - cos * cos;
            // Skip the Slerp for tiny steps to avoid numeric problems:
            //if ( sqrSin > Number.EPSILON )
            if (sqrSin > Number.MIN_VALUE) {
                var sin = Math.sqrt(sqrSin), len = Math.atan2(sin, cos * dir);
                s = Math.sin(s * len) / sin;
                t = Math.sin(t * len) / sin;
            }
            var tDir = t * dir;
            x0 = x0 * s + x1 * tDir;
            y0 = y0 * s + y1 * tDir;
            z0 = z0 * s + z1 * tDir;
            w0 = w0 * s + w1 * tDir;
            // Normalize in case we just did a lerp:
            if (s === 1 - t) {
                var f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);
                x0 *= f;
                y0 *= f;
                z0 *= f;
                w0 *= f;
            }
        }
        dst[dstOffset] = x0;
        dst[dstOffset + 1] = y0;
        dst[dstOffset + 2] = z0;
        dst[dstOffset + 3] = w0;
    };
    Quaternion.prototype.set = function (x, y, z, w) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
        this.onChangeCallback();
        return this;
    };
    Quaternion.prototype.clone = function () {
        return new Quaternion(this._x, this._y, this._z, this._w);
    };
    Quaternion.prototype.copy = function (quaternion) {
        this._x = quaternion.x;
        this._y = quaternion.y;
        this._z = quaternion.z;
        this._w = quaternion.w;
        this.onChangeCallback();
        return this;
    };
    Quaternion.prototype.setFromEuler = function (euler, update) {
        if (update === void 0) { update = false; }
        var x = euler.x, y = euler.y, z = euler.z, order = euler.order;
        // http://www.mathworks.com/matlabcentral/fileexchange/
        // 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
        //	content/SpinCalc.m
        var cos = Math.cos;
        var sin = Math.sin;
        var c1 = cos(x / 2);
        var c2 = cos(y / 2);
        var c3 = cos(z / 2);
        var s1 = sin(x / 2);
        var s2 = sin(y / 2);
        var s3 = sin(z / 2);
        if (order === 'XYZ') {
            this._x = s1 * c2 * c3 + c1 * s2 * s3;
            this._y = c1 * s2 * c3 - s1 * c2 * s3;
            this._z = c1 * c2 * s3 + s1 * s2 * c3;
            this._w = c1 * c2 * c3 - s1 * s2 * s3;
        }
        else if (order === 'YXZ') {
            this._x = s1 * c2 * c3 + c1 * s2 * s3;
            this._y = c1 * s2 * c3 - s1 * c2 * s3;
            this._z = c1 * c2 * s3 - s1 * s2 * c3;
            this._w = c1 * c2 * c3 + s1 * s2 * s3;
        }
        else if (order === 'ZXY') {
            this._x = s1 * c2 * c3 - c1 * s2 * s3;
            this._y = c1 * s2 * c3 + s1 * c2 * s3;
            this._z = c1 * c2 * s3 + s1 * s2 * c3;
            this._w = c1 * c2 * c3 - s1 * s2 * s3;
        }
        else if (order === 'ZYX') {
            this._x = s1 * c2 * c3 - c1 * s2 * s3;
            this._y = c1 * s2 * c3 + s1 * c2 * s3;
            this._z = c1 * c2 * s3 - s1 * s2 * c3;
            this._w = c1 * c2 * c3 + s1 * s2 * s3;
        }
        else if (order === 'YZX') {
            this._x = s1 * c2 * c3 + c1 * s2 * s3;
            this._y = c1 * s2 * c3 + s1 * c2 * s3;
            this._z = c1 * c2 * s3 - s1 * s2 * c3;
            this._w = c1 * c2 * c3 - s1 * s2 * s3;
        }
        else if (order === 'XZY') {
            this._x = s1 * c2 * c3 - c1 * s2 * s3;
            this._y = c1 * s2 * c3 - s1 * c2 * s3;
            this._z = c1 * c2 * s3 + s1 * s2 * c3;
            this._w = c1 * c2 * c3 + s1 * s2 * s3;
        }
        if (update !== false)
            this.onChangeCallback();
        return this;
    };
    Quaternion.prototype.setFromAxisAngle = function (axis, angle) {
        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
        // assumes axis is normalized
        var halfAngle = angle / 2, s = Math.sin(halfAngle);
        this._x = axis.x * s;
        this._y = axis.y * s;
        this._z = axis.z * s;
        this._w = Math.cos(halfAngle);
        this.onChangeCallback();
        return this;
    };
    Quaternion.prototype.setFromRotationMatrix = function (m) {
        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
        var te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10], trace = m11 + m22 + m33, s;
        if (trace > 0) {
            s = 0.5 / Math.sqrt(trace + 1.0);
            this._w = 0.25 / s;
            this._x = (m32 - m23) * s;
            this._y = (m13 - m31) * s;
            this._z = (m21 - m12) * s;
        }
        else if (m11 > m22 && m11 > m33) {
            s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
            this._w = (m32 - m23) / s;
            this._x = 0.25 * s;
            this._y = (m12 + m21) / s;
            this._z = (m13 + m31) / s;
        }
        else if (m22 > m33) {
            s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
            this._w = (m13 - m31) / s;
            this._x = (m12 + m21) / s;
            this._y = 0.25 * s;
            this._z = (m23 + m32) / s;
        }
        else {
            s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
            this._w = (m21 - m12) / s;
            this._x = (m13 + m31) / s;
            this._y = (m23 + m32) / s;
            this._z = 0.25 * s;
        }
        this.onChangeCallback();
        return this;
    };
    Quaternion.prototype.setFromUnitVectors = function (vFrom, vTo) {
        // assumes direction vectors vFrom and vTo are normalized
        var v1 = new Vector3_1.default();
        var r;
        var EPS = 0.000001;
        r = vFrom.dot(vTo) + 1;
        if (r < EPS) {
            r = 0;
            if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
                v1.set(-vFrom.y, vFrom.x, 0);
            }
            else {
                v1.set(0, -vFrom.z, vFrom.y);
            }
        }
        else {
            v1.crossVectors(vFrom, vTo);
        }
        this._x = v1.x;
        this._y = v1.y;
        this._z = v1.z;
        this._w = r;
        return this.normalize();
    };
    Quaternion.prototype.inverse = function () {
        return this.conjugate().normalize();
    };
    /**
     * 共轭四元数
     * @returns {Quaternion}
     */
    Quaternion.prototype.conjugate = function () {
        this._x *= -1;
        this._y *= -1;
        this._z *= -1;
        this.onChangeCallback();
        return this;
    };
    Quaternion.prototype.dot = function (v) {
        return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
    };
    Quaternion.prototype.lengthSq = function () {
        return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    };
    Quaternion.prototype.length = function () {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    };
    Quaternion.prototype.normalize = function () {
        var l = this.length();
        if (l === 0) {
            this._x = 0;
            this._y = 0;
            this._z = 0;
            this._w = 1;
        }
        else {
            l = 1 / l;
            this._x = this._x * l;
            this._y = this._y * l;
            this._z = this._z * l;
            this._w = this._w * l;
        }
        this.onChangeCallback();
        return this;
    };
    Quaternion.prototype.multiply = function (q) {
        return this.multiplyQuaternions(this, q);
    };
    Quaternion.prototype.premultiply = function (q) {
        return this.multiplyQuaternions(q, this);
    };
    Quaternion.prototype.multiplyQuaternions = function (a, b) {
        // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
        var qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
        var qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;
        this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
        this.onChangeCallback();
        return this;
    };
    Quaternion.prototype.slerp = function (qb, t) {
        if (t === 0)
            return this;
        if (t === 1)
            return this.copy(qb);
        var x = this._x, y = this._y, z = this._z, w = this._w;
        // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/
        var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;
        if (cosHalfTheta < 0) {
            this._w = -qb._w;
            this._x = -qb._x;
            this._y = -qb._y;
            this._z = -qb._z;
            cosHalfTheta = -cosHalfTheta;
        }
        else {
            this.copy(qb);
        }
        if (cosHalfTheta >= 1.0) {
            this._w = w;
            this._x = x;
            this._y = y;
            this._z = z;
            return this;
        }
        var sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
        if (Math.abs(sinHalfTheta) < 0.001) {
            this._w = 0.5 * (w + this._w);
            this._x = 0.5 * (x + this._x);
            this._y = 0.5 * (y + this._y);
            this._z = 0.5 * (z + this._z);
            return this;
        }
        var halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
        var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta, ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
        this._w = (w * ratioA + this._w * ratioB);
        this._x = (x * ratioA + this._x * ratioB);
        this._y = (y * ratioA + this._y * ratioB);
        this._z = (z * ratioA + this._z * ratioB);
        this.onChangeCallback();
        return this;
    };
    Quaternion.prototype.equals = function (quaternion) {
        return (quaternion._x === this._x) && (quaternion._y === this._y) && (quaternion._z === this._z) && (quaternion._w === this._w);
    };
    Quaternion.prototype.fromArray = function (array, offset) {
        if (offset === undefined)
            offset = 0;
        this._x = array[offset];
        this._y = array[offset + 1];
        this._z = array[offset + 2];
        this._w = array[offset + 3];
        this.onChangeCallback();
        return this;
    };
    Quaternion.prototype.toArray = function (array, offset) {
        if (array === undefined)
            array = [];
        if (offset === undefined)
            offset = 0;
        array[offset] = this._x;
        array[offset + 1] = this._y;
        array[offset + 2] = this._z;
        array[offset + 3] = this._w;
        return array;
    };
    Quaternion.prototype.onChange = function (callback, context) {
        this._changeCallback = callback;
        this._changeCallbackContext = context;
        return this;
    };
    Quaternion.prototype.onChangeCallback = function () {
        if (this._changeCallback) {
            this._changeCallback.call(this._changeCallbackContext);
        }
    };
    return Quaternion;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Quaternion;
},{"./Vector3":38}],38:[function(require,module,exports){
"use strict";
var Quaternion_1 = require("./Quaternion");
/**
 * Created by yaozh on 2017/6/11.
 */
var Vector3 = (function () {
    function Vector3(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this._elements = new Float32Array([
            this.x,
            this.y,
            this.z
        ]);
    }
    Object.defineProperty(Vector3.prototype, "elements", {
        get: function () {
            return new Float32Array([
                this.x,
                this.y,
                this.z
            ]);
        },
        enumerable: true,
        configurable: true
    });
    Vector3.prototype.set = function (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    };
    /**
     * 把本向量的每个分量设置为某个相同的数值
     * @param scalar
     */
    Vector3.prototype.setScalar = function (scalar) {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;
        return this;
    };
    Vector3.prototype.setX = function (x) {
        this.x = x;
        return this;
    };
    Vector3.prototype.setY = function (y) {
        this.y = y;
        return this;
    };
    Vector3.prototype.setZ = function (z) {
        this.z = z;
        return this;
    };
    /**
     * 设置本向量某个分量的值
     * @param index 分量索引，从0开始
     * @param value 欲设置的分量的值
     */
    Vector3.prototype.setComponent = function (index, value) {
        switch (index) {
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            case 2:
                this.z = value;
                break;
            default: throw new Error('index is out of range: ' + index);
        }
        return this;
    };
    Vector3.prototype.getComponent = function (index) {
        switch (index) {
            case 0: return this.x;
            case 1: return this.y;
            case 2: return this.z;
            default: throw new Error('index is out of range: ' + index);
        }
    };
    /**
     * 获取当前向量的副本），不影响当前向量
     */
    Vector3.prototype.clone = function () {
        return new Vector3(this.x, this.y, this.z);
    };
    /**
     * 用某个向量为当前向量赋值(分量分别赋值，不影响参数向量)
     * @param v
     */
    Vector3.prototype.copyFrom = function (v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    };
    Vector3.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    };
    /**
     * 为当前向量的每个分量都增加一个相同标量数
     * @param s
     */
    Vector3.prototype.addScalar = function (s) {
        this.x += s;
        this.y += s;
        this.z += s;
        return this;
    };
    /**
     * 同时把两个向量与当前向量相加：相当于a,b先相加，然后把结果与当前向量相加
     * @param a
     * @param b
     */
    Vector3.prototype.addVectors = function (a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        return this;
    };
    /**
     * 将一个缩放的向量与当前向量相加
     * @param v 将缩放的向量
     * @param s 缩放倍数
     */
    Vector3.prototype.addScaledVector = function (v, s) {
        this.x += v.x * s;
        this.y += v.y * s;
        this.z += v.z * s;
        return this;
    };
    Vector3.prototype.sub = function (v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    };
    /**
     * 为当前向量的每个分量都减去一个相同标量数
     * @param s
     */
    Vector3.prototype.subScalar = function (s) {
        this.x -= s;
        this.y -= s;
        this.z -= s;
        return this;
    };
    /**
     * 求两个向量的差，并保存在当前向量中
     * @param a
     * @param b
     */
    Vector3.prototype.subVectors = function (a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this;
    };
    Vector3.prototype.multiply = function (v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    };
    /**
     * 将当前向量的每个分量都乘以一个相同标量数
     * @param s
     */
    Vector3.prototype.multiplyScalar = function (scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    };
    Vector3.prototype.multiplyVectors = function (a, b) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        return this;
    };
    Vector3.prototype.applyEuler = function (euler) {
        var quaternion = new Quaternion_1.default();
        return this.applyQuaternion(quaternion.setFromEuler(euler));
    };
    Vector3.prototype.applyAxisAngle = function (axis, angle) {
        var quaternion = new Quaternion_1.default();
        return this.applyQuaternion(quaternion.setFromAxisAngle(axis, angle));
    };
    Vector3.prototype.applyMatrix3 = function (m) {
        var x = this.x, y = this.y, z = this.z;
        var e = m.elements;
        this.x = e[0] * x + e[3] * y + e[6] * z;
        this.y = e[1] * x + e[4] * y + e[7] * z;
        this.z = e[2] * x + e[5] * y + e[8] * z;
        return this;
    };
    Vector3.prototype.applyMatrix4 = function (m) {
        var x = this.x, y = this.y, z = this.z;
        var e = m.elements;
        this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
        this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
        this.z = e[2] * x + e[6] * y + e[10] * z + e[14];
        var w = e[3] * x + e[7] * y + e[11] * z + e[15];
        return this.divideScalar(w);
    };
    Vector3.prototype.applyQuaternion = function (q) {
        var x = this.x, y = this.y, z = this.z;
        var qx = q.x, qy = q.y, qz = q.z, qw = q.w;
        // calculate quat * vector
        var ix = qw * x + qy * z - qz * y;
        var iy = qw * y + qz * x - qx * z;
        var iz = qw * z + qx * y - qy * x;
        var iw = -qx * x - qy * y - qz * z;
        // calculate result * inverse quat
        this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return this;
    };
    /*project: function () {

        var matrix = new Matrix4();

        return function project( camera ) {

            matrix.multiplyMatrices( camera.projectionMatrix, matrix.getInverse( camera.matrixWorld ) );
            return this.applyMatrix4( matrix );

        };

    }(),

    unproject: function () {

        var matrix = new Matrix4();

        return function unproject( camera ) {

            matrix.multiplyMatrices( camera.matrixWorld, matrix.getInverse( camera.projectionMatrix ) );
            return this.applyMatrix4( matrix );

        };

    }(),*/
    Vector3.prototype.transformDirection = function (m) {
        // input: Matrix4 affine matrix
        // vector interpreted as a direction
        var x = this.x, y = this.y, z = this.z;
        var e = m.elements;
        this.x = e[0] * x + e[4] * y + e[8] * z;
        this.y = e[1] * x + e[5] * y + e[9] * z;
        this.z = e[2] * x + e[6] * y + e[10] * z;
        return this.normalize();
    };
    Vector3.prototype.divide = function (v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;
    };
    /**
     * 将当前向量的每个分量都除以一个相同标量数
     * @param s
     */
    Vector3.prototype.divideScalar = function (scalar) {
        return this.multiplyScalar(1 / scalar);
    };
    Vector3.prototype.min = function (v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);
        return this;
    };
    Vector3.prototype.max = function (v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);
        return this;
    };
    Vector3.prototype.clamp = function (min, max) {
        // This function assumes min < max, if this assumption isn't true it will not operate correctly
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        this.z = Math.max(min.z, Math.min(max.z, this.z));
        return this;
    };
    Vector3.prototype.clampScalar = function (minVal, maxVal) {
        var min = new Vector3();
        var max = new Vector3();
        min.set(minVal, minVal, minVal);
        max.set(maxVal, maxVal, maxVal);
        return this.clamp(min, max);
    };
    Vector3.prototype.clampLength = function (min, max) {
        var length = this.length();
        return this.multiplyScalar(Math.max(min, Math.min(max, length)) / length);
    };
    Vector3.prototype.floor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
    };
    Vector3.prototype.ceil = function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
    };
    Vector3.prototype.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
    };
    Vector3.prototype.roundToZero = function () {
        this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
        this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);
        return this;
    };
    Vector3.prototype.negate = function () {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    };
    /**
     * 点乘，结果是一个标量，衡量两个向量的相似度
     * @param v
     */
    Vector3.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    };
    // TODO lengthSquared?
    Vector3.prototype.lengthSq = function () {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    };
    Vector3.prototype.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    Vector3.prototype.lengthManhattan = function () {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    };
    /**
     * 向量归一化，变为单位向量
     */
    Vector3.prototype.normalize = function () {
        return this.divideScalar(this.length());
    };
    Vector3.prototype.setLength = function (length) {
        return this.multiplyScalar(length / this.length());
    };
    /**
     * 线性插值
     * @param v 目标向量
     * @param alpha 目标向量和当前向量之间的递进度，小于1
     */
    Vector3.prototype.lerp = function (v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        return this;
    };
    Vector3.prototype.lerpVectors = function (v1, v2, alpha) {
        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
    };
    /**
     * 向量叉乘，获取与目标向量和当前向量所确定平面垂直的向量，新向量的方向满足右手定则
     * @param v
     */
    Vector3.prototype.cross = function (v) {
        var x = this.x, y = this.y, z = this.z;
        this.x = y * v.z - z * v.y;
        this.y = z * v.x - x * v.z;
        this.z = x * v.y - y * v.x;
        return this;
    };
    /**
     * 把两个向量叉乘的结果，存储于当前向量中。
     * @param a
     * @param b
     */
    Vector3.prototype.crossVectors = function (a, b) {
        var ax = a.x, ay = a.y, az = a.z;
        var bx = b.x, by = b.y, bz = b.z;
        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;
        return this;
    };
    Vector3.prototype.projectOnVector = function (vector) {
        var scalar = vector.dot(this) / vector.lengthSq();
        return this.copyFrom(vector).multiplyScalar(scalar);
    };
    Vector3.prototype.projectOnPlane = function (planeNormal) {
        var v1 = new Vector3();
        v1.copyFrom(this).projectOnVector(planeNormal);
        return this.sub(v1);
    };
    /**
     * 当前向量基于某法线的对称向量
     * @param normal
     */
    Vector3.prototype.reflect = function (normal) {
        // reflect incident vector off plane orthogonal to normal
        // normal is assumed to have unit length
        var v1 = new Vector3();
        return this.sub(v1.copyFrom(normal).multiplyScalar(2 * this.dot(normal)));
    };
    /**
     * 相对于目标向量的夹角
     * @param v
     */
    Vector3.prototype.angleTo = function (v) {
        var theta = this.dot(v) / (Math.sqrt(this.lengthSq() * v.lengthSq()));
        // clamp, to handle numerical problems
        //return Math.acos( _Math.clamp( theta, - 1, 1 ) );
        return Math.acos(theta);
    };
    Vector3.prototype.distanceTo = function (v) {
        return Math.sqrt(this.distanceToSquared(v));
    };
    Vector3.prototype.distanceToSquared = function (v) {
        var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
        return dx * dx + dy * dy + dz * dz;
    };
    Vector3.prototype.distanceToManhattan = function (v) {
        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
    };
    Vector3.prototype.setFromMatrixPosition = function (m) {
        return this.setFromMatrixColumn(m, 3);
    };
    Vector3.prototype.setFromMatrixScale = function (m) {
        var sx = this.setFromMatrixColumn(m, 0).length();
        var sy = this.setFromMatrixColumn(m, 1).length();
        var sz = this.setFromMatrixColumn(m, 2).length();
        this.x = sx;
        this.y = sy;
        this.z = sz;
        return this;
    };
    /**
     * 从矩阵的某列获取数值，重置当前向量的分量
     * @param m
     * @param index
     */
    Vector3.prototype.setFromMatrixColumn = function (m, index) {
        return this.fromArray(m.elements, index * 4);
    };
    /**
     * 判断两个向量的每个分量是否完全一致
     * @param v
     */
    Vector3.prototype.equals = function (v) {
        return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));
    };
    /**
     * 从数组的某个位置开始依次对当前向量的每个分量赋值
     * @param array 来源数组
     * @param offset 数组中对应的第一个分量的位置
     */
    Vector3.prototype.fromArray = function (array, offset) {
        if (offset === void 0) { offset = 0; }
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        return this;
    };
    /**
     * 将当前向量的分量按序传给既定数组的特定索引位置
     * @param array
     * @param offset
     */
    Vector3.prototype.toArray = function (array, offset) {
        if (offset === void 0) { offset = 0; }
        if (array === undefined)
            array = [];
        if (offset === undefined)
            offset = 0;
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        return array;
    };
    Vector3.prototype.fromBufferAttribute = function (attribute, index, offset) {
        if (offset === void 0) { offset = 0; }
        if (offset !== undefined) {
            console.warn('Vector3: offset has been removed from .fromBufferAttribute().');
        }
        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        this.z = attribute.getZ(index);
        return this;
    };
    Vector3.FORWARD = new Vector3(0, 0, 1); //positive z-axis
    Vector3.UP = new Vector3(0, 1, 0); //positive y-axis
    Vector3.RIGHT = new Vector3(1, 0, 0); //positive x-axis
    Vector3.ZERO = new Vector3(0, 0, 0);
    return Vector3;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Vector3;
},{"./Quaternion":37}],39:[function(require,module,exports){
"use strict";
/**
 * Created by yaozh on 2017/6/11.
 */
var Vector4 = (function () {
    function Vector4(x, y, z, w) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        if (w == void 0)
            this.w = 1;
        else if (w == 0.0)
            this.w = 0.0;
        else
            this.w = w;
        this._elements = new Float32Array([
            this.x,
            this.y,
            this.z,
            this.w
        ]);
    }
    Object.defineProperty(Vector4.prototype, "elements", {
        get: function () {
            return new Float32Array([
                this.x,
                this.y,
                this.z,
                this.w
            ]);
        },
        enumerable: true,
        configurable: true
    });
    Vector4.prototype.set = function (x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    };
    return Vector4;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Vector4;
},{}],40:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Geometry_1 = require("../../primitives/Geometry");
/**
 * Created by yaozh on 2017/8/4.
 */
var ObjGeometry = (function (_super) {
    __extends(ObjGeometry, _super);
    function ObjGeometry(parser) {
        _super.call(this);
        this._indexDraw = false;
        this._vertexPositions = new Float32Array(parser.vertices);
        this._vertexNormals = new Float32Array(parser.normals);
        this._vertexUVs = new Float32Array(parser.textures);
        this._vertexNum = parser.vertexCount;
    }
    return ObjGeometry;
}(Geometry_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ObjGeometry;
},{"../../primitives/Geometry":44}],41:[function(require,module,exports){
"use strict";
/**
 * Created by yaozh on 2017/7/7.
 */
var ObjParser = (function () {
    function ObjParser(objDataStr) {
        this._vcount = 0;
        this.parse(objDataStr);
    }
    Object.defineProperty(ObjParser.prototype, "vertexCount", {
        get: function () {
            return this._vcount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjParser.prototype, "vertices", {
        get: function () {
            return this._vertices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjParser.prototype, "normals", {
        get: function () {
            return this._normals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjParser.prototype, "textures", {
        get: function () {
            return this._textures;
        },
        enumerable: true,
        configurable: true
    });
    ObjParser.prototype.parse = function (objStr) {
        //原始顶点坐标列表--直接从obj文件中加载
        var alv = [];
        //结果顶点坐标列表--按面组织好
        var alvResult = [];
        //原始纹理坐标列表
        var alt = [];
        //纹理坐标结果列表
        var altResult = [];
        //原始法向量列表
        var aln = [];
        //法向结果量列表
        var alnResult = [];
        var lines = objStr.split("\n");
        for (var lineIndex in lines) {
            var line = lines[lineIndex].replace(/[ \t]+/g, " ").replace(/\s\s*$/, "");
            if (line[0] == "#") {
                continue;
            }
            var array = line.split(" ");
            if (array[0] == "v") {
                alv.push(parseFloat(array[1]));
                alv.push(parseFloat(array[2]));
                alv.push(parseFloat(array[3]));
            }
            else if (array[0] == "vt") {
                alt.push(parseFloat(array[1]));
                alt.push(1.0 - parseFloat(array[2]));
            }
            else if (array[0] == "vn") {
                aln.push(parseFloat(array[1]));
                aln.push(parseFloat(array[2]));
                aln.push(parseFloat(array[3]));
            }
            else if (array[0] == "f") {
                if (array.length != 4) {
                    //console.error("array.length != 4");
                    continue;
                }
                for (var i = 1; i < 4; ++i) {
                    var tempArray = array[i].split("/");
                    var vIndex = parseInt(tempArray[0]) - 1;
                    var tIndex = parseInt(tempArray[1]) - 1;
                    var nIndex = parseInt(tempArray[2]) - 1;
                    alvResult.push(alv[vIndex * 3 + 0], alv[vIndex * 3 + 1], alv[vIndex * 3 + 2]);
                    altResult.push(alt[tIndex * 2 + 0], alt[tIndex * 2 + 1]);
                    alnResult.push(aln[nIndex * 3 + 0], aln[nIndex * 3 + 1], aln[nIndex * 3 + 2]);
                }
            }
        }
        console.log(alvResult.length);
        console.log(alnResult.length);
        this._vcount = alnResult.length / 3;
        this._vertices = alvResult;
        this._textures = altResult;
        this._normals = alnResult;
    };
    return ObjParser;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ObjParser;
},{}],42:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Geometry_1 = require("./Geometry");
/**
 * Created by yaozh on 2017/7/18.
 */
var ColorHeightMap = (function (_super) {
    __extends(ColorHeightMap, _super);
    function ColorHeightMap(heightImg, devideW, devideH, maxHeight, heightOffset) {
        _super.call(this);
        this._heightImg = heightImg;
        this._devideW = devideW || 1;
        this._devideH = devideH || 1;
        this._maxHeight = maxHeight || 10;
        this._heightOffset = heightOffset || -2;
        this._indexDraw = false;
        this.initVertexData(this.assign(this.createHeights()));
    }
    ColorHeightMap.prototype.createHeights = function () {
        var count = 0;
        var heights = [];
        var canvas = (document.getElementById('imgContainer'));
        var ctx = canvas.getContext('2d');
        ctx.drawImage(this._heightImg, 0, 0, this._heightImg.width, this._heightImg.height);
        var imageData = ctx.getImageData(0, 0, this._heightImg.width, this._heightImg.height);
        for (var i = 0; i < imageData.data.length; i += 4) {
            var r = imageData.data[i];
            var g = imageData.data[i + 1];
            var b = imageData.data[i + 2];
            imageData.data[i + 3] = 255;
            var h = (r + g + b) / 3;
            heights[count] = h * this._maxHeight / 255 + this._heightOffset;
            count++;
        }
        ctx.clearRect(0, 0, this._heightImg.width, this._heightImg.height);
        return heights;
    };
    ColorHeightMap.prototype.assign = function (heights) {
        var result = [];
        var counter = 0;
        var row = this._heightImg.height;
        var col = this._heightImg.width;
        for (var i = 0; i < row; i++) {
            result[i] = [];
            for (var j = 0; j < col; j++) {
                result[i][j] = heights[counter++];
            }
        }
        return result;
    };
    ColorHeightMap.prototype.initVertexData = function (result) {
        var count = 0;
        var vertices = [];
        var rowsPlusOne = this._heightImg.height;
        var colsPlusOne = this._heightImg.width;
        for (var j = 0; j < rowsPlusOne - 1; j++) {
            for (var i = 0; i < colsPlusOne - 1; i++) {
                //计算当前格子左上侧点坐标
                var zsx = -1 * colsPlusOne / 2 + i * 1;
                var zsz = -1 * rowsPlusOne / 2 + j * 1;
                vertices[count++] = zsx;
                vertices[count++] = result[j][i];
                vertices[count++] = zsz;
                vertices[count++] = zsx;
                vertices[count++] = result[j + 1][i];
                vertices[count++] = zsz + 1;
                vertices[count++] = zsx + 1;
                vertices[count++] = result[j][i + 1];
                vertices[count++] = zsz;
                vertices[count++] = zsx + 1;
                vertices[count++] = result[j][i + 1];
                vertices[count++] = zsz;
                vertices[count++] = zsx;
                vertices[count++] = result[j + 1][i];
                vertices[count++] = zsz + 1;
                vertices[count++] = zsx + 1;
                vertices[count++] = result[j + 1][i + 1];
                vertices[count++] = zsz + 1;
            }
        }
        this._vertexPositions = new Float32Array(vertices);
        this._vertexNormals = new Float32Array(vertices);
        var sizew = 16 / rowsPlusOne; //列数
        var sizeh = 16 / colsPlusOne; //行数
        var c = 0;
        var uv = [];
        for (var i = 0; i < colsPlusOne - 1; i++) {
            for (var j = 0; j < rowsPlusOne - 1; j++) {
                //每行列一个矩形，由两个三角形构成，共六个点，12个纹理坐标
                var s = j * sizew;
                var t = i * sizeh;
                uv[c++] = s;
                uv[c++] = t;
                uv[c++] = s;
                uv[c++] = t + sizeh;
                uv[c++] = s + sizew;
                uv[c++] = t;
                uv[c++] = s + sizew;
                uv[c++] = t;
                uv[c++] = s;
                uv[c++] = t + sizeh;
                uv[c++] = s + sizew;
                uv[c++] = t + sizeh;
            }
        }
        this._vertexUVs = new Float32Array(uv);
        this._vertexNum = vertices.length / 3;
    };
    return ColorHeightMap;
}(Geometry_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ColorHeightMap;
},{"./Geometry":44}],43:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Geometry_1 = require("./Geometry");
/**
 * Created by yaozh on 2017/6/6.
 */
var Cube = (function (_super) {
    __extends(Cube, _super);
    // Create a cube
    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |     | |
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3
    function Cube(width, height, depth) {
        if (width === void 0) { width = 40; }
        if (height === void 0) { height = 40; }
        if (depth === void 0) { depth = 40; }
        _super.call(this);
        this._width = 40;
        this._height = 40;
        this._depth = 40;
        this._width = width || 40;
        this._height = height || 40;
        this._depth = depth || 40;
        var hw = this._width * 0.5;
        var hh = this._height * 0.5;
        var hd = this._depth * 0.5;
        this._vertexPositions = new Float32Array([
            hw, hh, hd, -hw, hh, hd, -hw, -hh, hd, hw, -hh, hd,
            hw, hh, hd, hw, -hh, hd, hw, -hh, -hd, hw, hh, -hd,
            hw, hh, hd, hw, hh, -hd, -hw, hh, -hd, -hw, hh, hd,
            -hw, hh, hd, -hw, hh, -hd, -hw, -hh, -hd, -hw, -hh, hd,
            -hw, -hh, -hd, hw, -hh, -hd, hw, -hh, hd, -hw, -hh, hd,
            hw, -hh, -hd, -hw, -hh, -hd, -hw, hh, -hd, hw, hh, -hd // v4-v7-v6-v5 back
        ]);
        this._vertexColors = new Float32Array([
            0.4, 0.4, 1.0, 0.4, 0.4, 1.0, 0.4, 0.4, 1.0, 0.4, 0.4, 1.0,
            0.4, 1.0, 0.4, 0.4, 1.0, 0.4, 0.4, 1.0, 0.4, 0.4, 1.0, 0.4,
            1.0, 0.4, 0.4, 1.0, 0.4, 0.4, 1.0, 0.4, 0.4, 1.0, 0.4, 0.4,
            1.0, 1.0, 0.4, 1.0, 1.0, 0.4, 1.0, 1.0, 0.4, 1.0, 1.0, 0.4,
            1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
            0.4, 1.0, 1.0, 0.4, 1.0, 1.0, 0.4, 1.0, 1.0, 0.4, 1.0, 1.0 // v4-v7-v6-v5 back
        ]);
        this._vertexNormals = new Float32Array([
            0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
            -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
            0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
            0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0 // v4-v7-v6-v5 back
        ]);
        this._vertexUVs = new Float32Array([
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0 // v4-v7-v6-v5 back
        ]);
        this._indices = new Uint16Array([
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23 // back
        ]);
        this._vertexNum = 8;
    }
    return Cube;
}(Geometry_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Cube;
},{"./Geometry":44}],44:[function(require,module,exports){
"use strict";
/**
 * 几何体基础类，基本信息包括顶点位置，顶点法线，顶点颜色，顶点UV坐标，顶点索引值等。
 * Created by yaozh on 2017/6/6.
 */
var Geometry = (function () {
    function Geometry() {
        this._indexDraw = true;
        this._vertexNum = 0;
        this._vertexPosNum = 3;
        this._vertexNormalNum = 3;
        this._vertexColorNum = 3;
        this._vertexUVNum = 2;
    }
    Object.defineProperty(Geometry.prototype, "indexDraw", {
        get: function () {
            return this._indexDraw;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "vertexNum", {
        /**
         * 当前几何体的顶点数
         */
        get: function () {
            return this._vertexNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "vertexPositions", {
        get: function () {
            return this._vertexPositions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "vertexNormals", {
        get: function () {
            return this._vertexNormals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "vertexColors", {
        get: function () {
            return this._vertexColors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "uvs", {
        get: function () {
            return this._vertexUVs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "indices", {
        get: function () {
            return this._indices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "vertexPosNum", {
        get: function () {
            return this._vertexPosNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "vertexNormalNum", {
        get: function () {
            return this._vertexNormalNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "vertexColorNum", {
        get: function () {
            return this._vertexColorNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "vertexUVNum", {
        get: function () {
            return this._vertexUVNum;
        },
        enumerable: true,
        configurable: true
    });
    return Geometry;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Geometry;
},{}],45:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Geometry_1 = require("./Geometry");
/**
 * Created by yaozh on 2017/6/25.
 */
var Plane = (function (_super) {
    __extends(Plane, _super);
    function Plane(width, height) {
        _super.call(this);
        this._width = width || 10;
        this._height = height || 10;
        var hw = this._width * 0.5;
        var hh = this._height * 0.5;
        this._vertexPositions = new Float32Array([
            -1.0 * hw, 0, -1.0 * hh,
            -1.0 * hw, 0, 1.0 * hh,
            1.0 * hw, 0, 1.0 * hh,
            1.0 * hw, 0, -1.0 * hh //right-top
        ]);
        this._vertexNormals = new Float32Array([
            0, 1.0, 0,
            0, 1.0, 0,
            0, 1.0, 0,
            0, 1.0, 0
        ]);
        this._vertexColors = new Float32Array([
            1.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            1.0, 1.0, 1.0
        ]);
        this._vertexUVs = new Float32Array([
            0.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0
        ]);
        this._indices = new Uint16Array([
            0, 1, 2, 0, 2, 3
        ]);
        this._vertexNum = 4;
    }
    return Plane;
}(Geometry_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Plane;
},{"./Geometry":44}],46:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Geometry_1 = require("./Geometry");
var Vector3_1 = require("../math/Vector3");
/**
 * Created by yaozh on 2017/6/24.
 */
var Sphere = (function (_super) {
    __extends(Sphere, _super);
    function Sphere(radius, segmentWidth, segmentHeight) {
        _super.call(this);
        this.longitude = Math.PI * 2; //经度
        this.latitude = Math.PI; //纬度
        this.longStart = 0;
        this.latiStart = 0;
        this._radius = radius || 50;
        this._segmentWidth = Math.max(3, Math.floor(segmentWidth) || 8);
        this._segmentHeight = Math.max(2, Math.floor(segmentHeight) || 6);
        this.createGeometryData();
    }
    Sphere.prototype.createGeometryData = function () {
        // generate vertices, normals and uvs
        var SH = this._segmentHeight;
        var SW = this._segmentWidth;
        var index = 0;
        var grid = [];
        var vertex = new Vector3_1.default();
        var normal = new Vector3_1.default();
        // buffers
        var indices = [];
        var vertices = [];
        var normals = [];
        var colors = [];
        var uvs = [];
        for (var iy = 0; iy <= SH; iy++) {
            var verticesRow = [];
            var v = iy / SH;
            for (var ix = 0; ix <= SW; ix++) {
                var u = ix / SW;
                // vertex
                vertex.x = -this._radius * Math.cos(this.longStart + u * this.longitude) * Math.sin(this.latiStart + v * this.latitude);
                vertex.y = this._radius * Math.cos(this.latiStart + v * this.latitude);
                vertex.z = this._radius * Math.sin(this.longStart + u * this.longitude) * Math.sin(this.latiStart + v * this.latitude);
                vertices.push(vertex.x, vertex.y, vertex.z);
                // normal
                normal.set(vertex.x, vertex.y, vertex.z).normalize();
                normals.push(normal.x, normal.y, normal.z);
                //color
                colors.push(1.0, 1.0, 1.0);
                // uv
                uvs.push(u, 1 - v);
                verticesRow.push(index++);
            }
            grid.push(verticesRow);
        }
        // indices
        for (var iy = 0; iy < SH; iy++) {
            for (var ix = 0; ix < SW; ix++) {
                var a = grid[iy][ix + 1];
                var b = grid[iy][ix];
                var c = grid[iy + 1][ix];
                var d = grid[iy + 1][ix + 1];
                if (iy !== 0 || this.latiStart > 0)
                    indices.push(a, b, d);
                if (iy !== SH - 1 || (this.latiStart + this.latitude) < Math.PI)
                    indices.push(b, c, d);
            }
        }
        this._vertexPositions = new Float32Array(vertices);
        this._vertexNormals = new Float32Array(normals);
        this._vertexColors = new Float32Array(colors);
        this._vertexUVs = new Float32Array(uvs);
        this._indices = new Uint16Array(indices);
    };
    return Sphere;
}(Geometry_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Sphere;
},{"../math/Vector3":38,"./Geometry":44}],47:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Geometry_1 = require("./Geometry");
/**
 * Created by yaozh on 2017/6/28.
 */
var Teapot = (function (_super) {
    __extends(Teapot, _super);
    function Teapot() {
        _super.call(this);
        this._vertexPositions = new Float32Array([5.929688, 4.125, 0, 5.387188, 4.125, 2.7475, 5.2971, 4.494141, 2.70917,
            5.832031, 4.494141, 0, 5.401602, 4.617188, 2.753633, 5.945313, 4.617188, 0, 5.614209, 4.494141,
            2.844092, 6.175781, 4.494141, 0, 5.848437, 4.125, 2.94375, 6.429688, 4.125, 0, 3.899688, 4.125, 4.97,
            3.830352, 4.494141, 4.900664, 3.910782, 4.617188, 4.981094, 4.074414, 4.494141, 5.144727, 4.254687,
            4.125, 5.325, 1.677188, 4.125, 6.4575, 1.638858, 4.494141, 6.367412, 1.68332, 4.617188, 6.471914,
            1.77378, 4.494141, 6.684522, 1.873438, 4.125, 6.91875, -1.070312, 4.125, 7, -1.070312, 4.494141,
            6.902344, -1.070312, 4.617188, 7.015625, -1.070312, 4.494141, 7.246094, -1.070312, 4.125, 7.5,
            -1.070312, 4.125, 7, -4.007656, 4.125, 6.4575, -3.859572, 4.494141, 6.367412, -1.070312, 4.494141,
            6.902344, -3.847676, 4.617188, 6.471914, -1.070312, 4.617188, 7.015625, -3.917371, 4.494141,
            6.684522, -1.070312, 4.494141, 7.246094, -4.014062, 4.125, 6.91875, -1.070312, 4.125, 7.5, -6.209063,
            4.125, 4.97, -6.042168, 4.494141, 4.900664, -6.0725, 4.617188, 4.981094, -6.217675, 4.494141,
            5.144727, -6.395312, 4.125, 5.325, -7.591093, 4.125, 2.7475, -7.464421, 4.494141, 2.70917, -7.550137,
            4.617188, 2.753633, -7.755822, 4.494141, 2.844092, -7.989062, 4.125, 2.94375, -8.070313, 4.125, 0,
            -7.972656, 4.494141, 0, -8.085938, 4.617188, 0, -8.316406, 4.494141, 0, -8.570313, 4.125, 0,
            -8.070313, 4.125, 0, -7.527812, 4.125, -2.7475, -7.437724, 4.494141, -2.70917, -7.972656, 4.494141,
            0, -7.542227, 4.617188, -2.753633, -8.085938, 4.617188, 0, -7.754834, 4.494141, -2.844092, -8.316406,
            4.494141, 0, -7.989062, 4.125, -2.94375, -8.570313, 4.125, 0, -6.040312, 4.125, -4.97, -5.970977,
            4.494141, -4.900664, -6.051406, 4.617188, -4.981094, -6.215039, 4.494141, -5.144727, -6.395312,
            4.125, -5.325, -3.817812, 4.125, -6.4575, -3.779482, 4.494141, -6.367412, -3.823945, 4.617188,
            -6.471914, -3.914404, 4.494141, -6.684522, -4.014062, 4.125, -6.91875, -1.070312, 4.125, -7,
            -1.070312, 4.494141, -6.902344, -1.070312, 4.617188, -7.015625, -1.070312, 4.494141, -7.246094,
            -1.070312, 4.125, -7.5, -1.070312, 4.125, -7, 1.677188, 4.125, -6.4575, 1.638858, 4.494141,
            -6.367412, -1.070312, 4.494141, -6.902344, 1.68332, 4.617188, -6.471914, -1.070312, 4.617188,
            -7.015625, 1.77378, 4.494141, -6.684522, -1.070312, 4.494141, -7.246094, 1.873438, 4.125, -6.91875,
            -1.070312, 4.125, -7.5, 3.899688, 4.125, -4.97, 3.830352, 4.494141, -4.900664, 3.910782, 4.617188,
            -4.981094, 4.074414, 4.494141, -5.144727, 4.254687, 4.125, -5.325, 5.387188, 4.125, -2.7475, 5.2971,
            4.494141, -2.70917, 5.401602, 4.617188, -2.753633, 5.614209, 4.494141, -2.844092, 5.848437, 4.125,
            -2.94375, 5.929688, 4.125, 0, 5.832031, 4.494141, 0, 5.945313, 4.617188, 0, 6.175781, 4.494141, 0,
            6.429688, 4.125, 0, 6.429688, 4.125, 0, 5.848437, 4.125, 2.94375, 6.695264, 2.162109, 3.304053,
            7.347656, 2.162109, 0, 7.433985, 0.234375, 3.61836, 8.148438, 0.234375, 0, 7.956494, -1.623047,
            3.840674, 8.714844, -1.623047, 0, 8.154688, -3.375, 3.925, 8.929688, -3.375, 0, 4.254687, 4.125,
            5.325, 4.906446, 2.162109, 5.976758, 5.475, 0.234375, 6.545312, 5.877149, -1.623047, 6.947461,
            6.029688, -3.375, 7.1, 1.873438, 4.125, 6.91875, 2.23374, 2.162109, 7.765576, 2.548047, 0.234375,
            8.504297, 2.770362, -1.623047, 9.026807, 2.854688, -3.375, 9.225, -1.070312, 4.125, 7.5, -1.070312,
            2.162109, 8.417969, -1.070312, 0.234375, 9.21875, -1.070312, -1.623047, 9.785156, -1.070312, -3.375,
            10, -1.070312, 4.125, 7.5, -4.014062, 4.125, 6.91875, -4.374365, 2.162109, 7.765576, -1.070312,
            2.162109, 8.417969, -4.688672, 0.234375, 8.504297, -1.070312, 0.234375, 9.21875, -4.910986,
            -1.623047, 9.026807, -1.070312, -1.623047, 9.785156, -4.995313, -3.375, 9.225, -1.070312, -3.375, 10,
            -6.395312, 4.125, 5.325, -7.047071, 2.162109, 5.976758, -7.615624, 0.234375, 6.545312, -8.017773,
            -1.623047, 6.947461, -8.170312, -3.375, 7.1, -7.989062, 4.125, 2.94375, -8.835889, 2.162109,
            3.304053, -9.57461, 0.234375, 3.61836, -10.097119, -1.623047, 3.840674, -10.295313, -3.375, 3.925,
            -8.570313, 4.125, 0, -9.488281, 2.162109, 0, -10.289063, 0.234375, 0, -10.855469, -1.623047, 0,
            -11.070313, -3.375, 0, -8.570313, 4.125, 0, -7.989062, 4.125, -2.94375, -8.835889, 2.162109,
            -3.304053, -9.488281, 2.162109, 0, -9.57461, 0.234375, -3.61836, -10.289063, 0.234375, 0, -10.097119,
            -1.623047, -3.840674, -10.855469, -1.623047, 0, -10.295313, -3.375, -3.925, -11.070313, -3.375, 0,
            -6.395312, 4.125, -5.325, -7.047071, 2.162109, -5.976758, -7.615624, 0.234375, -6.545312, -8.017773,
            -1.623047, -6.947461, -8.170312, -3.375, -7.1, -4.014062, 4.125, -6.91875, -4.374365, 2.162109,
            -7.765576, -4.688672, 0.234375, -8.504297, -4.910986, -1.623047, -9.026807, -4.995313, -3.375,
            -9.225, -1.070312, 4.125, -7.5, -1.070312, 2.162109, -8.417969, -1.070312, 0.234375, -9.21875,
            -1.070312, -1.623047, -9.785156, -1.070312, -3.375, -10, -1.070312, 4.125, -7.5, 1.873438, 4.125,
            -6.91875, 2.23374, 2.162109, -7.765576, -1.070312, 2.162109, -8.417969, 2.548047, 0.234375,
            -8.504297, -1.070312, 0.234375, -9.21875, 2.770362, -1.623047, -9.026807, -1.070312, -1.623047,
            -9.785156, 2.854688, -3.375, -9.225, -1.070312, -3.375, -10, 4.254687, 4.125, -5.325, 4.906446,
            2.162109, -5.976758, 5.475, 0.234375, -6.545312, 5.877149, -1.623047, -6.947461, 6.029688, -3.375,
            -7.1, 5.848437, 4.125, -2.94375, 6.695264, 2.162109, -3.304053, 7.433985, 0.234375, -3.61836,
            7.956494, -1.623047, -3.840674, 8.154688, -3.375, -3.925, 6.429688, 4.125, 0, 7.347656, 2.162109, 0,
            8.148438, 0.234375, 0, 8.714844, -1.623047, 0, 8.929688, -3.375, 0, 8.929688, -3.375, 0, 8.154688,
            -3.375, 3.925, 7.794336, -4.857422, 3.77168, 8.539063, -4.857422, 0, 7.001562, -5.953125, 3.434375,
            7.679688, -5.953125, 0, 6.208789, -6.697266, 3.09707, 6.820313, -6.697266, 0, 5.848437, -7.125,
            2.94375, 6.429688, -7.125, 0, 6.029688, -3.375, 7.1, 5.752343, -4.857422, 6.822656, 5.142187,
            -5.953125, 6.2125, 4.532031, -6.697266, 5.602344, 4.254687, -7.125, 5.325, 2.854688, -3.375, 9.225,
            2.701367, -4.857422, 8.864649, 2.364063, -5.953125, 8.071875, 2.026758, -6.697266, 7.279101,
            1.873438, -7.125, 6.91875, -1.070312, -3.375, 10, -1.070312, -4.857422, 9.609375, -1.070312,
            -5.953125, 8.75, -1.070312, -6.697266, 7.890625, -1.070312, -7.125, 7.5, -1.070312, -3.375, 10,
            -4.995313, -3.375, 9.225, -4.841992, -4.857422, 8.864649, -1.070312, -4.857422, 9.609375, -4.504687,
            -5.953125, 8.071875, -1.070312, -5.953125, 8.75, -4.167383, -6.697266, 7.279101, -1.070312,
            -6.697266, 7.890625, -4.014062, -7.125, 6.91875, -1.070312, -7.125, 7.5, -8.170312, -3.375, 7.1,
            -7.892968, -4.857422, 6.822656, -7.282812, -5.953125, 6.2125, -6.672656, -6.697266, 5.602344,
            -6.395312, -7.125, 5.325, -10.295313, -3.375, 3.925, -9.934961, -4.857422, 3.77168, -9.142187,
            -5.953125, 3.434375, -8.349414, -6.697266, 3.09707, -7.989062, -7.125, 2.94375, -11.070313, -3.375,
            0, -10.679688, -4.857422, 0, -9.820313, -5.953125, 0, -8.960938, -6.697266, 0, -8.570313, -7.125, 0,
            -11.070313, -3.375, 0, -10.295313, -3.375, -3.925, -9.934961, -4.857422, -3.77168, -10.679688,
            -4.857422, 0, -9.142187, -5.953125, -3.434375, -9.820313, -5.953125, 0, -8.349414, -6.697266,
            -3.09707, -8.960938, -6.697266, 0, -7.989062, -7.125, -2.94375, -8.570313, -7.125, 0, -8.170312,
            -3.375, -7.1, -7.892968, -4.857422, -6.822656, -7.282812, -5.953125, -6.2125, -6.672656, -6.697266,
            -5.602344, -6.395312, -7.125, -5.325, -4.995313, -3.375, -9.225, -4.841992, -4.857422, -8.864649,
            -4.504687, -5.953125, -8.071875, -4.167383, -6.697266, -7.279101, -4.014062, -7.125, -6.91875,
            -1.070312, -3.375, -10, -1.070312, -4.857422, -9.609375, -1.070312, -5.953125, -8.75, -1.070312,
            -6.697266, -7.890625, -1.070312, -7.125, -7.5, -1.070312, -3.375, -10, 2.854688, -3.375, -9.225,
            2.701367, -4.857422, -8.864649, -1.070312, -4.857422, -9.609375, 2.364063, -5.953125, -8.071875,
            -1.070312, -5.953125, -8.75, 2.026758, -6.697266, -7.279101, -1.070312, -6.697266, -7.890625,
            1.873438, -7.125, -6.91875, -1.070312, -7.125, -7.5, 6.029688, -3.375, -7.1, 5.752343, -4.857422,
            -6.822656, 5.142187, -5.953125, -6.2125, 4.532031, -6.697266, -5.602344, 4.254687, -7.125, -5.325,
            8.154688, -3.375, -3.925, 7.794336, -4.857422, -3.77168, 7.001562, -5.953125, -3.434375, 6.208789,
            -6.697266, -3.09707, 5.848437, -7.125, -2.94375, 8.929688, -3.375, 0, 8.539063, -4.857422, 0,
            7.679688, -5.953125, 0, 6.820313, -6.697266, 0, 6.429688, -7.125, 0, 6.429688, -7.125, 0, 5.848437,
            -7.125, 2.94375, 5.691685, -7.400391, 2.877056, 6.259766, -7.400391, 0, 4.853868, -7.640625,
            2.520586, 5.351563, -7.640625, 0, 2.783648, -7.810547, 1.639761, 3.107422, -7.810547, 0, -1.070312,
            -7.875, 0, 4.254687, -7.125, 5.325, 4.134043, -7.400391, 5.204355, 3.489219, -7.640625, 4.559531,
            1.895879, -7.810547, 2.966191, -1.070312, -7.875, 0, 1.873438, -7.125, 6.91875, 1.806743, -7.400391,
            6.761997, 1.450274, -7.640625, 5.92418, 0.569448, -7.810547, 3.85396, -1.070312, -7.875, 0,
            -1.070312, -7.125, 7.5, -1.070312, -7.400391, 7.330078, -1.070312, -7.640625, 6.421875, -1.070312,
            -7.810547, 4.177734, -1.070312, -7.875, 0, -1.070312, -7.125, 7.5, -4.014062, -7.125, 6.91875,
            -3.947368, -7.400391, 6.761997, -1.070312, -7.400391, 7.330078, -3.590898, -7.640625, 5.92418,
            -1.070312, -7.640625, 6.421875, -2.710073, -7.810547, 3.85396, -1.070312, -7.810547, 4.177734,
            -1.070312, -7.875, 0, -6.395312, -7.125, 5.325, -6.274668, -7.400391, 5.204355, -5.629844, -7.640625,
            4.559531, -4.036504, -7.810547, 2.966191, -1.070312, -7.875, 0, -7.989062, -7.125, 2.94375,
            -7.832309, -7.400391, 2.877056, -6.994492, -7.640625, 2.520586, -4.924272, -7.810547, 1.639761,
            -1.070312, -7.875, 0, -8.570313, -7.125, 0, -8.400391, -7.400391, 0, -7.492188, -7.640625, 0,
            -5.248047, -7.810547, 0, -1.070312, -7.875, 0, -8.570313, -7.125, 0, -7.989062, -7.125, -2.94375,
            -7.832309, -7.400391, -2.877056, -8.400391, -7.400391, 0, -6.994492, -7.640625, -2.520586, -7.492188,
            -7.640625, 0, -4.924272, -7.810547, -1.639761, -5.248047, -7.810547, 0, -1.070312, -7.875, 0,
            -6.395312, -7.125, -5.325, -6.274668, -7.400391, -5.204355, -5.629844, -7.640625, -4.559531,
            -4.036504, -7.810547, -2.966191, -1.070312, -7.875, 0, -4.014062, -7.125, -6.91875, -3.947368,
            -7.400391, -6.761997, -3.590898, -7.640625, -5.92418, -2.710073, -7.810547, -3.85396, -1.070312,
            -7.875, 0, -1.070312, -7.125, -7.5, -1.070312, -7.400391, -7.330078, -1.070312, -7.640625, -6.421875,
            -1.070312, -7.810547, -4.177734, -1.070312, -7.875, 0, -1.070312, -7.125, -7.5, 1.873438, -7.125,
            -6.91875, 1.806743, -7.400391, -6.761997, -1.070312, -7.400391, -7.330078, 1.450274, -7.640625,
            -5.92418, -1.070312, -7.640625, -6.421875, 0.569448, -7.810547, -3.85396, -1.070312, -7.810547,
            -4.177734, -1.070312, -7.875, 0, 4.254687, -7.125, -5.325, 4.134043, -7.400391, -5.204355, 3.489219,
            -7.640625, -4.559531, 1.895879, -7.810547, -2.966191, -1.070312, -7.875, 0, 5.848437, -7.125,
            -2.94375, 5.691685, -7.400391, -2.877056, 4.853868, -7.640625, -2.520586, 2.783648, -7.810547,
            -1.639761, -1.070312, -7.875, 0, 6.429688, -7.125, 0, 6.259766, -7.400391, 0, 5.351563, -7.640625, 0,
            3.107422, -7.810547, 0, -1.070312, -7.875, 0, -9.070313, 2.25, 0, -8.992188, 2.425781, 0.84375,
            -11.47583, 2.405457, 0.84375, -11.40625, 2.232422, 0, -13.298828, 2.263184, 0.84375, -13.132813,
            2.109375, 0, -14.421631, 1.877014, 0.84375, -14.203125, 1.775391, 0, -14.804688, 1.125, 0.84375,
            -14.570313, 1.125, 0, -8.820313, 2.8125, 1.125, -11.628906, 2.786134, 1.125, -13.664063, 2.601563,
            1.125, -14.902344, 2.100586, 1.125, -15.320313, 1.125, 1.125, -8.648438, 3.199219, 0.84375,
            -11.781982, 3.166809, 0.84375, -14.029297, 2.939941, 0.84375, -15.383057, 2.324158, 0.84375,
            -15.835938, 1.125, 0.84375, -8.570313, 3.375, 0, -11.851563, 3.339844, 0, -14.195313, 3.09375, 0,
            -15.601563, 2.425781, 0, -16.070313, 1.125, 0, -8.570313, 3.375, 0, -8.648438, 3.199219, -0.84375,
            -11.781982, 3.166809, -0.84375, -11.851563, 3.339844, 0, -14.029297, 2.939941, -0.84375, -14.195313,
            3.09375, 0, -15.383057, 2.324158, -0.84375, -15.601563, 2.425781, 0, -15.835938, 1.125, -0.84375,
            -16.070313, 1.125, 0, -8.820313, 2.8125, -1.125, -11.628906, 2.786134, -1.125, -13.664063, 2.601563,
            -1.125, -14.902344, 2.100586, -1.125, -15.320313, 1.125, -1.125, -8.992188, 2.425781, -0.84375,
            -11.47583, 2.405457, -0.84375, -13.298828, 2.263184, -0.84375, -14.421631, 1.877014, -0.84375,
            -14.804688, 1.125, -0.84375, -9.070313, 2.25, 0, -11.40625, 2.232422, 0, -13.132813, 2.109375, 0,
            -14.203125, 1.775391, 0, -14.570313, 1.125, 0, -14.570313, 1.125, 0, -14.804688, 1.125, 0.84375,
            -14.588013, 0.00705, 0.84375, -14.375, 0.105469, 0, -13.90918, -1.275146, 0.84375, -13.757813,
            -1.125, 0, -12.724976, -2.540863, 0.84375, -12.671875, -2.355469, 0, -10.992188, -3.609375, 0.84375,
            -11.070313, -3.375, 0, -15.320313, 1.125, 1.125, -15.056641, -0.209473, 1.125, -14.242188, -1.605469,
            1.125, -12.841797, -2.94873, 1.125, -10.820313, -4.125, 1.125, -15.835938, 1.125, 0.84375,
            -15.525269, -0.425995, 0.84375, -14.575195, -1.935791, 0.84375, -12.958618, -3.356598, 0.84375,
            -10.648438, -4.640625, 0.84375, -16.070313, 1.125, 0, -15.738281, -0.524414, 0, -14.726563,
            -2.085938, 0, -13.011719, -3.541992, 0, -10.570313, -4.875, 0, -16.070313, 1.125, 0, -15.835938,
            1.125, -0.84375, -15.525269, -0.425995, -0.84375, -15.738281, -0.524414, 0, -14.575195, -1.935791,
            -0.84375, -14.726563, -2.085938, 0, -12.958618, -3.356598, -0.84375, -13.011719, -3.541992, 0,
            -10.648438, -4.640625, -0.84375, -10.570313, -4.875, 0, -15.320313, 1.125, -1.125, -15.056641,
            -0.209473, -1.125, -14.242188, -1.605469, -1.125, -12.841797, -2.94873, -1.125, -10.820313, -4.125,
            -1.125, -14.804688, 1.125, -0.84375, -14.588013, 0.00705, -0.84375, -13.90918, -1.275146, -0.84375,
            -12.724976, -2.540863, -0.84375, -10.992188, -3.609375, -0.84375, -14.570313, 1.125, 0, -14.375,
            0.105469, 0, -13.757813, -1.125, 0, -12.671875, -2.355469, 0, -11.070313, -3.375, 0, 7.429688, -0.75,
            0, 7.429688, -1.394531, 1.85625, 10.01123, -0.677124, 1.676074, 9.828125, -0.199219, 0, 11.101563,
            0.84668, 1.279688, 10.867188, 1.125, 0, 11.723145, 2.629761, 0.883301, 11.4375, 2.730469, 0,
            12.898438, 4.125, 0.703125, 12.429688, 4.125, 0, 7.429688, -2.8125, 2.475, 10.414063, -1.728516,
            2.234766, 11.617188, 0.234375, 1.70625, 12.351563, 2.408203, 1.177734, 13.929688, 4.125, 0.9375,
            7.429688, -4.230469, 1.85625, 10.816895, -2.779907, 1.676074, 12.132813, -0.37793, 1.279688,
            12.97998, 2.186646, 0.883301, 14.960938, 4.125, 0.703125, 7.429688, -4.875, 0, 11, -3.257813, 0,
            12.367188, -0.65625, 0, 13.265625, 2.085938, 0, 15.429688, 4.125, 0, 7.429688, -4.875, 0, 7.429688,
            -4.230469, -1.85625, 10.816895, -2.779907, -1.676074, 11, -3.257813, 0, 12.132813, -0.37793,
            -1.279688, 12.367188, -0.65625, 0, 12.97998, 2.186646, -0.883301, 13.265625, 2.085938, 0, 14.960938,
            4.125, -0.703125, 15.429688, 4.125, 0, 7.429688, -2.8125, -2.475, 10.414063, -1.728516, -2.234766,
            11.617188, 0.234375, -1.70625, 12.351563, 2.408203, -1.177734, 13.929688, 4.125, -0.9375, 7.429688,
            -1.394531, -1.85625, 10.01123, -0.677124, -1.676074, 11.101563, 0.84668, -1.279688, 11.723145,
            2.629761, -0.883301, 12.898438, 4.125, -0.703125, 7.429688, -0.75, 0, 9.828125, -0.199219, 0,
            10.867188, 1.125, 0, 11.4375, 2.730469, 0, 12.429688, 4.125, 0, 12.429688, 4.125, 0, 12.898438,
            4.125, 0.703125, 13.291077, 4.346237, 0.65918, 12.789063, 4.335938, 0, 13.525879, 4.422729, 0.5625,
            13.054688, 4.40625, 0, 13.532898, 4.350357, 0.46582, 13.132813, 4.335938, 0, 13.242188, 4.125,
            0.421875, 12.929688, 4.125, 0, 13.929688, 4.125, 0.9375, 14.395508, 4.368896, 0.878906, 14.5625,
            4.458984, 0.75, 14.413086, 4.38208, 0.621094, 13.929688, 4.125, 0.5625, 14.960938, 4.125, 0.703125,
            15.499939, 4.391556, 0.65918, 15.599121, 4.495239, 0.5625, 15.293274, 4.413804, 0.46582, 14.617188,
            4.125, 0.421875, 15.429688, 4.125, 0, 16.001953, 4.401855, 0, 16.070313, 4.511719, 0, 15.693359,
            4.428224, 0, 14.929688, 4.125, 0, 15.429688, 4.125, 0, 14.960938, 4.125, -0.703125, 15.499939,
            4.391556, -0.65918, 16.001953, 4.401855, 0, 15.599121, 4.495239, -0.5625, 16.070313, 4.511719, 0,
            15.293274, 4.413804, -0.46582, 15.693359, 4.428224, 0, 14.617188, 4.125, -0.421875, 14.929688, 4.125,
            0, 13.929688, 4.125, -0.9375, 14.395508, 4.368896, -0.878906, 14.5625, 4.458984, -0.75, 14.413086,
            4.38208, -0.621094, 13.929688, 4.125, -0.5625, 12.898438, 4.125, -0.703125, 13.291077, 4.346237,
            -0.65918, 13.525879, 4.422729, -0.5625, 13.532898, 4.350357, -0.46582, 13.242188, 4.125, -0.421875,
            12.429688, 4.125, 0, 12.789063, 4.335938, 0, 13.054688, 4.40625, 0, 13.132813, 4.335938, 0,
            12.929688, 4.125, 0, 0.501414, 7.628906, 0.670256, 0.632813, 7.628906, 0, -1.070312, 7.875, 0,
            0.429278, 7.03125, 0.639395, 0.554688, 7.03125, 0, -0.162029, 6.292969, 0.38696, -0.085937, 6.292969,
            0, -0.147812, 5.625, 0.3925, -0.070312, 5.625, 0, 0.140489, 7.628906, 1.210801, -1.070312, 7.875, 0,
            0.084844, 7.03125, 1.155156, -0.370879, 6.292969, 0.699434, -0.360312, 5.625, 0.71, -0.400056,
            7.628906, 1.571726, -1.070312, 7.875, 0, -0.430918, 7.03125, 1.49959, -0.683352, 6.292969, 0.908284,
            -0.677812, 5.625, 0.9225, -1.070312, 7.628906, 1.703125, -1.070312, 7.875, 0, -1.070312, 7.03125,
            1.625, -1.070312, 6.292969, 0.984375, -1.070312, 5.625, 1, -1.740569, 7.628906, 1.571726, -1.070312,
            7.628906, 1.703125, -1.070312, 7.875, 0, -1.709707, 7.03125, 1.49959, -1.070312, 7.03125, 1.625,
            -1.457273, 6.292969, 0.908284, -1.070312, 6.292969, 0.984375, -1.462812, 5.625, 0.9225, -1.070312,
            5.625, 1, -2.281113, 7.628906, 1.210801, -1.070312, 7.875, 0, -2.225469, 7.03125, 1.155156,
            -1.769746, 6.292969, 0.699434, -1.780312, 5.625, 0.71, -2.642038, 7.628906, 0.670256, -1.070312,
            7.875, 0, -2.569902, 7.03125, 0.639395, -1.978596, 6.292969, 0.38696, -1.992812, 5.625, 0.3925,
            -2.773438, 7.628906, 0, -1.070312, 7.875, 0, -2.695313, 7.03125, 0, -2.054687, 6.292969, 0,
            -2.070312, 5.625, 0, -2.642038, 7.628906, -0.670256, -2.773438, 7.628906, 0, -1.070312, 7.875, 0,
            -2.569902, 7.03125, -0.639395, -2.695313, 7.03125, 0, -1.978596, 6.292969, -0.38696, -2.054687,
            6.292969, 0, -1.992812, 5.625, -0.3925, -2.070312, 5.625, 0, -2.281113, 7.628906, -1.210801,
            -1.070312, 7.875, 0, -2.225469, 7.03125, -1.155156, -1.769746, 6.292969, -0.699434, -1.780312, 5.625,
            -0.71, -1.740569, 7.628906, -1.571726, -1.070312, 7.875, 0, -1.709707, 7.03125, -1.49959, -1.457273,
            6.292969, -0.908284, -1.462812, 5.625, -0.9225, -1.070312, 7.628906, -1.703125, -1.070312, 7.875, 0,
            -1.070312, 7.03125, -1.625, -1.070312, 6.292969, -0.984375, -1.070312, 5.625, -1, -0.400056,
            7.628906, -1.571726, -1.070312, 7.628906, -1.703125, -1.070312, 7.875, 0, -0.430918, 7.03125,
            -1.49959, -1.070312, 7.03125, -1.625, -0.683352, 6.292969, -0.908284, -1.070312, 6.292969, -0.984375,
            -0.677812, 5.625, -0.9225, -1.070312, 5.625, -1, 0.140489, 7.628906, -1.210801, -1.070312, 7.875, 0,
            0.084844, 7.03125, -1.155156, -0.370879, 6.292969, -0.699434, -0.360312, 5.625, -0.71, 0.501414,
            7.628906, -0.670256, -1.070312, 7.875, 0, 0.429278, 7.03125, -0.639395, -0.162029, 6.292969,
            -0.38696, -0.147812, 5.625, -0.3925, 0.632813, 7.628906, 0, -1.070312, 7.875, 0, 0.554688, 7.03125,
            0, -0.085937, 6.292969, 0, -0.070312, 5.625, 0, -0.070312, 5.625, 0, -0.147812, 5.625, 0.3925,
            1.034141, 5.179688, 0.895391, 1.210938, 5.179688, 0, 2.735, 4.875, 1.619062, 3.054688, 4.875, 0,
            4.262891, 4.570313, 2.26914, 4.710938, 4.570313, 0, 4.925938, 4.125, 2.55125, 5.429688, 4.125, 0,
            -0.360312, 5.625, 0.71, 0.549375, 5.179688, 1.619688, 1.858438, 4.875, 2.92875, 3.034375, 4.570313,
            4.104687, 3.544688, 4.125, 4.615, -0.677812, 5.625, 0.9225, -0.174922, 5.179688, 2.104453, 0.54875,
            4.875, 3.805313, 1.198828, 4.570313, 5.333203, 1.480938, 4.125, 5.99625, -1.070312, 5.625, 1,
            -1.070312, 5.179688, 2.28125, -1.070312, 4.875, 4.125, -1.070312, 4.570313, 5.78125, -1.070312,
            4.125, 6.5, -1.070312, 5.625, 1, -1.462812, 5.625, 0.9225, -1.965703, 5.179688, 2.104453, -1.070312,
            5.179688, 2.28125, -2.689375, 4.875, 3.805313, -1.070312, 4.875, 4.125, -3.339453, 4.570313,
            5.333203, -1.070312, 4.570313, 5.78125, -3.621562, 4.125, 5.99625, -1.070312, 4.125, 6.5, -1.780312,
            5.625, 0.71, -2.69, 5.179688, 1.619688, -3.999062, 4.875, 2.92875, -5.174999, 4.570313, 4.104687,
            -5.685312, 4.125, 4.615, -1.992812, 5.625, 0.3925, -3.174765, 5.179688, 0.895391, -4.875625, 4.875,
            1.619062, -6.403516, 4.570313, 2.26914, -7.066563, 4.125, 2.55125, -2.070312, 5.625, 0, -3.351562,
            5.179688, 0, -5.195313, 4.875, 0, -6.851563, 4.570313, 0, -7.570313, 4.125, 0, -2.070312, 5.625, 0,
            -1.992812, 5.625, -0.3925, -3.174765, 5.179688, -0.895391, -3.351562, 5.179688, 0, -4.875625, 4.875,
            -1.619062, -5.195313, 4.875, 0, -6.403516, 4.570313, -2.26914, -6.851563, 4.570313, 0, -7.066563,
            4.125, -2.55125, -7.570313, 4.125, 0, -1.780312, 5.625, -0.71, -2.69, 5.179688, -1.619688, -3.999062,
            4.875, -2.92875, -5.174999, 4.570313, -4.104687, -5.685312, 4.125, -4.615, -1.462812, 5.625, -0.9225,
            -1.965703, 5.179688, -2.104453, -2.689375, 4.875, -3.805313, -3.339453, 4.570313, -5.333203,
            -3.621562, 4.125, -5.99625, -1.070312, 5.625, -1, -1.070312, 5.179688, -2.28125, -1.070312, 4.875,
            -4.125, -1.070312, 4.570313, -5.78125, -1.070312, 4.125, -6.5, -1.070312, 5.625, -1, -0.677812,
            5.625, -0.9225, -0.174922, 5.179688, -2.104453, -1.070312, 5.179688, -2.28125, 0.54875, 4.875,
            -3.805313, -1.070312, 4.875, -4.125, 1.198828, 4.570313, -5.333203, -1.070312, 4.570313, -5.78125,
            1.480938, 4.125, -5.99625, -1.070312, 4.125, -6.5, -0.360312, 5.625, -0.71, 0.549375, 5.179688,
            -1.619688, 1.858438, 4.875, -2.92875, 3.034375, 4.570313, -4.104687, 3.544688, 4.125, -4.615,
            -0.147812, 5.625, -0.3925, 1.034141, 5.179688, -0.895391, 2.735, 4.875, -1.619062, 4.262891,
            4.570313, -2.26914, 4.925938, 4.125, -2.55125, -0.070312, 5.625, 0, 1.210938, 5.179688, 0, 3.054688,
            4.875, 0, 4.710938, 4.570313, 0, 5.429688, 4.125, 0]);
        this._vertexNormals = new Float32Array([-0.966742, -0.255752, 0, -0.893014, -0.256345, -0.369882, -0.893437, 0.255996,
            -0.369102, -0.966824, 0.255443, 0, -0.083877, 0.995843, -0.035507, -0.092052, 0.995754, 0, 0.629724,
            0.73186, 0.260439, 0.68205, 0.731305, 0, 0.803725, 0.49337, 0.332584, 0.870301, 0.492521, 0,
            -0.683407, -0.256728, -0.683407, -0.683531, 0.256068, -0.683531, -0.064925, 0.995776, -0.064925,
            0.481399, 0.732469, 0.481399, 0.614804, 0.493997, 0.614804, -0.369882, -0.256345, -0.893014,
            -0.369102, 0.255996, -0.893437, -0.035507, 0.995843, -0.083877, 0.260439, 0.73186, 0.629724,
            0.332584, 0.493369, 0.803725, -0.002848, -0.257863, -0.966177, -0.001923, 0.254736, -0.967009,
            -0.000266, 0.995734, -0.09227, 0.000024, 0.731295, 0.682061, 0, 0.492521, 0.870301, -0.002848,
            -0.257863, -0.966177, 0.379058, -0.3593, -0.852771, 0.37711, 0.149085, -0.914091, -0.001923,
            0.254736, -0.967009, 0.027502, 0.992081, -0.122552, -0.000266, 0.995734, -0.09227, -0.26101,
            0.726762, 0.635367, 0.000024, 0.731295, 0.682061, -0.332485, 0.492546, 0.804271, 0, 0.492521,
            0.870301, 0.663548, -0.41079, -0.625264, 0.712664, 0.073722, -0.697621, 0.099726, 0.987509,
            -0.121983, -0.48732, 0.723754, 0.488569, -0.615242, 0.492602, 0.615484, 0.880028, -0.332906,
            -0.338709, 0.917276, 0.167113, -0.361493, 0.113584, 0.992365, -0.04807, -0.63415, 0.727508, 0.261889,
            -0.804126, 0.492634, 0.332705, 0.96669, -0.255738, 0.010454, 0.967442, 0.252962, 0.008103, 0.093436,
            0.995624, 0.001281, -0.682167, 0.731196, -0.000343, -0.870322, 0.492483, -0.000054, 0.96669,
            -0.255738, 0.010454, 0.893014, -0.256345, 0.369882, 0.893437, 0.255996, 0.369102, 0.967442, 0.252962,
            0.008103, 0.083877, 0.995843, 0.035507, 0.093436, 0.995624, 0.001281, -0.629724, 0.73186, -0.260439,
            -0.682167, 0.731196, -0.000343, -0.803725, 0.49337, -0.332584, -0.870322, 0.492483, -0.000054,
            0.683407, -0.256728, 0.683407, 0.683531, 0.256068, 0.683531, 0.064925, 0.995776, 0.064925, -0.481399,
            0.732469, -0.481399, -0.614804, 0.493997, -0.614804, 0.369882, -0.256345, 0.893014, 0.369102,
            0.255996, 0.893437, 0.035507, 0.995843, 0.083877, -0.260439, 0.73186, -0.629724, -0.332584, 0.493369,
            -0.803725, 0, -0.255752, 0.966742, 0, 0.255443, 0.966824, 0, 0.995754, 0.092052, 0, 0.731305,
            -0.68205, 0, 0.492521, -0.870301, 0, -0.255752, 0.966742, -0.369882, -0.256345, 0.893014, -0.369102,
            0.255996, 0.893437, 0, 0.255443, 0.966824, -0.035507, 0.995843, 0.083877, 0, 0.995754, 0.092052,
            0.260439, 0.73186, -0.629724, 0, 0.731305, -0.68205, 0.332584, 0.49337, -0.803725, 0, 0.492521,
            -0.870301, -0.683407, -0.256728, 0.683407, -0.683531, 0.256068, 0.683531, -0.064925, 0.995776,
            0.064925, 0.481399, 0.732469, -0.481399, 0.614804, 0.493997, -0.614804, -0.893014, -0.256345,
            0.369882, -0.893437, 0.255996, 0.369102, -0.083877, 0.995843, 0.035507, 0.629724, 0.73186, -0.260439,
            0.803725, 0.493369, -0.332584, -0.966742, -0.255752, 0, -0.966824, 0.255443, 0, -0.092052, 0.995754,
            0, 0.68205, 0.731305, 0, 0.870301, 0.492521, 0, 0.870301, 0.492521, 0, 0.803725, 0.49337, 0.332584,
            0.845438, 0.403546, 0.349835, 0.915321, 0.402725, 0, 0.869996, 0.336859, 0.360047, 0.941808,
            0.336151, 0, 0.904193, 0.205791, 0.37428, 0.97869, 0.205342, 0, 0.921879, -0.06637, 0.381752,
            0.997804, -0.06624, 0, 0.614804, 0.493997, 0.614804, 0.646802, 0.404096, 0.646802, 0.665655,
            0.337351, 0.665655, 0.691923, 0.20612, 0.691923, 0.705543, -0.06648, 0.705542, 0.332584, 0.493369,
            0.803725, 0.349835, 0.403546, 0.845438, 0.360047, 0.336859, 0.869996, 0.37428, 0.205791, 0.904193,
            0.381752, -0.066369, 0.921879, 0, 0.492521, 0.870301, 0, 0.402725, 0.915321, 0, 0.336151, 0.941808,
            0, 0.205342, 0.97869, 0, -0.06624, 0.997804, 0, 0.492521, 0.870301, -0.332485, 0.492546, 0.804271,
            -0.349835, 0.403546, 0.845438, 0, 0.402725, 0.915321, -0.360047, 0.336859, 0.869996, 0, 0.336151,
            0.941808, -0.37428, 0.205791, 0.904193, 0, 0.205342, 0.97869, -0.381752, -0.06637, 0.921879, 0,
            -0.06624, 0.997804, -0.615242, 0.492602, 0.615484, -0.646802, 0.404096, 0.646802, -0.665655,
            0.337351, 0.665655, -0.691923, 0.20612, 0.691923, -0.705542, -0.06648, 0.705543, -0.804126, 0.492634,
            0.332705, -0.845438, 0.403546, 0.349835, -0.869996, 0.336859, 0.360047, -0.904193, 0.205791, 0.37428,
            -0.921879, -0.066369, 0.381752, -0.870322, 0.492483, -0.000054, -0.915321, 0.402725, 0, -0.941808,
            0.336151, 0, -0.97869, 0.205342, 0, -0.997804, -0.06624, 0, -0.870322, 0.492483, -0.000054,
            -0.803725, 0.49337, -0.332584, -0.845438, 0.403546, -0.349835, -0.915321, 0.402725, 0, -0.869996,
            0.336859, -0.360047, -0.941808, 0.336151, 0, -0.904193, 0.205791, -0.37428, -0.97869, 0.205342, 0,
            -0.921879, -0.06637, -0.381752, -0.997804, -0.06624, 0, -0.614804, 0.493997, -0.614804, -0.646802,
            0.404096, -0.646802, -0.665655, 0.337351, -0.665655, -0.691923, 0.20612, -0.691923, -0.705543,
            -0.06648, -0.705542, -0.332584, 0.493369, -0.803725, -0.349835, 0.403546, -0.845438, -0.360047,
            0.336859, -0.869996, -0.37428, 0.205791, -0.904193, -0.381752, -0.066369, -0.921879, 0, 0.492521,
            -0.870301, 0, 0.402725, -0.915321, 0, 0.336151, -0.941808, 0, 0.205342, -0.97869, 0, -0.06624,
            -0.997804, 0, 0.492521, -0.870301, 0.332584, 0.49337, -0.803725, 0.349835, 0.403546, -0.845438, 0,
            0.402725, -0.915321, 0.360047, 0.336859, -0.869996, 0, 0.336151, -0.941808, 0.37428, 0.205791,
            -0.904193, 0, 0.205342, -0.97869, 0.381752, -0.06637, -0.921879, 0, -0.06624, -0.997804, 0.614804,
            0.493997, -0.614804, 0.646802, 0.404096, -0.646802, 0.665655, 0.337351, -0.665655, 0.691923, 0.20612,
            -0.691923, 0.705542, -0.06648, -0.705543, 0.803725, 0.493369, -0.332584, 0.845438, 0.403546,
            -0.349835, 0.869996, 0.336859, -0.360047, 0.904193, 0.205791, -0.37428, 0.921879, -0.066369,
            -0.381752, 0.870301, 0.492521, 0, 0.915321, 0.402725, 0, 0.941808, 0.336151, 0, 0.97869, 0.205342, 0,
            0.997804, -0.06624, 0, 0.997804, -0.06624, 0, 0.921879, -0.06637, 0.381752, 0.831437, -0.43618,
            0.344179, 0.900182, -0.435513, 0, 0.673512, -0.684666, 0.278594, 0.729611, -0.683863, 0, 0.640399,
            -0.720924, 0.264874, 0.693951, -0.720022, 0, 0.732949, -0.608995, 0.303167, 0.79395, -0.607983, 0,
            0.705543, -0.06648, 0.705542, 0.636092, -0.436778, 0.636092, 0.514965, -0.68529, 0.514965, 0.489651,
            -0.721446, 0.489651, 0.560555, -0.609554, 0.560555, 0.381752, -0.066369, 0.921879, 0.344179,
            -0.43618, 0.831437, 0.278595, -0.684666, 0.673512, 0.264874, -0.720924, 0.640399, 0.303167,
            -0.608995, 0.732949, 0, -0.06624, 0.997804, 0, -0.435513, 0.900182, 0, -0.683863, 0.729611, 0,
            -0.720022, 0.693951, 0, -0.607983, 0.79395, 0, -0.06624, 0.997804, -0.381752, -0.06637, 0.921879,
            -0.344179, -0.43618, 0.831437, 0, -0.435513, 0.900182, -0.278594, -0.684666, 0.673512, 0, -0.683863,
            0.729611, -0.264874, -0.720924, 0.640399, 0, -0.720022, 0.693951, -0.303167, -0.608995, 0.732949, 0,
            -0.607983, 0.79395, -0.705542, -0.06648, 0.705543, -0.636092, -0.436778, 0.636092, -0.514965,
            -0.68529, 0.514965, -0.489651, -0.721446, 0.489651, -0.560555, -0.609554, 0.560555, -0.921879,
            -0.066369, 0.381752, -0.831437, -0.43618, 0.344179, -0.673512, -0.684666, 0.278595, -0.640399,
            -0.720924, 0.264874, -0.732949, -0.608995, 0.303167, -0.997804, -0.06624, 0, -0.900182, -0.435513, 0,
            -0.729611, -0.683863, 0, -0.693951, -0.720022, 0, -0.79395, -0.607983, 0, -0.997804, -0.06624, 0,
            -0.921879, -0.06637, -0.381752, -0.831437, -0.43618, -0.344179, -0.900182, -0.435513, 0, -0.673512,
            -0.684666, -0.278594, -0.729611, -0.683863, 0, -0.640399, -0.720924, -0.264874, -0.693951, -0.720022,
            0, -0.732949, -0.608995, -0.303167, -0.79395, -0.607983, 0, -0.705543, -0.06648, -0.705542,
            -0.636092, -0.436778, -0.636092, -0.514965, -0.68529, -0.514965, -0.489651, -0.721446, -0.489651,
            -0.560555, -0.609554, -0.560555, -0.381752, -0.066369, -0.921879, -0.344179, -0.43618, -0.831437,
            -0.278595, -0.684666, -0.673512, -0.264874, -0.720924, -0.640399, -0.303167, -0.608995, -0.732949, 0,
            -0.06624, -0.997804, 0, -0.435513, -0.900182, 0, -0.683863, -0.729611, 0, -0.720022, -0.693951, 0,
            -0.607983, -0.79395, 0, -0.06624, -0.997804, 0.381752, -0.06637, -0.921879, 0.344179, -0.43618,
            -0.831437, 0, -0.435513, -0.900182, 0.278594, -0.684666, -0.673512, 0, -0.683863, -0.729611,
            0.264874, -0.720924, -0.640399, 0, -0.720022, -0.693951, 0.303167, -0.608995, -0.732949, 0,
            -0.607983, -0.79395, 0.705542, -0.06648, -0.705543, 0.636092, -0.436778, -0.636092, 0.514965,
            -0.68529, -0.514965, 0.489651, -0.721446, -0.489651, 0.560555, -0.609554, -0.560555, 0.921879,
            -0.066369, -0.381752, 0.831437, -0.43618, -0.344179, 0.673512, -0.684666, -0.278595, 0.640399,
            -0.720924, -0.264874, 0.732949, -0.608995, -0.303167, 0.997804, -0.06624, 0, 0.900182, -0.435513, 0,
            0.729611, -0.683863, 0, 0.693951, -0.720022, 0, 0.79395, -0.607983, 0, 0.79395, -0.607983, 0,
            0.732949, -0.608995, 0.303167, 0.57623, -0.781801, 0.238217, 0.62386, -0.781536, 0, 0.163628,
            -0.984208, 0.067527, 0.177291, -0.984159, 0, 0.045422, -0.998792, 0.018736, 0.049207, -0.998789, 0,
            0, -1, 0, 0.560555, -0.609554, 0.560555, 0.440416, -0.782348, 0.440416, 0.124903, -0.984276,
            0.124903, 0.034662, -0.998798, 0.034662, 0, -1, 0, 0.303167, -0.608995, 0.732949, 0.238217,
            -0.781801, 0.57623, 0.067527, -0.984208, 0.163628, 0.018736, -0.998792, 0.045422, 0, -1, 0, 0,
            -0.607983, 0.79395, 0, -0.781536, 0.62386, 0, -0.984159, 0.177291, 0, -0.998789, 0.049207, 0, -1, 0,
            0, -0.607983, 0.79395, -0.303167, -0.608995, 0.732949, -0.238217, -0.781801, 0.57623, 0, -0.781536,
            0.62386, -0.067527, -0.984208, 0.163628, 0, -0.984159, 0.177291, -0.018736, -0.998792, 0.045422, 0,
            -0.998789, 0.049207, 0, -1, 0, -0.560555, -0.609554, 0.560555, -0.440416, -0.782348, 0.440416,
            -0.124903, -0.984276, 0.124903, -0.034662, -0.998798, 0.034662, 0, -1, 0, -0.732949, -0.608995,
            0.303167, -0.57623, -0.781801, 0.238217, -0.163628, -0.984208, 0.067527, -0.045422, -0.998792,
            0.018736, 0, -1, 0, -0.79395, -0.607983, 0, -0.62386, -0.781536, 0, -0.177291, -0.984159, 0,
            -0.049207, -0.998789, 0, 0, -1, 0, -0.79395, -0.607983, 0, -0.732949, -0.608995, -0.303167, -0.57623,
            -0.781801, -0.238217, -0.62386, -0.781536, 0, -0.163628, -0.984208, -0.067527, -0.177291, -0.984159,
            0, -0.045422, -0.998792, -0.018736, -0.049207, -0.998789, 0, 0, -1, 0, -0.560555, -0.609554,
            -0.560555, -0.440416, -0.782348, -0.440416, -0.124903, -0.984276, -0.124903, -0.034662, -0.998798,
            -0.034662, 0, -1, 0, -0.303167, -0.608995, -0.732949, -0.238217, -0.781801, -0.57623, -0.067527,
            -0.984208, -0.163628, -0.018736, -0.998792, -0.045422, 0, -1, 0, 0, -0.607983, -0.79395, 0,
            -0.781536, -0.62386, 0, -0.984159, -0.177291, 0, -0.998789, -0.049207, 0, -1, 0, 0, -0.607983,
            -0.79395, 0.303167, -0.608995, -0.732949, 0.238217, -0.781801, -0.57623, 0, -0.781536, -0.62386,
            0.067527, -0.984208, -0.163628, 0, -0.984159, -0.177291, 0.018736, -0.998792, -0.045422, 0,
            -0.998789, -0.049207, 0, -1, 0, 0.560555, -0.609554, -0.560555, 0.440416, -0.782348, -0.440416,
            0.124903, -0.984276, -0.124903, 0.034662, -0.998798, -0.034662, 0, -1, 0, 0.732949, -0.608995,
            -0.303167, 0.57623, -0.781801, -0.238217, 0.163628, -0.984208, -0.067527, 0.045422, -0.998792,
            -0.018736, 0, -1, 0, 0.79395, -0.607983, 0, 0.62386, -0.781536, 0, 0.177291, -0.984159, 0, 0.049207,
            -0.998789, 0, 0, -1, 0, 0.007786, -0.99997, -0.000216, 0.007039, -0.812495, 0.582926, 0.036127,
            -0.837257, 0.545614, 0.039138, -0.999233, -0.000989, 0.161846, -0.810421, 0.563048, 0.179512,
            -0.983746, -0.004369, 0.482365, -0.595148, 0.642746, 0.612299, -0.790557, -0.01046, 0.73872,
            -0.114594, 0.664199, 0.986152, -0.165708, -0.00667, -0.001909, 0.162121, 0.986769, 0.002762,
            0.017107, 0.99985, 0.010533, 0.073398, 0.997247, -0.066041, 0.13007, 0.989303, -0.094427, 0.016594,
            0.995393, -0.009203, 0.871509, 0.490293, -0.048606, 0.840609, 0.539457, -0.223298, 0.80288, 0.552739,
            -0.596365, 0.559971, 0.575135, -0.803337, 0.068236, 0.591603, -0.010561, 0.999944, 0.000103,
            -0.058798, 0.99827, 0.00071, -0.28071, 0.959787, 0.003269, -0.749723, 0.661738, 0.004268, -0.997351,
            0.072714, 0.002059, -0.010561, 0.999944, 0.000103, -0.008792, 0.871493, -0.49033, -0.046494,
            0.841178, -0.538756, -0.058798, 0.99827, 0.00071, -0.217909, 0.806807, -0.549161, -0.28071, 0.959787,
            0.003269, -0.597291, 0.560026, -0.574121, -0.749723, 0.661738, 0.004268, -0.804, 0.062913, -0.591292,
            -0.997351, 0.072714, 0.002059, -0.001806, 0.161691, -0.98684, 0.002031, 0.014555, -0.999892,
            0.009215, 0.060069, -0.998152, -0.059334, 0.113865, -0.991723, -0.086899, 0.01229, -0.996141,
            0.006418, -0.812379, -0.583095, 0.033783, -0.837512, -0.545373, 0.157113, -0.811947, -0.56219,
            0.484406, -0.589366, -0.646528, 0.73887, -0.10132, -0.666187, 0.007786, -0.99997, -0.000216,
            0.039138, -0.999233, -0.000989, 0.179512, -0.983746, -0.004369, 0.612299, -0.790557, -0.01046,
            0.986152, -0.165708, -0.00667, 0.986152, -0.165708, -0.00667, 0.73872, -0.114594, 0.664199, 0.725608,
            0.259351, 0.637361, 0.946512, 0.32265, -0.003357, 0.645945, 0.461988, 0.607719, 0.82583, 0.56387,
            -0.007452, 0.531615, 0.63666, 0.558614, 0.650011, 0.759893, -0.006937, 0.424964, 0.681717, 0.59554,
            0.532429, 0.846459, -0.005245, -0.094427, 0.016594, 0.995393, -0.049562, -0.019755, 0.998576,
            -0.037816, -0.035624, 0.99865, -0.037914, -0.036512, 0.998614, -0.168854, -0.297945, 0.93953,
            -0.803337, 0.068236, 0.591603, -0.742342, -0.299166, 0.599523, -0.619602, -0.529406, 0.579502,
            -0.483708, -0.68576, 0.543837, -0.445293, -0.794355, 0.413177, -0.997351, 0.072714, 0.002059,
            -0.926513, -0.376258, 0.001996, -0.75392, -0.656952, 0.004317, -0.566224, -0.824244, 0.003461,
            -0.481804, -0.876277, 0.00185, -0.997351, 0.072714, 0.002059, -0.804, 0.062913, -0.591292, -0.744675,
            -0.294425, -0.598977, -0.926513, -0.376258, 0.001996, -0.621949, -0.528114, -0.578165, -0.75392,
            -0.656952, 0.004317, -0.481171, -0.68834, -0.542828, -0.566224, -0.824244, 0.003461, -0.438055,
            -0.797035, -0.415744, -0.481804, -0.876277, 0.00185, -0.086899, 0.01229, -0.996141, -0.044337,
            -0.017056, -0.998871, -0.026176, -0.028166, -0.99926, -0.025294, -0.028332, -0.999278, -0.157482,
            -0.289392, -0.944167, 0.73887, -0.10132, -0.666187, 0.728244, 0.25241, -0.637142, 0.647055, 0.459725,
            -0.608254, 0.522994, 0.640657, -0.56217, 0.409978, 0.682857, -0.604669, 0.986152, -0.165708,
            -0.00667, 0.946512, 0.32265, -0.003357, 0.82583, 0.56387, -0.007452, 0.650011, 0.759893, -0.006937,
            0.532429, 0.846459, -0.005245, -0.230787, 0.972982, -0.006523, -0.152877, 0.687211, 0.71019,
            -0.316721, 0.63775, 0.702113, -0.548936, 0.835863, -0.001511, -0.601067, 0.471452, 0.64533,
            -0.875671, 0.482806, 0.009893, -0.635889, 0.44609, 0.629801, -0.877554, 0.479097, 0.019092,
            -0.435746, 0.601008, 0.670011, -0.69619, 0.717439, 0.024497, 0.111113, -0.08507, 0.99016, 0.22331,
            0.00654, 0.974726, 0.190097, 0.154964, 0.969458, 0.005271, 0.189482, 0.98187, -0.011752, 0.246688,
            0.969024, 0.343906, -0.722796, 0.599412, 0.572489, -0.567656, 0.591627, 0.787436, -0.256459,
            0.560512, 0.647097, -0.306374, 0.698141, 0.427528, -0.499343, 0.753576, 0.410926, -0.911668,
            0.001284, 0.67152, -0.740986, -0.000899, 0.922026, -0.38706, -0.007253, 0.84691, -0.531556,
            -0.013854, 0.535924, -0.844201, -0.010505, 0.410926, -0.911668, 0.001284, 0.341188, -0.722823,
            -0.600931, 0.578664, -0.561139, -0.591838, 0.67152, -0.740986, -0.000899, 0.784869, -0.25102,
            -0.566542, 0.922026, -0.38706, -0.007253, 0.642681, -0.302257, -0.70399, 0.84691, -0.531556,
            -0.013854, 0.418589, -0.500042, -0.758117, 0.535924, -0.844201, -0.010505, 0.115806, -0.079139,
            -0.990114, 0.232811, 0.012565, -0.972441, 0.206662, 0.153601, -0.96628, 0.0245, 0.161443, -0.986578,
            0.003382, 0.211115, -0.977455, -0.134912, 0.687491, -0.713551, -0.31954, 0.633073, -0.705063,
            -0.603902, 0.461442, -0.649903, -0.631815, 0.437169, -0.640072, -0.424306, 0.612706, -0.66675,
            -0.230787, 0.972982, -0.006523, -0.548936, 0.835863, -0.001511, -0.875671, 0.482806, 0.009893,
            -0.877554, 0.479097, 0.019092, -0.69619, 0.717439, 0.024497, -0.69619, 0.717439, 0.024497, -0.435746,
            0.601008, 0.670011, -0.259858, 0.791937, 0.552548, -0.425801, 0.904753, 0.010805, 0.009539, 0.99972,
            -0.021674, 0.022046, 0.999756, 0.001623, 0.410157, 0.332912, -0.849082, 0.999598, 0.025875, 0.011556,
            0.541523, -0.548619, -0.637001, 0.709587, -0.704552, 0.009672, -0.011752, 0.246688, 0.969024,
            0.046311, 0.455223, 0.889172, -0.010688, 0.988794, 0.1489, -0.044376, 0.682946, -0.72912, 0.122824,
            0.009233, -0.992385, 0.427528, -0.499343, 0.753576, 0.481839, -0.18044, 0.85748, 0.455272, 0.736752,
            0.499925, -0.220542, 0.907193, -0.358277, -0.235919, 0.65725, -0.715797, 0.535924, -0.844201,
            -0.010505, 0.728094, -0.6853, -0.015585, 0.888738, 0.458112, -0.016679, -0.260098, 0.965582, 0.0008,
            -0.371611, 0.928378, -0.004418, 0.535924, -0.844201, -0.010505, 0.418589, -0.500042, -0.758117,
            0.480165, -0.178362, -0.858853, 0.728094, -0.6853, -0.015585, 0.488102, 0.716802, -0.497947,
            0.888738, 0.458112, -0.016679, -0.222004, 0.905399, 0.361892, -0.260098, 0.965582, 0.0008, -0.235405,
            0.66318, 0.710477, -0.371611, 0.928378, -0.004418, 0.003382, 0.211115, -0.977455, 0.05872, 0.437702,
            -0.8972, 0.001326, 0.986459, -0.164002, -0.04419, 0.681675, 0.730319, 0.138801, -0.034188, 0.98973,
            -0.424306, 0.612706, -0.66675, -0.25889, 0.797206, -0.54538, 0.01227, 0.999739, 0.019287, 0.398632,
            0.35489, 0.845663, 0.537564, -0.581398, 0.610738, -0.69619, 0.717439, 0.024497, -0.425801, 0.904753,
            0.010805, 0.022046, 0.999756, 0.001623, 0.999598, 0.025875, 0.011556, 0.709587, -0.704552, 0.009672,
            0.76264, 0.565035, 0.314825, 0.82454, 0.565804, 0.000017, 0, 1, 0, 0.847982, -0.397998, 0.350034,
            0.917701, -0.397272, 0.000034, 0.864141, -0.355261, 0.356441, 0.935269, -0.353939, 0.000113,
            0.720992, 0.625625, 0.297933, 0.780712, 0.62489, 0.000075, 0.583357, 0.565165, 0.583338, 0, 1, 0,
            0.648485, -0.398726, 0.648448, 0.660872, -0.355894, 0.660748, 0.551862, 0.62529, 0.55178, 0.314824,
            0.565051, 0.762629, 0, 1, 0, 0.350045, -0.397976, 0.847988, 0.356474, -0.355199, 0.864153, 0.297983,
            0.625515, 0.721067, -0.000017, 0.565804, 0.82454, 0, 1, 0, -0.000034, -0.397272, 0.917701, -0.000113,
            -0.353939, 0.935269, -0.000075, 0.62489, 0.780712, -0.314825, 0.565035, 0.76264, -0.000017, 0.565804,
            0.82454, 0, 1, 0, -0.350034, -0.397998, 0.847982, -0.000034, -0.397272, 0.917701, -0.356441,
            -0.355261, 0.864141, -0.000113, -0.353939, 0.935269, -0.297933, 0.625625, 0.720992, -0.000075,
            0.62489, 0.780712, -0.583338, 0.565165, 0.583357, 0, 1, 0, -0.648448, -0.398726, 0.648485, -0.660748,
            -0.355894, 0.660872, -0.55178, 0.62529, 0.551862, -0.762629, 0.565051, 0.314824, 0, 1, 0, -0.847988,
            -0.397976, 0.350045, -0.864153, -0.355199, 0.356474, -0.721067, 0.625515, 0.297983, -0.82454,
            0.565804, -0.000017, 0, 1, 0, -0.917701, -0.397272, -0.000034, -0.935269, -0.353939, -0.000113,
            -0.780712, 0.62489, -0.000075, -0.76264, 0.565035, -0.314825, -0.82454, 0.565804, -0.000017, 0, 1, 0,
            -0.847982, -0.397998, -0.350034, -0.917701, -0.397272, -0.000034, -0.864141, -0.355261, -0.356441,
            -0.935269, -0.353939, -0.000113, -0.720992, 0.625625, -0.297933, -0.780712, 0.62489, -0.000075,
            -0.583357, 0.565165, -0.583338, 0, 1, 0, -0.648485, -0.398726, -0.648448, -0.660872, -0.355894,
            -0.660748, -0.551862, 0.62529, -0.55178, -0.314824, 0.565051, -0.762629, 0, 1, 0, -0.350045,
            -0.397976, -0.847988, -0.356474, -0.355199, -0.864153, -0.297983, 0.625515, -0.721067, 0.000017,
            0.565804, -0.82454, 0, 1, 0, 0.000034, -0.397272, -0.917701, 0.000113, -0.353939, -0.935269,
            0.000075, 0.62489, -0.780712, 0.314825, 0.565035, -0.76264, 0.000017, 0.565804, -0.82454, 0, 1, 0,
            0.350034, -0.397998, -0.847982, 0.000034, -0.397272, -0.917701, 0.356441, -0.355261, -0.864141,
            0.000113, -0.353939, -0.935269, 0.297933, 0.625625, -0.720992, 0.000075, 0.62489, -0.780712,
            0.583338, 0.565165, -0.583357, 0, 1, 0, 0.648448, -0.398726, -0.648485, 0.660748, -0.355894,
            -0.660872, 0.55178, 0.62529, -0.551862, 0.762629, 0.565051, -0.314824, 0, 1, 0, 0.847988, -0.397976,
            -0.350045, 0.864153, -0.355199, -0.356474, 0.721067, 0.625515, -0.297983, 0.82454, 0.565804,
            0.000017, 0, 1, 0, 0.917701, -0.397272, 0.000034, 0.935269, -0.353939, 0.000113, 0.780712, 0.62489,
            0.000075, 0.780712, 0.62489, 0.000075, 0.720992, 0.625625, 0.297933, 0.217978, 0.971775, 0.090216,
            0.236583, 0.971611, 0, 0.159589, 0.984977, 0.065961, 0.173084, 0.984907, 0, 0.350498, 0.925311,
            0.14474, 0.379703, 0.925108, 0, 0.48559, 0.850653, 0.201474, 0.526673, 0.850068, 0, 0.551862,
            0.62529, 0.55178, 0.166631, 0.971838, 0.166631, 0.121908, 0.985026, 0.121908, 0.267668, 0.925585,
            0.267668, 0.371315, 0.851029, 0.371315, 0.297983, 0.625515, 0.721067, 0.090216, 0.971775, 0.217978,
            0.065961, 0.984977, 0.159589, 0.14474, 0.925311, 0.350498, 0.201475, 0.850653, 0.48559, -0.000075,
            0.62489, 0.780712, 0, 0.971611, 0.236583, 0, 0.984907, 0.173084, 0, 0.925108, 0.379703, 0, 0.850068,
            0.526673, -0.000075, 0.62489, 0.780712, -0.297933, 0.625625, 0.720992, -0.090216, 0.971775, 0.217978,
            0, 0.971611, 0.236583, -0.065961, 0.984977, 0.159589, 0, 0.984907, 0.173084, -0.14474, 0.925311,
            0.350498, 0, 0.925108, 0.379703, -0.201474, 0.850653, 0.48559, 0, 0.850068, 0.526673, -0.55178,
            0.62529, 0.551862, -0.166631, 0.971838, 0.166631, -0.121908, 0.985026, 0.121908, -0.267668, 0.925585,
            0.267668, -0.371315, 0.851029, 0.371315, -0.721067, 0.625515, 0.297983, -0.217978, 0.971775,
            0.090216, -0.159589, 0.984977, 0.065961, -0.350498, 0.925311, 0.14474, -0.48559, 0.850653, 0.201475,
            -0.780712, 0.62489, -0.000075, -0.236583, 0.971611, 0, -0.173084, 0.984907, 0, -0.379703, 0.925108,
            0, -0.526673, 0.850068, 0, -0.780712, 0.62489, -0.000075, -0.720992, 0.625625, -0.297933, -0.217978,
            0.971775, -0.090216, -0.236583, 0.971611, 0, -0.159589, 0.984977, -0.065961, -0.173084, 0.984907, 0,
            -0.350498, 0.925311, -0.14474, -0.379703, 0.925108, 0, -0.48559, 0.850653, -0.201474, -0.526673,
            0.850068, 0, -0.551862, 0.62529, -0.55178, -0.166631, 0.971838, -0.166631, -0.121908, 0.985026,
            -0.121908, -0.267668, 0.925585, -0.267668, -0.371315, 0.851029, -0.371315, -0.297983, 0.625515,
            -0.721067, -0.090216, 0.971775, -0.217978, -0.065961, 0.984977, -0.159589, -0.14474, 0.925311,
            -0.350498, -0.201475, 0.850653, -0.48559, 0.000075, 0.62489, -0.780712, 0, 0.971611, -0.236583, 0,
            0.984907, -0.173084, 0, 0.925108, -0.379703, 0, 0.850068, -0.526673, 0.000075, 0.62489, -0.780712,
            0.297933, 0.625625, -0.720992, 0.090216, 0.971775, -0.217978, 0, 0.971611, -0.236583, 0.065961,
            0.984977, -0.159589, 0, 0.984907, -0.173084, 0.14474, 0.925311, -0.350498, 0, 0.925108, -0.379703,
            0.201474, 0.850653, -0.48559, 0, 0.850068, -0.526673, 0.55178, 0.62529, -0.551862, 0.166631,
            0.971838, -0.166631, 0.121908, 0.985026, -0.121908, 0.267668, 0.925585, -0.267668, 0.371315,
            0.851029, -0.371315, 0.721067, 0.625515, -0.297983, 0.217978, 0.971775, -0.090216, 0.159589,
            0.984977, -0.065961, 0.350498, 0.925311, -0.14474, 0.48559, 0.850653, -0.201475, 0.780712, 0.62489,
            0.000075, 0.236583, 0.971611, 0, 0.173084, 0.984907, 0, 0.379703, 0.925108, 0, 0.526673, 0.850068,
            0]);
        this._vertexUVs = new Float32Array([2, 2, 1.75, 2, 1.75, 1.975, 2, 1.975, 1.75, 1.95, 2, 1.95, 1.75, 1.925,
            2, 1.925, 1.75, 1.9, 2, 1.9, 1.5, 2, 1.5, 1.975, 1.5, 1.95, 1.5, 1.925, 1.5, 1.9, 1.25, 2, 1.25,
            1.975, 1.25, 1.95, 1.25, 1.925, 1.25, 1.9, 1, 2, 1, 1.975, 1, 1.95, 1, 1.925, 1, 1.9, 1, 2, 0.75,
            2, 0.75, 1.975, 1, 1.975, 0.75, 1.95, 1, 1.95, 0.75, 1.925, 1, 1.925, 0.75, 1.9, 1, 1.9, 0.5, 2,
            0.5, 1.975, 0.5, 1.95, 0.5, 1.925, 0.5, 1.9, 0.25, 2, 0.25, 1.975, 0.25, 1.95, 0.25, 1.925, 0.25,
            1.9, 0, 2, 0, 1.975, 0, 1.95, 0, 1.925, 0, 1.9, 2, 2, 1.75, 2, 1.75, 1.975, 2, 1.975, 1.75, 1.95,
            2, 1.95, 1.75, 1.925, 2, 1.925, 1.75, 1.9, 2, 1.9, 1.5, 2, 1.5, 1.975, 1.5, 1.95, 1.5, 1.925,
            1.5, 1.9, 1.25, 2, 1.25, 1.975, 1.25, 1.95, 1.25, 1.925, 1.25, 1.9, 1, 2, 1, 1.975, 1, 1.95, 1,
            1.925, 1, 1.9, 1, 2, 0.75, 2, 0.75, 1.975, 1, 1.975, 0.75, 1.95, 1, 1.95, 0.75, 1.925, 1, 1.925,
            0.75, 1.9, 1, 1.9, 0.5, 2, 0.5, 1.975, 0.5, 1.95, 0.5, 1.925, 0.5, 1.9, 0.25, 2, 0.25, 1.975,
            0.25, 1.95, 0.25, 1.925, 0.25, 1.9, 0, 2, 0, 1.975, 0, 1.95, 0, 1.925, 0, 1.9, 2, 1.9, 1.75, 1.9,
            1.75, 1.675, 2, 1.675, 1.75, 1.45, 2, 1.45, 1.75, 1.225, 2, 1.225, 1.75, 1, 2, 1, 1.5, 1.9, 1.5,
            1.675, 1.5, 1.45, 1.5, 1.225, 1.5, 1, 1.25, 1.9, 1.25, 1.675, 1.25, 1.45, 1.25, 1.225, 1.25, 1,
            1, 1.9, 1, 1.675, 1, 1.45, 1, 1.225, 1, 1, 1, 1.9, 0.75, 1.9, 0.75, 1.675, 1, 1.675, 0.75, 1.45,
            1, 1.45, 0.75, 1.225, 1, 1.225, 0.75, 1, 1, 1, 0.5, 1.9, 0.5, 1.675, 0.5, 1.45, 0.5, 1.225, 0.5,
            1, 0.25, 1.9, 0.25, 1.675, 0.25, 1.45, 0.25, 1.225, 0.25, 1, 0, 1.9, 0, 1.675, 0, 1.45, 0, 1.225,
            0, 1, 2, 1.9, 1.75, 1.9, 1.75, 1.675, 2, 1.675, 1.75, 1.45, 2, 1.45, 1.75, 1.225, 2, 1.225, 1.75,
            1, 2, 1, 1.5, 1.9, 1.5, 1.675, 1.5, 1.45, 1.5, 1.225, 1.5, 1, 1.25, 1.9, 1.25, 1.675, 1.25, 1.45,
            1.25, 1.225, 1.25, 1, 1, 1.9, 1, 1.675, 1, 1.45, 1, 1.225, 1, 1, 1, 1.9, 0.75, 1.9, 0.75, 1.675,
            1, 1.675, 0.75, 1.45, 1, 1.45, 0.75, 1.225, 1, 1.225, 0.75, 1, 1, 1, 0.5, 1.9, 0.5, 1.675, 0.5,
            1.45, 0.5, 1.225, 0.5, 1, 0.25, 1.9, 0.25, 1.675, 0.25, 1.45, 0.25, 1.225, 0.25, 1, 0, 1.9, 0,
            1.675, 0, 1.45, 0, 1.225, 0, 1, 2, 1, 1.75, 1, 1.75, 0.85, 2, 0.85, 1.75, 0.7, 2, 0.7, 1.75,
            0.55, 2, 0.55, 1.75, 0.4, 2, 0.4, 1.5, 1, 1.5, 0.85, 1.5, 0.7, 1.5, 0.55, 1.5, 0.4, 1.25, 1,
            1.25, 0.85, 1.25, 0.7, 1.25, 0.55, 1.25, 0.4, 1, 1, 1, 0.85, 1, 0.7, 1, 0.55, 1, 0.4, 1, 1, 0.75,
            1, 0.75, 0.85, 1, 0.85, 0.75, 0.7, 1, 0.7, 0.75, 0.55, 1, 0.55, 0.75, 0.4, 1, 0.4, 0.5, 1, 0.5,
            0.85, 0.5, 0.7, 0.5, 0.55, 0.5, 0.4, 0.25, 1, 0.25, 0.85, 0.25, 0.7, 0.25, 0.55, 0.25, 0.4, 0, 1,
            0, 0.85, 0, 0.7, 0, 0.55, 0, 0.4, 2, 1, 1.75, 1, 1.75, 0.85, 2, 0.85, 1.75, 0.7, 2, 0.7, 1.75,
            0.55, 2, 0.55, 1.75, 0.4, 2, 0.4, 1.5, 1, 1.5, 0.85, 1.5, 0.7, 1.5, 0.55, 1.5, 0.4, 1.25, 1,
            1.25, 0.85, 1.25, 0.7, 1.25, 0.55, 1.25, 0.4, 1, 1, 1, 0.85, 1, 0.7, 1, 0.55, 1, 0.4, 1, 1, 0.75,
            1, 0.75, 0.85, 1, 0.85, 0.75, 0.7, 1, 0.7, 0.75, 0.55, 1, 0.55, 0.75, 0.4, 1, 0.4, 0.5, 1, 0.5,
            0.85, 0.5, 0.7, 0.5, 0.55, 0.5, 0.4, 0.25, 1, 0.25, 0.85, 0.25, 0.7, 0.25, 0.55, 0.25, 0.4, 0, 1,
            0, 0.85, 0, 0.7, 0, 0.55, 0, 0.4, 2, 0.4, 1.75, 0.4, 1.75, 0.3, 2, 0.3, 1.75, 0.2, 2, 0.2, 1.75,
            0.1, 2, 0.1, 1.75, 0, 1.5, 0.4, 1.5, 0.3, 1.5, 0.2, 1.5, 0.1, 1.5, 0, 1.25, 0.4, 1.25, 0.3, 1.25,
            0.2, 1.25, 0.1, 1.25, 0, 1, 0.4, 1, 0.3, 1, 0.2, 1, 0.1, 1, 0, 1, 0.4, 0.75, 0.4, 0.75, 0.3, 1,
            0.3, 0.75, 0.2, 1, 0.2, 0.75, 0.1, 1, 0.1, 0.75, 0, 0.5, 0.4, 0.5, 0.3, 0.5, 0.2, 0.5, 0.1, 0.5,
            0, 0.25, 0.4, 0.25, 0.3, 0.25, 0.2, 0.25, 0.1, 0.25, 0, 0, 0.4, 0, 0.3, 0, 0.2, 0, 0.1, 0, 0, 2,
            0.4, 1.75, 0.4, 1.75, 0.3, 2, 0.3, 1.75, 0.2, 2, 0.2, 1.75, 0.1, 2, 0.1, 1.75, 0, 1.5, 0.4, 1.5,
            0.3, 1.5, 0.2, 1.5, 0.1, 1.5, 0, 1.25, 0.4, 1.25, 0.3, 1.25, 0.2, 1.25, 0.1, 1.25, 0, 1, 0.4, 1,
            0.3, 1, 0.2, 1, 0.1, 1, 0, 1, 0.4, 0.75, 0.4, 0.75, 0.3, 1, 0.3, 0.75, 0.2, 1, 0.2, 0.75, 0.1, 1,
            0.1, 0.75, 0, 0.5, 0.4, 0.5, 0.3, 0.5, 0.2, 0.5, 0.1, 0.5, 0, 0.25, 0.4, 0.25, 0.3, 0.25, 0.2,
            0.25, 0.1, 0.25, 0, 0, 0.4, 0, 0.3, 0, 0.2, 0, 0.1, 0, 0, 1, 1, 0.875, 1, 0.875, 0.875, 1, 0.875,
            0.875, 0.75, 1, 0.75, 0.875, 0.625, 1, 0.625, 0.875, 0.5, 1, 0.5, 0.75, 1, 0.75, 0.875, 0.75,
            0.75, 0.75, 0.625, 0.75, 0.5, 0.625, 1, 0.625, 0.875, 0.625, 0.75, 0.625, 0.625, 0.625, 0.5, 0.5,
            1, 0.5, 0.875, 0.5, 0.75, 0.5, 0.625, 0.5, 0.5, 0.5, 1, 0.375, 1, 0.375, 0.875, 0.5, 0.875,
            0.375, 0.75, 0.5, 0.75, 0.375, 0.625, 0.5, 0.625, 0.375, 0.5, 0.5, 0.5, 0.25, 1, 0.25, 0.875,
            0.25, 0.75, 0.25, 0.625, 0.25, 0.5, 0.125, 1, 0.125, 0.875, 0.125, 0.75, 0.125, 0.625, 0.125,
            0.5, 0, 1, 0, 0.875, 0, 0.75, 0, 0.625, 0, 0.5, 1, 0.5, 0.875, 0.5, 0.875, 0.375, 1, 0.375,
            0.875, 0.25, 1, 0.25, 0.875, 0.125, 1, 0.125, 0.875, 0, 1, 0, 0.75, 0.5, 0.75, 0.375, 0.75, 0.25,
            0.75, 0.125, 0.75, 0, 0.625, 0.5, 0.625, 0.375, 0.625, 0.25, 0.625, 0.125, 0.625, 0, 0.5, 0.5,
            0.5, 0.375, 0.5, 0.25, 0.5, 0.125, 0.5, 0, 0.5, 0.5, 0.375, 0.5, 0.375, 0.375, 0.5, 0.375, 0.375,
            0.25, 0.5, 0.25, 0.375, 0.125, 0.5, 0.125, 0.375, 0, 0.5, 0, 0.25, 0.5, 0.25, 0.375, 0.25, 0.25,
            0.25, 0.125, 0.25, 0, 0.125, 0.5, 0.125, 0.375, 0.125, 0.25, 0.125, 0.125, 0.125, 0, 0, 0.5, 0,
            0.375, 0, 0.25, 0, 0.125, 0, 0, 0.5, 0, 0.625, 0, 0.625, 0.225, 0.5, 0.225, 0.625, 0.45, 0.5,
            0.45, 0.625, 0.675, 0.5, 0.675, 0.625, 0.9, 0.5, 0.9, 0.75, 0, 0.75, 0.225, 0.75, 0.45, 0.75,
            0.675, 0.75, 0.9, 0.875, 0, 0.875, 0.225, 0.875, 0.45, 0.875, 0.675, 0.875, 0.9, 1, 0, 1, 0.225,
            1, 0.45, 1, 0.675, 1, 0.9, 0, 0, 0.125, 0, 0.125, 0.225, 0, 0.225, 0.125, 0.45, 0, 0.45, 0.125,
            0.675, 0, 0.675, 0.125, 0.9, 0, 0.9, 0.25, 0, 0.25, 0.225, 0.25, 0.45, 0.25, 0.675, 0.25, 0.9,
            0.375, 0, 0.375, 0.225, 0.375, 0.45, 0.375, 0.675, 0.375, 0.9, 0.5, 0, 0.5, 0.225, 0.5, 0.45,
            0.5, 0.675, 0.5, 0.9, 0.5, 0.9, 0.625, 0.9, 0.625, 0.925, 0.5, 0.925, 0.625, 0.95, 0.5, 0.95,
            0.625, 0.975, 0.5, 0.975, 0.625, 1, 0.5, 1, 0.75, 0.9, 0.75, 0.925, 0.75, 0.95, 0.75, 0.975,
            0.75, 1, 0.875, 0.9, 0.875, 0.925, 0.875, 0.95, 0.875, 0.975, 0.875, 1, 1, 0.9, 1, 0.925, 1,
            0.95, 1, 0.975, 1, 1, 0, 0.9, 0.125, 0.9, 0.125, 0.925, 0, 0.925, 0.125, 0.95, 0, 0.95, 0.125,
            0.975, 0, 0.975, 0.125, 1, 0, 1, 0.25, 0.9, 0.25, 0.925, 0.25, 0.95, 0.25, 0.975, 0.25, 1, 0.375,
            0.9, 0.375, 0.925, 0.375, 0.95, 0.375, 0.975, 0.375, 1, 0.5, 0.9, 0.5, 0.925, 0.5, 0.95, 0.5,
            0.975, 0.5, 1, 0.875, 0.75, 1, 0.75, 1, 1, 0.875, 0.5, 1, 0.5, 0.875, 0.25, 1, 0.25, 0.875, 0, 1,
            0, 0.75, 0.75, 0.875, 1, 0.75, 0.5, 0.75, 0.25, 0.75, 0, 0.625, 0.75, 0.75, 1, 0.625, 0.5, 0.625,
            0.25, 0.625, 0, 0.5, 0.75, 0.625, 1, 0.5, 0.5, 0.5, 0.25, 0.5, 0, 0.375, 0.75, 0.5, 0.75, 0.5, 1,
            0.375, 0.5, 0.5, 0.5, 0.375, 0.25, 0.5, 0.25, 0.375, 0, 0.5, 0, 0.25, 0.75, 0.375, 1, 0.25, 0.5,
            0.25, 0.25, 0.25, 0, 0.125, 0.75, 0.25, 1, 0.125, 0.5, 0.125, 0.25, 0.125, 0, 0, 0.75, 0.125, 1,
            0, 0.5, 0, 0.25, 0, 0, 0.875, 0.75, 1, 0.75, 1, 1, 0.875, 0.5, 1, 0.5, 0.875, 0.25, 1, 0.25,
            0.875, 0, 1, 0, 0.75, 0.75, 0.875, 1, 0.75, 0.5, 0.75, 0.25, 0.75, 0, 0.625, 0.75, 0.75, 1,
            0.625, 0.5, 0.625, 0.25, 0.625, 0, 0.5, 0.75, 0.625, 1, 0.5, 0.5, 0.5, 0.25, 0.5, 0, 0.375, 0.75,
            0.5, 0.75, 0.5, 1, 0.375, 0.5, 0.5, 0.5, 0.375, 0.25, 0.5, 0.25, 0.375, 0, 0.5, 0, 0.25, 0.75,
            0.375, 1, 0.25, 0.5, 0.25, 0.25, 0.25, 0, 0.125, 0.75, 0.25, 1, 0.125, 0.5, 0.125, 0.25, 0.125,
            0, 0, 0.75, 0.125, 1, 0, 0.5, 0, 0.25, 0, 0, 1, 1, 0.875, 1, 0.875, 0.75, 1, 0.75, 0.875, 0.5, 1,
            0.5, 0.875, 0.25, 1, 0.25, 0.875, 0, 1, 0, 0.75, 1, 0.75, 0.75, 0.75, 0.5, 0.75, 0.25, 0.75, 0,
            0.625, 1, 0.625, 0.75, 0.625, 0.5, 0.625, 0.25, 0.625, 0, 0.5, 1, 0.5, 0.75, 0.5, 0.5, 0.5, 0.25,
            0.5, 0, 0.5, 1, 0.375, 1, 0.375, 0.75, 0.5, 0.75, 0.375, 0.5, 0.5, 0.5, 0.375, 0.25, 0.5, 0.25,
            0.375, 0, 0.5, 0, 0.25, 1, 0.25, 0.75, 0.25, 0.5, 0.25, 0.25, 0.25, 0, 0.125, 1, 0.125, 0.75,
            0.125, 0.5, 0.125, 0.25, 0.125, 0, 0, 1, 0, 0.75, 0, 0.5, 0, 0.25, 0, 0, 1, 1, 0.875, 1, 0.875,
            0.75, 1, 0.75, 0.875, 0.5, 1, 0.5, 0.875, 0.25, 1, 0.25, 0.875, 0, 1, 0, 0.75, 1, 0.75, 0.75,
            0.75, 0.5, 0.75, 0.25, 0.75, 0, 0.625, 1, 0.625, 0.75, 0.625, 0.5, 0.625, 0.25, 0.625, 0, 0.5, 1,
            0.5, 0.75, 0.5, 0.5, 0.5, 0.25, 0.5, 0, 0.5, 1, 0.375, 1, 0.375, 0.75, 0.5, 0.75, 0.375, 0.5,
            0.5, 0.5, 0.375, 0.25, 0.5, 0.25, 0.375, 0, 0.5, 0, 0.25, 1, 0.25, 0.75, 0.25, 0.5, 0.25, 0.25,
            0.25, 0, 0.125, 1, 0.125, 0.75, 0.125, 0.5, 0.125, 0.25, 0.125, 0, 0, 1, 0, 0.75, 0, 0.5, 0,
            0.25, 0, 0]);
        this._indices = new Uint16Array([0, 1, 2, 2, 3, 0, 3, 2, 4, 4, 5, 3, 5, 4, 6, 6, 7, 5, 7, 6, 8, 8, 9,
            7, 1, 10, 11, 11, 2, 1, 2, 11, 12, 12, 4, 2, 4, 12, 13, 13, 6, 4, 6, 13, 14, 14, 8, 6, 10, 15,
            16, 16, 11, 10, 11, 16, 17, 17, 12, 11, 12, 17, 18, 18, 13, 12, 13, 18, 19, 19, 14, 13, 15, 20,
            21, 21, 16, 15, 16, 21, 22, 22, 17, 16, 17, 22, 23, 23, 18, 17, 18, 23, 24, 24, 19, 18, 25, 26,
            27, 27, 28, 25, 28, 27, 29, 29, 30, 28, 30, 29, 31, 31, 32, 30, 32, 31, 33, 33, 34, 32, 26, 35,
            36, 36, 27, 26, 27, 36, 37, 37, 29, 27, 29, 37, 38, 38, 31, 29, 31, 38, 39, 39, 33, 31, 35, 40,
            41, 41, 36, 35, 36, 41, 42, 42, 37, 36, 37, 42, 43, 43, 38, 37, 38, 43, 44, 44, 39, 38, 40, 45,
            46, 46, 41, 40, 41, 46, 47, 47, 42, 41, 42, 47, 48, 48, 43, 42, 43, 48, 49, 49, 44, 43, 50, 51,
            52, 52, 53, 50, 53, 52, 54, 54, 55, 53, 55, 54, 56, 56, 57, 55, 57, 56, 58, 58, 59, 57, 51, 60,
            61, 61, 52, 51, 52, 61, 62, 62, 54, 52, 54, 62, 63, 63, 56, 54, 56, 63, 64, 64, 58, 56, 60, 65,
            66, 66, 61, 60, 61, 66, 67, 67, 62, 61, 62, 67, 68, 68, 63, 62, 63, 68, 69, 69, 64, 63, 65, 70,
            71, 71, 66, 65, 66, 71, 72, 72, 67, 66, 67, 72, 73, 73, 68, 67, 68, 73, 74, 74, 69, 68, 75, 76,
            77, 77, 78, 75, 78, 77, 79, 79, 80, 78, 80, 79, 81, 81, 82, 80, 82, 81, 83, 83, 84, 82, 76, 85,
            86, 86, 77, 76, 77, 86, 87, 87, 79, 77, 79, 87, 88, 88, 81, 79, 81, 88, 89, 89, 83, 81, 85, 90,
            91, 91, 86, 85, 86, 91, 92, 92, 87, 86, 87, 92, 93, 93, 88, 87, 88, 93, 94, 94, 89, 88, 90, 95,
            96, 96, 91, 90, 91, 96, 97, 97, 92, 91, 92, 97, 98, 98, 93, 92, 93, 98, 99, 99, 94, 93, 100, 101,
            102, 102, 103, 100, 103, 102, 104, 104, 105, 103, 105, 104, 106, 106, 107, 105, 107, 106, 108,
            108, 109, 107, 101, 110, 111, 111, 102, 101, 102, 111, 112, 112, 104, 102, 104, 112, 113, 113,
            106, 104, 106, 113, 114, 114, 108, 106, 110, 115, 116, 116, 111, 110, 111, 116, 117, 117, 112,
            111, 112, 117, 118, 118, 113, 112, 113, 118, 119, 119, 114, 113, 115, 120, 121, 121, 116, 115,
            116, 121, 122, 122, 117, 116, 117, 122, 123, 123, 118, 117, 118, 123, 124, 124, 119, 118, 125,
            126, 127, 127, 128, 125, 128, 127, 129, 129, 130, 128, 130, 129, 131, 131, 132, 130, 132, 131,
            133, 133, 134, 132, 126, 135, 136, 136, 127, 126, 127, 136, 137, 137, 129, 127, 129, 137, 138,
            138, 131, 129, 131, 138, 139, 139, 133, 131, 135, 140, 141, 141, 136, 135, 136, 141, 142, 142,
            137, 136, 137, 142, 143, 143, 138, 137, 138, 143, 144, 144, 139, 138, 140, 145, 146, 146, 141,
            140, 141, 146, 147, 147, 142, 141, 142, 147, 148, 148, 143, 142, 143, 148, 149, 149, 144, 143,
            150, 151, 152, 152, 153, 150, 153, 152, 154, 154, 155, 153, 155, 154, 156, 156, 157, 155, 157,
            156, 158, 158, 159, 157, 151, 160, 161, 161, 152, 151, 152, 161, 162, 162, 154, 152, 154, 162,
            163, 163, 156, 154, 156, 163, 164, 164, 158, 156, 160, 165, 166, 166, 161, 160, 161, 166, 167,
            167, 162, 161, 162, 167, 168, 168, 163, 162, 163, 168, 169, 169, 164, 163, 165, 170, 171, 171,
            166, 165, 166, 171, 172, 172, 167, 166, 167, 172, 173, 173, 168, 167, 168, 173, 174, 174, 169,
            168, 175, 176, 177, 177, 178, 175, 178, 177, 179, 179, 180, 178, 180, 179, 181, 181, 182, 180,
            182, 181, 183, 183, 184, 182, 176, 185, 186, 186, 177, 176, 177, 186, 187, 187, 179, 177, 179,
            187, 188, 188, 181, 179, 181, 188, 189, 189, 183, 181, 185, 190, 191, 191, 186, 185, 186, 191,
            192, 192, 187, 186, 187, 192, 193, 193, 188, 187, 188, 193, 194, 194, 189, 188, 190, 195, 196,
            196, 191, 190, 191, 196, 197, 197, 192, 191, 192, 197, 198, 198, 193, 192, 193, 198, 199, 199,
            194, 193, 200, 201, 202, 202, 203, 200, 203, 202, 204, 204, 205, 203, 205, 204, 206, 206, 207,
            205, 207, 206, 208, 208, 209, 207, 201, 210, 211, 211, 202, 201, 202, 211, 212, 212, 204, 202,
            204, 212, 213, 213, 206, 204, 206, 213, 214, 214, 208, 206, 210, 215, 216, 216, 211, 210, 211,
            216, 217, 217, 212, 211, 212, 217, 218, 218, 213, 212, 213, 218, 219, 219, 214, 213, 215, 220,
            221, 221, 216, 215, 216, 221, 222, 222, 217, 216, 217, 222, 223, 223, 218, 217, 218, 223, 224,
            224, 219, 218, 225, 226, 227, 227, 228, 225, 228, 227, 229, 229, 230, 228, 230, 229, 231, 231,
            232, 230, 232, 231, 233, 233, 234, 232, 226, 235, 236, 236, 227, 226, 227, 236, 237, 237, 229,
            227, 229, 237, 238, 238, 231, 229, 231, 238, 239, 239, 233, 231, 235, 240, 241, 241, 236, 235,
            236, 241, 242, 242, 237, 236, 237, 242, 243, 243, 238, 237, 238, 243, 244, 244, 239, 238, 240,
            245, 246, 246, 241, 240, 241, 246, 247, 247, 242, 241, 242, 247, 248, 248, 243, 242, 243, 248,
            249, 249, 244, 243, 250, 251, 252, 252, 253, 250, 253, 252, 254, 254, 255, 253, 255, 254, 256,
            256, 257, 255, 257, 256, 258, 258, 259, 257, 251, 260, 261, 261, 252, 251, 252, 261, 262, 262,
            254, 252, 254, 262, 263, 263, 256, 254, 256, 263, 264, 264, 258, 256, 260, 265, 266, 266, 261,
            260, 261, 266, 267, 267, 262, 261, 262, 267, 268, 268, 263, 262, 263, 268, 269, 269, 264, 263,
            265, 270, 271, 271, 266, 265, 266, 271, 272, 272, 267, 266, 267, 272, 273, 273, 268, 267, 268,
            273, 274, 274, 269, 268, 275, 276, 277, 277, 278, 275, 278, 277, 279, 279, 280, 278, 280, 279,
            281, 281, 282, 280, 282, 281, 283, 283, 284, 282, 276, 285, 286, 286, 277, 276, 277, 286, 287,
            287, 279, 277, 279, 287, 288, 288, 281, 279, 281, 288, 289, 289, 283, 281, 285, 290, 291, 291,
            286, 285, 286, 291, 292, 292, 287, 286, 287, 292, 293, 293, 288, 287, 288, 293, 294, 294, 289,
            288, 290, 295, 296, 296, 291, 290, 291, 296, 297, 297, 292, 291, 292, 297, 298, 298, 293, 292,
            293, 298, 299, 299, 294, 293, 300, 301, 302, 302, 303, 300, 303, 302, 304, 304, 305, 303, 305,
            304, 306, 306, 307, 305, 307, 306, 308, 301, 309, 310, 310, 302, 301, 302, 310, 311, 311, 304,
            302, 304, 311, 312, 312, 306, 304, 306, 312, 313, 309, 314, 315, 315, 310, 309, 310, 315, 316,
            316, 311, 310, 311, 316, 317, 317, 312, 311, 312, 317, 318, 314, 319, 320, 320, 315, 314, 315,
            320, 321, 321, 316, 315, 316, 321, 322, 322, 317, 316, 317, 322, 323, 324, 325, 326, 326, 327,
            324, 327, 326, 328, 328, 329, 327, 329, 328, 330, 330, 331, 329, 331, 330, 332, 325, 333, 334,
            334, 326, 325, 326, 334, 335, 335, 328, 326, 328, 335, 336, 336, 330, 328, 330, 336, 337, 333,
            338, 339, 339, 334, 333, 334, 339, 340, 340, 335, 334, 335, 340, 341, 341, 336, 335, 336, 341,
            342, 338, 343, 344, 344, 339, 338, 339, 344, 345, 345, 340, 339, 340, 345, 346, 346, 341, 340,
            341, 346, 347, 348, 349, 350, 350, 351, 348, 351, 350, 352, 352, 353, 351, 353, 352, 354, 354,
            355, 353, 355, 354, 356, 349, 357, 358, 358, 350, 349, 350, 358, 359, 359, 352, 350, 352, 359,
            360, 360, 354, 352, 354, 360, 361, 357, 362, 363, 363, 358, 357, 358, 363, 364, 364, 359, 358,
            359, 364, 365, 365, 360, 359, 360, 365, 366, 362, 367, 368, 368, 363, 362, 363, 368, 369, 369,
            364, 363, 364, 369, 370, 370, 365, 364, 365, 370, 371, 372, 373, 374, 374, 375, 372, 375, 374,
            376, 376, 377, 375, 377, 376, 378, 378, 379, 377, 379, 378, 380, 373, 381, 382, 382, 374, 373,
            374, 382, 383, 383, 376, 374, 376, 383, 384, 384, 378, 376, 378, 384, 385, 381, 386, 387, 387,
            382, 381, 382, 387, 388, 388, 383, 382, 383, 388, 389, 389, 384, 383, 384, 389, 390, 386, 391,
            392, 392, 387, 386, 387, 392, 393, 393, 388, 387, 388, 393, 394, 394, 389, 388, 389, 394, 395,
            396, 397, 398, 398, 399, 396, 399, 398, 400, 400, 401, 399, 401, 400, 402, 402, 403, 401, 403,
            402, 404, 404, 405, 403, 397, 406, 407, 407, 398, 397, 398, 407, 408, 408, 400, 398, 400, 408,
            409, 409, 402, 400, 402, 409, 410, 410, 404, 402, 406, 411, 412, 412, 407, 406, 407, 412, 413,
            413, 408, 407, 408, 413, 414, 414, 409, 408, 409, 414, 415, 415, 410, 409, 411, 416, 417, 417,
            412, 411, 412, 417, 418, 418, 413, 412, 413, 418, 419, 419, 414, 413, 414, 419, 420, 420, 415,
            414, 421, 422, 423, 423, 424, 421, 424, 423, 425, 425, 426, 424, 426, 425, 427, 427, 428, 426,
            428, 427, 429, 429, 430, 428, 422, 431, 432, 432, 423, 422, 423, 432, 433, 433, 425, 423, 425,
            433, 434, 434, 427, 425, 427, 434, 435, 435, 429, 427, 431, 436, 437, 437, 432, 431, 432, 437,
            438, 438, 433, 432, 433, 438, 439, 439, 434, 433, 434, 439, 440, 440, 435, 434, 436, 441, 442,
            442, 437, 436, 437, 442, 443, 443, 438, 437, 438, 443, 444, 444, 439, 438, 439, 444, 445, 445,
            440, 439, 446, 447, 448, 448, 449, 446, 449, 448, 450, 450, 451, 449, 451, 450, 452, 452, 453,
            451, 453, 452, 454, 454, 455, 453, 447, 456, 457, 457, 448, 447, 448, 457, 458, 458, 450, 448,
            450, 458, 459, 459, 452, 450, 452, 459, 460, 460, 454, 452, 456, 461, 462, 462, 457, 456, 457,
            462, 463, 463, 458, 457, 458, 463, 464, 464, 459, 458, 459, 464, 465, 465, 460, 459, 461, 466,
            467, 467, 462, 461, 462, 467, 468, 468, 463, 462, 463, 468, 469, 469, 464, 463, 464, 469, 470,
            470, 465, 464, 471, 472, 473, 473, 474, 471, 474, 473, 475, 475, 476, 474, 476, 475, 477, 477,
            478, 476, 478, 477, 479, 479, 480, 478, 472, 481, 482, 482, 473, 472, 473, 482, 483, 483, 475,
            473, 475, 483, 484, 484, 477, 475, 477, 484, 485, 485, 479, 477, 481, 486, 487, 487, 482, 481,
            482, 487, 488, 488, 483, 482, 483, 488, 489, 489, 484, 483, 484, 489, 490, 490, 485, 484, 486,
            491, 492, 492, 487, 486, 487, 492, 493, 493, 488, 487, 488, 493, 494, 494, 489, 488, 489, 494,
            495, 495, 490, 489, 496, 497, 498, 498, 499, 496, 499, 498, 500, 500, 501, 499, 501, 500, 502,
            502, 503, 501, 503, 502, 504, 504, 505, 503, 497, 506, 507, 507, 498, 497, 498, 507, 508, 508,
            500, 498, 500, 508, 509, 509, 502, 500, 502, 509, 510, 510, 504, 502, 506, 511, 512, 512, 507,
            506, 507, 512, 513, 513, 508, 507, 508, 513, 514, 514, 509, 508, 509, 514, 515, 515, 510, 509,
            511, 516, 517, 517, 512, 511, 512, 517, 518, 518, 513, 512, 513, 518, 519, 519, 514, 513, 514,
            519, 520, 520, 515, 514, 521, 522, 523, 523, 524, 521, 524, 523, 525, 525, 526, 524, 526, 525,
            527, 527, 528, 526, 528, 527, 529, 529, 530, 528, 522, 531, 532, 532, 523, 522, 523, 532, 533,
            533, 525, 523, 525, 533, 534, 534, 527, 525, 527, 534, 535, 535, 529, 527, 531, 536, 537, 537,
            532, 531, 532, 537, 538, 538, 533, 532, 533, 538, 539, 539, 534, 533, 534, 539, 540, 540, 535,
            534, 536, 541, 542, 542, 537, 536, 537, 542, 543, 543, 538, 537, 538, 543, 544, 544, 539, 538,
            539, 544, 545, 545, 540, 539, 546, 547, 548, 548, 549, 546, 549, 548, 550, 550, 551, 549, 551,
            550, 552, 552, 553, 551, 553, 552, 554, 554, 555, 553, 547, 556, 557, 557, 548, 547, 548, 557,
            558, 558, 550, 548, 550, 558, 559, 559, 552, 550, 552, 559, 560, 560, 554, 552, 556, 561, 562,
            562, 557, 556, 557, 562, 563, 563, 558, 557, 558, 563, 564, 564, 559, 558, 559, 564, 565, 565,
            560, 559, 561, 566, 567, 567, 562, 561, 562, 567, 568, 568, 563, 562, 563, 568, 569, 569, 564,
            563, 564, 569, 570, 570, 565, 564, 571, 572, 573, 573, 574, 571, 574, 573, 575, 575, 576, 574,
            576, 575, 577, 577, 578, 576, 578, 577, 579, 579, 580, 578, 572, 581, 582, 582, 573, 572, 573,
            582, 583, 583, 575, 573, 575, 583, 584, 584, 577, 575, 577, 584, 585, 585, 579, 577, 581, 586,
            587, 587, 582, 581, 582, 587, 588, 588, 583, 582, 583, 588, 589, 589, 584, 583, 584, 589, 590,
            590, 585, 584, 586, 591, 592, 592, 587, 586, 587, 592, 593, 593, 588, 587, 588, 593, 594, 594,
            589, 588, 589, 594, 595, 595, 590, 589, 596, 597, 598, 597, 596, 599, 599, 600, 597, 600, 599,
            601, 601, 602, 600, 602, 601, 603, 603, 604, 602, 605, 596, 606, 596, 605, 607, 607, 599, 596,
            599, 607, 608, 608, 601, 599, 601, 608, 609, 609, 603, 601, 610, 605, 611, 605, 610, 612, 612,
            607, 605, 607, 612, 613, 613, 608, 607, 608, 613, 614, 614, 609, 608, 615, 610, 616, 610, 615,
            617, 617, 612, 610, 612, 617, 618, 618, 613, 612, 613, 618, 619, 619, 614, 613, 620, 621, 622,
            621, 620, 623, 623, 624, 621, 624, 623, 625, 625, 626, 624, 626, 625, 627, 627, 628, 626, 629,
            620, 630, 620, 629, 631, 631, 623, 620, 623, 631, 632, 632, 625, 623, 625, 632, 633, 633, 627,
            625, 634, 629, 635, 629, 634, 636, 636, 631, 629, 631, 636, 637, 637, 632, 631, 632, 637, 638,
            638, 633, 632, 639, 634, 640, 634, 639, 641, 641, 636, 634, 636, 641, 642, 642, 637, 636, 637,
            642, 643, 643, 638, 637, 644, 645, 646, 645, 644, 647, 647, 648, 645, 648, 647, 649, 649, 650,
            648, 650, 649, 651, 651, 652, 650, 653, 644, 654, 644, 653, 655, 655, 647, 644, 647, 655, 656,
            656, 649, 647, 649, 656, 657, 657, 651, 649, 658, 653, 659, 653, 658, 660, 660, 655, 653, 655,
            660, 661, 661, 656, 655, 656, 661, 662, 662, 657, 656, 663, 658, 664, 658, 663, 665, 665, 660,
            658, 660, 665, 666, 666, 661, 660, 661, 666, 667, 667, 662, 661, 668, 669, 670, 669, 668, 671,
            671, 672, 669, 672, 671, 673, 673, 674, 672, 674, 673, 675, 675, 676, 674, 677, 668, 678, 668,
            677, 679, 679, 671, 668, 671, 679, 680, 680, 673, 671, 673, 680, 681, 681, 675, 673, 682, 677,
            683, 677, 682, 684, 684, 679, 677, 679, 684, 685, 685, 680, 679, 680, 685, 686, 686, 681, 680,
            687, 682, 688, 682, 687, 689, 689, 684, 682, 684, 689, 690, 690, 685, 684, 685, 690, 691, 691,
            686, 685, 692, 693, 694, 694, 695, 692, 695, 694, 696, 696, 697, 695, 697, 696, 698, 698, 699,
            697, 699, 698, 700, 700, 701, 699, 693, 702, 703, 703, 694, 693, 694, 703, 704, 704, 696, 694,
            696, 704, 705, 705, 698, 696, 698, 705, 706, 706, 700, 698, 702, 707, 708, 708, 703, 702, 703,
            708, 709, 709, 704, 703, 704, 709, 710, 710, 705, 704, 705, 710, 711, 711, 706, 705, 707, 712,
            713, 713, 708, 707, 708, 713, 714, 714, 709, 708, 709, 714, 715, 715, 710, 709, 710, 715, 716,
            716, 711, 710, 717, 718, 719, 719, 720, 717, 720, 719, 721, 721, 722, 720, 722, 721, 723, 723,
            724, 722, 724, 723, 725, 725, 726, 724, 718, 727, 728, 728, 719, 718, 719, 728, 729, 729, 721,
            719, 721, 729, 730, 730, 723, 721, 723, 730, 731, 731, 725, 723, 727, 732, 733, 733, 728, 727,
            728, 733, 734, 734, 729, 728, 729, 734, 735, 735, 730, 729, 730, 735, 736, 736, 731, 730, 732,
            737, 738, 738, 733, 732, 733, 738, 739, 739, 734, 733, 734, 739, 740, 740, 735, 734, 735, 740,
            741, 741, 736, 735, 742, 743, 744, 744, 745, 742, 745, 744, 746, 746, 747, 745, 747, 746, 748,
            748, 749, 747, 749, 748, 750, 750, 751, 749, 743, 752, 753, 753, 744, 743, 744, 753, 754, 754,
            746, 744, 746, 754, 755, 755, 748, 746, 748, 755, 756, 756, 750, 748, 752, 757, 758, 758, 753,
            752, 753, 758, 759, 759, 754, 753, 754, 759, 760, 760, 755, 754, 755, 760, 761, 761, 756, 755,
            757, 762, 763, 763, 758, 757, 758, 763, 764, 764, 759, 758, 759, 764, 765, 765, 760, 759, 760,
            765, 766, 766, 761, 760, 767, 768, 769, 769, 770, 767, 770, 769, 771, 771, 772, 770, 772, 771,
            773, 773, 774, 772, 774, 773, 775, 775, 776, 774, 768, 777, 778, 778, 769, 768, 769, 778, 779,
            779, 771, 769, 771, 779, 780, 780, 773, 771, 773, 780, 781, 781, 775, 773, 777, 782, 783, 783,
            778, 777, 778, 783, 784, 784, 779, 778, 779, 784, 785, 785, 780, 779, 780, 785, 786, 786, 781,
            780, 782, 787, 788, 788, 783, 782, 783, 788, 789, 789, 784, 783, 784, 789, 790, 790, 785, 784,
            785, 790, 791, 791, 786, 785]);
    }
    return Teapot;
}(Geometry_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Teapot;
},{"./Geometry":44}],48:[function(require,module,exports){
"use strict";
var ShaderManager_1 = require("./ShaderManager");
var StandardShaderObject_1 = require("./StandardShaderObject");
var ShaderSourceLib_1 = require("../utils/ShaderSourceLib");
var SkyBoxShaderObject_1 = require("./SkyBoxShaderObject");
var ShaderFactory = (function () {
    function ShaderFactory() {
    }
    ShaderFactory.getShader = function (scene, mesh) {
        var camera = scene.currentCamera;
        var geometry = mesh.geometry;
        var material = mesh.material;
        if (material.type === 'StandardMaterial') {
            var key = "standard_" + material.shadingType;
            var vertSrc = ShaderSourceLib_1.default[(key + "_vert.glsl")];
            var fragSrc = ShaderSourceLib_1.default[(key + "_frag.glsl")];
            return ShaderManager_1.default.createShader(key, StandardShaderObject_1.default, vertSrc, fragSrc);
        }
        else if (material.type === 'CubeMapMaterial') {
            var key = "skybox";
            var vertSrc = ShaderSourceLib_1.default[(key + "_vert.glsl")];
            var fragSrc = ShaderSourceLib_1.default[(key + "_frag.glsl")];
            return ShaderManager_1.default.createShader(key, SkyBoxShaderObject_1.default, vertSrc, fragSrc);
        }
    };
    return ShaderFactory;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ShaderFactory;
},{"../utils/ShaderSourceLib":59,"./ShaderManager":49,"./SkyBoxShaderObject":51,"./StandardShaderObject":52}],49:[function(require,module,exports){
"use strict";
var RenderContext_1 = require("../RenderContext");
var ShaderUtil_1 = require("../utils/ShaderUtil");
var ShaderManager = (function () {
    function ShaderManager() {
    }
    ShaderManager.addShader = function (key, shader) {
        this._shaders[key] = shader;
    };
    ShaderManager.getShader = function (key) {
        return this._shaders[key];
    };
    ShaderManager.removeShader = function (key) {
        var shader = this._shaders[key];
        if (!shader)
            return;
        ShaderUtil_1.default.deleteProgram(RenderContext_1.default.context, shader.program);
        delete this._shaders[key];
    };
    /**
     * 创建并缓存Shader对象，以传入的key作为唯一识别符。如果缓存中已经存在key对应的Shader对象，则直接从缓存中返回该对象。
     * @param {string} key
     * @param ShaderCls
     * @param {string} vertSrc
     * @param {string} fragSrc
     * @returns {Shader}
     */
    ShaderManager.createShader = function (key, ShaderCls, vertSrc, fragSrc) {
        var shader = this.getShader(key);
        if (shader)
            return shader;
        shader = new ShaderCls(RenderContext_1.default.context, vertSrc, fragSrc);
        this.addShader(key, shader);
        return shader;
    };
    ShaderManager._shaders = {};
    return ShaderManager;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ShaderManager;
},{"../RenderContext":3,"../utils/ShaderUtil":60}],50:[function(require,module,exports){
/**
 * Created by yaozh on 2019/5/27.
 * 对Shader的抽象，包含提取shader变量(常量)和为Shader变量赋值
 */
"use strict";
var ShaderUtil_1 = require("../utils/ShaderUtil");
var ShaderHelper_1 = require("../utils/ShaderHelper");
var ShaderObject = (function () {
    function ShaderObject(gl, vertSrc, fragSrc) {
        this._attributes = {};
        this._uniforms = {};
        this._gl = gl;
        if (vertSrc && fragSrc) {
            this._program = ShaderUtil_1.default.createProgram(gl, vertSrc, fragSrc);
        }
    }
    Object.defineProperty(ShaderObject.prototype, "program", {
        get: function () {
            return this._program;
        },
        enumerable: true,
        configurable: true
    });
    ShaderObject.prototype.createProgram = function (vertSrc, fragSrc) {
        this._program = ShaderUtil_1.default.createProgram(this._gl, vertSrc, fragSrc);
        return this._program;
    };
    /**
     * 调用本方法之前需要确保已经通过着色器源码创建了WebGLProgram对象
     */
    ShaderObject.prototype.extractAttributesAndUniforms = function () {
    };
    ShaderObject.prototype.setAttributesAndUniforms = function (scene, mesh, renderer) {
    };
    ShaderObject.prototype.addAttribute = function (attributeName) {
        this._attributes[attributeName] = ShaderHelper_1.default.getAttributeLocation(this._program, attributeName);
    };
    ShaderObject.prototype.addUniform = function (uniformName) {
        this._uniforms[uniformName] = ShaderHelper_1.default.getUniformLocation(this._program, uniformName);
    };
    ShaderObject.prototype.getUniform = function (uniformName) {
        return this._uniforms[uniformName];
    };
    ShaderObject.prototype.getAttribute = function (attributeName) {
        return this._attributes[attributeName];
    };
    ShaderObject.prototype.dispose = function () {
        ShaderUtil_1.default.deleteProgram(this._gl, this._program);
        this._uniforms = null;
        this._attributes = null;
        this._gl = null;
    };
    return ShaderObject;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ShaderObject;
},{"../utils/ShaderHelper":58,"../utils/ShaderUtil":60}],51:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShaderObject_1 = require("./ShaderObject");
var ShaderHelper_1 = require("../utils/ShaderHelper");
var RenderContext_1 = require("../RenderContext");
var SkyBoxShaderObject = (function (_super) {
    __extends(SkyBoxShaderObject, _super);
    function SkyBoxShaderObject() {
        _super.apply(this, arguments);
    }
    SkyBoxShaderObject.prototype.extractAttributesAndUniforms = function () {
        this.addAttribute('a_Position');
        this.addUniform('u_ViewMatrix');
        this.addUniform('u_ProjMatrix');
        this.addUniform('u_samplerCube');
    };
    SkyBoxShaderObject.prototype.setAttributesAndUniforms = function (scene, mesh, renderer) {
        //mesh.updateWorldMatrix();
        ShaderHelper_1.default.uniformMatrix4fv(this.getUniform('u_ProjMatrix'), false, renderer.currentCamera.projMatrix.elements);
        ShaderHelper_1.default.uniformMatrix4fv(this.getUniform('u_ViewMatrix'), false, renderer.viewRotationMatrix.elements);
        var skyMat = mesh.material;
        ShaderHelper_1.default.uniform1i(this.getUniform('u_samplerCube'), 0);
        skyMat.textureCude.setTextureAttribute();
        var gl = RenderContext_1.default.context;
        var geometry = mesh.geometry;
        mesh.setBufferAttribute(mesh.vertexBuffer, this.getAttribute('a_Position'), geometry.vertexPosNum, gl.FLOAT);
        if (mesh.geometry.indexDraw) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
        }
    };
    return SkyBoxShaderObject;
}(ShaderObject_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SkyBoxShaderObject;
},{"../RenderContext":3,"../utils/ShaderHelper":58,"./ShaderObject":50}],52:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShaderObject_1 = require("./ShaderObject");
var ShaderHelper_1 = require("../utils/ShaderHelper");
var RenderContext_1 = require("../RenderContext");
/**
 * Created by yaozh on 2019/5/27.
 *
 */
var StandardShaderObject = (function (_super) {
    __extends(StandardShaderObject, _super);
    function StandardShaderObject() {
        _super.apply(this, arguments);
    }
    StandardShaderObject.prototype.extractAttributesAndUniforms = function () {
        var attrs = [
            'a_Position',
            'a_Normal',
            'a_TexCood'
        ];
        for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
            var attr = attrs_1[_i];
            this.addAttribute(attr);
        }
        var uniforms = [
            'u_mvMatrix',
            'u_ProjMatrix',
            'u_NormalMatrix',
            'u_globalAmbient',
            'u_materialAmbient',
            'u_materialDiffuse',
            'u_materialSpecular',
            'u_materialShiness',
            'side',
            'u_materialEmissive',
            'u_sampler2d',
            'u_NumLight',
            'u_HasTexture'
        ];
        for (var i = 0; i < StandardShaderObject.MAX_NUM_LIGHTS; i++) {
            uniforms.push("lights[" + i + "].position");
            uniforms.push("lights[" + i + "].color");
            uniforms.push("lights[" + i + "].intensity");
            uniforms.push("lights[" + i + "].scope");
            uniforms.push("lights[" + i + "].attenuate");
            uniforms.push("lights[" + i + "].direction");
            uniforms.push("lights[" + i + "].theta");
        }
        for (var _a = 0, uniforms_1 = uniforms; _a < uniforms_1.length; _a++) {
            var uniform = uniforms_1[_a];
            this.addUniform(uniform);
        }
    };
    StandardShaderObject.prototype.setAttributesAndUniforms = function (scene, mesh, renderer) {
        ShaderHelper_1.default.uniform1i(this.getUniform('side'), mesh.surfaceSide);
        ShaderHelper_1.default.uniform1i(this.getUniform('u_NumLight'), mesh.scene.lights.length);
        this.handleMVP(scene, mesh, renderer);
        this.handleLights(scene, mesh, renderer);
        this.handleMaterials(scene, mesh);
        this.setShaderDataFromMesh(mesh);
    };
    StandardShaderObject.prototype.handleMVP = function (scene, mesh, renderer) {
        //Model-View-Projection
        mesh.updateWorldMatrix();
        mesh.modelViewMatrix.multiplyMatrices(renderer.cameraInverseMatrix, mesh.worldMatrix);
        ShaderHelper_1.default.uniformMatrix4fv(this.getUniform('u_mvMatrix'), false, mesh.modelViewMatrix.elements);
        ShaderHelper_1.default.uniformMatrix4fv(this.getUniform('u_ProjMatrix'), false, renderer.currentCamera.projMatrix.elements);
        //法线转换,如果是正交变换，则可以通过求转置矩阵直接获取逆矩阵，待优化
        mesh.normalMatrix.getInverse(mesh.worldMatrix, true);
        mesh.normalMatrix.transpose();
        mesh.normalMatrix.premultiply(renderer.viewRotationMatrix);
        ShaderHelper_1.default.uniformMatrix4fv(this.getUniform('u_NormalMatrix'), false, mesh.normalMatrix.elements);
    };
    StandardShaderObject.prototype.handleLights = function (scene, mesh, renderer) {
        var numLights = scene.lights.length;
        numLights = Math.min(numLights, StandardShaderObject.MAX_NUM_LIGHTS);
        for (var i = 0; i < numLights; i++) {
            var lightObj = renderer.lightObjects[i]; //scene.lights[i];
            var light = lightObj.light, lightPos = lightObj.lightPos, dir = lightObj.dir;
            //对于平行光源（只有方向）而言，只考虑其从世界坐标系到视角坐标系变换的旋转分量，平移和缩放不予考虑
            switch (light.type) {
                case 'PointLight': {
                    var lit = light;
                    ShaderHelper_1.default.uniform1f(this.getUniform('lights[' + i + '].scope'), lit.scope);
                    ShaderHelper_1.default.uniform1f(this.getUniform('lights[' + i + '].attenuate'), lit.attenuate);
                    break;
                }
                case 'SpotLight': {
                    var lit = light;
                    ShaderHelper_1.default.uniform1f(this.getUniform('lights[' + i + '].scope'), lit.scope);
                    ShaderHelper_1.default.uniform1f(this.getUniform('lights[' + i + '].attenuate'), lit.attenuate);
                    ShaderHelper_1.default.uniform1f(this.getUniform('lights[' + i + '].theta'), lit.theta);
                    ShaderHelper_1.default.uniform3f(this.getUniform('lights[' + i + '].direction'), dir.x, dir.y, dir.z);
                    break;
                }
            }
            ShaderHelper_1.default.uniform4fv(this.getUniform('lights[' + i + '].position'), lightPos.elements);
            var lightColor = light.color;
            ShaderHelper_1.default.uniform3f(this.getUniform('lights[' + i + '].color'), lightColor.x, lightColor.y, lightColor.z);
            var lightIntensity = light.intensity;
            ShaderHelper_1.default.uniform1f(this.getUniform('lights[' + i + '].intensity'), lightIntensity);
        }
    };
    StandardShaderObject.prototype.handleMaterials = function (scene, mesh) {
        //全局环境光
        var globalAmbient = scene.ambientColor;
        ShaderHelper_1.default.uniform3f(this.getUniform('u_globalAmbient'), globalAmbient.x, globalAmbient.y, globalAmbient.z);
        var colorMat = (mesh.material);
        var am = colorMat.ambientColor;
        ShaderHelper_1.default.uniform3f(this.getUniform('u_materialAmbient'), am.x, am.y, am.z);
        var dc = colorMat.diffuseColor;
        ShaderHelper_1.default.uniform3f(this.getUniform('u_materialDiffuse'), dc.x, dc.y, dc.z);
        var sc = colorMat.specularColor;
        ShaderHelper_1.default.uniform3f(this.getUniform('u_materialSpecular'), sc.x, sc.y, sc.z);
        ShaderHelper_1.default.uniform1f(this.getUniform('u_materialShiness'), colorMat.shininess);
        var em = colorMat.emissiveColor;
        ShaderHelper_1.default.uniform3f(this.getUniform('u_materialEmissive'), em.x, em.y, em.z);
        ShaderHelper_1.default.uniform1i(this.getUniform('u_sampler2d'), 0);
        if (mesh.material.texture)
            colorMat.texture.setTextureAttribute();
        mesh.setBufferAttribute(mesh.uvBuffer, this.getAttribute('a_TexCood'), mesh.geometry.vertexUVNum, RenderContext_1.default.context.FLOAT);
        ShaderHelper_1.default.uniform1i(this.getUniform('u_HasTexture'), mesh.material.texture ? 1 : 0);
    };
    StandardShaderObject.prototype.setShaderDataFromMesh = function (mesh) {
        var gl = RenderContext_1.default.context;
        var geometry = mesh.geometry;
        mesh.setBufferAttribute(mesh.vertexBuffer, this.getAttribute('a_Position'), geometry.vertexPosNum, gl.FLOAT);
        mesh.setBufferAttribute(mesh.normalBuffer, this.getAttribute('a_Normal'), geometry.vertexNormalNum, gl.FLOAT);
        if (mesh.geometry.indexDraw) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
        }
    };
    StandardShaderObject.MAX_NUM_LIGHTS = 8;
    return StandardShaderObject;
}(ShaderObject_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StandardShaderObject;
},{"../RenderContext":3,"../utils/ShaderHelper":58,"./ShaderObject":50}],53:[function(require,module,exports){
"use strict";
var RenderContext_1 = require("../RenderContext");
var Constant_1 = require("../enum/Constant");
/**
 * Created by yaozh on 2017/6/28.
 */
var Texture = (function () {
    function Texture() {
        this._wrapS = Constant_1.default.REPEAT; // u坐标溢出的渲染模式
        this._wrapT = Constant_1.default.REPEAT; // v坐标溢出的渲染模式
        this._magFilter = Constant_1.default.NEAREST; // 纹理放大和缩小时默认都使用 点采样的方式
        this._minFilter = Constant_1.default.NEAREST;
        this._useMipMap = false;
        this._gl = RenderContext_1.default.context;
        var texture = this._gl.createTexture(); // Create a texture object
        this._buffer = texture;
    }
    Texture.prototype.setTextureAttribute = function () {
    };
    Object.defineProperty(Texture.prototype, "buffer", {
        get: function () {
            return this._buffer;
        },
        enumerable: true,
        configurable: true
    });
    Texture.prototype.dispose = function () {
        this._gl.deleteBuffer(this._buffer);
    };
    Object.defineProperty(Texture.prototype, "wrapS", {
        get: function () {
            return this._wrapS;
        },
        set: function (value) {
            this._wrapS = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Texture.prototype, "wrapT", {
        get: function () {
            return this._wrapT;
        },
        set: function (value) {
            this._wrapT = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Texture.prototype, "minFilter", {
        get: function () {
            return this._minFilter;
        },
        set: function (value) {
            this._minFilter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Texture.prototype, "magFilter", {
        get: function () {
            return this._magFilter;
        },
        set: function (value) {
            this._magFilter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Texture.prototype, "useMipMap", {
        get: function () {
            return this._useMipMap;
        },
        set: function (value) {
            this._useMipMap = value;
        },
        enumerable: true,
        configurable: true
    });
    return Texture;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Texture;
},{"../RenderContext":3,"../enum/Constant":16}],54:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Texture_1 = require("./Texture");
var RenderContext_1 = require("../RenderContext");
/**
 * Created by yaozh on 2017/6/28.
 */
var Texture2D = (function (_super) {
    __extends(Texture2D, _super);
    function Texture2D(pixels, flipY) {
        if (flipY === void 0) { flipY = false; }
        _super.call(this);
        if (!pixels) {
            this._pixels = this.createDefaultTexture();
            this._width = Texture2D.DEFAULT_TEXTURE_SIZE;
            this._height = Texture2D.DEFAULT_TEXTURE_SIZE;
        }
        else {
            if (pixels instanceof HTMLImageElement) {
                var image = pixels;
                this._width = image.width;
                this._height = image.height;
            }
            else {
                this._width = 0;
                this._height = 0;
            }
            this._pixels = pixels;
        }
        this._flipY = flipY;
    }
    Object.defineProperty(Texture2D.prototype, "pixels", {
        get: function () {
            return this._pixels;
        },
        enumerable: true,
        configurable: true
    });
    Texture2D.prototype.setTextureAttribute = function () {
        var gl = RenderContext_1.default.context;
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this._flipY ? 1 : 0); // Flip the image's y axis
        // Enable the texture unit 0
        gl.activeTexture(gl.TEXTURE0);
        // Bind the texture object to the target
        gl.bindTexture(gl.TEXTURE_2D, this._buffer);
        // Set the texture parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this._wrapS);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this._wrapT);
        if (this._useMipMap) {
            gl.generateMipmap(gl.TEXTURE_2D);
        }
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this._minFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this._magFilter);
        // Set the texture image
        if (this._pixels instanceof Uint8Array) {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, Texture2D.DEFAULT_TEXTURE_SIZE, Texture2D.DEFAULT_TEXTURE_SIZE, 0, gl.RGBA, gl.UNSIGNED_BYTE, (this._pixels));
        }
        else {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, (this._pixels));
        }
    };
    Texture2D.prototype.createDefaultTexture = function () {
        var TEXTURE_SIZE = Texture2D.DEFAULT_TEXTURE_SIZE;
        var NUM_ROW = 8;
        var NUM_COL = 8;
        var initTexels = new Uint8Array(4 * TEXTURE_SIZE * TEXTURE_SIZE);
        for (var i = 0; i < TEXTURE_SIZE; i++) {
            for (var j = 0; j < TEXTURE_SIZE; j++) {
                var patchX = Math.floor(i / (TEXTURE_SIZE / NUM_ROW));
                var patchY = Math.floor(j / (TEXTURE_SIZE / NUM_COL));
                var c = (patchX % 2 != patchY % 2 ? 255 : 0);
                initTexels[4 * i * TEXTURE_SIZE + 4 * j] = c;
                initTexels[4 * i * TEXTURE_SIZE + 4 * j + 1] = c;
                initTexels[4 * i * TEXTURE_SIZE + 4 * j + 2] = c;
                initTexels[4 * i * TEXTURE_SIZE + 4 * j + 3] = 255;
            }
        }
        return initTexels;
    };
    Object.defineProperty(Texture2D.prototype, "width", {
        /**
         * 使用图片作为纹理对象时，宽高即为图片的宽高
         * @returns {number}
         */
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Texture2D.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Texture2D.DEFAULT_TEXTURE_SIZE = 64;
    return Texture2D;
}(Texture_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Texture2D;
},{"../RenderContext":3,"./Texture":53}],55:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Texture_1 = require("./Texture");
var RenderContext_1 = require("../RenderContext");
/**
 * Created by yaozh on 2017/7/3.
 */
var TextureCube = (function (_super) {
    __extends(TextureCube, _super);
    function TextureCube(images) {
        _super.call(this);
        this._images = images;
    }
    TextureCube.prototype.setTextureAttribute = function () {
        var gl = RenderContext_1.default.context;
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0); //this._flipY ? 1 : 0); // Flip the image's y axis
        // Enable the texture unit 0
        gl.activeTexture(gl.TEXTURE0);
        // Bind the texture object to the target
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._buffer);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this._images[0]);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this._images[1]);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this._images[2]);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this._images[3]);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this._images[4]);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this._images[5]);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        // Set the texture parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this._wrapS);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this._wrapT);
        if (this._useMipMap) {
            gl.generateMipmap(gl.TEXTURE_2D);
        }
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this._minFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this._magFilter);
    };
    return TextureCube;
}(Texture_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TextureCube;
},{"../RenderContext":3,"./Texture":53}],56:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Texture_1 = require("./Texture");
/**
 * Created by yaozh on 2017/6/28.
 */
var TextureVideo = (function (_super) {
    __extends(TextureVideo, _super);
    function TextureVideo() {
        _super.apply(this, arguments);
    }
    return TextureVideo;
}(Texture_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TextureVideo;
},{"./Texture":53}],57:[function(require,module,exports){
"use strict";
/**
 * Created by yaozh on 2017/6/30.
 */
var MouseCameraHelper = (function () {
    function MouseCameraHelper() {
    }
    MouseCameraHelper.attach = function (camera) {
        var canvas = (document.getElementById('glContainer'));
        var isUp = true;
        var initX = 0;
        var initY = 0;
        canvas.onmousedown = function (event) {
            isUp = false;
            initX = event.clientX;
            initY = event.clientY;
        };
        canvas.onmousemove = function (event) {
            if (isUp)
                return;
            var deltaX = event.clientX - initX;
            var deltaY = event.clientY - initY;
            camera.rotation.y += deltaX * 0.0001;
            camera.rotation.x += deltaY * 0.0001;
        };
        canvas.onmouseup = function (event) {
            isUp = true;
        };
        canvas.onkeypress = function (event) {
            console.log(event.charCode);
            switch (event.charCode) {
                case 43:
                    {
                        break;
                    }
            }
        };
    };
    return MouseCameraHelper;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MouseCameraHelper;
},{}],58:[function(require,module,exports){
"use strict";
var RenderContext_1 = require("../RenderContext");
/**
 * Created by yaozh on 2017/6/29.
 */
var ShaderHelper = (function () {
    function ShaderHelper() {
    }
    ShaderHelper.getUniformLocation = function (program, uniformName) {
        var gl = RenderContext_1.default.context;
        var uniformLocation = gl.getUniformLocation(program, uniformName);
        if (!uniformLocation) {
            console.error('uniformLocation get failed.', uniformName);
            return null;
        }
        return uniformLocation;
    };
    ShaderHelper.getAttributeLocation = function (program, atrributeName) {
        var gl = RenderContext_1.default.context;
        var attributeLocation = gl.getAttribLocation(program, atrributeName);
        if (attributeLocation <= -1) {
            console.error('attributeLocation get failed.', atrributeName);
            return null;
        }
        return attributeLocation;
    };
    ShaderHelper.uniformMatrix4fv = function (uniformLocation, tranpose, elements) {
        this.checkError(uniformLocation);
        RenderContext_1.default.context.uniformMatrix4fv(uniformLocation, tranpose, elements);
    };
    ShaderHelper.uniform4fv = function (uniformLocation, elements) {
        this.checkError(uniformLocation);
        RenderContext_1.default.context.uniform4fv(uniformLocation, elements);
    };
    ShaderHelper.uniform3fv = function (uniformLocation, elements) {
        this.checkError(uniformLocation);
        RenderContext_1.default.context.uniform3fv(uniformLocation, elements);
    };
    ShaderHelper.uniform4f = function (uniformLocation, x, y, z, w) {
        this.checkError(uniformLocation);
        RenderContext_1.default.context.uniform4f(uniformLocation, x, y, z, w);
    };
    ShaderHelper.uniform3f = function (uniformLocation, x, y, z) {
        this.checkError(uniformLocation);
        RenderContext_1.default.context.uniform3f(uniformLocation, x, y, z);
    };
    ShaderHelper.uniform1i = function (uniformLocation, iv) {
        this.checkError(uniformLocation);
        RenderContext_1.default.context.uniform1i(uniformLocation, iv);
    };
    ShaderHelper.uniform1f = function (uniformLocation, fv) {
        this.checkError(uniformLocation);
        RenderContext_1.default.context.uniform1f(uniformLocation, fv);
    };
    ShaderHelper.assignAttribute = function (buffer, a_attribute, num, type) {
        var gl = RenderContext_1.default.context;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        // Assign the buffer object to the attribute variable
        gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
        gl.enableVertexAttribArray(a_attribute);
    };
    ShaderHelper.checkError = function (uniformLocation) {
        if (!uniformLocation) {
            console.error("uniformLocation is null.");
        }
    };
    return ShaderHelper;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ShaderHelper;
},{"../RenderContext":3}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = { "skybox_frag.glsl": "#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\n\r\nuniform samplerCube u_samplerCube;\r\nvarying vec3 v_TexCood;\r\n\r\nvoid main() {\r\n    gl_FragColor = textureCube(u_samplerCube, v_TexCood);\r\n}", "skybox_vert.glsl": "attribute vec3 a_Position;\r\n\r\nuniform mat4 u_ViewMatrix;\r\nuniform mat4 u_ProjMatrix;\r\n\r\nvarying vec3 v_TexCood;\r\n\r\nvoid main() {\r\n    vec4 pos = u_ProjMatrix * u_ViewMatrix * vec4(a_Position, 1.0);\r\n    \r\n    gl_Position = pos.xyww; \r\n    v_TexCood = a_Position;\r\n}", "standard_gouraud_frag.glsl": "#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\n\r\nuniform sampler2D u_sampler2d;  //2维纹理采样器\r\nvarying vec2 v_TexCood;  //片元纹理坐标\r\nvarying vec3 v_color;\r\n\r\nuniform bool u_HasTexture;\r\n\r\nvoid main() {\r\n    vec3 textureColor = vec3(1.0, 1.0, 1.0);\r\n    if (u_HasTexture) {\r\n        textureColor = vec3(texture2D(u_sampler2d, v_TexCood));\r\n    }\r\n    gl_FragColor = vec4(textureColor * v_color, 1.0);\r\n}\r\n", "standard_gouraud_vert.glsl": "uniform mat4 u_mvMatrix;\r\nuniform mat4 u_ProjMatrix;\r\nuniform mat4 u_NormalMatrix;\r\n\r\nattribute vec4 a_Normal;\r\nattribute vec4 a_Position;\r\n\r\nstruct Material\r\n{\r\n    vec3 emissive; //自身光线放射系数\r\n    vec3 ambient;  //环境光\r\n    vec3 diffuse;  //漫反射系数\r\n    vec3 specular; //镜面反射系数\r\n    float shininess; //高光系数\r\n    float alpha; //透明度\r\n};\r\n\r\nstruct Light\r\n{\r\n    vec4 position; //对于点光源，w==1, 平行光源w==0\r\n    vec3 color; //光源颜色\r\n    float intensity; //光源强度系数\r\n\r\n    float scope; //对于点光源scope是有限的，平行光不设置\r\n    float attenuate; //衰减因子，对点光源有效\r\n\r\n    vec3 direction; // 聚光灯半轴方向\r\n    float theta; // 聚光灯半径边沿与半轴方向的夹角\r\n};\r\n\r\nconst int MAX_LIGHT_NUM = 8; //最大光源数\r\n\r\n//光源数组\r\nuniform Light lights[MAX_LIGHT_NUM];\r\n\r\n\r\n//渲染的面，1 正面  2背面  3双面\r\nuniform int side;\r\n\r\n//uniform Material frontMaterial; //正面材质\r\n//uniform Material backMaterial;  //背面材质\r\n//表面材质\r\n//Material material;\r\n\r\n\r\nuniform vec3 u_globalAmbient;\r\n\r\nuniform vec3 u_materialEmissive;\r\nuniform vec3 u_materialAmbient;\r\nuniform vec3 u_materialDiffuse;\r\nuniform vec3 u_materialSpecular;\r\nuniform float u_materialShiness;\r\n\r\n//varying vec3 v_ViewFragCood; //在视坐标系中，片元坐标\r\n//varying vec3 v_FragNormal;   //片元的法线，由顶点法线插值而来\r\nattribute vec2 a_TexCood;\r\nvarying vec2 v_TexCood;  //片元纹理坐标\r\n\r\nuniform int u_NumLight;\r\n\r\nuniform bool u_HasTexture;\r\n\r\nvarying vec3 v_color;\r\n\r\n\r\nvec3 calculateAmbientColor() {\r\n   if (u_HasTexture) {\r\n       return u_materialAmbient * u_globalAmbient;\r\n   }\r\n   return u_materialEmissive + u_materialAmbient * u_globalAmbient;\r\n}\r\n\r\n\r\nfloat lightIntensity(Light light, float distance) {\r\n    float att = 1.0 / pow(distance, 0.9) * light.attenuate;\r\n    return att * light.intensity;\r\n    //return light.intensity;\r\n}\r\n\r\nvec3 lighting(vec3 fragCoodInView, vec3 viewDirection, vec3 normal) {\r\n    //vec3 textureColor = vec3(1.0, 1.0, 1.0);\r\n    vec3 color = calculateAmbientColor();\r\n\r\n    for (int i = 0; i < MAX_LIGHT_NUM; i++) {\r\n        if (i >= u_NumLight) break; // 超过实际光源数量时，不再执行\r\n        Light light = lights[i];\r\n        bool isDirectionalLight = light.position.w == 0.0; // 是否平行光源\r\n        vec3 lightDirection = isDirectionalLight ? normalize( light.position.xyz ) :\r\n            normalize( light.position.xyz / light.position.w - fragCoodInView );\r\n        float angle = max(dot(lightDirection, normal), 0.0); // 光源方向和法线夹角\r\n        if (angle <= 0.0)continue; // 片元位于背光面， 不计算本光源的光照\r\n\r\n        float intensity = light.intensity;\r\n\r\n        if (!isDirectionalLight) {//点光源\r\n            float distance = distance(fragCoodInView, light.position.xyz);\r\n            if (distance > light.scope) continue; // 超出光源范围， 不计算本光源的光照\r\n            if (light.theta > 0.0) { // 聚光灯是点光源的特例\r\n                float fragTheta = dot(-lightDirection, normalize(light.direction)); // 片元与聚光灯方向的夹角\r\n                fragTheta = max(fragTheta, 0.0);\r\n                if (fragTheta < light.theta) continue; // 夹角过大，超出光源区域\r\n            }\r\n            intensity = lightIntensity(light, distance);\r\n        }\r\n\r\n        //漫反射分量，如果没有纹理，纹理颜色值默认是(1.0, 1.0, 1.0)，即乘以单位1，不变\r\n        color += angle * (intensity * u_materialDiffuse) * light.color;\r\n\r\n        //镜面反射分量\r\n        // Phong\r\n        \r\n\r\n        // Blinn-Phong\r\n        vec3 halfDirection = (viewDirection + lightDirection); // 视线方向和光源方向的二分夹角\r\n        float halfAngle = max(dot(normalize(halfDirection), normal), 0.0);\r\n        if (halfAngle == 0.0) continue;\r\n        color += pow(halfAngle, u_materialShiness) * (intensity * u_materialSpecular) * light.color;\r\n    }\r\n\r\n    return color;\r\n}\r\n\r\nvoid main()\r\n{\r\n    \r\n\r\n    vec4 pos = u_ProjMatrix * u_mvMatrix * a_Position;\r\n    gl_Position = pos;\r\n    vec3 normal = (u_NormalMatrix * a_Normal).xyz;\r\n    if (side == 2 || side == 3)//背面或双面渲染\r\n    {\r\n        //if (!gl_FrontFacing)tnormal = -tnormal;\r\n    }\r\n    v_color = lighting(pos.xyz, normalize(-pos).xyz, normalize(normal));\r\n    if (u_HasTexture) {\r\n        v_TexCood = a_TexCood;\r\n    }\r\n}\r\n", "standard_phong_frag.glsl": "#ifdef GL_ES\r\nprecision mediump float;\r\n#endif\r\n\r\nstruct Material\r\n{\r\n    vec3 emissive; //自身光线放射系数\r\n    vec3 ambient;  //环境光\r\n    vec3 diffuse;  //漫反射系数\r\n    vec3 specular; //镜面反射系数\r\n    float shininess; //高光系数\r\n    float alpha; //透明度\r\n};\r\n\r\nstruct Light\r\n{\r\n    vec4 position; //对于点光源，w==1, 平行光源w==0\r\n    vec3 color; //光源颜色\r\n    float intensity; //光源强度系数\r\n\r\n    float scope; //对于点光源scope是有限的，平行光不设置\r\n    float attenuate; //衰减因子，对点光源有效\r\n\r\n    vec3 direction; // 聚光灯半轴方向\r\n    float theta; // 聚光灯半径边沿与半轴方向的夹角\r\n};\r\n\r\nconst int MAX_LIGHT_NUM = 8; //最大光源数\r\n\r\n//光源数组\r\nuniform Light lights[MAX_LIGHT_NUM];\r\n\r\n\r\n//渲染的面，1 正面  2背面  3双面\r\nuniform int side;\r\n\r\n//uniform Material frontMaterial; //正面材质\r\n//uniform Material backMaterial;  //背面材质\r\n//表面材质\r\n//Material material;\r\n\r\n\r\nuniform vec3 u_globalAmbient;\r\n\r\nuniform vec3 u_materialEmissive;\r\nuniform vec3 u_materialAmbient;\r\nuniform vec3 u_materialDiffuse;\r\nuniform vec3 u_materialSpecular;\r\nuniform float u_materialShiness;\r\n\r\nvarying vec3 v_ViewFragCood; //在视坐标系中，片元坐标\r\nvarying vec3 v_FragNormal;   //片元的法线，由顶点法线插值而来\r\n\r\nuniform sampler2D u_sampler2d;  //2维纹理采样器\r\nvarying vec2 v_TexCood;  //片元纹理坐标\r\n\r\nuniform int u_NumLight;\r\n\r\nuniform bool u_HasTexture;\r\n\r\n\r\nvec3 calculateAmbientColor(inout vec3 textureColor) {\r\n   if (u_HasTexture) {\r\n       textureColor = vec3(texture2D(u_sampler2d, v_TexCood));\r\n   }\r\n   vec3 color = u_materialEmissive + textureColor * u_materialAmbient * u_globalAmbient;//无纹理环境光反射\r\n   return color;\r\n}\r\n\r\n\r\nfloat lightIntensity(Light light, float distance) {\r\n    float att = 1.0 / pow(distance, 0.9) * light.attenuate;\r\n    return att * light.intensity;\r\n    //return light.intensity;\r\n}\r\n\r\nvec3 lighting(vec3 fragCoodInView, vec3 viewDirection, vec3 normal) {\r\n    vec3 textureColor = vec3(1.0, 1.0, 1.0);\r\n    vec3 color = calculateAmbientColor(textureColor);\r\n\r\n    for (int i = 0; i < MAX_LIGHT_NUM; i++) {\r\n        if (i >= u_NumLight) break; // 超过实际光源数量时，不再执行\r\n        Light light = lights[i];\r\n        bool isDirectionalLight = light.position.w == 0.0; // 是否平行光源\r\n        vec3 lightDirection = isDirectionalLight ? normalize( light.position.xyz ) :\r\n            normalize( light.position.xyz / light.position.w - fragCoodInView );\r\n        float angle = max(dot(lightDirection, normal), 0.0); // 光源方向和法线夹角\r\n        if (angle <= 0.0)continue; // 片元位于背光面， 不计算本光源的光照\r\n\r\n        float intensity = light.intensity;\r\n\r\n        if (!isDirectionalLight) {//点光源\r\n            float distance = distance(fragCoodInView, light.position.xyz);\r\n            if (distance > light.scope) continue; // 超出光源范围， 不计算本光源的光照\r\n            if (light.theta > 0.0) { // 聚光灯是点光源的特例\r\n                float fragTheta = dot(-lightDirection, normalize(light.direction)); // 片元与聚光灯方向的夹角\r\n                fragTheta = max(fragTheta, 0.0);\r\n                if (fragTheta < light.theta) continue; // 夹角过大，超出光源区域\r\n            }\r\n            intensity = lightIntensity(light, distance);\r\n        }\r\n\r\n        //漫反射分量，如果没有纹理，纹理颜色值默认是(1.0, 1.0, 1.0)，即乘以单位1，不变\r\n        color += textureColor * angle * (intensity * u_materialDiffuse) * light.color;\r\n\r\n        //镜面反射分量\r\n        // Phong\r\n        \r\n\r\n        // Blinn-Phong\r\n        vec3 halfDirection = (viewDirection + lightDirection); // 视线方向和光源方向的二分夹角\r\n        float halfAngle = max(dot(normalize(halfDirection), normal), 0.0);\r\n        if (halfAngle == 0.0) continue;\r\n        color += textureColor * pow(halfAngle, u_materialShiness) * (intensity * u_materialSpecular) * light.color;\r\n    }\r\n\r\n    return color;\r\n}\r\n\r\nvoid main()\r\n{\r\n    vec3 tnormal = normalize(v_FragNormal);\r\n    if (side == 2 || side == 3)//背面或双面渲染\r\n    {\r\n        if (!gl_FrontFacing)tnormal = -tnormal;\r\n    }\r\n    gl_FragColor = vec4(lighting(v_ViewFragCood, normalize(-v_ViewFragCood), tnormal), 1.0);\r\n}\r\n", "standard_phong_vert.glsl": "uniform mat4 u_mvMatrix;\r\nuniform mat4 u_ProjMatrix;\r\nuniform mat4 u_NormalMatrix;\r\n\r\nattribute vec4 a_Normal;\r\nattribute vec4 a_Position;\r\n\r\nvarying vec3 v_ViewFragCood;\r\nvarying vec3 v_FragNormal;\r\n\r\n//纹理\r\nattribute vec2 a_TexCood;\r\nvarying vec2 v_TexCood;\r\n\r\nuniform bool u_HasTexture;\r\n\r\nvoid main()\r\n{\r\n    vec4 modelViewCood = u_mvMatrix * a_Position;\r\n    gl_Position = u_ProjMatrix * modelViewCood;\r\n    v_FragNormal = (u_NormalMatrix * a_Normal).xyz;\r\n    v_ViewFragCood = modelViewCood.xyz;\r\n    if (u_HasTexture) {\r\n        v_TexCood = a_TexCood;\r\n    }\r\n}\r\n" };
},{}],60:[function(require,module,exports){
"use strict";
/**
 * Created by yaozh on 2017/6/27.
 */
var ShaderUtil = (function () {
    function ShaderUtil() {
    }
    /**
     * 初始化shader
     * @param gl
     * @param vs
     * @param fs
     * @returns {boolean} 是否初始化成功
     */
    ShaderUtil.initShaders = function (gl, vs, fs) {
        var program = this.createProgram(gl, vs, fs);
        if (!program) {
            console.log('Failed to create program');
            return false;
        }
        gl.useProgram(program);
        gl['program'] = program;
        return true;
    };
    /**
     * 创建一个shader程序，留给WebGLRenderingContext使用。
     * @param gl
     * @param vshader
     * @param fshader
     * @returns {WebGLProgram||null}
     */
    ShaderUtil.createProgram = function (gl, vshader, fshader) {
        // Create shader object
        var vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vshader);
        var fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fshader);
        if (!vertexShader || !fragmentShader) {
            return null;
        }
        // Create a program object
        var program = gl.createProgram();
        if (!program) {
            return null;
        }
        // Attach the shader objects
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        // Link the program object
        gl.linkProgram(program);
        // Check the result of linking
        var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
            var error = gl.getProgramInfoLog(program);
            console.log('Failed to link program: ' + error);
            gl.deleteProgram(program);
            gl.deleteShader(fragmentShader);
            gl.deleteShader(vertexShader);
            return null;
        }
        return program;
    };
    /**
     * 删除WebGLProgram对象
     * @param gl
     * @param program
     * @returns {boolean}
     */
    ShaderUtil.deleteProgram = function (gl, program) {
        var shaders = gl.getAttachedShaders(program);
        if (!shaders)
            return false;
        if (shaders.length <= 1)
            return false;
        gl.deleteShader(shaders[0]);
        gl.deleteShader(shaders[1]);
        gl.deleteProgram(program);
        return true;
    };
    /**
     * 创建shader对象
     * @param gl
     * @param type shader类型，gl.VERTEX_SHADER, gl.FRAGMENT_SHADER
     * @param source shader代码
     * @returns {WebGLShader||null}
     */
    ShaderUtil.createShader = function (gl, type, source) {
        // Create shader object
        var shader = gl.createShader(type);
        if (!shader) {
            console.log('unable to create shader');
            return null;
        }
        // Set the shader program
        gl.shaderSource(shader, source);
        // Compile the shader
        gl.compileShader(shader);
        // Check the result of compilation
        var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            var error = gl.getShaderInfoLog(shader);
            console.log('Failed to compile shader: ' + error);
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    };
    return ShaderUtil;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ShaderUtil;
},{}]},{},[18])

//# sourceMappingURL=mygl.js.map
