import GeraRelatorioQuantidadeAlerta from "../services/Relatorio/GeraRelatorioQuantidadeAlerta";
import { Request, Response } from "express";



class RelatorioController {
    async geraRelatorioQuantidadeAlerta(req: Request, res: Response) {
        const { cidade, estado, dataInicio, dataFim } = req.body;

        const resultado = await GeraRelatorioQuantidadeAlerta.geraRelatorio(cidade, estado, dataInicio, dataFim);

        res.status(200).send(resultado);
        console.log(resultado);
    };
};

export default new RelatorioController();