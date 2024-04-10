import { Router } from "express";
import EstacaoController from "../controllers/EstacaoController";
import VerificadorToken from "../middlewares/VerificadorToken";

const routesEstacao = Router();

routesEstacao.post("/cadastrar", VerificadorToken.verificar, EstacaoController.cadastrar);
routesEstacao.get("/listarGeral/paginada", VerificadorToken.verificar, EstacaoController.listarPaginada);
routesEstacao.get("/listarEspecifico/:id", VerificadorToken.verificar, EstacaoController.listarEspecifico);

export default routesEstacao;