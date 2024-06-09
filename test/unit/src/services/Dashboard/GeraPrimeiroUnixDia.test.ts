import GeraPrimeiroUnixDia from "../../../../../src/services/Dashboard/GeraPrimeiroUnixDia"

describe("Gerar o primeiro unixtime do dia", ()=>{
    test("Gerar unix time de agora", ()=>{
        const primeiroUnix = GeraPrimeiroUnixDia.gerar().toString()
        expect(primeiroUnix.substring(primeiroUnix.length - 2)).toBe("00")
    })
})