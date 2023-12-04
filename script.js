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

const custom = document.getElementById('custom');
const people = document.getElementById('people');
const tipError = document.getElementById('second-error');

const tipAmount = document.getElementById('tip-amount');
const totalCost = document.getElementById('total-cost');

const button = document.getElementById('reset-btn');

// Calculator

form.addEventListener('submit', (e) => {

    if (!e.target.checkValidity()) {
        // form is invalid - cancel submit
        e.preventDefault();
        e.stopImmediatePropagation();
    }

    if (bill.value === '0' || !bill.value) {
        billError.style.visibility = 'visible';
        bill.style.border = '2px solid rgb(237, 109, 109)';
    } else {
        billError.style.visibility = 'hidden';
        bill.style.border = 'none';
        bill.value = '';
    }

    if (people.value === '0' || !people.value) {
        tipError.style.visibility = 'visible';
        people.style.border = '2px solid rgb(237, 109, 109)';
    } else {
        tipError.style.visibility = 'hidden';
        people.style.border = 'none';
        people.value = '';
    }
});

form.addEventListener('input', () => {
    if (bill.value && people.value) {
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
        button.removeAttribute('disabled');
    } else if (!bill.value || !people.value) {
        button.style.opacity = '0.3';
        button.style.cursor = 'not-allowed';
        //button.addAttribute('disabled');
    }

    getTipAmount();
});

// Calculations

// Tip percentage
function getTipAmount() {
    const tip = document.getElementsByName('radio-btn');
    let tipPercentage = 0;

    for (let i = 0; i < tip.length; i++) {
        if (tip[i].checked) {
            tipPercentage = parseFloat(tip[i].value) / 100; // Convert percentage to decimal

            // Check if bill.value and people.value are not empty and not zero before performing the division
            const billValue = parseFloat(bill.value);
            const peopleValue = parseFloat(people.value);

            if (!isNaN(billValue) && !isNaN(peopleValue) && peopleValue !== 0) {
                const tipAmountValue = billValue * tipPercentage / peopleValue;
                const totalCostValue = billValue / peopleValue + tipAmountValue;
                
                // Set the tip amount content
                tipAmount.textContent = tipAmountValue.toFixed(2);
                totalCost.textContent = totalCostValue.toFixed(2);
            } else {
                // Handle the case when either bill.value or people.value is empty or zero
                tipAmount.textContent = '0';
                totalCost.textContent = '0';
            }
        }
    }
}