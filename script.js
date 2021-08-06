'use strict';
let money = start();
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function start() {
  let val;

  do {
    val = prompt('Ваш месячный доход?');
  } while (!isNumber(val));
  return Math.abs(val);
}

const mission = 500000;
let period = 0,
  budgetDay = 0;
let income = 'фриланс';

let deposit = confirm('Есть ли у вас депозит в банке? Если нет - нажмите Отмена');

let showTypeOf = function (data) {
  console.log(data, typeof data);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let addExpenses = prompt(
  'Перечислите возможные расходы за рассчитываемый период через запятую',
  ''
);

console.log(addExpenses.toLowerCase().split(','));
const expenses = [];

let getExpensesMonth = function () {
  let sum = 0;
  let valExpense;

  for (let i = 0; i < 2; i++) {
    valExpense = prompt('Введите обязательную статью расходов?');
    if (valExpense !== '') {
      expenses.push(valExpense);
      do {
        valExpense = prompt('Во сколько это обойдется?');
      } while (!isNumber(valExpense));
      sum += Math.abs(valExpense);
    }
  }
  return sum;
};

let expensesAmount = getExpensesMonth();
console.log('сумма расходов: ' + expensesAmount);

function getAccumulatedMonth() {
  let budget = money - expensesAmount;

  if (budget < 0) {
    budget = 0;
  } else {
    return budget;
  }
}

let accumulatedMonth = getAccumulatedMonth();
if (accumulatedMonth > 0) {
  budgetDay = Math.floor(accumulatedMonth / 30);
  period = getTargetMonth(accumulatedMonth);
  console.log(`Цель будет достигнута через ${period} месяцев`);
} else {
  accumulatedMonth = 0;
  console.log('Цель не будет достигнута');
}

function getTargetMonth(acc) {
  period = Math.ceil(mission / acc);
  return period;
}

let getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (budgetDay >= 600) {
    return 'У вас средний уровень дохода';
  } else if (budgetDay >= 0) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  }
};

console.log(`Цель заработать ${mission} рублей`);
console.log(`Бюджет на месяц: ${accumulatedMonth}`);
console.log(`Бюджет на день: ${budgetDay}`);
console.log(getStatusIncome());
