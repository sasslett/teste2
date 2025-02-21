document.addEventListener('DOMContentLoaded', function() {
    const marker = document.querySelector('a-marker');
    marker.addEventListener('markerFound', function() {
        console.log('Marcador encontrado!');
    });
});
