class BasicModel{
    constructor(code,msg,data){
        this.code = code
        this.msg = msg
        this.data = data
    }
}

class SuccessModel extends BasicModel{
    constructor({msg,data,code = 200}){
        super(code,msg,data)
    }
}

class ErrorModel extends BasicModel{
    constructor({msg,data,code = 500}){
        super(code,msg,data)
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}