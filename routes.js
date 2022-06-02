const express = require("express");
const route = express.Router();
//middleware
const {
  loginRequired,
  existRequired,
} = require("./src/middlewares/middleware");
//home
const homeController = require("./src/controllers/homeController");
route.get("/", homeController.index);
//login
const loginController = require("./src/controllers/loginController");
route.get("/login", existRequired, loginController.index);
route.post("/login/register", existRequired, loginController.register);
route.post("/login/login", existRequired, loginController.login);
route.get("/login/logout", loginController.logout);
//contatos
const contatoController = require("./src/controllers/contatoController");
route.get("/contato", loginRequired, contatoController.index);
route.post("/contato/register", loginRequired, contatoController.register);
route.get("/contato/:id", loginRequired, contatoController.id);
route.post("/contato/update/:id", loginRequired, contatoController.update);
route.get("/contato/delete/:id", loginRequired, contatoController.delete);

module.exports = route;
