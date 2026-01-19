// Currency aur Calculation Logic
function calculate() {
    let grandTotal = 0;
    const symbol = document.getElementById('currency').value;
    document.getElementById('symbol').innerText = symbol;

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

// PDF Download Function
function downloadBill() {
    const customer = document.querySelector('input[placeholder="Enter Client Name"]').value || "Customer";
    const total = document.getElementById('grand-total').innerText;
    const symbol = document.getElementById('symbol').innerText;
    
    // Simple Print command jo PDF ki tarah save karega
    window.print(); 
    
    alert("Invoice for " + customer + " generated successfully!");
}

// Dark Mode & Theme Color Logic (Pehle wala)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('modeBtn');
    btn.innerText = document.body.classList.contains('dark-mode') ? "☀️ Light Mode" : "🌙 Dark Mode";
}

function changeThemeColor() {
    const color = document.getElementById('themeColor').value;
    document.documentElement.style.setProperty('--primary', color);
}
