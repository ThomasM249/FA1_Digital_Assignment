var WORDS = ["CRANE","BLAZE","FROST","GLOBE","SHARK","PLANT","STORM","TIGER","VIVID","CROWN","FLUTE","GRIND","HONEY","JOKER","KNACK","LUNAR","MOSSY","NYMPH","OXIDE","PLANK"];
var targetWord = "", currentRow = 0, gameOver = false;

function idshort(id) { return document.getElementById(id); }

function startGame() {
  idshort("landingPage").classList.add("hidden");
  idshort("gamePage").classList.remove("hidden");
  initGame();
}

function replayGame() {
  idshort("gamePage").classList.contains("hidden") ? startGame() : initGame();
}

function initGame() {
  targetWord = WORDS[Math.floor(Math.random() * WORDS.length)];
  currentRow = 0;
  gameOver = false;
  idshort("message").textContent = "";
  idshort("endPopup").classList.add("hidden");
  idshort("guessInput").value = "";
  idshort("guessInput").disabled = false;
  idshort("guessInput").focus();
  buildGrid();
  buildKeyboard();
}

function buildGrid() {
  idshort("grid").innerHTML = "";
  for (var r = 0; r < 6; r++)
    for (var c = 0; c < 5; c++) {
      var t = document.createElement("div");
      t.classList.add("tile");
      t.id = "tile-" + r + "-" + c;
      idshort("grid").appendChild(t);
    }
}

function buildKeyboard() {
  var rows = [["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Enter","Z","X","C","V","B","N","M","⌫"]];
  idshort("keyboard").innerHTML = "";
  for (var i = 0; i < rows.length; i++) {
    var row = document.createElement("div");
    row.classList.add("key-row");
    for (var j = 0; j < rows[i].length; j++) {
      var b = document.createElement("button");
      b.classList.add("key");
      b.textContent = rows[i][j];
      if (rows[i][j] == "Enter" || rows[i][j] == "⌫") b.classList.add("wide");
      b.onclick = (function(l){ return function(){ handleKey(l); }; })(rows[i][j]);
      row.appendChild(b);
    }
    idshort("keyboard").appendChild(row);
  }
}

function handleKey(k) {
  if (gameOver) return;
  var inp = idshort("guessInput");
  if (k == "⌫") inp.value = inp.value.slice(0,-1);
  else if (k == "Enter") submitGuess();
  else if (inp.value.length < 5) inp.value += k;
  syncPreview();
  inp.focus();
}

function syncPreview() {
  var val = idshort("guessInput").value.toUpperCase();
  for (var c = 0; c < 5; c++) {
    var t = idshort("tile-" + currentRow + "-" + c);
    if (!t || t.classList.contains("correct") || t.classList.contains("present") || t.classList.contains("absent")) return;
    t.textContent = val[c] || "";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  idshort("guessInput").addEventListener("input", function() {
    this.value = this.value.replace(/[^a-zA-Z]/g,"").toUpperCase();
    syncPreview();
  });
  idshort("guessInput").addEventListener("keydown", function(e) {
    if (e.key == "Enter") submitGuess();
  });
});

function submitGuess() {
  if (gameOver) return;
  var guess = idshort("guessInput").value.toUpperCase().trim();
  if (guess.length != 5) {
    idshort("message").textContent = "Must be 5 letters.";
    setTimeout(function(){ idshort("message").textContent = ""; }, 1500);
    return;
  }
  var target = targetWord.split("");
  var result = ["absent","absent","absent","absent","absent"];
  var used = [false,false,false,false,false];
  for (var i = 0; i < 5; i++) if (guess[i] == target[i]) { result[i] = "correct"; used[i] = true; }
  for (var i = 0; i < 5; i++) {
    if (result[i] == "correct") continue;
    for (var j = 0; j < 5; j++) {
      if (!used[j] && guess[i] == target[j]) { result[i] = "present"; used[j] = true; break; }
    }
  }
  for (var i = 0; i < 5; i++) {
    var t = idshort("tile-" + currentRow + "-" + i);
    t.textContent = guess[i];
    t.classList.add(result[i]);
  }
  currentRow++;
  idshort("guessInput").value = "";
  if (result.every(function(r){ return r=="correct"; })) return endGame(true, guess);
  if (currentRow >= 6) endGame(false, guess);
}

function endGame(won, guess) {
  gameOver = true;
  idshort("guessInput").disabled = true;
  idshort("popupTitle").textContent = won ? "You Win" : "You Lose";
  idshort("popupLine1").textContent = won ? "You Guessed The Word: " + targetWord : "You used all 6 guesses without getting the word Loser.";
  idshort("popupLine2").textContent = won ? "Guesses used: " + currentRow + " / 6" : "The word was: " + targetWord;
  idshort("popupLine3").textContent = "";
  idshort("endPopup").classList.remove("hidden");
}

function toggleSettings() {
  idshort("settingsPanel").classList.toggle("hidden");
}

function toggleDark(cb) {
  document.body.classList.toggle("dark", cb.checked);
}