const inputTitulo = document.getElementById('tituloNota');
const inputNota = document.getElementById('inputDeNotas');
const notasSalvas = document.querySelector('.notasSalvas');
const notasCaixa = document.querySelector('.notasCaixa');

// Gera um ID seguro a partir do título
function gerarIdSeguro(titulo) {
    return 'nota-' + titulo.toLowerCase()
        .replace(/\s+/g, '-')              // espaços viram hífen
        .replace(/[^\w\-]+/g, '')          // remove símbolos
        .normalize('NFD')                  // remove acentos
        .replace(/[\u0300-\u036f]/g, '');
}

// Salva a nota no localStorage e mostra automaticamente
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

// Cria visualmente um bloco de nota (oculto por padrão)
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

// Exibe apenas a nota correspondente ao título clicado
function mostrarNota(titulo) {
    const blocos = document.querySelectorAll('.blocoNota');
    blocos.forEach(bloco => bloco.style.display = 'none');

    const notaId = gerarIdSeguro(titulo);
    const notaSelecionada = document.getElementById(notaId);

    if (notaSelecionada) {
        notaSelecionada.style.display = 'block';
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

    titulos.forEach(titulo => {
        const criaInput = document.createElement('h3');
        criaInput.disabled = true;
        criaInput.textContent = titulo;
        criaInput.classList.add('input-titulo');

        criaInput.addEventListener('click', () => {
            mostrarNota(titulo);
        });

        notasSalvas.appendChild(criaInput);
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

// Apaga tudo com Ctrl + L
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

// Inicia a aplicação carregando as notas
window.onload = carregarNotas;
