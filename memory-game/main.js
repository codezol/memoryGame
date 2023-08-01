const cards = Array.from(document.querySelectorAll('.card'))
const images = Array.from(document.querySelectorAll('.card img'))
const mistakes = document.querySelector(".mistakes")
const container = document.querySelector(".container")
shuffle(cards)
setTimeout(() => {
    flipAllCards()
    startGame()
}, 5000)
function flipAllCards() {
    cards.forEach(card => {
        card.classList.add("unKnown")
    })
    images.forEach(image => {
        image.style.display = 'none'
    })
}
function rotate(div, index) {
    div.style.transform = 'rotateY(180deg)'
        div.classList.remove('unKnown')
    setTimeout(() => {
        images[index].style.display = 'block'
    }, 100)
}
function reRotate(arr) {
 arr.forEach(el => {
    el.style.transform = 'rotateY(360deg)'
    el.classList.add('unKnown')
    let image = el.childNodes[0]
   
    setTimeout(() => {
        image.style.display = 'none'
    }, 100)
    arr = []
 })
}
function getRandoIndexsList(len) {
    let randomArray = []
    for(i = 0; i < len; i ++){
        let randomIndex = Math.floor(Math.random() * len)
        if(randomArray.includes(randomIndex)){
            i = i -1
        }else {
            randomArray.push(randomIndex)
        }
    }
    return randomArray;
}

function shuffle(cards){
    let randomIndexsList = getRandoIndexsList(cards.length)
    cards.forEach((card, index) => {
        card.classList.add(`position-${randomIndexsList[index]}`)
    })
}
function theSameTwoCards(arr){
  
    if(arr[0].dataset.value == arr[1].dataset.value){
        return true
    }else{
        return false
    }
}
function startInteraction() {
    container.classList.remove("stop_game")
}
function stopInteraction() {
    container.classList.add("stop_game")
}
let theCurrentTwoCards = []
let numberOfmistakes = 0

function startGame() {
        cards.forEach((card , index)=> {
            card.addEventListener('click', () => {
                rotate(card, index)
                theCurrentTwoCards.push(card)
                if(theCurrentTwoCards.length == 2) {
                    if(!theSameTwoCards(theCurrentTwoCards)){
                        stopInteraction()
                        setTimeout(() => {
                            reRotate(theCurrentTwoCards)
                            theCurrentTwoCards = []
                            numberOfmistakes += 1
                            mistakes.textContent = numberOfmistakes
                            if(numberOfmistakes > 5) {
                                stopInteraction()
                                alert("you Lost")
                            }
                            startInteraction()
                        }, 1000)
                    }else {
                        theCurrentTwoCards = []
                    }
                }       
            })
        })
    }
