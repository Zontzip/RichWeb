function fetch(url, options) {
  return new Promise(function(resolve, reject) {

  	// Get the http method before opening connection
    var httpMethod = '';
    if ('method' in options) {
      httpMethod = options.method;
    } else {
      httpMethod = 'GET';
    }
    
    var req = new XMLHttpRequest();
    req.open(options.method, url);
    
    if ('headers' in options) {
      options.headers.forEach(function(header) {
        req.setRequestHeader(header.name, header.value);
      });
    }

    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    };

    // Default OK, returns HTTP status
    req.onerror = function() {
      reject(Error(req.statusText));
    };

    // Send request
    req.send();
  });
}

root = "http://jsonplaceholder.typicode.com/";
userPath = "users";
todoPath = "todos";

var options = {
  method : 'GET',
  headers:[
    {name: "From", value: "C13451458@mydit.com"},
    {name: "Content-Type", value: "application/json"}
  ]
 };

// Make fetch
fetch(root + todoPath, options).then(function(data) {
  var json = JSON.parse(data);
  let todosCount = getUserTodos(json, 10).length;
  console.log(todosCount);
}, function(err) {
  console.log(err.status);
});

function getUserTodos(json, id) {
  return json.filter(function(user) {
    return user.userId === id;
  });
}