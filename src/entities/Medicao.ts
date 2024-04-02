
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Parametro } from "./Parametro";
import { Alerta } from "./Alerta";
import { OcorrenciaAlerta } from "./OcorrenciaAlerta";


@Entity()
export class Medicao {

    @PrimaryGeneratedColumn()
    idMedicao: number;

    @Column({nullable: false})
    valorMedida:number

    @Column({nullable: false})
    unixTime:number

    @ManyToOne(()=>Parametro, parametro=>parametro.medicoes)
    parametro:Parametro

    @ManyToMany(()=>Alerta, alerta=>alerta.medicoes)
    alertas:Alerta[]

    @OneToMany(()=>OcorrenciaAlerta, ocorrenciaAlerta=>ocorrenciaAlerta.medicao)
    ocorrenciasAlerta:OcorrenciaAlerta[]


}