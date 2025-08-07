const audioPlayer = document.getElementById('audioPlayer');
const coverImage = document.getElementById('coverImage');
const songList = document.getElementById('songList');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const lyricsElement = document.getElementById('lyrics');

const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

// Обработка клика по песне
songList.addEventListener('click', async (e) => {
  if (e.target.tagName === 'LI') {
    const songSrc = e.target.getAttribute('data-src');
    const coverSrc = e.target.getAttribute('data-cover');
    const lyricsPath = e.target.getAttribute('data-lyrics');

    // Установка источника и обложки
    audioPlayer.src = songSrc;
    coverImage.src = coverSrc;

    // Название и исполнитель
    const fullText = e.target.innerText;
    const [titlePart, artistPart] = fullText.split(' - ');
    songTitle.textContent = titlePart || 'Без названия';
    songArtist.textContent = artistPart || '';

    // Загрузка текста песни
    try {
      const response = await fetch(lyricsPath);
      const lyrics = await response.text();
      lyricsElement.textContent = lyrics;
    } catch (error) {
      lyricsElement.textContent = 'Текст песни не найден.';
    }

    // Воспроизведение
    audioPlayer.play();
    playPauseBtn.textContent = '⏸'; // смена иконки
  }
});

// Воспроизведение / Пауза
playPauseBtn.addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = '⏸';
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = '⏵';
  }
});

// При загрузке метаданных (длительность)
audioPlayer.addEventListener('loadedmetadata', () => {
  progressBar.max = Math.floor(audioPlayer.duration);
  durationEl.textContent = formatTime(audioPlayer.duration);
});

// Обновление прогресса
audioPlayer.addEventListener('timeupdate', () => {
  progressBar.value = Math.floor(audioPlayer.currentTime);
  currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
});

// Промотка по прогресс-бару
progressBar.addEventListener('input', () => {
  audioPlayer.currentTime = progressBar.value;
});

// Формат времени (в минутах:секундах)
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}
