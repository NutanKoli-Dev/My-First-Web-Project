// 1. Finger Tracking (Aankhein ghumana)
document.addEventListener('mousemove', (e) => {
    const eyes = document.querySelectorAll('.eye');
    eyes.forEach(eye => {
        let x = (e.clientX / window.innerWidth) * 10 - 5;
        let y = (e.clientY / window.innerHeight) * 10 - 5;
        eye.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// 2. Owner Recognition Logic
let isNutan = false;

function processVoice(text) {
    if(text.includes("it's me") || text.includes("main hoon")) {
        isNutan = true;
        talkWithEmotion("love", "Ah! Meri pyari Nutan aa gayi! 🥰");
    } else if (isNutan) {
        // Nutan ke liye special baatein
        talkWithEmotion("happy", "Aap jo bologo main wahi karunga!");
    } else {
        // Anjan person ke liye normal baat
        talkWithEmotion("curious", "Hello! Main Neo hoon. Aap kaun?");
    }
}

// 3. Auto-Listening (Bina button ke)
function autoListen() {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'hi-IN';
    recognition.onresult = (event) => {
        const msg = event.results[event.results.length - 1][0].transcript;
        processVoice(msg);
    };
    recognition.start();
}
