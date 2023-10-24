document.addEventListener("DOMContentLoaded", () => {
  //list all card options
  const cardArray = [
    {
      name: "bear",
      img: "images/bear.png",
    },
    {
      name: "birds",
      img: "images/birds.png",
    },
    {
      name: "boar",
      img: "images/boar.png",
    },
    {
      name: "deer",
      img: "images/deer.png",
    },
    {
      name: "fox",
      img: "images/fox.png",
    },
    {
      name: "moose",
      img: "images/moose.png",
    },
    {
      name: "bear",
      img: "images/bear.png",
    },
    {
      name: "rabbit",
      img: "images/rabbit.png",
    },
    {
      name: "fox2",
      img: "images/fox2.jpg",
    },
    {
      name: "birds",
      img: "images/birds.png",
    },
    {
      name: "boar",
      img: "images/boar.png",
    },
    {
      name: "deer",
      img: "images/deer.png",
    },
    {
      name: "fox",
      img: "images/fox.png",
    },
    {
      name: "moose",
      img: "images/moose.png",
    },
    {
      name: "rabbit",
      img: "images/rabbit.png",
    },
    {
      name: "fox2",
      img: "images/fox2.jpg",
    },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  // Hae audio-elementti
  const backgroundMusic = document.getElementById("backgroundMusic");

  // Määritä äänenvoimakkuus (0-1)
  backgroundMusic.volume = 0.1; // Voit säätää äänenvoimakkuutta tarpeen mukaan

  // Toista ääni
  backgroundMusic.play();

  // Pysäytä ääni
  // backgroundMusic.pause();

  //create your board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement("img");
      card.setAttribute("src", "images/blank.jpg");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
  }

  //check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll("img");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute("src", "images/blank.jpg");
      cards[optionTwoId].setAttribute("src", "images/blank.jpg");
      alert("You have clicked the same image!");
    } else if (cardsChosen[0] === cardsChosen[1]) {
      alert("You found a match");

      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      cardsWon.push(cardsChosen);
      // Toista ääniefekti korttiparin löytämisen yhteydessä
      const matchSound = document.getElementById("matchSound");
      matchSound.volume = 0.1;
      matchSound.play();
    } else {
      cards[optionOneId].setAttribute("src", "images/blank.jpg");
      cards[optionTwoId].setAttribute("src", "images/blank.jpg");
      alert("Sorry, try again");
    }

    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      askPlayAgain();
    }
  }

  // Kysy pelaajalta, haluaako hän pelata uudelleen

  function askPlayAgain() {
    // Luo vahvistusikkuna (confirm dialog)
    const playAgain = confirm(
      "Congratulations! You found them all! Do you want to play again?"
    );

    if (playAgain) {
      // Jos pelaaja haluaa pelata uudelleen, voit tässä resetoida pelin tai tehdä tarvittavat toimenpiteet
      // Esimerkiksi voit lisätä koodin, joka lataa sivun uudelleen:
      location.reload();
    } else {
      // Jos pelaaja ei halua pelata uudelleen, voit tehdä tarvittavat toimenpiteet
      // Esimerkiksi voit sulkea selaimen ikkunan:
      window.close();
    }
  }

  if (cardsWon.length === cardArray.length / 2) {
    resultDisplay.textContent = "Congratulations! You found them all!";
    // Kutsu askPlayAgain()-funktiota, kun peli on päättynyt
    askPlayAgain();
  }

  //flip your card
  function flipCard() {
    let cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 100);
    }
  }

  createBoard();
});
