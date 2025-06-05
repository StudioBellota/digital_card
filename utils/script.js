document.getElementById('interactiveCard').addEventListener('click', function(e) {
    if (!e.target.closest('.no-flip')) {
        this.classList.toggle('flipped');
    }
});

window.addEventListener('resize', function() {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.body.style.overflow = '';
    }, 300);
});

window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bgMusic');
    audio.volume = 0.15;
});
