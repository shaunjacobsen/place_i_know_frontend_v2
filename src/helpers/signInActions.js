import axios from 'axios';

export const getAuthTokenDetails = token => {
  return new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          'x-auth': token,
        },
      };
      let response = await axios.get('//localhost:9292/token', config);
      resolve(response.data);
    } catch (e) {
      reject();
    }
  });
};
