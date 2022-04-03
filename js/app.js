/*
 * Create a list that holds all of your cards
 */
const cardList = [...document.querySelectorAll(".card")];
const restart = document.querySelector(".restart");
const deck = document.querySelector(".deck");
const moves = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");

// buttons
const btnEasy = document.querySelector(".btn-easy");
const btnMedium = document.querySelector(".btn-medium");
const btnHard = document.querySelector(".btn-hard");
const btnX = document.querySelector(".btn-x");
const start = document.querySelector(".start");
const playAgain = document.querySelector(".play-again");
const playAgainB = document.querySelector(".play-again-b");
const dropdown = document.querySelector(".dropdown-content");
const dropdownBtn = document.querySelector(".btn-drop");

//mode alert texts
const easyText = document.querySelector(".easy-text");
const regularText = document.querySelector(".regular-text");
const hardText = document.querySelector(".hard-text");
const xText = document.querySelector(".x-text");

//timer
let timeLeft = 60;
let setTime = 60;
let resetTime = false;
let timer;

let openCards = [];
let matchedCards = [];

const displayCard = (card) => {
    card.classList.add("open", "show");
}

const matchAndLock = () => {
    for (let i = 0; i < openCards.length; i++) {
        openCards[i].classList.add("match");
        openCards[i].clickable = false;
        matchedCards.push(openCards[i]);
    }
    openCards = [];
}

const closeMatchingCards = () => {
    for (let i = 0; i < matchedCards.length; i++) {
        matchedCards[i].classList.remove("open", "show", "match");
    }
    matchedCards = [];
}

const closeCards = () => {
        for (let i = 0; i < openCards.length; i++) {
            openCards[i].classList.remove("open", "show", "no-match");
            openCards[i].clickable = true;
            openCards[i].classList.remove("animate__flipInY");
            // openCards[i].classList.remove("animate__shakeX");
        }
        openCards = [];
}

const incrementMove = () => {
    const moves = document.querySelector(".moves");
    moves.innerHTML = parseInt(moves.innerHTML) + 1;
}

const displayFinalScore = (status) => {

    clearInterval(timer);
    const countdown = document.querySelector(".countdown");
    let timePassed = parseInt(countdown.innerHTML.split("⏱: ")[1]);
    if (!timePassed){
        timePassed = 0;
    }

    let timeElapsed = setTime - timePassed;

    const finalMatches = document.querySelector(".final-matches");
    const finalMoves = document.querySelector(".final-moves");
    const finalTimeA = document.querySelector(".final-time-a");
    const finalTimeB = document.querySelector(".final-time-b");

    finalMatches.innerHTML = matchedCards.length;
    finalMoves.innerHTML = document.querySelector(".moves").innerHTML;
    finalTimeA.innerHTML = `${timeElapsed}`;
    finalTimeB.innerHTML = `${timeElapsed}`;

    if (status == "win") {
        document.querySelector(".win-mode").style.display = "flex";
    } else {
        document.querySelector(".gameover").style.display = "flex";
    }
}

const startGame = (timeLeft) => {
    let shuffledCards = shuffle(cardList);
    addCardEventListener(shuffledCards);
    deck.replaceChildren(...shuffledCards);
    document.querySelector(".start-mode").style.display = "none";

    function startTimer() {
        const countdown = document.querySelector(".countdown");

        if (resetTime) {
            timeLeft = setTime;
            resetTime = false;
        }
        if (timeLeft <= 0) {
            countdown.innerHTML = "0";
            clearInterval(timer);
            displayFinalScore("lose");
        } else {
            countdown.innerHTML = "⏱: " + timeLeft;
        }
        timeLeft--;

        updateStars();
    };

    timer = setInterval(startTimer, 1000);
}

const updateStars = () => {
    if (moves.innerHTML > 35) {
        stars[1].classList.add("fa-star-o");
        document.querySelector(".star-badges").innerHTML = "⭐️";
    } else if (moves.innerHTML > 25) {
        stars[2].classList.add("fa-star-o");
        document.querySelector(".star-badges").innerHTML = "⭐️⭐️";
    } else {
        document.querySelector(".star-badges").innerHTML = "⭐️⭐️⭐️";
    }
}

dropdownBtn.addEventListener("click", function() {
    dropdown.classList.add("show");
});

btnEasy.addEventListener("click", function() {
    easyText.classList.add("selected");
    regularText.classList.remove("selected");
    hardText.classList.remove("selected");
    xText.classList.remove("selected");
    dropdown.classList.remove("show");
    timeLeft = 60;
    setTime = timeLeft;
})

btnMedium.addEventListener("click", function() {
    easyText.classList.remove("selected");
    regularText.classList.add("selected");
    hardText.classList.remove("selected");
    xText.classList.remove("selected");
    dropdown.classList.remove("show");
    timeLeft = 45;
    setTime = timeLeft;
})

btnHard.addEventListener("click", function() {
    easyText.classList.remove("selected");
    regularText.classList.remove("selected");
    hardText.classList.add("selected");
    xText.classList.remove("selected");
    dropdown.classList.remove("show");
    timeLeft = 25;
    setTime = timeLeft;
})

btnX.addEventListener("click", function() {
    xText.classList.add("selected");
    easyText.classList.remove("selected");
    regularText.classList.remove("selected");
    hardText.classList.remove("selected");
    dropdown.classList.remove("show");
    timeLeft = 5;
    setTime = timeLeft;
})


start.addEventListener("click", function() {
    startGame(timeLeft);
})

playAgain.addEventListener("click", function() {
    location.reload();
})

playAgainB.addEventListener("click", function() {
    location.reload();
})

restart.addEventListener("click", () => {
    let shuffledCards = shuffle(deck.children);
    deck.replaceChildren(...shuffledCards);
    stars[0].classList.remove("fa-star-o");
    stars[1].classList.remove("fa-star-o");
    stars[2].classList.remove("fa-star-o");
    resetTime = true;
})


// Shuffle function adapted from http://stackoverflow.com/a/2450976
function shuffle(cards) {
    var currentIndex = cards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }

    closeCards();
    closeMatchingCards();
    moves.innerHTML = 0;

    return cards;
}

const noMatch = () => {
    openCards[0].classList.add("no-match", "animate__shakeX");
    openCards[1].classList.add("no-match", "animate__shakeX");
}

function addCardEventListener(cards){
    for (let i = 0; i < cards.length; i++) {
        cards[i].clickable = true;
        cards[i].addEventListener("click", function() {
            cards[i].classList.add("animate__flipInY");
            if (cards[i].clickable) {
                displayCard(cards[i]);
                cards[i].clickable = false;
                incrementMove();
                openCards.push(cards[i]);
                if (openCards.length == 2) {
                    if (openCards[0].innerHTML == openCards[1].innerHTML) {
                        matchAndLock();
                        if (matchedCards.length == 16) {
                            displayFinalScore("win");
                        }
                    } else {
                        setTimeout(noMatch, 400);
                        setTimeout(closeCards, 800);
                    }
                }
            }
        });
    }
};
