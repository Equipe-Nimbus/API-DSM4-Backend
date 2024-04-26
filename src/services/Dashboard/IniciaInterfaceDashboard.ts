import DashboardGeral from "../../interfaces/DashboardGeral";

class IniciaInterfaceDashboard{

    iniciarGeral():DashboardGeral{
        let dashboardGeral:DashboardGeral = {
            numeroTotalEstacoes:0
        }
        return dashboardGeral
    }

}

export default new IniciaInterfaceDashboard()