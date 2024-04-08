import PgDataSource from "../../data-source";
import { Parametro } from "../../entities/Parametro";
import { TipoParametro } from "../../entities/TipoParametro";

class CriaObjetoParametro {

    async criarRelacionameto (listaTipoParametro): Promise<Parametro[]> {
        const repositorioTipoParametro = PgDataSource.getRepository(TipoParametro);
        const repositorioParametro = PgDataSource.getRepository(Parametro);
        let listaParametro: Parametro[] = [];
        for (const tipoParametro of listaTipoParametro) {
            if (Object.keys(tipoParametro).length == 0)
                return [];            
            let novoParametro = new Parametro();
            let objetoTipoParametro = await repositorioTipoParametro.findOne({
                where: {
                    idTipoParametro: tipoParametro.idTipoParametro
                }
            });    
            novoParametro.tiposParametro = Promise.resolve(objetoTipoParametro);
            listaParametro.push(novoParametro);
            await repositorioParametro.save(novoParametro);                    
        }
        return listaParametro;
    };
};

export default new CriaObjetoParametro();