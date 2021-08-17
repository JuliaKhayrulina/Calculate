'use strict';

const startBtn = document.getElementById('start'),
  plusIncome = document.getElementsByTagName('button')[0],
  plusExpenses = document.getElementsByTagName('button')[1],
  depositCheck = document.querySelector('#deposit-check'),
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
  inpAddExpenses = document.querySelector('input.additional_expenses-item'),
  inpTargetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  valBudgetMonth = document.querySelector('input.budget_month-value'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent');

let resetBtn = document.querySelector('#cancel'),
  data = document.querySelector('.data'),
  inputsText = data.querySelectorAll('input[type="text"]'),
  inputsAll = document.querySelectorAll('input'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  incomeItems = document.querySelectorAll('.income-items');

startBtn.disabled = true;

class AppData {
  constructor() {
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
  }
  start() {
    if (this.checkDepositValidate() && this.checkGetIncValidate() && this.checkGetExpValidate()) {
      this.budget = Math.abs(salaryAmount.value);
      this.getExpInc();
      this.getAddExpInc();
      this.getExpensesMonth();
      this.getInfoDeposit();
      this.getBudget();
      this.getTargetMonth();
      this.showResult();
      this.blockInputs();
    }
  }

  reset() {
    startBtn.disabled = true;

    inputsAll = document.querySelectorAll('input');
    inputsAll.forEach((item) => {
      item.value = null;
    });

    periodSelect.value = 1;
    periodAmount.textContent = '1';
    resetBtn.style.display = 'none';
    startBtn.style.display = 'block';
    depositPercent.style.display = 'none';

    inputsText.forEach((item) => {
      item.disabled = false;
    });

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
  }

  getExpensesMonth() {
    let sum = 0;
    for (let key in this.expenses) {
      sum += this.expenses[key];
    }
    this.expensesMonth = sum;
  }

  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth =
      this.budget + this.incomeMonth - this.expensesMonth + Math.floor(monthDeposit);

    if (this.budgetMonth > 0) {
      this.budgetDay = Math.floor(this.budgetMonth / 30);
    } else {
      this.budgetMonth = 0;
    }
  }

  getTargetMonth() {
    if (this.budgetMonth > 0) {
      this.period = Math.ceil(inpTargetAmount.value / this.budgetMonth);
    }
  }

  addIncExpBlock(event) {
    let getClass = event.target.className.split('btn_plus ')[1].split('_add')[0];
    let expIncItems = document.querySelectorAll(`.${getClass}-items`);
    let elem = expIncItems[0].cloneNode(true);

    elem.querySelectorAll('input').forEach((item) => {
      item.value = null;
    });

    expIncItems[0].parentNode.insertBefore(elem, event.target);
    elem = document.querySelectorAll(`.${getClass}-items`);

    if (elem.length === 3) {
      event.target.style.display = 'none';
    }

    this.checkInputsValidate();
  }

  getExpInc() {
    const count = (item) => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;

      if (itemTitle) {
        this[startStr][itemTitle] = Math.abs(itemAmount);
      }
    };

    incomeItems.forEach(count);
    expensesItems.forEach(count);

    for (const key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getAddExpInc() {
    let addExpenses = inpAddExpenses.value.split(', ');

    addExpenses.forEach((item) => {
      item = item.trim();
      if (item) {
        this.addExpenses.push(item);
      }
    });

    inpAddIncome.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue) {
        this.addIncome.push(itemValue);
      }
    });
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  showResult() {
    valBudgetMonth.value = this.budgetMonth;
    valBudgetDay.value = this.budgetDay;
    valExpensesMonth.value = this.expensesMonth;
    valAddExpenses.value = this.addExpenses.join(', ');
    valAddIncome.value = this.addIncome.join(', ');
    valTargetMonth.value = this.period;
    valIncomePeriod.value = this.calcPeriod();

    periodSelect.addEventListener('input', () => {
      valIncomePeriod.value = this.calcPeriod();
    });
  }

  blockInputs() {
    resetBtn.style.display = 'block';
    startBtn.style.display = 'none';

    inputsText = data.querySelectorAll('input[type="text"]');
    inputsText.forEach((item) => {
      item.disabled = true;
    });

    resetBtn.addEventListener('click', () => {
      this.reset();
    });
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  changePercent() {
    const valueSelect = this.value;

    if (valueSelect === 'other') {
      depositPercent.value = '';
      depositPercent.style.display = 'inline-block';
    } else {
      depositPercent.value = valueSelect;
    }
  }

  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }

  eventListeners() {
    salaryAmount.addEventListener('input', () => {
      if (salaryAmount.value) {
        startBtn.disabled = false;
      }
    });
    depositAmount.addEventListener('input', () => {
      if (depositAmount.value) {
        startBtn.disabled = false;
      }
    });
    depositPercent.addEventListener('input', () => {
      if (depositPercent.value) {
        startBtn.disabled = false;
      }
    });

    startBtn.addEventListener('click', () => {
      this.start();
    });
    plusExpenses.addEventListener('click', () => {
      this.addIncExpBlock(event);
    });
    plusIncome.addEventListener('click', () => {
      this.addIncExpBlock(event);
    });
    periodSelect.addEventListener('input', function () {
      periodAmount.textContent = this.value;
    });
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }

  checkInputsValidate() {
    let reg = [/[^а-я\s.,]/, /[^0-9]/];

    const counter = (input) => {
      input.addEventListener('input', (e) => {
        if (e.target.placeholder === 'Наименование') {
          input.value = input.value.replace(reg[0], '');
        }
        if (e.target.placeholder === 'Сумма' || e.target.placeholder === 'Процент') {
          input.value = input.value.replace(reg[1], '');
        }
      });
    };

    counter(depositPercent);
    document.querySelectorAll('input[placeholder="Наименование"]').forEach(counter);
    document.querySelectorAll('input[placeholder="Сумма"]').forEach(counter);
  }

  checkDepositValidate() {
    if (depositBank.textContent !== 'Проценты' && depositCheck.checked) {
      if (depositPercent.value < 1 || depositPercent.value > 100) {
        alert('Введите корректное значение в поле проценты по депозиту');
        depositPercent.value = '';
        startBtn.disabled = true;
      } else if (depositPercent.value && !depositAmount.value) {
        alert('введите сумму депозита');
        startBtn.disabled = true;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  checkGetIncValidate() {
    let validate;
    incomeItems = document.querySelectorAll('.income-items');

    incomeItems.forEach((item) => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle && !itemAmount) {
        alert('Введите сумму в поле "Дополнительный доход');
        validate = false;
      } else if (!itemTitle && itemAmount) {
        alert('Введите наименование в поле "Дополнительный доход');
        validate = false;
      } else {
        validate = true;
      }
    });

    return validate;
  }

  checkGetExpValidate() {
    let validate;
    expensesItems = document.querySelectorAll('.expenses-items');

    expensesItems.forEach((item) => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle && !itemAmount) {
        alert('Введите сумму в поле "Обязательные расходы');
        validate = false;
      } else if (!itemTitle && itemAmount) {
        alert('Введите наименование в поле "Обязательные расходы');
        validate = false;
      } else {
        validate = true;
      }
    });
    return validate;
  }
}

const appData = new AppData();

appData.eventListeners();
appData.checkInputsValidate();
