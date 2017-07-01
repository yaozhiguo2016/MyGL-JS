import MaterialResolver from "./MaterialResolver";
import StandardMaterialResolver from "./StandardMaterialResolver";
import Mesh from "../../core/Mesh";
import Material from "../Material";
/**
 * Created by yaozh on 2017/6/28.
 */
export default class ResolverGenerator
{
    public static createResolver(materialType:string, mesh:Mesh, material:Material):MaterialResolver
    {
        let result:MaterialResolver;

        switch (materialType)
        {
            case 'StandardMaterial':
            {
                result = new StandardMaterialResolver(mesh, material);
                break;
            }
        }

        return result;
    }
}