import PgDataSource from "../../data-source";
import { Parametro } from "../../entities/Parametro";
import { TipoParametro } from "../../entities/TipoParametro";

class ManipulaObjetoParametro {

    async criarRelacionametoEstacaoParametro (listaTipoParametro): Promise<Parametro[]> {
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
            await repositorioParametro.save(novoParametro)
            listaParametro.push(novoParametro);                 
        }
        return listaParametro;
    };

    async consultaTipoParametroEmParametro (listaTipoParametroAtualizados: number[], idEstacaoAlteracao: string) {
        const repositorioParametro = PgDataSource.getRepository(Parametro);        
        const listaParametroAntesAtualizacao = await repositorioParametro.createQueryBuilder("parametro").
            where("parametro.estacoes.idEstacao = :id", {id: idEstacaoAlteracao}).
            getMany();
        for (const parametro of listaParametroAntesAtualizacao) {
            const tipoParametro = await parametro.tiposParametro;
            if(!listaTipoParametroAtualizados.includes(tipoParametro.idTipoParametro)) {
                repositorioParametro.createQueryBuilder().update(Parametro).
                    set({
                        statusParametro: false
                    }).
                    where("idParametro = :idParametro", {idParametro: parametro.idParametro}).
                    execute();
            } else {
                repositorioParametro.createQueryBuilder().update(Parametro).
                set({
                    statusParametro: true
                }).
                where("idParametro = :idParametro", {idParametro: parametro.idParametro}).
                execute();
            }            
            const indiceIdTipoParametro = listaTipoParametroAtualizados.indexOf((tipoParametro).idTipoParametro);            
            if (indiceIdTipoParametro !== -1) {
                listaTipoParametroAtualizados.splice(indiceIdTipoParametro, 1);
            };       
        };

        const listaTipoParametroParaCadastrar = [];
        for (const idTipoParametro of listaTipoParametroAtualizados) {
            const simulaObjetoTipoParametro = {
                idTipoParametro: idTipoParametro
            }
            listaTipoParametroParaCadastrar.push(simulaObjetoTipoParametro);          
        };

        const listaIdTipoParametroCadastrados = await this.criarRelacionametoEstacaoParametro(listaTipoParametroParaCadastrar);        
        return listaIdTipoParametroCadastrados;       
    }
};

export default new ManipulaObjetoParametro();