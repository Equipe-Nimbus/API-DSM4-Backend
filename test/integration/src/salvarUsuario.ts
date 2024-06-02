import PgDataSourceTest from "../../../src/dataSourceTest";
import { Usuario } from "../../../src/entities/Usuario";

async function salvaUsuario(): Promise<void> {
    const repositorioUsuario = await PgDataSourceTest.getRepository(Usuario);
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

    await repositorioUsuario.save(novoUsuario);
};

export default salvaUsuario;