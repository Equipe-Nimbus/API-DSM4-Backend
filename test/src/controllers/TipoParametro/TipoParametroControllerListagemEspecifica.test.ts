import TipoParametroController from "../../../../src/controllers/TipoParametroController";
import { Request } from "express";
import MockResponse from "../MockResponse";
import { TipoParametro } from "../../../../src/entities/TipoParametro";


let listaTipoParametro:TipoParametro[]=[]

jest.mock("../../../../src/data-source", ()=>{

    const mockRepository = {
        findOne: (idObjeto: { where: { idTipoParametro: number } }) => {
            let tipoParametroEncontrado:TipoParametro
            listaTipoParametro.forEach(tipoParametro => {
                if(tipoParametro.idTipoParametro == idObjeto.where.idTipoParametro)
                    tipoParametroEncontrado = tipoParametro
            });
            if(tipoParametroEncontrado)
                return tipoParametroEncontrado
            else
                return undefined
        }
    };
    const mockGetRepository = jest.fn(() => mockRepository);
    return {
        getRepository: mockGetRepository,
    };
})

let req = {
    params: {
        id: null
    }
}



describe("Testes listagem específica de Tipo Parametro", ()=>{

    beforeAll(()=>{
        const tipoParametro1 = new TipoParametro();
        tipoParametro1.idTipoParametro = 1;
        const tipoParametro2 = new TipoParametro();
        tipoParametro2.idTipoParametro = 2;

        listaTipoParametro.push(tipoParametro1);
        listaTipoParametro.push(tipoParametro2);
    })


    test("Listagem especifica de um Tipo Parametro existente", async()=>{
        req.params.id = "2"
        const requisicao = req as unknown as Request
        const mockRes = (MockResponse.resSemLocals.status(200).send as jest.Mock).mockClear();
        await TipoParametroController.listarEspecifico(requisicao, MockResponse.resSemLocals);
        expect(mockRes.mock.calls[0][0]).toBe(listaTipoParametro[1]);
        
    })

    test("Listagem especifica de um Tipo Parametro não existente", async()=>{
        req.params.id = "0"
        const requisicao = req as unknown as Request
        const mockResStatus = (MockResponse.resSemLocals.status(400).send as jest.Mock).mockClear();
        await TipoParametroController.listarEspecifico(requisicao, MockResponse.resSemLocals);
        expect(mockResStatus.mock.calls[0][0]).toBe("Tipo Parametro não encontrado")
    })

})