'use strict';

const money = start();
const appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 500000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let addExpenses = prompt(
      'Перечислите возможные расходы за рассчитываемый период через запятую',
      ''
    );
    if (addExpenses) {
      this.addExpenses = addExpenses.toLowerCase().split(',');
    }

    this.deposit = confirm('Есть ли у вас депозит в банке? Если нет - нажмите Отмена');

    for (let i = 0; i < 2; i++) {
      let numExpense = 0;
      let valExpense = prompt('Введите обязательную статью расходов?', '');
      if (valExpense === null) {
        return false;
      } else if (valExpense !== '') {
        do {
          numExpense = prompt('Во сколько это обойдется?', 0);
          this.expenses[valExpense] = Math.abs(numExpense);
        } while (!isNumber(numExpense) && !appData.expenses.hasOwnProperty(valExpense));
      }
    }
  },
  getExpensesMonth: getExpensesMonth,
  getBudget: getBudget,
  getTargetMonth: getTargetMonth,
  getStatusIncome: getStatusIncome,
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

function start() {
  let val;

  do {
    val = prompt('Ваш месячный доход?');
  } while (!isNumber(val) && val !== null);

  return Math.abs(val);
}

function getExpensesMonth() {
  let sum = 0;
  for (let key in appData.expenses) {
    sum += appData.expenses[key];
  }
  appData.expensesMonth = sum;
}

function getBudget() {
  appData.budgetMonth = appData.budget - appData.expensesMonth;

  if (appData.budgetMonth > 0) {
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  } else {
    appData.budgetMonth = 0;
  }
}

function getTargetMonth() {
  if (appData.budgetMonth > 0) {
    appData.period = Math.ceil(appData.mission / appData.budgetMonth);
  } else {
    appData.period = 0;
  }
}

function getStatusIncome() {
  if (appData.budgetDay >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (appData.budgetDay >= 600) {
    return 'У вас средний уровень дохода';
  } else if (appData.budgetDay >= 0) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  }
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

console.log(`Расходы за месяц: ${appData.expensesMonth}`);
console.log(`Цель будет достигнута через: ${appData.period} месяцев`);
console.log(`Уровень дохода: ${appData.getStatusIncome()}`);

for (let key in appData) {
  console.log(`Наша программа включает в себя данные: ${key} : ${appData[key]}`);
}
