const http = require('../utils/http');

const getWeather = async (city) => {
  const data = await http.get('www.tianqiapi.com', `/api?unescape=1&version=v6&appid=33896864&appsecret=BR49xbsH&city=${encodeURI(city)}`);
  // console.log(data);
  return data;
}

module.exports = {
  getWeather,
}