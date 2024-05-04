import { Repository } from "typeorm";
import InterfaceFiltroSelecao from "./InterfaceFiltroSelecao";


export default abstract class SelecaoFiltrada<Entity> {
    abstract aplicarFiltro (repositorio:Repository<Entity>, filtro:InterfaceFiltroSelecao): Promise<Entity[]>;
};