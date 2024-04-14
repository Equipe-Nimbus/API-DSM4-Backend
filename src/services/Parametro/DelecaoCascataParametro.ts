import { Repository } from "typeorm";
import { Parametro } from "../../entities/Parametro";
import { TipoParametro } from "../../entities/TipoParametro";
import PgDataSource from "../../data-source";

class DelecaoCascataParametro{

    async deletar(tipoParametro:TipoParametro){
        const repositorio = PgDataSource.getRepository(Parametro)
        let listaRelacaoParametro = await repositorio.find({where:{tiposParametro:tipoParametro}})
        if(listaRelacaoParametro.length == 0)
            return;
        listaRelacaoParametro.forEach(parametro => {
            parametro.statusParametro = false
        });
        repositorio.save(listaRelacaoParametro);
    }

}

export default new DelecaoCascataParametro()