import axios from 'axios';

export const getAuthTokenDetails = token => {
  return new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          'x-auth': token,
        },
      };
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/token`, config);
      resolve(response.data);
    } catch (e) {
      reject();
    }
  });
};
