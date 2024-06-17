export interface DashboardEspecificoInterface{
    parametros:ParametroDashboardInterface[]
    alertas:{
        alertasNome:string[],
        alertasNumero:number[]
    }
}


export interface ParametroDashboardInterface{
    nomeTipoParametro:string,
    unidadeMedida:string,
    valorMaximo:number,
    valorMinimo:number,
    medicoes:MedicaoParametro[],
}

export interface MedicaoParametro{
    valor:number,
    data:Date
}
