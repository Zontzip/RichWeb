import {Observable} from 'rxjs/Rx';

/**
 * Get key clicks.
 */
const buttons = document.querySelectorAll(".flex-item");
const expresion$ = Observable.merge (
  Observable.fromEvent(buttons, 'click')
    .map(e => e.target.innerHTML),
  Observable.fromEvent(document, 'keyup')
    .map(e => e.key)
)

const display = document.querySelector("input[type=text]");
const out$ = expresion$
  .scan((prev, curr) => {
    if (curr === 'C') {
      for(var i = 0; i < buttons.length; i++)
          buttons[i].disabled = false;
      return '';
    }
    else if (curr === '=') {
      try {
        return eval(prev);
      } catch (err) {
        return 'Error';
      }
    }
    else {
      if (curr === 'x')
        curr = curr.replace(/x/g, "*");
      else if (curr === '÷')
        curr = curr.replace(/÷/g, "/");
      return prev+curr;
    }
  });

out$.subscribe(function(x) {
  if (x === 'Error') {
    for(var i = 0; i < buttons.length; i++) {
      if (buttons[i].innerHTML !== 'C')
        buttons[i].disabled = true;
    }
    console.log('Error has occured');
  }
  display.value = x;
  },
  function (err) {
    console.log('Error: ' + err);
  }
);
