const validator = require("validator");
const mongoose = require("mongoose");
//criando esquema = Shema
const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true, default: "" },
  email: { type: String, default: "", required: false },
  telefone: { type: Number, default: "", required: false },
  date: { type: Date, default: Date.now, required: false },
});
const ContatoModel = mongoose.model("Contato", ContatoSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contato.prototype.register = async function () {
  this.valida();
  if (this.errors.length > 0) return;
  this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function () {
  this.cleanUp();
  if (this.body.email && !validator.isEmail(this.body.email)) {
    this.errors.push("E-mail inválido");
  }
  if (!this.body.nome) this.errors.push("Nome obrigatório");
};

Contato.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== "string") {
      this.body[key] = "";
    }
  }

  this.body = {
    nome: this.body.nome,
    email: this.body.email,
    telefone: this.body.telefone,
  };
};
Contato.prototype.update = async function (id) {
  if (typeof id !== "string") return;
  this.valida();
  if (this.errors.length > 0) return;
  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {
    new: true,
  });
};

Contato.buscaPorId = async function (id) {
  if (typeof id !== "string") return;
  const contato = await ContatoModel.findById(id);
  return contato;
};
Contato.buscaContatos = async function () {
  const contatos = await ContatoModel.find().sort({ date: -1 });
  console.log(contatos);
  return contatos;
};
Contato.delete = async function (id) {
  if (typeof id !== "string") return;
  const contato = await ContatoModel.findOneAndDelete({ _id: id });
  return contato;
};

module.exports = Contato;

//Criando modelo = model

/** CRIANDO DADO */
// ContatoModel.create({
//   titulo: "O dolly",
//   descricao: "O dolly é o Dolly o dolly sabe que o dolly descricao",
// })
//  Vai retornar uma promise
//   .then((dados) => console.log(dados))
//   .catch((e) => console.log(e));

/**  BUSCANDO DADOS */
//  ContatoModel.find({titulo: "O dolly"})
//  Vai retornar uma promise
//   .then((dados) => console.log(dados))
//   .catch((e) => console.log(e));
