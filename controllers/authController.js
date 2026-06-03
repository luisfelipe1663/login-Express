//Importa o modulo PATH que ajuda a montar os caminhos de arquivos HTML
const path = require('path');

//Array que ira armazenar os usuarios cadastrados
const usuarios = [];

//Função responsavel por exibir a pagina de cadastro
function exibirCadastro(req, res) {
    const erro = req.query.erro;

    res.send(`
        <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Cadastro</title>
    
</head>
<body>
    
    <main class="container">
        <section class="card">
            <h1>Cadastro</h1>
            <p>Crie uma conta para acessar o sistema</p>

            ${erro ? `
                <div class="mensagem-erro">
                Este e-mail ja esta cadastrado
                </div>
                `:""}

            <form action="/cadastro" method="POST"
            autocomplete="off">
            <label for="nome">Nome</label>
            <input type="text" name="nome" id="nome" placeholder="Digite seu nome" required>
            <label for="email">E-mail</label>
            <input type="email" name="email" id="email" placeholder="Digite seu e-mail" required>
            <label for="senha">Senha</label>
            <input type="password" name="senha" id="senha"
            placeholder="Digite sua senha"
            required>
            <button type="submit">Cadastre-se</button>
            </form>
            <p class="texto-link">
                ja tem cadastro?
                <a href="/login">Fazer Login</a>
            </p>
        </section>
    </main>
</body>
</html>
`);
}

//Função reponsavel por cadastrar um novo usuario
function cadastrarUsuario(req, res) {
    //Coleta das informações enviadas pelo formulario
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    //Verifica se algum campo veio vazio
    if (!nome || !email || !senha) {
        return res.send(`
            <h1>Erro no cadastro </h1>
            <p>Preencha todos os campos</p>
            <a href="/cadastro">Voltar para a tela de cadastro</a>`);
    }

    //Verifica se o email ja existe na memoria
    const usuarioExistente = usuarios.find((usuario) => usuario.email === email);

    //Se o usuario ja foi cadastrado, ele retornara uma nova URL constando a chave "erro", que nos leva a função anterior, responsavel por retornar a tela de cadastro com a mensagem de erro.
    if (usuarioExistente) {
        return res.redirect("/cadastro?erro=email");
    }

    //Cria um novo objeto representado o novo usuario cadastrado
    const novoUsuario = {
        id: Date.now(),
        nome: nome,
        email: email,
        senha: senha
    };
    //Envia o novo usuario para nosso array de usuarios
    usuarios.push(novoUsuario);

    //Confirmação via terminal de quais usuarios estão cadastrados no meu sistema
    console.log("usuarios cadastrado ", usuarios);

    //Apos cadastrar, redireciona o usuario para a tela de login cmo a confirmação de cadastro
    res.redirect("/login?cadastro=sucesso");
}

//Função responsavel por exibir a pagina de login
function exibirLogin(req, res) {
    const erro = req.query.erro;
    const cadastro = req.query.cadastro;

    res.send(`<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Login</title>
</head>

<body>

    <main class="container">
        <section class="card">
            <h1>Login</h1>
            <p>Entre com os dados cadastrados</p>

            ${cadastro?`
                <div class ="mensagem-sucesso">Cadastro realizado com sucesso! Faça login para continuar</div>`:""}

                ${erro?`
                    <div class ="mensagem-erro">Email pu senha invalidos</div>`:""}
            <form action="/login" method="POST" autocomplete="off">
                <label for="email">E-mail</label>
                <input type="email" name="email" id="email" placeholder="Digite seu e-mail" required>
                <label for="senha">Senha</label>
                <input type="password" name="senha" id="senha" placeholder="Digite sua senha" required>

                <button type="submit"> Entrar</button>
            </form>
            <p class="texto-link">Aindaa não tem conta?
                <a href="/cadastro">Cadastre-se</a>
            </p>
        </section>
    </main>
</body>
</html>
        `);
}

//Função responsavel por realizar a validação do login
function realizarLogin(req, res) {
    //Captura os dados enviados pelo formulario de login
    const email = req.body.email;
    const senha = req.body.senha;

    //Procura no array  um usuario com o mesmo email e senha informados pelo formulario do LOGIN
    const usuarioEncontrado = usuarios.find((usuario) => {
        return usuario.email === email && usuario.senha === senha;
    });

    //Se não encontrar o usuario, exibe mensagem de erro
    if (!usuarioEncontrado) {
        return res.redirect("/login?erro=senha")
    }
    //Se o usuario for encontrado, redireciona para uma pagina de sucesso
    res.redirect(`/sucesso?nome=${usuarioEncontrado.nome}`);
}

//Função responsavel por exibir a pagina de sucesso
function exibirSucesso(req, res) {
    //Captura o nome vindo da URL
    const nome = req.query.nome;

    //Envia como resposta um html simples
    res.send(`
        <!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/style.css">
    <title>Login realizado</title>
</head>
<body>
     <main class = "container">
         <section class= "card">
            <h1>Login realizado com sucesso</h1>
            <p>Bem vindo(a), ${nome}.</p>
            <a class "link-button" href="/login.html">Voltar para o Login</a>
        </section>
     </main>
</body>
<html>`);
}

// Me permite acessar as funções de fora do arquivo 
module.exports = {
    exibirCadastro,
    cadastrarUsuario,
    exibirLogin,
    realizarLogin,
    exibirSucesso
};