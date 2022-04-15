const axios = require("axios").default;

export const login = async (email, password) => {
  try {
    const data = {
      email,
      password,
    };
    const response = await axios.post(
      "https://mywalletapicenter.herokuapp.com/login",
      data
    );
    // handle success
    return response;
  } catch (error) {
    // handle error
    throw error;
  }
};

export const register = async (name, email, password, confirmPassword) => {
  try {
    const data = {
      name,
      email,
      password,
      confirmPassword,
    };
    const response = await axios.post(
      "https://mywalletapicenter.herokuapp.com/register",
      data
    );
    // handle success
    return response;
  } catch (error) {
    // handle error
    throw error;
  }
};

export const dashboard = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await axios.get(
      "https://mywalletapicenter.herokuapp.com/dashboard",
      config
    );
    return response
  } catch (error) {
    throw error;
  }
};

// export const dashboard = async (token) => {
//   try {
//     const config = {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     };
//     const response = await axios.get(
//       "https://mywalletapicenter.herokuapp.com/dashboard",
//       config
//     );
//     return response
//   } catch (error) {
//     throw error;
//   }
// };

