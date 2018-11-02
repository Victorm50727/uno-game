let Game = {
    deck: null,
    players: {},
    playersTurn: null,
    turnDirection: 1,
    topCard: null,
    topCardColor: null,
    topCardValue: null
}

function makeNewCards(){
    const cards = [
        'red_0',
        'red_1', 'red_2', 'red_3', 'red_4', 'red_5', 'red_6', 'red_7', 'red_8', 'red_9',
        'red_1', 'red_2', 'red_3', 'red_4', 'red_5', 'red_6', 'red_7', 'red_8', 'red_9',
        'red_skip', 'red_reverse', 'red_draw_two',
        'red_skip', 'red_reverse', 'red_draw_two',
        
        'green_0',
        'green_1', 'green_2', 'green_3', 'green_4', 'green_5', 'green_6', 'green_7', 'green_8', 'green_9',
        'green_1', 'green_2', 'green_3', 'green_4', 'green_5', 'green_6', 'green_7', 'green_8', 'green_9',
        'green_skip', 'green_reverse', 'green_draw_two',
        'green_skip', 'green_reverse', 'green_draw_two',
        
        'blue_0',
        'blue_1', 'blue_2', 'blue_3', 'blue_4', 'blue_5', 'blue_6', 'blue_7', 'blue_8', 'blue_9',
        'blue_1', 'blue_2', 'blue_3', 'blue_4', 'blue_5', 'blue_6', 'blue_7', 'blue_8', 'blue_9',
        'blue_skip', 'blue_reverse', 'blue_draw_two',
        'blue_skip', 'blue_reverse', 'blue_draw_two',
        
        'yellow_0',
        'yellow_1', 'yellow_2', 'yellow_3', 'yellow_4', 'yellow_5', 'yellow_6', 'yellow_7', 'yellow_8', 'yellow_9',
        'yellow_1', 'yellow_2', 'yellow_3', 'yellow_4', 'yellow_5', 'yellow_6', 'yellow_7', 'yellow_8', 'yellow_9',
        'yellow_skip', 'yellow_reverse', 'yellow_draw_two',
        'yellow_skip', 'yellow_reverse', 'yellow_draw_two',
        
        'wild_draw_four','wild_draw_four', 'wild', 'wild',
        'wild_draw_four','wild_draw_four', 'wild', 'wild',
    ]    
    
    return cards
}

// create a function that takes an array of cards 
// and returns a new array of shuffled cards
function shuffle( cards ){
    // create an array to hold the shuffled cards
    const deck = [ ]
    // algorithm to shuffle a deck of cards
    // as long as there are cards in the cards array
    while (cards.length > 0) {
        // pick a random number between 0 and the length of the cards array
        let randomNumber = Math.floor(Math.random() * cards.length)
        // then use that number to pick a card
        let card = cards[randomNumber]
        // console.log('card is '+card)
        // push that card onto the new deck
        deck.push(card)
        // remove the card from the original deck
        cards.splice(randomNumber, 1)        
    }
    return deck
}

function dealCard(deck){
    return deck.shift()
}

function startNewGame(){
    //create a new set of cards
    let cards = makeNewCards()
    //shuffle those cards
    let deck = shuffle(cards)
    //attach those cards to the Game object
    Game.deck = deck
    showGameObject()
    
    // add up to 4 players to the Game object
    const playerNames = ["Victor", "Jeff", "Jose", "Allen"]
    const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    for (let i = 0;i < playerNames.length; i++){
        //get the [player name]
        let name = playerNames[i]
        let id = ALPHABET[i]
        let player = createNewPlayer(name, id)
        Game.players[id] = player
    }
    
    //flip the top card over on the deck to start the game
    let discard = dealCard(Game.deck)
    Game.topCard = discard
    let topCard = document.querySelector('#deck')
    topCard.setAttribute('src', 'images/'+discard+'.png')
    
    Game.playersTurn = 'A'
    
    showGameObject()
}

function showGameObject(){
    var codeSection = document.querySelector('#game-object')
    codeSection.innerHTML = JSON.stringify(Game, null, 2)
}

function createNewPlayer(name, id){
    //every player needs a name
    //every player has to have a certain amount of cards at the start of the game
    //every player starts out with 0 points
    let player = {
        id: id,
        name: name,
        cards: [ ],
        points: 0,
    }
    
    for (var i = 0; i < 7; i++){
        let card = dealCard(Game.deck)
        player.cards.push(card)
    }
    
    return player
}

function changePlayerTurn(){
    //get the Alphabet
    const ALPHABET = Object.keys(Game.players)
    //get the id of whos turn it is
    const currentPlayerId = Game.playersTurn
    //get which direction the turn it's going
    const currentDirection = Game.turnDirection
    //move the curent player's turn one position in which direction it's supposed to move in.
        //first, get the index of the player's turn in the alphabet
    const index = ALPHABET.indexOf(currentPlayerId)
        //change that index by the direction number
    let newIndex = index + currentDirection
        //if index is less then 0, set it to the idex of the last player's id
    const keys = Object.keys(Game.players)
    const numPlayers = keys.length
    if(newIndex < 0){
        //get number of players playing
        newIndex = ALPHABET.length - 1
        //get the index of the last player's id
    }
        //if ...
    if(newIndex >= ALPHABET.length){
        newIndex = 0
    }
        //then get the id of the new index in the alphabet array
    const newPlayersTurn = ALPHABET[newIndex]
    Game.playersTurn = newPlayersTurn
    
    
    //change the Game.playerTurn to the next player's turn
}
function getColorOfCard(cardName){
    //if card looks like 'blue_7'
    //take the string and make a function so that when it reads the string it cuts it off @ the underscore
    //hint: use .split
    const splitCard = cardName.split('_')
    const color = splitCard[0]
    return color
}
function getValueOfCard(cardName){
    //if card looks like 'yellow_9' or 'yellow_skip' or 'yellow_draw_two' or 'wild_draw_four'
    //use .split method to take away the color and the underscore
    //this way you'll have the value of the card only
    const splitCard = cardName.split('_')
    let value = splitCard[1]
    if(splitCard.length === 3){
        value += '_' +splitCard[2]
    }
    return value
}
function playCard(playerId, cardName){
    //during each player's turn, they play a card from their hand
    //the card that they play is based on the color of top card
    //make an if/else that checks if any of the cards in their hand match the color OR number of the top card
    
    // if(cardsInHand = topCard --according to color and/or number-- ){
    //  play that card
    // } else{
    //  draw card from deck
    // }
}
function playerDrawCard(){
    //players can draw cards from the deck 
    //if they don't have a card that matches the top card
}
function playerDrawTwo(){
    //make an if/else statement to check if the top card of the deck is a plus 2 card
    //if it is, then 2 cards from the deck should be taken out and added to the player's hand
    //if not, then the game will move on
    let topCard = Game.topCard
    if(topCard === 'draw_two'){
        //some sort of action that will take 2 cards from the top of the deck and shifted into the players hand
        //use maybe .splice or some other method
    } else {
        
    }
}
function playerDrawFour(){
    let topCard = Game.topCard
    if(topCard === 'draw-four'){
        
    } else {
        
    }
    //make an if/else statement to check if the top card of the deck is a plus 4 card
    //if it is, then 4 cards from the deck should be taken out and added to the player's hand
    //if not, then the game will move on
}
function playWildCard(){
    let cardColor = Game.cardColor
    if(cardColor === 'pick-color'){  
    
    } else {
        
    }
    //make an if/else statement to check if the top card is a wild card
    //if it is, then the required color to play will be the choice of the person who played the card
    //when the wild card is played, there should be a message asking the player which color they want to play by
    //there should be a multi-choice option to pick which color
    //if not, then the game will move on
}
function skipTurn(){
    
    //make an if/else statement to check if the top card is a skip-turn card
    //if a skip-turn is played, then on the next player's turn, that person will be skipped
    //and the game will move on to the next player
    //if not, then the game will move on
}
function reverseTurn(){
    
    //make an if/else statement to check it the top card is a reverse card
    //if it is, then the rotation of gameplay will be reverse
    //this will cause the next player's turn to be reverse to the previous player
    //if not, then the game will move on
}