function fetch(url, options) {
  return new Promise(function(resolve, reject) {

  	// Get the http method before opening connection
    var httpMethod = '';
    if ('method' in options) {
      httpMethod = options.method;
    } else {
      httpMethod = 'GET';
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open(options.method, url);
    
    if ('headers' in options) {
      options.headers.forEach(function(header) {
        xhr.setRequestHeader(header.name, header.value);
      });
    }

    xhr.onload = function() {
      if (xhr.status == 200) {
        resolve(xhr.response);
      } else {
        reject(Error(xhr.statusText));
      }
    };

    xhr.onreadystatechange = function(e) {
      if (this.readyState === 4 && this.status === 200) {
        try {
          console.log('good');
        }
        catch (error) {
          alert("There has been an error");
          console.log(error);
          return false;
        }
        callback();
      }
      else if (this.readyState === 4 && this.status !== 200) {
         console.log('There has been an error');
      }
    };

    // Returns HTTP status, Default OK, 
    xhr.onerror = function() {
      reject(Error(xhr.statusText));
    };

    // Send request
    xhr.send();
  });
}

root = "http://www.example.com/";
todoPath = "todos";

var options = {
  method : 'GET',
  headers:[
    {name: "From", value: "C13451458@mydit.com"},
    {name: "Content-Type", value: "application/json"},
    {name: "Access-Control-Allow-Origin", value: "*"}
  ]
 };

// Make fetch
fetch(root + todoPath, options).then(function(data) {
  var json = JSON.parse(data);
}, function(err) {
  //console.log(err);
  console.log("The request has failed!");
});