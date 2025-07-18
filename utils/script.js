// Manejar el botón de entrada
document.getElementById('enterButton').addEventListener('click', function () {
    const button = this;
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingGif = document.querySelector('.loading-gif');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContainer = document.querySelector('.main-container');
    const bgMusic = document.getElementById('backgroundMusic');

    // Configurar música de fondo
    bgMusic.volume = 0.15; // 15% de volumen

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
                bgMusic.muted = true;
                bgMusic.play().then(() => {
                    bgMusic.muted = false;
                });
            });
        }

        // Simular carga (2 segundos)
        setTimeout(() => {
            loadingGif.classList.remove('active');
            loadingGif.classList.add('finish');

            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainContainer.style.display = 'flex';

                const video = document.getElementById('introVideo');
                if (video) {
                    video.muted = false;
                    const videoPlayPromise = video.play();

                    if (videoPlayPromise !== undefined) {
                        videoPlayPromise.then(() => {
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

// Funcionalidad de voltear la tarjeta (excepto al dar clic en botones de cambiar video)
document.getElementById('interactiveCard').addEventListener('click', function (e) {
    const cardFront = document.querySelector('.card-front');
    
    // Si el clic está dentro de la tarjeta pero no en un botón de cambiar video
    if (this.contains(e.target) && !e.target.closest('.btn-cambiar-video')) {
        this.classList.toggle('flipped');
    }
});




// Manejar redimensionamiento de ventana
window.addEventListener('resize', function () {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.body.style.overflow = '';
    }, 300);
});

// Precargar el video cuando cargue la página
window.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('introVideo');
    if (video) {
        video.load();
    }
});

// ================================
// Función para cambiar el video
// ================================
function cambiarVideo(ruta) {
  const video = document.getElementById('introVideo');
  if (video) {
    const source = video.querySelector('source');
    if (source) {
      source.setAttribute('src', ruta); // Cambia el src de la etiqueta <source>
      video.load();                     // Recarga el video
      video.play().catch(error => {    // Intenta reproducirlo
        console.log("No se pudo reproducir el nuevo video:", error);
      });
    }
  }
}

