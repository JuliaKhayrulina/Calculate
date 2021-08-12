'use strict';

let startBtn = document.getElementById('start'),
  plusIncome = document.getElementsByTagName('button')[0],
  plusExpenses = document.getElementsByTagName('button')[1],
  checkBox = document.querySelector('#deposit-check'),
  inpAddIncome = document.querySelectorAll('.additional_income-item'),
  valBudgetDay = document.getElementsByClassName('budget_day-value')[0],
  valExpensesMonth = document.getElementsByClassName('expenses_month-value')[0],
  valAddIncome = document.getElementsByClassName('additional_income-value')[0],
  valAddExpenses = document.getElementsByClassName('additional_expenses-value')[0],
  valIncomePeriod = document.getElementsByClassName('income_period-value')[0],
  valTargetMonth = document.getElementsByClassName('target_month-value')[0],
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('input.income-title'),
  incomeAmount = document.querySelector('input.income-amount'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  inpAddExpenses = document.querySelector('input.additional_expenses-item'),
  inpTargetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('input.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  valBudgetMonth = document.querySelector('input.budget_month-value'),
  incomeItems = document.querySelectorAll('.income-items');
let inputsValidName = document.querySelectorAll('input[placeholder="Наименование"]');
let inputsValidSum = document.querySelectorAll('input[placeholder="Сумма"]');

startBtn.disabled = true;

const appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  period: 0,
  start: function () {
    if (!salaryAmount.value) {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      return;
    } else if (!isNumber(salaryAmount.value)) {
    }
    appData.budget = Math.abs(salaryAmount.value);
    appData.getExpenses();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getIncome();
    appData.getBudget();
    appData.getTargetMonth();
    appData.showResult();
    console.log(appData);
  },
  addExpensesBlock: function () {
    let elem = expensesItems[0].cloneNode(true);
    elem.querySelectorAll('input').forEach((item) => {
      item.value = '';
    });

    const cloneExpensesItem = elem.cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      plusExpenses.style.display = 'none';
    }
    inputsValidName = document.querySelectorAll('input[placeholder="Наименование"]');
    inputsValidSum = document.querySelectorAll('input[placeholder="Сумма"]');
    checkInputsValidateSum();
    checkInputsValidateName();
  },
  addIncomeBlock: function () {
    let elem = incomeItems[0].cloneNode(true);
    elem.querySelectorAll('input').forEach((item) => {
      item.value = '';
    });

    let cloneIncomeItem = elem.cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      plusIncome.style.display = 'none';
    }
    inputsValidName = document.querySelectorAll('input[placeholder="Наименование"]');
    inputsValidSum = document.querySelectorAll('input[placeholder="Сумма"]');
    checkInputsValidateName();
    checkInputsValidateSum();
  },
  getExpenses: function () {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses) {
        if (!isNumber(cashExpenses) || !cashExpenses) {
          alert('Ошибка, в поле "Обязательные расходы" нужно указать сумму расходов!');
          item.querySelector('.expenses-amount').value = '';
        } else if (!appData.expenses.hasOwnProperty(itemExpenses)) {
          appData.expenses[itemExpenses] = Math.abs(cashExpenses);
        }
      } else if (cashExpenses && !itemExpenses) {
        alert('Ошибка, в поле "Обязательные расходы" нужно указать наименование!');
        return;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome) {
        if (!isNumber(cashIncome) || !cashIncome) {
          alert('Ошибка, в поле "Дополнительный доход" нужно указать сумму доходов!');
          item.querySelector('.income-amount').value = '';
        } else {
          appData.income[itemIncome] = Math.abs(cashIncome);
          appData.incomeMonth += +cashIncome;
        }
      } else if (cashIncome && !itemIncome) {
        alert('Ошибка, в поле "Дополнительные доходы" нужно указать наименование!');
      }
    });
  },
  getAddExpenses: function () {
    let addExpenses = inpAddExpenses.value.split(', ');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item) {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    inpAddIncome.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue) {
        appData.addIncome.push(itemValue);
      }
    });
  },
  showResult: function () {
    valBudgetMonth.value = appData.budgetMonth;
    valBudgetDay.value = appData.budgetDay;
    valExpensesMonth.value = appData.expensesMonth;
    valAddExpenses.value = appData.addExpenses.join(', ');
    valAddIncome.value = appData.addIncome.join(', ');
    valTargetMonth.value = appData.period;
    valIncomePeriod.value = appData.calcPeriod();
    periodSelect.addEventListener('input', function () {
      valIncomePeriod.value = appData.calcPeriod();
    });
  },

  // getInfoDeposit: function () {
  //   this.deposit = confirm('Есть ли у вас депозит в банке? Если нет - нажмите Отмена');
  //   if (this.deposit) {
  //     do {
  //       this.percentDeposit = Math.abs(prompt('Какой годовой процент?', 10));
  //     } while (!isNumber(this.percentDeposit) && this.percentDeposit !== null);
  //   }
  //   if (this.percentDeposit) {
  //     do {
  //       this.moneyDeposit = Math.abs(prompt('Какая сумма заложена?', 10000));
  //     } while (!isNumber(this.moneyDeposit) && this.moneyDeposit !== null);
  //   }
  //   if (!this.moneyDeposit) {
  //     this.percentDeposit = 0;
  //   }
  // },
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },
  getExpensesMonth: getExpensesMonth,
  getBudget: getBudget,
  getTargetMonth: getTargetMonth,
  getStatusIncome: getStatusIncome,
};

salaryAmount.addEventListener('input', () => {
  if (salaryAmount.value && isNumber(salaryAmount.value)) {
    startBtn.disabled = false;
    startBtn.addEventListener('click', appData.start);
  }
});

plusExpenses.addEventListener('click', appData.addExpensesBlock);
plusIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function () {
  periodAmount.textContent = this.value;
});

function getExpensesMonth() {
  let sum = 0;
  for (let key in appData.expenses) {
    sum += appData.expenses[key];
  }
  appData.expensesMonth = sum;
}

function getBudget() {
  appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;

  if (appData.budgetMonth > 0) {
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  } else {
    appData.budgetMonth = 0;
  }
}

function getTargetMonth() {
  if (inpTargetAmount.value && !isNumber(inpTargetAmount.value)) {
    alert('Ошибка, поле "Цель" должно содержать числа!');
    inpTargetAmount.value = '';
  } else if (appData.budgetMonth > 0) {
    appData.period = Math.ceil(inpTargetAmount.value / appData.budgetMonth);
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

function checkInputsValidateName() {
  inputsValidName.forEach((input) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^а-я\s.,]/, '');
    });
  });
}

function checkInputsValidateSum() {
  inputsValidSum.forEach((input) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9]/, '');
    });
  });
}
checkInputsValidateName();
checkInputsValidateSum();
