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

const userURL = "https://api.github.com/users/";

var options = {
  method : 'GET',
  headers:[
    {name: "Content-Type", value: "application/json"}
  ]
 };


var searchButton = document.querySelector("button[type=submit]");

searchButton.onclick = function(e) {
  let input = document.querySelector("input[type=text]").value;
  var repoList = document.getElementById("ul-repos");

  // Clear child nodes of the repo list
  while (repoList.firstChild) {
    repoList.removeChild(repoList.firstChild);
  }

  fetch(userURL + input, options).then(function(data) {
    let json = JSON.parse(data);
    document.getElementById("profile-image").src = json.avatar_url;
    document.getElementById("li-name").innerHTML = json.name;
    document.getElementById("li-username").innerHTML = json.login;
    document.getElementById("li-email").innerHTML = json.email;
    document.getElementById("li-location").innerHTML = json.location;
    document.getElementById("li-no-of-gists").innerHTML = json.public_gists;

    let repoURL = json.repos_url;
    getRepos(repoURL);
  }, function(err) {
    //console.log(err);
    console.log("The request has failed!");
  });

  function getRepos(repoURL) {
    fetch(repoURL, options).then(function(data) {
      var json = JSON.parse(data);

      for (let i = 0; i < 6; i++) {
        addRepoRow(json[i].name, json[i].description)
      }

    }, function(err) {
      //console.log(err);
      console.log("The request has failed!");
    });
  }

  function addRepoRow(name, description) {
    let newRepoItem = document.createElement("li");
    newRepoItem.innerHTML = name + "<br />" + description;
    repoList.appendChild(newRepoItem);
  }
}