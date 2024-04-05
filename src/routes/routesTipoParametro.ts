import { Router } from "express";
import TipoParametroController from "../controllers/TipoParametroController";

const routesTipoParametro = Router();

routesTipoParametro.post("/cadastrar", TipoParametroController.cadastrar)
routesTipoParametro.delete("/deletar/:id", TipoParametroController.deletar)
routesTipoParametro.get("/listarGeral/paginada", TipoParametroController.listarPaginada)
routesTipoParametro.get("/listarEspecifico/:id", TipoParametroController.listarEspecifico);
routesTipoParametro.put("/atualizar", TipoParametroController.atualizar)


export default routesTipoParametro;