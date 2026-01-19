function calculateTip() {
    // Input values ko number mein badalna
    const bill = parseFloat(document.getElementById('bill').value);
    const tipPercent = parseFloat(document.getElementById('tipPercentage').value);
    const people = parseInt(document.getElementById('people').value);

    // Check karna ki saari fields bhari hain ya nahi
    if (isNaN(bill) || isNaN(tipPercent) || isNaN(people) || people <= 0) {
        alert("Please enter valid numbers in all fields!");
        return;
    }

    // Calculation logic
    const totalTip = (bill * tipPercent) / 100;
    const totalBill = bill + totalTip;
    const perPerson = totalBill / people;

    // Result ko screen par dikhana
    const resultDiv = document.getElementById('tip-result');
    resultDiv.innerHTML = `
        <div style="text-align: left;">
            <p>Total Tip: <strong>₹${totalTip.toFixed(2)}</strong></p>
            <p>Total Amount: <strong>₹${totalBill.toFixed(2)}</strong></p>
            <hr style="border: 0.5px solid #ccc;">
            <p style="font-size: 18px; color: #3f72af;">Each Person Pays: <br> 
            <strong style="font-size: 24px;">₹${perPerson.toFixed(2)}</strong></p>
        </div>
    `;
}

