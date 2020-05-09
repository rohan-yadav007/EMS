import { base_url } from 'react-native-dotenv';

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

export const GET_API = async getUrl => {
  const url = getUrl;

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
  // console.log(url);
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

// export const POST_FORM = async (posturl, data) => {
//   const url = `${base_url.concat(posturl)}`;
//   const Data = JSON.stringify(data);
//   const ResponseData = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'content-type': 'multipart/form-data',
//     },
//     body: Data,
//   })
//     .then(response => response.json())
//     .catch(error => console.log(error));
//   return ResponseData;
// };

export const POST_FORM = async (posturl, data) => {
  console.log('called :>> ');
  const url = `http://iiris.mindztechnology.com/Areas/Admin/CreateProject/asdf/Task/`;
  let options = {
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // },
    method: 'POST'
  };

  options.body = new FormData();
  for (let key in data) {
    options.body.append(key, data[key]);
  }
  delete options.headers['Content-Type'];
  console.log('options',options);
  const ResponseData = await fetch(url, options)
    .then(response => response.json())
    .catch(error => console.log(error));
  return ResponseData;
}