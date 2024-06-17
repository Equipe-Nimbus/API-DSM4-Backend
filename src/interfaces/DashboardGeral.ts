import OcorrenciaAlertaDashboard from "./OcorrenciaAlertaDashboard"

export default interface DashboardGeral{
    estacoes:{
        numeroTotalEstacoes:number,
        ativasPorMes:{
            quantidades:number[],
            meses:string[]
        }
    },
    alertas:{
        ultimosAlerta:OcorrenciaAlertaDashboard[],
        alertasDoMes:{
            totalAlertas:number,
            relacaoTipoParametro:{
                valorTipoParametro:number[],
                tiposParametros:string[]
            },
            relacaoEstado:{
                valorPorEstado:number[],
                estados:string[]
            }
        }
    }
    
}
