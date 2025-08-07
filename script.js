body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #e0e0e0, #f0f0f0);
  font-family: 'Segoe UI', sans-serif;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  padding: 40px;
  max-width: 500px;
  width: 90%;
}

.song {
  margin: 15px 0;
  padding: 15px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: inset 5px 5px 15px #cfcfcf, inset -5px -5px 15px #ffffff;
  transition: all 0.3s ease;
  cursor: pointer;
}

.song:hover {
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 20px #00f0ff80;
}

audio {
  width: 100%;
  margin-top: 10px;
}
