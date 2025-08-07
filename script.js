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

    // 👉 Удаляем скрытие элементов
    coverImage.classList.remove('hidden');
    lyricsElement.classList.remove('hidden');
    document.querySelector('.audio-controls').classList.remove('hidden');

    audioPlayer.play();
    playPauseBtn.textContent = '⏸';

    startSmoothProgressUpdate();
  }
});
