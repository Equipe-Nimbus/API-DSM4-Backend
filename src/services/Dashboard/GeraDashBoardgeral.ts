import IniciaInterfaceDashboard from "./IniciaInterfaceDashboard"
import PegaQuantidadeTotalEstacao from "./PegaQuantidadeTotalEstacao"

class GeraDashboardGeral{

    async gerar(){
        let dashboardGeral = IniciaInterfaceDashboard.iniciarGeral()
        dashboardGeral.numeroTotalEstacoes = await PegaQuantidadeTotalEstacao.pegar()
        return dashboardGeral
    }

}

export default new GeraDashboardGeral()