import { Request, Response } from "express";
import PgDataSource from "../data-source";
import { Estacao } from "../entities/Estacao";
import InsereAtributosEstacao from "../services/Estacao/InsereAtributosEstacao";
import ConsultaCoordenadaGeograficaEstacao from "../services/Estacao/ConsultaCoordenadaGeograficaEstacao";
import ManipulaObjetoParametro from "../services/Estacao/ManipulaObjetoParametro";
import AbstratoController from "./AbstratoController";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import TrataValoresFiltroEstacao from "../services/Estacao/TrataValoresFiltroEstacao";
import SelecaoPaginadaEstacao from "../services/Estacao/SelecaoPaginadaEstacao";
import MontaObjetoTipoParametro from "../services/Estacao/MontaObjetoTipoParametro";
import MontaObjetoEstacao from "../services/Estacao/MontaObjetoEstacao";

class EstacaoController extends AbstratoController{

    async cadastrar(req: Request, res: Response) {
        const repositorioEstacao = PgDataSource.getRepository(Estacao);
        const consultaCordenadaEstacao = await ConsultaCoordenadaGeograficaEstacao.consulta(req.body);
        let contador: number = 0;
        const listaAtributosEstacao = ["nomeEstacao", "ruaAvenidaEstacao", "numeroEnderecoEstacao", "bairroEstacao", "cidadeEstacao", "estadoEstacao", "cepEstacao", "latitudeEstacao", "longitudeEstacao"];
        
        listaAtributosEstacao.forEach(atributoEstacao => {
            if (req.body[atributoEstacao] == "" || req.body[atributoEstacao] == null)
                contador++;         
        });
        
        if (contador != 0) {
            res.status(400).send("Não é possível cadastrar uma estação com o campo vazio!");
            return;
        };

        if (consultaCordenadaEstacao) {
            res.status(400).send("Já existe uma estação com essa coordenada geográfica!");
            return;
        }

        if (Array.isArray(req.body.tipoParametros) && req.body.tipoParametros.lenght == 0){
            res.status(400).send("É necessário pelo menos um tipo parâmetro!");
            return;
        }

        const listaParametro = await ManipulaObjetoParametro.criarRelacionametoEstacaoParametro(req.body.tipoParametros);
        
        let novaEstacao = new Estacao();
        novaEstacao = InsereAtributosEstacao.inserir(novaEstacao, req.body);
        novaEstacao.parametros = listaParametro;

        try {            
            await repositorioEstacao.save(novaEstacao);
            res.status(200).send("Estação cadastrada com sucesso!");            
        } catch (error) {
            if (error.code == "23505")
                res.status(400).send("Nome de estação já cadastrado!");
            else 
                res.status(400).send(error);
        };
    }

    async listarPaginada(req: Request, res: Response) {
        const repositorioEstacao = PgDataSource.getRepository(Estacao);
        const pagina = req.query.pagina ? parseInt(req.query.pagina as string) : 1;
        const tamanhoPagina = req.query.tamanhoPagina ? parseInt(req.query.tamanhoPagina as string): 10;
        const quantidadeLinhas = await repositorioEstacao.count(TrataValoresFiltroEstacao.tratarContagem(req));
        const quantidadePaginas = Math.ceil(quantidadeLinhas/tamanhoPagina);
        try {
            const filtroSelecao = TrataValoresFiltroEstacao.tratarSelect(req);
            const estacoesResgatadas = await SelecaoPaginadaEstacao.selecionar(repositorioEstacao, pagina, tamanhoPagina, filtroSelecao);
            const resposta = {
                estacoes: estacoesResgatadas, 
                pagina: pagina,
                tamanhoPagina: tamanhoPagina,
                quantidadePaginas: quantidadePaginas
            };
            res.status(200).send(resposta);
        } catch (error) {
            if (pagina == 0)
                res.status(400).send("Não é permitido requisitar a página 0!");
            else
                res.status(400).send(error);
        };
        
    }

    async listarEspecifico(req: Request, res: Response) {
        const repositorioEstacao = PgDataSource.getRepository(Estacao);
        const id = parseInt(req.params.id);
        const estacaoRecuperada = await repositorioEstacao.findOne({
            where: {
                idEstacao: id
            }
        });
        if (estacaoRecuperada == undefined)
            return res.status(400).send("Objeto estação não encontrado!");
    
        const listaTipoParametro = [];
        for(const parametro of estacaoRecuperada.parametros) {
            const tipoParametroRuperado = await parametro.tiposParametro;
            const tipoParametroMontado = MontaObjetoTipoParametro.criaTipoParametro(tipoParametroRuperado);
            listaTipoParametro.push(tipoParametroMontado);               
        };
        estacaoRecuperada.tipoParametros = listaTipoParametro;
        const resposta = MontaObjetoEstacao.criaEstacao(estacaoRecuperada);
        return res.status(200).send(resposta);                     
    };
    
    async atualizar(req: Request, res: Response) {
        const repositorioEstacao = PgDataSource.getRepository(Estacao);
        const consultaEstacaoMesmaCoordenada = await ConsultaCoordenadaGeograficaEstacao.consulta(req.body);
        let contador: number = 0;
        const listaAtributosEstacao = ["nomeEstacao", "ruaAvenidaEstacao", "numeroEnderecoEstacao", "bairroEstacao", "cidadeEstacao", "estadoEstacao", "cepEstacao", "latitudeEstacao", "longitudeEstacao"];
        
        listaAtributosEstacao.forEach(atributoEstacao => {
            if (req.body[atributoEstacao] == "" || req.body[atributoEstacao] == null)
                contador++;         
        });
        
        if (contador != 0) {
            res.status(400).send("Não é possível cadastrar uma estação com o campo vazio!");
            return;
        };

        if (consultaEstacaoMesmaCoordenada) {
            if (consultaEstacaoMesmaCoordenada != req.body.idEstacao)
                return res.status(400).send("Já existe uma estação cadastrada com essas coordenadas geográficas!");
        };
    
        const listaIdTipoParametro: number[] = [];      
        for (const tipoParametro of req.body.tipoParametros) {
            listaIdTipoParametro.push(tipoParametro.idTipoParametro);
        };

        if (listaIdTipoParametro.length == 0) {            
            res.status(400).send("É necessário pelo menos um tipo parâmetro!");
            return;
        };

        let novaEstacao = new Estacao();
        novaEstacao = InsereAtributosEstacao.inserir(novaEstacao, req.body);
        const estacaoAntiga = await repositorioEstacao.findOne({
            where: {
                idEstacao: req.body.idEstacao
            }
        })
        
        try {
            await repositorioEstacao.createQueryBuilder().
                update(Estacao).
                set(novaEstacao).
                where(`idEstacao = ${req.body.idEstacao}`).
                execute();
            const listaNovosParametros = await ManipulaObjetoParametro.consultaTipoParametroEmParametro(listaIdTipoParametro, estacaoAntiga.idEstacao);
            for (const novoParametro of listaNovosParametros) {
                console.log(novoParametro);
                await repositorioEstacao.createQueryBuilder().
                    relation(Estacao, "parametros").
                    of(estacaoAntiga).
                    add(novoParametro);
            };
            res.status(200).send("Estação atualizada com sucesso");
        } catch (error) {
            if (error.code == "23505")
                res.status(400).send("Nome de estação já cadastrado!");
            else {
                res.status(400).send(error);
            }
        };                
    };
    
    deletar(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        throw new Error("Method not implemented.");
    }

}

export default new EstacaoController();