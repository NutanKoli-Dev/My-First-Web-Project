document.addEventListener('DOMContentLoaded', () => {
    // Set current date inside input fields automatically
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('billingDate').value = today;

    const itemsContainer = document.getElementById('itemsContainer');
    const addItemBtn = document.getElementById('addItemBtn');
    const grandTotalSpan = document.getElementById('grandTotal');
    const currencySelect = document.getElementById('currencySelect');
    const currencySignSpan = document.getElementById('currencySign');
    
    // Theme and Dark mode selectors
    const darkModeToggle = document.getElementById('darkModeToggle');
    const themeSelect = document.getElementById('themeSelect');

    // --- Calculation Logic ---
    function calculateTotals() {
        let grandTotal = 0;
        const rows = itemsContainer.querySelectorAll('.item-row');

        rows.forEach(row => {
            const price = parseFloat(row.querySelector('.item-price').value) || 0;
            const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
            const total = price * qty;
            
            row.querySelector('.item-total').textContent = total.toFixed(2);
            grandTotal += total;
        });

        grandTotalSpan.textContent = grandTotal.toFixed(2);
    }

    // --- Event Delegation for Dynamic Inputs ---
    itemsContainer.addEventListener('input', (e) => {
        if (e.target.classList.contains('item-price') || e.target.classList.contains('item-qty')) {
            calculateTotals();
        }
    });

    // --- Add New Item Row System ---
    addItemBtn.addEventListener('click', () => {
        const newRow = document.createElement('div');
        newRow.classList.add('item-row');
        // Sirf extra rows ke sath chota cross button banega
        newRow.innerHTML = `
            <input type="text" class="item-desc" placeholder="Item name">
            <input type="number" class="item-price" placeholder="0">
            <input type="number" class="item-qty" placeholder="0">
            <span class="item-total">0.00</span>
            <button class="delete-row-btn">✖</button>
        `;
        itemsContainer.appendChild(newRow);
    });

    // --- Delete Row Functionality ---
    itemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-row-btn')) {
            e.target.closest('.item-row').remove();
            calculateTotals();
        }
    });

    // --- Currency Symbol Selector ---
    currencySelect.addEventListener('change', (e) => {
        currencySignSpan.textContent = e.target.value;
    });

    // --- Color Themes Control ---
    themeSelect.addEventListener('change', (e) => {
        document.body.classList.remove('theme-indigo', 'theme-pink', 'theme-gold');
        document.body.classList.add(e.target.value);
    });

    // --- Dark Mode Switcher ---
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if(document.body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = "☀️ Light Mode";
        } else {
            darkModeToggle.textContent = "🌙 Dark Mode";
        }
    });

    // --- PDF Generator Operation ---
    document.getElementById('downloadPdfBtn').addEventListener('click', () => {
        const element = document.getElementById('invoiceCard');
        
        const opt = {
            margin:       10,
            filename:     'Invoice_Bill.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    });

    // Initial calculation when app loads
    calculateTotals();
});
