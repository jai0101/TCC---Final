const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const passport = require("./config/passport");

const Usuario = require("./models/usuario");
const Disciplina = require("./models/disciplina");

const conexao = require("./config/conexao");
const publicRoute = require("./routes/publicRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "nodejs",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", publicRoute);

app.get("/disciplina/:disciplina/foto/:arquivo", (req, res) => {
    const caminho = path.join(__dirname, "public", "imagem", req.params.arquivo);
    res.download(caminho);
});

app.get("/listar", async (req, res) => {
    const usuarios = await Usuario.find();
    const disciplinas = await Disciplina.find().populate("usuario");
    res.render("listar", { usuarios, disciplinas });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
