import { relative } from "path";
import RelatorioMinMax from "../../../interfaces/RelatorioMinMax";
import GeraMesAno from "./GeraMesAno";

class EstruturaRelatorioMinMax {

    estruturar(consulta: any[]) {
        const listaRelatorios: RelatorioMinMax[] = []
        let relatorio: RelatorioMinMax = this.geraRelatorioVazio()
        relatorio.idTipoParametro = consulta[0].tipoParametro_idTipoParametro
        relatorio.nomeTipoParametro = consulta[0].tipoParametro_nomeTipoParametro
        relatorio.unidadeTipoParametro = consulta[0].tipoParametro_unidadeTipoParametro
        consulta.forEach(minMax => {
            if (minMax.tipoParametro_idTipoParametro === relatorio.idTipoParametro) {
                relatorio.minimosMaximos.maximos.push((parseFloat(minMax.maxvalor) * parseFloat(minMax.tipoParametro_fatorTipoParametro)) + parseFloat(minMax.tipoParametro_offsetTipoParametro))
                relatorio.minimosMaximos.minimos.push((parseFloat(minMax.minvalor) * parseFloat(minMax.tipoParametro_fatorTipoParametro)) + parseFloat(minMax.tipoParametro_offsetTipoParametro))
                relatorio.minimosMaximos.mesAno.push(GeraMesAno.gerar(minMax.medicao_tagTemporal))
            }
            else {
                listaRelatorios.push(relatorio)
                relatorio = this.geraRelatorioVazio()
                relatorio.idTipoParametro = minMax.tipoParametro_idTipoParametro
                relatorio.nomeTipoParametro = minMax.tipoParametro_nomeTipoParametro
                relatorio.unidadeTipoParametro = minMax.tipoParametro_unidadeTipoParametro
                relatorio.minimosMaximos.maximos.push((parseFloat(minMax.maxvalor) * parseFloat(minMax.tipoParametro_fatorTipoParametro)) + parseFloat(minMax.tipoParametro_offsetTipoParametro))
                relatorio.minimosMaximos.minimos.push((parseFloat(minMax.minvalor) * parseFloat(minMax.tipoParametro_fatorTipoParametro)) + parseFloat(minMax.tipoParametro_offsetTipoParametro))
                relatorio.minimosMaximos.mesAno.push(GeraMesAno.gerar(minMax.medicao_tagTemporal))
            }
        });
        listaRelatorios.push(relatorio)
        return listaRelatorios
    }

    geraRelatorioVazio(){
        let relatorio:RelatorioMinMax ={
            idTipoParametro:null,
            nomeTipoParametro:null,
            unidadeTipoParametro:null,
            minimosMaximos:{
                maximos:[],
                minimos:[],
                mesAno:[]
            }
        }
        return relatorio
    }
}

export default new EstruturaRelatorioMinMax()