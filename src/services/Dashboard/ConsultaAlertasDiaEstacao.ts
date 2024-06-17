import MongoDB from "../../BackMongDB";
import OcorrenciaAlertaMongo from "../../interfaces/OcorrenciaAlerta";
import FormatandoDatas from "./FormatandoDatas";

class ConsultaAlertasDiaEstacao{

    async consultar(idEstacao:string):Promise<OcorrenciaAlertaMongo[]>{
        const data = new Date()
        const dia = data.getDate().toString()
        const mes = FormatandoDatas.numeroMesParaString(data.getMonth())
        const ano = data.getFullYear().toString()
        const colecaoOcorrenciaAlertas = MongoDB.db("BackNimbusNaoRelacional").collection("OcorrenciaAlertas");
        await MongoDB.connect()
        const ocorrenciaAlertas = await colecaoOcorrenciaAlertas.find({ dia: dia, mes: mes, ano: ano, idEstacao: idEstacao }).toArray()
        await MongoDB.close()
        const listaOcorrencias = ocorrenciaAlertas as unknown as OcorrenciaAlertaMongo[]
        return listaOcorrencias
    }

}

export default new ConsultaAlertasDiaEstacao()