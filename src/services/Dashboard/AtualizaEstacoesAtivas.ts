import MongoDB from "../../BackMongDB";
import PgDataSource from "../../data-source";
import { Estacao } from "../../entities/Estacao";
import PegaEstacaoPorMesAtiva from "./PegaEstacaoPorMesAtiva";

class AtualizaEstacoesAtivas{

    async atualizar(){
        const repositorioEstacao = PgDataSource.getRepository(Estacao)
        let estacaoMesAtivaAtual = await PegaEstacaoPorMesAtiva.pegarAtual()
        estacaoMesAtivaAtual.ativas = await repositorioEstacao.count({where:{statusEstacao:true}})
        await MongoDB.connect()
        const colecao = MongoDB.db("BackNimbusNaoRelacional").collection("EstacoesAtivasMes")
        await colecao.replaceOne({_id:estacaoMesAtivaAtual._id}, estacaoMesAtivaAtual, {upsert:true})
        await MongoDB.close()
    }
}

export default new AtualizaEstacoesAtivas()