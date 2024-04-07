import { Router } from "express";
import EstacaoController from "../controllers/EstacaoController";

const routesEstacao = Router();

routesEstacao.post("/cadastrar", EstacaoController.cadastrar);
routesEstacao.get("/listarGeral/paginada", EstacaoController.listarPaginada)

export default routesEstacao;