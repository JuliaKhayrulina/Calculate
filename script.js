'use strict';

const mission = 500000;
let period = 0,
  budgetDay = 0;
let income = 'фриланс';
let money = getValMoney();

function getValMoney() {
  let val = +prompt('Ваш месячный доход?');

  if (isNaN(val) || val === 0) {
    val = +prompt('Вы ввели некорректные данные. Укажите ваш месячный доход');
  }

  return val;
}

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
let amount1 = 0,
  amount2 = 0;
let expenses1 = prompt('Введите обязательную статью расходов?');

if (expenses1) {
  amount1 = +prompt('Во сколько это обойдется?', '');
  if (isNaN(amount1)) {
    amount1 = +prompt('Вы ввели некорректные данные. Во сколько это обойдется?', '');
  }
}

let expenses2 = prompt('Введите обязательную статью расходов?');

if (expenses2) {
  amount2 = +prompt('Во сколько это обойдется?', '');
  if (isNaN(amount2)) {
    amount2 = +prompt('Вы ввели некорректные данные. Во сколько это обойдется?', '');
  }
}

function getExpensesMonth(a, b) {
  return a + b;
}

function getAccumulatedMonth() {
  let budget = money - getExpensesMonth(amount1, amount2);

  if (budget <= 0) {
    budget = 0;
    alert('К сожалению вашего дохода недостаточно, чтобы накопить нужную сумму(');
  } else {
    return budget;
  }
}

let accumulatedMonth = getAccumulatedMonth();
if (accumulatedMonth > 0) {
  budgetDay = Math.floor(accumulatedMonth / 30);
  period = getTargetMonth(accumulatedMonth);
} else {
  accumulatedMonth = 0;
}

function getTargetMonth(acc) {
  let period = Math.ceil(mission / acc);
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

console.log('сумма расходов: ' + getExpensesMonth(amount1, amount2));
console.log(addExpenses.toLowerCase().split(','));
console.log(`Цель заработать ${mission} рублей`);
console.log(`Бюджет на месяц: ${accumulatedMonth}`);
console.log(`Бюджет на день: ${budgetDay}`);
console.log(getStatusIncome());
console.log(`Период равен ${period} месяцев`);
