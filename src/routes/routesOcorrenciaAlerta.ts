import { Router } from "express";
import OcorrenciaAlertaController from "../controllers/OcorrenciaAlertaController";


const routesOcorrenciaAlerta = Router();

routesOcorrenciaAlerta.get("/listar/:dataIncio/:dataFinal/:pagina/:tamanhoPagina", OcorrenciaAlertaController.listar);

export default routesOcorrenciaAlerta;