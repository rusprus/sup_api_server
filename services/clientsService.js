// const { manager_id } = require("johnny-five/lib/fn");
const db = require("../db");
const Client = db.client;

exports.add = async function (data, manager_id) {
    return await Client.create({
        manager_id: manager_id,
        fio: data.fio,
        tlg: data.tlg,
        notes: data.notes,
    }).then(function (result) {
        return {
            client: result.dataValues,
            status: true
        }
    }).catch((error) => {
        console.log(error)
        return {
            status: false
        }
    })
}


exports.update = async function (data, manager_id) {
    return await Client.findOne({
        where: {
            id: data.id,
            manager_id: manager_id
        }
    }).then(async function (client) {
        if (!client) {
            return {
                status: false
            }
        } else {
            return await Client.update({
                manager_id: manager_id,
                fio: data.fio,
                tlg: data.tlg,
                note: data.note,
            }, {
                where: {
                    id: client.id
                }
            }).then((result) => {
                if (result[0]) {
                    return {
                        client: result[1],
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


exports.delete = async function (client, manager_id) {
    return await Client.destroy({
        where: {
            id: client.id,
            manager_id: manager_id
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
    return await Client.findAll({
        where: { manager_id: id }
    }, { raw: true }).then(data => {
        if (data) {
            return {
                clients: data,
                status: true
            }
        } else {
            return {
                status: false
            }
        }
    }).catch(err => console.log(err));
}



