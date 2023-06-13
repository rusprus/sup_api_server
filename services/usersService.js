const db = require("../db");
const User = db.user;

exports.add = async function (user) {
    return await User.create({
        login: user.login,
        name: user.name,
        age: 25,
        role: 1,
        token: '',
        password: user.hash,
        email: user.email,
    }).then(function (result) {
        return {
            user: result.dataValues,
            status: true
        }
    }).catch((error) => {
        console.log(error)
        return {
            status: false
        }
    })
}


exports.update = async function (data, id) {
    return await User.findByPk(id).then(async function (user) {
        if (!user) {
            return {
                status: false
            }
        } else {
            return await User.update({
                name: data.name,
                age: data.age,
                role: data.role,
                email: data.email,
                photo : data.photo ,
                status: data.status,
                note_eml: data.note_eml,
                note_tlg: data.note_tlg,
            }, {
                where: {
                    id: user.id
                }
            }).then((result) => {
                if (result[0]) {
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
    }).catch((error => console.log(error)))

}

exports.delete = async function (user) {
    return await User.destroy({
        where: {
            id: user.id
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

exports.getByLogin = async function (loginname) {
    // console.log('Step 11')
    let result = await User.findOne({
        where: {
            login: loginname
        }
    })
    // console.log('Step 12')

    if (result) {
        // console.log('Step 13')

        return {
            user: result.dataValues,
            status: true
        }
    } else {
        return {
            status: false
        }
    }
}

exports.getById = async function (id) {
    // console.log('Step 11')
    let result = await User.findOne({
        where: {
            id: id
        }
    })
    console.log('Step 12')

    if (result) {
        console.log('Step 13')

        return {
            user: result.dataValues,
            status: true
        }
    } else {
        return {
            status: false
        }
    }
}

