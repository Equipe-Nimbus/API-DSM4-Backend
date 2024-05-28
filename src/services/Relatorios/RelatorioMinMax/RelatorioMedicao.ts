import PegaIdParametro from "../../Parametro/PegaIdParametro";
import TrataData from "../../TrataData";
import PegaMedicoesRelatorio from "./PegaMedicoesRelatorio";

class RelatorioMedicao{

    async gerarRelatorio(dataInicio:string, dataFim:string, idEstacao:string){
        const unixInicio = TrataData.tratar(dataInicio)
        const unixFim = TrataData.tratar(dataFim)
        console.log("INICIO:", unixInicio, "FIM:", unixFim)
        const resultado = await PegaMedicoesRelatorio.pegar(unixInicio, unixFim, idEstacao)
        return resultado
    }

}
export default new RelatorioMedicao()