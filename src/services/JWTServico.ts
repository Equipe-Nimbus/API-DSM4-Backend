import * as jwt from "jsonwebtoken"

interface InterfaceJWTparametros{
    idUsuario:number,
    nomeUsuario:string
}


const gerarToken = (dados:InterfaceJWTparametros)=>{
    if(!process.env.JWT_SECRET) return "JWT_SECRET inexistente"

    return jwt.sign(dados, process.env.JWT_SECRET, {expiresIn:"4h"})
}


const conferirToken = (token:string)=>{
    if(!process.env.JWT_SECRET) return "JWT_SECRET inexistente"
    const decodificacao = jwt.verify(token, process.env.JWT_SECRET, (error, decodificado)=>{
        if(error) return "Token invalido"
        return decodificacao as InterfaceJWTparametros
    })
    return decodificacao
}

export const JWTServico = {
    gerarToken,
    conferirToken
}