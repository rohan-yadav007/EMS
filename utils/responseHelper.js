import {base_url} from 'react-native-dotenv';

const fetch = require('node-fetch');

export const Get = async getUrl => {
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
