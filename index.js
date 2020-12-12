const requs = require('request');
const fs = require('fs');

const APIKEY = 'c21740811bb1d980541d8d16A0e18f10'; // Уникальный API, который можно получить на сайте
const SERVICE = 'dp'; // Сервис, для которого покупается номер
const OPERATOR = 'tele2'; // Оператор. По умолчанию - Теле2
const COUNTRY = '0'; // Страна. По умолчанию 0 - Россия
const REPEATS = '2'; // Кол-во номеров для покупки

const phoneNumbers = [];// Массив с номерами телефонов
const phoneSplittedNumbers = []; // Массив без строки ACCESS_NUMBER. 1 элемент - ID покупки, 2 элемент - номер телефона


function buyNumber(apiKey, service, operator, country, repeat) { // Функция покупает номер с заданными параметрами
   for(let i = 0; i < repeat; i++) {
      requs.post(`https://sms-activate.ru/stubs/handler_api.php?api_key=${apiKey}&action=getNumber&service=${service}&operator=${operator}&country=${country}`, function (error, response, body) {
            switch(body) { // Обработка ошибок запроса
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
               default:
                  console.log(body);
                  phoneNumbers.push(body);
                  console.log(phoneNumbers);
                  sortArrayNumbers(phoneNumbers, phoneSplittedNumbers);
                  console.log(phoneSplittedNumbers);
                  addNumbersInFile(phoneSplittedNumbers);
            }
      });
   }
}

function sortArrayNumbers(arr, sortArr) { // Функция удаляет из массива с телефонами ненужную строчку ACCESS_NUMBER и добаввляет это в новый массив phoneSplittedNumbers
   arr.forEach((item) => {
   sortArr.push(item.split(':'));
   })

   sortArr.forEach((item, index) => {
   sortArr[index].shift();
   })
};

function createFile() { // Создаёт файл для номеров
   fs.open('phoneNumbers.txt', 'w', (err) => {
      if(err) throw err;
      console.log('Файл успешно создан!');
   });
}

function addNumbersInFile (arrayPhones) { //Добавляет номера из массива в созданный файл
   arrayPhones.forEach(item => {
      fs.appendFile('phoneNumbers.txt', item[1] + '\n', (err) => {
         if (err) throw err;
         console.log("Номер успешно добавлен в phoneNumber.txt");
      });
   });
}


buyNumber(APIKEY, SERVICE, OPERATOR, COUNTRY, REPEATS);