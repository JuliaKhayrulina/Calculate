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
  incomeItems = document.querySelectorAll('.income-items'),
  resetBtn = document.querySelector('#cancel'),
  data = document.querySelector('.data'),
  inputsText = data.querySelectorAll('input[type="text"]'),
  inputsValidName = document.querySelectorAll('input[placeholder="Наименование"]'),
  inputsValidSum = document.querySelectorAll('input[placeholder="Сумма"]'),
  inputsAll = document.querySelectorAll('input');

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
  start() {
    this.budget = Math.abs(salaryAmount.value);
    this.getExpenses();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getIncome();
    this.getBudget();
    this.getTargetMonth();
    this.showResult();
    this.blockInputs();
  },
  reset() {
    startBtn.disabled = true;
    inputsAll = document.querySelectorAll('input');
    inputsAll.forEach((item) => {
      item.value = '';
    });

    resetBtn.style.display = 'none';
    startBtn.style.display = 'block';

    inputsText.forEach((item) => {
      item.disabled = false;
    });
  },
  addExpensesBlock() {
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
  addIncomeBlock() {
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
  getExpenses() {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses) {
        if (!cashExpenses) {
          alert('Ошибка, в поле "Обязательные расходы" нужно указать сумму расходов!');
        } else if (!this.expenses.hasOwnProperty(itemExpenses)) {
          this.expenses[itemExpenses] = Math.abs(cashExpenses);
        }
      } else if (cashExpenses && !itemExpenses) {
        alert('Ошибка, в поле "Обязательные расходы" нужно указать наименование!');
        return;
      }
    });
  },
  getIncome() {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome) {
        if (!cashIncome) {
          alert('Ошибка, в поле "Дополнительный доход" нужно указать сумму доходов!');
        } else {
          appData.income[itemIncome] = Math.abs(cashIncome);
          appData.incomeMonth += +cashIncome;
        }
      } else if (cashIncome && !itemIncome) {
        alert('Ошибка, в поле "Дополнительные доходы" нужно указать наименование!');
      }
    });
  },
  getAddExpenses() {
    let addExpenses = inpAddExpenses.value.split(', ');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item) {
        this.addExpenses.push(item);
      }
    });
  },
  getAddIncome() {
    inpAddIncome.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue) {
        this.addIncome.push(itemValue);
      }
    });
  },
  showResult() {
    valBudgetMonth.value = this.budgetMonth;
    valBudgetDay.value = this.budgetDay;
    valExpensesMonth.value = this.expensesMonth;
    valAddExpenses.value = this.addExpenses.join(', ');
    valAddIncome.value = this.addIncome.join(', ');
    valTargetMonth.value = this.period;
    valIncomePeriod.value = this.calcPeriod();

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
  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  },
  getExpensesMonth() {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += this.expenses[key];
    }
    this.expensesMonth = sum;
  },
  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;

    if (this.budgetMonth > 0) {
      this.budgetDay = Math.floor(this.budgetMonth / 30);
    } else {
      this.budgetMonth = 0;
    }
  },
  getTargetMonth() {
    if (this.budgetMonth > 0) {
      this.period = Math.ceil(inpTargetAmount.value / this.budgetMonth);
    }
  },
  blockInputs() {
    resetBtn.style.display = 'block';
    startBtn.style.display = 'none';

    inputsText = data.querySelectorAll('input[type="text"]');
    inputsText.forEach((item) => {
      item.disabled = true;
    });

    resetBtn.addEventListener('click', this.reset);
  },
  getStatusIncome: getStatusIncome,
};

salaryAmount.addEventListener('input', function () {
  if (salaryAmount.value) {
    startBtn.disabled = false;
  }
});
startBtn.addEventListener('click', appData.start.bind(appData));
plusExpenses.addEventListener('click', appData.addExpensesBlock);
plusIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function () {
  periodAmount.textContent = this.value;
});

function getStatusIncome() {
  if (appData.budgetDay >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (appData.budgetDay >= 600) {
    return 'У вас средний уровень дохода';
  } else if (appData.budgetDay >= 0) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  }
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
