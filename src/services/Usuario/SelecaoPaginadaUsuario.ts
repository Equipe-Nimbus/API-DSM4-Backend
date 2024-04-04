import { Repository } from "typeorm";
import { Usuario } from "../../entities/Usuario";
import SelecaoPaginada from "../SelecaoPaginada";
import TrataValoresFiltroUsuario from "./TrataValoresFiltroUsuario";
import InterfaceFiltroSelecao from "../InterfaceFiltroSelecao";

class SelecaoPaginadaUsuario extends SelecaoPaginada<Usuario>{
    
    async selecionar(repositorio: Repository<Usuario>, pagina: number, tamanhoPagina: number, filtro: InterfaceFiltroSelecao): Promise<Usuario[]> {
        const listaUsuarios = await repositorio
        .createQueryBuilder("usuario") // Nome da entidade (tabela) no TypeORM
        .select(["usuario.idUsuario", "usuario.nomeUsuario", "usuario.emailUsuario"]) // Seleciona apenas os atributos desejados
        .where(filtro.query, filtro.valores)
        .orderBy("usuario.nomeUsuario", 'ASC') // Ordena pelo atributo "nomeUsuario"
        .skip((pagina - 1) * tamanhoPagina) // Pula os registros para a paginação
        .take(tamanhoPagina) // Define o tamanho da página
        .getMany(); // Executa a consulta e obtém os resultados paginados

        return listaUsuarios;
    }

}

export default new SelecaoPaginadaUsuario()