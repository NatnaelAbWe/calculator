// Calculator State
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetScreen = false;

// Get Display Element
const display = document.getElementById("display");

// Get Buttons
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const decimalButton = document.getElementById("decimal");
const backspaceButton = document.getElementById("backspace");

// Event Listeners
numberButtons.forEach(button =>
    button.addEventListener("click", () => appendNumber(button.dataset.number))
);

operatorButtons.forEach(button =>
    button.addEventListener("click", () => setOperator(button.dataset.operator))
);

equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
decimalButton.addEventListener("click", addDecimal);
backspaceButton.addEventListener("click", backspace);
document.addEventListener("keydown", handleKeyboardInput);

// Append Numbers to Display
function appendNumber(number) {
    if (display.innerText === "0" || shouldResetScreen) resetScreen();
    display.innerText += number;
}

// Set Operator
function setOperator(operator) {
    if (currentOperator !== null) evaluate();
    firstNumber = display.innerText;
    currentOperator = operator;
    shouldResetScreen = true;
}

// Evaluate the Expression
function evaluate() {
    if (currentOperator === null || shouldResetScreen) return;
    if (currentOperator === "/" && display.innerText === "0") {
        alert("You can't divide by 0! 😡");
        return;
    }
    secondNumber = display.innerText;
    display.innerText = roundResult(operate(currentOperator, firstNumber, secondNumber));
    currentOperator = null;
}

// Perform Arithmetic Operations
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
        default: return null;
    }
}

// Clear Calculator
function clear() {
    display.innerText = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
}

// Add Decimal Point
function addDecimal() {
    if (shouldResetScreen) resetScreen();
    if (!display.innerText.includes(".")) display.innerText += ".";
}

// Backspace Function
function backspace() {
    display.innerText = display.innerText.slice(0, -1);
    if (display.innerText === "") display.innerText = "0";
}

// Reset Display for New Input
function resetScreen() {
    display.innerText = "";
    shouldResetScreen = false;
}

// Round Long Decimals
function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

// Handle Keyboard Support
function handleKeyboardInput(e) {
    if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
    if (e.key === ".") addDecimal();
    if (e.key === "Backspace") backspace();
    if (e.key === "Escape") clear();
    if (e.key === "Enter" || e.key === "=") evaluate();
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") setOperator(e.key);
}
