// Elementos do DOM
const telaInicio = document.getElementById("tela-inicio");
const telaQuiz = document.getElementById("tela-quiz");
const telaResultado = document.getElementById("tela-resultado");

const btnIniciar = document.getElementById("btn-iniciar");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnJogarNovamente = document.getElementById("btn-jogar-novamente");

const contadorPerguntas = document.getElementById("contador-perguntas");
const contadorPontos = document.getElementById("contador-pontos");
const progressoPreenchimento = document.getElementById("progresso-preenchimento");
const enunciado = document.getElementById("enunciado");
const caixaAlternativas = document.getElementById("caixa-alternativas");

const iconeResultado = document.getElementById("icone-resultado");
const classificacaoResultado = document.getElementById("classificacao-resultado");
const textoPontuacao = document.getElementById("texto-pontuacao");
const mensagemResultado = document.getElementById("mensagem-resultado");

// Banco de Perguntas
const perguntas = [
    {
        enunciado: "Em qual clube profissional Cristiano Ronaldo fez sua estreia no futebol profissional?",
        alternativas: [
            { texto: "Manchester United", correta: false },
            { texto: "Sporting CP", correta: true },
            { texto: "Real Madrid", correta: false },
            { texto: "FC Porto", correta: false }
        ]
    },
    {
        enunciado: "Quantas vezes Cristiano Ronaldo venceu a UEFA Champions League?",
        alternativas: [
            { texto: "3 vezes", correta: false },
            { texto: "4 vezes", correta: false },
            { texto: "5 vezes", correta: true },
            { texto: "6 vezes", correta: false }
        ]
    },
    {
        enunciado: "Quantas Bolas de Ouro (Ballon d'Or) CR7 conquistou em sua carreira?",
        alternativas: [
            { texto: "4", correta: false },
            { texto: "5", correta: true },
            { texto: "6", correta: false },
            { texto: "7", correta: false }
        ]
    },
    {
        enunciado: "Em qual ano Cristiano Ronaldo conquistou a Eurocopa com a Seleção Portuguesa?",
        alternativas: [
            { texto: "2012", correta: false },
            { texto: "2014", correta: false },
            { texto: "2016", correta: true },
            { texto: "2020", correta: false }
        ]
    },
    {
        enunciado: "Por qual valor estimado CR7 foi transferido do Real Madrid para a Juventus em 2018?",
        alternativas: [
            { texto: "80 milhões de euros", correta: false },
            { texto: "100 milhões de euros", correta: true },
            { texto: "120 milhões de euros", correta: false },
            { texto: "150 milhões de euros", correta: false }
        ]
    },
    {
        enunciado: "Qual número de camisa Cristiano Ronaldo usou em sua primeira temporada no Real Madrid (2009/10)?",
        alternativas: [
            { texto: "9", correta: true },
            { texto: "7", correta: false },
            { texto: "10", correta: false },
            { texto: "11", correta: false }
        ]
    },
    {
        enunciado: "Qual clube da Arábia Saudita contratou CR7 no final de 2022?",
        alternativas: [
            { texto: "Al-Hilal", correta: false },
            { texto: "Al-Ittihad", correta: false },
            { texto: "Al-Nassr", correta: true },
            { texto: "Al-Ahli", correta: false }
        ]
    }
];

let indicePerguntaAtual = 0;
let pontuacao = 0;
let bloqueioResposta = false;

// Event Listeners
btnIniciar.addEventListener("click", iniciarQuiz);
btnReiniciar.addEventListener("click", reiniciarQuiz);
btnJogarNovamente.addEventListener("click", iniciarQuiz);

// Funções Principais
function iniciarQuiz() {
    indicePerguntaAtual = 0;
    pontuacao = 0;
    
    telaInicio.classList.add("escondido");
    telaResultado.classList.add("escondido");
    telaQuiz.classList.remove("escondido");
    
    carregarPergunta();
}

function carregarPergunta() {
    bloqueioResposta = false;
    const perguntaAtual = perguntas[indicePerguntaAtual];

    // Atualiza cabeçalho e progresso
    contadorPerguntas.textContent = `Pergunta ${indicePerguntaAtual + 1} de ${perguntas.length}`;
    contadorPontos.textContent = `Pontos: ${pontuacao}`;
    const porcentagemProgresso = ((indicePerguntaAtual) / perguntas.length) * 100;
    progressoPreenchimento.style.width = `${porcentagemProgresso}%`;

    // Atualiza pergunta e botões
    enunciado.textContent = perguntaAtual.enunciado;
    caixaAlternativas.innerHTML = "";

    perguntaAtual.alternativas.forEach(opcao => {
        const botao = document.createElement("button");
        botao.textContent = opcao.texto;
        botao.classList.add("btn", "btn-opcao");
        botao.addEventListener("click", () => selecionarResposta(opcao, botao));
        caixaAlternativas.appendChild(botao);
    });
}

function selecionarResposta(opcao, botaoClicado) {
    if (bloqueioResposta) return;
    bloqueioResposta = true;

    const botoes = caixaAlternativas.querySelectorAll(".btn-opcao");

    if (opcao.correta) {
        pontuacao++;
        botaoClicado.classList.add("correta");
    } else {
        botaoClicado.classList.add("incorreta");
        // Revela a resposta certa
        botoes.forEach((btn, index) => {
            if (perguntas[indicePerguntaAtual].alternativas[index].correta) {
                btn.classList.add("correta");
            }
        });
    }

    contadorPontos.textContent = `Pontos: ${pontuacao}`;

    // Aguarda 1.2s para a próxima pergunta
    setTimeout(() => {
        indicePerguntaAtual++;
        if (indicePerguntaAtual < perguntas.length) {
            carregarPergunta();
        } else {
            exibirResultado();
        }
    }, 1200);
}

function reiniciarQuiz() {
    iniciarQuiz();
}

function exibirResultado() {
    telaQuiz.classList.add("escondido");
    telaResultado.classList.remove("escondido");

    const total = perguntas.length;
    const porcentagem = (pontuacao / total) * 100;

    textoPontuacao.textContent = `Você acertou ${pontuacao} de ${total} perguntas (${Math.round(porcentagem)}%)`;

    if (porcentagem === 100) {
        iconeResultado.textContent = "👑";
        classificacaoResultado.textContent = "SIUUU! O Maior Fã!";
        mensagemResultado.textContent = "Você domina tudo sobre o CR7! Conhecimento digno de 5 Bolas de Ouro!";
    } else if (porcentagem >= 70) {
        iconeResultado.textContent = "🏆";
        classificacaoResultado.textContent = "Titular Absoluto!";
        mensagemResultado.textContent = "Muito bem! Seu conhecimento sobre a carreira do robozão está afiado!";
    } else if (porcentagem >= 40) {
        iconeResultado.textContent = "⚽";
        classificacaoResultado.textContent = "Jogador de Rotação!";
        mensagemResultado.textContent = "Bom esforço, mas ainda faltam alguns detalhes para virar um fã especialista!";
    } else {
        iconeResultado.textContent = "🟨";
        classificacaoResultado.textContent = "Precisa Treinar Mais!";
        mensagemResultado.textContent = "Parece que você precisa rever alguns lances e títulos marcantes do CR7!";
    }
}