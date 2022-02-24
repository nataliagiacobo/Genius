// Criar array para o padrão de cores do jogo
var gamePattern = [];

// Criar array para o padrão de cores escolhidas pelo jogador
var userClickedPattern = [];

// Criar array com os botões
var buttonColours = ["red", "blue", "green", "yellow"];

// VAriavel level
var level = 0;

// Gerar número aleatório de 0 a 3 e definir cor da sequência
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
  playSound(randomChosenColour);
  buttonAnimation(randomChosenColour);
}
// Animação do botão
function buttonAnimation(button) {
  $("#" + button)
    .fadeTo("fast", 0.4)
    .fadeTo("fast", 1);
}

function animatePress(button) {
  $("#" + button).addClass("pressed");
  setTimeout(function () {
    $("#" + button).removeClass("pressed");
  }, 100);
}

//Tocar som
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Iniciar jogo
var started = false;

$(document).keypress(function () {
  if (!started) {
    setTimeout(nextSequence, 200);
    started = true;
  }
});

$(".btn").click(function () {
  if (started) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
  }
});

function checkAnswer() {
  for (i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] != gamePattern[i]) {
      gameOver();
    } else if (i === gamePattern.length - 1) {
      setTimeout(nextSequence, 1000);
    }
  }
}

function gameOver() {
  playSound("wrong");
  $("h1").text("GAME OVER");
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  setTimeout(function () {
    $("h1").text("Pressione uma tecla para começar");
  }, 1000);
  started = false;
}
