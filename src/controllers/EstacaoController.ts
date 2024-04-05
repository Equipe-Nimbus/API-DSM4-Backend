import { Request, Response } from "express";
import PgDataSource from "../data-source";
import { Estacao } from "../entities/Estacao";
import InsereAtributosEstacao from "../services/estacao/InsereAtributosEstacao";
import ConsultaCoordenadaGeograficaEstacao from "../services/estacao/ConsultaCoordenadaGeograficaEstacao";
import CriaObjetoParametro from "../services/estacao/CriaObjetoParametro";

class EstacaoController {
    async cadastrar(req: Request, res: Response) {
        const repositorioEstacao = PgDataSource.getRepository(Estacao);
        let novaEstacao = new Estacao();
        const consultaCordenadaEstacao = await ConsultaCoordenadaGeograficaEstacao.consulta(req.body);
        const listaParametro = await CriaObjetoParametro.criarRelacionameto(req.body.tipoParametros);
        const listaAtributosEstacao = ["nomeEstacao", "ruaAvenidaEstacao", "numeroEnderecoEstacao", "bairroEstacao", "cidadeEstacao", "estadoEstacao", "cepEstacao", "latitudeEstacao", "longitudeEstacao"];
        
        listaAtributosEstacao.forEach(atributoEstacao => {
            if (req.body[atributoEstacao] == "" || req.body[atributoEstacao] == null) {
                return res.status(400).send("Não é possível cadastrar uma estação com o campo vazio!")
            };
        });

        if (consultaCordenadaEstacao)
            return res.status(400).send("Já existe uma estação com essa coordenada geográfica!");

        if (listaParametro.length == 0)            
            return res.status(400).send("É necessário pelo menos um tipo parâmetro!");

        novaEstacao = InsereAtributosEstacao.inserir(novaEstacao, req.body);        
        novaEstacao.parametros = listaParametro;

        try {
            if (listaParametro.length == 0)            
                return res.status(400).send("É necessário pelo menos um tipo parâmetro!");
            await repositorioEstacao.save(novaEstacao);
            res.status(200).send("Estação cadastrada com sucesso!");
        } catch (error) {
            if (error.code == "23505")
                res.status(400).send("Nome de estação já cadastrado!");
        };
    }
}

export default new EstacaoController();