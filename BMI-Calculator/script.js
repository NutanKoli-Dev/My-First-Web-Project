function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const resultDiv = document.getElementById('bmi-result'); // Line 4 Fixed

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        resultDiv.innerHTML = "Please enter valid height and weight.";
        return;
    }

    const bmi = (weight / (height * height)).toFixed(2);
    let category = "";

    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight";
    } else {
        category = "Obesity";
    }

    resultDiv.innerHTML = `Your BMI is ${bmi} (${category})`;
}

function clearBMI() {
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('bmi-result').innerHTML = ''; // Line 26 Fixed
}
