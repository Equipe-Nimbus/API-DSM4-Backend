import { Response, Request } from "express";
import { Usuario } from "../entities/Usuario";
import PgDataSource from "../data-source";
import InsereAlteraAtributosUsuario from "../services/Usuario/InsereAlteraAtributoUsuario";
import { Repository } from "typeorm";
import TrataValoresFiltroUsuario from "../services/Usuario/TrataValoresFiltroUsuario";
import SelecaoPaginadaUsuario from "../services/Usuario/SelecaoPaginadaUsuario";
import AbstratoController from "./AbstratoController";



class UsuarioController extends AbstratoController{
    
    
    async cadastrar(req: Request, res: Response){
        const repositorioUsuario = PgDataSource.getRepository(Usuario)
        try{
            var novoUsuario = new Usuario();
            novoUsuario = InsereAlteraAtributosUsuario.inserir(novoUsuario, req.body);
            await repositorioUsuario.save(novoUsuario);
            res.send("Usuário cadastrado com sucesso")
        } catch(error){
            if(error.code == "23502")
                res.status(400).send("nenhum valor pode ser nulo");
            else if(error.code == "23505")
                res.status(400).send("email ou cpf já cadastrado");
            else
                throw error

        }
    }

    async listarEspecifico(req: Request, res:Response) {
        const repositorioUsuario = PgDataSource.getRepository(Usuario)
        const id = parseInt(req.params.id)
        const usuario = await repositorioUsuario.findOne({where:{idUsuario:id}});
        if(usuario == undefined)
            res.status(400).send("Usuário não encontrado")
        else
            res.status(200).send(usuario);
    }

    async listarPaginada(req: Request, res: Response) {
        const repositorioUsuario = PgDataSource.getRepository(Usuario)
        const pagina = req.query.pagina ? parseInt(req.query.pagina as string) : 1;
        const tamanhoPagina = req.query.tamanhoPagina ? parseInt(req.query.tamanhoPagina as string) : 10;  
        const quantidadeLinhas = await repositorioUsuario.count(TrataValoresFiltroUsuario.tratarContagem(req))
        const quantidadePaginas = Math.ceil(quantidadeLinhas/tamanhoPagina)
        try{
            const filtroSelecao = TrataValoresFiltroUsuario.tratarSelect(req)
            let usuarios = await SelecaoPaginadaUsuario.selecionar(repositorioUsuario, pagina, tamanhoPagina, filtroSelecao)
            const resposta = { usuarios:usuarios, pagina:pagina, tamanhoPagina:tamanhoPagina, quantidadePaginas:quantidadePaginas }
            res.status(200).send(resposta)
        } catch(error){
            if(pagina == 0)
                res.status(400).send("Não é permitido requisitar a página 0")
            else{
                res.status(400).send(error)
                console.log(error)
            }
        }
    }



    async atualizar(req: Request, res: Response) {
        const id = parseInt(req.body.idUsuario)
        const repositorioUsuario = PgDataSource.getRepository(Usuario);
        let usuarioAtualizando = await repositorioUsuario.findOne({where:{idUsuario:id}})
        if(usuarioAtualizando == undefined){
            res.status(400).send("Id do usuário não encontrado")
            return;
        }
        usuarioAtualizando = InsereAlteraAtributosUsuario.alterar(usuarioAtualizando, req.body)
        try{
            await repositorioUsuario.save(usuarioAtualizando)
            res.status(200).send("Usuário atualizado com sucesso")
        } catch(error){
            if(error.code == "23505")
                res.status(400).send("email ou cpf já cadastrado")
            else
                res.status(400).send(error)
        }

    }


    async deletar(req: Request, res: Response) {
        const repositorioUsuario = PgDataSource.getRepository(Usuario)
        const id = parseInt(req.params.id);
        try{
            await repositorioUsuario.delete(id);
            res.status(200).send("Usuário deletado com sucesso");
        } catch(error){
            res.status(400).send("Usuário não encontrado")
        }
    }
}

export default new UsuarioController();