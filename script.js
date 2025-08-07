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

let animationFrameId = null;

// Обработка клика по песне
songList.addEventListener('click', async (e) => {
  if (e.target.tagName === 'LI') {
    const songSrc = e.target.getAttribute('data-src');
    const coverSrc = e.target.getAttribute('data-cover');
    const lyricsPath = e.target.getAttribute('data-lyrics');

    audioPlayer.src = songSrc;
    coverImage.src = coverSrc;

    const fullText = e.target.innerText;
    const [titlePart, artistPart] = fullText.split(' - ');
    songTitle.textContent = titlePart || 'Без названия';
    songArtist.textContent = artistPart || '';

    try {
      const response = await fetch(lyricsPath);
      const lyrics = await response.text();
      lyricsElement.textContent = lyrics;
    } catch (error) {
      lyricsElement.textContent = 'Текст песни не найден.';
    }

    audioPlayer.play();
    playPauseBtn.textContent = '⏸';

    startSmoothProgressUpdate();
  }
});

// Воспроизведение / Пауза
playPauseBtn.addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = '⏸';
    startSmoothProgressUpdate();
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = '⏵';
    cancelAnimationFrame(animationFrameId);
  }
});

// При загрузке метаданных (длительность)
audioPlayer.addEventListener('loadedmetadata', () => {
  progressBar.max = Math.floor(audioPlayer.duration);
  durationEl.textContent = formatTime(audioPlayer.duration);
});

// Промотка по прогресс-бару
progressBar.addEventListener('input', () => {
  audioPlayer.currentTime = progressBar.value;
  updateCurrentTimeDisplay(progressBar.value);
});

// Функция плавного обновления прогресс-бара
function startSmoothProgressUpdate() {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);

  function update() {
    const currentTime = audioPlayer.currentTime;
    progressBar.value = currentTime;
    updateCurrentTimeDisplay(currentTime);

    if (!audioPlayer.paused && !audioPlayer.ended) {
      animationFrameId = requestAnimationFrame(update);
    }
  }

  update();
}

// Обновление текущего времени на дисплее
function updateCurrentTimeDisplay(time) {
  currentTimeEl.textContent = formatTime(time);
}

// Формат времени (минуты:секунды)
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}
