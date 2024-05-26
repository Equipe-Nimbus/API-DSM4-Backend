import MongoDB from "../../BackMongDB";
import OcorrenciaAlertaMongo, { ObjetoOcorrenciaAlerta } from "../../interfaces/OcorrenciaAlerta";
import TrataData from "../TrataData";

class ConsultarOcorrenciaAlerta {
    async consultar(dataInicio: string, dataFinal: string, pagina: number, tamanhoPagina: number): Promise<OcorrenciaAlertaMongo[]> {
        const unixtimeInicio = TrataData.tratar(dataInicio);
        /* const unixtimeFinal = TrataData.tratarDataFinal(dataFinal); */
        const unixtimeFinal = 1716673586;
        let listaOcorrenciaAlerta = [];

        const filtro = {
            "unixtime": {
                $gte: unixtimeInicio,
                $lte: unixtimeFinal
            }
        };

        const skip = (pagina - 1) * tamanhoPagina;

        await MongoDB.connect().then(
            async () => {
                const colecaoOcorrenciaAlerta = MongoDB.db("BackNimbusNaoRelacional").collection<OcorrenciaAlertaMongo>("OcorrenciaAlertas");
                const ocorrenciaAlerta = await colecaoOcorrenciaAlerta.find<ObjetoOcorrenciaAlerta>(filtro, {sort: {"unixtime": 1}})
                    .skip(skip)
                    .limit(tamanhoPagina)
                    .toArray();
                listaOcorrenciaAlerta.push(...ocorrenciaAlerta);
            }
        ).finally(async()=>{
            MongoDB.close();
        });
        return listaOcorrenciaAlerta;
    };
};

export default new ConsultarOcorrenciaAlerta();