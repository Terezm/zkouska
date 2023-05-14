const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

cards.forEach((card) => card.addEventListener("click", flipCard));

function flipCard() {
  if (lockBoard || this === firstCard) {
    return;
  }

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // První otočená karta
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // Druhá otočená karta
    hasFlippedCard = false;
    secondCard = this;

    // Kontrola shody
    if (checkForMatch()) {
      // Shoda
      disableCards();
    } else {
      // Neshoda
      lockBoard = true;
      setTimeout(() => {
        unflipCards();
      }, 1000);
    }
  }
}

function checkForMatch() {
  // Porovnání alt atributů obou karet
  return firstCard.dataset.framework === secondCard.dataset.framework;
}

function disableCards() {
  // Odebrání event listenerů pro otočené karty
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  // Otočení karet zpět rubem nahoru
  firstCard.classList.remove("flip");
  secondCard.classList.remove("flip");

  resetBoard();
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
