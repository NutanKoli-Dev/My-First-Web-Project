function calculateTip() {
    const bill = parseFloat(document.getElementById('bill').value);
    const tipPercent = parseFloat(document.getElementById('tipPercentage').value);
    const currency = document.getElementById('currency').value;
    const resultDiv = document.getElementById('tip-result');

    if (isNaN(bill) || bill <= 0) {
        alert("Please enter a valid bill amount");
        return;
    }

    const tipAmount = (bill * tipPercent) / 100;
    const totalBill = bill + tipAmount;

    document.getElementById('display-tip').innerText = currency + tipAmount.toFixed(2);
    document.getElementById('display-total').innerText = currency + totalBill.toFixed(2);
    
    resultDiv.style.display = "block";
}
