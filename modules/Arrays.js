exports.sortArrayNumbers = function(arr, sortArr) { // Функция удаляет из массива с телефонами ненужную строчку ACCESS_NUMBER и добаввляет это в новый массив phoneSplittedNumbers
   arr.forEach((item) => {
      sortArr.push(item.split(':'));
   })

   sortArr.forEach((item, index) => {
      sortArr[index].shift();
   })
};