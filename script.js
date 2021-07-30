let money = 100000;
let income = 'freelancing';
let addExpenses = 'Продукты, Интернет, Моб.связь, Коммуналка, Бензин';
let deposit = false;
const mission = 500000;
let period = 12;
let budgetDay = Math.floor(money / 30);

//alert('hello');
console.log('Hello');

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split(' '));
console.log(budgetDay);
