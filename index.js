const inputTitulo = document.getElementById('tituloNota');
const inputNota = document.getElementById('inputDeNotas');
const notasSalvas = document.querySelector('.notasSalvas');
const notasCaixa = document.querySelector('.notasCaixa');

function salvarTitulo() {
        notasSalvas.innerHTML = '<p><b>Suas Notas serao salvas no campo abaixo</b></p>';

    const pegaTituloLocal = JSON.parse(localStorage.getItem('titulolocal')) || [];
    
    pegaTituloLocal.push(inputTitulo.value);

    const SalvaTituloLocal = localStorage.setItem('titulolocal', JSON.stringify(pegaTituloLocal))

    inputTitulo.value = ''
}

function salvaNotaInteira() {
    const pegaNotas = JSON.parse(localStorage.getItem('notasLocalInteira')) || [];

    pegaNotas.push(inputNota.value);

    const pegaTitulo = JSON.parse(localStorage.getItem('tituloLocalInteiro')) || [];

    pegaNotas.push(inputTitulo.value);

    const salvaTitulo = localStorage.setItem('tituloLocalInteiro', JSON.stringify(pegaTitulo))

    const salvarNotasInteira = localStorage.setItem('notasLocalInteira', JSON.stringify(pegaNotas));

    notasCaixa.innerHTML = `
    <p id='titulo'>${inputTitulo.value}<p>
    <textarea id='nota value='${inputNota.value}'></textarea>
    `

    inputNota.value = '';
    inputTitulo.value = '';
}

function carregarNotas() {
    const pegaTituloLocal = JSON.parse(localStorage.getItem('titulolocal')) || [];

    const lista = document.querySelector('.notasSalvas');

    pegaTituloLocal.forEach(titulo => {
        const input = document.createElement('input');
        input.disabled = true
        input.value = titulo;
        lista.appendChild(input);
    });
}

inputTitulo.addEventListener('keydown', function(event){
    if (event.key == 'Enter') {
salvarTitulo();
carregarNotas()
}})

function salvarNota() {
    const pegaNotaLocal = JSON.parse(localStorage.getItem('notalocal')) || [];
    
    pegaNotaLocal.push(inputNota.value);

    const SalvaNotaLocal = localStorage.setItem('notalocal', JSON.stringify(pegaNotaLocal))

    inputNota.value = ''
}

inputNota.addEventListener('keydown', function(event){
    if (event.key == 'Enter') {
        salvaNotaInteira()
    }
});

function apagaNotas() {
    localStorage.removeItem('titulolocal');
    window.location.reload()
}

document.body.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key.toLowerCase() === 'l') {
        event.preventDefault();
        apagaNotas();
    }
});


window.onload = carregarNotas()



