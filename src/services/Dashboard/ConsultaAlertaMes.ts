import MongoDB from "../../BackMongDB";
import GeraMesAno from "../Relatorios/RelatorioMinMax/GeraMesAno";

class ConsultaAlertaMes{

    async consultar(){
        const mes = GeraMesAno.gerarMes()
        const colecaoOcorrenciaAlertas = MongoDB.db("BackNimbusNaoRelacional").collection("OcorrenciaAlertas");
        await MongoDB.connect()
        const ocorrenciasMes = await colecaoOcorrenciaAlertas.find({mes:mes}).toArray()
        await MongoDB.close()
        return ocorrenciasMes
    }

}

export default new ConsultaAlertaMes()