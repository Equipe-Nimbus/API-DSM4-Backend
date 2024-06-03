export default interface DashboardGeral{
    ocorrencias: any
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


interface OcorrenciaAlertaDashboard{
    nomeAlerta:string,
    valorMedida:number,
    unidadeTipoParametro:string,
    dataMedida:string
}