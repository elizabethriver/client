const axios = require('axios').default;

export const login = async (email, password) => {
  try {
    const data = {
      email,
      password
    }
    console.log(data, "api")
    const response = await axios.post('https://mywalletapicenter.herokuapp.com/login', data);
    // handle success
    console.log(response, "api")
    return response
  } catch (error) {
    // handle error
    console.log(error)
    return error
  }
}


