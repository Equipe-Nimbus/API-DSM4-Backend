import { Request, Response } from "express";
import PegaQuantidadeTotalEstacao from "../services/Dashboard/PegaQuantidadeTotalEstacao";
import DashboardGeral from "../interfaces/DashboardGeral";
import IniciaInterfaceDashboard from "../services/Dashboard/IniciaInterfaceDashboard";
import GeraDashBoardgeral from "../services/Dashboard/GeraDashBoardgeral";
import ConsultaMedicoesDeHoje from "../services/Dashboard/ConsultaMedicoesDeHoje";
import GeraDashboardEspecifico from "../services/Dashboard/GeraDashboardEspecifico";

class DashboardController{

    async gerarDashboardGeral(req:Request, res:Response){
        try {
            const dashboardGeral = await GeraDashBoardgeral.gerar()
            res.status(200).send(dashboardGeral)
        } catch (error) {
            const erro = error as Error
            res.status(400).send(erro.message)
        }

    }


    async geratDashboardEstacao(req:Request, res:Response){
        const {idEstacao} = req.params
        try{
            let lista = await GeraDashboardEspecifico.gerar(idEstacao)
            if(lista.parametros.length == 0)
                throw new Error("idEstacao não existente ou estação sem medições")
            res.status(200).send(lista)
        } catch(error){
            res.status(400).send(error.message)
        }
    }

}

export default new DashboardController()