document.addEventListener("DOMContentLoaded", function () {
  const cards = Array.from(document.querySelectorAll(".memory-card"));
  let lockBoard = false;
  let firstCard, secondCard;

  function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add("flip");
    if (!firstCard) {
      firstCard = this;
    } else {
      secondCard = this;
      checkForMatch();
    }
  }

  function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
      disableCards();
    } else {
      unflipCards();
    }
  }

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }

  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
});
