import PgDataSource from "../../data-source";
import { TipoParametro } from "../../entities/TipoParametro";


class ConsultaMesmoNomeUnidadeTipoParametro {
    async consulta(listaIdTipoParametro): Promise<boolean> {
        const repositorioTipoParametro = PgDataSource.getRepository(TipoParametro)
        const listaTipoParametrosRegatados: TipoParametro[] = [];
        const listaNomeUnidade: Set<string> = new Set();

        for (const objetoIdtipoParametro of listaIdTipoParametro) {
            let idTipoParametroEscolhido: number = objetoIdtipoParametro.idTipoParametro;            
            let objetoTipoParametro = await repositorioTipoParametro.createQueryBuilder("tipo_parametro")
                .select(["tipo_parametro.nomeTipoParametro", "tipo_parametro.unidadeTipoParametro"])
                .where("tipo_parametro.idTipoParametro = :id", {id: idTipoParametroEscolhido})
                .getOne();
            listaTipoParametrosRegatados.push(objetoTipoParametro);
        };

        for (const tipoParametroResgatado of listaTipoParametrosRegatados) {
            let nomeUnidadeTipoParametro = `${tipoParametroResgatado.nomeTipoParametro}${tipoParametroResgatado.unidadeTipoParametro}`;
            if (listaNomeUnidade.has(nomeUnidadeTipoParametro))
                return true;
            listaNomeUnidade.add(nomeUnidadeTipoParametro);  
        };        
        return false;
    };
};

export default new ConsultaMesmoNomeUnidadeTipoParametro();