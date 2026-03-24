// Start of the game Button
const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", () => {
  startBtn.parentElement.style.display = "none";
  localStorage.setItem("gameStarted", "true");
});
// Check if the game has already started
if (localStorage.getItem("gameStarted") === "true") {
  document.querySelector(".overlay").style.display = "none";
}

// Generate alphabet letters
const letters = "abcdefghijklmnopqrstuvwxyz";
const lettersArray = Array.from(letters);
const lettersContainer = document.querySelector(".letters");

// Render letters buttons
lettersArray.forEach((letter) => {
  const span = document.createElement("span");
  span.textContent = letter;
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

async function getData() {
  try {
    // Fetch words data
    const response = await fetch("../hangman_words.json");
    const data = await response.json();

    // Pick random category
    const allKeys = Object.keys(data);
    const randomPropName = allKeys[Math.floor(Math.random() * allKeys.length)];

    // Pick random word from category
    const randomValueName =
      data[randomPropName][
        Math.floor(Math.random() * data[randomPropName].length)
      ];

    // Display category name
    document.querySelector(".game-info .category span").innerHTML =
      randomPropName;

    // Create guess placeholders
    const lettersGuessContainer = document.querySelector(".letters-guess");
    Array.from(randomValueName).forEach((letter) => {
      const span = document.createElement("span");
      if (letter === " ") span.classList.add("With-Space", "done");
      lettersGuessContainer.appendChild(span);
    });

    const guessSpans = document.querySelectorAll(".letters-guess span");
    let wrongAttempts = 0;
    const theDraw = document.querySelector(".hangman-draw");

    // Handle letter clicks
    document.addEventListener("click", (e) => {
      if (!e.target.classList.contains("letter-box")) return;

      e.target.classList.add("clicked");
      const clickedLetter = e.target.textContent.toLowerCase();
      let isCorrect = false;

      // Check if clicked letter is in the word
      Array.from(randomValueName.toLowerCase()).forEach((letter, index) => {
        // Reveal correct letters
        if (letter === clickedLetter) {
          isCorrect = true;
          guessSpans[index].textContent = letter;
          guessSpans[index].classList.add("done");
        }
      });

      // Handle wrong attempts
      if (!isCorrect) {
        wrongAttempts++;
        theDraw.classList.add(`wrong-${wrongAttempts}`);
        document.getElementById("fail").play();

        // Check for game over
        if (wrongAttempts === 8) {
          endGame();
          lettersContainer.classList.add("finished");
        }
      } else {
        document.getElementById("success").play();
        if (
          document.querySelectorAll(".letters-guess .done").length ===
          randomValueName.length
        ) {
          winGame();
        }
      }
    });

    // Lose popup
    function endGame() {
      const div = document.createElement("div");
      div.className = "popup";
      div.innerHTML = `Game Over, The Word Is <span class="correct-word">${randomValueName}</span>`;

      const btn = document.createElement("button");
      btn.className = "but";
      btn.textContent = "Try Again";
      btn.onclick = () => location.reload();

      div.appendChild(btn);
      document.body.appendChild(div);
    }

    // Win popup
    function winGame() {
      const div = document.createElement("div");
      div.className = "popup";
      div.innerHTML = `Congratulations, you won! ${wrongAttempts} wrongs`;

      const btn = document.createElement("button");
      btn.className = "but";
      btn.textContent = "Continue";
      btn.onclick = () => location.reload();

      div.appendChild(btn);
      document.body.appendChild(div);
    }
    // End of try block
  } catch (error) {
    console.error("Error:", error);
  }
}

getData();
