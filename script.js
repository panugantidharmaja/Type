var res = [];
var paragraphs = [
  "Lorem ipsum dolor sit amet, ",
  " Sed in elit purus. Proin convallis augue ac.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel ultricies lectus.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non bibendum mauris. Suspendisse vestibulum sapien metus."
];
var i = 0;
var screen = document.getElementsByClassName("game-screen")[0];
var score = document.getElementsByClassName("score")[0];
var min = document.getElementsByClassName("min")[0];
var sec = document.getElementsByClassName("sec")[0];
var totalSeconds = 0;
var best = [];
var average = [];
var finalBest = [];
var finalAverage = [];
var gameplay = false;
var time = setInterval(settime, 1000);
var words, timer, totalWords;
var typeBox = document.getElementById("type-box");
var f = new Object();
var a = new Object();

function displayMessage(i) {
  document.getElementById("type-box").disabled = false;
  gameplay = true;
  screen.innerHTML = paragraphs[i];
  totalWords = paragraphs[i].match(/\S+/g);
  score.innerHTML = 0 + "/" + totalWords.length + " words";
  playGame();
  speed();
}

function playGame() {
  typeBox.addEventListener("keypress", function() {
    words = this.value.match(/\S+/g);
    score.innerHTML =
      words.length + "/" + paragraphs[i].match(/\S+/g).length + " words";
    if (words.length >= totalWords.length) {
      document.getElementById("type-box").disabled = true;
      clearInterval(timer);
      result();
    }
  });
}

function next() {
  typeBox.value = "";
  clearInterval(time);
  totalSeconds = 0;
  time = setInterval(settime, 1000);
  document.getElementsByClassName("sec")[0].innerHTML = "00";
  i++;
  if (i >= paragraphs.length) {
    document.getElementsByClassName("next-button")[0].style.display = "none";
    displayFinalBest();
    displayFinalAverage();
  }
  displayMessage(i);
}

function settime() {
  ++totalSeconds;
  sec.innerHTML = pad(totalSeconds % 60);
  min.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var str = val + "";
  if (str.length < 2) return "0" + str;
  return str;
}

function result() {
  document.getElementsByClassName("result")[0].innerHTML =
    document.getElementsByClassName("min")[0].innerHTML +
    "Minutes and " +
    document.getElementsByClassName("sec")[0].innerHTML +
    "Seconds";
  var bestSpeed = bestScore();
  var avg = averageScore();
  document.getElementsByClassName("result")[0].innerHTML =
    "-- Best Speed is - " + bestSpeed + " Average speed is - " + avg;
  f[i] = bestSpeed;
  a[i] = avg;
}

function speed() {
  best.length = 0;
  var i = 1;
  timer = setInterval(function() {
    var len = words.length;
    var speed = Math.round((60 * len) / (5 * i));
    best.push(speed);
    i++;
  }, 1000);
}

function bestScore() {
  best.sort((a, b) => a - b);
  return best[best.length - 1];
}

function averageScore() {
  var len = best.length;
  var average = Math.round(best.reduce((a, b) => a + b) / len);
  return average;
}

function displayFinalBest() {
  var highspeed = 0;
  var avgSpeed = 0;

  for (var key in f) {
    if (f.hasOwnProperty(key)) {
      finalBest.push(f[key]);
    }
  }
  for (var key in a) {
    if (a.hasOwnProperty(key)) {
      finalAverage.push(a[key]);
    }
  }

  highspeed = Math.max(...finalBest);
  avgSpeed = Math.max(...finalAverage);
  speedIndex = finalBest.indexOf(highspeed) + 1;
  avgSpeedInd = finalAverage.indexOf(avgSpeed) + 1;

  document.getElementsByClassName("type-area")[0].innerHTML =
    highspeed +
    " is your Best Speed in " +
    speedIndex +
    ". And " +
    avgSpeed +
    "is your Average speed in " +
    avgSpeedInd;
}
