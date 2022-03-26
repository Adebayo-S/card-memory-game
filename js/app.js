/*
 * Create a list that holds all of your cards
 */
const cardList = [...document.querySelectorAll(".card")];
const restart = document.querySelector(".restart");
const deck = document.querySelector(".deck");
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

const closeCards = () => {
        for (let i = 0; i < openCards.length; i++) {
            openCards[i].classList.remove("open", "show");
        }
        openCards = [];
}

const incrementMove = () => {
    const moves = document.querySelector(".moves");
    moves.innerHTML = parseInt(moves.innerHTML) + 1;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/* shuffle cards on load or on restart */
window.onload = shuffle(cardList);
restart.addEventListener("click", () => {
    shuffle(cardList);
})
addCardEventListener(cards);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cards) {
    var currentIndex = cards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }

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
                incrementMove();
                openCards.push(cards[i]);
                if (openCards.length == 2) {
                    if (openCards[0].lastElementChild == openCards[1].lastElementChild) {
                        matchAndLock();
                        if (matchedCards.length == 16) {
                            displayFinalScore();
                        }
                    } else {
                        setTimeout(closeCards, 700);
                    }
                }
            }
            openCard(cards[i]);
        });
    }
};
