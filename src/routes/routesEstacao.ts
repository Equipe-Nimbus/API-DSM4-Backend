import { Router } from "express";
import EstacaoController from "../controllers/EstacaoController";

const routesEstacao = Router();

routesEstacao.post("/cadastrar", EstacaoController.cadastrar);

export default routesEstacao;