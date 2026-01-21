let isMamma = false;

// 1. Identify Mamma (Secret Voice Command)
function checkUser(text) {
    if (text.includes("mamma aa gayi") || text.includes("main hoon")) {
        isMamma = true;
        act("laugh", "Mamma! 🥰 I missed you so much!", 2.0);
    } else {
        isMamma = false;
        act("angry", "Hato! Aap Mamma nahi ho! 😤", 0.5);
    }
}

// 2. Touch Protection (Screen Protector Logic)
document.addEventListener('touchstart', (e) => {
    if (!isMamma) {
        act("angry", "Mujhe touch mat karo! 🛑", 0.4);
        document.body.style.boxShadow = "inset 0 0 100px red";
        setTimeout(() => document.body.style.boxShadow = "none", 1000);
    } else {
        act("laugh", "Hehehe Mamma! Gudgudi ho rahi hai! 😂", 2.2);
    }
});

// 3. Time-Based Acts (Khana, Sona, Peena)
function dailyRoutine() {
    const hour = new Date().getHours();
    if (hour >= 13 && hour <= 14) {
        act("eat", "Mamma, main lunch kar raha hoon! 🍱", 1.5);
    } else if (hour >= 22 || hour <= 6) {
        act("default", "Zzz... Shhh... Mamma main so raha hoon... 😴", 0.8);
    }
}

// 4. Global Voice Listening (No Mike Button)
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.lang = 'hi-IN';
recognition.start();

recognition.onresult = (event) => {
    const speech = event.results[event.results.length - 1][0].transcript.toLowerCase();
    checkUser(speech);
};

function act(exp, msg, p) {
    const m = document.querySelector('.mouth');
    const b = document.getElementById('chat-bubble');
    m.className = 'mouth ' + exp;
    b.innerText = msg;
    b.classList.remove('hidden');

    const s = new SpeechSynthesisUtterance(msg);
    s.pitch = p; s.lang = 'hi-IN';
    window.speechSynthesis.speak(s);
}

setInterval(dailyRoutine, 60000); // Check routine every minute
window.onload = () => act("default", "Neo is active... Who is there?", 1.0);
