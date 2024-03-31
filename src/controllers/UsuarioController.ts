import { Response, Request } from "express";
import { Usuario } from "../entities/Usuario";
import PgDataSource from "../data-source";
import InsereAlteraAtributosUsuario from "../services/Usuario/InsereAlteraAtributoUsuario";



class UsuarioController {
    

    async cadastrar(req: Request, res: Response){
        const repositorioUsuario = PgDataSource.getRepository(Usuario);
        try{
            var novoUsuario = new Usuario();
            novoUsuario = InsereAlteraAtributosUsuario.inserirAlterar(novoUsuario, req.body);
            await repositorioUsuario.save(novoUsuario);
            res.send("Usuário cadastrado com sucesso")
        } catch(error){
            if(error.message.includes("null value in column"))
                res.status(400).send("nenhum valor pode ser nulo");
            else if(error.message.includes("duplicate key value"))
                res.status(400).send("email ou cpf já cadastrado");
            else
                throw error
        }
    }

    async listarEspecifico(req: Request, res:Response) {
        const repositorioUsuario = PgDataSource.getRepository(Usuario);
        const id = parseInt(req.params.id)
        const usuario = await repositorioUsuario.findOne({where:{idUsuario:id}});
        if(usuario == undefined)
            res.status(400).send("Usuário não encontrado")
        else
            res.status(200).send(usuario);
    }


    async listarPaginada(req: Request, res: Response) {
        const repositorioUsuario = PgDataSource.getRepository(Usuario);
        const pagina = req.query.pagina ?
            parseInt(req.query.pagina as string) : 1;
        const tamanhoPagina = req.query.tamanhoPagina ?
            parseInt(req.query.tamanhoPagina as string) : 10;
        const quantidadeLinhas = await repositorioUsuario.count();
        const quantidadePaginas = Math.ceil(quantidadeLinhas/tamanhoPagina)
        try{
            const usuarios = await repositorioUsuario
                .createQueryBuilder("usuario") // Nome da entidade (tabela) no TypeORM
                .orderBy("usuario.nomeUsuario", 'ASC') // Ordena pelo atributo "nomeUsuario"
                .skip((pagina - 1) * tamanhoPagina) // Pula os registros para a paginação
                .take(tamanhoPagina) // Define o tamanho da página
                .getMany(); // Executa a consulta e obtém os resultados paginados

            const resposta = { usuarios:usuarios, pagina:pagina, tamanhoPagina:tamanhoPagina, quantidadePaginas:quantidadePaginas }
            res.status(200).send(resposta)
        } catch(error){
            if(pagina == 0)
                res.status(400).send("Não é permitido requisitar a página 0")
            else
                res.send(400).send(error)
        }

    }

    async deletar(req: Request, res: Response) {
        const repositorioUsuario = PgDataSource.getRepository(Usuario);
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