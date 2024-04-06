import * as bcryptjs from "bcryptjs"
import { Usuario } from "../entities/Usuario";

class HashServico{

    hashingSenhaUsuario(usuario:Usuario){
        usuario.senhaUsuario = bcryptjs.hashSync(usuario.senhaUsuario, 10);
        return usuario;
    }

    conferirSenhaHash(senha:string, usuario:Usuario){
        const resultado = bcryptjs.compareSync(senha, usuario.senhaUsuario)
        return resultado
    }
}

export default new HashServico();