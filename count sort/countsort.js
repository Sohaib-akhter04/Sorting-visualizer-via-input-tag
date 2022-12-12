let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
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

// let algotouse = "";

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
    // bar.innerText=array[i];
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


async function countSort(inputArr) {
    let start=Date.now()
    let bars = document.getElementsByClassName("bar");
    let n = inputArr.length;
    let k = Math.max(...inputArr);
    let t;

    const temp = new Array(k + 1).fill(0);

    for (let i = 0; i < n; i++) {
        t = inputArr[i];
        temp[t]++;
    }
    for (let i = 1; i <= k; i++) {
        temp[i] = temp[i] + temp[i - 1];
    }

    const outputArr = new Array(n).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        let t = inputArr[i];
        outputArr[temp[t] - 1] = t;
        bars[temp[t] - 1].style.height = t * heightFactor + "px";
        bars[temp[t] - 1].style.backgroundColor = "lightgreen";
        bars[temp[t] - 1].innerText= outputArr[temp[t] - 1];
        await sleep(speedFactor);
        bars[temp[t] - 1].style.backgroundColor = "lightgreen";
        temp[t] = temp[t] - 1;
    }
    for(let i=0;i<n;i++)
    {
        bars[i].style.backgroundColor = "lightgreen";
    }
    let end = Date.now();
    let time = ((end - start)/1000).toPrecision(3);
    let s = document.getElementById('answer');
    s.innerText = time;
    return outputArr;
}
let sortbtn=document.getElementById("sort_btn");
sortbtn.addEventListener("click",()=>{
    countSort(unsorted_array);
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