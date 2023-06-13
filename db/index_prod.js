const { Sequelize } = require("sequelize");

sequelize = new Sequelize("usersdb", "root", "34kdoOVL_dfPA_VJHG9W", {
  dialect: "mysql",
  host: process.env.MYSQL_HOST,
  define: {
    timestamps: false
  }
});
 
 User = require('./User')(sequelize)
 Order = require('./Order')(sequelize)
// синхронизация с бд, после успшной синхронизации запускаем сервер
// sequelize.sync().then(()=>{
//   app.listen(3000, function(){
//     console.log("Сервер ожидает подключения...");
//   });
// }).catch(err=>console.log(err));
 


module.exports = {
  sequelize: sequelize,
  user: User,
  order: Order
} 


// // получение данных
// app.get("/rrr", function(req, res){
//     User.findAll({raw: true }).then(data=>{
//       res.json({
//         users: data
//       })
//       // res.render("index.hbs", {
//       //   users: data
//       // });
//     }).catch(err=>console.log(err));
// });
 
// app.get("/create", function(req, res){
//     res.render("create.hbs");
// });
 
// // добавление данных
// app.post("/create", urlencodedParser, function (req, res) {
         
//     if(!req.body) return res.sendStatus(400);
         
//     const username = req.body.name;
//     const userage = req.body.age;
//     User.create({ name: username, age: userage}).then(()=>{
//       res.redirect("/");
//     }).catch(err=>console.log(err));
// });
 
// // получаем объект по id для редактирования
// app.get("/edit/:id", function(req, res){
//   const userid = req.params.id;
//   User.findAll({where:{id: userid}, raw: true })
//   .then(data=>{
//     res.render("edit.hbs", {
//       user: data[0]
//     });
//   })
//   .catch(err=>console.log(err));
// });
 
// // обновление данных в БД
// app.post("/edit", urlencodedParser, function (req, res) {
         
//   if(!req.body) return res.sendStatus(400);
 
//   const username = req.body.name;
//   const userage = req.body.age;
//   const userid = req.body.id;
//   User.update({name:username, age: userage}, {where: {id: userid} }).then(() => {
//     res.redirect("/");
//   })
//   .catch(err=>console.log(err));
// });
 
// // удаление данных
// app.post("/delete/:id", function(req, res){  
//   const userid = req.params.id;
//   User.destroy({where: {id: userid} }).then(() => {
//     res.redirect("/");
//   }).catch(err=>console.log(err));
// });