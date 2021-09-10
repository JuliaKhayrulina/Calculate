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
  periodAmount = document.querySelector('.period-amount'),
  valBudgetMonth = document.querySelector('input.budget_month-value'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  calc = document.querySelector('.calc');

let resetBtn = document.querySelector('#cancel'),
  data = document.querySelector('.data'),
  result = document.querySelector('.result'),
  inputsText = data.querySelectorAll('input[type="text"]'),
  inputsAll = document.querySelectorAll('input'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  periodSelect = document.querySelector('.period-select'),
  incomeItems = document.querySelectorAll('.income-items');

startBtn.disabled = true;

class AppData {
  constructor() {
    this.income = {};
    this.incomeMonth = 0;
    this.additionalIncome = [];
    this.expenses = {};
    this.additionalExpenses = [];
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
      this.saveInStorage();
      this.showResult();
      this.blockInputs();
      localStorage.reset = 'reset';
    }
  }

  reset() {
    startBtn.disabled = true;
    depositCheck.checked = false;
    localStorage.clear();
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
    this.additionalIncome = [];
    this.expenses = {};
    this.additionalExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.period = 0;

    const cookies = this.getCookies();
    cookies.forEach((item) => {
      this.setCookie(item, '', -1);
    });
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

  addIncExpBlock(target) {
    let getClass = target.className.split('btn_plus ')[1].split('_add')[0];
    let expIncItems = document.querySelectorAll(`.${getClass}-items`);
    let elem = expIncItems[0].cloneNode(true);

    elem.querySelectorAll('input').forEach((item) => {
      item.value = null;
    });

    expIncItems[0].parentNode.insertBefore(elem, target);
    elem = document.querySelectorAll(`.${getClass}-items`);

    if (elem.length === 3) {
      target.style.display = 'none';
    }
    if (elem.length < 4) {
      localStorage.setItem(getClass, document.querySelector(`.${getClass}`).outerHTML);
    }
    this.eventListeners();
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
        this.additionalExpenses.push(item);
      }
    });

    inpAddIncome.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue) {
        this.additionalIncome.push(itemValue);
      }
    });
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  showResult() {
    valBudgetMonth.value = localStorage.budgetMonth;
    valBudgetDay.value = localStorage.budgetDay;
    valExpensesMonth.value = localStorage.expensesMonth;
    valAddExpenses.value = localStorage.additionalExpenses;
    valAddIncome.value = localStorage.additionalIncome;
    valTargetMonth.value = localStorage.targetMonth;
    valIncomePeriod.value = localStorage.incomePeriod;
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

  saveInStorage() {
    localStorage.budgetMonth = this.budgetMonth;
    localStorage.budgetDay = this.budgetDay;
    localStorage.expensesMonth = this.expensesMonth;
    localStorage.additionalExpenses = this.additionalExpenses.join(', ');
    localStorage.additionalIncome = this.additionalIncome.join(', ');
    localStorage.targetMonth = this.period;
    localStorage.incomePeriod = this.calcPeriod();

    document.cookie = 'budgetMonth=' + this.budgetMonth;
    document.cookie = 'budgetDay=' + this.budgetDay;
    document.cookie = 'expensesMonth=' + this.expensesMonth;
    document.cookie = 'additionalExpenses=' + this.additionalExpenses.join(', ');
    document.cookie = 'additionalIncome=' + this.additionalIncome.join(', ');
    document.cookie = 'targetMonth=' + this.period;
    document.cookie = 'incomePeriod=' + this.calcPeriod();
    document.cookie = 'isLoad=true';

    periodSelect.addEventListener('input', () => {
      valIncomePeriod.value = this.calcPeriod();
    });
  }

  showStorageData() {
    if (localStorage.income) {
      document.querySelector('.income').remove();
      salaryAmount.parentNode.insertAdjacentHTML('afterend', localStorage.income);
    }
    if (localStorage.expenses) {
      let addInc = document.querySelector('.additional_expenses');
      document.querySelector('.expenses').remove();
      addInc.insertAdjacentHTML('beforeBegin', localStorage.expenses);
    }

    data = document.querySelector('.data');
    inputsText = data.querySelectorAll('input[type="text"]');

    let counter = -1;
    inputsText.forEach((item) => {
      if (localStorage.getItem(++counter)) {
        item.value = localStorage.getItem(counter);
      }
    });
    if (salaryAmount.value) {
      startBtn.disabled = false;
    }
    periodSelect = document.querySelector('.period-select');
    periodAmount.textContent = localStorage.getItem('range');
    periodSelect.value = +localStorage.getItem('range');
  }

  checkCookiesStorage() {
    const storage = [];
    const cookies = this.getCookies();

    Object.keys(localStorage).filter((item) => {
      if (
        isNaN(item) &&
        item !== 'reset' &&
        item !== 'range' &&
        item !== 'income' &&
        item !== 'expenses'
      ) {
        storage.push(item);
      }
    });

    const arr = [...new Set(storage, cookies)];

    if (arr.length !== storage.length || arr.length !== cookies.length) {
      cookies.forEach((item) => {
        this.setCookie(item, '', -1);
      });
      localStorage.clear();
      this.reset();
    } else {
      return true;
    }
  }

  setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    console.log(name + '=' + value + ';path=/;expires=' + d.toGMTString());
    document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString();
  }

  getCookies() {
    const cookies = [];
    let dataRight = result.querySelectorAll('input');
    dataRight.forEach((item) => {
      const record = item.classList[1].split('-')[0].split('_');
      const record1 = record[0] + record[1][0].toUpperCase() + record[1].slice(1);
      const pattern = RegExp(record1 + '=.[^;]*');
      const matched = document.cookie.match(pattern);
      if (matched) {
        cookies.push(matched[0].split('=')[0]);
      }
    });
    return cookies;
  }

  eventListeners() {
    this.showStorageData();
    if (localStorage.reset) {
      startBtn.style.display = 'none';
      resetBtn.style.display = 'block';
      inputsText.forEach((item) => {
        item.disabled = true;
      });
      if (this.checkCookiesStorage()) {
        this.showResult();
      }
    }

    result.addEventListener('click', (e) => {
      let target = e.target;
      if (target.id === 'start') {
        this.start();
      }
      if (target.id === 'cancel') {
        this.reset();
      }
    });

    data.addEventListener('click', (e) => {
      let target = e.target;
      if (target.classList.contains('income_add')) {
        this.addIncExpBlock(target);
      }
      if (target.classList.contains('expenses_add')) {
        this.addIncExpBlock(target);
      }
    });

    data.addEventListener('input', (e) => {
      let target = e.target;
      if (target.classList.contains('period-select')) {
        periodAmount.textContent = target.value;
        localStorage.setItem('range', periodSelect.value);
      }
      if (target.classList.contains('salary-amount') && salaryAmount.value) {
        startBtn.disabled = false;
      }
      if (target.classList.contains('.deposit-amount') && depositAmount.value) {
        startBtn.disabled = false;
      }
      if (target.classList.contains('.deposit-percent') && depositPercent.value) {
        startBtn.disabled = false;
      }
    });

    inputsText.forEach((item, index) => {
      item.addEventListener('input', (e) => {
        const target = e.target;
        localStorage.setItem(index, target.value);
      });
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
    let inc = document.querySelector('.income');
    incomeItems = inc.querySelectorAll('.income-items');

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
    let exp = document.querySelector('.expenses');
    expensesItems = exp.querySelectorAll('.expenses-items');

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
