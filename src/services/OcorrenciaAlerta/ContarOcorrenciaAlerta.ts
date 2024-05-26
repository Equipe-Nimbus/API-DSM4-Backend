import MongoDB from "../../BackMongDB";
import OcorrenciaAlertaMongo from "../../interfaces/OcorrenciaAlerta";
import TrataData from "../TrataData";

class ContarOcorrenciaAlerta {
    async contar(dataInicio: string, dataFinal: string): Promise<number> {
        let quantidadeOcorrenciaAlerta: number;
        const unixtimeInicio = TrataData.tratar(dataInicio);
        const unixtimeFinal = TrataData.tratarDataFinal(dataFinal);
        
        const filtro = {
            "unixtime": {
                $gte: unixtimeInicio,
                $lte: unixtimeFinal
            }
        };

        await MongoDB.connect().then(
            async () => {
                const colecaoOcorrenciaAlerta = MongoDB.db("BackNimbusNaoRelacional").collection<OcorrenciaAlertaMongo>("OcorrenciaAlertas");
                quantidadeOcorrenciaAlerta = await colecaoOcorrenciaAlerta.countDocuments(filtro);
            }
        ).finally(async()=>{
            MongoDB.close();
        });
        return quantidadeOcorrenciaAlerta;
    }
};

export default new ContarOcorrenciaAlerta();