import { Request, Response } from "express";
import PgDataSource from "../data-source";
import { Estacao } from "../entities/Estacao";
import InsereAtributosEstacao from "../services/Estacao/InsereAtributosEstacao";
import ConsultaCoordenadaGeograficaEstacao from "../services/Estacao/ConsultaCoordenadaGeograficaEstacao";
import CriaObjetoParametro from "../services/Estacao/CriaObjetoParametro";
import AbstratoController from "./AbstratoController";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import TrataValoresFiltroEstacao from "../services/Estacao/TrataValoresFiltroEstacao";
import SelecaoPaginadaEstacao from "../services/Estacao/SelecaoPaginadaEstacao";
import { Parametro } from "../entities/Parametro";
import { TipoParametro } from "../entities/TipoParametro";
import MontaObjetoTipoParametro from "../services/Estacao/MontaObjetoTipoParametro";
import MontaObjetoEstacao from "../services/Estacao/MontaObjetoEstacao";

class EstacaoController extends AbstratoController{
    

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
            // descomentar esse bloco depois de alterar a entidade parametro com a propriedade statusParametro
            /* if (parametro.statusParametro == true) {
                const tipoParametroRuperado = await parametro.tiposParametro;
                const tipoParametroMontado = MontaObjetoTipoParametro.criaTipoParametro(tipoParametroRuperado);
                listaTipoParametro.push(tipoParametroMontado); 
            } */
            // apagar esse bloco depois de alterar a entidade parametro com a propriedade statusParametro
            const tipoParametroRuperado = await parametro.tiposParametro;
            const tipoParametroMontado = MontaObjetoTipoParametro.criaTipoParametro(tipoParametroRuperado);
            listaTipoParametro.push(tipoParametroMontado);                 
        };
        estacaoRecuperada.tipoParametros = listaTipoParametro;
        const resposta = MontaObjetoEstacao.criaEstacao(estacaoRecuperada);
        return res.status(200).send(resposta);                     
    };
    
    atualizar(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        throw new Error("Method not implemented.");
    }

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

}

export default new EstacaoController();