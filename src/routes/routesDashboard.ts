import { Router } from "express";
import VerificadorToken from "../middlewares/VerificadorToken";
import DashboardController from "../controllers/DashboardController";

const routesDashboard = Router();

routesDashboard.get("/geral", VerificadorToken.verificar, DashboardController.gerarDashboardGeral);
routesDashboard.get("/estacao/:idEstacao", DashboardController.geratDashboardEstacao);


export default routesDashboard;