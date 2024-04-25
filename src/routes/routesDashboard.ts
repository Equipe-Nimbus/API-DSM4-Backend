import { Router } from "express";
import VerificadorToken from "../middlewares/VerificadorToken";
import DashboardController from "../controllers/DashboardController";

const routesDashboard = Router();

routesDashboard.get("/geral", VerificadorToken.verificar, DashboardController.gerarDashboardGeral);
routesDashboard.get("/estacao", VerificadorToken.verificar, DashboardController.geratDashboardEstacao);


export default routesDashboard;