const time = document.querySelector("#time");

const startButton = document.querySelector(".controller > #start");
const pauseButton = document.querySelector(".controller > #pause");
const resetButton = document.querySelector(".controller > #end");

const timeBased = 60000;

let timeDuration = timeBased;
let min;
let sec;

function setDisplay() {
  min = Math.floor((timeDuration % (1000 * 60 * 60)) / (1000 * 60)).toString();
  sec = Math.floor((timeDuration % (1000 * 60)) / 1000).toString();

  time.innerHTML = `<div class="timeContainer">
  <h1 style="transform: scale(2, 2)">
    ${min.length < 2 ? 0 + min : min} : ${sec.length < 2 ? 0 + sec : sec}
  </h1>
  </div>
`;
}

setDisplay();
let count;

function timer() {
  count = setInterval(() => {
    min = Math.floor(
      (timeDuration % (1000 * 60 * 60)) / (1000 * 60)
    ).toString();
    sec = Math.floor((timeDuration % (1000 * 60)) / 1000).toString();

    if (timeDuration <= 0) {
      time.innerHTML = `<div class="timeContainer">
    <h1 style="transform: scale(2, 2);">
      Time UP!
    </h1>
  </div>`;

      clearInterval(count);
    } else {
      time.innerHTML = `<div class="timeContainer">
<h1 style="transform: scale(2, 2)">
  ${min.length < 2 ? 0 + min : min} : ${sec.length < 2 ? 0 + sec : sec}
</h1>
</div>
`;
    }

    timeDuration = timeDuration - 1000;
  }, 1000);
}

function start() {
  startButton.classList.add("hidden");
  pauseButton.classList.remove("hidden");
  sessionStorage.setItem("start", true);
  timer();
}

function pause() {
  pauseButton.classList.add("hidden");
  startButton.classList.remove("hidden");
  sessionStorage.clear();
  clearInterval(count);
}

function reset() {
  pauseButton.classList.add("hidden");
  startButton.classList.remove("hidden");

  timeDuration = timeBased;
  setDisplay();

  clearInterval(count);
}
