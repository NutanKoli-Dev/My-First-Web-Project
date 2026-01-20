function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    document.getElementById('themeBtn').innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
}

function changeBrandColor(val) {
    const root = document.documentElement;
    if(val === 'indigo') root.style.setProperty('--main', '#3f51b5');
    if(val === 'ruby') root.style.setProperty('--main', '#d81b60');
    if(val === 'cyber') root.style.setProperty('--main', '#ff9800');
}

function addNewRow() {
    const table = document.getElementById("billTable").getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.innerHTML = `
        <td><input type="text" placeholder="Service/Product name"></td>
        <td><input type="number" class="p-input" value="0" oninput="calculate()"></td>
        <td><input type="number" class="q-input" value="1" oninput="calculate()"></td>
        <td class="line-total">0.00</td>
    `;
}

function calculate() {
    let grand = 0;
    const rows = document.querySelectorAll("#billTable tbody tr");
    rows.forEach(r => {
        const p = r.querySelector(".p-input").value;
        const q = r.querySelector(".q-input").value;
        const total = p * q;
        r.querySelector(".line-total").innerText = total.toFixed(2);
        grand += total;
    });
    const symbol = document.getElementById("currency").value;
    document.getElementById("currSymbol").innerText = symbol;
    document.getElementById("grandTotal").innerText = grand.toFixed(2);
}

// Auto-set Today's Date
document.getElementById('invDate').valueAsDate = new Date();
