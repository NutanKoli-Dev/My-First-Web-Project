document.getElementById('billDate').valueAsDate = new Date();

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    document.getElementById('mode-text').innerText = isDark ? "☀️ Light" : "🌙 Dark";
}

function calculateRow(element) {
    const row = element.parentElement.parentElement;
    const price = row.querySelector('.item-price').value || 0;
    const qty = row.querySelector('.item-qty').value || 0;
    const totalCell = row.querySelector('.row-total');
    
    totalCell.innerText = (parseFloat(price) * parseFloat(qty)).toFixed(2);
    calculateGrandTotal();
}

function calculateGrandTotal() {
    let grandTotal = 0;
    const symbol = document.getElementById('currency').value;
    document.querySelectorAll('.row-total').forEach(cell => grandTotal += parseFloat(cell.innerText));
    document.getElementById('grandTotal').innerText = `${symbol} ${grandTotal.toFixed(2)}`;
}

function addItem() {
    const row = `<tr>
        <td><input type="text" placeholder="Item name" class="item-name"></td>
        <td><input type="number" placeholder="0" class="item-price" oninput="calculateRow(this)"></td>
        <td><input type="number" placeholder="1" class="item-qty" oninput="calculateRow(this)"></td>
        <td class="row-total">0.00</td>
    </tr>`;
    document.getElementById('itemList').insertAdjacentHTML('beforeend', row);
}

function downloadPDF() {
    const element = document.getElementById('invoice');
    const opt = {
        margin: 10,
        filename: 'Global_Invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
}
