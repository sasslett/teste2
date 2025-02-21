// Função que torna visível o marcador da letra selecionada
function mostrarLetra(letra) {
    // Esconder todos os marcadores
    document.getElementById("marcadorA").setAttribute('visible', 'false');
    document.getElementById("marcadorB").setAttribute('visible', 'false');
    document.getElementById("marcadorC").setAttribute('visible', 'false');

    // Mostrar o marcador correspondente
    if (letra === 'A') {
        document.getElementById("marcadorA").setAttribute('visible', 'true');
    } else if (letra === 'B') {
        document.getElementById("marcadorB").setAttribute('visible', 'true');
    } else if (letra === 'C') {
        document.getElementById("marcadorC").setAttribute('visible', 'true');
    }
}
