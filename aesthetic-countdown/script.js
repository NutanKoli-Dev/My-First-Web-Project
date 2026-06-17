document.addEventListener('DOMContentLoaded', () => {
    // --- Tabs Switching Management ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    // --- Controls Bar (Theme & Dark Mode) ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const themeSelect = document.getElementById('themeSelect');

    themeSelect.addEventListener('change', (e) => {
        document.body.classList.remove('theme-indigo', 'theme-pink', 'theme-gold');
        document.body.classList.add(e.target.value);
    });

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? "☀️ Light Mode" : "🌙 Dark Mode";
    });


    // --- Logic 1: Aesthetic Age System ---
    const calculateAgeBtn = document.getElementById('calculateAgeBtn');
    const realAgeInput = document.getElementById('realAge');
    const vibeSelect = document.getElementById('vibeSelect');
    const ageResultBox = document.getElementById('ageResultBox');
    const calculatedAgeDisplay = document.getElementById('calculatedAgeDisplay');
    const vibeDescription = document.getElementById('vibeDescription');

    calculateAgeBtn.addEventListener('click', () => {
        const realAge = parseInt(realAgeInput.value);
        if (!realAge || realAge <= 0) {
            alert("Please enter a valid age first!");
            return;
        }

        const vibe = vibeSelect.value;
        let aestheticAge = realAge;
        let desc = "";

        if (vibe === 'retro') {
            aestheticAge = realAge + 12;
            desc = "You have an old soul! You belong to the golden era of cassettes, vinyl, and vintage polaroids.";
        } else if (vibe === 'minimalist') {
            aestheticAge = Math.max(18, realAge - 2);
            desc = "Clean layouts, neutral tones, and pure peace. Your vibe is perfectly structured and calm.";
        } else if (vibe === 'cyberpunk') {
            aestheticAge = realAge + 5;
            desc = "Living in 2050! You love futuristic neon lights, smart tech, and high-speed life.";
        } else if (vibe === 'cottagecore') {
            aestheticAge = realAge + 20;
            desc = "Pure grandma warmth. You belong in a cozy wooden cabin surrounded by nature, books, and hot tea.";
        } else if (vibe === 'genz') {
            aestheticAge = Math.min(22, realAge - 5);
            if (aestheticAge < 13) aestheticAge = 16;
            desc = "No cap, your vibe is completely matching the latest internet trends, memes, and fast energy!";
        }

        calculatedAgeDisplay.textContent = aestheticAge;
        vibeDescription.textContent = desc;
        ageResultBox.classList.remove('hidden');
    });


    // --- Logic 2: PRO Countdown System ---
    const startCountdownBtn = document.getElementById('startCountdownBtn');
    const eventNameInput = document.getElementById('eventName');
    const targetDateTimeInput = document.getElementById('targetDateTime');
    const bgImageInput = document.getElementById('bgImageInput');
    const countdownWidgetCard = document.getElementById('countdownWidgetCard');
    const eventTitleDisplay = document.getElementById('eventTitleDisplay');

    let countdownInterval;

    startCountdownBtn.addEventListener('click', () => {
        clearInterval(countdownInterval); 
        
        const targetTime = new Date(targetDateTimeInput.value).getTime();
        const eventName = eventNameInput.value || "Your Special Event";

        if (!targetTime || isNaN(targetTime)) {
            alert("Please pick a valid Date & Time!");
            return;
        }

        if (targetTime < new Date().getTime()) {
            alert("Please choose a future date! Time travel is not possible yet.");
            return;
        }

        // --- Handle Photo Upload Logic ---
        const file = bgImageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                countdownWidgetCard.style.backgroundImage = `url('${e.target.result}')`;
                countdownWidgetCard.classList.add('has-bg');
            }
            reader.readAsDataURL(file);
        } else {
            countdownWidgetCard.style.backgroundImage = 'none';
            countdownWidgetCard.classList.remove('has-bg');
        }

        countdownWidgetCard.classList.remove('hidden');
        eventTitleDisplay.textContent = `⏳ Live Countdown for: ${eventName}`;

        function updateTimer() {
            const now = new Date().getTime();
            const difference = targetTime - now;

            if (difference <= 0) {
                clearInterval(countdownInterval);
                eventTitleDisplay.textContent = `🎉 The moment has arrived: ${eventName}!`;
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
