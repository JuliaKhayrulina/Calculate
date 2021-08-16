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
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  valBudgetMonth = document.querySelector('input.budget_month-value'),
  incomeItems = document.querySelectorAll('.income-items'),
  resetBtn = document.querySelector('#cancel'),
  data = document.querySelector('.data'),
  inputsText = data.querySelectorAll('input[type="text"]'),
  inputsValidName = document.querySelectorAll('input[placeholder="Наименование"]'),
  inputsValidSum = document.querySelectorAll('input[placeholder="Сумма"]'),
  inputsAll = document.querySelectorAll('input');

const AppData = function () {
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.period = 0;
};

AppData.prototype.start = function () {
  this.budget = Math.abs(salaryAmount.value);
  this.getExpInc();
  //this.getExpenses();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  //this.getIncome();
  this.getBudget();
  this.getTargetMonth();
  this.showResult();
  this.blockInputs();
};

AppData.prototype.getExpensesMonth = function () {
  let sum = 0;
  for (let key in appData.expenses) {
    sum += this.expenses[key];
  }
  this.expensesMonth = sum;
};

AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;

  if (this.budgetMonth > 0) {
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  } else {
    this.budgetMonth = 0;
  }
};

AppData.prototype.getTargetMonth = function () {
  if (this.budgetMonth > 0) {
    this.period = Math.ceil(inpTargetAmount.value / this.budgetMonth);
  }
};

AppData.prototype.addIncomeBlock = function () {
  const _this = this;
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

  _this.checkInputsValidateSum();
  _this.checkInputsValidateName();
};

AppData.prototype.addExpensesBlock = function () {
  const _this = this;

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

  _this.checkInputsValidateSum();
  _this.checkInputsValidateName();
};

AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach((item) => {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses) {
      if (!cashExpenses) {
        alert('Ошибка, в поле "Обязательные расходы" нужно указать сумму расходов!');
      } else if (!_this.expenses.hasOwnProperty(itemExpenses)) {
        this.expenses[itemExpenses] = Math.abs(cashExpenses);
      }
    } else if (cashExpenses && !itemExpenses) {
      alert('Ошибка, в поле "Обязательные расходы" нужно указать наименование!');
    }
  });
};

AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach((item) => {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;

    if (itemIncome) {
      if (!cashIncome) {
        alert('Ошибка, в поле "Дополнительный доход" нужно указать сумму доходов!');
      } else {
        _this.income[itemIncome] = Math.abs(cashIncome);
        _this.incomeMonth += +cashIncome;
      }
    } else if (cashIncome && !itemIncome) {
      alert('Ошибка, в поле "Дополнительные доходы" нужно указать наименование!');
    }
  });
};

AppData.prototype.getExpInc = function () {
  const count = (item) => {
    const startStr = item.className.split('-')[0];
    const itemTitle = item.querySelector(`.${startStr}-title`).value;
    const itemAmount = item.querySelector(`.${startStr}-amount`).value;
    if (itemTitle) {
      if (!itemAmount) {
        alert('Ошибка, в поле "Дополнительный доход" нужно указать сумму доходов!');
      } else {
        this[startStr][itemTitle] = Math.abs(itemAmount);
      }
    } else if (itemAmount && !itemTitle) {
      alert('Ошибка, в поле "Дополнительные доходы" нужно указать наименование!');
    }
  };

  incomeItems.forEach(count);
  expensesItems.forEach(count);

  for (const key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};

AppData.prototype.getAddExpenses = function () {
  const _this = this;
  let addExpenses = inpAddExpenses.value.split(', ');
  addExpenses.forEach((item) => {
    item = item.trim();
    if (item) {
      _this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getAddIncome = function () {
  const _this = this;
  inpAddIncome.forEach((item) => {
    let itemValue = item.value.trim();
    if (itemValue) {
      _this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.showResult = function () {
  const _this = this;
  valBudgetMonth.value = this.budgetMonth;
  valBudgetDay.value = this.budgetDay;
  valExpensesMonth.value = this.expensesMonth;
  valAddExpenses.value = this.addExpenses.join(', ');
  valAddIncome.value = this.addIncome.join(', ');
  valTargetMonth.value = this.period;
  valIncomePeriod.value = this.calcPeriod();

  periodSelect.addEventListener('input', function () {
    valIncomePeriod.value = _this.calcPeriod();
  });
};

AppData.prototype.reset = function () {
  startBtn.disabled = true;

  inputsAll = document.querySelectorAll('input');
  inputsAll.forEach((item) => {
    item.value = null;
  });

  periodSelect.value = 1;
  periodAmount.textContent = '1';
  resetBtn.style.display = 'none';
  startBtn.style.display = 'block';

  inputsText.forEach((item) => {
    item.disabled = false;
  });
};

AppData.prototype.blockInputs = function () {
  resetBtn.style.display = 'block';
  startBtn.style.display = 'none';

  inputsText = data.querySelectorAll('input[type="text"]');
  inputsText.forEach((item) => {
    item.disabled = true;
  });

  resetBtn.addEventListener('click', this.reset);
};

AppData.prototype.eventListeners = function () {
  const _this = this;
  salaryAmount.addEventListener('input', function () {
    if (salaryAmount.value) {
      startBtn.disabled = false;
    }
  });

  startBtn.addEventListener('click', _this.start.bind(_this));
  plusExpenses.addEventListener('click', _this.addExpensesBlock.bind(_this));
  plusIncome.addEventListener('click', _this.addIncomeBlock.bind(_this));
  periodSelect.addEventListener('input', function () {
    periodAmount.textContent = this.value;
  });
};

AppData.prototype.checkInputsValidateName = function () {
  inputsValidName.forEach((input) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^а-я\s.,]/, '');
    });
  });
};

AppData.prototype.checkInputsValidateSum = function () {
  inputsValidSum.forEach((input) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9]/, '');
    });
  });
};
const appData = new AppData();

appData.eventListeners();
appData.checkInputsValidateName();
appData.checkInputsValidateSum();
