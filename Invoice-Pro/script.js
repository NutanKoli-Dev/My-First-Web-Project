function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('themeBtn');
    btn.innerText = document.body.classList.contains('dark-mode') ? "☀️ Light Mode" : "🌙 Dark Mode";
}

function changeColor(color) {
    const root = document.documentElement;
    if(color === 'indigo') root.style.setProperty('--primary', '#3f51b5');
    if(color === 'pink') root.style.setProperty('--primary', '#e91e63');
    if(color === 'gold') root.style.setProperty('--primary', '#ffb100');
}

function addRow() {
    const tbody = document.querySelector("#itemTable tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td><input type="text" placeholder="Service/Product name"></td>
        <td><input type="number" class="price" value="0" oninput="calculate()"></td>
        <td><input type="number" class="qty" value="1" oninput="calculate()"></td>
        <td class="row-total">0.00</td>
    `;
    tbody.appendChild(row);
}

function calculate() {
    let grand = 0;
    const rows = document.querySelectorAll("#itemTable tbody tr");
    rows.forEach(row => {
        const p = row.querySelector(".price").value;
        const q = row.querySelector(".qty").value;
        const total = p * q;
        row.querySelector(".row-total").innerText = total.toFixed(2);
        grand += total;
    });
    const symbol = document.getElementById("currency").value;
    document.getElementById("symbol").innerText = symbol;
    document.getElementById("finalTotal").innerText = grand.toFixed(2);
}

// Set Default Date
document.getElementById('billingDate').valueAsDate = new Date();
