import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TipoParametro } from "./TipoParametro";
import { Estacao } from "./Estacao";
import { Medicao } from "./Medicao";
import { OcorrenciaAlerta } from "./OcorrenciaAlerta";


@Entity()
export class Alerta {

    @PrimaryGeneratedColumn()
    idAlerta: number;

    @Column({nullable:false})
    nomeAlerta:string

    @Column({nullable:false})
    condicaoAlerta:string
    
    @Column({nullable:false, default:true})
    statusAlerta:boolean
    
    @Column({nullable:false})
    valorMedicaoAlerta:number

    @ManyToOne(()=>TipoParametro, tipoParametros=>tipoParametros.alertas)
    tipoParametro:TipoParametro

    @ManyToMany(()=>Medicao, medicao=>medicao.alertas)
    medicoes:Medicao[]

    @OneToMany(()=>OcorrenciaAlerta, ocorrenciaAlerta=>ocorrenciaAlerta.alerta)
    ocorrenciasAlerta:OcorrenciaAlerta[]
}