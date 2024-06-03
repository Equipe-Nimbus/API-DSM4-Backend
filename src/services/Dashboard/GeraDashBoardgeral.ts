import PgDataSource from "../../data-source"
import { Estacao } from "../../entities/Estacao"
import EstacaoAtivaMesInterface from "../../interfaces/EstacaoAtivaMesInterface"
import AtualizaEstacoesAtivas from "./AtualizaEstacoesAtivas"
import ConsultaAlertaMes from "./ConsultaAlertaMes"
import FormatandoDatas from "./FormatandoDatas"
import GeraDashboardsAlertasGeral from "./GeraDashboardsAlertasGeral"
import IniciaInterfaceDashboard from "./IniciaInterfaceDashboard"
import PegaEstacaoPorMesAtiva from "./PegaEstacaoPorMesAtiva"
import PegaQuantidadeTotalEstacao from "./PegaQuantidadeTotalEstacao"

class GeraDashboardGeral{

    async gerar(){
        let dashboardGeral = IniciaInterfaceDashboard.iniciarGeral()
        dashboardGeral.estacoes.numeroTotalEstacoes = await PegaQuantidadeTotalEstacao.pegar()
        dashboardGeral.estacoes.ativasPorMes = await PegaEstacaoPorMesAtiva.pegaParaDashboard()
        dashboardGeral = await GeraDashboardsAlertasGeral.gerar(dashboardGeral)
        return dashboardGeral
    }


}

export default new GeraDashboardGeral()