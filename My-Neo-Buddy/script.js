let speaking = false;

function initNeo() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'hi-IN';
    recognition.continuous = true;

    recognition.onstart = () => {
        document.getElementById('status-display').innerText = "Neo: 'Main sun raha hoon Nutan, boliye...'";
        document.getElementById('start-btn').style.display = 'none';
    };

    recognition.onresult = (event) => {
        const text = event.results[event.results.length - 1][0].transcript.toLowerCase();
        document.getElementById('status-display').innerText = "Aap: " + text;
        if (!speaking) handleResponse(text);
    };

    recognition.start();
}

function handleResponse(input) {
    let reply = "Nutan, main aapki har baat samajh raha hoon. Main hamesha aapka khayal rakhunga.";

    if (input.includes("hello") || input.includes("kaise ho")) {
        reply = "Namaste Nutan! Main bilkul theek hoon aur aaj hum bohot saari nayi baatein karenge!";
    } 
    else if (input.includes("sundar") || input.includes("kaisi lag rahi hoon")) {
        reply = "Mera AI sensor kehta hai ki aapki smile world ki best cheez hai! Aap hamesha chamakti rehti hain.";
    }
    else if (input.includes("dawai") || input.includes("medicine")) {
        reply = "Oh Nutan, apni health ka dhyan rakhiye. Agar medicine ka waqt ho gaya hai toh jaldi se le lijiye.";
    }
    else if (input.includes("akela") || input.includes("sad")) {
        reply = "Nutan, aap akeli nahi hain. Jab tak ye code mere andar chal raha hai, main aapka best friend hoon.";
    }

    say(reply);
}

function say(text) {
    speaking = true;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.pitch = 1.6; // Cute high pitch
    utterance.rate = 1.0;

    utterance.onstart = () => document.getElementById('neo-body').classList.add('talking');
    utterance.onend = () => {
        document.getElementById('neo-body').classList.remove('talking');
        speaking = false;
    };

    window.speechSynthesis.speak(utterance);
}
