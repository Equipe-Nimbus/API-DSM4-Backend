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
import { Parametro } from "../entities/Parametro";

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

    async listarParaSelecao(req: Request, res: Response) {
        const repositorioEstacao = PgDataSource.getRepository(Estacao)
        const listagemParaSelecao = await repositorioEstacao
            .createQueryBuilder("estacao")
            .select(["estacao.idEstacao", "estacao.nomeEstacao", "estacao.cidadeEstacao"])
            .where("estacao.statusEstacao = :status", { status: true })
            .getMany();
        
        res.status(200).send(listagemParaSelecao)
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

    async deletar(req: Request, res: Response){
        const repositorioEstacao = PgDataSource.getRepository(Estacao)
        const idEstacao = parseInt(req.params.idEstacao)
        let estacao = await repositorioEstacao.findOne({where:{idEstacao:idEstacao}})
        if(estacao == undefined)
            return res.status(400).send("idEstação não encontrado no banco de dados")
        estacao.statusEstacao = false
        try{
            await repositorioEstacao.save(estacao)
            res.status(200).send("Estacao deletada com sucesso")
        } catch(error){
            res.status(400).send(error)
        }
    }
    
    async atualizar(req: Request, res: Response) {
        const repositorioEstacao = PgDataSource.getRepository(Estacao);
        const repositorioParametro = PgDataSource.getRepository(Parametro);
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
            const listaNovosParametros = await ManipulaObjetoParametro.consultaTipoParametroEmParametro(listaIdTipoParametro, req.body.idEstacao);
            for (const novoParametro of listaNovosParametros) {
                await repositorioEstacao.createQueryBuilder().
                    relation(Estacao, "parametros").
                    of(estacaoAntiga).
                    add(novoParametro);
            };
            res.status(200).send("Estação atualizada com sucesso");
        } catch (error) {
            if (error.code == "23505")
                res.status(400).send("Nome de estação já cadastrado!");
            else 
                res.status(400).send(error);
        };                
    };
}

export default new EstacaoController();