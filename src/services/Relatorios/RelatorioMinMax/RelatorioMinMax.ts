import TrataData from "../../TrataData";
import EstruturaRelatorioMinMax from "./EstruturaRelatorioMinMax";
import PegaMinMax from "./PegaMinMax";

class RelatorioMinMax{

    async gerarRelatorio(inicio:string, fim:string, idEstacao:string){
        const dataInicio =  TrataData.tratar(inicio)
        const dataFim =  TrataData.tratar(fim)
        const resultado = await PegaMinMax.pegar(dataInicio, dataFim, idEstacao)
        const relatoriosEstruturados = EstruturaRelatorioMinMax.estruturar(resultado)
        return relatoriosEstruturados
    }

}

export default new RelatorioMinMax()