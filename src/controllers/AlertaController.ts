import { Request, Response } from "express";
import AbstratoController from "./AbstratoController";
import ConfereExistenciaRelacaoParametro from "../services/Alerta/ConfereExistenciaRelacaoParametro";
import PgDataSource from "../data-source";
import { Alerta } from "../entities/Alerta";
import InsereAtributosAlerta from "../services/Alerta/InsereAtributosAlerta";
import TrataValoresFiltro from "../services/TrataValoresFiltro";
import TrataValoresFiltroAlerta from "../services/Alerta/TrataValoresFiltroAlerta";
import SelecaoPaginadaAlerta from "../services/Alerta/SelecaoPaginadaAlerta";
import ConfereExistenciaAlertaIdentico from "../services/Alerta/ConfereExistenciaAlertaIdentico";


class AlertaController extends AbstratoController{

    async cadastrar(req: Request, res: Response){
        const repositorioAlerta = PgDataSource.getRepository(Alerta)
        const {idEstacao, idTipoParametro, condicaoAlerta, valorMedicaoAlerta, nomeAlerta} = req.body
        const parametro = await ConfereExistenciaRelacaoParametro.confere(idEstacao, idTipoParametro)
        if(parametro == undefined){
            res.status(400).send("Não foi encontrada a relação entre essa estação e o tipoParametro")
            return;
        }
        const alerta = InsereAtributosAlerta.inserir(parametro, condicaoAlerta, valorMedicaoAlerta, nomeAlerta)
        const resultado = await ConfereExistenciaAlertaIdentico.confere(repositorioAlerta, alerta)
        if(resultado)
            return res.status(400).send("Alerta existente já cadastrado")
        try{
            await repositorioAlerta.save(alerta)
            res.status(200).send("Alerta cadastrado com sucesso")
        } catch(error){
            if(error.code == "23502"){
                res.status(400).send("Nenhum valor pode ser nulo");
                return;
            }
            throw error            
        }

    }

    listarEspecifico(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }

    async listarPaginada(req: Request, res: Response): Promise<void> {
        const repositorioAlerta = PgDataSource.getRepository(Alerta)
        const pagina = req.query.pagina ? parseInt(req.query.pagina as string) : 1;
        const tamanhoPagina = req.query.tamanhoPagina ? parseInt(req.query.tamanhoPagina as string) : 10;  
        const quantidadeLinhas = await repositorioAlerta.count(TrataValoresFiltroAlerta.tratarContagem(req))
        const quantidadePaginas = Math.ceil(quantidadeLinhas/tamanhoPagina)
        const filtroSelecao = TrataValoresFiltroAlerta.tratarSelect(req)
        try{
            const selecao = await SelecaoPaginadaAlerta.selecionar(repositorioAlerta, pagina, tamanhoPagina, filtroSelecao)
            const resposta = { alertas:selecao, pagina:pagina, tamanhoPagina:tamanhoPagina, quantidadePaginas:quantidadePaginas }
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

    atualizar(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }


    async deletar(req: Request, res: Response) {
        const repositorioAlerta = PgDataSource.getRepository(Alerta)
        const idAlerta = parseInt(req.params.idAlerta)
        const alerta = await repositorioAlerta.findOne({where:{idAlerta:idAlerta}})
        if(alerta == undefined)
            return res.status(400).send("Id do alerta não encontrado")
        alerta.statusAlerta = false
        await repositorioAlerta.save(alerta)
        res.status(200).send("Alerta deletado com sucesso")
    }
}
export default new AlertaController()