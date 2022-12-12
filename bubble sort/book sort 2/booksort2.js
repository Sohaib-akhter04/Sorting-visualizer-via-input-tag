let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
// let select_algo = document.getElementById("algo");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = 40;
let numOfBars = 40;
let heightFactor = 1;
let speedFactor = 100;
let btn=document.getElementsByClassName("buttons_container")
let unsorted_array = new Array(numOfBars);

sort_btn.addEventListener('click', function(){
  let start = Date.now();

  let ele = document.getElementsByClassName("bar");

  rangeHigh = 100;
  rangeLow = 50;
  
  let max = parseInt(ele[0].style.height);
  for(let i=1; i<ele.length; i++)
      if(max < parseInt(ele[i].style.height))
          max = parseInt(ele[i].style.height);

  let countArr = new Array(max + 1).fill(0);

  for (let i = 0; i < ele.length; i++) {
    let value = parseInt(ele[i].style.height)
    ++countArr[value];
    // await delayTime(delay);
  }

  for (let i = 1; i< max + 1; i++) {
    countArr[i] = countArr[i] + countArr[i - 1];
    // await delayTime(delay);
  }

  tmp = new Array(max).fill(0);

  let j = 0;

  for(var i=0; i<ele.length; i++)
    if(parseInt(ele[i].style.height) <= rangeHigh)
      tmp[parseInt(ele[i].style.height)] = 1;

  tmp2 = []

  for(var i=0; i<tmp.length; i++){
    if(tmp[i]){
      tmp2[j++] = i;
    }
  }
      
  // console.log(tmp2);

  for(var i=0; i<ele.length; i++){
    if(tmp2.includes(parseInt(ele[i].style.height)))
      ele[i].style.background = 'green';
  }

  let answer = countArr[rangeHigh] - countArr[rangeLow];

  let end = Date.now();
  let time = ((end - start)/1000).toPrecision(3);

  let ans = document.getElementById('answer');
  ans.innerText = answer;

  let t = document.getElementById('time');
  t.innerText = time;
})

slider.addEventListener("input", function () {
  numOfBars = slider.value;
  maxRange = slider.value;
  //console.log(numOfBars);
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});

let algotouse = "";

// select_algo.addEventListener("change", function () {
//   algotouse = select_algo.value;
// });

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }

  return array;
}

document.addEventListener("DOMContentLoaded", function () {
  // unsorted_array = createRandomArray();
  // renderBars(unsorted_array);
});

function renderBars(array) {
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    bar.innerText=array[i];
    bars_container.appendChild(bar);
  }
}

randomize_array.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function importfile () {
  var file = document.getElementById("file").files[0];
  if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
          unsorted_array = evt.target.result.split(', ');
          numOfBars = unsorted_array.length;
          for(let i=0; i<unsorted_array.length; i++)
            unsorted_array[i] = parseInt(unsorted_array[i]);
          renderBars(unsorted_array);
      }
  }
}

  