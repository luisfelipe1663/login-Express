//Importando a biblioteca do express
const express = require("express");

//importando o modulo path que ajuda a trabalhar com caminhos de arquivos e pastas html
const path = require("path");

//Importando todas as funções do controller(autenticação)
const{
    exibirCadastro,
     cadastrarUsuario,
     exibirLogin,
     realizarLogin,
     exibirSucesso
} = require("./controllers/authController");

//Cria a aplicação express
const app = express();

const PORT = 3000 //definição da porta

//Middleware naitvo do express para permitir que o express leia os dados enviados por formularios html
app.use(express.urlencoded({extended: true}));

//Middleware nativo do express que serve para alcançar e exibir os aquivo da pasta public. Assim o express acessa nosso CSS e as paginas HTML
app.use(express.static(path.join(__dirname, "public")));

//Rota inicial do projeto
//Quando acessarmos http://localhost:3000, o usuario ja sera redirecionado para a tela de login
app.get("/", (req, res) => {
     res.redirect("/login");
});

//Endpoint (metodo GET + rota "/cadastro") para exibir a tela de cadastro
app.get("/cadastro", exibirCadastro);

//Endpoint (metodo POST + rota "/cadastro") para receber os dados do formulario de cadastro
app.post("/cadastro", cadastrarUsuario);

//Endpoint (metodo GET + rota "/login") para exibir a tela de login
app.get("/login", exibirLogin);

//Endpoint (metodo POST + rota "/login" para receber os dadis do formulario de login)
app.post("/login", realizarLogin);

//Endpoint (metodo GET + rota "/sucesso") para exibir a tela de sucesso apos realizar o login corretamente
app.get("/sucesso", exibirSucesso);

//Inicia o servidor na porta definida
app.listen(PORT, () =>{
    console.log(`servidor rodando em http://localhost:${PORT}`);
});