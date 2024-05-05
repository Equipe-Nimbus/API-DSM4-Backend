import MongoDB from "../../BackMongDB";
import PegaEstacaoPorMesAtiva from "./PegaEstacaoPorMesAtiva";

class AtualizaEstacoesAtivas{

    async atualizar(incremento?:number){
        let estacaoMesAtivaAtual = await PegaEstacaoPorMesAtiva.pegarAtual()
        console.log(incremento, estacaoMesAtivaAtual, incremento == null && estacaoMesAtivaAtual._id)
        await MongoDB.connect()
        const colecao = MongoDB.db("BackNimbusNaoRelacional").collection("EstacoesAtivasMes")
        if(estacaoMesAtivaAtual._id != undefined && incremento != null)
            await colecao.updateOne({_id:estacaoMesAtivaAtual._id}, { $inc: { ativas: incremento } }, {upsert:true})
        else
            await colecao.insertOne(estacaoMesAtivaAtual)
        await MongoDB.close()
    }

}

export default new AtualizaEstacoesAtivas()