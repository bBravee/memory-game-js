const main = document.querySelector('.memory-game');
const darkness = document.querySelector('.darkness');
const winPopup = document.querySelector('.win');
const playAgain = document.getElementById('restart');

let firstFlip = false;
let firstCard = '';
let secondCard = '';
let lockCards = false;
let guessedPair = 0;

const cards = [
    
    {
        class: 'front',
        src: './images/css.png',
        alt: 'css',
    },
    {
        class: 'back',
        src: './images/question-mark.png',
        alt: 'blank',
    },
    {
        class: 'front',
        src: './images/css.png',
        alt: 'css',
    },
    {
        class: 'back',
        src: './images/question-mark.png',
        alt: 'blank'
    },
    {
        class: 'front',
        src: './images/js.png',
        alt: 'js',
    },
    {
        class: 'back',
        src: './images/question-mark.png',
        alt: 'blank'
    },
    {
        class: 'front',
        src: './images/js.png',
        alt: 'js',
    },
    {
        class: 'back',
        src: './images/question-mark.png',
        alt: 'blank'
    },
    {
        class: 'front',
        src: './images/python.png',
        alt: 'python',
    },
    {
        class: 'back',
        src: './images/question-mark.png',
        alt: 'blank'
    },
    {
        class: 'front',
        src: './images/python.png',
        alt: 'python',
    },
    {
        class: 'back',
        src: './images/question-mark.png',
        alt: 'blank'
    },
    {
        class: 'front',
        src: './images/html.png',
        alt: 'html',
    },
    {
        class: 'back',
        src: './images/question-mark.png',
        alt: 'blank'
    },
    {
        class: 'front',
        src: './images/html.png',
        alt: 'html',
    },
    {
        class: 'back',
        src: './images/question-mark.png',
        alt: 'blank'
    },
];

(function populate() {
    for(var i = 0; i<cards.length-1; i+=2) {
        const memoryCard = document.createElement('div');
        memoryCard.setAttribute('data-lang', cards[i].alt);
        memoryCard.classList.add('memory-card');
        for(var j = i; j<i+2; j++) {
            const image = document.createElement('img');
            image.setAttribute('src', cards[j].src);
            image.setAttribute('alt', cards[j].alt);
            image.classList.add(cards[j].class);
            memoryCard.append(image);
        }
        main.append(memoryCard);
    }
})();

const allCards = document.querySelectorAll('.memory-card');

function flipCard() {
    if(lockCards) {
        return;
    }
    if(this === firstCard) {
        return;
    }
    
    this.classList.add('flip');

    if(!firstFlip) {
        firstFlip = true;
        firstCard = this;
    } else {
        firstFlip = false;
        secondCard = this;
        
        checkMatching();
        checkIfWin();
    }
}

function checkMatching() {
    let isMatching = firstCard.dataset.lang === secondCard.dataset.lang;

    isMatching ? disableCardClick() : unflipCards();  
}

function disableCardClick() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    guessedPair+=1;
}

function unflipCards() {
    lockCards = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetCards();
    }, 1500);
}

function resetCards() {
    [firstFlip, lockCards] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function mix() {
    allCards.forEach(card => {
        let position = Math.floor(Math.random()*12);
        card.style.order = position;
    });
})();

function checkIfWin() {
    let winCondition = cards.length/4;

    if(guessedPair === winCondition) {
        darkness.style.visibility = 'visible';
        winPopup.style.visibility = 'visible';
    }
}

function restartGame() {
    darkness.style.visibility = 'hidden';
    winPopup.style.visibility = 'hidden';
    guessedPair = 0;

    allCards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
}

allCards.forEach(card => card.addEventListener('click', flipCard));
playAgain.addEventListener('click', restartGame);