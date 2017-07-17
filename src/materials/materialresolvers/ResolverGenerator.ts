import MaterialResolver from "./MaterialResolver";
import StandardMaterialResolver from "./StandardMaterialResolver";
import Mesh from "../../core/Mesh";
import StandardMaterial from "../StandardMaterial";
import CubeMapMaterialResolver from "./CubeMapMaterialResolver";
/**
 * Created by yaozh on 2017/6/28.
 */
export default class ResolverGenerator
{
    public static createResolver(material:StandardMaterial, mesh:Mesh):MaterialResolver
    {
        let result:MaterialResolver;

        switch (material.type)
        {
            case 'StandardMaterial':
            {
                result = new StandardMaterialResolver(mesh, material);
                break;
            }
            case 'CubeMapMaterial':
            {
                result = new CubeMapMaterialResolver(mesh, material);
                break;
            }
        }

        return result;
    }
}