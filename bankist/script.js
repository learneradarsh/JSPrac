"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

function displayMovements(movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (movement, index) {
    const type = movement > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${index} deposit</div>
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
  labelSumIn.textContent = `${totalIn}€`;

  const totalOut = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  labelSumOut.textContent = `${totalOut}€`;

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

let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (account) => account.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  // pin authentication
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // show main panel
    containerApp.style.opacity = "100";

    // reset username and password text fields
    inputLoginUsername.value = inputLoginPin.value = "";

    //show details for current account
    labelWelcome.textContent = `Welcome Back ${currentAccount.owner}`;
    updateInfoOnDisplay(currentAccount);
  } else {
    containerApp.style.opacity = "0";
    alert("Bad Cred!");
  }
});

function updateInfoOnDisplay(accountInfo) {
  displayMovements(accountInfo.movements);
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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/////////////////////////////////////////////////