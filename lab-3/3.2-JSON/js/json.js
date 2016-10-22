root = "http://jsonplaceholder.typicode.com/"
userpath = "users";

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
 if (xhr.readyState === XMLHttpRequest.DONE) {
 	if (xhr.status === 200) {
		response = JSON.parse(xhr.responseText); 
		var usernameArray = Object.keys(response).map(function(key) {
			return response[key].username;
		});
		var geoArray = Object.keys(response).map(function(key) {
			let lat = {lat: response[key].address.geo.lat + ', ' + response[key].address.geo.lng};
			return lat;
		});
		var userArray = Object.keys(response).map(function(key) {
			let user = [{name: response[key].name}, {id: response[key].id}, 
						{companyname: response[key].company.name}, {zip: response[key].address.zipcode}];
			return user;
		});
		var addressZip5 = Object.keys(response).filter(function(key) {
			return response[key].address.zipcode.charAt(0) === '5';
		}).map(function(key) {
				return response[key].address;
		});

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