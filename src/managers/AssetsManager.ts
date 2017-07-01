import EventDispatcher from "../base/EventDispatcher";
import AssetData from "./AssetData";
import BaseEvent from "../base/BaseEvent";
import ImageLoader from "../loaders/ImageLoader";
import TextFileLoader from "../loaders/TextFileLoader";
/**
 * Created by yaozh on 2017/6/26.
 */
export default class AssetsManager extends EventDispatcher
{
    public static LOAD_COMPLETE:string = "loadComplete";
    public static GROUP_LOAD_COMPLETE:string = "groupLoadComplete";

    private static _instance:AssetsManager;

    public static getInstance():AssetsManager
    {
        if (!this._instance){
            this._instance = new AssetsManager();
        }
        return this._instance;
    }

    private assetsData:Array<AssetData> = [];
    private _isLoading:boolean = false;

    private assets:Object = {};

    public add(asset:AssetData):void
    {
        this.assetsData.push(asset);
    }

    public addGroup(assets:Array<AssetData>):void
    {
        this.assetsData = this.assetsData.concat(assets);
    }

    public load():void
    {
        if (this.assetsData.length == 0)return;
        this.next();
    }

    private next():void
    {
        let assetData:AssetData = this.assetsData.shift();
        if (assetData)
        {
            this.loadByType(assetData.key, assetData.type, assetData.versionUrl);
        }
        else
        {
            this.dispatch(new BaseEvent(AssetsManager.GROUP_LOAD_COMPLETE));
        }
    }

    private loadByType(key:string, type:string, url:string):void
    {
        switch (type)
        {
            case AssetData.IMAGE:
            {
                this.createImageLoader(key, url);
                break;
            }
            case AssetData.TEXT:
            {
                this.createTextLoader(key, url);
                break;
            }
        }
    }

    private createImageLoader(key:string, url:string):void
    {
        let loader:ImageLoader = new ImageLoader();
        loader.addEventListener("COMPLETE", (event:BaseEvent)=>{
            this.assets[key] = event.data;
            this.next();
        }, this);
        loader.addEventListener("IO_ERROR", (event:BaseEvent)=>{
            this.next();
        }, this);
        loader.load(url);
    }

    private createTextLoader(key:string, url:string):void
    {
        let loader:TextFileLoader = new TextFileLoader();
        loader.load(url);
        loader.addEventListener(TextFileLoader.TEXT_LOADED, (event:BaseEvent)=>{
            this.assets[key] = event.data;
            this.next();
        }, this);
    }

    public getAsset(key:string):any
    {
        return this.assets[key];
    }
}