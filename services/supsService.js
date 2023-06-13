// const { uid } = require("johnny-five/lib/fn");
const db = require("../db");
const Sup = db.sup;

exports.add = async function (data, uid) {
    return await Sup.create({
        uid: uid,
        name: data.name,
        sup_id: data.sup_id,
        model: data.model,
        img: data.img,
        status: data.status
    }).then(function (result) {
        return {
            sup: result.dataValues,
            status: true
        }
    }).catch((error) => {
        console.log(error)
        return {
            status: false
        }
    })
}


exports.update = async function (data, uid, img) {
    console.log(data )
    console.log(uid )
    console.log(img )
    return await Sup.findOne({
        where: {
            id: data.id,
            uid: uid
        }
    }).then(async function (sup) {
        if (!sup) {
            return {
                status: false
            }
        } else {
            return await Sup.update({
                name: data.name,
                model: data.model,
                img: img,
                status: data.status,
            }, {
                where: {
                    id: sup.id
                }
            }).then((result) => {
                if (result[0]) {
                    return {
                        sup: result[1],
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


exports.delete = async function (sup, uid) {
    return await Sup.destroy({
        where: {
            id: sup.id,
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
    return await Sup.findAll({
        where: { uid: id }
    }, { raw: true }).then(data => {
        if (data) {
            return {
                sups: data,
                status: true
            }
        } else {
            return {
                status: false
            }
        }
    }).catch(err => console.log(err));
}



