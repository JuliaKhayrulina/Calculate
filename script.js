'use strict';

const mission = 500000;
let money = +prompt('Ваш месячный доход?');

if (isNaN(money)) {
  money = +prompt('Вы ввели неккоректные данные. Укажите ваш месячный доход.');
} else if (money === 0 || money === null) {
  money = +prompt('Ваш месячный доход?');
}

let income = 'фриланс';
let addExpenses = prompt(
  'Перечислите возможные расходы за рассчитываемый период через запятую',
  ''
);

let deposit = confirm('Есть ли у вас депозит в банке? Если нет - нажмите Отмена');
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = 0,
  amount2 = 0;

if (expenses1) {
  amount1 = +prompt('Во сколько это обойдется?', '');
  if (isNaN(amount1)) {
    amount1 = +prompt('Вы ввели неккоректные данные. Во сколько это обойдется?', '');
  }
}
let expenses2 = prompt('Введите обязательную статью расходов?');

if (expenses2) {
  amount2 = +prompt('Во сколько это обойдется?', '');
  if (isNaN(amount2)) {
    amount2 = +prompt('Вы ввели неккоректные данные. Во сколько это обойдется?', '');
  }
}

let budgetMonth = money - (amount1 + amount2);

let period = Math.ceil(mission / budgetMonth);

let budgetDay = Math.floor(budgetMonth / 30);

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
  console.log('Что то пошло не так');
}

//alert('hello');
// console.log('Hello');

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(addExpenses);
console.log(addExpenses.toLowerCase().split(','));
console.log(`Бюджет на месяц: ${budgetMonth}`);
console.log(`Бюджет на день: ${budgetDay}`);
