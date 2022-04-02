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

//mode alert texts
const easyText = document.querySelector(".easy-text");
const mediumText = document.querySelector(".medium-text");
const hardText = document.querySelector(".hard-text");
const xText = document.querySelector(".x-text");

//timer
let timeleft = 50;

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
            openCards[i].classList.remove("open", "show");
            openCards[i].clickable = true;
        }
        openCards = [];
}

const incrementMove = () => {
    const moves = document.querySelector(".moves");
    moves.innerHTML = parseInt(moves.innerHTML) + 1;
}

const displayFinalScore = () => {
    const finalScore = document.querySelector(".final-score");
    const finalStars = document.querySelector(".final-stars");
    const finalMoves = document.querySelector(".final-moves");
    const finalTime = document.querySelector(".final-time");

    finalScore.innerHTML = document.querySelector(".moves").innerHTML;
    finalStars.innerHTML = document.querySelector(".stars").innerHTML;
    finalMoves.innerHTML = document.querySelector(".moves").innerHTML;
    finalTime.innerHTML = document.querySelector(".timer").innerHTML;

    document.querySelector(".modal").style.display = "block";
}

const startGame = (timeLeft) => {
    let shuffledCards = shuffle(cardList);
    addCardEventListener(shuffledCards);
    deck.replaceChildren(...shuffledCards);

    function startTimer() {
        const countdown = document.querySelector(".countdown");
        if (timeLeft <= 0) {
            clearInterval(timer);
            countdown.innerHTML = "0";
            displayFinalScore();
        } else {
            countdown.innerHTML = "⏱: " + timeLeft;
        }
        timeLeft--;
    };

    setInterval(startTimer, 1000);
}

btnEasy.addEventListener("click", function() {
    easyText.classList.add("selected");
    mediumText.classList.remove("selected");
    hardText.classList.remove("selected");
    xText.classList.remove("selected");
    timeleft = 50;
})

btnMedium.addEventListener("click", function() {
    easyText.classList.remove("selected");
    mediumText.classList.add("selected");
    hardText.classList.remove("selected");
    xText.classList.remove("selected");
    timeleft = 30;
})

btnHard.addEventListener("click", function() {
    easyText.classList.remove("selected");
    mediumText.classList.remove("selected");
    hardText.classList.add("selected");
    xText.classList.remove("selected");
    timeleft = 15;
})

btnX.addEventListener("click", function() {
    xText.classList.add("selected");
    easyText.classList.remove("selected");
    mediumText.classList.remove("selected");
    hardText.classList.remove("selected");
    timeleft = 5;
})


start.addEventListener("click", function() {
    startGame(timeleft);
})


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/* shuffle cards on load or on restart */
//window.onload = start(cardList);
restart.addEventListener("click", () => {
    let shuffledCards = shuffle(deck.children);
    deck.replaceChildren(...shuffledCards);
    stars[0].classList.remove("fa-star-o");
    stars[1].classList.remove("fa-star-o");
    stars[2].classList.add("fa-star-o");
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function addCardEventListener(cards){
    for (let i = 0; i < cards.length; i++) {
        cards[i].clickable = true;
        cards[i].addEventListener("click", function() {
            if (cards[i].clickable) {
                displayCard(cards[i]);
                cards[i].clickable = false;
                incrementMove();
                openCards.push(cards[i]);
                console.log("openCards: " + openCards);
                if (openCards.length == 2) {
                    if (openCards[0].innerHTML == openCards[1].innerHTML) {
                        matchAndLock();
                        if (matchedCards.length == 16) {
                            displayFinalScore();
                        }
                    } else {
                        setTimeout(closeCards, 500);
                    }
                }
            }
        });
    }
};
