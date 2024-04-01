import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Estacoes {
  @PrimaryGeneratedColumn()
  idEstacao: number;

  @Column({nullable:false, unique:true})
  nomeEstacao: string;

  @Column({nullable:false})
  ruaAvenidaEstacao: string;

  @Column({nullable:false})
  numeroEnderecoEstacao: string;

  @Column({nullable:false})
  bairroEstacao: string;

  @Column({nullable:false})
  cidadeEstacao: string;

  @Column({nullable:false})
  estadoEstacao: string;

  @Column({nullable:false})
  cepEstacao: string;

  @Column({ nullable:false, type: 'decimal', precision: 10, scale: 8 })
  latitudeEstacao: number;

  @Column({ nullable:false, type: 'decimal', precision: 11, scale: 8 })
  longitudeEstacao: number;

  @Column({nullable:false, default:true})
  statusEstacao: boolean;
}