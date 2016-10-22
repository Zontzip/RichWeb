root = "http://jsonplaceholder.typicode.com/"

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
 if (xhr.readyState === XMLHttpRequest.DONE) {
 	if (xhr.status === 200) {
		response = JSON.parse(xhr.responseText);
	} else {
		console.log('Error ' + xhr.statusText);
	} 
 }
};
xhr.open("GET", root + "users");
xhr.send();