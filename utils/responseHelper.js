const base_url = require('./baseUrl').base_url;
const fetch = require('node-fetch');
const Get = getUrl => {
  const url = base_url.concat(getUrl);
  console.log(url);
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    });
};

Get('hello');
