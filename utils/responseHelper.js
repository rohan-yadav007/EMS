import {base_url} from 'react-native-dotenv';

const fetch = require('node-fetch');

export const GET = async getUrl => {
  const url = `${base_url.concat(getUrl)}`;

  const data = await fetch(url)
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
  return data;
};

export const POST = async (posturl, data) => {
  const url = `${base_url.concat(posturl)}`;
  const Data = JSON.stringify(data);
  const ResponseData = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: Data,
  })
    .then(response => response.json())
    .catch(error => console.log(error));
  return ResponseData;
};
