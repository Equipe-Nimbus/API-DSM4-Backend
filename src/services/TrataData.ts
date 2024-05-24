class TrataData{

    tratar(data:string){
        const dataDesmembrada = data.split("-").map(Number);
        const dataNova = new Date(dataDesmembrada[0], dataDesmembrada[1]-1, dataDesmembrada[2]).getTime()
        return dataNova/1000
    }

}

export default new TrataData()