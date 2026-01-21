let hitCount = 0;
let lastTap = 0;
const neo = document.getElementById('neo-body');
const status = document.getElementById('status');

function wakeUp() {
    let now = Date.now();
    // Hit Detection (Tez tap karna)
    if (now - lastTap < 300) {
        hitCount++;
        if (hitCount > 3) {
            react("cry", "Aiyoo! Mamma, lag gayi! Itna tez kyun mara?");
            hitCount = 0;
            return;
        }
    } else {
        hitCount = 0;
        react("happy", "Hehehe! Gudgudi ho rahi hai!");
    }
    lastTap = now;
    startListening();
}

function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const rec = new SpeechRecognition();
    rec.lang = 'hi-IN';
    
    rec.onstart = () => { status.innerText = "Neo is listening..."; };
    
    rec.onresult = (event) => {
        const text = event.results[0][0].transcript.toLowerCase();
        if (text.includes("neo")) {
            respond("Yes? Kya hua dost?");
        } else {
            respond("Hmm... main samajh raha hoon. Aur batao?");
        }
    };
    rec.start();
}

function react(mood, text) {
    neo.className = "neo " + mood;
    respond(text);
    setTimeout(() => neo.className = "neo", 3000);
}

function respond(text) {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'hi-IN';
    speech.pitch = 1.8; // Baby voice
    
    speech.onstart = () => neo.classList.add('talking');
    speech.onend = () => {
        neo.classList.remove('talking');
        status.innerText = "Tap to chat";
    };
    window.speechSynthesis.speak(speech);
}
