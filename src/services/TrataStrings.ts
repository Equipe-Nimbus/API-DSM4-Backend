class TrataStrings{

    tratarParaLowerSemAcento(stringSemTratamento:string){
        stringSemTratamento = this.removerAcento(stringSemTratamento)
        return stringSemTratamento.toLowerCase()
    }

    private removerAcento(stringComAcento:string){
        return stringComAcento.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

}

export default new TrataStrings()