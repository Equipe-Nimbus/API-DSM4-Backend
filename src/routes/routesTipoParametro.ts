import { Router } from "express";
import TipoParametroController from "../controllers/TipoParametroController";

const routesTipoParametro = Router();

routesTipoParametro.post("/cadastrar", TipoParametroController.cadastrar)
routesTipoParametro.delete("/deletar/:id", TipoParametroController.deletar)
routesTipoParametro.get("/listarGeral/paginada", TipoParametroController.listarPaginada)

export default routesTipoParametro;