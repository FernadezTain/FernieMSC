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

const audioControls = document.getElementById('audioControls');
const player = document.getElementById('player');

const logo = document.getElementById('logo');
const floatingCover = document.getElementById('floatingCover');
const floatingImage = document.getElementById('floatingImage');

let animationFrameId = null;

// Обработка клика по заголовку "Fernie"
logo.addEventListener('click', () => {
  // Показываем стартовую страницу
  songTitle.textContent = 'FernieX — Музыка';
  songArtist.textContent = 'Выберите желаемый музыкальный трек в панели слева.';
  lyricsElement.textContent = 'Текст песни появится здесь...';

  // Скрываем детали трека
  coverImage.classList.add('hidden');
  lyricsElement.classList.add('hidden');
  audioControls.classList.add('hidden');

  // Добавляем класс для смещения панели вниз
  player.classList.add('minimized');

  // Если есть src в аудиоплеере — показываем мини-обложку с анимацией
  if (audioPlayer.src) {
    floatingImage.src = coverImage.src || 'covers/default.jpg';
    floatingCover.classList.remove('hidden');
  }
});

// Обработка клика по песне
songList.addEventListener('click', async (e) => {
  if (e.target.tagName === 'LI') {
    // Убираем минимизацию и плавающую обложку при выборе новой песни
    player.classList.remove('minimized');
    floatingCover.classList.add('hidden');

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

    // Показываем элементы
    coverImage.classList.remove('hidden');
    lyricsElement.classList.remove('hidden');
    audioControls.classList.remove('hidden');

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
  updateProgressBarBackground(); // Обновляем фон при загрузке
});

// Промотка по прогресс-бару
progressBar.addEventListener('input', () => {
  audioPlayer.currentTime = progressBar.value;
  updateCurrentTimeDisplay(progressBar.value);
  updateProgressBarBackground();
});

floatingCover.addEventListener('click', () => {
  // Скрываем каплю
  floatingCover.classList.add('hidden');

  // Раскрываем плеер (убираем минимизацию и добавляем expanded для анимации)
  player.classList.remove('minimized');
  player.classList.add('expanded');

  // Показываем элементы с плавным появлением
  coverImage.classList.remove('hidden');

  // Добавляем класс видимости с задержкой для плавного появления
  setTimeout(() => {
    songTitle.classList.add('visible');
    songArtist.classList.add('visible');
    lyricsElement.classList.add('visible');
    audioControls.classList.remove('hidden');
  }, 100);

  // Если нужно, продолжаем обновлять прогресс
  if (!audioPlayer.paused) {
    startSmoothProgressUpdate();
  }
});


// Функция плавного обновления прогресс-бара
function startSmoothProgressUpdate() {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);

  function update() {
    const currentTime = audioPlayer.currentTime;
    progressBar.value = currentTime;
    updateCurrentTimeDisplay(currentTime);
    updateProgressBarBackground();

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

// Обновление фона прогресс-бара с заливкой
function updateProgressBarBackground() {
  const value = progressBar.value;
  const max = progressBar.max || 100;
  const percent = (value / max) * 100;

  progressBar.style.background = `linear-gradient(to right, cyan 0%, cyan ${percent}%, #ccc ${percent}%, #ccc 100%)`;
}

