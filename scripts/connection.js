let videosList = [];

// Conectar al WebSocket
const socket = new WebSocket('ws://172.24.104.98:8080');

socket.onopen = function () {
    console.log('Conectado al servidor WebSocket');
    socket.send('fetch_videos'); // Solicitar lista de videos al servidor
};

socket.onmessage = function (event) {
    // Parsear los datos recibidos y filtrar solo los archivos MP4
    videosList = JSON.parse(event.data).filter(video => video.endsWith('.mp4'));
    displayVideos(videosList);
};

socket.onerror = function (error) {
    console.error('Error de WebSocket:', error);
};

// Mostrar lista de videos filtrados
function displayVideos(videos) {
    const videoGrid = document.getElementById('videoGrid');
    videoGrid.innerHTML = '';
    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'videoCard';
        
        const videoName = document.createElement('h3');
        videoName.textContent = video.split('/').pop();

        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'videoControls';

        const playButton = document.createElement('button');
        playButton.textContent = 'Reproducir';
        playButton.className = 'playButton';
        playButton.onclick = () => playVideo(video);

        controlsDiv.appendChild(playButton);
        videoCard.appendChild(videoName);
        videoCard.appendChild(controlsDiv);
        videoGrid.appendChild(videoCard);
    });
}

function playVideo(movieName) {
    // Reemplaza con la URL correcta de tu API que retorna los enlaces de los videos
    const apiUrl = 'https://tu-api.com/videos'; // Ejemplo de URL

    // Obtener los links de los videos del bucket
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Respuesta de red no ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Buscar el enlace que contenga el nombre de la película
            const video = data.find(video => video.name.toLowerCase().includes(movieName.toLowerCase()));
            if (video) {
                // Reproducir el video, por ejemplo, abriéndolo en una nueva pestaña
                window.open(video.url, '_blank');
            } else {
                alert('Video no encontrado para ' + movieName);
            }
        })
        .catch(error => console.error('Error al obtener los videos:', error));
}

// Agregar event listeners a todas las imágenes de películas
document.addEventListener('DOMContentLoaded', () => {
    const movieImages = document.querySelectorAll('.movie-image');
    movieImages.forEach(img => {
        img.addEventListener('click', () => {
            const movieName = img.getAttribute('data-movie');
            playVideo(movieName);
        });
    });
});

function filterVideos() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredVideos = videosList.filter(video => video.toLowerCase().includes(searchTerm));
    displayVideos(filteredVideos);
}

document.querySelector('.closeModal').onclick = function () {
    const modal = document.getElementById('playerModal');
    const videoPlayer = document.getElementById('videoPlayer');
    modal.style.display = 'none';
    videoPlayer.pause();
}

window.onclick = function (event) {
    const modal = document.getElementById('playerModal');
    if (event.target == modal) {
        modal.style.display = 'none';
        document.getElementById('videoPlayer').pause();
    }
}

// Cargar videos inicialmente
function fetchVideos() {
    socket.send('fetch_videos'); // Solicitar videos al servidor
}

// Actualizar la lista cada 30 segundos
setInterval(fetchVideos, 30000);