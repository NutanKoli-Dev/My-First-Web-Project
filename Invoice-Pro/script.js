function addRow() {
    const tbody = document.getElementById('items');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" placeholder="Item name"></td>
        <td><input type="number" class="p" value="0" oninput="calc()"></td>
        <td><input type="number" class="q" value="1" oninput="calc()"></td>
        <td style="text-align:right; font-weight:bold;"><span class="row-total">0.00</span></td>
    `;
    tbody.appendChild(tr);
}

function calc() {
    let total = 0;
    const currencySym = document.getElementById('curr').value;
    document.getElementById('sym').innerText = currencySym;

    document.querySelectorAll('#items tr').forEach(row => {
        const price = row.querySelector('.p').value || 0;
        const qty = row.querySelector('.q').value || 0;
        const rowTotal = price * qty;
        row.querySelector('.row-total').innerText = rowTotal.toFixed(2);
        total += rowTotal;
    });
    document.getElementById('grand').innerText = total.toFixed(2);
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('modeBtn');
    btn.innerText = document.body.classList.contains('dark-mode') ? "☀️ Light Mode" : "🌙 Dark Mode";
}

function changeTheme(color) {
    document.documentElement.style.setProperty('--primary', color);
}

function generatePDF() {
    window.print();
}
