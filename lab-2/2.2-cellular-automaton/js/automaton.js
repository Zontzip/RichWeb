// Create initial nodes
for(let row = 0; row < 101; row++) {
	var state = parseInt(Math.random() * 2) ?  true : false;
	var cell = createCell(state);
	cell.id = "initial_node";
	document.body.appendChild(cell);
}


for (let row = 0; row < 101; row++) {
	let parent = document.getElementsByClassName("initial_nodes")[row];
	if (parent.style.backgroundColor = "black") {
		parent.appendChild(createCell(true));
	} else {
		parent.appendChild(createCell(false));
	}
}

function createCell(state) {
	let cell = document.createElement("div");
	cell.style.border = "thin solid grey";
	cell.style.width = "8px";
	cell.style.height = "8px"; 
	cell.style.float = "left";
	if (state === true) {
		cell.style.backgroundColor = "black";
	} else {
		cell.style.backgroundColor = "white";
	}
	return cell;
}