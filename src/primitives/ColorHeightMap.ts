import Geometry from "./Geometry";
/**
 * Created by yaozh on 2017/7/18.
 */
export default class ColorHeightMap extends Geometry
{
    private _heightImg:HTMLImageElement;
    private _devideW:number;
    private _devideH:number;
    private _maxHeight:number;
    private _heightOffset:number;

    public constructor(heightImg:HTMLImageElement, devideW?:number, devideH?:number, maxHeight?:number, heightOffset?:number)
    {
        super();

        this._heightImg = heightImg;
        this._devideW = devideW || 1;
        this._devideH = devideH || 1;

        this._maxHeight = maxHeight || 10;
        this._heightOffset = heightOffset || -2;

        this._indexDraw = false;

        this.initVertexData(this.assign(this.createHeights()));
    }


    private createHeights():Array<number>
    {
        let count:number = 0;
        let heights:Array<number> = [];

        let canvas:HTMLCanvasElement = <HTMLCanvasElement>(document.getElementById('imgContainer'));
        let ctx:CanvasRenderingContext2D = canvas.getContext('2d');
        ctx.drawImage(this._heightImg, 0, 0, this._heightImg.width, this._heightImg.height);
        let imageData:ImageData = ctx.getImageData(0, 0, this._heightImg.width, this._heightImg.height);

        for (let i:number = 0; i < imageData.data.length; i+=4)
        {
            let r:number = imageData.data[i];
            let g:number = imageData.data[i + 1];
            let b:number = imageData.data[i + 2];
            imageData.data[i + 3] = 255;
            let h:number = (r + g + b) / 3;
            heights[count] = h * this._maxHeight / 255 + this._heightOffset;
            count++;
        }

        ctx.clearRect(0, 0, this._heightImg.width, this._heightImg.height);

        return heights;
    }

    private assign(heights:Array<number>):Array<number>
    {
        let result = [];
        let counter:number = 0;
        let row:number = this._heightImg.height;
        let col:number = this._heightImg.width;
        for (let i:number = 0; i < row; i++)
        {
            result[i] = [];
            for (let j:number = 0; j < col; j++)
            {
                result[i][j] = heights[counter++];
            }
        }
        return result;
    }

    private initVertexData(result:Array<any>):void
    {
        let count=0;
        let vertices:Array<number> = [];
        let rowsPlusOne = this._heightImg.height;
        let colsPlusOne = this._heightImg.width;


        for(let j = 0; j < rowsPlusOne - 1; j++)
        {
            for(let i = 0; i < colsPlusOne - 1; i++)
            {
                //计算当前格子左上侧点坐标
                let zsx = -1 * colsPlusOne / 2 + i*1;
                let zsz = -1 * rowsPlusOne / 2 + j*1;

                vertices[count++]=zsx;
                vertices[count++]=result[j][i];
                vertices[count++]=zsz;

                vertices[count++]=zsx;
                vertices[count++]=result[j+1][i];
                vertices[count++]=zsz+1;

                vertices[count++]=zsx+1;
                vertices[count++]=result[j][i+1];
                vertices[count++]=zsz;

                vertices[count++]=zsx+1;
                vertices[count++]=result[j][i+1];
                vertices[count++]=zsz;

                vertices[count++]=zsx;
                vertices[count++]=result[j+1][i];
                vertices[count++]=zsz+1;

                vertices[count++]=zsx+1;
                vertices[count++]=result[j+1][i+1];
                vertices[count++]=zsz+1;
            }
        }

        this._vertexPositions = new Float32Array(vertices);
        this._vertexNormals = new Float32Array(vertices);

        let sizew:number = 16 / rowsPlusOne;//列数
        let sizeh:number = 16 / colsPlusOne;//行数
        let c = 0;
        let uv:Array<number> = [];
        for(let i = 0; i < colsPlusOne - 1; i++)
        {
            for(let j:number = 0;j < rowsPlusOne - 1; j++)
            {
                //每行列一个矩形，由两个三角形构成，共六个点，12个纹理坐标
                let s=j*sizew;
                let t=i*sizeh;
                uv[c++]=s;
                uv[c++]=t;
                uv[c++]=s;
                uv[c++]=t+sizeh;
                uv[c++]=s+sizew;
                uv[c++]=t;
                uv[c++]=s+sizew;
                uv[c++]=t;
                uv[c++]=s;
                uv[c++]=t+sizeh;
                uv[c++]=s+sizew;
                uv[c++]=t+sizeh;
            }
        }

        this._vertexUVs = new Float32Array(uv);
        this._vertexNum = vertices.length / 3;
    }
}