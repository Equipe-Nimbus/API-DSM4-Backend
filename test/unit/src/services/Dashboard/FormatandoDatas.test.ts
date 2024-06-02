import FormatandoDatas from "../../../../../src/services/Dashboard/FormatandoDatas"

describe("Formatando Datas", ()=>{
    test("Converte numero em mes", ()=>{
        const mes = FormatandoDatas.numeroMesParaString(3)
        expect(mes).toBe("Abril")
    })
})