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

function swap(bar1, bar2) {    
  let temp = bar1.style.height;
  bar1.style.height = bar2.style.height;
  bar2.style.height = temp;

  let temp2 = bar1.innerText;
  bar1.innerText = bar2.innerText;
  bar2.innerText = temp2;
  // console.log(temp2)
}

async function bubbleSort(array) {
  // Disable buttons
console.log(array)
  document.getElementById("sort_btn").disabled = true;
  document.getElementById("randomize_array_btn").disabled = true;
  document.getElementById("speed").disabled = true;
  document.getElementById("slider").disabled = true;
  
  start = Date.now();
  let bars = document.getElementsByClassName("bar");

  for(let i = 0; i < bars.length-1; i++){
    for(let j = 0; j < bars.length-i-1; j++){
      bars[j].style.background = 'lightgreen';
      bars[j+1].style.background = 'green';
            if(parseInt(bars[j].style.height) > parseInt(bars[j+1].style.height)){
                await sleep(speedFactor);
                swap(bars[j], bars[j+1]);
            }
            bars[j].style.background = 'aqua';
            bars[j+1].style.background = 'aqua';
        }
        bars[bars.length-1-i].style.background = 'green';
    }
    bars[0].style.background = 'green';


  // for (let i = 0; i < array.length; i++) {
  //   for (let j = 0; j < array.length - i - 1; j++) {
  //     if (array[j] > array[j + 1]) {
  //       for (let k = 0; k < bars.length; k++) {
  //         if (k !== j && k !== j + 1) {
  //           bars[k].style.backgroundColor = "aqua"; 
  //         }
  //       }
  //       let temp = array[j];
  //       array[j] = array[j + 1];
  //       array[j + 1] = temp;
  //       bars[j].style.height = array[j] * heightFactor + "px";
  //       bars[j].style.backgroundColor = "lightgreen";
  //       bars[j].innerText = array[j];
  //       bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
  //       bars[j + 1].style.backgroundColor = "green";
  //       bars[j + 1].innerText = array[j + 1 ];
  //       await sleep(speedFactor);
  //     }
      
  //   }
  //   await sleep(speedFactor);
  // }
  // for (let k = 0; k < bars.length; k++) {
  //   bars[k].style.backgroundColor = "aqua";
  // }
  // end = Date.now();
  // time = end - start;
  // time = time / 1000;
  // time = time - count * (150 / 1000);
  // time = time.toPrecision(5);
  let end = Date.now();
    let time = ((end - start)/1000).toPrecision(3);
    let t = document.getElementById('answer');
    t.innerText = time;

  document.getElementById("time").innerHTML=String(time);
  document.getElementById("sort_btn").disabled = false;
  document.getElementById("randomize_array_btn").disabled = false;
  document.getElementById("speed").disabled = false;
  document.getElementById("slider").disabled = false;
  // let t = document.getElementById('answer');
  // t.innerText = time;

  return array;
  
}


let sortbtn=document.getElementById("sort_btn");
sortbtn.addEventListener("click",()=>{
    bubbleSort(unsorted_array);
})


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


