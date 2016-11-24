import {Observable} from 'rxjs/Rx';

// DOM elements
const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const splitBtn = document.getElementById("split");
const resetBtn = document.getElementById("reset");

var counter = {state: 'INACTIVE', m: 0, s: 0, ms: 0};

function start() {
  console.log('Start');
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

}
const splitBtn$ = Observable.fromEvent(splitBtn, 'click');
splitBtn$.map(split).subscribe();

function reset() {
  counter.state = 'INACTIVE';
  counter. m = 0;
  counter.s = 0;
  counter.ms = 0;
}
const resetBtn$ = Observable.fromEvent(resetBtn, 'click');
resetBtn$.map(reset).subscribe();

const timer$ = Observable.interval(100)
  .map(
    function incr() {
      console.log(counter.state);

      switch(counter.state) {
        case 'ACTIVE':
          counter.ms += 10;

          if(counter.ms >= 100) {
            counter.ms = 0;
            counter.s++;
          }

          if(counter.s >= 60) {
            counter.s = 0;
            counter.m++;
          }
        case 'INACTIVE':
      }
    }
  );

timer$.subscribe(function() {
  display.value = (counter.m + ':' + counter.s + ':' + counter.ms);
});
