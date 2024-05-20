import { Router } from "express";
import RelatorioController from "../controllers/RelatorioController";


const routesRelatorio = Router();

routesRelatorio.get("/quantidadeAlerta", RelatorioController.geraRelatorioQuantidadeAlerta);

export default routesRelatorio;