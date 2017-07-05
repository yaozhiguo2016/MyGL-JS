import EventDispatcher from "../base/EventDispatcher";
import HttpRequest from "./HttpRequest";
import BaseEvent from "../base/BaseEvent";
/**
 * Created by yaozh on 2017/6/26.
 */

let winURL = window["URL"] || window["webkitURL"];

export default class ImageLoader extends EventDispatcher
{
    public constructor()
    {
        super();
    }

    /**
     * @private
     * 使用 load() 方法加载成功的 BitmapData 图像数据。
     */
    //public data:BitmapData = null;
    public image:HTMLImageElement = null;

    /**
     * @private
     * 当从其他站点加载一个图片时，指定是否启用跨域资源共享(CORS)，默认值为null。
     * 可以设置为"anonymous","use-credentials"或null,设置为其他值将等同于"anonymous"。
     */
    private _crossOrigin:string = null;

    /**
     * @private
     * 标记crossOrigin有没有被设置过,设置过之后使用设置的属性
     */
    private _hasCrossOriginSet:boolean = false;

    public set crossOrigin(value:string)
    {
        this._hasCrossOriginSet = true;
        this._crossOrigin = value;
    }

    public get crossOrigin():string
    {
        return this._crossOrigin;
    }

    /**
     * @private
     * 指定是否启用跨域资源共享,如果ImageLoader实例有设置过crossOrigin属性将使用设置的属性
     */
    public static crossOrigin:string = null;

    /**
     * @private
     */
    private currentImage:HTMLImageElement = null;

    /**
     * @private
     */
    private currentURL:string;

    /**
     * @private
     */
    private request:HttpRequest = null;

    /**
     * @private
     * 启动一次图像加载。注意：若之前已经调用过加载请求，重新调用 load() 将终止先前的请求，并开始新的加载。
     * @param url 要加载的图像文件的地址。
     */
    public load(url:string):void
    {
        if (this.blobSupport()
            && url.indexOf("wxLocalResource:") != 0//微信专用不能使用 blob
            && url.indexOf("data:") != 0
            && url.indexOf("http:") != 0
            && url.indexOf("https:") != 0) //如果是base64编码或跨域访问的图片，直接使用Image.src解析。
        {
            let request = this.request;
            if (!request) {
                request = this.request = new HttpRequest();
                request.addEventListener('COMPLETE', this.onBlobLoaded, this);
                request.addEventListener('IO_ERROR', this.onBlobError, this);
                request.responseType = "blob";
            }
            request.open(url);
            request.send();
        }
        else
        {
            this.loadImage(url);
        }
    }

    /**
     * @private
     */
    private onBlobLoaded(event:BaseEvent):void
    {
        let blob:Blob = this.request.response;
        this.loadImage(winURL.createObjectURL(blob));
    }

    /**
     * @private
     */
    private onBlobError(event:BaseEvent):void
    {
        this.dispatchIOError(this.currentURL);
    }

    /**
     * @private
     */
    private loadImage(src:string):void
    {
        let image = new Image();
        //this.data = null;
        this.currentImage = image;
        if(this._hasCrossOriginSet)
        {
            if (this._crossOrigin)
            {
                image.crossOrigin = this._crossOrigin;
            }
        }
        else
        {
            if(ImageLoader.crossOrigin)
            {
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
    }

    /**
     * @private
     */
    private onImageComplete(event):void
    {
        let image = this.getImage(event);
        if (!image)
        {
            return;
        }
        //this.data = new egret.BitmapData(image);
        this.image = image;
        window.setTimeout(():void => {
            this.dispatch(new BaseEvent('COMPLETE', image));
        }, 0);
    }

    /**
     * @private
     */
    private onLoadError(event):void
    {
        let image = this.getImage(event);
        if (!image)
        {
            return;
        }
        this.dispatchIOError(image.src);
    }

    private dispatchIOError(url:string):void
    {
        window.setTimeout(():void => {
            this.dispatch(new BaseEvent('IO_ERROR'));
        }, 0);
    }

    /**
     * @private
     */
    private getImage(event:any):HTMLImageElement
    {
        let image:HTMLImageElement = event.target;
        let url:string = image.src;
        if (url.indexOf("blob:") == 0)
        {
            try
            {
                winURL.revokeObjectURL(image.src);
            }
            catch(e)
            {
                console.warn('get blob error.');
            }
        }
        image.onerror = null;
        image.onload = null;
        if (this.currentImage !== image)
        {
            return null;
        }
        this.currentImage = null;
        return image;
    }

    //check blob data format support
    private blobSupport():boolean
    {
        let ua:string = navigator.userAgent.toLowerCase();
        let ma = ua.toLowerCase().match(/cpu [^\d]*\d.*like mac os x/);
        if (!ma)return false;
        let value:string = ma[0];
        let iOSVersion:number = parseInt(value.match(/\d+(_\d)*/)[0]) || 0;
        return iOSVersion >= 7;
    }
}