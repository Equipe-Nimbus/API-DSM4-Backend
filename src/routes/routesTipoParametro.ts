import { Router } from "express";
import TipoParametroController from "../controllers/TipoParametroController";

const routesTipoParametro = Router();

routesTipoParametro.post("/cadastrar", TipoParametroController.cadastrar)
routesTipoParametro.delete("/deletar/:id", TipoParametroController.deletar)


export default routesTipoParametro;