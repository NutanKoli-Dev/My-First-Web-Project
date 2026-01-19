function addRow() {
    const tbody = document.getElementById('item-list');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" placeholder="Item name"></td>
        <td><input type="number" class="price" value="0" oninput="calculate()"></td>
        <td><input type="number" class="qty" value="1" oninput="calculate()"></td>
        <td style="text-align: right; font-weight: bold;">₹<span class="row-total">0.00</span></td>
    `;
    tbody.appendChild(row);
}

function calculate() {
    let grandTotal = 0;
    const rows = document.querySelectorAll('#item-list tr');
    rows.forEach(row => {
        const p = row.querySelector('.price').value || 0;
        const q = row.querySelector('.qty').value || 0;
        const total = p * q;
        row.querySelector('.row-total').innerText = total.toFixed(2);
        grandTotal += total;
    });
    document.getElementById('grand-total').innerText = grandTotal.toFixed(2);
}
