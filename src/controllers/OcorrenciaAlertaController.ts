import { Request, Response } from "express";
import ConsultarOcorrenciaAlerta from "../services/OcorrenciaAlerta/ConsultarOcorrenciaAlerta";
import FormatarOcorrenciaAlerta from "../services/OcorrenciaAlerta/FormatarOcorrenciaAlerta";
import ContarOcorrenciaAlerta from "../services/OcorrenciaAlerta/ContarOcorrenciaAlerta";

class OcorrenciaAlertaController {
    async listar(req: Request, res: Response) {
        
        const { dataIncio, dataFinal, pagina, tamanhoPagina } = req.params;
        const numeroPagina = pagina ? parseInt(pagina) : 1;
        const numeroTamanhoPagina = tamanhoPagina ? parseInt(tamanhoPagina) : 10;
        let quantidadePaginas: number;

        try {
            const quantidadeDocumento = await ContarOcorrenciaAlerta.contar(dataIncio, dataFinal);
            quantidadePaginas = Math.ceil(quantidadeDocumento / numeroTamanhoPagina)

            const listaOcorrenciaAlerta = await ConsultarOcorrenciaAlerta.consultar(dataIncio, dataFinal, numeroPagina, numeroTamanhoPagina);
            const listaOcorrenciaAlertaFormatada = FormatarOcorrenciaAlerta.formatar(listaOcorrenciaAlerta);
            const resposta = {
                ocorrenciaAlerta : listaOcorrenciaAlertaFormatada,
                pagina: numeroPagina,
                tamanhoPagina: numeroTamanhoPagina,
                quantidadePaginas: quantidadePaginas
            };
            res.status(200).send(resposta);
        } catch (error) {
            if (numeroPagina == 0) {
                res.status(400).send("Não é possível requisitar a página 0")
            } else {
                res.status(400).send(error);
            }
        }

    };
};

export default new OcorrenciaAlertaController();