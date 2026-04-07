let display = document.getElementById('result');
let currentInput = '';

function updateDisplay() {
    display.value = currentInput || '0';
}

function handleButton(value) {
    if (value === 'C') {
        currentInput = '';
    } 
    else if (value === '⌫') {
        currentInput = currentInput.slice(0, -1);
    }
    else if (value === '=') {
        try {
            // Replace * with * for multiplication
            let expression = currentInput.replace(/×/g, '*');
            currentInput = eval(expression).toString();
        } catch (error) {
            currentInput = 'Error';
            setTimeout(() => {
                currentInput = '';
                updateDisplay();
            }, 1000);
        }
    }
    else {
        currentInput += value;
    }
    updateDisplay();
}

// Add event listeners to all buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        let value = button.textContent;
        handleButton(value);
    });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
        handleButton(key);
    } else if (key === 'Enter') {
        handleButton('=');
    } else if (key === 'Backspace') {
        handleButton('⌫');
    } else if (key === 'Escape') {
        handleButton('C');
    }
});

updateDisplay();