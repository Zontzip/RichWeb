import {Observable} from 'rxjs/Rx';

// DOM elements
const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const splitBtn = document.getElementById("split");
const resetBtn = document.getElementById("reset");
const splitList = document.getElementById("ul-splits");

var counter = {state: 'INACTIVE', m: 0, s: 0, ms: 0};

function counterStr() {
  return (counter.m + ':' + counter.s + ':' + counter.ms);
}

function start() {
  counter.state = 'ACTIVE';
}
const startBtn$ = Observable.fromEvent(startBtn, 'click');
startBtn$.map(start).subscribe();

function stop() {
  counter.state = 'INACTIVE';
}
const stopBtn$ = Observable.fromEvent(stopBtn, 'click');
stopBtn$.map(stop).subscribe();

function split() {
  let newRepoItem = document.createElement("li");
  newRepoItem.innerHTML = counterStr();
  splitList.appendChild(newRepoItem);
}
const splitBtn$ = Observable.fromEvent(splitBtn, 'click');
splitBtn$.map(split).subscribe();

function reset() {
  counter.state = 'INACTIVE';
  counter. m = 0;
  counter.s = 0;
  counter.ms = 0;

  var firstChild = splitList.firstChild;

  while (firstChild) {
    splitList.removeChild(firstChild);
    firstChild = splitList.firstChild;
  }
}
const resetBtn$ = Observable.fromEvent(resetBtn, 'click');
resetBtn$.map(reset).subscribe();

const timer$ = Observable.interval(10)
  .map(
    function incr() {
      console.log(counter.state);

      switch(counter.state) {
        case 'ACTIVE':
          splitBtn.disabled = false;

          counter.ms++;

          if(counter.ms >= 100) {
            counter.ms = 0;
            counter.s++;
          }

          if(counter.s >= 60) {
            counter.s = 0;
            counter.m++;
          }
          break;
        case 'INACTIVE':
          splitBtn.disabled = true;
          break;
      }
    }
  );

timer$.subscribe(function() {
  display.value = counterStr();
});

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
setInterval(showClock, 10);

function showClock() {
    var angle;
    var secHandLength = 60;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawClock();

    function drawClock() {
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, secHandLength + 10, 0, Math.PI * 2);
      ctx.strokeStyle = 'grey';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, secHandLength + 7, 0, Math.PI * 2);
      ctx.strokeStyle = 'grey';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 2, 0, Math.PI * 2);
      ctx.lineWidth = 2;
      ctx.fillStyle = 'black';
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }


}
