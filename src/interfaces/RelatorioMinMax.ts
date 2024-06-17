export default interface RelatorioMinMax{
    idTipoParametro:number,
    nomeTipoParametro:string,
    unidadeTipoParametro:string,
    minimosMaximos:{
        mesAno:string[],
        minimos:number[],
        maximos:number[]
    }
}


