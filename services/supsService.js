// const { uid } = require("johnny-five/lib/fn");
const db = require("../db");
const Sup = db.sup;

exports.add = async function (data, uid) {
    return await Sup.create({
        uid: uid,
        name: data.name,
        model: data.model,
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


exports.update = async function (data, uid) {

    const oldSup = await Sup.findOne({
        where: {
            id: data.id,
            uid: uid
        }
    })

    if (!oldSup) {
        return {
            status: false
        }
    } else {
        const result = await Sup.update({
            name: data.name,
            model: data.model,
            status: data.status,
        }, {
            where: {
                id: oldSup.id
            }
        })

        if (result[0]) {

            const newSup = await Sup.findOne({
                where: {
                    id: data.id,
                    uid: uid
                }
            })

            return {
                sup: newSup.dataValues,
                status: true
            }
        } else {
            return {
                status: false
            }
        }
    }
}


exports.updateImg = async function (data, uid, img) {

    const oldSup = await Sup.findOne({
        where: {
            id: data.id,
            uid: uid
        }
    })

    if (!oldSup) {
        return {
            status: false
        }
    } else {

        const result = await Sup.update({
            img: img,
        }, {
            where: {
                id: oldSup.id
            }
        })

        if (result[0]) {

            const newSup = await Sup.findOne({
                where: {
                    id: data.id,
                    uid: uid
                }
            })

            return {
                sup: {
                    img: newSup.dataValues.img,
                    id: newSup.dataValues.id,
                },
                status: true
            }
        } else {
            return {
                status: false
            }
        }
    }
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

exports.findByPk = async function (id) {
    return await Sup.findByPk(id).then(data => {
        if (data) {
            return {
                sup: data,
                status: true
            }
        } else {
            return {
                status: false
            }
        }
    }).catch(err => console.log(err));
}



