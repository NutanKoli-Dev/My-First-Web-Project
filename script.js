function calculateBMI() {
    // Height aur Weight ki value lena
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const resultDiv = document.getElementById('result');

    // Check karna ki numbers sahi hain ya nahi
    if (height > 0 && weight > 0) {
        // BMI Formula: Weight / (Height * Height)
        // .toFixed(2) se decimal ke baad 2 hi number aayenge (jaise 22.86)
        const bmi = (weight / (height * height)).toFixed(2);
        
        let category = '';

        // Category tay karna
        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = 'Normal weight';
        } else if (bmi >= 25 && bmi < 29.9) {
            category = 'Overweight';
        } else {
            category = 'Obese';
        }

        // Screen par result dikhana
        resultDiv.innerHTML = `Your BMI is: <strong>${bmi}</strong> (${category})`;
        resultDiv.style.color = "#ffffff";
    } else {
        alert("Please enter valid height and weight!");
    }
}

function clearBMI() {
    // Sab kuch saaf (Clear) karne ke liye
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('result').innerHTML = '';
}
