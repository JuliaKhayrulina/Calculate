'use strict';

//const money = start();
const appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 500000,
  period: 3,
  //budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome;
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', '');
      } while (itemIncome === '' || isNumber(itemIncome));
      if (itemIncome) {
        let cashIncome;
        do {
          cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
          this.income[itemIncome] = Math.abs(cashIncome);
        } while (!isNumber(cashIncome) && cashIncome !== null);
      }
    }

    let addExpenses = prompt(
      'Перечислите возможные расходы за рассчитываемый период через запятую',
      ''
    );
    if (addExpenses) {
      this.addExpenses = addExpenses.toLowerCase().split(',');
    }

    for (let i = 0; i < 2; i++) {
      let numExpense = 0;
      let valExpense;
      do {
        valExpense = prompt('Введите обязательную статью расходов?', '');
      } while (isNumber(valExpense) && valExpense !== null);

      if (valExpense) {
        do {
          numExpense = prompt('Во сколько это обойдется?', 0);
          this.expenses[valExpense] = Math.abs(numExpense);
        } while (!isNumber(numExpense) || !appData.expenses.hasOwnProperty(valExpense));
      }
    }
  },
  getExpensesMonth: getExpensesMonth,
  getBudget: getBudget,
  getTargetMonth: getTargetMonth,
  getStatusIncome: getStatusIncome,
  getInfoDeposit: function () {
    this.deposit = confirm('Есть ли у вас депозит в банке? Если нет - нажмите Отмена');
    if (this.deposit) {
      do {
        this.percentDeposit = Math.abs(prompt('Какой годовой процент?', 10));
      } while (!isNumber(this.percentDeposit) && this.percentDeposit !== null);
    }
    if (this.percentDeposit) {
      do {
        this.moneyDeposit = Math.abs(prompt('Какая сумма заложена?', 10000));
      } while (!isNumber(this.moneyDeposit) && this.moneyDeposit !== null);
    }
    if (!this.moneyDeposit) {
      this.percentDeposit = 0;
    }
  },
  calcSavedMoney: function () {
    return this.budgetMonth * this.period;
  },
};

// appData.asking();
// appData.getInfoDeposit();
// appData.getExpensesMonth();
// appData.getBudget();
// appData.getTargetMonth();

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

// for (let key in appData) {
//   console.log(`Наша программа включает в себя данные: ${key} : ${appData[key]}`);
// }

// let str = '';

// appData.addExpenses.forEach((item) => {
//   item = item.trim();
//   str += ', ';
//   str += item[0].toUpperCase() + item.substring(1);
// });

// console.log(str.substring(2));

const startBtn = document.getElementById('start');

const plusIncome = document.getElementsByTagName('button')[0];
const plusExpenses = document.getElementsByTagName('button')[1];

const checkBox = document.querySelector('#deposit-check');

const inpAddIncome = document.querySelectorAll('.additional_income-item');

const valBudgetDay = document.getElementsByClassName('budget_day-value');
const valExpensesMonth = document.getElementsByClassName('expenses_month-value');
const valAddIncome = document.getElementsByClassName('additional_income-value');
const valAddExpenses = document.getElementsByClassName('additional_expenses-value');
const valIncomePeriod = document.getElementsByClassName('income_period-value');
const valTargetMonth = document.getElementsByClassName('target_month-value');

const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('input.income-title');
const incomeAmount = document.querySelector('input.income-amount');
const expensesTitle = document.querySelector('input.expenses-title');
const expensesAmount = document.querySelector('input.expenses-amount');
const inpAddExpenses = document.querySelector('input.additional_expenses-item');
const inpTargetAmount = document.querySelector('input.target-amount');
const periodRange = document.querySelector('input.period-select');
const valBudgetMonth = document.querySelector('input.budget_month-value');

console.log(startBtn);
console.log(plusIncome);
console.log(plusExpenses);
console.log(checkBox);
console.log(inpAddIncome);
console.log(
  valBudgetDay,
  valExpensesMonth,
  valAddIncome,
  valAddExpenses,
  valIncomePeriod,
  valTargetMonth
);
console.log(salaryAmount);
console.log(incomeTitle);
console.log(incomeAmount);
console.log(expensesTitle);
console.log(expensesAmount);
console.log(inpAddExpenses);
console.log(inpTargetAmount);
console.log(periodRange);
console.log(valBudgetMonth);
