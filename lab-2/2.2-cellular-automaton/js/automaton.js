// Create container
let container = document.createElement("div");
container.id = "container";
container.style.width = "1010px";
document.body.appendChild(container);

// Create first row 
let row = document.createElement("div");
row.id = "row1";
container.appendChild(row);

// Create initial nodes
for(let i = 0; i < 101; i++) {
	let state = parseInt(Math.random() * 2) ?  true : false;
	let cell = createCell(state);
	cell.className = "cell-row1";
	row.appendChild(cell);
}

for (let i = 2; i < 51; i++) {
	// Create current row div
	let newRow = document.createElement("div");
	let currentRowStr = i;
	newRowStr = "row" + currentRowStr.toString();
	newRow.id = newRowStr;

	// Fetch previous row and add new row as child
	let lastRow = i-1;
	parentRowStr = "row" + lastRow.toString();
	let parentRow = document.getElementById(parentRowStr);
	container.appendChild(newRow);

	// Fetch array of nodes from previous row
	parentColsStr = "cell-row" + lastRow.toString(); 
	var parent = document.getElementsByClassName(parentColsStr);

	for (let j = 0; j < 101; j++) {
		// Check if column is first in row
		if (j === 0) {
			if (parent[parent.length-1].title === "active" && parent[j].title === "active" && parent[j].nextSibling.title === "inactive") {
				var cell = createCell(false);
			} else if (parent[parent.length-1].title === "inactive" && parent[j].title === "active" && parent[j].nextSibling.title === "active") {
				var cell = createCell(false);
			} else if (parent[parent.length-1].title === "inactive" && parent[j].title === "inactive" && parent[j].nextSibling.title === "inactive") {
				var cell = createCell(false);
			} else {
				var cell = createCell(true);
			}
		// Check if column is last in row
		} else if (j === 100) {
			if (parent[j].previousSibling.title === "active" && parent[j].title === "active" && parent[0].title === "inactive") {
				var cell = createCell(false);
			} else if (parent[j].previousSibling.title === "inactive" && parent[j].title === "active" && parent[0].title === "active") {
				var cell = createCell(false);
			} else if (parent[j].previousSibling.title === "inactive" && parent[j].title === "inactive" && parent[0].title === "inactive") {
				var cell = createCell(false);
			} else {
				var cell = createCell(true);
			}
		} else {
			if (parent[j].previousSibling.title === "active" && parent[j].title === "active" && parent[j].nextSibling.title === "inactive") {
				var cell = createCell(false);
			} else if (parent[j].previousSibling.title === "inactive" && parent[j].title === "active" && parent[j].nextSibling.title === "active") {
				var cell = createCell(false);
			} else if (parent[j].previousSibling.title === "inactive" && parent[j].title === "inactive" && parent[j].nextSibling.title === "inactive") {
				var cell = createCell(false);
			} else {
				var cell = createCell(true);
			}
		}
		cellRowStr = "cell-" + newRowStr;
		cell.className = cellRowStr;
		newRow.appendChild(cell);
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
		cell.title = "active";
	} else {
		cell.style.backgroundColor = "white";
		cell.title = "inactive";
	}
	return cell;
}