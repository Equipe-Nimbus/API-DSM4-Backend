import { Request, Response } from "express"
import { Usuario } from "../../../../../src/entities/Usuario"

export default class MocksUsuarioControllerAtualizar {

    
    reqAlteracaoCompleta = {
        body:{
            idUsuario: 0,
            nomeUsuario: 'Usuário Mockado',
            emailUsuario: 'usuario@example.com2',
            senhaUsuario: 'senha123',
            cpfUsuario: '12345678901',
            cidadeUsuario: 'Mockville',
            bairroUsuario: 'Mockborough',
            ruaAvenidaUsuario: 'Mock Street',
            numeroCasaUsuario: '123',
            cepUsuario: '12345-678',
            estadoUsuario:'Estadooo'
        }
    } as unknown as Request

    reqAlteracaoUsuarioInexistente = {
        body:{
            idUsuario: 1,
            nomeUsuario: 'Usuário Mockado',
            emailUsuario: 'usuario@example.com2',
            senhaUsuario: 'senha123',
            cpfUsuario: '12345678901',
            cidadeUsuario: 'Mockville',
            bairroUsuario: 'Mockborough',
            ruaAvenidaUsuario: 'Mock Street',
            numeroCasaUsuario: '123',
            cepUsuario: '12345-678',
            estadoUsuario:'Estadooo'
        }
    } as unknown as Request

    reqAlteracaoSemAlteracao = {
        body:{
            idUsuario: 0,
            nomeUsuario: 'A',
            emailUsuario: 'A',
            senhaUsuario: 'A',
            cpfUsuario: 'A',
            cidadeUsuario: 'A',
            bairroUsuario: 'A',
            ruaAvenidaUsuario: 'A',
            numeroCasaUsuario: 'A',
            cepUsuario: 'A',
            estadoUsuario:'A'
        }
    } as unknown as Request
    reqEmailRepetido = {
        body:{
            idUsuario: 0,
            nomeUsuario: 'A',
            emailUsuario: '1',
            senhaUsuario: 'A',
            cpfUsuario: 'A',
            cidadeUsuario: 'A',
            bairroUsuario: 'A',
            ruaAvenidaUsuario: 'A',
            numeroCasaUsuario: 'A',
            cepUsuario: 'A',
            estadoUsuario:'A'
        }
    } as unknown as Request

    usuario = new Usuario()

    constructor(){
        this.usuario.bairroUsuario = "A"
        this.usuario.cepUsuario = "A"
        this.usuario.cidadeUsuario = "A"
        this.usuario.cpfUsuario = "A"
        this.usuario.dataNascimentoUsuario = new Date("01-01-1990")
        this.usuario.emailUsuario = "A"
        this.usuario.estadoUsuario = "A"
        this.usuario.nomeUsuario = "A"
        this.usuario.perfilUsuario = "A"
        this.usuario.ruaAvenidaUsuario = "A"
        this.usuario.senhaUsuario = "A"
        this.usuario.idUsuario = 0
        this.usuario.numeroCasaUsuario = "A"
    }

}

