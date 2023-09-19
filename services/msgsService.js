const db = require("../db");
const Msg = db.msg;
const User = db.user;
const { Op } = require("sequelize");

exports.add = async function (data) {
    return await Msg.create({
        uid: data.uid,
        room: data.room,
        msg: data.msg,
        status: data.status,
    }).then(function (result) {
        return {
            msg: result.dataValues,
        }
    }).catch((error) => {
        console.log(error)
        return {
            status: false
        }
    })
}


exports.update = async function (data, room) {
    // return await Msg.findOne({
    //     where: {
    //         id: data.id,
    //         room: room
    //     }
    // })
    //     .then(async function (msg) {
    //         if (!msg) {
    //             return {
    //                 status: false
    //             }
    //         } else {
    //             return await Msg.update({
    //                 room: room,
    //                 uid: data.uid,
    //                 msg: data.msg,
    //                 status: data.status,
    //             }, {
    //                 where: {
    //                     id: msg.id
    //                 }
    //             })
    //                 .then((result) => {
    //                     if (result[0]) {
    //                         return {
    //                             msg: result[1],
    //                             status: true
    //                         }
    //                     } else {
    //                         return {
    //                             status: false
    //                         }
    //                     }
    //                 }).catch((error => console.log(error)))
    //         }
    //     }).catch((error => console.log(error)))

}


exports.delete = async function (msg, room) {
    // return await Msg.destroy({
    //     where: {
    //         id: msg.id,
    //         room: room
    //     }
    // }).then((result) => {
    //     if (result) {
    //         return {
    //             status: true
    //         }
    //     } else {
    //         return {
    //             status: false
    //         }
    //     }
    // }).catch((error => console.log(error)))
}

exports.all = async function (uid) {
    return await User.findAll({
        attributes: ['id'],
        where: { mng_id: uid },
    }, { raw: true }).then(async clients => {
        if (clients) {
           return await Msg.findAll({

                where: {
                    room: {
                        [Op.in]: clients.map((item)=>item.id)
                    }
                },
            }, { raw: true }).then((data) => {
                return {
                    msgs: data,
                    status: true
                }
            })

        } else {
            return {
                status: false
            }
        }
    }).catch(err => console.log(err));
}



