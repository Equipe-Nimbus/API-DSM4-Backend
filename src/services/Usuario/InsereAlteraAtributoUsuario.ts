import { Usuario } from "../../entities/Usuario";

class InsereAlteraAtributosUsuario{
    inserir(novoUsuario: Usuario, corpoRequisicao):Usuario{
        if(corpoRequisicao.bairroUsuario)
            novoUsuario.bairroUsuario = corpoRequisicao.bairroUsuario;
        if(corpoRequisicao.cepUsuario)
            novoUsuario.cepUsuario = corpoRequisicao.cepUsuario;
        if(corpoRequisicao.cidadeUsuario)
            novoUsuario.cidadeUsuario = corpoRequisicao.cidadeUsuario;
        if(corpoRequisicao.cpfUsuario)
            novoUsuario.cpfUsuario = corpoRequisicao.cpfUsuario;
        if(corpoRequisicao.dataNascimentoUsuario)
            novoUsuario.dataNascimentoUsuario = corpoRequisicao.dataNascimentoUsuario;
        if(corpoRequisicao.emailUsuario)
            novoUsuario.emailUsuario = corpoRequisicao.emailUsuario;
        if(corpoRequisicao.nomeUsuario)
            novoUsuario.nomeUsuario = corpoRequisicao.nomeUsuario;
        if(corpoRequisicao.numeroCasaUsuario)
            novoUsuario.numeroCasaUsuario = corpoRequisicao.numeroCasaUsuario;
        if(corpoRequisicao.perfilUsuario)
            novoUsuario.perfilUsuario = corpoRequisicao.perfilUsuario;
        if(corpoRequisicao.ruaAvenidaUsuario)
            novoUsuario.ruaAvenidaUsuario = corpoRequisicao.ruaAvenidaUsuario;
        if(corpoRequisicao.senhaUsuario)
            novoUsuario.senhaUsuario = corpoRequisicao.senhaUsuario;
        if(corpoRequisicao.estadoUsuario)
            novoUsuario.estadoUsuario = corpoRequisicao.estadoUsuario;
        return novoUsuario;
    }

    alterar(usuarioAlterando: Usuario, corpoRequisicao):Usuario{
        if(corpoRequisicao.bairroUsuario && corpoRequisicao.bairroUsuario !=usuarioAlterando.bairroUsuario)
            usuarioAlterando.bairroUsuario = corpoRequisicao.bairroUsuario;
        if(corpoRequisicao.cepUsuario && corpoRequisicao.cepUsuario!=usuarioAlterando.cepUsuario)
            usuarioAlterando.cepUsuario = corpoRequisicao.cepUsuario;
        if(corpoRequisicao.cidadeUsuario && corpoRequisicao.cidadeUsuario!=usuarioAlterando.cidadeUsuario)
            usuarioAlterando.cidadeUsuario = corpoRequisicao.cidadeUsuario;
        if(corpoRequisicao.cpfUsuario && corpoRequisicao.cpfUsuario!=usuarioAlterando.cpfUsuario)
            usuarioAlterando.cpfUsuario = corpoRequisicao.cpfUsuario;
        if(corpoRequisicao.emailUsuario && corpoRequisicao.emailUsuario!=usuarioAlterando.emailUsuario)
            usuarioAlterando.emailUsuario = corpoRequisicao.emailUsuario;
        if(corpoRequisicao.nomeUsuario && corpoRequisicao.nomeUsuario!=usuarioAlterando.nomeUsuario)
            usuarioAlterando.nomeUsuario = corpoRequisicao.nomeUsuario;
        if(corpoRequisicao.numeroCasaUsuario && corpoRequisicao.numeroCasaUsuario!=usuarioAlterando.numeroCasaUsuario)
            usuarioAlterando.numeroCasaUsuario = corpoRequisicao.numeroCasaUsuario;
        if(corpoRequisicao.ruaAvenidaUsuario && corpoRequisicao.ruaAvenidaUsuario!=usuarioAlterando.ruaAvenidaUsuario)
            usuarioAlterando.ruaAvenidaUsuario = corpoRequisicao.ruaAvenidaUsuario;
        if(corpoRequisicao.senhaUsuario && corpoRequisicao.senhaUsuario!=usuarioAlterando.senhaUsuario)
            usuarioAlterando.senhaUsuario = corpoRequisicao.senhaUsuario;
        if(corpoRequisicao.estadoUsuario && corpoRequisicao.estadoUsuario!=usuarioAlterando.estadoUsuario)
            usuarioAlterando.estadoUsuario = corpoRequisicao.estadoUsuario;
        
        return usuarioAlterando
    }
}

export default new InsereAlteraAtributosUsuario();