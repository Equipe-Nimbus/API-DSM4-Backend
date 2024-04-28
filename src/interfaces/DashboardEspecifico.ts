export interface DashboardEspecificoInterface{
    parametros:ParametroDashboardInterface[]
}


export interface ParametroDashboardInterface{
    nomeTipoParametro:string,
    unidadeMedida:string,
    valorMaximo:number,
    valorMinimo:number,
    medicoes:MedicaoParametro[],
    alertas:{
        valores:number[],
        alertasDia:string[]
    }
}

export interface MedicaoParametro{
    valor:number,
    data:Date
}
