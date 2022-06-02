const { async } = require("regenerator-runtime");
const Contato = require("../models/ContatoModel");

exports.index = (req, res) => {
  res.render("contato", {
    csrfToken: req.csrfToken(),
  });
};
exports.register = async function (req, res) {
  try {
    const contato = new Contato(req.body);
    await contato.register();
    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      return res.redirect("/contato");
    }
    req.flash("success", "registrado");
    req.session.save(() => {
      return res.redirect(`/contato/${contato.contato._id}`);
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.id = async function (req, res) {
  const contato = await Contato.buscaPorId(req.params.id);
  if (!req.params.id) return res.render("404");
  if (!contato) return res.render("404");
  res.render("contato", { contato: contato, csrfToken: req.csrfToken() });
};

exports.update = async function (req, res) {
  try {
    if (!req.params.id) return res.render("404");
    const contato = new Contato(req.body);
    await contato.update(req.params.id);
    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      //return res.redirect("/contato");
    }
    req.flash("success", "atualizado com sucesso");
    req.session.save(() => {
      return res.redirect("/");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};
exports.delete = async function (req, res) {
  if (!req.params.id) return res.render("404");
  const contato = await Contato.delete(req.params.id);
  if (!contato) return res.render("404");
  res.redirect("/");
};
