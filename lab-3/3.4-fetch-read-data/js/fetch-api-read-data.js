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

    // Send request
    xhr.send();
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
  console.log(getUserTodos(json, 10).length);
  console.log(getTodosDesc(json));
}, function(err) {
  console.log(err.status);
});

function getUserTodos(json, id) {
  return json.filter(function(user) {
    return user.userId === id;
  });
}

function getTodosDesc(json) {
  var unCompleted = [];
  var total = 0;
  var userId = 0;
  
  json
  .filter(function(user) {
    return user.completed === false;
  })
  .reduce(function(previous, current) {
    if (previous.userId == current.userId){
      total = total + 1;
      userId = current.userId;
      return (previous, current);
    } else {
      unCompleted.push({userId: userId, total: total});
      total = 0;
      return (previous, current);
    }
  });

  return unCompleted.sort();
}