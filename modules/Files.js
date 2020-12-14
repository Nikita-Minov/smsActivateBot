const fs = require('fs');

exports.createFile = function() { // Создаёт файл для номеров
   fs.open('phoneNumbers.txt', 'w', (err) => {
      if (err) throw err;
      console.log('Файл успешно создан!');
   });
}

exports.addNumbersInFile = function (arrayPhones) { //Добавляет номера из массива в созданный файл
   arrayPhones.forEach(item => {
      fs.appendFile('phoneNumbers.txt', item[1] + '\n', (err) => {
         if (err) throw err;
         console.log("Номер успешно добавлен в phoneNumbers.txt");
      });
   });
}