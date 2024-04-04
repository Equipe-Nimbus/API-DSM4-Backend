import { Request, Response } from "express"
class MocksUsuarioControllerCadastro{
    req1 = {
        body:{
            nomeUsuario: 'Usuário Mockado',
            emailUsuario: 'usuario@example.com',
            senhaUsuario: 'senha123',
            perfilUsuario: 'mock',
            dataNascimentoUsuario: new Date('1990-01-01'),
            cpfUsuario: '12345678901',
            cidadeUsuario: 'Mockville',
            bairroUsuario: 'Mockborough',
            ruaAvenidaUsuario: 'Mock Street',
            numeroCasaUsuario: '123',
            cepUsuario: '12345-678'
        }
    } as unknown as Request


    reqComCPFIgualAo1 = {
        body:{
            nomeUsuario: 'Usuário Mockado',
            emailUsuario: 'usuario@example.com2',
            senhaUsuario: 'senha123',
            perfilUsuario: 'mock',
            dataNascimentoUsuario: new Date('1990-01-01'),
            cpfUsuario: '12345678901',
            cidadeUsuario: 'Mockville',
            bairroUsuario: 'Mockborough',
            ruaAvenidaUsuario: 'Mock Street',
            numeroCasaUsuario: '123',
            cepUsuario: '12345-678'
        }
    } as unknown as Request

    reqComEmailIgualAo1 = {
        body:{
            nomeUsuario: 'Usuário Mockado',
            emailUsuario: 'usuario@example.com',
            senhaUsuario: 'senha123',
            perfilUsuario: 'mock',
            dataNascimentoUsuario: new Date('1990-01-01'),
            cpfUsuario: '123456789012',
            cidadeUsuario: 'Mockville',
            bairroUsuario: 'Mockborough',
            ruaAvenidaUsuario: 'Mock Street',
            numeroCasaUsuario: '123',
            cepUsuario: '12345-678'
        }
    } as unknown as Request
    
    reqComvalorNulo = {
        body:{
            nomeUsuario: 'Usuário Mockado',
            emailUsuario: "",
            senhaUsuario: 'senha123',
            perfilUsuario: 'mock',
            dataNascimentoUsuario: new Date('1990-01-01'),
            cpfUsuario: '123456789012',
            cidadeUsuario: 'Mockville',
            bairroUsuario: 'Mockborough',
            ruaAvenidaUsuario: 'Mock Street',
            numeroCasaUsuario: '123',
            cepUsuario: '12345-678'
        }
    } as unknown as Request


    reqDiferenteAo1 = {
        body:{
            nomeUsuario: 'Usuário Mockado',
            emailUsuario: 'usuario@example.com2',
            senhaUsuario: 'senha123',
            perfilUsuario: 'mock',
            dataNascimentoUsuario: new Date('1990-01-01'),
            cpfUsuario: '123456789012',
            cidadeUsuario: 'Mockville',
            bairroUsuario: 'Mockborough',
            ruaAvenidaUsuario: 'Mock Street',
            numeroCasaUsuario: '123',
            cepUsuario: '12345-678'
        }
    } as unknown as Request

}

export default new MocksUsuarioControllerCadastro()