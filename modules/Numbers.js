const requs = require('request');
const arrs = require('./Arrays');
const files = require('./Files');

const phoneNumbers = [];// Массив с номерами телефонов
const phoneSplittedNumbers = []; // Массив без строки ACCESS_NUMBER. 1 элемент - ID покупки, 2 элемент - номер телефона

exports.buyNumber = function(apiKey, service, operator, country, repeat) { // Функция покупает номер с заданными параметрами
   for (let i = 0; i < repeat; i++) {
      requs.post(`https://sms-activate.ru/stubs/handler_api.php?api_key=${apiKey}&action=getNumber&service=${service}&operator=${operator}&country=${country}`, function (error, response, body) {
         switch (body) { // Обработка ошибок запроса
            case 'NO_BALANCE':
               console.log('Недостаточно денег на балансе!');
               break;
            case "BAD_SERVICE":
               console.log("Некорректный сервис!");
               break;
            case "BAD_KEY":
               console.log("Неверный API-ключ!");
               break;
            case "ERROR_SQL":
               console.log("Ошибка SQL сервера!");
               break;
            case "NO_NUMBERS":
               console.log("Нет номеров с такими характеристиками!");
               break;
            default:
               console.log(body);
               phoneNumbers.push(body);
         }
      });
   }
   setTimeout(() => { // Чтобы не работать с ассинхронностью(Костыль)
      console.log(phoneNumbers);
      arrs.sortArrayNumbers(phoneNumbers, phoneSplittedNumbers);
      console.log(phoneSplittedNumbers);
      files.addNumbersInFile(phoneSplittedNumbers);
   }, 3000)
};

module.exports.phoneNumbers = phoneNumbers;
module.exports.phoneSplittedNumbers = phoneSplittedNumbers;