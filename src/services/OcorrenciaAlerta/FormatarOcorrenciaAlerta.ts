import OcorrenciaAlertaMongo, { ObjetoOcorrenciaAlerta } from "../../interfaces/OcorrenciaAlerta";
import TransformarStringMes from "../TransformarStringMes";

class FormatarOcorrenciaAlerta {
    formatar(listaOcorrenciaAlerta: OcorrenciaAlertaMongo[]): ObjetoOcorrenciaAlerta[] {
        const listaOcorrenciaAlertaFormatada: ObjetoOcorrenciaAlerta[] = [];
        for (const ocorrenciaAlerta of listaOcorrenciaAlerta) {
            let ocorrenciaAlertaFormatado = {} as ObjetoOcorrenciaAlerta;
            const dataOcorrenciaAlerta = ocorrenciaAlerta.ano + "/" + TransformarStringMes.transformar(ocorrenciaAlerta.mes) + "/" + ocorrenciaAlerta.dia;
            ocorrenciaAlertaFormatado.nomeAlerta = ocorrenciaAlerta.nomeAlerta;
            ocorrenciaAlertaFormatado.cidadeAlerta = ocorrenciaAlerta.cidadeEstacao;
            ocorrenciaAlertaFormatado.estadoAlerta = ocorrenciaAlerta.estadoEstacao;
            ocorrenciaAlertaFormatado.dataMedida = dataOcorrenciaAlerta;
            ocorrenciaAlertaFormatado.valorMedida = ocorrenciaAlerta.medicao;
            ocorrenciaAlertaFormatado.nomeTipoParametro = ocorrenciaAlerta.nomeTipoParametro;
            ocorrenciaAlertaFormatado.unidadeTipoParametro = ocorrenciaAlerta.unidadeMedicao;
            listaOcorrenciaAlertaFormatada.push(ocorrenciaAlertaFormatado);
        };
        return listaOcorrenciaAlertaFormatada;
    };
};

export default new FormatarOcorrenciaAlerta();