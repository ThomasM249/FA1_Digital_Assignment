let currentRow = 0;

const wordList = [
    "APPLE", "GRAPE", "LEMON", "PEACH", "BERRY",
    "PLUMB", "MELON", "HOUSE", "MOUSE", "CLOUD",
    "RIVER", "OCEAN", "LAKES", "TREES", "FLOWER",
    "GRASS", "WORDS", "BREAD", "WATER", "EARTH"
];

let targetWord = wordList[Math.floor(Math.random() * wordList.length)];

document.getElementById('p1').innerHTML = 'Target Word: ' + targetWord;

function submitGuess() {
    const guessInput = document.getElementById("guessInput");
    const guess = guessInput.value.toUpperCase();

    if (guess.length !== 5) {
        console.log('Guess must be exactly 5 letters.')
        return;
    }

    const boxes = document.querySelectorAll('.Boxes');
    if (currentRow == 0) {
        boxes[0].innerHTML = guess[0];
        boxes[1].innerHTML = guess[1];
        boxes[2].innerHTML = guess[2];
        boxes[3].innerHTML = guess[3];
        boxes[4].innerHTML = guess[4];
    } else if (currentRow == 1) {
        boxes[5].innerHTML = guess[0];
        boxes[6].innerHTML = guess[1];
        boxes[7].innerHTML = guess[2];
        boxes[8].innerHTML = guess[3];
        boxes[9].innerHTML = guess[4];
    } else if (currentRow == 2) {
        boxes[10].innerHTML = guess[0];
        boxes[11].innerHTML = guess[1];
        boxes[12].innerHTML = guess[2];
        boxes[13].innerHTML = guess[3];
        boxes[14].innerHTML = guess[4];
    } else if (currentRow == 3) {
        boxes[15].innerHTML = guess[0];
        boxes[16].innerHTML = guess[1];
        boxes[17].innerHTML = guess[2];
        boxes[18].innerHTML = guess[3];
        boxes[19].innerHTML = guess[4];
    } else if (currentRow == 4) {
        boxes[20].innerHTML = guess[0];
        boxes[21].innerHTML = guess[1];
        boxes[22].innerHTML = guess[2]; 
        boxes[23].innerHTML = guess[3];
        boxes[24].innerHTML = guess[4];
    } else if (currentRow == 5) {
        boxes[25].innerHTML = guess[0];
        boxes[26].innerHTML = guess[1];
        boxes[27].innerHTML = guess[2];
        boxes[28].innerHTML = guess[3];
        boxes[29].innerHTML = guess[4];
    } else {
        alert("No more guesses");
        return;
    }

    compareAndHighlight(guess, currentRow);

    currentRow++;
    guessInput.value = '';
}

function getLetterStates(guess, target) {
    let result = new Array(5).fill('gray');
    let targetCounts = {};
    for (let char of target) {
        targetCounts[char] = (targetCounts[char] || 0) + 1;
    }
    //Mark green
    for (let i = 0; i < 5; i++) {
        if (guess[i] === target[i]) {
            result[i] = 'green';
            targetCounts[guess[i]]--;
        }
    }
    //Mark yellows
    for (let i = 0; i < 5; i++) {
        if (result[i] === 'gray' && targetCounts[guess[i]] > 0) {
            result[i] = 'yellow';
            targetCounts[guess[i]]--;
        }
    }
    return result;
}
 
function LetterComparison(guess, null) {
    while (guess[i] == target[i]) {
        // boxes[0-5].innerHTML Change the colour to Green
    }
}