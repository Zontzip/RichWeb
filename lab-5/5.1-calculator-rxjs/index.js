import {Observable} from 'rxjs/Rx';

const buttons = document.querySelectorAll(".flex-item");
const display = document.querySelector("input[type=text]");
const incButton = document.getElementById("increment");

let counter = 1;
/**
 * Observe for an event which is a click on the button.
 * $ denotes a stream value.
 */
const inc$ = Observable.fromEvent(incButton, 'click');

/**
 * Subscribe to the stream. This does something when an event arrives on the
 * stream.
 * Args: Takes a function callback containing the event using fat arrow
 * notation.
 */
inc$.subscribe(ev => {
  display.innerHTML = counter++;
});
