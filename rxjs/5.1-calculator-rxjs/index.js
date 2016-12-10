import {Observable} from 'rxjs/Rx';

const calcValues = Array.from("0123456789+-x÷±.C=()/");
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
    if(calcValues.includes(curr)) {
      if (curr === 'C') {
        for(var i = 0; i < buttons.length; i++)
            buttons[i].disabled = false;
        return '';
      } else if (curr === '=') {
        try {
          return eval(prev);
        } catch (err) {
          return 'Error';
        }
      } else if(curr === '±') {
        let plusIndex = prev.lastIndexOf('+') ;
        let minusIndex = prev.lastIndexOf('-') ;

        if (plusIndex > minusIndex) {
          prev = prev.substr(0, plusIndex) + '-' + prev.substr(plusIndex + 1);
        } else {
          prev = prev.substr(0, minusIndex) + '+' + prev.substr(minusIndex + 1);
        }
        return prev;
      }
      else {
        if (curr === 'x')
          curr = curr.replace(/x/g, "*");
        else if (curr === '÷')
          curr = curr.replace(/÷/g, "/");
        return prev+curr;
      }
    } else {
      return prev;
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
