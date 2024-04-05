import { Request, Response } from "express";
import PgDataSource from "../data-source";
import { Estacao } from "../entities/Estacao";
import InsereAtributosEstacao from "../services/estacao/InsereAtributosEstacao";
import CoordenadaGeograficaEstacao from "../services/estacao/CoordenadaGeograficaEstacao";

class EstacaoController {
    async cadastrar(req: Request, res: Response) {
        const repositorioEstacao = PgDataSource.getRepository(Estacao);
        let novaEstacao = new Estacao();
        const consultaCordenadaEstacao = await CoordenadaGeograficaEstacao.consulta(req.body);
        if (consultaCordenadaEstacao) {
            res.status(400).send("Já existe uma estação com essa coordenada geográfica!");
            return;
        }
        novaEstacao = InsereAtributosEstacao.inserir(novaEstacao, req.body);
        try {
            await repositorioEstacao.save(novaEstacao);
            res.status(200).send("Estação cadastrada com sucesso!");
        } catch (error) {
            if (error.code == "23505")
                res.status(400).send("Nome de estação já cadastrado!");
            else if (error.code == "23505")
                res.status(400).send("Não é possível cadastrar uma estação com campos nulos!");
        };
    }
}

export default new EstacaoController();