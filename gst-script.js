function calculateGST() {
    const amount = parseFloat(document.getElementById('billAmount').value);
    const rate = parseFloat(document.getElementById('gstRate').value);
    const resultBox = document.getElementById('invoice-result');

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    const tax = (amount * rate) / 100;
    const total = amount + tax;

    document.getElementById('resBase').innerText = "₹" + amount.toLocaleString('en-IN');
    document.getElementById('resTax').innerText = "₹" + tax.toLocaleString('en-IN');
    document.getElementById('resTotal').innerText = "₹" + total.toLocaleString('en-IN');

    resultBox.style.display = "block";
}

function copyToClipboard() {
    const base = document.getElementById('resBase').innerText;
    const tax = document.getElementById('resTax').innerText;
    const total = document.getElementById('resTotal').innerText;
    
    const text = `Invoice Summary:\n------------------\nBase Price: ${base}\nGST Amount: ${tax}\nTotal Payable: ${total}\n------------------`;
    
    navigator.clipboard.writeText(text).then(() => {
        alert("Summary copied to clipboard!");
    });
}

function resetForm() {
    document.getElementById('billAmount').value = '';
    document.getElementById('invoice-result').style.display = 'none';
}
