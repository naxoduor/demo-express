const Record = require('../../models').Record
module.exports = {
    createRecord: async (params, req) => {
        console.log("authorization is", req.isAuth)
        if(!req.isAuth){
            throw new Error("not authenticated")
        }
        const { title, description, userId } = params.recordsInput
        const record = new Record({
            title,
            description,
            userId:userId
        })
        let createdRecord = await record.save()
        let allRecords= await Record.findAll({
            where:{
                userId:userId
            }
        })
        return allRecords
    }
}