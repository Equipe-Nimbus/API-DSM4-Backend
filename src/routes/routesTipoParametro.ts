import { Router } from "express";
import TipoParametroController from "../controllers/TipoParametroController";
import VerificadorToken from "../middlewares/VerificadorToken";

const routesTipoParametro = Router();

routesTipoParametro.post("/cadastrar", VerificadorToken.verificar, TipoParametroController.cadastrar)
routesTipoParametro.delete("/deletar/:id", VerificadorToken.verificar, TipoParametroController.deletar)
routesTipoParametro.get("/listarGeral/paginada", VerificadorToken.verificar, TipoParametroController.listarPaginada)
routesTipoParametro.get("/listarEspecifico/:id", VerificadorToken.verificar, TipoParametroController.listarEspecifico);
routesTipoParametro.get("/listarParaSelecao/:idEstacao", VerificadorToken.verificar, TipoParametroController.listarParaSelecao);
routesTipoParametro.put("/atualizar", VerificadorToken.verificar, TipoParametroController.atualizar)


export default routesTipoParametro;