import { Repository } from "typeorm";
import InterfaceFiltroSelecao from "./InterfaceFiltroSelecao";

export default abstract class SelecaoPaginada<Entity> {
    
    abstract selecionar(repositorio:Repository<Entity>, pagina:number, tamanhoPagina:number, filtro:InterfaceFiltroSelecao):Promise<Entity[]>
}