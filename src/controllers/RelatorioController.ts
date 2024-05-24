import RelatorioMedicao from "../services/Relatorios/RelatorioMedicao";
import { Request, Response } from "express";
class RelatorioController{

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