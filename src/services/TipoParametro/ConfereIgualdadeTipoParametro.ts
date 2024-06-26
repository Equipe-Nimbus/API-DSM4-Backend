import { TipoParametro } from "../../entities/TipoParametro";
import PgDataSource from "../../data-source";

class ConfereIgualdadeTipoParametro{

    repositorioTipoParametro = PgDataSource.getRepository(TipoParametro)

    async conferir(tipoParametroCadastrando: TipoParametro){
        let resultado = await this.repositorioTipoParametro.findOne({where:{
            nomeTipoParametro:tipoParametroCadastrando.nomeTipoParametro,
            fatorTipoParametro:tipoParametroCadastrando.fatorTipoParametro,
            offsetTipoParametro:tipoParametroCadastrando.offsetTipoParametro,
            unidadeTipoParametro:tipoParametroCadastrando.unidadeTipoParametro,
            statusTipoParametro:true
        }})
        if(resultado == undefined)
            return true
        return false
    }

}

export default new ConfereIgualdadeTipoParametro()