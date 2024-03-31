import { Usuario } from "../../entities/Usuario";

class InsereAlteraAtributosUsuario{
    inserirAlterar(novoUsuario: Usuario, corpoRequisicao):Usuario{
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
        return novoUsuario;
    }
}

export default new InsereAlteraAtributosUsuario();