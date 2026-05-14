const AuditLog=require("../models/AuditLog")

exports.createLog=async ({user , action , vehicle })=>{
    return await AuditLog.create({
        user,
        action,
        vehicle
    })
}