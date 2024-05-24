class GeraPrimeiroUnixDia{

    gerar(){
        let agora = new Date()
        agora.setHours(0, 0, 0, 0)
        return Math.floor(agora.getTime()/1000)
    }


}

export default new GeraPrimeiroUnixDia()