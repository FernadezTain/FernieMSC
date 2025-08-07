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

  // Скрываем детали трека с анимацией
  fadeOutElement(coverImage);
  fadeOutElement(lyricsElement);
  fadeOutElement(audioControls);

  // Добавляем класс для смещения панели вниз
  player.classList.add('minimized');

  // Если есть src в аудиоплеере — показываем мини-обложку с анимацией
  if (audioPlayer.src) {
    floatingImage.src = coverImage.src || 'covers/default.jpg';
    showFloatingCover();
  }
  audioPlayer.pause();
  playPauseBtn.textContent = '⏵';
  cancelAnimationFrame(animationFrameId);
});

// Обработка клика по песне
songList.addEventListener('click', async (e) => {
  if (e.target.tagName === 'LI') {
    // Убираем минимизированный класс и скрываем мини-обложку
    player.classList.remove('minimized');
    hideFloatingCover();

    // Подгружаем данные песни
    const src = e.target.dataset.src;
    const cover = e.target.dataset.cover;
    const lyricsPath = e.target.dataset.lyrics;
    const [artist, title] = e.target.textContent.split(' - ');

    // Обновляем интерфейс
    songTitle.textContent = title ? title.trim() : e.target.textContent.trim();
    songArtist.textContent = artist ? artist.trim() : '';
    showElement(coverImage);
    fadeInElement(coverImage);
    coverImage.src = cover;

    // Загружаем текст песни
    const lyrics = await fetchText(lyricsPath);
    lyricsElement.textContent = lyrics || 'Текст песни не найден.';
    showElement(lyricsElement);
    fadeInElement(lyricsElement);

    audioPlayer.src = src;
    audioPlayer.load();

    showElement(audioControls);
    fadeInElement(audioControls);

    audioPlayer.play();
    playPauseBtn.textContent = '⏸';

    updateDurationOnLoad();
  }
});

// Кнопка play/pause
playPauseBtn.addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = '⏸';
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = '⏵';
  }
});

// Обновление прогресса аудио
audioPlayer.addEventListener('timeupdate', () => {
  updateProgress();
});

// Прогрессбар - изменение позиции воспроизведения
progressBar.addEventListener('input', () => {
  audioPlayer.currentTime = progressBar.value;
  updateProgress();
});

// Обновление длительности и прогресса при загрузке аудио
function updateDurationOnLoad() {
  audioPlayer.addEventListener('loadedmetadata', () => {
    progressBar.max = Math.floor(audioPlayer.duration);
    durationEl.textContent = formatTime(audioPlayer.duration);
  }, { once: true });
}

// Обновление прогресса и таймеров
function updateProgress() {
  progressBar.value = Math.floor(audioPlayer.currentTime);
  currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
}

// Формат времени (минуты:секунды)
function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Получение текста по URL
async function fetchText(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Ошибка загрузки текста');
    return await response.text();
  } catch (e) {
    return null;
  }
}

// Плавное появление элемента
function fadeInElement(el) {
  el.classList.remove('fade-out');
  el.classList.add('fade-in');
  el.classList.remove('hidden');
}

// Плавное исчезновение элемента
function fadeOutElement(el) {
  el.classList.remove('fade-in');
  el.classList.add('fade-out');
  setTimeout(() => {
    el.classList.add('hidden');
  }, 400);
}

// Показать элемент (без анимации)
function showElement(el) {
  el.classList.remove('hidden');
}

// Скрыть элемент (без анимации)
function hideElement(el) {
  el.classList.add('hidden');
}

// Показать плавающую мини-обложку
function showFloatingCover() {
  floatingCover.classList.add('visible');
  floatingCover.classList.remove('hidden');
}

// Скрыть плавающую мини-обложку
function hideFloatingCover() {
  floatingCover.classList.remove('visible');
  setTimeout(() => {
    floatingCover.classList.add('hidden');
  }, 500);
}

// Клик по плавающей капле - открываем панель плеера (если минимизирована)
floatingCover.addEventListener('click', () => {
  player.classList.remove('minimized');
  hideFloatingCover();
});

