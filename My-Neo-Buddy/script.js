const mouth = document.getElementById('mouth');
const bubble = document.getElementById('chat-bubble');
const eyes = document.querySelectorAll('.eye');

// 1. Finger Tracking (Aankhein ghumana)
document.addEventListener('mousemove', (e) => {
    eyes.forEach(eye => {
        let x = (e.clientX / window.innerWidth) * 20 - 10;
        let y = (e.clientY / window.innerHeight) * 20 - 10;
        eye.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// 2. Always On Listening (No Button Needed)
function initVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.continuous = true;
    recognition.start();

    recognition.onresult = (event) => {
        const text = event.results[event.results.length - 1][0].transcript.toLowerCase();
        handleBabyLogic(text);
    };
    
    recognition.onend = () => recognition.start(); // Kabhi band nahi hoga
}

function handleBabyLogic(text) {
    if (text.includes("it's me") || text.includes("main hoon")) {
        react("laugh", "Mummy aa gayi! 🥰 Main sirf aapka hoon!", 2.0);
    } else if (text.includes("funny") || text.includes("hansiye")) {
        react("teeth", "Hehehe! Dekho mere daant! 😁", 1.8);
    } else if (text.includes("gussa")) {
        react("sad", "Mujhse baat mat karo! 😤", 0.6);
    } else {
        react("default", "Main sun raha hoon Maa...", 1.2);
    }
}

function react(exp, msg, p) {
    mouth.className = 'mouth ' + exp;
    bubble.innerText = msg;
    bubble.classList.remove('hidden');
    
    const speech = new SpeechSynthesisUtterance(msg);
    speech.lang = 'hi-IN'; speech.pitch = p;
    window.speechSynthesis.speak(speech);
    
    setTimeout(() => { 
        bubble.classList.add('hidden'); 
        mouth.className = 'mouth';
    }, 4000);
}

// Start everything
window.onload = initVoice;
