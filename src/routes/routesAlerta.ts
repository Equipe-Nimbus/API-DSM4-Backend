import { Router } from "express";
import AlertaController from "../controllers/AlertaController";
import VerificadorToken from "../middlewares/VerificadorToken";

const routesAlerta = Router();

routesAlerta.post("/cadastrar", VerificadorToken.verificar, AlertaController.cadastrar);
routesAlerta.delete("/deletar/:idAlerta", VerificadorToken.verificar, AlertaController.deletar);
routesAlerta.get("/listarGeral/paginada", VerificadorToken.verificar, AlertaController.listarPaginada);


export default routesAlerta;