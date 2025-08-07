const audioPlayer = document.getElementById('audioPlayer');
const coverImage = document.getElementById('coverImage');
const songList = document.getElementById('songList');

songList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const songSrc = e.target.getAttribute('data-src');
    const coverSrc = e.target.getAttribute('data-cover');

    audioPlayer.src = songSrc;
    audioPlayer.play();

    coverImage.src = coverSrc;
  }
});
