// 1. Theme Logic (Light/Dark Mode)
function toggleInvoiceTheme() {
    document.body.classList.toggle('dark-invoice');
    const isDark = document.body.classList.contains('dark-invoice');
    localStorage.setItem('invoice-theme', isDark ? 'dark' : 'light');
}

// 2. Add New Row (Item) Logic
function addNewItem() {
    const tableBody = document.querySelector("#invoiceTable tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td><input type="text" placeholder="Service/Product name" class="item-desc"></td>
        <td><input type="number" value="0" class="item-price" oninput="calculateTotal()"></td>
        <td><input type="number" value="1" class="item-qty" oninput="calculateTotal()"></td>
        <td class="item-total">0.00</td>
    `;
    tableBody.appendChild(newRow);
}

// 3. Calculation Logic (Auto-Total)
function calculateTotal() {
    let grandTotal = 0;
    const rows = document.querySelectorAll("#invoiceTable tbody tr");

    rows.forEach(row => {
        const price = parseFloat(row.querySelector(".item-price").value) || 0;
        const qty = parseFloat(row.querySelector(".item-qty").value) || 0;
        const total = price * qty;
        row.querySelector(".item-total").innerText = total.toFixed(2);
        grandTotal += total;
    });

    const currencySign = document.getElementById("currencySelect").value;
    document.getElementById("grandTotalDisplay").innerText = currencySign + " " + grandTotal.toFixed(2);
}

// 4. Initialization on Page Load
window.onload = function() {
    // Current Date Set Karein
    const dateInput = document.getElementById('billingDate');
    if(dateInput) {
        dateInput.value = new Date().toISOString().substr(0, 10);
    }
    
    // Purani theme load karein
    if(localStorage.getItem('invoice-theme') === 'dark') {
        document.body.classList.add('dark-invoice');
    }

    // Pehla total calculate karein
    calculateTotal();
};
