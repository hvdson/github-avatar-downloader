var request = require('request');
var accessToken = require("./secrets").GITHUB_TOKEN;
var fs = require("fs");
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
      var parseBody = JSON.parse(body);
      cb(err, parseBody);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on("error", (err) => {
    throw err;
  })
  .on('response', (response) => {
    console.log('Response Status Code: ', response.statusCode);
  })
  .pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", (err, result) => {
  // callback rn loops through what is given
  for (var i = 0; i < result.length; i++) {
    var contributor = result[i];
    downloadImageByURL(contributor.avatar_url, "avatars/" + contributor.login + ".jpg");
  }
  // console.log("Errors:", err);
  // console.log("Result:", result);
});
