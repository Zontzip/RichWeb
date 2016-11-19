import {Observable} from 'rxjs/Rx';

const buttons = document.querySelectorAll(".flex-item");
const display = document.querySelector("input[type=text]");

let counter = {value: 0};

 const userInput$ = Observable.merge (
   Observable.fromEvent(buttons, 'click'),
   Observable.fromEvent(document, 'keyup')
 )

userInput$.scan((acc) => {
    return {value: acc.value + 1}
  }, counter)
  .subscribe(counter => {
    display.value = counter.value;
});
