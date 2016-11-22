import {Observable} from 'rxjs/Rx';

// DOM elements
const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const splitBtn = document.getElementById("split");
const resetBtn = document.getElementById("reset");

// Clock stuff
const start = (acc) => {return {value: acc.value + 1, state: true}}
const stop = (acc) => {return {state: false}}
const split = (acc) => {return {}}
const reset = (acc) => {return {value: 0, state: false}}
const incr = (acc) => {return {value: acc.value + 1}}

const timer = Observable.interval(1000);
let counter = {value: 0, state: false};

const button$ = Observable.merge(
  Observable.fromEvent(startBtn, 'click').mapTo(start),
  Observable.fromEvent(stopBtn, 'click').mapTo(stop),
  Observable.fromEvent(splitBtn, 'click').mapTo(split),
  Observable.fromEvent(resetBtn, 'click').mapTo(reset),
  timer.mapTo(incr)
)

button$
  .scan((acc, update) => update(acc), counter)
  .subscribe(function(counter) {
    if (counter.state == true) {
      display.innerHTML = counter.value;
    } else {
      display.innerHTML = 0;
    }
  });
