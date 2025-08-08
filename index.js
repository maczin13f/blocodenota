const inputTitulo = document.getElementById('tituloNota');
const inputNota = document.getElementById('inputDeNotas');
const notasSalvas = document.querySelector('.notasSalvas');
const notasCaixa = document.querySelector('.notasCaixa');
const criaNotas = document.querySelector('.criaNotas');

function gerarIdSeguro(titulo) {
    return 'nota-' + titulo.toLowerCase()
        .replace(/\s+/g, '-')              // espaçpos viram hifen
        .replace(/[^\w\-]+/g, '')          // remover símbolos
        .normalize('NFD')                  // remover acentos
        .replace(/[\u0300-\u036f]/g, '');
}

function salvaNotaInteira() {
    const notasSalvasLocais = JSON.parse(localStorage.getItem('notasCompletas')) || [];

    const novaNota = {
        titulo: inputTitulo.value,
        conteudo: inputNota.value
    };

    notasSalvasLocais.push(novaNota);
    localStorage.setItem('notasCompletas', JSON.stringify(notasSalvasLocais));

    adicionarNotaNaTela(novaNota);
    mostrarNota(novaNota.titulo);
    salvarTituloMenu(novaNota.titulo);

    inputTitulo.value = '';
    inputNota.value = '';
}

function adicionarNotaNaTela(notaObj) {
    const bloco = document.createElement('div');
    bloco.classList.add('blocoNota');
    bloco.style.display = 'none';
    bloco.id = gerarIdSeguro(notaObj.titulo);

    bloco.innerHTML = `
        <p class="tituloNota"><b>${notaObj.titulo}</b></p>
        <textarea disabled class="conteudoNota">${notaObj.conteudo}</textarea>
    `;

    notasCaixa.appendChild(bloco);
}

function mostrarNota(titulo) {
    const blocos = document.querySelectorAll('.blocoNota');
    blocos.forEach(bloco => bloco.style.display = 'none');

    const notaId = gerarIdSeguro(titulo);
    const notaSelecionada = document.getElementById(notaId);

    if (notaSelecionada) {
        criaNotas.style.display = 'none';
        notaSelecionada.style.display = '';
    } else {
        console.warn('Nota não encontrada:', notaId);
    }
}

// Salva o título no menu lateral (se ainda não existir)
function salvarTituloMenu(titulo) {
    const titulos = JSON.parse(localStorage.getItem('tituloMenu')) || [];

    if (!titulos.includes(titulo)) {
        titulos.push(titulo);
        localStorage.setItem('tituloMenu', JSON.stringify(titulos));
    }

    renderizarTitulosMenu();
}

// Renderiza todos os títulos na lateral com evento de clique
function renderizarTitulosMenu() {
    notasSalvas.innerHTML = '<p><b>Suas Notas serão salvas no campo abaixo</b></p>';

    const titulos = JSON.parse(localStorage.getItem('tituloMenu')) || [];
    const blocoNotaDiv = document.getElementById('nota-efe')

    titulos.forEach(titulo => {
        const criaInput = document.createElement('h3');
        criaInput.disabled = true;
        criaInput.textContent = titulo;
        criaInput.classList.add('input-titulo');
        const btnApagaInput = document.createElement('button');
        btnApagaInput.id = 'btnApagaInput';
        btnApagaInput.textContent = 'X';

    btnApagaInput.addEventListener('click', function () {

    let notas = JSON.parse(localStorage.getItem('notasCompletas')) || [];
    notas = notas.filter(nota => nota.titulo !== titulo);
    localStorage.setItem('notasCompletas', JSON.stringify(notas));

    let titulos = JSON.parse(localStorage.getItem('tituloMenu')) || [];
    titulos = titulos.filter(t => t !== titulo);
    localStorage.setItem('tituloMenu', JSON.stringify(titulos));

    carregarNotas();
});


        criaInput.addEventListener('click', () => {
            mostrarNota(titulo);
        });

        notasSalvas.appendChild(criaInput);
        criaInput.appendChild(btnApagaInput)
    });
}

// Carrega todas as notas e renderiza a lateral
function carregarNotas() {
    notasCaixa.innerHTML = '';
    const notas = JSON.parse(localStorage.getItem('notasCompletas')) || [];
    notas.forEach(nota => adicionarNotaNaTela(nota));
    renderizarTitulosMenu();
}

// Salva nota ao pressionar Enter no campo da nota
inputNota.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        salvaNotaInteira();
    }
});

// Apaga com Ctrl + L
document.body.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key.toLowerCase() === 'l') {
        event.preventDefault();
        apagaNotas();
    }
});

// Remove todas as notas e recarrega a página
function apagaNotas() {
    localStorage.removeItem('notasCompletas');
    localStorage.removeItem('tituloMenu');
    window.location.reload();
}

// Inicia o site carregando as notas
window.onload = carregarNotas;
