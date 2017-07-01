/**
 * Created by yaozh on 2017/6/26.
 */
export default class AssetData
{
    public static IMAGE:string = 'typeImage';
    public static JSON:string = 'typeJson';
    public static TEXT:string = 'typeText';
    public static BIN:string = 'typeBinary';

    public key:string;
    public type:string;
    public url:string;
    public version:string;

    public get versionUrl():string
    {
        return this.url + '?ver=' + this.version;
    }

    public constructor(key:string, type:string, url:string, version?:string)
    {
        this.key = key;
        this.type = type;
        this.url = url;
        this.version = version || '1.0.0';
    }
}