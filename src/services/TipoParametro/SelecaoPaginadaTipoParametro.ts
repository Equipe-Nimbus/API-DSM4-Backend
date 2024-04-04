import { Repository } from "typeorm";
import { TipoParametro } from "../../entities/TipoParametro";
import SelecaoPaginada from "../SelecaoPaginada";
import InterfaceFiltroSelecao from "../InterfaceFiltroSelecao";

class SelecaoPaginadaTipoParametro extends SelecaoPaginada<TipoParametro>{
    
    async selecionar(repositorio: Repository<TipoParametro>, pagina: number, tamanhoPagina: number, filtro: InterfaceFiltroSelecao): Promise<TipoParametro[]> {
        const listaTipoParametroListados = await repositorio
        .createQueryBuilder("tipo_parametro") // Nome da entidade (tabela) no TypeORM
        .select(["tipo_parametro.idTipoParametro", "tipo_parametro.nomeTipoParametro", "tipo_parametro.fatorTipoParametro", "tipo_parametro.unidadeTipoParametro"]) // Seleciona apenas os atributos desejados
        .where(filtro.query, filtro.valores)
        .andWhere("tipo_parametro.statusTipoParametro = :status", { status: true })
        .orderBy("tipo_parametro.nomeTipoParametro", 'ASC') // Ordena pelo atributo "nomeTipoParametro"
        .skip((pagina - 1) * tamanhoPagina) // Pula os registros para a paginação
        .take(tamanhoPagina) // Define o tamanho da página
        .getMany(); // Executa a consulta e obtém os resultados paginados

        return listaTipoParametroListados;
    }
}
export default new SelecaoPaginadaTipoParametro()