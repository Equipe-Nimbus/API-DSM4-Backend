import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TipoParametro } from "./TipoParametro";
import { Estacao } from "./Estacao";
import { Medicao } from "./Medicao";


@Entity()
export class Parametro {

    @PrimaryGeneratedColumn()
    idParametro: number;

    @ManyToOne(()=>TipoParametro, tipoParametros => tipoParametros.parametros)
    tiposParametro:Promise<TipoParametro>
    
    @ManyToOne(()=>Estacao, estacoes => estacoes.parametros)
    estacoes:Estacao

    @OneToMany(()=>Medicao, medicoes=>medicoes.parametro)
    medicoes:Medicao[]
}