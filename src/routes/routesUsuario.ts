import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";
import VerificadorToken from "../middlewares/VerificadorToken";

const routesUsuario = Router();

routesUsuario.post("/cadastrar", UsuarioController.cadastrar);
routesUsuario.get("/listarEspecifico/:id", VerificadorToken.verificar, UsuarioController.listarEspecifico);
routesUsuario.get("/listarGeral/paginada", VerificadorToken.verificar, UsuarioController.listarPaginada);
routesUsuario.delete("/deletar/:id", VerificadorToken.verificar, UsuarioController.deletar);
routesUsuario.put("/atualizar", VerificadorToken.verificar, UsuarioController.atualizar);
routesUsuario.post("/login", VerificadorToken.verificar, UsuarioController.logar)


export default routesUsuario;