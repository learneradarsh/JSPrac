"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// const account1 = {
//   owner: "Jonas Schmedtmann",
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: "Jessica Davis",
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: "Steven Thomas Williams",
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: "Sarah Smith",
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

function displayMovements(acc) {
  containerMovements.innerHTML = "";
  acc.movements.forEach(function (movement, index) {
    const type = movement > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${index} deposit</div>
        <div class="movements__date">${formatDate(
          acc.movementsDates[index]
        )}</div>
        <div class="movements__value">${movement}€</div>
    </div>
      `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

function generateUserNames(acc) {
  acc.forEach(function (accInfo) {
    accInfo.username = accInfo.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
}
generateUserNames(accounts);

function calcAndDisplayTotalBalance(account) {
  account.totalBalance = account.movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${account.totalBalance}€`;
}

function calcAndDisplaySummary(account) {
  const totalIn = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);
  labelSumIn.textContent = `${totalIn.toFixed(2)}€`;

  const totalOut = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  labelSumOut.textContent = `${totalOut.toFixed(2)}€`;

  const totalInterest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = `${totalInterest}`;
}

function isUserExist(username) {
  return accounts.find((account) => account.username === username);
}

function formatDate(date) {
  const config = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  const now = new Date(date);
  const userLocale = navigator.language;
  const formattedDate = new Intl.DateTimeFormat(userLocale, config).format(now);
  return formattedDate;
}

function logoutUser() {
  containerApp.style.opacity = "0";
  labelWelcome.textContent = `Log in to get started`;
}

// login
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (account) => account.username === inputLoginUsername.value
  );

  // pin authentication
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // show main panel
    containerApp.style.opacity = "100";
    labelDate.textContent = new Date();
    // reset username and password text fields
    inputLoginUsername.value = inputLoginPin.value = "";

    //start timer
    let timer = 10;
    labelTimer.textContent = timer;
    const timeClock = setInterval(function () {
      const now = new Date();
      labelTimer.textContent = timer; //`${now.getMinutes()}:${now.getSeconds()}`;
      --timer;
      if (timer === 0) {
        clearInterval(timeClock);
        logoutUser();
      }
    }, 1000);

    //show details for current account
    labelWelcome.textContent = `Welcome Back ${currentAccount.owner}`;
    updateInfoOnDisplay(currentAccount);
  } else {
    containerApp.style.opacity = "0";
    alert("Bad Cred!");
  }
});

function updateInfoOnDisplay(accountInfo) {
  displayMovements(accountInfo);
  calcAndDisplaySummary(accountInfo);
  calcAndDisplayTotalBalance(accountInfo);
}

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const accountForTransfer = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  const transferAmount = Number(inputTransferAmount.value);
  if (
    transferAmount > 0 &&
    transferAmount <= currentAccount.totalBalance &&
    isUserExist(accountForTransfer?.username) &&
    accountForTransfer.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-transferAmount);
    accountForTransfer.movements.push(transferAmount);
    updateInfoOnDisplay(currentAccount);
    console.log("successful transfer");
    inputTransferAmount.value = inputTransferTo.value = "";
  } else {
    alert("invalid transaction");
  }
});

// close account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (isUserExist(currentAccount.username)) {
    const index = accounts.findIndex(
      (account) => account.username === currentAccount.username
    );
    accounts.splice(index, 1);
    inputCloseUsername.value = inputClosePin.value = "";
    containerApp.style.opacity = "0";
  } else {
    alert("account not found");
  }
});

// loan functionality
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((movement) => movement >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    updateInfoOnDisplay(currentAccount);
  } else {
    alert(
      "Sorry, you are not eligible for loan or you have entered wrong amount"
    );
  }
  inputLoanAmount.value = "";
});

// sort movements
let clickToggle = true;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  if (clickToggle) {
    currentAccount.movements.sort((a, b) => a - b);
    clickToggle = !clickToggle;
  } else {
    currentAccount.movements.sort((a, b) => b - a);
    clickToggle = !clickToggle;
  }
  updateInfoOnDisplay(currentAccount);
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// let totalTransactionList = [];
// accounts.forEach((account) => {
//   totalTransactionList.push(...account.movements);
// });
// const totalMoneyInTheBank = totalTransactionList.reduce((acc, trans) => {
//   return acc + trans;
// }, 0);
// console.log(totalMoneyInTheBank);
// let totalTransactionList = [];
// const totalMoneyInTheBank = accounts
//   .map((account) => account.movements)
//   .flat()
//   .filter((deposit) => deposit > 0)
//   .reduce((acc, mov) => {
//     return acc + mov;
//   }, 0);
// const totalMoneyInTheBank = totalTransactionList.reduce((acc, trans) => {
//   return acc + trans;
// }, 0);
// console.log(totalMoneyInTheBank);

// const oneThList = accounts
//   .map((account) => account.movements)
//   .flat()
//   .reduce((count, mov) => {
//     return mov > 1000 ? count + 1 : count;
//   }, 0);
// console.log(oneThList);

// const infoObj = accounts
//   .map((acc) => acc.movements)
//   .flat()
//   .reduce(
//     (acc, mov) => {
//       //   if (mov > 0) {
//       //     acc.deposit = acc.deposit + mov;
//       //   } else {
//       //     acc.withdrawl = acc.withdrawl + mov;
//       //   }
//       mov > 0 ? (acc.deposit += mov) : (acc.withdrawl += mov);
//       return acc;
//     },
//     {
//       deposit: 0,
//       withdrawl: 0,
//     }
//   );
// console.log(infoObj);
/////////////////////////////////////////////////
