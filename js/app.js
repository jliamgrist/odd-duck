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

let resultsContainer = document.getElementById('results-container');

let chartCanvas = document.getElementById('myChart');



// ***** CONSTRUCTOR FUNCTION ******

function Duck(name, imgExtension = 'jpg') {
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

  while (indexArray.length < 6) {
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
// **** Render the Chart **** 

function renderChart() {
  // use the chart constructor, passing in the canvas element and the chart object of the data

  let chartLabels = [];
  let votesArray = [];
  let viewsArray = [];

  for (let index = 0; index < ducksArray.length; index++) {
    chartLabels.push(ducksArray[index].name);
    votesArray.push(ducksArray[index].votesCount)
    viewsArray.push(ducksArray[index].views)
  }

  const dataForChart = {
    labels: chartLabels,
    datasets: [{
      label: '# of Votes',
      data: votesArray,
      borderWidth: 0
    },
    {
      label: '# of Views',
      data: viewsArray,
      borderWidth: 0,
    }],
  };

  const optionsObject = {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true
        }
      },
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1 | 1,
    }
  ;
 
  const pluginsObject = {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Results Chart'
      },
      customCanvasBackgroundColor: {
        color: '#AAF1F7n',
      }
    };
  

  const dataObject = {
    type: 'bar',
    data: dataForChart,
    options: optionsObject,
    plugins: pluginsObject,
  };

  // first argument is the canvas element
  // second argument is the chart object

  new Chart(chartCanvas, dataObject);
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
      renderChart();

      // **** Local Storage **** 

     let stringifiedDucks = JSON.stringify(ducksArray);
      localStorage.setItem('myDucks', stringifiedDucks);


    }
  }


  // function handleShowResults() {
  //   if (votesRound === 0) {
  //     renderChart();
  //     showResultsBtn.removeEventListener('click', handleShowResults);
  //   }
  // }

  // **** EXECUTABLE CODE *****


let retrievedDucks = localStorage.getItem('myDucks');
let parsedDucks = JSON.parse(retrievedDucks);

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

  // if parsedDucks is not null, then reassign the parseDucks properties to the ducksArray objects
  
  if (parsedDucks) {
    for (let i = 0; i < ducksArray.length; i++){
      ducksArray[i].votes = parsedDucks[i].votes;
      ducksArray[i].views = parsedDucks[i].views;
    }
  }

  // **** Render Images and Results Container ****

  renderImg();

  imgContainer.addEventListener('click', handleClick);