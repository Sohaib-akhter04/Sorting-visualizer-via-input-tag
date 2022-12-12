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
async function insertionSort(array) {
    var length = array.length;

    for (var i = 1; i < length; i++) {
        var temp = array[i];
        for (var j = i - 1; j >= 0 && array[j] > temp; j--) {
            array[j + 1] = array[j];
        }
        array[j + 1] = temp;
    }
        // return new Promise((res) => {
        //     res();
        // });
}

async function bucketSort(array, bucketSize) {
  let start=Date.now();

    let bars = document.getElementsByClassName("bar");
    if (array.length === 0) {
        return array;
    }

    var i,
        minValue = array[0],
        maxValue = array[0],
        bucketSize = bucketSize || 5;


    array.forEach(function (currentVal) {
        if (currentVal < minValue) {
            minValue = currentVal;
        } else if (currentVal > maxValue) {
            maxValue = currentVal;
        }
    });
    var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    var allBuckets = new Array(bucketCount).fill(0);

    for (i = 0; i < allBuckets.length; i++) {
        allBuckets[i] = [];
    }
   
    array.forEach(function (currentVal) {
      
        allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(
            currentVal
        );
    });

    array.length = 0;
    for (let i = 0; i < allBuckets.length; i++) {
        await insertionSort(allBuckets[i]);
        for (let j = 0; j < allBuckets[i].length; j++) {
            let index = array.push(allBuckets[i][j]) - 1;
            bars[index].style.height = array[index] * heightFactor + "px";
            bars[index].style.backgroundColor = "#0040FF";
            bars[index].innerText=array[index]
            await sleep(speedFactor);
            bars[index].style.backgroundColor = "lightgreen";
        }
    }
    for(let i=0;i<array.length;i++)
    {
        bars[i].innerText=array[i];
    }
    let end = Date.now();
    let time = ((end - start)/1000).toPrecision(3);
    let t = document.getElementById('answer');
    t.innerText = time;
    return array;
}
let sortbtn=document.getElementById("sort_btn");
  sortbtn.addEventListener("click",()=>{
      bucketSort(unsorted_array,5);
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