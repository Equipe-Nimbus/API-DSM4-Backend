import DashboardGeral from "../../interfaces/DashboardGeral";

class IniciaInterfaceDashboard{

    iniciarGeral():DashboardGeral{
        let dashboardGeral:DashboardGeral = {
            estacoes: {
                numeroTotalEstacoes: 0,
                ativasPorMes: {
                    quantidades: [],
                    meses: []
                }
            },
            alertas: {
                ultimoAlerta: {
                    nomeAlerta: "",
                    valorMedida: 0,
                    unidadeTipoParametro: "",
                    dataMedida: ""
                },
                alertasDoMes: {
                    totalAlertas: 0,
                    relacaoTipoParametro: {
                        valorTipoParametro: [],
                        tiposParametros: []
                    },
                    relacaoEstado: {
                        valorPorEstado: [],
                        estados: []
                    }
                }
            }
        }
        return dashboardGeral
    }

}

export default new IniciaInterfaceDashboard()