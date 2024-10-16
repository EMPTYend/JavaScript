class TransactionAnalyzer
{
  allTransactions = [{}];
/**
 * Конструктор TransactionAnalyzer.
 * @constructor
 * @param {Array} transactions - Список объектов, представляющих транзакции.
 */
  constructor(transactions){
    this.allTransactions = transactions;
    this.allTransactions.forEach(obj => {
      obj.string = function() {
          return JSON.stringify(obj);
      };
    });
  }
/**
 * Добавляет объект транзакции в список всех транзакций.
 * @param {Object} transaction - Объект транзакции для добавления.
 */
  addTransaction(transaction){
    this.allTransactions.push(transaction);
  }
/**
 * 
 * @returns список объектов, представляющих транзакции
 */
  getAllTransaction(){
    return this.allTransactions
  }
/**
 * 
 * @returns список строк, которые представляют типы транзакций
 */
getUniqueTransactionType() {
  const uniqueTypes = {};
  this.allTransactions.forEach((obj) => {
      uniqueTypes[obj.transaction_type] = true;
  });
  return Object.keys(uniqueTypes);
}

/**
 * 
 * @returns сумма всех сумм транзакций
 */
  calculateTotalAmount(){
    let totalAmount = 0;
    this.allTransactions.forEach((obj)=>totalAmount+=obj.transaction_amount)
    return totalAmount;
  }
/**
 * Параметры могут быть пустыми или null
 * @param {Number} year 
 * @param {Number} month 
 * @param {Number} day 
 * @returns сумма транзакций по указанной дате
 */
  calculateTotalAmountByDate(year=null, month=null, day=null){
    let totalAmount = 0;
    this.allTransactions.forEach((obj)=>{
      if(!year || obj.transaction_date.split('-')[0] == year)
        if(!month || obj.transaction_date.split('-')[1] == month)
          if(!day || obj.transaction_date.split('-')[2] == day){
            totalAmount += obj.transaction_amount;
          }
    });
    return totalAmount;
  }
/**
 * 
 * @param {String} type 
 * @returns список транзакций по указанному типу
 */
  getTransactionByType(type){
    let transByType = [];
    this.allTransactions.forEach((obj)=>{
      if (obj.transaction_type == type){
        transByType.push(obj);
      }
    });
    return transByType;
  }
/**
 * Пример параметра "2019-04-24"
 * @param {string} startDate 
 * @param {string} endDate 
 * @returns список транзакций в указанном диапазоне дат
 */
  getTransactionsInDateRange(startDate, endDate){
    let transByDate = [];
    this.allTransactions.forEach((obj)=>{
      let startDate1 = new Date(...startDate.split('-'));
      let endDate1 = new Date(...endDate.split('-'));
      let transDate = new Date(...obj.transaction_date.split('-'));
      if(transDate >= startDate1 && transDate <= endDate1){
        transByDate.push(obj);
      }
    });
    return transByDate;
  }
/**
 * 
 * @param {string} merchantName 
 * @returns список транзакций указанного мерчанта
 */
  getTransactionsByMerchant(merchantName){
    let transByMerchant = [];
    this.allTransactions.forEach((obj)=>{
      if(merchantName == obj.merchant_name)
        transByMerchant.push(obj);
    });
    return transByMerchant;
  }
/**
 * 
 * @returns находит среднюю сумму денег за транзакцию
 */
  calculateAverageTransactionAmount(){
    return this.calculateTotalAmount()/this.allTransactions.length;
  }
/**
 * 
 * @param {Number} minAmount 
 * @param {Number} maxAmount 
 * @returns список транзакций в указанном диапазоне суммы транзакций
 */
  getTransactionsByAmountRange(minAmount, maxAmount){
    let transByAmount = [];
    this.allTransactions.forEach((obj)=>{
      if(obj.transaction_amount >= minAmount && obj.transaction_amount <= maxAmount )
        transByAmount.push(obj);
    });
    return transByAmount;
  }
/**
 * 
 * @returns сумма сумм дебетовых транзакций
 */
  calculateTotalDebitAmount(){
    let totalDebitSum=0;
    this.allTransactions.forEach((obj)=>{
      if(obj.transaction_type=="debit")
        totalDebitSum+=obj.transaction_amount;
    });
    return totalDebitSum;
  }
/**
 * 
 * @returns номер месяца, в котором произошло наибольшее количество транзакций
 */
  findMostTransactionsMonth(){
    let monthCounterArr = Array(12);
    monthCounterArr.fill(0);
    this.allTransactions.forEach((obj)=>{
      let month = parseInt(obj.transaction_date.split('-')[1]);
      monthCounterArr[month]++;
    });
    return monthCounterArr.indexOf(Math.max(...monthCounterArr));
  }
/**
 * 
 * @returns номер месяца, в котором произошло наибольшее количество дебетовых транзакций
 */
  findMostDebitTransactionMonth(){
    let monthCounterArr = Array(12);
    monthCounterArr.fill(0);
    this.allTransactions.forEach((obj)=>{
      if(obj.transaction_type == "debit"){
        let month = parseInt(obj.transaction_date.split('-')[1]);
        monthCounterArr[month]++;
      }
    });
    return monthCounterArr.indexOf(Math.max(...monthCounterArr));
  }
/**
 * 
 * @returns строку типа, в котором произошло наибольшее количество транзакций
 */
  mostTransactionTypes(){
    let transDebit = 0;
    let transCredit = 0;
    this.allTransactions.forEach((obj)=>{
      if(obj.transaction_type=="debit"){
        transDebit++;
      }
      else{
        transCredit++;
      }
    });
    if(transCredit > transDebit){
      return "credit";
    }
    else if (transCredit < transDebit){
      return "debit";
    }
    else{
      return "equal";
    }
  }
/**
 * 
 * @param {String} date 
 * @returns список транзакций до указанной даты
 */
  getTransactionsBeforeDate(date){
    let transByDate = [];
    this.allTransactions.forEach((obj)=>{
      let endDate1 = new Date(...date.split('-'));
      let transDate = new Date(...obj.transaction_date.split('-'));
      if(transDate < endDate1){
        transByDate.push(obj);
      }
    });
    return transByDate;
  }
/**
 * 
 * @param {string} id 
 * @returns транзакцию, найденную по id
 */
  findTransactionById(id){
    for(let i = 0;i<this.allTransactions.length;i++){
      if(this.allTransactions[i].transaction_id == id){
        return this.allTransactions[i];
      }
    }
  }
/**
 * 
 * @returns список строк, содержащих описание транзакции в объекте транзакции
 */
  mapTransactionDescriptions(){
    let transDescr = [];
    this.allTransactions.forEach((obj)=> transDescr.push(obj.transaction_description));
    return transDescr;
  }
}



const fs = require('fs');
const buf = JSON.parse(fs.readFileSync('transaction.json','utf8'));

const allTransObj = new TransactionAnalyzer(buf);


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayMenu() {
  console.log("1. Все транзакции");
  console.log("2. Уникальные типы транзакций");
  console.log("3. Общая сумма всех транзакций");
  console.log("4. Общая сумма транзакций на определенную дату");
  console.log("5. Транзакции по типу");
  console.log("6. Транзакции в заданном диапазоне дат");
  console.log("7. Транзакции для указанного мерчанта");
  console.log("8. Средняя сумма транзакции");
  console.log("9. Транзакции в заданном диапазоне суммы");
  console.log("10. Месяц с наибольшим количеством дебетовых транзакций");
  console.log("11. Тип транзакций с наибольшим количеством");
  console.log("12. Транзакции до указанной даты");
  console.log("13. Поиск транзакции по ID");
  console.log("14. Описания транзакций");
  console.log("15. Выйти");
}

function handleChoice(choice) {
  switch(choice) {
    case '1':
      console.log(allTransObj.getAllTransaction());
      break;
    case '2':
      console.log(allTransObj.getUniqueTransactionType());
      break;
    case '3':
      console.log(allTransObj.calculateTotalAmount());
      break;
    case '4':
      console.log(allTransObj.calculateTotalAmountByDate(2019, null, 25));
      break;
    case '5':
      console.log(allTransObj.getTransactionByType("credit"));
      break;
    case '6':
      console.log(allTransObj.getTransactionsInDateRange("2019-04-05", "2019-04-10"));
      break;
    case '7':
      console.log(allTransObj.getTransactionsByMerchant("Steakhouse123"));
      break;
    case '8':
      console.log(allTransObj.calculateAverageTransactionAmount());
      break;
    case '9':
      console.log(allTransObj.getTransactionsByAmountRange(50, 60));
      break;
    case '10':
      console.log(allTransObj.findMostDebitTransactionMonth());
      break;
    case '11':
      console.log(allTransObj.mostTransactionTypes());
      break;
    case '12':
      console.log(allTransObj.getTransactionsBeforeDate("2019-01-02"));
      break;
    case '13':
      console.log(allTransObj.findTransactionById("3"));
      break;
    case '14':
      console.log(allTransObj.mapTransactionDescriptions());
      break;
    case '15':
      rl.close();
      return;
    default:
      console.log("Неверный выбор.");
  }

  rl.question('Выберите действие (введите номер): ', (answer) => {
    handleChoice(answer);
  });
}

displayMenu();
rl.question('Выберите действие (введите номер): ', (answer) => {
  handleChoice(answer);
});


