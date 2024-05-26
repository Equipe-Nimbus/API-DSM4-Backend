import { Router } from "express"
import RelatorioController from "../controllers/RelatorioController";

const routesRelatorio = Router();

routesRelatorio.get("/medicoes/:inicio/:fim/:idEstacao", RelatorioController.geraRelatorioMedicao);


export default routesRelatorio;