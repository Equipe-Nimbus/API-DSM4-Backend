import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TipoParametro } from "./TipoParametro";
import { Estacao } from "./Estacao";
import { Medicao } from "./Medicao";
import { Alerta } from "./Alerta";


@Entity()
export class OcorrenciaAlerta {

    @PrimaryGeneratedColumn()
    idOcorrenciaAlerta: number;
    
    @ManyToOne(()=>Alerta, alerta => alerta.ocorrenciasAlerta)
    alerta:Alerta

    @ManyToOne(()=>Medicao, medicoes=>medicoes.ocorrenciasAlerta)
    medicao:Medicao
}