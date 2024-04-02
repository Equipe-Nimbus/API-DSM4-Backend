import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Parametro } from "./Parametro";
import { Estacao } from "./Estacao";

@Entity()
export class TipoParametro {
    @PrimaryGeneratedColumn()
    idTipoParametro: number;

    @Column({length: 50})
    nomeTipoParametro: string;

    @Column({unique: true, length: 10})
    unidadeTipoParametro: string;

    @Column({type: "numeric", default: 1})
    fatorTipoParametro: number;

    @Column({type: "numeric", default: 1})
    offsetTipoParametro: number;

    @Column({type: "numeric", default: 0})
    ganhoTipoParametro: number;

    @Column({type: "boolean", default: true})
    statusTipoParametro: boolean;

    @OneToMany(()=>Parametro, parametro=>parametro.tiposParametro)
    parametros:Parametro[]

    @ManyToMany(()=>Estacao, estacoes=>estacoes.tipoParametros)
    estacoes:Estacao[]

    @Column()
    idAlerta: number
}