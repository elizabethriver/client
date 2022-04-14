const axios = require('axios').default;

export const login = async (email, password) => {
  try {
    const data = {
      email,
      password
    }
    const response = await axios.post('https://mywalletapicenter.herokuapp.com/login', data);
    // handle success
    return response
  } catch (error) {
    // handle error
    return error
  }
}


