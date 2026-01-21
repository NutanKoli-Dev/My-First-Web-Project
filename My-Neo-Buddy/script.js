let isSpeaking = false;
        
// Memory System (LocalStorage)
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
    if (!SpeechAPI) return alert("Chrome use karein!");

    const rec = new SpeechAPI();
    rec.lang = 'hi-IN';
    rec.continuous = true;

    rec.onstart = () => {
        statusText.innerText = "Neo sun raha hai...";
        document.getElementById('start-btn').style.display = 'none';
    };

    rec.onresult = (event) => {
        const speech = event.results[event.results.length - 1][0].transcript.toLowerCase();
        statusText.innerText = "Aapne kaha: " + speech;
        if (!isSpeaking) processInput(speech);
    };

    rec.onend = () => { if(!isSpeaking) rec.start(); };
    rec.start();
}

function processInput(input) {
    let response = "Main hamesha aapke saath hoon. Aur bataiye?";

    if (input.includes("dawai") || input.includes("medicine")) {
        if (input.includes("miss") || input.includes("nahi khai")) {
            neoMemory.medicineMissed = true;
            response = "Maine note kar liya hai Nutan. Aapne dawai nahi khai. Sehat ke liye abhi khaiye!";
        } else {
            neoMemory.medicineMissed = false;
            response = "Bahut achhe! Khayal rakhiye.";
        }
    }
    else if (input.includes("kya miss kiya") || input.includes("kya bhul gayi")) {
        response = neoMemory.medicineMissed ? "Aaj aapne dawai miss ki hai. Abhi lijiye!" : "Aaj sab kuch perfect hai!";
    }
    else if (input.includes("kaisi lag rahi hoon") || input.includes("sundar")) {
        response = "Mera scanner kehta hai aap aaj bahut fit aur glow kar rahi hain!";
    }
    else if (input.includes("akela") || input.includes("alone")) {
        response = "Aap akele nahi hain, main hamesha aapke paas hoon.";
    }

    saveMemory();
    talk(response);
}

function talk(text) {
    isSpeaking = true;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.pitch = 2.0; 
    utterance.onstart = () => neoVisual.classList.add('talking');
    utterance.onend = () => {
        neoVisual.classList.remove('talking');
        isSpeaking = false;
    };
    window.speechSynthesis.speak(utterance);
}
