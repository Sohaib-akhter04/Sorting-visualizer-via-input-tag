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
async function colorChange(arr, k) {
  bars[k].style.height = arr[k] * heightFactor + "px";
  bars[k].style.backgroundColor = "#0040FF";
  await sleep(speedFactor);
  bars[k].style.backgroundColor = "green";
  return new Promise((resolve) => {
      resolve();
  });
}
let bars = document.getElementsByClassName("bar");

async function merge(arr, left,mid, right)
{
    let n1 = mid-left+1;
    var n2 = right-mid;
 
    let leftTemp=new Array(n1);
    let rightTemp=new Array(n2);
 
    for (let i = 0; i < n1; i++)
        leftTemp[i] = arr[left + i];
        // bars[i].innerText=arr[i]
    for (let j = 0; j < n2; j++)
        rightTemp[j] = arr[mid + 1 + j];
 
    let i=0,j=0,k=left;
 
    while (i < n1 && j < n2) {
        if (leftTemp[i] <= rightTemp[j]) {
            arr[k] = leftTemp[i];
            i++;
            bars[k].innerText=arr[k]
        }
        else {
            arr[k] = rightTemp[j];
            j++;
            bars[k].innerText=arr[k]
        }
        await colorChange(arr,k);
        k++;
        bars[k].innerText=arr[k]
    }
    while (i < n1) {
        arr[k] = leftTemp[i];
        bars[k].innerText=arr[k]
        await colorChange(arr,k);
        i++;
        k++; 
    }
    while (j < n2) {
        arr[k] = rightTemp[j];
        bars[k].innerText=arr[k]
        await colorChange(arr,k);
        j++;
        k++;
    }
    
    return new Promise((resolve)=>{resolve()})
}

async function mergeSort(arr,left, right){
  document.getElementById("sort_btn").disabled = true;
  document.getElementById("randomize_array_btn").disabled = true;
  document.getElementById("speed").disabled = true;
  document.getElementById("slider").disabled = true;
  let start=Date.now();
    if(left>=right){
        return;
    }
    var mid =left+ parseInt((right-left)/2);
    await mergeSort(arr,left,mid);
    await mergeSort(arr,mid+1,right);
    await merge(arr,left,mid,right);
    let end = Date.now();
    let time = ((end - start)/1000).toPrecision(3);
    let t = document.getElementById('answer');
    t.innerText = time;
    return new Promise((resolve)=>{resolve()})
    
}

  let sortbtn=document.getElementById("sort_btn");
  sortbtn.addEventListener("click",()=>{
      
      mergeSort(unsorted_array, 0, unsorted_array.length - 1);
      document.getElementById("sort_btn").disabled = false;
      document.getElementById("randomize_array_btn").disabled = false;
      document.getElementById("speed").disabled = false;
      document.getElementById("slider").disabled = false;
      
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
  