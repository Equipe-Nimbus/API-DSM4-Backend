import PegaIdParametro from "../../Parametro/PegaIdParametro";
import TrataData from "../../TrataData";
import PegaMedicoesRelatorio from "./PegaMedicoesRelatorio";

class RelatorioMedicao{

    async gerarRelatorio(dataInicio:string, dataFim:string, idEstacao:string){
        const unixInicio = TrataData.tratar(dataInicio)
        const unixFim = TrataData.tratar(dataFim)
        const resultado = await PegaMedicoesRelatorio.pegar(unixInicio, unixFim)
        return resultado
    }

}
export default new RelatorioMedicao()