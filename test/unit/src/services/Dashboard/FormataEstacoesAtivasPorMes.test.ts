import { ObjectId } from "typeorm/driver/mongodb/bson.typings";
import EstacaoAtivaMesInterface from "../../../../../src/interfaces/EstacaoAtivaMesInterface";
import FormataEstacoesAtivasPorMes from "../../../../../src/services/Dashboard/FormataEstacoesAtivasPorMes";

let listaEstacaoMes:EstacaoAtivaMesInterface[]=[
    {
      _id: undefined,
      ativas: 6,
      mes: 'Abril',
      ano: '2024'
    },
    {
      _id: undefined,
      ativas: 3,
      mes: 'Março',
      ano: '2024'
    },
    {
      _id: undefined,
      ativas: 7,
      mes: 'Fevereiro',
      ano: '2024'
    },
    {
      _id: undefined,
      ativas: 7,
      mes: 'Janeiro',
      ano: '2024'
    },
    {
      _id: undefined,
      ativas: 6,
      mes: 'Dezembro',
      ano: '2023'
    },
    {
      _id: undefined,
      ativas: 8,
      mes: 'Novembro',
      ano: '2023'
    },
    {
      _id: undefined,
      ativas: 5,
      mes: 'Outubro',
      ano: '2023'
    }
  ]

  let resultado ={
    quantidades: [
      6, 3, 7, 7,
      6, 8, 5
    ],
    meses: [
      'Abril 2024',
      'Março 2024',
      'Fevereiro 2024',
      'Janeiro 2024',
      'Dezembro 2023',
      'Novembro 2023',
      'Outubro 2023'
    ]
  }


  describe("Formata estações ativas por mes", ()=>{
    test("Formatacao correta", ()=>{
        let formatado = FormataEstacoesAtivasPorMes.formatar(listaEstacaoMes)
        expect(formatado.meses[0]).toBe(resultado.meses[0])
        expect(formatado.quantidades[3]).toBe(resultado.quantidades[3])
    })
  })