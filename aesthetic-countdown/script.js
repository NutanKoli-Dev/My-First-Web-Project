document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const themeSelect = document.getElementById('themeSelect');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Light/Dark Mode Logic
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = '☀️ Light Mode';
        } else {
            darkModeToggle.textContent = '🌙 Dark Mode';
        }
    });

    // Theme Picker Selection (Indigo, Pink, Gold)
    themeSelect.addEventListener('change', (e) => {
        document.body.classList.remove('theme-indigo', 'theme-pink', 'theme-gold');
        if (e.target.value === 'indigo') document.body.classList.add('theme-indigo');
        if (e.target.value === 'pink') document.body.classList.add('theme-pink');
        if (e.target.value === 'gold') document.body.classList.add('theme-gold');
    });

    // Navigation Tabs Switch Management
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    // Aesthetic Age Calculations & Descriptions
    const btnCalculate = document.getElementById('btnCalculate');
    const ageResult = document.getElementById('ageResult');
    const txtAestheticAge = document.getElementById('txtAestheticAge');
    const txtVibeDesc = document.getElementById('txtVibeDesc');

    const descriptions = {
        minimalist: { scale: -2, text: "Clean layouts, neutral tones, and pure peace. Your vibe is perfectly structured and calm." },
        retro: { scale: 3, text: "Classic vinyl records, warm vintage aesthetics, and nostalgic memories. A timeless soul." },
        cyber: { scale: -4, text: "Glitch art, matrix codes, and high-energy neon lights. You are fully living in the digital future." },
        indie: { scale: 1, text: "Vinyl covers, cassette tapes, and raw grunge music. Authentically bold and unbothered." }
    };

    btnCalculate.addEventListener('click', () => {
        const age = parseInt(document.getElementById('realAge').value);
        const style = document.getElementById('vibeStyle').value;

        if (!age || age <= 0) {
            alert('Please enter a valid age!');
            return;
        }

        const selectedStyle = descriptions[style];
        txtAestheticAge.textContent = age + selectedStyle.scale;
        txtVibeDesc.textContent = selectedStyle.text;
        ageResult.classList.remove('hidden');
    });

    // Live Event Timer Processing Logics
    const btnStartCountdown = document.getElementById('btnStartCountdown');
    const countdownCard = document.getElementById('countdownCard');
    const lblEventHeading = document.getElementById('lblEventHeading');
    const imageUpload = document.getElementById('imageUpload');

    let runningClock;

    imageUpload.addEventListener('change', (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            const dataReader = new FileReader();
            dataReader.onload = function(event) {
                countdownCard.style.backgroundImage = `url('${event.target.result}')`;
                countdownCard.style.backgroundSize = 'cover';
                countdownCard.style.backgroundPosition = 'center';
            };
            dataReader.readAsDataURL(uploadedFile);
        }
    });

    btnStartCountdown.addEventListener('click', () => {
        const nameText = document.getElementById('eventTitle').value || "Special Event";
        const targetDateValue = document.getElementById('eventDate').value;

        if (!targetDateValue) {
            alert('Please select a target date and time!');
            return;
        }

        const deadline = new Date(targetDateValue).getTime();
        if (isNaN(deadline)) {
            alert('Invalid date format!');
            return;
        }

        clearInterval(runningClock);
        lblEventHeading.textContent = `⏳ Live Countdown for: ${nameText}`;
        countdownCard.classList.remove('hidden');

        function renderClock() {
            const currentMoment = new Date().getTime();
            const distance = deadline - currentMoment;

            if (distance <= 0) {
                clearInterval(runningClock);
                document.getElementById('boxDays').textContent = "00";
                document.getElementById('boxHours').textContent = "00";
                document.getElementById('boxMins').textContent = "00";
                document.getElementById('boxSecs').textContent = "00";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('boxDays').textContent = days < 10 ? '0' + days : days;
            document.getElementById('boxHours').textContent = hours < 10 ? '0' + hours : hours;
            document.getElementById('boxMins').textContent = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('boxSecs').textContent = seconds < 10 ? '0' + seconds : seconds;
        }

        renderClock();
        runningClock = setInterval(renderClock, 1000);
    });
});
                
