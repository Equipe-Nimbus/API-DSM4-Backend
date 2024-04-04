import TrataStrings from "../../../src/services/TrataStrings"



describe("Teste da classe que trata strings, tira acesntos e transforma em lower case", ()=>{

    test("Tira acento e deixa em caixa baixa", ()=>{
        var stringSemTratamento = "cÉU"
        const stringComTratamento = TrataStrings.tratarParaLowerSemAcento(stringSemTratamento)
        expect(stringComTratamento).toBe("CEU")
    })

})