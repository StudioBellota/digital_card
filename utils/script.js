// Manejar el botón de entrada
document.getElementById('enterButton').addEventListener('click', function() {
    const button = this;
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingGif = document.querySelector('.loading-gif');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContainer = document.querySelector('.main-container');
    const bgMusic = document.getElementById('backgroundMusic');
    
    // Configurar música de fondo
    bgMusic.volume = 0.15; // 20% de volumen
    
    // 1. Animación del botón al hacer clic
    button.classList.add('clicked');
    
    // 2. Después de que el botón desaparezca, mostrar el gif de carga
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        loadingScreen.style.display = 'flex';
        loadingGif.classList.add('active');
        
        // Intentar reproducir la música (solo después de interacción del usuario)
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Reproducción automática de música fallida:', error);
                // En algunos navegadores necesitamos mute primero
                bgMusic.muted = true;
                bgMusic.play().then(() => {
                    bgMusic.muted = false;
                });
            });
        }
        
        // Tiempo de carga simulado (2 segundos)
        setTimeout(() => {
            // 3. Animación para ocultar el gif de carga
            loadingGif.classList.remove('active');
            loadingGif.classList.add('finish');
            
            // 4. Mostrar el contenido principal después de que el gif desaparezca
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainContainer.style.display = 'flex';
                
                // Reproducir el video automáticamente
                const video = document.getElementById('introVideo');
                if (video) {
                    video.muted = false;
                    const videoPlayPromise = video.play();
                    
                    if (videoPlayPromise !== undefined) {
                        videoPlayPromise.then(_ => {
                            console.log('Video reproduciéndose automáticamente');
                        }).catch(error => {
                            console.log('Reproducción automática fallida:', error);
                            video.muted = true;
                            video.play();
                        });
                    }
                }
            }, 800);
        }, 2000);
    }, 800);
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

// Precargar el video cuando la página esté completamente cargada
window.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('introVideo');
    if (video) {
        video.load();
    }
});
