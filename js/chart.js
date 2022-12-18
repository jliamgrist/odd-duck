`use strict`;

let retrievedDucks = localStorage.getItem('myDucks');

let parsedDucks = JSON.parse(retrievedDucks);

let canvasElement = document.getElementById('myChart');

