/*
Algorithm
1. Grab all the inputs, tip amount and total elements
2. Make the numbered inputs show in a money format (optional)
3. Do the following calculations:
    - Tip amount = bill * tip percentage / number of people
    - Total = bill / number of people + tip amount
*/

// Elements

const form = document.getElementById('wrapper');
const bill = document.getElementById('bill');
const billError = document.getElementById('first-error');
const people = document.getElementById('people');
const tipError = document.getElementById('second-error');
const tipAmount = document.getElementById('tip-amount');
const totalCost = document.getElementById('total-cost');
const custom = document.getElementById('custom');
const tip = document.getElementsByName('radio-btn');
const button = document.getElementById('reset-btn');

// Calculator

form.addEventListener('submit', (e) => {
    if (!e.target.checkValidity()) {
        // form is invalid - cancel submit
        e.preventDefault();
        e.stopImmediatePropagation();
    }
});

// Valid and invalid styling for reset button
form.addEventListener('input', () => {
    updateResetButton();
    updateTotals();
});

// Event listener for custom input
custom.addEventListener('input', () => {
    if (custom.validity.valid) {
        // Add the class for green border
        custom.style.border = '2px solid hsl(172, 67%, 45%)';
    } else {
        // Remove the class if the input value is not valid
        custom.style.border = '2px solid rgb(237, 109, 109)';
    }

    updateTotals();
});

custom.addEventListener('click', () => {
    // Uncheck the other tip buttons
    uncheckTipButtons();
});

tip.forEach(button => {
    button.addEventListener('input', () => {
        updateTotals();
    })
})

function updateResetButton() {
    button.style.opacity = bill.value && people.value ? '1' : '0.3';
    button.style.cursor = bill.value && people.value ? 'pointer' : 'not-allowed';
    button.removeAttribute('disabled');
}

function uncheckTipButtons() {
    tip.forEach(button => {
        button.checked = false;
    })
}

// Tip percentage
function updateTotals() {
    const billValue = parseFloat(bill.value);
    const peopleValue = parseFloat(people.value);

    // Handle the case when either bill.value or people.value is empty or zero
    if (isNaN(billValue) || isNaN(peopleValue) || peopleValue === 0) {
        tipAmount.textContent = '0';
        totalCost.textContent = '0';
        return;
    }

    const selectedTipButton = Array.from(tip).find(button => button.checked);
    const tipPercentage = selectedTipButton ? parseFloat(selectedTipButton.value) / 100 : parseFloat(custom.value) / 100;

    const tipAmountValue = billValue * tipPercentage / peopleValue;
    const totalCostValue = billValue / peopleValue + tipAmountValue;

    // Set the tip amount content
    tipAmount.textContent = tipAmountValue.toFixed(2);
    totalCost.textContent = totalCostValue.toFixed(2);
}