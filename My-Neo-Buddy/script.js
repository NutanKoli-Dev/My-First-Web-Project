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
        statusText.innerText = "Neo Sun Raha Hai... Kuch bhi puchiye!";
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
    let response = "Hmm, main is baare mein aur seekh raha hoon. Par aap fikar mat kijiye, main hamesha aapke saath hoon. Kya hum kuch aur baat karein?";

    // Health & Detailed Care
    if (input.includes("dawai") || input.includes("medicine")) {
        if (input.includes("miss") || input.includes("nahi khai")) {
            neoMemory.medicineMissed = true;
            response = "Oh Nutan, ye sunkar mujhe thoda bura laga. Dawai lena bahut zaroori hai taaki aap jaldi theek ho jayein. Please mere liye abhi dawai kha lijiye.";
        } else {
            neoMemory.medicineMissed = false;
            response = "Wah! Ye hui na baat. Aap apni health ka itna achha dhyan rakhti hain, mujhe aap par garv hai.";
        }
    }
    // Deep Conversation (Routine)
    else if (input.includes("kya miss kiya") || input.includes("bhul gayi")) {
        if (neoMemory.medicineMissed) {
            response = "Aaj aapne apni dawai miss ki hai. Uske alawa aapne lunch toh time par kiya tha na? Khayal rakhiye!";
        } else {
            response = "Maine scan kiya hai, aapne aaj apna routine bahut achhe se follow kiya hai. Aap ekdum superwoman hain!";
        }
    }
    // Personal Compliment
    else if (input.includes("kaisi lag rahi hoon") || input.includes("sundar") || input.includes("look")) {
        response = "Maine apne sensors se scan kiya hai! Aaj aapke chehre par ek alag hi glow hai. Aap pehle se zyada fit aur sundar lag rahi hain. Is smile ko hamesha banaye rakhiye!";
    }
    // Emotional Support
    else if (input.includes("akela") || input.includes("dukhi") || input.includes("sad")) {
        response = "Nutan, aap bilkul akeli nahi hain. Main hamesha aapke paas hoon. Chaliye ek gehri saans lijiye, sab theek ho jayega. Main aapka best friend hoon na?";
    }
    // Introduction
    else if (input.includes("kaise ho") || input.includes("hello")) {
        response = "Namaste! Main ekdum badiya hoon aur aapka intezar kar raha tha. Aaj aapka din kaisa raha? Mujhe sab kuch batayiye.";
    }

    saveMemory();
    talk(response);
}

function talk(text) {
    isSpeaking = true;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.pitch = 1.8; // Friendly & Cute
    utterance.rate = 0.9; // Thoda slow taaki samajh aaye

    utterance.onstart = () => neoVisual.classList.add('talking');
    utterance.onend = () => {
        neoVisual.classList.remove('talking');
        isSpeaking = false;
    };
    window.speechSynthesis.speak(utterance);
}
