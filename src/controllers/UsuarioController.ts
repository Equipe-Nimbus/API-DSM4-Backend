import { Response, Request } from "express";
import { Usuario } from "../entities/Usuario";
import PgDataSource from "../data-source";
import InsereAlteraAtributosUsuario from "../services/Usuario/InsereAlteraAtributoUsuario";



class UsuarioController {


    async cadastroUsuario(req: Request, res: Response):Promise<void>{
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
            throw error
        }
    }

    
}

export default new UsuarioController();