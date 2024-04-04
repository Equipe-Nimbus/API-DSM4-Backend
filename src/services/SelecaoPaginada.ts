import { Repository } from "typeorm";

export default abstract class SelecaoPaginada<Entity> {
    
    abstract selecionar(repositorio:Repository<Entity>, pagina:number, tamanhoPagina:number, filtro:string):Promise<Entity[]>
}