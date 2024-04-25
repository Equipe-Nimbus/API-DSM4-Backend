import PgDataSource from "../../data-source";
import { Estacao } from "../../entities/Estacao";

class PegaQuantidadeTotalEstacao{

    async pegar(){
        const repositorioEstacao = PgDataSource.getRepository(Estacao);
        let quantidadeEstacaoTotal = await repositorioEstacao.count()
        return quantidadeEstacaoTotal
    }

}

export default new PegaQuantidadeTotalEstacao()