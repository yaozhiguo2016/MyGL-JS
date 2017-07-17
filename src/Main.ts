/// <reference path="../typings/index.d.ts" />
/**
 * Created by yaozh on 2017/5/25.
 */
import Example from "./examples/Example";
import ModelAndTexture from "./examples/ModelAndTexture";

export default class Main
{
    /**
     * 本方法会被自动执行。
     */

    private example:Example;

    public start():void
    {
        this.example = new ModelAndTexture();
        this.example.run();
    }
}