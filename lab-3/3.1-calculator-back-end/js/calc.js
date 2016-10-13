var buttons = document.querySelectorAll(".flex-item");
var screen = document.querySelector("input[type=text]");

var characters = ["(", ")", "±", "÷", "7", 
                  "8", "9", "x", "4", "5", 
                  "6", "-", "1", "2", "3", 
                  "+", "0", ".", "C", "="];

function Compute(btnValue) {
  var screenValue = screen.value;

  if(btnValue == "C") {
      screen.value = '';
    } 
    else if(btnValue == "=") {
      var equation = screenValue;

      if (equation.includes("x")) {
        equation = equation.replace(/x/g, "*");
      }

      if (equation.includes("÷")) {
        equation = equation.replace(/÷/g, "/");
      }

      screen.value = eval(equation);
    }
    else {
      screen.value += btnValue;
    }
}

// Add on click events
for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function(e) {
    Compute(this.innerHTML);
  }
}

document.onkeypress = function(e) {
  var input = String.fromCharCode(e.keyCode);

  if (characters.indexOf(input) > -1) {
    Compute(input);
  }
}