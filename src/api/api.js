const axios = require('axios').default;

export const login = async () => {
  try {
    const data = {
      email: 'prueba8@gmail.com',
      password: '7777'
    }
    const response = await axios.post('https://mywalletapicenter.herokuapp.com/login', data);
    // handle success
    return response
  } catch (error) {
    // handle error
    return error
  }
}


