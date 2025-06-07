// Manejar el botón de entrada
document.getElementById('enterButton').addEventListener('click', function() {
    // Mostrar pantalla de carga
    document.getElementById('loadingScreen').style.display = 'flex';
    document.getElementById('welcomeScreen').style.display = 'none';
    
    // Simular tiempo de carga (puedes ajustar esto o eliminarlo)
    setTimeout(function() {
        // Ocultar pantalla de carga y mostrar contenido principal
        document.getElementById('loadingScreen').style.display = 'none';
        document.querySelector('.main-container').style.display = 'flex';
        
        // Reproducir el video automáticamente
        const video = document.getElementById('introVideo');
        if (video) {
            // Quitamos el muted para que pueda reproducir con sonido si el usuario lo permite
            video.muted = false;
            
            // Intentar reproducir el video
            const playPromise = video.play();
            
            // Manejar posibles errores de reproducción
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Reproducción automática iniciada
                    console.log('Video reproduciéndose automáticamente');
                }).catch(error => {
                    // Mostrar mensaje si el usuario no ha interactuado aún
                    console.log('Reproducción automática fallida:', error);
                    // Volver a intentar con muted si falla
                    video.muted = true;
                    video.play();
                });
            }
        }
    }, 2000); // 2 segundos de carga simulada
});

// Funcionalidad de voltear la tarjeta
document.getElementById('interactiveCard').addEventListener('click', function(e) {
    if (!e.target.closest('.no-flip')) {
        this.classList.toggle('flipped');
    }
});

// Manejar redimensionamiento de ventana
window.addEventListener('resize', function() {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.body.style.overflow = '';
    }, 300);
});

// Reproducir el video cuando la página esté completamente cargada
window.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('introVideo');
    if (video) {
        // Precargar el video
        video.load();
    }
});
