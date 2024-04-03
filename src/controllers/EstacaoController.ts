import { Request, Response } from "express";
import PgDataSource from "../data-source";
import { Estacao } from "../entities/Estacao";
import InsereAtributosEstacao from "../services/Estacao/InsereAtributosEstacao";

class EstacaoController {
    async cadastrar(req: Request, res: Response) {
        const repositorioEstacao = PgDataSource.getRepository(Estacao);
        try {
            let novaEstacao = new Estacao();
            novaEstacao = InsereAtributosEstacao.inserir(novaEstacao, req.body);
            await repositorioEstacao.save(novaEstacao);
            res.send("Estação cadastrada com sucesso!");
        } catch (error) {
            throw error;
        };
    }
}

export default new EstacaoController();