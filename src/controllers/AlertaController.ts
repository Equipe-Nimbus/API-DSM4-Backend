import { Request, Response } from "express";
import AbstratoController from "./AbstratoController";
import ConfereExistenciaRelacaoParametro from "../services/Alerta/ConfereExistenciaRelacaoParametro";
import PgDataSource from "../data-source";
import { Alerta } from "../entities/Alerta";
import InsereAtributosAlerta from "../services/Alerta/InsereAtributosAlerta";


class AlertaController extends AbstratoController{

    async cadastrar(req: Request, res: Response): Promise<void> {
        const repositorioAlerta = PgDataSource.getRepository(Alerta)
        const {idEstacao, idTipoParametro, condicaoAlerta, valorMedicaoAlerta, nomeAlerta} = req.body
        const parametro = await ConfereExistenciaRelacaoParametro.confere(idEstacao, idTipoParametro)
        if(parametro == undefined){
            res.status(400).send("Não foi encontrada a relação entre essa estação e o tipoParametro")
            return;
        }
        const alerta = InsereAtributosAlerta.inserir(parametro, condicaoAlerta, valorMedicaoAlerta, nomeAlerta)
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

    listarPaginada(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
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

export default new AlertaController()