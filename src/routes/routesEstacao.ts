import { Router } from "express";
import EstacaoController from "../controllers/EstacaoController";
import VerificadorToken from "../middlewares/VerificadorToken";

const routesEstacao = Router();


routesEstacao.post("/cadastrar", VerificadorToken.verificar, EstacaoController.cadastrar);
routesEstacao.get("/listarGeral/paginada", VerificadorToken.verificar, EstacaoController.listarPaginada);
routesEstacao.get("/listarEspecifico/:id", VerificadorToken.verificar, EstacaoController.listarEspecifico);
routesEstacao.get("/listarParaSelecao", VerificadorToken.verificar, EstacaoController.listarParaSelecao);
routesEstacao.get("/listarAtivas/filtro", EstacaoController.listarEstacoesAtivas);
routesEstacao.delete("/deletar/:idEstacao", VerificadorToken.verificar, EstacaoController.deletar);
routesEstacao.put("/atualizar", VerificadorToken.verificar, EstacaoController.atualizar);

export default routesEstacao;