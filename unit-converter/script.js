// Global State
let currentMode = 'unit';

const optionsData = {
    unit: [
        { text: 'Meter (m)', value: 'm' },
        { text: 'Centimeter (cm)', value: 'cm' },
        { text: 'Inch (in)', value: 'in' },
        { text: 'Foot (ft)', value: 'ft' }
    ],
    currency: [
        { text: 'US Dollar (USD)', value: 'USD' },
        { text: 'Indian Rupee (INR)', value: 'INR' },
        { text: 'Euro (EUR)', value: 'EUR' }
    ]
};

// Conversion Rates
const lengthRates = { m: 1, cm: 0.01, in: 0.0254, ft: 0.3048 };
const currencyRates = { USD: 1, INR: 0.011, EUR: 1.08 }; // Fixed global benchmark rates

function populateSelects() {
    const fromSelect = document.getElementById('fromType');
    const toSelect = document.getElementById('toType');
    
    if(!fromSelect || !toSelect) return;

    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';

    optionsData[currentMode].forEach((item, index) => {
        let opt1 = document.createElement('option');
        opt1.value = item.value;
        opt1.textContent = item.text;
        fromSelect.appendChild(opt1);

        let opt2 = document.createElement('option');
        opt2.value = item.value;
        opt2.textContent = item.text;
        if(index === 1) opt2.selected = true; // Select second option by default for 'To'
        toSelect.appendChild(opt2);
    });
    performConversion();
}

function switchTab(mode) {
    currentMode = mode;
    document.getElementById('unitTab').classList.toggle('active', mode === 'unit');
    document.getElementById('currencyTab').classList.toggle('active', mode === 'currency');
    populateSelects();
}

function performConversion() {
    const valInput = document.getElementById('inputValue');
    const resultDisplay = document.getElementById('resultDisplay');
    
    if(!valInput || !resultDisplay) return;

    const val = parseFloat(valInput.value);
    if (isNaN(val)) {
        resultDisplay.textContent = "0.00";
        return;
    }

    const from = document.getElementById('fromType').value;
    const to = document.getElementById('toType').value;
    let result = 0;

    if (currentMode === 'unit') {
        // Convert to base (meter) then to target
        let valInMeters = val * lengthRates[from];
        result = valInMeters / lengthRates[to];
    } else {
        // Convert to base (USD) then to target
        let valInUSD = val * currencyRates[from];
        result = valInUSD / currencyRates[to];
    }

    resultDisplay.textContent = result.toFixed(2) + ' ' + to;
}

// Initial Load when CodePen runs
populateSelects();
