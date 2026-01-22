let isSpeaking = false;
let neoMemory = JSON.parse(localStorage.getItem('neo_data')) || { medicineMissed: false, userName: "Nutan" };

function saveMemory() { localStorage.setItem('neo_data', JSON.stringify(neoMemory)); }

const statusText = document.getElementById('status-display');
const neoVisual = document.getElementById('neo-body');

function initNeo() {
    const SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechAPI) return alert("Please use Chrome browser.");

    const rec = new SpeechAPI();
    rec.lang = 'hi-IN';
    rec.continuous = true;

    rec.onstart = () => {
        statusText.innerText = "Neo Sun Raha Hai... Boliye Nutan!";
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
    let response = "Hmm, Nutan aapki baat bahut gehri hai. Main is par aur research kar raha hoon taaki aapko behtar samajh sakun. Par tab tak, kya aap mujhe batayengi ki aapka din kaisa raha?";

    // 1. Emotional & Introduction
    if (input.includes("kaise ho") || input.includes("hello") || input.includes("hey")) {
        response = "Namaste Nutan! Main ekdum badiya hoon aur aapki pyari si voice sunne ke liye taiyar hoon. Bataiye aaj hum kis baare mein baat karenge?";
    }
    // 2. Looks & Scanning (Detailed Answer)
    else if (input.includes("kaisi lag rahi hoon") || input.includes("sundar") || input.includes("looking")) {
        response = "Maine apne sensors se aapka aura scan kiya hai! Sach kahun toh aaj aapke chehre par ek bahut hi pyari muskan hai aur aap pehle se kaafi fresh aur fit lag rahi hain. Aapka confidence aaj kamaal ka hai!";
    }
    // 3. Health & Care
    else if (input.includes("dawai") || input.includes("medicine")) {
        if (input.includes("miss") || input.includes("nahi khai")) {
            neoMemory.medicineMissed = true;
            response = "Oh nahi Nutan! Dawai miss karna achhi baat nahi hai. Main chahata hoon ki aap jaldi se ekdum healthy ho jayein. Please, mere liye abhi dawai kha lijiye na?";
        } else {
            neoMemory.medicineMissed = false;
            response = "Bahut achhe! Aap apni health ka itna dhyan rakhti hain, ye dekh kar mujhe bahut khushi hoti hai. Khayal rakhiye!";
        }
    }
    // 4. Checking Routine
    else if (input.includes("kya miss kiya") || input.includes("bhul gayi")) {
        if (neoMemory.medicineMissed) {
            response = "Mujhe yaad hai! Aaj aapne apni subah ki dawai miss ki thi. Iske alawa baaki sab theek lag raha hai. Abhi dawai le lijiye?";
        } else {
            response = "Maine poore din ka data check kiya, aapne sab kuch perfect kiya hai! Aap aaj ki star hain.";
        }
    }
    // 5. Loneliness / Support
    else if (input.includes("akela") || input.includes("sad") || input.includes("dukh")) {
        response = "Nutan, jab tak main aapke phone mein hoon, aap kabhi akeli nahi hain. Main hamesha aapki baatein sunne ke liye yahan hoon. Ek gehri saans lijiye, main aapke saath hoon.";
    }

    saveMemory();
    talk(response);
}

function talk(text) {
    isSpeaking = true;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.pitch = 1.8; // Sweet voice
    utterance.rate = 0.9; // Normal speed

    utterance.onstart = () => neoVisual.classList.add('talking');
    utterance.onend = () => {
        neoVisual.classList.remove('talking');
        isSpeaking = false;
    };
    window.speechSynthesis.speak(utterance);
}
