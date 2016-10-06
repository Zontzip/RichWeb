// Create calculator container
let calculator = document.createElement("div");
calculator.id = "calculator";
calculator.style.width = "250px";
calculator.style.fontStyle = "100%";
calculator.style.border = "1px solid black";
calculator.style.padding = "10px";
calculator.style.borderRadius = "7px";
calculator.style.margin = "0 auto 0 auto";
calculator.style.fontFamily = "Verdana";
document.body.appendChild(calculator);

let input = document.createElement("input");
input.type = "text";
input.placeholder = "0"; 
input.style.fontSize = "2em";
input.style.textAlign = "right"; 
input.style.borderRadius = "5px";
input.style.width = "240px";
input.style.height = "35px";
input.style.marginBottom = "10px";
input.style.padding = "1%";
calculator.appendChild(input);

let flex_container = document.createElement("div");
flex_container.id = "flex-container";
flex_container.style.display = "inline-flex";
flex_container.style.flexFlow = "row wrap";
flex_container.style.justifyContent = "space-between";
calculator.appendChild(flex_container);

var characters = ["(", ")", "±", "÷", "7", 
                  "8", "9", "x", "4", "5", 
                  "6", "-", "1", "2", "3", 
                  "+", "0", ".", "C", "="];

for (let i = 0; i < characters.length; i++) {
  let button = createButton(characters[i]);
  flex_container.appendChild(button);
}

function createButton(character) {
  let button = document.createElement("button"); 
  button.className = "flex-item";
  button.innerHTML = character;
  button.style.fontSize = "1.1em";
  button.style.borderRadius = "5px";
  button.style.width = "50px";
  button.style.textAlign = "center";
  button.style.padding = ".5em";
  button.style.fontSize = "1em";
  button.style.flexGrow = "1";
  button.style.margin = "0 5px 5px 0";
  return button;
}