document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const colorPalette = document.getElementById('colorPalette');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.textContent = '🌙 Dark Mode';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️ Light Mode';
        }
    });

    colorPalette.addEventListener('change', (e) => {
        document.documentElement.setAttribute('data-palette', e.target.value);
    });

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    const calculateAgeBtn = document.getElementById('calculateAgeBtn');
    const ageResultBox = document.getElementById('ageResultBox');
    const calculatedAgeDisplay = document.getElementById('calculatedAgeDisplay');
    const vibeDescription = document.getElementById('vibeDescription');

    const vibeDetails = {
        minimalist: { offset: -2, desc: "Clean layouts, neutral tones, and pure peace. Your vibe is perfectly structured and calm." },
        vintage: { offset: 5, desc: "Classic vinyl records, warm vintage aesthetics, and nostalgic memories. A timeless soul." },
        y2k: { offset: -4, desc: "Glitch art, matrix codes, and high-energy neon lights. You are fully living in the digital future." },
        indie: { offset: 1, desc: "Vinyl covers, cassette tapes, and raw grunge music. Authentically bold and unbothered." }
    };

    calculateAgeBtn.addEventListener('click', () => {
        const realAge = parseInt(document.getElementById('realAge').value);
        const selectedVibe = document.getElementById('vibeSelect').value;

        if (!realAge || realAge <= 0) {
            alert('Please enter a valid age!');
            return;
        }

        const data = vibeDetails[selectedVibe];
        const aestheticAge = realAge + data.offset;

        calculatedAgeDisplay.textContent = aestheticAge;
        vibeDescription.textContent = data.desc;
        ageResultBox.classList.remove('hidden');
    });

    const startCountdownBtn = document.getElementById('startCountdownBtn');
    const countdownWidgetCard = document.getElementById('countdownWidgetCard');
    const eventTitleDisplay = document.getElementById('eventTitleDisplay');
    const bgImageInput = document.getElementById('bgImageInput');

    let countdownInterval;

    bgImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                countdownWidgetCard.style.backgroundImage = `url('${event.target.result}')`;
                countdownWidgetCard.style.backgroundSize = 'cover';
                countdownWidgetCard.style.backgroundPosition = 'center';
            };
            reader.readAsDataURL(file);
        }
    });

    startCountdownBtn.addEventListener('click', () => {
        const eventName = document.getElementById('eventName').value || "Special Event";
        const targetDateTime = document.getElementById('targetDateTime').value;

        if (!targetDateTime) {
            alert('Please select a target date and time!');
            return;
        }

        const targetTime = new Date(targetDateTime).getTime();

        if (isNaN(targetTime)) {
            alert('Invalid date format!');
            return;
        }

        clearInterval(countdownInterval);
        eventTitleDisplay.textContent = `⏳ Live Countdown for: ${eventName}`;
        countdownWidgetCard.classList.remove('hidden');

        function updateTimer() {
            const now = new Date().getTime();
            const difference = targetTime - now;

            if (difference <= 0) {
                clearInterval(countdownInterval);
                document.getElementById('daysBox').textContent = "00";
                document.getElementById('hoursBox').textContent = "00";
                document.getElementById('minsBox').textContent = "00";
                document.getElementById('secsBox').textContent = "00";
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('daysBox').textContent = days < 10 ? '0' + days : days;
            document.getElementById('hoursBox').textContent = hours < 10 ? '0' + hours : hours;
            document.getElementById('minsBox').textContent = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('secsBox').textContent = seconds < 10 ? '0' + seconds : seconds;
        }

        updateTimer();
        countdownInterval = setInterval(updateTimer, 1000);
    });
});
