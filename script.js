const audioPlayer = document.getElementById('audioPlayer');
const coverImage = document.getElementById('coverImage');
const songList = document.getElementById('songList');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const lyricsElement = document.getElementById('lyrics');

songList.addEventListener('click', async (e) => {
  if (e.target.tagName === 'LI') {
    const songSrc = e.target.getAttribute('data-src');
    const coverSrc = e.target.getAttribute('data-cover');
    const lyricsPath = e.target.getAttribute('data-lyrics');

    // Установка аудио и обложки
    audioPlayer.src = songSrc;
    audioPlayer.play();
    coverImage.src = coverSrc;

    // Установка названия и исполнителя
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
  }
});
