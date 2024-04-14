import { Request, Response, NextFunction } from "express";
import { JWTServico } from "../services/JWTServico";

class VerificadorToken{

    async verificar(req:Request, res:Response, next:NextFunction){
        let token = req.headers.authorization;
        
        if(token){
            token = token.replace("Bearer ", "")
            const tokenDecodificado = JWTServico.conferirToken(token)
            if(tokenDecodificado == "JWT_SECRET inexistente"){
                res.status(500).send("Servidor incapaz de verificar o token"); return;
            }
            if(tokenDecodificado == "Token invalido"){
                res.status(401).send("Token inválido"); return;
            }
            req.headers.idUsuario = tokenDecodificado.idUsuario.toString()
            req.headers.nomeUsuario = tokenDecodificado.nomeUsuario
            req.headers.perfilUsuario = tokenDecodificado.perfilUsuario
            next()
            return;
        }
        res.status(401).send("Token não enviado")
    }

}

export default new VerificadorToken();