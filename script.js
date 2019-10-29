var res = [];
var paragraphs = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non justo quis elit sodales facilisis. Donec cursus pharetra condimentum. Nullam.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae ullamcorper diam, efficitur pulvinar quam. Nam egestas dolor nisl, vitae egestas erat porttitor non. Cras nec nunc nec sem venenatis auctor. Duis nec sagittis orci. In gravida risus justo. Nulla.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae ullamcorper diam, efficitur pulvinar quam. Nam egestas dolor nisl, vitae egestas erat porttitor non. Cras nec nunc nec sem venenatis auctor. Duis nec sagittis orci. In gravida risus justo. Nulla.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis elit ex, quis tempor nunc vulputate in. Sed nec semper lacus. Suspendisse lorem sapien, pretium elementum volutpat sed, aliquet a nibh. Sed tortor arcu, dictum ut felis dignissim, vulputate rhoncus sapien. Ut sodales, diam id dignissim tempor, lacus lorem vulputate velit, ac gravida nisl tortor mollis enim. Duis id efficitur lectus, nec iaculis lacus. Sed sollicitudin dignissim erat, eu vulputate leo fringilla nec. Pellentesque eget maximus metus. Nam viverra orci.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet varius arcu. Aliquam scelerisque est erat, eu facilisis nisl aliquam sed. Fusce ac velit rhoncus, convallis mi in, aliquet massa. Nulla quis viverra tellus. Suspendisse tempus quam quam, eu porta odio lobortis at. In vitae nunc accumsan, vehicula neque eget, rhoncus dui. Aenean bibendum tristique pulvinar. Vivamus metus sapien, maximus eu quam vitae, lacinia condimentum libero. Quisque mattis, leo eu efficitur dictum, elit diam bibendum justo, convallis vestibulum quam eros ac nulla. Aliquam consequat fringilla eros, a tempor arcu ultricies eu. Etiam pharetra viverra malesuada. Praesent volutpat magna at."
];
var i = 0;
var screen = document.getElementsByClassName("game-screen")[0];
var score = document.getElementsByClassName("score")[0];
var min = document.getElementsByClassName("min")[0];
var sec = document.getElementsByClassName("sec")[0];
var totalSeconds = 0;
var best = [0];
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
  document.getElementsByClassName("next-button")[0].style.display = "none";

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
    //document.getElementsByClassName("currentSpeed")[0].innerHTML =
    // "Current Speed:" + best[best.length - 1];
    if (words.length >= totalWords.length) {
      document.getElementById("type-box").disabled = true;
      timer = 0;
      clearInterval(time);
      document.getElementsByClassName("next-button")[0].style.display = "block";
      result();
    }
  });
}

function next() {
  clearInterval(time);
  totalSeconds = 0;
  time = setInterval(settime, 1000);
  document.getElementsByClassName("sec")[0].innerHTML = "00";
  i++;
  if (i >= paragraphs.length) {
    document.getElementsByClassName("next-button")[0].style.display = "none";
    displayFinalBest();
    //displayFinalAverage();
  }
  typeBox.value = "";
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
    "-- Best Speed is - " +
    bestSpeed +
    "<br></br>" +
    " Average speed is - " +
    avg +
    "<br></br> " +
    " Total time taken is :" +
    document.getElementsByClassName("min")[0].innerHTML +
    ":" +
    document.getElementsByClassName("sec")[0].innerHTML;

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
    if (best[best.length - 1] === "undefined") best[best.length - 1] = 0;
    document.getElementsByClassName("currentSpeed")[0].innerHTML =
      "Current Speed:" + best[best.length - 1];
    console.log("speed");
  }, 5000);
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
    "Your Best Speeed was " +
    highspeed +
    " words per minute in " +
    speedIndex +
    ". And " +
    "your best test was " +
    avgSpeedInd +
    " in which your Average Speed was " +
    avgSpeed +
    " words per minute";
  document.getElementsByClassName("game-screen")[0].style.display = "none";
  document.getElementsByClassName("play-again")[0].style.display = "block";
  document.getElementsByClassName("currentSpeed")[0].style.display = "none";

  clearInterval(timer);
  clearInterval(time);
}

function playAgain() {
  location.reload();
}
