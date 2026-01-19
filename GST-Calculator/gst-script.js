function calculateTax(type) {
    let amount = parseFloat(document.getElementById('amount').value);
    let taxRate = parseFloat(document.getElementById('taxRate').value);
    let isBusinessMode = document.getElementById('modeToggle').checked;

    if (type === 'add') {
        // Dono ke liye logic same hai
        let tax = (amount * taxRate) / 100;
        showResult(amount, tax, amount + tax, "Total Bill");
    } else {
        if (isBusinessMode) {
            // Business Logic: Reverse GST (Jo abhi chal raha hai)
            let originalPrice = amount / (1 + (taxRate / 100));
            let tax = amount - originalPrice;
            showResult(originalPrice, tax, amount, "Original Price (Excl. Tax)");
        } else {
            // Local Logic: Simple Discount/Reduction
            let reduction = (amount * taxRate) / 100;
            showResult(amount, reduction, amount - reduction, "Final Price (After Discount)");
        }
    }
}
