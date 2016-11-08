const userURL = "https://api.github.com/users/";
const testUser = "zontzip";

var searchButton = document.querySelector("button[type=submit]");

var repoList = document.getElementById("ul-repos");

var options = {
  method : 'GET',
  headers:[
    {name: "Content-Type", value: "application/json"}
  ]
 };

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

searchButton.onclick = function(e) {
  var input = document.querySelector("input[type=text]").value;
  if (input != '') {
    // Clear child nodes of the repo list
    while (repoList.firstChild) {
      repoList.removeChild(repoList.firstChild);
    }
  
    fetch(userURL + input, options).then(function(data) {
      let json = JSON.parse(data);
      setProfileImage(json.avatar_url);
      setProfileName(json.name);
      setProfileUsername(json.login);
      setProfileEmail(json.email);
      setProfileLocation(json.location);
      setProfileGists(json.public_gists);
      getRepos(json.repos_url);
    }, function(err) {
      //console.log(err);
      console.log("The request has failed!");
      window.location = "error.html";
    });
  }
}

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
    let nameNode = document.createElement("div");
    let descNode = document.createElement("div");
    repoList.appendChild(newRepoItem);
    newRepoItem.appendChild(nameNode);
    newRepoItem.appendChild(descNode);
    nameNode.innerHTML = "Name: " + name;
    descNode.innerHTML = "Description: " + description;
}

function setProfileImage(url) {
  document.getElementById("profile-image").src = url;
}
function setProfileName(name) {
  document.getElementById("li-name").innerHTML = "Name: " + name;
}
function setProfileUsername(username) {
  document.getElementById("li-username").innerHTML = "Username: " + username;
}
function setProfileEmail(email) {
  document.getElementById("li-email").innerHTML = "Email: " + email;
}
function setProfileLocation(location) {
  document.getElementById("li-location").innerHTML = "Location: " + location;
}
function setProfileGists(public_gists) {
  document.getElementById("li-no-of-gists").innerHTML = "Number of Gists: " + public_gists;
}