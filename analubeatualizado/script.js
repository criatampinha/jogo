// Função para iniciar o jogo
function startGame() {
  //substitui o botão Iniciar jogo por uma contagem regressiva e dps cria um botao para chamar a promisse player
  const gameContainer = document.getElementById("game-container");
  const startButton = document.getElementById("start-game");
  const playerButton = document.getElementById("play-music");
  const lblResposta = document.getElementById("lbl-resposta");
  const resposta = document.getElementById("resposta");
  const btnResposta = document.getElementById("btn-resposta");
  startButton.remove();
  const countdown = document.createElement("h1");
  countdown.innerText = "3";
  gameContainer.appendChild(countdown);
  setTimeout(() => {
    countdown.innerText = "2";
    setTimeout(() => {
      countdown.innerText = "1";
      setTimeout(() => {
        countdown.remove();
        playerButton.classList.remove("hidden");
        resposta.classList.remove("hidden");
        lblResposta.classList.remove("hidden");
        btnResposta.classList.remove("hidden");     

      }, 1000);
    }, 1000);
  }, 1000);
}
let player;
let trackName;

window.onSpotifyWebPlaybackSDKReady = () => {
  //Trocar o token abaixo a cada hora, precisa estar logado, através do link https://developer.spotify.com/documentation/web-playback-sdk/tutorials/getting-started 
  const token ="BQCn96dxJ_XEGhQ6iI7vch5v0UZ8cMm24Xo1d7aRdEKqZDw4zGEgGPnsqDYy5HTmQnkYLiNvQ3JBS9KioOTMlQXg8_PGHni5At2ED_mUKR6nzPIgcQhl_cwmzOfkKkP6tDZXHRfRIasiKOuZKVoYzchZFOOXBA3J2XVWM2mTiPT5AovoTQ1fzZWmviZ9JhU5VuoDQgmA4nZlYmWmnK67hfMC4p0z"
    player = new Spotify.Player({
    name: "Web Playback SDK Quick Start Player",
    getOAuthToken: (cb) => {
      cb(token);
    },
    volume: 0.5,
  })
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    const connect_to_device = () => {
      let album_uri = "spotify:playlist:0NOlXdHbB3RRF5QtPMKq3B"
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        method: "PUT",
        body: JSON.stringify({
          context_uri: album_uri,
          play: false,
        }),
        headers: new Headers({
            "Authorization": "Bearer " + token,
        }),
    }).then(response => console.log(response))
    .then(data => {
      // Adicionar listener para o evento de mudança de estado de reprodução
      player.addListener('player_state_changed', ({
        track_window
      }) => {
        trackName = track_window.current_track.name;
        trackName = trackName.toLowerCase();
        console.log('Current Track:', trackName);
      });})}
    connect_to_device();
  });

//botão play music para tocar a musica por 13 segundos
document.getElementById("play-music").addEventListener('click',() => {
    player.togglePlay();
    setTimeout(() => {
      player.pause();
    }, 13000);
  });
  
//botão resposta para verificar se a resposta está correta apagar a resposta e mudar a musica do play-music para a proxima
 document.getElementById("btn-resposta").addEventListener('click',(event) => {
  event.preventDefault();
  let resposta = document.getElementById("resposta").value;
  resposta = resposta.toLowerCase();
  if (resposta == trackName) {
    alert("Você Acertou, Parabéns!");
        player.nextTrack();
        setTimeout(() => {
        player.pause();
        }, 1300);
      } else {
        alert("Você errou, tente novamente!");
      }
    });
  player.connect();  
};

let score = 0; // Inicializa a pontuação

// Função para atualizar a pontuação
function updateScore() {
    document.getElementById("score").textContent = score;
}

// Função para lidar com o clique no botão de jogar
function playGame() {
    // Simule o aumento da pontuação (você pode personalizar isso para o seu jogo)
    const randomPoints = Math.floor(Math.random() * 10) + 1;
    score += randomPoints;

    // Atualize a pontuação na tela
    updateScore();
}

// Inicialize a pontuação na tela
updateScore();
