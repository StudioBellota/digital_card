document.getElementById('interactiveCard').addEventListener('click', function(e) {
    if (!e.target.closest('.no-flip')) {
        this.classList.toggle('flipped');
    }
});

// Opcional: Suavizar redimensionamiento en tiempo real
window.addEventListener('resize', function() {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.body.style.overflow = '';
    }, 300);
});