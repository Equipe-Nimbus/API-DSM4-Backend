import PgDataSource from "../../data-source"
import { Estacao } from "../../entities/Estacao"
import EstacaoAtivaMesInterface from "../../interfaces/EstacaoAtivaMesInterface"
import AtualizaEstacoesAtivas from "./AtualizaEstacoesAtivas"
import FormatandoDatas from "./FormatandoDatas"
import IniciaInterfaceDashboard from "./IniciaInterfaceDashboard"
import PegaEstacaoPorMesAtiva from "./PegaEstacaoPorMesAtiva"
import PegaQuantidadeTotalEstacao from "./PegaQuantidadeTotalEstacao"

class GeraDashboardGeral{

    async gerar(){
        let dashboardGeral = IniciaInterfaceDashboard.iniciarGeral()
        dashboardGeral.estacoes.numeroTotalEstacoes = await PegaQuantidadeTotalEstacao.pegar()
        dashboardGeral.estacoes.ativasPorMes = await PegaEstacaoPorMesAtiva.pegaParaDashboard()
        return dashboardGeral
    }


}

export default new GeraDashboardGeral()