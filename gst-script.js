function calculateGST(mode) {
    const amount = parseFloat(document.getElementById('billAmount').value);
    const rate = parseFloat(document.getElementById('gstRate').value);
    const currency = document.getElementById('currency').value;
    const resultBox = document.getElementById('invoice-result');

    if (isNaN(amount) || amount <= 0 || isNaN(rate)) {
        alert("Enter valid numbers / सही अंक भरें");
        return;
    }

    let basePrice, taxAmount, totalPrice;

    if (mode === 'add') {
        taxAmount = (amount * rate) / 100;
        totalPrice = amount + taxAmount;
        basePrice = amount;
        document.getElementById('labelBase').innerText = "Base Price:";
    } else {
        totalPrice = amount;
        basePrice = amount / (1 + (rate / 100));
        taxAmount = totalPrice - basePrice;
        document.getElementById('labelBase').innerText = "Original Price:";
    }

    const format = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    document.getElementById('resBase').innerText = currency + " " + basePrice.toLocaleString(undefined, format);
    document.getElementById('resTax').innerText = currency + " " + taxAmount.toLocaleString(undefined, format);
    document.getElementById('resTotal').innerText = currency + " " + totalPrice.toLocaleString(undefined, format);

    resultBox.style.display = "block";
}

function copyToClipboard() {
    const total = document.getElementById('resTotal').innerText;
    navigator.clipboard.writeText(`Total Bill: ${total}`).then(() => alert("Copied!"));
}

function resetForm() {
    document.getElementById('billAmount').value = '';
    document.getElementById('invoice-result').style.display = 'none';
}
