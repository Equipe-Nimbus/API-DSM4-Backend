import { Router } from "express";
import RelatorioController from "../controllers/RelatorioController";


const routesRelatorio = Router();

routesRelatorio.post("/quantidadeAlerta", RelatorioController.geraRelatorioQuantidadeAlerta);
routesRelatorio.get("/medicoes/:inicio/:fim/:idEstacao", RelatorioController.geraRelatorioMedicao);

export default routesRelatorio;