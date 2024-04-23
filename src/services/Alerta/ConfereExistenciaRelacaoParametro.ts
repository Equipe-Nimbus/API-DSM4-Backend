import { Request } from "express";
import PgDataSource from "../../data-source";
import { Parametro } from "../../entities/Parametro";

class ConfereIgualdadeTipoParametro{

    async confere(idEstacao:string, idTipoParametro:number){
        const repositorioParametro = PgDataSource.getRepository(Parametro)
        const parametro = await repositorioParametro.findOne({where:{estacoes:{idEstacao}, tiposParametro:{idTipoParametro}}})
        if(parametro)
            return parametro
        return undefined
    }
}

export default new ConfereIgualdadeTipoParametro()