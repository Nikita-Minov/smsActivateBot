const { count } = require('console');
const requs = require('request');

const APIKEY = 'c21740811bb1d980541d8d16A0e18f10';
const SERVICE = 'vk';
const OPERATOR = 'tele2';
const COUNTRY = '0';

function info(apiKey, country, operator) {
   requs.post(`https://sms-activate.ru/stubs/handler_api.php?api_key=${apiKey}&action=getNumbersStatus&country=${country}&operator=${operator}`, (err, res, body) => {
      console.log('Output ', body);
   })
}

function buyNumber(apiKey, service, operator, country) {
   requs.post(`https://sms-activate.ru/stubs/handler_api.php?api_key=${apiKey}&action=getNumber&service=${service}&forward=0&operator=${operator}&country=${country}&phoneException=7918`, function(err, res, body) {
      console.log(body);
   })
}

buyNumber(APIKEY, SERVICE, OPERATOR, COUNTRY);

info(APIKEY, COUNTRY, OPERATOR);