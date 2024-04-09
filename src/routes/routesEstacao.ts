import { Router } from "express";
import EstacaoController from "../controllers/EstacaoController";

const routesEstacao = Router();

routesEstacao.post("/cadastrar", EstacaoController.cadastrar);
routesEstacao.get("/listarGeral/paginada", EstacaoController.listarPaginada);
routesEstacao.get("/listarEspecifico/:id", EstacaoController.listarEspecifico);

export default routesEstacao;