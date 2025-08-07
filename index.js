const inputTitulo = document.getElementById('tituloNota');
const inputNota = document.getElementById('inputDeNotas');

function salvarTitulo() {
    const pegaTituloLocal = JSON.parse(localStorage.getItem('titulolocal')) || [];
    
    pegaTituloLocal.push(inputTitulo.value);

    const SalvaTituloLocal = localStorage.setItem('titulolocal', JSON.stringify(pegaTituloLocal))

    inputTitulo.value = ''
}

function salvaNotaInteira() {
    const pegaNotasInteira = JSON.parse(localStorage.getItem('notasLocalInteira')) || [];

    pegaNotasInteira.push(inputTitulo.value);
    pegaNotasInteira.push(inputNota.value);

    const salvarNotasInteira = localStorage.setItem('notasLocalInteira', JSON.stringify(pegaNotasInteira));

    inputNota.value = ''
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

window.onload = carregarNotas()

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


