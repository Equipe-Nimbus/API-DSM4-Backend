import { WithId } from "mongodb";
import DashboardGeral from "../../interfaces/DashboardGeral";
import ConsultaAlertaMes from "./ConsultaAlertaMes";
import OcorrenciaAlertaDashboard from "../../interfaces/OcorrenciaAlertaDashboard";
import OcorrenciaAlertaMongo from "../../interfaces/OcorrenciaAlerta";
import EstruturaDashboardAlertaEstado from "./EstruturaDashboardAlertaEstado";
import EstruturaDashboardAlertaTipoParametro from "./EstruturaDashboardAlertaTipoParametro";

class GeraDashboardsAlertasGeral{

    async gerar(dashboardGeral:DashboardGeral):Promise<DashboardGeral>{
        let ocorrenciasMes = await ConsultaAlertaMes.consultar() as unknown as OcorrenciaAlertaMongo[]
        if(ocorrenciasMes.length > 0) {
            for (let index = 0; index < Math.min(ocorrenciasMes.length, 3); index++) {
                dashboardGeral.alertas.ultimosAlerta.push(this.criarOcorrenciaDashboard(ocorrenciasMes[index]))
            }
            dashboardGeral.alertas.alertasDoMes.totalAlertas = ocorrenciasMes.length
            dashboardGeral.alertas.alertasDoMes.relacaoEstado = EstruturaDashboardAlertaEstado.estruturar(ocorrenciasMes)
            dashboardGeral.alertas.alertasDoMes.relacaoTipoParametro = EstruturaDashboardAlertaTipoParametro.estruturar(ocorrenciasMes)
        }
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