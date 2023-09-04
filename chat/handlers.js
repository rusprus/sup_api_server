const MsgsService = require('../services/msgsService.js')

module.exports = (io) => {

    const addMessage = (socket) => (msg, callback) => {
        const data = {
            uid: socket.user.id,
            room: '',
            msg: msg,
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

    const getAllMessage = async (room, callback) => {
        room = ''
        let result = await MsgsService.all(room)
        result = JSON.stringify(result.msgs)

        callback({ msgs: result, status: true })

    }

    const updateMessage = async (id, socket) => {


    }

    const deleteMessage = async (id, socket) => {


    }

    return {
        addMessage,
        getMessage,
        getAllMessage,
        updateMessage,
        deleteMessage
    }

}