var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

var matricula;
var senha;
var faltas;

function dataAtualFormatada() {
  var data = new Date(),
    dia = data.getDate().toString(),
    diaF = dia.length == 1 ? "0" + dia : dia,
    mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    mesF = mes.length == 1 ? "0" + mes : mes,
    anoF = data.getFullYear();
  return diaF + "/" + mesF + "/" + anoF;
}

function gerarCodigo(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

var alunos = [
  {
    nome: "teste",
    matricula: "123456",
    senha: "asdfghjkll",
    faltas: "10",
  },
];

var provas = [
  {
    id: "ostacmid",
    materia: "Fazer Bolo1",
    prof: "prof1",
    dataLimite: "05/10/2020",
    podeFazer: true,
  },
  {
    id: "pirchlep",
    materia: "Fazer Bolo2",
    prof: "prof2",
    dataLimite: "07/10/2020",
    podeFazer: false,
  },
  {
    id: "ocklable",
    materia: "Fazer Bolo3",
    prof: "prof3",
    dataLimite: "08/08/2020",
    podeFazer: true,
  },
  {
    id: "urgasese",
    materia: "Fazer Bolo4",
    prof: "prof4",
    dataLimite: "12/08/2020",
    podeFazer: true,
  },
];

app.post("/entrar", function (req, res) {
  console.log(req.body.matricula);
  console.log(req.body.senha);

  matricula = req.body.matricula;
  senha = req.body.senha;

  var provadisponivel = 0;

  for (x = 0; x < alunos.length; x++) {
    if (alunos[x].matricula == matricula && alunos[x].senha == senha) {
      var alunoLogado = alunos[x];

      for (y = 0; y < provas.length; y++) {
        if (provas[y].podeFazer == false) {
          provadisponivel++;
        }
      }

      var dataAtual = dataAtualFormatada();

      var provasDisponiveis = [];

      for (z = 0; z < provas.length; z++) {
        date1 = new Date(provas[z].dataLimite);
        var date2 = new Date(dataAtual);
        var tempo = Math.abs(date2 - date1);
        var dias = Math.ceil(tempo / (1000 * 60 * 60 * 24));
        console.log(dias + " days");
        if (dias < 3) {
          provasDisponiveis[z] = true;
        } else {
          provasDisponiveis[z] = false;
        }
      }

      console.log(provasDisponiveis);

      if (provadisponivel > 0) {
        res.render("provas", {
          prova: provas,
          nome: alunoLogado.nome,
          provasDisponiveis,
          provasDisponiveis: provasDisponiveis,
        });
      } else {
        res.send(
          "<div id=" +
            "mensagemdeerro" +
            ">Não a provas disponiveis para segunda chamada!!!</div>"
        );
      }
    } else {
      res.send("Usuário não cadastrado no sistema!!!");
    }
  }
});

app.get("/provasegundachamada/:id", (req, res) => {
  var dados;

  for (x = 0; x < provas.length; x++) {
    if (provas[x].id == req.params.id) {
      dados = provas[x];
    }
  }

  console.log(dados);

  res.render("soliciatarchamada", { prova: dados, matricula: matricula });
});

app.post("/enviardados", function (req, res) {
  var dataAtual = dataAtualFormatada();
  var codigo = gerarCodigo(8);
  res.send(
    "Solicitação enviada com sucesso! " +
      "Data de Emissão: " +
      dataAtual +
      " Código: " +
      codigo
  );
  console.log("Solicitação enviada com sucesso!");
});

app.listen(3005);
