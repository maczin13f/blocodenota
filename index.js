const inputTitulo = document.getElementById('tituloNota');
const inputNota = document.getElementById('inputDeNotas');

function salvarTitulo() {
    const pegaTituloLocal = JSON.parse(localStorage.getItem('titulolocal')) || [];
    
    pegaTituloLocal.push(inputTitulo.value);

    const SalvaTituloLocal = localStorage.setItem('titulolocal', JSON.stringify(pegaTituloLocal))

    inputTitulo.value = ''
}

inputTitulo.addEventListener('keydown', function(event){
    if (event.key == 'Enter') {
salvarTitulo();
}})

function salvarNota() {
    const pegaNotaLocal = JSON.parse(localStorage.getItem('notalocal')) || [];
    
    pegaNotaLocal.push(inputNota.value);

    const SalvaNotaLocal = localStorage.setItem('notalocal', JSON.stringify(pegaNotaLocal))

    inputNota.value = ''
}

inputNota.addEventListener('keydown', function(event){
    if (event.key == 'Enter') {
        salvarNota()
    }
})

function carregarNotas() {
    const pegaTituloLocal = JSON.parse(localStorage.getItem('titulolocal')) || [];

    onst lista = document.getElementById('listaDeNotas');
    lista.innerHTML = ''; // Limpa a lista antes de adicionar os itens

    pegaTituloLocal.forEach(titulo => {
        const li = document.createElement('li');
        li.textContent = titulo;
        lista.appendChild(li);
    });
}