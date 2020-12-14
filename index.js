const requs = require('request');
const numbers = require('./modules/Numbers');

const APIKEY = 'c21740811bb1d980541d8d16A0e18f10'; // Уникальный API, который можно получить на сайте
const SERVICE = 'dp'; // Сервис, для которого покупается номер
const OPERATOR = 'tele2'; // Оператор. По умолчанию - Теле2
const COUNTRY = '0'; // Страна. По умолчанию 0 - Россия
const REPEATS = '2'; // Кол-во номеров для покупки

// registerAccount();

numbers.buyNumber(APIKEY, SERVICE, OPERATOR, COUNTRY, REPEATS);