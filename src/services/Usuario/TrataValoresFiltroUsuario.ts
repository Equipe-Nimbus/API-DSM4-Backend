import { Request } from "express";
import { FindManyOptions, Like } from "typeorm";
import TrataValoresFiltro from "../TrataValoresFiltro";
import { Usuario } from "../../entities/Usuario";

class TrataValoresFiltroUsuario extends TrataValoresFiltro<Usuario>{
    
    
    tratarContagem(req: Request): FindManyOptions<Usuario> {
        const nomeUsuario = req.query.nome ?
            req.query.nome : ""
        const emailUsuario = req.query.email ?
            req.query.email : ""

        const filtro:FindManyOptions<Usuario> = {
            where:{
                nomeUsuario: Like(`%${nomeUsuario}%`),
                emailUsuario: Like(`%${emailUsuario}%`)
            }
        }
        return filtro;
        
    }

    tratarSelect(req: Request): string {
        const nomeUsuario = req.query.nome ?
            req.query.nome : ""
        const emailUsuario = req.query.email ?
            req.query.email : ""
        const filtro = `usuario.nomeUsuario LIKE %${nomeUsuario}% AND usuario.emailUsuario LIKE %${emailUsuario}%`
        return filtro;
        
    }

}

export default new TrataValoresFiltroUsuario()