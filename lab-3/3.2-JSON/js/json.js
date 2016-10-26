root = "http://jsonplaceholder.typicode.com/"
userpath = "users";

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
 if (xhr.readyState === XMLHttpRequest.DONE) {
 	if (xhr.status === 200) {
		response = JSON.parse(xhr.responseText); 
		// Build an array of all user name strings
		var usernameArray = Object.keys(response).map(function(key) {
			return response[key].username;
		});
		// Extract an array of geo objects having the form { lat: -68.6102, -47.0653 }
		var geoArray = Object.keys(response).map(function(key) {
			let lat = {lat: response[key].address.geo.lat + ', ' + response[key].address.geo.lng};
			return lat;
		});
		// For each user, build an array having (in the order given) the following properties (name, id, comp name, zip)
		var userArray = Object.keys(response).map(function(key) {
			let user = [{name: response[key].name}, {id: response[key].id}, 
						{companyname: response[key].company.name}, {zip: response[key].address.zipcode}];
			return user;
		});
		// Build array of street name with zip starting with 5
		var addressZip5 = Object.keys(response).filter(function(key) {
			return response[key].address.zipcode.charAt(0) === '5';
		}).map(function(key) {
				return response[key].address;
		});
		// Get the product of all the user ids
		var total = Object.keys(response).reduce(function(total, num, key) {
		  return total * response[key].id;
		}, 1);
	} else {
		console.log('Error ' + xhr.statusText);
	} 
 }
};
xhr.open("GET", root + userpath);
xhr.send();