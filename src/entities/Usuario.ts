import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column()
  nomeUsuario: string;

  @Column()
  emailUsuario: string;

  @Column()
  senhaUsuario: string;

  @Column()
  tipoUsuario: string;
  
  @Column()
  dataNascimentoUsuario: Date;

  @Column()
  cpfUsuario: string;
  
  @Column()
  cidadeUsuario: string;

  @Column()
  bairroUsuario: string;

  @Column()
  ruaAvenidaUsuario: string;

  @Column()
  numeroCasaUsuario: string;

  @Column()
  cepUsuario: string;
}