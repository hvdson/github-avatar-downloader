var request = require('request');
var accessToken = require("./secrets").GITHUB_TOKEN;
console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url:  "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      "Authorization": accessToken
    }
  };

  request(options, (err, res, body) => {
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", (err, result) => {
  console.log("Errors:", err);
  console.log("Result:", result);
});
