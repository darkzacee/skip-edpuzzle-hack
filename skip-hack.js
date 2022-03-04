let start = document.location.href.search("/assignments/") + 13;
let end = document.location.href.search("/watch");
let assignmentId = document.location.href.slice(start,end);

let getAttempt = () => {
  return fetch(`https://edpuzzle.com/api/v3/assignments/${assignmentId}/attempt`, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-chrome-version": "85",
      "x-csrf-token": "",
      "x-edpuzzle-referrer": `https://edpuzzle.com/assignments/${assignmentId}/watch`,
      "x-edpuzzle-web-version": __EDPUZZLE_DATA__.version
    },
    "referrer": "https://edpuzzle.com/",
    "referrerPolicy": "strict-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  }).then(re => re.json())
  .then(attemptInfo => attemptInfo._id);
}

for (let i = 0; i < 50; i += 1) {
  getAttempt().then(id => {
    fetch(`https://edpuzzle.com/api/v4/media_attempts/${id}/watch`, {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "pragma": "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-chrome-version": "85",
        "x-csrf-token": "",
        "x-edpuzzle-referrer": `https://edpuzzle.com/assignments/${assignmentId}/watch`,
        "x-edpuzzle-web-version": __EDPUZZLE_DATA__.version
      },
      "referrer": "https://edpuzzle.com/",
      "referrerPolicy": "strict-origin",
      "body": `{\"timeIntervalNumber\":${i}}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });
  })
}
