import EventDispatcher from "../base/EventDispatcher";
import BaseEvent from "../base/BaseEvent";
/**
 * Created by yaozh on 2017/6/1.
 */
export default class TextFileLoader extends EventDispatcher
{
    public static TEXT_LOADED:string = 'FileLoadComplete';
    private _text:string;
    public get text():string
    {
        return this._text;
    }

    public load(url:string):void
    {
        let request:XMLHttpRequest = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState === request.DONE && request.status !== 404) {
                this._text = request.responseText;
                this.dispatch(new BaseEvent(TextFileLoader.TEXT_LOADED, request.responseText));
            }
        };
        request.open('GET', url, true);
        request.send();
    }
}