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

onTyping(name, cardName, 'Jane Appleseed', 1024, (value) => value);
onTyping(number, cardNumber, '0000000000000000', 16, (value) => value);
onTyping(date_1, cardMonth, '00', 2, (value) => ('0' + value).substring(value.length - 1));
onTyping(date_2, cardYear, '00', 2, (value) => ('0' + value).substring(value.length - 1));

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
    document.getElementById('form').innerHTML = "<div class='thanks'><svg width='80' height='80' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='40' cy='40' r='40' fill='url(#a)'/><path d='M28 39.92 36.08 48l16-16' stroke='#fff' stroke-width='3'/><defs><linearGradient id='a' x1='-23.014' y1='11.507' x2='0' y2='91.507' gradientUnits='userSpaceOnUse'><stop stop-color='#6348FE'/><stop offset='1' stop-color='#610595'/></linearGradient></defs></svg><h1>Thank you!</h1> <p> We've added your card details </p> <button> Continue </button></div>";
  }

});
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  if (errorDisplay) {
    errorDisplay.innerText = message;
  }

  inputControl.classList.add('error');
  inputControl.classList.remove("success")

}
const setSuccess = element => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  if (errorDisplay) {
    errorDisplay.innerText = "";
  }

  inputControl.classList.remove('error');
  inputControl.classList.add('success')

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

  if (date_1Value === "") {
    setError(date_1, "Date is required");
    hasError = true;
  } else {
    setSuccess(date_1);
  }

  if (date_2Value === "") {
    setError(date_2, "Date is required");
    hasError = true;
  } else if (date_2Value.length > 4 || date_2Value.length < 0) {
    setError(date_2, "Wrong date");
  } else {
    setSuccess(date_2);
  }

  if (date_1Value <= 12 || date_2Value === "") {
    setError(date_2, "Can't be blank");
  } else {
    setSuccess(date_1, date_2);
  }

  if (cvcValue === "") {
    setError(cvc, "CVC is required");
    hasError = true;
  } else if (cvcValue.length !== 3) {
    setError(cvc, "Wrong CVC");
  } else {
    setSuccess(cvc);
  }

  return hasError;

};