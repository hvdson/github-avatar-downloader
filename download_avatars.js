var request = require('request');
var accessToken = require("./secrets").GITHUB_TOKEN;
console.log('Welcome to the GitHub Avatar Downloader!');

/*
Step 7: Print each avatar_url

Your next and final step in this exercise should be to change your
getRepoContributors function to parse the JSON string into an object
and pass this object (an array of contributor objects) to the cb function.

You will also need to modify the callback function to iterate over the
results and (for now) console.log the value for each avatar_url in the collection:
*/

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url:  "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      "Authorization": accessToken
    }
  };

  // res is an array of objs b.c node
  request(options, (err, res, body) => {
      var parseString = JSON.parse(body);
      for (let obj of parseString) {
        console.log(obj.avatar_url);
      }
      cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", (err, result) => {
  // console.log("Errors:", err);
  // console.log("Result:", result);
});
