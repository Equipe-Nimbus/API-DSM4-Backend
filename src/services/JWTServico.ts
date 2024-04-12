import * as jwt from "jsonwebtoken"

interface InterfaceJWTparametros{
    idUsuario:number,
    nomeUsuario:string,
    perfilUsuario:string
}


const gerarToken = (dados:InterfaceJWTparametros)=>{
    if(!process.env.JWT_SECRET) return "JWT_SECRET inexistente"

    return jwt.sign(dados, process.env.JWT_SECRET, {expiresIn:"4h"})
}


const conferirToken = (token:string)=>{
    if(!process.env.JWT_SECRET) return "JWT_SECRET inexistente"
    try{
        const decodificacao = jwt.verify(token, process.env.JWT_SECRET)
        if(typeof decodificacao == "string") return "Token invalido";
        return decodificacao as InterfaceJWTparametros
    } catch(error){
        return "Token invalido"
    }
    
}

export const JWTServico = {
    gerarToken,
    conferirToken
}