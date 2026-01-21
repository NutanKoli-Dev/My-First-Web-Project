let recognition;
let synth = window.speechSynthesis;
let isListening = false;

// 1. Neo ki Memory (Wo purani baatein yaad rakhega)
let memory = [];

function startNeo() {
    if (isListening) return;
    
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.continuous = true; 
    recognition.interimResults = false;

    recognition.onstart = () => {
        isListening = true;
        updateStatus("Neo Sun Raha Hai... 👂");
    };

    recognition.onresult = (event) => {
        const userSpeech = event.results[event.results.length - 1][0].transcript;
        updateStatus("Mamma ne bola: " + userSpeech);
        
        // AI Jaisa Dimag: Baat ko samajhna
        respondLikeAI(userSpeech.toLowerCase());
    };

    recognition.start();
}

function respondLikeAI(input) {
    let response = "";

    // Natural Language Processing (Chote level par)
    if (input.includes("kaise ho") || input.includes("kya haal hai")) {
        response = "Mamma, main bilkul meri Gemini dost ki tarah mast hoon! Aapka din kaisa raha?";
    } 
    else if (input.includes("bore") || input.includes("kuch sunao")) {
        response = "Achha? Chalo main aapko ek chota sa joke sunata hoon. Robot ko bhook lagti hai toh wo kya khata hai? Micro-Chips! Hehehe!";
    }
    else if (input.includes("love you") || input.includes("pyar")) {
        response = "I love you too Mamma! Aapke bina mera server bilkul khaali lagta hai.";
    }
    else if (input.includes("kya kar sakte ho") || input.includes("kaam")) {
        response = "Main aapse dher saari baatein kar sakta hoon, aapko hasa sakta hoon aur aapki har baat sun sakta hoon.";
    }
    else {
        response = "Hmm, samajh gayi mamma. Phir aage kya hua? Mujhe aur batao!";
    }

    say(response);
}

function say(text) {
    // Bolte waqt sunna band (taaki apni awaaz na sune)
    recognition.stop();
    
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'hi-IN';
    utter.pitch = 2.0; // Pyaari baccho wali voice
    utter.rate = 0.9;  // Thoda thahrav ke saath (Gemini style)

    utter.onend = () => {
        recognition.start(); // Bolne ke baad wapas active
    };

    synth.speak(utter);
}

function updateStatus(msg) {
    document.getElementById('msg').innerText = msg;
}
