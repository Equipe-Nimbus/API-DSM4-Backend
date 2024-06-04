import PgDataSource from "../../../src/data-source";
import { Usuario } from "../../../src/entities/Usuario";
import HashServico from "../../../src/services/HashServico";

async function salvaUsuario(): Promise<void> {
    const repositorioUsuario = await PgDataSource.getRepository(Usuario);
    let novoUsuario = new Usuario();
    
    novoUsuario.nomeUsuario = "João da Silva",
    novoUsuario.emailUsuario = "testeintegracao@teste.com",
    novoUsuario.senhaUsuario = "senha123",
    novoUsuario.perfilUsuario = "admin",
    novoUsuario.dataNascimentoUsuario = new Date("1990-01-01"),
    novoUsuario.cpfUsuario = "123.456.789-00",
    novoUsuario.cidadeUsuario = "São Paulo",
    novoUsuario.bairroUsuario = "Centro",
    novoUsuario.ruaAvenidaUsuario = "Avenida Paulista",
    novoUsuario.estadoUsuario = "SP",
    novoUsuario.numeroCasaUsuario = "1234",
    novoUsuario.cepUsuario = "01000-000"

    const usuarioComSenhaEncriptada = HashServico.hashingSenhaUsuario(novoUsuario); 
    await repositorioUsuario.save(usuarioComSenhaEncriptada);
};

export default salvaUsuario;