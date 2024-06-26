import GeraRelatorioQuantidadeAlerta from "../services/Relatorios/RelatorioQtdOcorrencia/GeraRelatorioQuantidadeAlerta";
import { Request, Response } from "express";
import RelatorioMedicao from "../services/Relatorios/RelatorioMedicao/RelatorioMedicao";
import PegaMinMax from "../services/Relatorios/RelatorioMinMax/PegaMinMax";
import RelatorioMinMax from "../services/Relatorios/RelatorioMinMax/RelatorioMinMax";
import ConsultarLocalizacoes from "../services/Relatorios/RelatorioQtdOcorrencia/ConsultarLocalizacoes";

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

    async geraRelatorioMinMax(req: Request, res:Response){
        const {inicio, fim, idEstacao} = req.params
        try {
            const resultado = await RelatorioMinMax.gerarRelatorio(inicio, fim, idEstacao)
            res.status(200).send(resultado)    
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }

    async retornarLocalizacoesCadastradas(_: Request, res: Response) {
        try {
            const localizacoes = await ConsultarLocalizacoes.consultar();
            res.status(200).send(localizacoes);
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

}

export default new RelatorioController()
