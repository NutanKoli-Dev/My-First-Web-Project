function calculateTip() {
    const bill = parseFloat(document.getElementById('bill').value);
    const tipPercent = parseFloat(document.getElementById('tipPercentage').value);
    const currency = document.getElementById('currency').value;
    const resultDiv = document.getElementById('tip-result');

    if (isNaN(bill) || bill <= 0) {
        alert("Enter valid amount!");
        return;
    }

    const tipAmount = (bill * tipPercent) / 100;
    const total = bill + tipAmount;

    resultDiv.style.display = "block";
    resultDiv.innerHTML = `Tip: ${currency}${tipAmount.toFixed(2)} <br> Total: ${currency}${total.toFixed(2)}`;
}
