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

    document.getElementById('resBase').innerText = "₹" + amount.toFixed(2);
    document.getElementById('resTax').innerText = "₹" + tax.toFixed(2);
    document.getElementById('resTotal').innerText = "₹" + total.toFixed(2);

    resultBox.style.display = "block";
}
