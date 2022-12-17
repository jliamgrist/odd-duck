'use strict';

console.log('aloha');

// ******* GLOBALS *******

let ducksArray = [];
let votesRound = 5;

//  ****** DOM WINDOWS *******

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let showResultsBtn = document.getElementById('results-Btn');
let resultsContainer = document.getElementById('results-container');



// ***** CONSTRUCTOR FUNCTION ******

function Duck (name, imgExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${imgExtension}`;
  this.votesCount = 0;
  this.views = 0;

}



// ***** HELPER FUNCTIONS / UTILITIES *****

function randomIndex() {
  return Math.floor(Math.random() * ducksArray.length);
}

let indexArray = [];
function renderImg() {

  while(indexArray.length < 6) {
    let randomNum = randomIndex();
    if (!indexArray.includes(randomNum)) {
      indexArray.push(randomNum);
    }
    
  }
  let imgOneIndex = indexArray.pop();
  let imgTwoIndex = indexArray.pop();
  let imgThreeIndex = indexArray.pop();


  imgOne.src = ducksArray[imgOneIndex].image;
  imgTwo.src = ducksArray[imgTwoIndex].image; 
  imgThree.src = ducksArray[imgThreeIndex].image;
  imgOne.title = ducksArray[imgOneIndex].name;
  imgTwo.title = ducksArray[imgTwoIndex].name;
  imgThree.title = ducksArray[imgTwoIndex].name;
  imgOne.alt = `this is an image of ${ducksArray[imgOneIndex].name}`;
  imgTwo.alt = `this is an image of ${ducksArray[imgTwoIndex].name}`;
  imgThree.alt = `this is an image of ${ducksArray[imgThreeIndex].name}`;

  ducksArray[imgOneIndex].views++;
  ducksArray[imgTwoIndex].views++;
  ducksArray[imgThreeIndex].views++;


}

// **** EVENT HANDLERS *****

function handleClick(event) {
  let imgClicked = event.target.title;
  for (let index = 0; index < ducksArray.length; index++) {
    if (imgClicked === ducksArray[index].name) {
      ducksArray[index].votesCount++;
    }
  }
  votesRound--;
  renderImg();
  if (votesRound === 0) {
    imgContainer.removeEventListener('click', handleClick);
    


  }
}


function handleShowResults() {
  if (votesRound === 0) {
    for (let index = 0; index < ducksArray.length; index++) {
      let liElement = document.createElement('li');
      liElement.textContent = `${ducksArray[index].name} had ${ducksArray[index].votesCount} and was shown ${ducksArray[index].views} times`;
      resultsContainer.appendChild(liElement);
      
    }
  }
}

// **** EXECUTABLE CODE *****

const bag = new Duck('bag');
const banana = new Duck('banana');
const bathroom = new Duck('bathroom');
const boots = new Duck('boots');
const breakfast = new Duck('breakfast');
const bubblegum = new Duck('bubblegum');
const chair = new Duck('chair');
const cthulhu = new Duck('cthulhu');
const dogDuck = new Duck('dog-duck');
const dragon = new Duck('dragon');
const pen = new Duck('pen');
const petSweep = new Duck('pet-sweep');
const scissors = new Duck('scissors');
const shark = new Duck('shark');
const sweep = new Duck('sweep', 'png');
const tauntaun = new Duck('tauntaun');
const unicorn = new Duck('unicorn');
const waterCan = new Duck('water-can');
const wineGlass = new Duck('wine-glass');

ducksArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);



renderImg();

imgContainer.addEventListener('click', handleClick);
showResultsBtn.addEventListener('click', handleShowResults);
