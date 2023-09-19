const { getByToken } = require("../services/usersService.js")


module.exports = function (io) {
  const {
    addMessage,
    getMessage,
    getAllMessage,
    updateMessage,
    deleteMessage,
    setRoom
  } = require("./handlers")(io);


  const onConnection =  (socket) => {

    

    socket.on("message:add", addMessage(socket));
    socket.on("message:get", getMessage);
    socket.on("message:get-all", getAllMessage(socket));
    socket.on("message:update", updateMessage);
    socket.on("message:delete", deleteMessage); 
    socket.on("message:set-room", setRoom(socket)); 
  }

  io.use(async (socket, next) => {
    try {
      let token = socket.handshake.headers.xauthorization.split(" ")[1]

      const result = await getByToken(token)

      socket.user = result.user
      // console.log(socket.handshake.query);
      next()
    } catch {
      next(new Error('Неизвестный пользователь'))
    }
  })

  io.on('connection', onConnection);

}

