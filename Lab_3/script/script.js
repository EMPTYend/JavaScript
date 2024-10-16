const formEl = document.querySelector("#transactionForm");
const amountEl = document.querySelector("#amount");
const categoryEl = document.querySelector("#category");
const descriptionEl = document.querySelector("#description");
const formButtonEl = document.querySelector("#addTransactionBtn");
const totalEl = document.querySelector("#totalAmount");
const tableEl = document.querySelector("#transactionsTable");
const infoEl = document.querySelector("#info");

let nextID = BigInt(1);

function Transaction(amount, category, description) {
  this.id = nextID;
  nextID++;
  let date = new Date();
  this.date = date.toDateString();
  this.amount = amount;
  this.category = category;
  this.description = description;
}

const transactions = [];

function calculateTotal() {
  let total = 0;
  for (let i = 0; i < transactions.length; i++) {
    total += +transactions[i].amount;
  }
  totalEl.innerHTML = `Общая сумма: ${total}`;
}

function indicateError(el) {
  el.style.border = "1px solid red";
}

function validateData(amount, category, description) {
  if (isNaN(amount) || amount.length === 0) {
    alert("Сумма должна быть числом");
    indicateError(amountEl);
    return false;
  }

  if (!(category !== "food" || category !== "clothes" || category !== "cars")) {
    alert("Категория должна быть 'еда', 'одежда' или 'транспорт'");
    indicateError(categoryEl);
    return false;
  }

  if (!description || description.length === 0) {
    alert("Описание не должно быть пустым");
    indicateError(descriptionEl);
    return false;
  }

  amountEl.style.border = "";
  categoryEl.style.border = "";
  descriptionEl.style.border = "";

  return true;
}

function displayTransaction(transaction) {
    let description = transaction.description;
    let descriptionSplit = description.split(" ");
    let firstFourWords = descriptionSplit.slice(0, 4).join(" ");
    let tableInner = tableEl.innerHTML;
  let inputText = `
  <tr>
    <td>${transaction.id}</td>
    <td>${transaction.amount}</td>
    <td>${transaction.date}</td>
    <td>${transaction.category}</td>
    <td>${firstFourWords}</td>
    <td><button name="delete" id="btn ${transaction.id}">Удалить</button></td>
  </tr>
  </tbody>
  `;
  tableInner = tableInner.replace("</tbody>", inputText);
  tableEl.innerHTML = tableInner;

  if (transaction.amount < 0) {
    tableEl.lastElementChild.lastElementChild.style.backgroundColor = "red";
  } else if (transaction.amount > 0) {
    tableEl.lastElementChild.lastElementChild.style.backgroundColor = "green";
  }
}

function addTransaction() {
  let amount = amountEl.value;
  let category = categoryEl.value.toLowerCase();
  let description = descriptionEl.value;

  if (!validateData(amount, category, description)) {
    return;
  }
  amount = +amount + 0.0;

  const newTransaction = new Transaction(amount, category, description);
  transactions.push(newTransaction);
  formEl.reset();
  displayTransaction(newTransaction);
  calculateTotal();
}

function eventTransaction(event) {
  if (event.target === event.target.closest("#transactionsTable")) {
    console.log("table");
    return;
  } else if (event.target.closest("tr").children[0].innerText === "ID") {
    console.log("HELLO");
  }

  if (event.target.tagName === "BUTTON") {
    const row = event.target.parentElement.parentElement.outerHTML;
    tableEl.innerHTML = tableEl.innerHTML.replace(row, "");
    let id = event.target.id.split(" ")[1];
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].id == id) {
        transactions.splice(i, 1);
      }
    }
    infoEl.innerText = "";
    calculateTotal();
  } else if (event.target.closest("tr")?.children[0].innerHTML !== "ID") {
    let id = event.target.closest("tr").children[0].innerHTML;
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].id == id) {
        infoEl.innerText = transactions[i].description;
      }
    }
  }
}

formButtonEl.addEventListener('click', addTransaction);
tableEl.addEventListener('click', eventTransaction);
