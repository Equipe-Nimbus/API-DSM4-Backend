import { FindManyOptions, Repository, } from "typeorm";


class ContagemLinhas{

    async contar<Entity>(repositorio: Repository<Entity>, filtro:FindManyOptions<Entity>){
        const contagem = await repositorio.count(filtro);
        return contagem;
    }

}