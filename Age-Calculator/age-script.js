function calculateAge() {
    const birthdayValue = document.getElementById('birthday').value;
    const resultDiv = document.getElementById('age-result');

    if (birthdayValue === "") {
        alert("Please select your birthday!");
        return;
    }

    const birthDate = new Date(birthdayValue);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    resultDiv.innerHTML = `You are <strong>${age}</strong> years old. 🎂`;
}

function clearAge() {
    document.getElementById('birthday').value = '';
    document.getElementById('age-result').innerHTML = '';
}
