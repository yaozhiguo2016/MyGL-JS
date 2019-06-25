/**
 * Created by yaozh on 2017/6/6.
 */

export default class Material {
  protected _type: string;

  public constructor() {
    this._type = 'Material';
  }

  public get type(): string {
    return this._type;
  }
}