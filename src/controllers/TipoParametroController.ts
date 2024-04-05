import PgDataSource from "../data-source";
import { TipoParametro } from "../entities/TipoParametro";
import InsereAtributoTipoParametro from "../services/TipoParametro/InsereAtributoTipoParametro";
import ConfereIgualdadeTipoParametro from "../services/TipoParametro/ConfereIgualdadeTipoParametro";
import { Request, Response } from "express";
import AbstratoController from "./AbstratoController";
import TratarValoresFiltroTipoParametro from "../services/TipoParametro/TratarValoresFiltroTipoParametro";
import SelecaoPaginadaTipoParametro from "../services/TipoParametro/SelecaoPaginadaTipoParametro";
import AtualizaAtrifutoTipoParametro from "../services/TipoParametro/AtualizaAtributoTipoParametro";


class TipoParametroController extends AbstratoController {
    

    async cadastrar(req: Request, res: Response){
        const repositorioTipoParametro = PgDataSource.getRepository(TipoParametro)
        let novoTipoParametro = new TipoParametro()
        novoTipoParametro = InsereAtributoTipoParametro.inserir(novoTipoParametro, req)
        const resultado = await ConfereIgualdadeTipoParametro.conferir(novoTipoParametro)
        if(resultado == false && novoTipoParametro.unidadeTipoParametro && novoTipoParametro.nomeTipoParametro){
            res.status(400).send("TipoParametro identico já cadastrada")
            return;
        }
        try{
            await repositorioTipoParametro.save(novoTipoParametro);
            res.status(200).send("Tipo parametro cadastrado com sucesso")
        } catch(error){
            if(error.code == "23502")
                res.status(400).send("nomeTipoParametro e unidadeTipoParametro não podem ser nulo");
            else
                throw error
        }
    }

    async listarEspecifico(req: Request, res: Response): Promise<void> {
        const repositorioTipoParametro = PgDataSource.getRepository(TipoParametro)
        const id = parseInt(req.params.id)
        const tipoParametro = await repositorioTipoParametro.findOne({where:{idTipoParametro:id}})
        if(tipoParametro){
            res.status(200).send(tipoParametro)
            return;
        }
        res.status(400).send("Tipo Parametro não encontrado")
    }

    async listarPaginada(req: Request, res: Response): Promise<void> {
        const repositorioTipoParametro = PgDataSource.getRepository(TipoParametro)
        const pagina = req.query.pagina ? parseInt(req.query.pagina as string) : 1;
        const tamanhoPagina = req.query.tamanhoPagina ? parseInt(req.query.tamanhoPagina as string) : 10;  
        const quantidadeLinhas = await repositorioTipoParametro.count(TratarValoresFiltroTipoParametro.tratarContagem(req))
        const quantidadePaginas = Math.ceil(quantidadeLinhas/tamanhoPagina)
        try{
            const filtroSelecao = TratarValoresFiltroTipoParametro.tratarSelect(req)
            let tiposParametros = await SelecaoPaginadaTipoParametro.selecionar(repositorioTipoParametro, pagina, tamanhoPagina, filtroSelecao)
            const resposta = { tiposParametros:tiposParametros, pagina:pagina, tamanhoPagina:tamanhoPagina, quantidadePaginas:quantidadePaginas }
            res.status(200).send(resposta)
        } catch(error){
            if(pagina == 0)
                res.status(400).send("Não é permitido requisitar a página 0")
            else{
                res.status(400).send(error)
                console.log(error)
            }
        }
    }



    async atualizar(req: Request, res: Response): Promise<void> {
        const repositorioTipoParametro = PgDataSource.getRepository(TipoParametro)
        const id = parseInt(req.body.idTipoParametro)
        let tipoParametro = await repositorioTipoParametro.findOne({where:{idTipoParametro:id}})
        if(tipoParametro == undefined){
            res.status(400).send("Id do Tipo Parametro não encontrado")
            return;
        }
        tipoParametro = AtualizaAtrifutoTipoParametro.atualizar(tipoParametro, req)
        const resultado = await ConfereIgualdadeTipoParametro.conferir(tipoParametro)
        if(resultado == false){
            res.status(400).send("TipoParametro identico já existe no banco de dados")
            return;
        }
        await repositorioTipoParametro.save(tipoParametro)
        res.status(200).send("Tipo parametro atualizado com sucesso")

    }

    async deletar(req: Request, res: Response) {
        const repositorioTipoParametro = PgDataSource.getRepository(TipoParametro);
        const id = parseInt(req.params.id);
        let tipoParametro = await repositorioTipoParametro.findOne({where:{idTipoParametro:id}});
        if(tipoParametro == undefined){
            res.status(400).send("Tipo Parametro não pode ser deletado pois não existe")
            return;
        }
        tipoParametro.statusTipoParametro = false;
        await repositorioTipoParametro.save(tipoParametro);
        res.status(200).send("Tipo Parametro deletado com sucesso")
    }

}
export default new TipoParametroController()