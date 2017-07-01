import Camera from "../cameras/Camera";
/**
 * Created by yaozh on 2017/6/30.
 */
export default class MouseCameraHelper
{
    public static attach(camera:Camera):void
    {
        let canvas:HTMLCanvasElement = <HTMLCanvasElement>(document.getElementById('glContainer'));
        let isUp:boolean = true;
        let initX:number = 0;
        let initY:number = 0;
        canvas.onmousedown = (event:MouseEvent)=>{
            isUp = false;
            initX = event.clientX;
            initY = event.clientY;
        };

        canvas.onmousemove = (event:MouseEvent)=>{

            if (isUp)return;

            let deltaX:number = event.clientX - initX;
            let deltaY:number = event.clientY - initY;

            camera.rotation.y += deltaX * 0.0001;
            camera.rotation.x += deltaY * 0.0001;
        };

        canvas.onmouseup = (event:MouseEvent)=>{
            isUp = true;
        };

        canvas.onkeypress = (event:KeyboardEvent)=>{
            console.log(event.charCode);
            switch (event.charCode)
            {
                case 43:
                {
                    break;
                }
            }
        };
    }
}