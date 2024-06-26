import { Request } from "express";
import { FindManyOptions, Like } from "typeorm";
import { Estacao } from "../../entities/Estacao";
import InterfaceFiltroSelecao from "../InterfaceFiltroSelecao";
import TrataValoresFiltro from "../TrataValoresFiltro";

class TrataValoresFiltroEstacao extends TrataValoresFiltro<Estacao> {

    tratarContagem(req: Request): FindManyOptions<Estacao> {
        const nomeEstacao = req.query.nome ?
            "%" + req.query.nome + "%" : "%%";
        const cidadeEstacao = req.query.cidade ?
            "%" + req.query.cidade + "%" : "%%";
        
        const filtro: FindManyOptions<Estacao> = {
            where: {
                nomeEstacao: Like(`${nomeEstacao}`),
                cidadeEstacao: Like(`${cidadeEstacao}`),
                statusEstacao:true
            }
        };

        return filtro;        
    };

    tratarSelect(req: Request): InterfaceFiltroSelecao {
        const nomeEstacao = req.query.nome ?
            "%" + req.query.nome + "%" : "%%";
        const cidadeEstacao = req.query.cidade ?
            "%" + req.query.cidade + "%" : "%%";
        const filtro = {
            query: `estacao.nomeEstacao LIKE :nome AND estacao.cidadeEstacao LIKE :cidade AND estacao.statusEstacao = :status`,
            valores: {
                nome: nomeEstacao,
                cidade: cidadeEstacao,
                status: true
            }
        }
        return filtro;
    };

};

export default new TrataValoresFiltroEstacao();