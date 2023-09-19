const MsgsService = require('../services/msgsService.js')

module.exports = (io) => {

    const addMessage = (socket) => (msg, callback) => {
        if (!socket.rooms.has(msg.room)) socket.rooms.clear()

        socket.join(msg.room)

        const data = {
            uid: socket.user.id,
            nsp: '/',
            room: msg.room,
            msg: msg.text,
            status: 1
        }
        MsgsService.add(data)
            .then((result) => {
                console.log('added message: ');
                console.log(result);
                callback({
                    msg: result.msg,
                    status: true
                })
            })
            .catch(() => {
                console.log('Error add message')
                callback({
                    status: false
                })
            })

    }

    const getMessage = async (id, socket) => {

    }

    const getAllMessage = (socket) => async (callback) => {
        const uid = socket.user?.id
        if (uid) {
            let result = await MsgsService.all(uid)
            result = JSON.stringify(result.msgs)

            callback({ msgs: result, status: true })
        } else {
            callback({ msgs: 'id upsent', status: false })
        }


    }

    const updateMessage = async (id, socket) => {


    }

    const deleteMessage = async (id, socket) => {


    }

    const setRoom = (socket) => (room, callback) => {
        if (socket.rooms.size > 0) socket.rooms.clear()

        socket.join(room)



        callback({ status: true, value: room })
    }

    return {
        addMessage,
        getMessage,
        getAllMessage,
        updateMessage,
        deleteMessage,
        setRoom
    }

}