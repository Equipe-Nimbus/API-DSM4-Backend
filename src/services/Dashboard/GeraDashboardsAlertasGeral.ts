import MongoDB from "../../BackMongDB";
import GeraMesAno from "../Relatorios/RelatorioMinMax/GeraMesAno";

class GeraDashboardsAlertasGeral{

    async gerar(){
        const colecaoEstacoes = MongoDB.db("BackNimbusNaoRelacional").collection("OcorrenciaAlertas");

    }

};

export default new GeraDashboardsAlertasGeral()