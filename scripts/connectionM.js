let musicList = [];

// Conectar al WebSocket
const socket = new WebSocket('ws://localhost:3000');

socket.onopen = function () {
    console.log('Conectado al servidor WebSocket');
    socket.send('fetch_musica'); // Solicitar lista de archivos al servidor
};

socket.onmessage = function (event) {
    // Parsear los datos recibidos y filtrar solo los archivos MP3
    musicList = JSON.parse(event.data).filter(track => track.endsWith('.mp3'));
    displayTracks(musicList);
};

socket.onerror = function (error) {
    console.error('Error de WebSocket:', error);
};

// Mostrar lista de archivos de música filtrados
function displayTracks(tracks) {
    const musicGrid = document.getElementById('musicGrid');
    musicGrid.innerHTML = '';
    tracks.forEach((track) => {
        const trackCard = document.createElement('div');
        trackCard.className = 'trackCard';

        const trackName = document.createElement('h3');
        trackName.textContent = track.split('/').pop();

        const playButton = document.createElement('button');
        playButton.textContent = 'Reproducir';
        playButton.className = 'playButton';
        playButton.onclick = () => playTrack(track);

        trackCard.appendChild(trackName);
        trackCard.appendChild(playButton);
        musicGrid.appendChild(trackCard);
    });
}

// Reproducir pista seleccionada
function playTrack(trackUrl) {
    const playerContainer = document.getElementById('playerContainer');
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = trackUrl;
    playerContainer.style.display = 'flex';
    audioPlayer.play();
}

// Filtrar pistas en función del texto ingresado en el campo de búsqueda
function filterTracks() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredTracks = musicList.filter((track) =>
        track.toLowerCase().includes(searchTerm)
    );
    displayTracks(filteredTracks);
}

// Cerrar el reproductor de audio
document.getElementById('closePlayer').onclick = function () {
    const playerContainer = document.getElementById('playerContainer');
    const audioPlayer = document.getElementById('audioPlayer');
    playerContainer.style.display = 'none';
    audioPlayer.pause();
};
