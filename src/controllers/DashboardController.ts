import { Request, Response } from "express";
import PegaQuantidadeTotalEstacao from "../services/Dashboard/PegaQuantidadeTotalEstacao";
import DashboardGeral from "../interfaces/DashboardGeral";
import IniciaInterfaceDashboard from "../services/Dashboard/IniciaInterfaceDashboard";
import GeraDashBoardgeral from "../services/Dashboard/GeraDashBoardgeral";

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
        res.status(500).send("não implementado")
    }

}

export default new DashboardController()