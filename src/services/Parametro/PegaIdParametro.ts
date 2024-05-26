import PgDataSource from "../../data-source";
import { Parametro } from "../../entities/Parametro";

class PegaIdParametro{

    async pegar(idEstacao:string, idTipoParametro:number){
        const parametroRepositorio = PgDataSource.getRepository(Parametro)
        const parametro = await parametroRepositorio.findOne({where:{estacoes:{idEstacao:idEstacao}, tiposParametro:{idTipoParametro:idTipoParametro}}})
        return parametro.idParametro
    }

}

export default new PegaIdParametro()