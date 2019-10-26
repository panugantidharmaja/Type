var paragraphs = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nibh massa, suscipit vitae mi nec, vehicula vestibulum sapien. Phasellus pulvinar.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tristique cursus odio eget fermentum. Aenean magna massa, mollis ut arcu ac, volutpat tincidunt mi. Sed in elit purus. Proin convallis augue ac nunc dictum egestas rutrum ac diam. Quisque convallis, risus ut convallis posuere, nulla tortor faucibus justo, vitae tincidunt.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac quam volutpat, feugiat ante luctus, congue nisi. Vestibulum ac mauris hendrerit, malesuada elit at, aliquam urna. Maecenas sit amet mi a risus finibus luctus. Quisque sit amet ultricies lectus. Ut tincidunt a sem eu auctor. Integer in nulla tellus. Phasellus consequat ex ex. Donec sed nunc rhoncus, vehicula felis vel, aliquet nibh. Phasellus mattis eu enim non lobortis. Aenean porta.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel ultricies lectus, quis aliquam sem. In hac habitasse platea dictumst. Nunc id enim risus. Duis sed gravida velit. In tristique sodales nisi, at semper diam varius et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur in odio aliquet, hendrerit tortor et, bibendum odio. In porttitor pharetra lectus, eu auctor turpis malesuada ut. Phasellus fringilla nisl arcu, eget sagittis orci ullamcorper posuere. Aliquam ultrices commodo augue, efficitur fringilla sapien bibendum vitae. Quisque neque nisi, vulputate ac.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non bibendum mauris. Suspendisse vestibulum sapien metus, eget laoreet massa malesuada a. Etiam in lacus rutrum, iaculis tortor vitae, porttitor ligula. Duis feugiat ex risus, in ultricies lacus vulputate nec. Donec tellus risus, sodales sit amet eros ultricies, malesuada lacinia lorem. Ut vitae dui purus. Pellentesque malesuada turpis id dui congue, ac scelerisque est finibus. Proin vulputate in ligula non accumsan. Phasellus suscipit a dui a vestibulum. Curabitur laoreet, lorem vel euismod mollis, enim enim bibendum massa, sit amet luctus ex lectus vel massa. Etiam fermentum tempus magna et faucibus. Suspendisse nulla est, blandit sit amet tellus eget, sodales ornare dolor. Praesent molestie pulvinar magna. Sed mattis pulvinar nulla eu convallis."]
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

function displayMessage(i) {
    gameplay = true;

    screen.innerHTML = paragraphs[i];
    var total = paragraphs[i].match(/\S+/g);
    score.innerHTML = 0 + "/" + total.length + " words";
    console.log(playGame());

}

function playGame() {
    var res = [];
    var typeBox = document.getElementById("type-box");
    setInterval(function () {
        var count = typeBox.value.match(/\S+/g);
    }, 3000);
    typeBox.addEventListener("input", function () {
        var words = this.value.match(/\S+/g);
        score.innerHTML = words.length + "/" + paragraphs[i].match(/\S+/g).length + " words";
        res = words;
        if (words.length == paragraphs[i].match(/\S+/g).length) {
            clearInterval();
            gameplay = false;
            typeBox.style.display = "none";
            result();
        }
    })
}

function next() {
    clearInterval(time);
    totalSeconds = 0;
    time = setInterval(settime, 1000);
    document.getElementsByClassName("sec")[0].innerHTML = "00";
    console.log("next")
    i++;
    if (i >= paragraphs.length) {
        document.getElementsByClassName("next-button")[0].style.display = "none";
        document.getElementsByClassName("game-screen")[0].style.display = "none";
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
    document.getElementsByClassName("result")[0].innerHTML = document.getElementsByClassName("min")[0].innerHTML + "Minutes and " + document.getElementsByClassName("sec")[0].innerHTML + "Seconds";
}