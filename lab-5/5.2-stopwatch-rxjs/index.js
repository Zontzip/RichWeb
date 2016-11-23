import {Observable} from 'rxjs/Rx';

// DOM elements
const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const splitBtn = document.getElementById("split");
const resetBtn = document.getElementById("reset");

var counter = {m: 0, s: 0, ms: 0, state: false};

function start() {
  console.log('Start');
  counter.state = true;
}

const buttons$ = Observable.merge(
  Observable.fromEvent(startBtn, 'click').mapTo(start),
  Observable.fromEvent(stopBtn, 'click').mapTo(start),
  Observable.fromEvent(splitBtn, 'click').mapTo(start),
  Observable.fromEvent(resetBtn, 'click').mapTo(start)
)

const startBtn$ = Observable.fromEvent(startBtn, 'click');

startBtn$.map(start).subscribe();

const timer$ = Observable.interval(1)
  .map(
    function incr() {
      console.log(counter.state);
      if (counter.state === true)
        counter.ms++;

        if(counter.ms >= 1000) {
          counter.ms = 0;
          counter.s++;
        }

        if(counter.s >= 60) {
          counter.s = 0;
          counter.m++;
        }
    }
  );

timer$.subscribe(
  x => {
    console.log(counter.m + ':' + counter.s + ':' + counter.ms);
  }
);
