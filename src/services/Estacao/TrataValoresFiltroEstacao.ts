import { Request } from "express";
import { FindManyOptions, Like } from "typeorm";
import { Estacao } from "../../entities/Estacao";
import InterfaceFiltroSelecao from "../InterfaceFiltroSelecao";
import TrataValoresFiltro from "../TrataValoresFiltro";

class TrataValoresFiltroEstacao extends TrataValoresFiltro<Estacao> {

    tratarContagem(req: Request): FindManyOptions<Estacao> {
        const nomeEstacao = req.query.nome ?
            "%" + req.query.nome + "%" : "%%";
        const cepEstacao = req.query.cep ?
            "%" + req.query.cep + "%" : "%%";
        
        const filtro: FindManyOptions<Estacao> = {
            where: {
                nomeEstacao: Like(`${nomeEstacao}`),
                cepEstacao: Like(`${cepEstacao}`),
                statusEstacao:true
            }
        };

        return filtro;        
    };

    tratarSelect(req: Request): InterfaceFiltroSelecao {
        const nomeEstacao = req.query.nome ?
            "%" + req.query.nome + "%" : "%%";
        const cepEstacao = req.query.cep ?
            "%" + req.query.cep + "%" : "%%";

        const filtro = {
            query: `estacao.nomeEstacao LIKE :nome AND estacao.cepEstacao LIKE :cep AND estacao.statusEstacao = true AND estacao.statusEstacao = :status`,
            valores: {
                nome: nomeEstacao,
                cep: cepEstacao,
                status: true
            }
        }
        return filtro;
    };

};

export default new TrataValoresFiltroEstacao();