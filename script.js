class ScientificCalculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }
    
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }
    
    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
    }
    
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }
    
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }
    
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }
    
    square() {
        const value = parseFloat(this.currentOperand);
        if (isNaN(value)) return;
        this.currentOperand = (value * value).toString();
        this.updateDisplay();
    }
    
    squareRoot() {
        const value = parseFloat(this.currentOperand);
        if (isNaN(value) || value < 0) {
            this.currentOperand = 'Error';
            setTimeout(() => this.clear(), 1000);
            return;
        }
        this.currentOperand = Math.sqrt(value).toString();
        this.updateDisplay();
    }
    
    cube() {
        const value = parseFloat(this.currentOperand);
        if (isNaN(value)) return;
        this.currentOperand = (value * value * value).toString();
        this.updateDisplay();
    }
    
    cubeRoot() {
        const value = parseFloat(this.currentOperand);
        if (isNaN(value)) return;
        this.currentOperand = Math.cbrt(value).toString();
        this.updateDisplay();
    }
    
    percent() {
        const value = parseFloat(this.currentOperand);
        if (isNaN(value)) return;
        this.currentOperand = (value / 100).toString();
        this.updateDisplay();
    }
    
    pi() {
        this.currentOperand = Math.PI.toString();
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandElement.innerText = 
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }
}

const previousOperandElement = document.getElementById('previousOperand');
const currentOperandElement = document.getElementById('currentOperand');
const calculator = new ScientificCalculator(previousOperandElement, currentOperandElement);

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        if (button.hasAttribute('data-number')) {
            calculator.appendNumber(button.getAttribute('data-number'));
            calculator.updateDisplay();
        }
        
        if (button.hasAttribute('data-action')) {
            const action = button.getAttribute('data-action');
            
            switch(action) {
                case 'clear':
                    calculator.clear();
                    calculator.updateDisplay();
                    break;
                case 'delete':
                    calculator.delete();
                    calculator.updateDisplay();
                    break;
                case 'percent':
                    calculator.percent();
                    break;
                case 'divide':
                    calculator.chooseOperation('÷');
                    calculator.updateDisplay();
                    break;
                case 'multiply':
                    calculator.chooseOperation('×');
                    calculator.updateDisplay();
                    break;
                case 'subtract':
                    calculator.chooseOperation('-');
                    calculator.updateDisplay();
                    break;
                case 'add':
                    calculator.chooseOperation('+');
                    calculator.updateDisplay();
                    break;
                case 'equals':
                    calculator.compute();
                    calculator.updateDisplay();
                    break;
                case 'square':
                    calculator.square();
                    break;
                case 'sqrt':
                    calculator.squareRoot();
                    break;
                case 'cube':
                    calculator.cube();
                    break;
                case 'cbrt':
                    calculator.cubeRoot();
                    break;
                case 'pi':
                    calculator.pi();
                    break;
            }
        }
    });
});

document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    if (!isNaN(key) || key === '.') {
        calculator.appendNumber(key);
        calculator.updateDisplay();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        let op = key === '*' ? '×' : key === '/' ? '÷' : key;
        calculator.chooseOperation(op);
        calculator.updateDisplay();
    } else if (key === 'Enter') {
        calculator.compute();
        calculator.updateDisplay();
    } else if (key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    } else if (key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    }
});

const statusBar = document.querySelector('.status-bar span:first-child');
setInterval(() => {
    const time = new Date().toLocaleTimeString();
    statusBar.innerHTML = `⏱️ ${time}`;
}, 1000);