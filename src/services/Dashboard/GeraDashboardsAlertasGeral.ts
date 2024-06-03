import { WithId } from "mongodb";
import DashboardGeral from "../../interfaces/DashboardGeral";
import ConsultaAlertaMes from "./ConsultaAlertaMes";
import OcorrenciaAlertaDashboard from "../../interfaces/OcorrenciaAlertaDashboard";
import OcorrenciaAlertaMongo from "../../interfaces/OcorrenciaAlerta";
import EstruturaDashboardAlertaEstado from "./EstruturaDashboardAlertaEstado";

class GeraDashboardsAlertasGeral{

    async gerar(dashboardGeral:DashboardGeral):Promise<DashboardGeral>{
        let ocorrenciasMes = await ConsultaAlertaMes.consultar() as unknown as OcorrenciaAlertaMongo[]
        for (let index = 0; index < 3; index++) {
            dashboardGeral.alertas.ultimosAlerta.push(this.criarOcorrenciaDashboard(ocorrenciasMes[index]))
        }
        dashboardGeral.alertas.alertasDoMes.totalAlertas = ocorrenciasMes.length
        dashboardGeral.alertas.alertasDoMes.relacaoEstado = EstruturaDashboardAlertaEstado.estruturar(ocorrenciasMes)
        dashboardGeral.alertas.alertasDoMes.relacaoEstado = EstruturaDashboardAlertaEstado.estruturar(ocorrenciasMes)
        return dashboardGeral
    }

    criarOcorrenciaDashboard(ocorrenciasMes:OcorrenciaAlertaMongo):OcorrenciaAlertaDashboard{
        let ocorrencia:OcorrenciaAlertaDashboard = {
            nomeAlerta: ocorrenciasMes.nomeAlerta,
            cidadeAlerta: ocorrenciasMes.cidadeEstacao,
            estadoAlerta: ocorrenciasMes.estadoEstacao,
            dataMedida: ocorrenciasMes.dia + " de " + ocorrenciasMes.mes + " de " + ocorrenciasMes.ano,
            valorMedida: ocorrenciasMes.valorAlerta,
            nomeTipoParametro: ocorrenciasMes.nomeTipoParametro,
            unidadeTipoParametro: ocorrenciasMes.unidadeMedicao
        }
        return ocorrencia
    }

};

export default new GeraDashboardsAlertasGeral()