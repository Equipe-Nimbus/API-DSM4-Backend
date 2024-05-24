import { Router } from "express";
import VerificadorToken from "../middlewares/VerificadorToken";
import DashboardController from "../controllers/DashboardController";
import RelatorioController from "../controllers/RelatorioController";

const routesRelatorio = Router();

routesRelatorio.get("/medicoes/:inicio/:fim/:idEstacao", VerificadorToken.verificar, RelatorioController.geraRelatorioMedicao);


export default routesRelatorio;