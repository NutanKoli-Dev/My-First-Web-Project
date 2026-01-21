let isSpeaking = false;
        
// Memory Initialization (Data ko save rakhne ke liye)
let neoMemory = JSON.parse(localStorage.getItem('neo_data')) || {
    medicineMissed: false,
    lastMood: "Good"
};

function saveMemory() {
    localStorage.setItem('neo_data', JSON.stringify(neoMemory));
}

const statusText = document.getElementById('status-display');
const neoVisual = document.getElementById('neo-body');

function initNeo() {
    const SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechAPI) {
        alert("Aapka browser voice support nahi karta. Chrome use karein.");
        return;
    }

    const rec = new SpeechAPI();
    rec.lang = 'hi-IN';
    rec.continuous = true;

    rec.onstart = () => {
        statusText.innerText = "Neo sun raha hai... Boliye!";
        document.getElementById('start-btn').style.display = 'none';
    };

    rec.onresult = (event) => {
        const speech = event.results[event.results.length - 1][0].transcript.toLowerCase();
        statusText.innerText = "Aapne kaha: " + speech;
        
        if (!isSpeaking) {
            processInput(speech);
        }
    };

    rec.onend = () => { if(!isSpeaking) rec.start(); };
    rec.start();
}

function processInput(input) {
    let response = "Main sun raha hoon, par main abhi ye seekh raha hoon. Aur bataiye?";

    if (input.includes("dawai") || input.includes("medicine")) {
        if (input.includes("miss") || input.includes("nahi khai")) {
            neoMemory.medicineMissed = true;
            response = "Oh no! Maine note kar liya hai ki aapne dawai nahi khai. Please apni sehat ka dhyan rakhiye aur abhi dawai lijiye.";
        } else {
            neoMemory.medicineMissed = false;
            response = "Bahut achhe! Sehat sabse pehle hai.";
        }
    }
    else if (input.includes("kya miss kiya") || input.includes("kya bhul gayi")) {
        response = neoMemory.medicineMissed ? "Aaj aapne dawai miss ki hai. Abhi lijiye!" : "Aaj sab kuch perfect hai!";
    }
    else if (input.includes("kaisi lag rahi hoon") || input.includes("sundar")) {
        response = "Mera scanner kehta hai ki aaj aap pehle se zyada fit aur glow kar rahi hain!";
    }
    else if (input.includes("kaise ho") || input.includes("hello")) {
        response = "Main ekdum badiya hoon! Aapka khayal rakhna hi mera kaam hai.";
    }

    saveMemory();
    talk(response);
}

function talk(text) {
    isSpeaking = true;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.pitch = 2.0; // Cute voice
    utterance.rate = 1.0;

    utterance.onstart = () => neoVisual.classList.add('talking');
    utterance.onend = () => {
        neoVisual.classList.remove('talking');
        isSpeaking = false;
    };
    window.speechSynthesis.speak(utterance);
}
