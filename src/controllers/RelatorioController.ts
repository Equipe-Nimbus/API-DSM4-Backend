import GeraRelatorioQuantidadeAlerta from "../services/Relatorio/GeraRelatorioQuantidadeAlerta";
import { Request, Response } from "express";

class RelatorioController {
    async geraRelatorioQuantidadeAlerta(req: Request, res: Response) {
        const { cidade, estado, dataInicio, dataFim } = req.body;

        try {
            const resultado = await GeraRelatorioQuantidadeAlerta.geraRelatorio(cidade, estado, dataInicio, dataFim);
            res.status(200).send(resultado);
            console.log(resultado);
        } catch (error) {
            res.status(400).send({ error: error.message });
            console.error(error.message);
        }
    }
}

export default new RelatorioController();
