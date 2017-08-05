import ObjGeometry from "./ObjGeometry";
/**
 * Created by yaozh on 2017/7/7.
 */
export default class ObjParser
{
    private _vcount:number = 0;
    private _vertices:Array<number>;
    private _normals:Array<number>;
    private _textures:Array<number>;

    public constructor(objDataStr:string)
    {
        this.parse(objDataStr);
    }

    public get vertexCount():number
    {
        return this._vcount;
    }

    public get vertices():Array<number>
    {
        return this._vertices;
    }

    public get normals():Array<number>
    {
        return this._normals;
    }

    public get textures():Array<number>
    {
        return this._textures;
    }

    private parse(objStr:string):void
    {
        //原始顶点坐标列表--直接从obj文件中加载
        let alv:Array<number> = [];
        //结果顶点坐标列表--按面组织好
        let alvResult:Array<number> = [];
        //原始纹理坐标列表
        let alt:Array<number> = [];
        //纹理坐标结果列表
        let altResult:Array<number> = [];
        //原始法向量列表
        let aln = [];
        //法向结果量列表
        let alnResult:Array<number> = [];

        let lines = objStr.split("\n");

        for (let lineIndex in lines)
        {
            let line:string = lines[lineIndex].replace(/[ \t]+/g, " ").replace(/\s\s*$/, "");
            if (line[0] == "#")
            {
                continue;
            }

            let array = line.split(" ");
            if (array[0] == "v")
            {
                alv.push(parseFloat(array[1]));
                alv.push(parseFloat(array[2]));
                alv.push(parseFloat(array[3]));
            }
            else if (array[0] == "vt")
            {
                alt.push(parseFloat(array[1]));
                alt.push(1.0-parseFloat(array[2]));
            }
            else if (array[0] == "vn")
            {
                aln.push(parseFloat(array[1]));
                aln.push(parseFloat(array[2]));
                aln.push(parseFloat(array[3]));
            }
            else if (array[0] == "f")
            {
                if (array.length != 4)
                {
                    //console.error("array.length != 4");
                    continue;
                }
                for (let i = 1; i < 4; ++i)
                {
                    let tempArray:string[] = array[i].split("/");
                    let vIndex:number = parseInt(tempArray[0]) - 1;
                    let tIndex:number = parseInt(tempArray[1]) - 1;
                    let nIndex:number = parseInt(tempArray[2]) - 1;

                    alvResult.push(alv[vIndex * 3 + 0], alv[vIndex*3+1], alv[vIndex*3+2]);
                    altResult.push(alt[tIndex * 2 + 0], alt[tIndex*2+1]);
                    alnResult.push(aln[nIndex * 3 + 0], aln[nIndex*3+1], aln[nIndex*3+2]);
                }
            }
        }
        console.log(alvResult.length);
        console.log(alnResult.length);

        this._vcount = alnResult.length / 3;
        this._vertices = alvResult;
        this._textures = altResult;
        this._normals = alnResult;
    }
}