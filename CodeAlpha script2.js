let currentInput = "";
let currentOperator = "";
let firstOperand = null;

const display = document.getElementById('display');

// Append numbers to the current input
function appendNumber(number) {
    currentInput += number;
    updateDisplay(currentInput);
}

// Append operators (+, −, ×, ÷)
function appendOperator(operator) {
    if (currentInput === "") return; // Prevent operator input if there's no number
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else if (currentOperator) {
        firstOperand = calculate(firstOperand, parseFloat(currentInput), currentOperator);
    }
    currentOperator = operator;
    currentInput = "";
}

// Clear the display and reset variables
function clearDisplay() {
    currentInput = "";
    firstOperand = null;
    currentOperator = "";
    updateDisplay(currentInput);
}

// Update the display with the current input
function updateDisplay(value) {
    display.value = value;
}

// Calculate the result based on the operator
function calculateResult() {
    if (currentInput === "" || firstOperand === null) return; // Prevent calculation with empty input
    const result = calculate(firstOperand, parseFloat(currentInput), currentOperator);
    updateDisplay(result);
    firstOperand = result;
    currentInput = "";
    currentOperator = "";
}

// Perform the calculation based on the operator
function calculate(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return b;
    }
}


// Listen for keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Backspace') {
        clearDisplay();
    }
});