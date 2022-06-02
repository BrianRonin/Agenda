const Contato = require("../models/ContatoModel");

exports.index = async function (req, res) {
  const contatos = await Contato.buscaContatos();
  console.log(contatos);
  res.render("index", {
    csrfToken: req.csrfToken(),
    contatos: contatos,
  });
  return;
};
