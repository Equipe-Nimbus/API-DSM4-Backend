import MongoDB from "../../BackMongDB";
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
        if(estacaoMesAtual != null)
            return estacaoMesAtual
        let estacaoMesAtualNovo:EstacaoAtivaMesInterface ={
            _id: undefined,
            ativas: 0,
            mes: mesAtual,
            ano: anoAtual
        }
        console.log("EEEE AQUIII", estacaoMesAtualNovo)
        return estacaoMesAtualNovo
    }

    async pegaParaDashboard(){
        await MongoDB.connect()
        const colecaoEstacoesMes = MongoDB.db("BackNimbusNaoRelacional").collection("EstacoesAtivasMes")
        const estacoesAtivasPorMes = await colecaoEstacoesMes.find().sort({_id:-1}).limit(12).toArray() as EstacaoAtivaMesInterface[]
        console.log(estacoesAtivasPorMes)
        await MongoDB.close()
        return FormataEstacoesAtivasPorMes.formatar(estacoesAtivasPorMes)
    }

}

export default new PegaEstacaoPorMesAtiva()