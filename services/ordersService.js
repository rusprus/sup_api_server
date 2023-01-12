// const { uid } = require("johnny-five/lib/fn");
const db = require("../db");
const Order = db.order;

exports.add = async function (data, uid) {
    return await Order.create({
        uid: uid,
        name: data.name,
        dateStart: data.dateStart,
        dateEnd: data.dateEnd,
        sup_id: data.sup_id,
        note: data.note,
        status: data.status
    }).then(function (result) {
        return {
            order: result.dataValues,
            status: true
        }
    }).catch((error) => {
        console.log(error)
        return {
            status: false
        }
    })
}


exports.update = async function (data, uid) {
    return await Order.findOne({
        where: {
            id: data.id,
            uid: uid
        }
    }).then(async function (order) {
        if (!order) {
            return {
                status: false
            }
        } else {
            return await Order.update({
                name: data.name,
                dateStart: data.dateStart,
                dateEnd: data.dateEnd,
                sup_id: data.sup_id,
                note: data.note,
                status: data.status,
            }, {
                where: {
                    id: order.id
                }
            }).then((result) => {
                if (result[0]) {
                    return {
                        order: result[1],
                        status: true
                    }
                } else {
                    return {
                        status: false
                    }
                }
            }).catch((error => console.log(error)))
        }
    }).catch((error => console.log(error)))

}


exports.delete = async function (order, uid) {
    return await Order.destroy({
        where: {
            id: order.id,
            uid: uid
        }
    }).then((result) => {
        if (result) {
            return {
                status: true
            }
        } else {
            return {
                status: false
            }
        }
    }).catch((error => console.log(error)))
}

exports.all = async function (id) {
    return await Order.findAll({
        where: { uid: id }
    }, { raw: true }).then(data => {
        if (data) {
            return {
                orders: data,
                status: true
            }
        } else {
            return {
                status: false
            }
        }
    }).catch(err => console.log(err));
}



