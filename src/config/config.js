/*const dotenv = require('dotenv');

dotenv.config();*/
export const config = {
  api: {
    baseURL: process.env.REACT_APP_API_URL
  },
  broker: {
    brokerURL: process.env.REACT_APP_BK_URL,
    url: process.env.REACT_APP_BK_NAME
  }
}
