import GeraRelatorioQuantidadeAlerta from "../services/Relatorios/RelatorioQtdOcorrencia/GeraRelatorioQuantidadeAlerta";
import { Request, Response } from "express";
import RelatorioMedicao from "../services/Relatorios/RelatorioMinMax/RelatorioMedicao";

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

    async geraRelatorioMedicao(req: Request, res: Response){
        try{
            const {inicio, fim, idEstacao} = req.params
            const relatorio = await RelatorioMedicao.gerarRelatorio(inicio, fim, idEstacao)
            res.send(relatorio)
        } catch(err){
            res.status(500).send(err.mensage)
        }   
    }
}

export default new RelatorioController()
