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

window.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('introVideo');
    if (video) {
        video.play().catch(() => {}); 
        video.addEventListener('ended', () => {
            video.pause();
        });
    }
});
