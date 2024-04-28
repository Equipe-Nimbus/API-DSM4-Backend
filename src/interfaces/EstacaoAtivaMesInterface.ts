import { ObjectId } from "typeorm/driver/mongodb/bson.typings";

export default interface EstacaoAtivaMesInterface{
    _id?:ObjectId,
    ativas:number,
    mes:string,
    ano:string
}