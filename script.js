const songs = [
  {
    name: "song1.mp3",
    title: "🔥 Трек 1",
    cover: "covers/song1.jpg"
  },
  {
    name: "song2.mp3",
    title: "🎶 Трек 2",
    cover: "covers/song2.jpg"
  }
];

let currentIndex = 0;
const audio = document.getElementById('audio');
const coverImg = document.getElementById('cover-img');
const trackName = document.getElementById('track-name');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');

function loadSong(index) {
  const song = songs[index];
  audio.src = `songs/${song.name}`;
  coverImg.src = song.cover;
  trackName.textContent = `Сейчас играет: ${song.title}`;
}

function playSong() {
  audio.play();
  document.querySelector('.controls button:nth-child(2)').textContent = '⏸';
}

function pauseSong() {
  audio.pause();
  document.querySelector('.controls button:nth-child(2)').textContent = '▶️';
}

function togglePlay() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  playSong();
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  playSong();
}

function updateProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent || 0;
}

function seek() {
  audio.currentTime = (progress.value / 100) * audio.duration;
}

function setVolume() {
  audio.volume = volume.value;
}

// Автоматически заполняем плейлист
const playlist = document.getElementById('playlist');
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = song.title;
  li.onclick = () => {
    currentIndex = index;
    loadSong(index);
    playSong();
  };
  playlist.appendChild(li);
});

// Загружаем первую песню
loadSong(currentIndex);
