import Event from "./BaseEvent";
/**
 * Created by yaozh on 2017/6/1.
 */
export default class EventDispatcher
{
    private _listeners:Object;

    public constructor()
    {
        this._listeners = {};
    }

    public addEventListener(type:string, listener:Function, context:any):void
    {
        let listeners = this._listeners;
        if ( listeners[ type ] === void 0 )
        {
            listeners[ type ] = [];
        }
        if ( listeners[ type ].indexOf( listener ) === - 1 )
        {
            listeners[ type ].push( new EventContext(listener, context) );
        }
    }

    public removeEventListener(type:string, listener:Function, context:any):void
    {
        let listeners:Object = this._listeners;
        let listenerArray:EventContext[] = listeners[ type ];

        if ( listenerArray !== undefined )
        {
            for (let index in listenerArray)
            {
                if (listenerArray[index].listener == listener && listenerArray[index].context == context)
                {
                    listenerArray.splice(parseInt(index), 1);
                }
            }
        }
    }

    public hasEventListener(type:string, listener:Function):boolean
    {
        return !!this.findEventContext(type, listener);
    }

    public dispatch(event:Event):void
    {
        let listeners = this._listeners;
        let listenerArray:EventContext[] = listeners[ event.type ];

        if ( listenerArray !== void 0 )
        {
            event.currentTarget = this;
            for (let context of listenerArray)
            {
                context.listener.call(context.context || this, event);
            }
        }
    }

    private findEventContext(eventType:string, listener:Function):EventContext
    {
        let listeners:Object = this._listeners;
        let listenerArray:EventContext[] = listeners[ eventType ];

        if ( listenerArray !== undefined )
        {
            for (let context of listenerArray)
            {
                if (context.listener == listener)
                {
                    return context;
                }
            }
        }
        return null;
    }
}

class EventContext{

    public listener:Function;
    public context:Object;

    constructor(listener:Function, context:Object)
    {
        this.listener = listener;
        this.context = context;
    }
}