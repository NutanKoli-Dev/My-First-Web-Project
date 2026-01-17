function calculateBMI() {
    // Hum height meters mein le rahe hain (1.75)
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const resultDiv = document.getElementById('result');

    if (height > 0 && weight > 0) {
        // BMI Formula: Weight / (Height * Height)
        const bmi = (weight / (height * height)).toFixed(2);
        
        let category = '';
        if (bmi < 18.5) category = 'Underweight';
        else if (bmi < 24.9) category = 'Normal weight';
        else if (bmi < 29.9) category = 'Overweight';
        else category = 'Obese';

        resultDiv.innerHTML = `Your BMI is: <strong>${bmi}</strong> <br> (${category})`;
        resultDiv.style.color = "#bb86fc";
    } else {
        resultDiv.textContent = 'Please enter valid numbers';
        resultDiv.style.color = "#cf6679";
    }
}

function clearBMI() {
    document.getElementById('height').value = "";
    document.getElementById('weight').value = "";
    document.getElementById('result').textContent = "";
}

