import AtualizaEstacoesAtivas from "./AtualizaEstacoesAtivas"
import IniciaInterfaceDashboard from "./IniciaInterfaceDashboard"
import PegaEstacaoPorMesAtiva from "./PegaEstacaoPorMesAtiva"
import PegaQuantidadeTotalEstacao from "./PegaQuantidadeTotalEstacao"

class GeraDashboardGeral{

    async gerar(){
        let dashboardGeral = IniciaInterfaceDashboard.iniciarGeral()
        dashboardGeral.estacoes.numeroTotalEstacoes = await PegaQuantidadeTotalEstacao.pegar()
        await AtualizaEstacoesAtivas.atualizar()
        dashboardGeral.estacoes.ativasPorMes = await PegaEstacaoPorMesAtiva.pegaParaDashboard()
        return dashboardGeral
    }

}

export default new GeraDashboardGeral()