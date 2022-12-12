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
let sortbtn=document.getElementById("sort_btn");
  sortbtn.addEventListener("click",()=>{
    let bars = document.getElementsByClassName("bar");
    document.getElementById("sort_btn").disabled = true;
  document.getElementById("randomize_array_btn").disabled = true;
  document.getElementById("speed").disabled = true;
  document.getElementById("slider").disabled = true;
      bookQuickSort(bars,0,numOfBars-1, Math.floor(unsorted_array.length/2));
      document.getElementById("sort_btn").disabled = false;
  document.getElementById("randomize_array_btn").disabled = false;
  document.getElementById("speed").disabled = false;
  document.getElementById("slider").disabled = false;
  
  }) 

  function swap(bar1, bar2) {    
    let temp = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = temp;
  
    let temp2 = bar1.innerText;
    bar1.innerText = bar2.innerText;
    bar2.innerText = temp2;
    // console.log(temp2)
    
  }

  async function insertionSort(ele, low, high){
    // ele[0].style.background = 'green';
    for(let i = low + 1; i < high + 1; i++){
        let j = i - 1;
        let key = ele[i].style.height;
        ele[i].style.background = 'blue';

        await sleep(speedFactor);

        while(j >= 0 && (parseInt(ele[j].style.height) > parseInt(key))){

            ele[j].style.background = 'blue';
            ele[j + 1].style.height = ele[j].style.height;
            j--;

            await sleep(speedFactor);

            for(let k = i; k >= 0; k--){
                ele[k].style.background = 'green';
            }
        }
        ele[j + 1].style.height = key;
        ele[i].style.background = 'green';
    }
}

async function partitionBook(ele, l, r){
    let i = l - 1;
    ele[r].style.background = 'cyan'; //pivot
    for(let j = l; j <= r - 1; j++){

        ele[j].style.background = 'yellow'; //current element
        await sleep(speedFactor);

        if(parseInt(ele[j].style.height) < parseInt(ele[r].style.height)){
            i++;
            swap(ele[i], ele[j]);
            // color 
            ele[i].style.background = 'orange';
            if(i != j) ele[j].style.background = 'orange';
            // pauseChamp
            await sleep(speedFactor);
        }
        else{
            // color if not less than pivot
            ele[j].style.background = 'pink';
        }
    }
    i++; 
    await sleep(speedFactor);
    swap(ele[i], ele[r]);
    // color
    ele[r].style.background = 'pink';
    ele[i].style.background = 'green';

  
    await sleep(speedFactor);
   
    
    // color
    for(let k = 0; k < ele.length; k++){
        if(ele[k].style.background != 'green')
            ele[k].style.background = '#e43f5a';
    }

    return i;
}

async function bookQuickSort(ele, l, r, k){
  // let start = Date.now();
  let start = Date.now();

    if(l < r){
        if (r - l + 1 < k){
            insertionSort(ele, l, r);
        }
        else{
            let pivot_index = await partitionBook(ele, l, r);
            await bookQuickSort(ele, l, pivot_index - 1);
            await bookQuickSort(ele, pivot_index + 1, r);
        }
    }
    else{
        if(l >= 0 && r >= 0 && l <ele.length && r <ele.length){
            ele[r].style.background = 'green';
            ele[l].style.background = 'green';
        }
    }
    let end = Date.now();
    let time = ((end - start)/1000).toPrecision(3);
    let t = document.getElementById('answer');
    t.innerText = time;
}

// async function swap(items, leftIndex, rightIndex, bars) {
//   var temp = items[leftIndex];
//   items[leftIndex] = items[rightIndex];
//   items[rightIndex] = temp;
//   bars[leftIndex].style.height = items[leftIndex] * heightFactor + "px";
//   bars[leftIndex].style.backgroundColor = "lightgreen";
//   bars[leftIndex].innerText = items[leftIndex];
//   bars[rightIndex].style.height = items[rightIndex] * heightFactor + "px";
//   bars[rightIndex].style.backgroundColor = "lightgreen";
//   bars[rightIndex].innerText = items[rightIndex];
//   await sleep(speedFactor);
// }

  // async function InsertionSort(array, l , r) {
  //   document.getElementById("sort_btn").disabled = true;
  //   document.getElementById("randomize_array_btn").disabled = true;
  //   document.getElementById("speed").disabled = true;
  //   document.getElementById("slider").disabled = true;
  //     let bars = document.getElementsByClassName("bar");
  //     for (let i = l + 1; i < r + 1; i++) {
  //       let key = array[i];
  //       let j = i - 1;
  //       while (j >= 0 && array[j] > key) {
  //         array[j + 1] = array[j];
  //         bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
  //         bars[j + 1].style.backgroundColor = "red";
  //         bars[j + 1].innerText = array[j + 1];   
  //         await sleep(speedFactor);
    
  //         for (let k = 0; k < bars.length; k++) {
  //           if (k != j + 1) {
  //             bars[k].style.backgroundColor = "aqua";
  //           }
  //         }
  //         j = j - 1;
  //       }
  //       array[j + 1] = key;
  //       bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
  //       bars[j + 1].style.backgroundColor = "lightgreen";
  //       bars[j + 1].innerText = array[j + 1];
  //       await sleep(speedFactor);
  //     }
    
  //     for (let k = 0; k < bars.length; k++) {
  //       bars[k].style.backgroundColor = "aqua";
  //     }
  //     document.getElementById("sort_btn").disabled = false;
  //     document.getElementById("randomize_array_btn").disabled = false;
  //     document.getElementById("speed").disabled = false;
  //     document.getElementById("slider").disabled = false;
  //     return array;
  //   }

  // async function partition(items, left, right) {
  //   let bars = document.getElementsByClassName("bar");
  //   let pivotIndex = Math.floor((right + left) / 2);
  //   var pivot = items[pivotIndex]; //middle element
  //   bars[pivotIndex].style.backgroundColor = "red";
  
  //   for (let i = 0; i < bars.length; i++) {
  //     if (i != pivotIndex) {
  //       bars[i].style.backgroundColor = "aqua";
  //     }
  //   }
  
  //   (i = left), //left pointer
  //     (j = right); //right pointer
  //   while (i <= j) {
  //     while (items[i] < pivot) {
  //       i++;
  //     }
  //     while (items[j] > pivot) {
  //       j--;
  //     }
  //     if (i <= j) {
  //       await swap(items, i, j, bars); //sawpping two elements
  //       i++;
  //       j--;
  //     }
  //   }
  //   return i;
  // }
  
  // async function quickSort(items, left, right, k) {
  //   document.getElementById("sort_btn").disabled = true;
  // document.getElementById("randomize_array_btn").disabled = true;
  // document.getElementById("speed").disabled = true;
  // document.getElementById("slider").disabled = true;
  //   var index;
  //   let bars = document.getElementsByClassName("bar");
  //   if (items.length > 1) {
  //     if (right - left + 1 < k){
  //       insertionSort(ele, l, r);
  //     }
  //     else{
  //       index = await partition(items, left, right); //index returned from partition
  //       if (left < index - 1) {
  //         //more elements on the left side of the pivot
  //         await quickSort(items, left, index - 1);
  //       }
  //       if (index < right) {
  //         //more elements on the right side of the pivot
  //         await quickSort(items, index, right);
  //       }
  //     }

  //   }
  
  //   for (let i = 0; i < bars.length; i++) {
  //     bars[i].style.backgroundColor = "aqua";
  //   }
    
  //   return items;
  // }   

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
