/**
 * Created by yaozh on 2017/6/1.
 */
export default class RenderContext {
  private static _viewportWidth: number = 0;
  private static _viewportHeight: number = 0;
  private static _context: WebGLRenderingContext;

  public static get viewportWidth(): number {
    return this._viewportWidth;
  }

  public static get viewportHeight(): number {
    return this._viewportHeight;
  }

  public static get context(): WebGLRenderingContext {
    return this._context;
  }

  public static get isSupportWebGL(): boolean {
    let canvas: HTMLCanvasElement = document.createElement('canvas');
    let names: string[] = ["webgl2", "webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    let context: WebGLRenderingContext = null;
    for (let i: number = 0; i < names.length; i++) {
      try {
        let name: string = names[i];
        context = <WebGLRenderingContext>(canvas.getContext(name));
      } catch (e) {
        //console.log(e);
      }
      if (context) return true;
    }
    return false;
  }

  public static createConext(canvas:HTMLCanvasElement, antialias?: boolean): WebGLRenderingContext {
    let names: string[] = ["webgl2", "webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    let context: WebGLRenderingContext = null;
    for (let i: number = 0; i < names.length; i++) {
      try {
        let name: string = names[i];
        context = <WebGLRenderingContext>(canvas.getContext(name, {antialias: (antialias || true)}));
      } catch (e) {
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
  }

  private static _usedProgram: WebGLProgram;

  public static get usedProgram(): WebGLProgram {
    return this._usedProgram
  }

  public static set usedProgram(value: WebGLProgram) {
    this.context.useProgram(value);
    this._usedProgram = value;
  }
}