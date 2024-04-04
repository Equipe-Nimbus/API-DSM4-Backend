import { query, Request } from "express";
import { FindManyOptions, Like } from "typeorm";
import TrataValoresFiltro from "../TrataValoresFiltro";
import { Usuario } from "../../entities/Usuario";
import InterfaceFiltroSelecao from "../InterfaceFiltroSelecao";


class TrataValoresFiltroUsuario extends TrataValoresFiltro<Usuario>{
    
    
    tratarContagem(req: Request): FindManyOptions<Usuario> {
        const nomeUsuario = req.query.nome ?
            "%" + req.query.nome + "%" : "%%"
        const emailUsuario = req.query.email ?
            "%" + req.query.email + "%" : "%%"

        const filtro:FindManyOptions<Usuario> = {
            where:{
                nomeUsuario: Like(`${nomeUsuario}`),
                emailUsuario: Like(`${emailUsuario}`)
            }
        }
        return filtro;
        
    }

    tratarSelect(req: Request): InterfaceFiltroSelecao {
        const nomeUsuario = req.query.nome ?
            "%" + req.query.nome + "%" : "%%"
        const emailUsuario = req.query.email ?
            "%" + req.query.email + "%" : "%%"
        
        
        const filtro = {
            query:`usuario.nomeUsuario LIKE :nome AND usuario.emailUsuario LIKE :email`,
            valores:{
                nome:nomeUsuario,
                email:emailUsuario
            }
        }
        return filtro;
        
    }

}

export default new TrataValoresFiltroUsuario()