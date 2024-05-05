import MongoDB from "../../BackMongDB";
import PgDataSource from "../../data-source";
import { Estacao } from "../../entities/Estacao";
import EstacaoAtivaMesInterface from "../../interfaces/EstacaoAtivaMesInterface";
import FormataEstacoesAtivasPorMes from "./FormataEstacoesAtivasPorMes";
import FormatandoDatas from "./FormatandoDatas";

class PegaEstacaoPorMesAtiva{

    async pegarAtual(){
        await MongoDB.connect()
        const colecaoEstacoesMes = MongoDB.db("BackNimbusNaoRelacional").collection("EstacoesAtivasMes")
        const mesAtual = FormatandoDatas.numeroMesParaString(new Date().getMonth())
        const anoAtual = new Date().getFullYear().toString()
        let estacaoMesAtual = await colecaoEstacoesMes.findOne({mes:mesAtual, ano:anoAtual}) as EstacaoAtivaMesInterface
        await MongoDB.close()
        console.log("Estacao mes atual", estacaoMesAtual, estacaoMesAtual != null)
        if(estacaoMesAtual != null)
            return estacaoMesAtual
        const repositorioEstacao = PgDataSource.getRepository(Estacao)
        let estacaoMesAtualNovo:EstacaoAtivaMesInterface ={
            _id: undefined,
            ativas: 0,
            mes: mesAtual,
            ano: anoAtual
        }
        estacaoMesAtualNovo.ativas = await repositorioEstacao.count({where:{statusEstacao:true}})
        return estacaoMesAtualNovo
    }

    async pegaParaDashboard(){
        await MongoDB.connect()
        const colecaoEstacoesMes = MongoDB.db("BackNimbusNaoRelacional").collection("EstacoesAtivasMes")
        const estacoesAtivasPorMes = await colecaoEstacoesMes.find().limit(12).toArray() as EstacaoAtivaMesInterface[]
        await MongoDB.close()
        return FormataEstacoesAtivasPorMes.formatar(estacoesAtivasPorMes)
    }

}

export default new PegaEstacaoPorMesAtiva()