import { Entity, PrimaryGeneratedColumn, Column, Check, Unique } from 'typeorm';


@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column({ nullable: false })
  nomeUsuario: string;

  @Column({ nullable: false, unique: true })
  emailUsuario: string;

  @Column({ nullable: false })
  senhaUsuario: string;

  @Column({ nullable: true })
  perfilUsuario: string;
  
  @Column({ nullable: false })
  dataNascimentoUsuario: Date;

  @Column({ nullable: false, unique: true })
  cpfUsuario: string;
  
  @Column({ nullable: false })
  cidadeUsuario: string;

  @Column({ nullable: false })
  bairroUsuario: string;

  @Column({ nullable: false })
  ruaAvenidaUsuario: string;

  @Column({ nullable: false })
  estadoUsuario: string;
  
  @Column({ nullable: false })
  numeroCasaUsuario: string;

  @Column({ nullable: false })
  cepUsuario: string;


}