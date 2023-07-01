const path = require("path");

exports.index = function (req, res) {

  res.sendFile(path.join(__dirname, '../uploads', req.path));
};
