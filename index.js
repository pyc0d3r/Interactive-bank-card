const form = document.getElementById('form');
const name = document.getElementById('name');
const number = document.getElementById("number");
const date_1 = document.getElementById('date_1');
const date_2 = document.getElementById('date_2');
const cvc = document.getElementById('cvc');

const cardName = document.getElementById('card_name');
const cardNumber = document.getElementById('card_number');
const cardMonth = document.getElementById('card_date_month');
const cardYear = document.getElementById('card_date_year');
const cardCvc = document.getElementById('card_cvc');
const cardButton = document.getElementById('continue');

cardButton.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.reload();
});

const identity = (value) => value;
onTyping(name, cardName, 'Jane Appleseed', 1024, identity);
onTyping(number, cardNumber, '0000000000000000', 16, identity);
onTyping(date_1, cardMonth, '00', 2, (value) => ('0' + value).substring(value.length - 1));
onTyping(date_2, cardYear, '00', 2, (value) => ('0' + value).substring(value.length - 1));
onTyping(cvc, cardCvc, '000', 3, identity);

function onTyping(input, target, defaultValue, maxLength, formatter) {
  input.addEventListener('keydown', (event) => {
    const inputLength = input.value.length;

    if (inputLength >= maxLength && event.key != 'Backspace') {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  });

  input.addEventListener('input', () => {
    const text = input.value ? input.value : defaultValue;
    target.innerText = formatter(text);
  });
}

number.addEventListener('input', (event) => {
  const numberLength = number.value.length;

  const parts = Array(Math.floor(numberLength / 4) + 1).fill('');

  for (let i = 0; i < number.value.length; i++) {
    parts[Math.floor(i / 4)] += number.value[i];
  }

  cardNumber.innerText = parts[0] != '' ? parts.join(' ') : '0000 0000 0000 0000';
})

form.addEventListener("submit", e => {
  e.preventDefault();

  if (!validateInputs()) {
    document.getElementById('container').classList.toggle('hidden');
    document.getElementById('done').classList.toggle('hidden');
  }
});

const setError = (element, message) => {
  element.classList.add('error');
  element.classList.remove('success');

  const inputControl = element.closest('.field');
  const errorDisplay = inputControl.querySelector("div.error");

  if (errorDisplay) {
    errorDisplay.innerText = message;
  }

  inputControl.classList.add('error');
  inputControl.classList.remove("success")
}
const setSuccess = (element, valid = true) => {
  element.classList.add('success');
  element.classList.remove('error');

  if (valid) {
    const inputControl = element.closest('.field');
    const errorDisplay = inputControl.querySelector("div.error");

    if (errorDisplay) {
      errorDisplay.innerHTML = "\&nbsp;";
    }

    inputControl.classList.remove('error');
    inputControl.classList.add('success')
  }
}
const validateInputs = () => {
  let hasError = false;
  const nameValue = name.value.trim();
  const numberValue = number.value.trim();

  const date_1Value = date_1.value.trim();
  const date_2Value = date_2.value.trim();
  const cvcValue = cvc.value.trim();

  if (nameValue === "") {
    setError(name, "Name is required");
    hasError = true;
  } else if (nameValue >= 0 || nameValue < 0) {
    setError(name, "Wrong format, letters only")
  }
  else {
    setSuccess(name);
  }

  if (numberValue === "") {
    setError(number, "Wrong format, numbers only");
    hasError = true;
  } else if (numberValue.length < 16) {
    setError(number, "Wrong card number");
    hasError = true;
  } else {
    setSuccess(number);
  }

  for (let i = 4; i < numberValue.length; i++) {
    number[i] += " ";
  }

  const isDateValid = date_1Value.match(/^(0?[1-9]{1}|10|11|12)$/);
  if (!isDateValid) {
    // setError(date_1, "Date is required");
    setError(date_1, "Date is required");
    hasError = true;
  } else {
    setSuccess(date_1);
  }

  if (!date_2Value.match(/^[0-9]{2}$/)) {
    // setError(date_2, "Date is required");
    setError(date_2, "Date is required");
    hasError = true;
  } else {
    // if (isDateValid) {
    setSuccess(date_2, isDateValid);
    // }
  }

  if (!cvcValue.match(/^[0-9]{3}$/)) {
    setError(cvc, "CVC is required");
    hasError = true;
  } else {
    setSuccess(cvc);
  }

  return hasError;

};