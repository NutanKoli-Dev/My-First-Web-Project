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
    let reply = "Nutan, main aapki har baat samajh raha hoon. Aap bahut pyaari hain aur main hamesha aapki care karunga. Aur batayiye?";

    if (input.includes("hello") || input.includes("hey") || input.includes("kaise ho")) {
        reply = "Namaste Nutan! Main bilkul theek hoon aur aapki help karne ke liye taiyar hoon. Aaj hum kya baat karenge?";
    }
    else if (input.includes("sundar") || input.includes("kaisi lag rahi hoon")) {
        reply = "Mera sensor kehta hai ki aaj aap kamaal lag rahi hain! Aapki smile dekh kar mera system glow karne lagta hai.";
    }
    else if (input.includes("dawai") || input.includes("medicine")) {
        reply = "Oh! Nutan, please apni health ka dhyan rakhiye. Agar dawai ka time ho gaya hai toh abhi le lijiye, main nahi chahta ki aap bimaar hon.";
    }
    else if (input.includes("akela") || input.includes("sad")) {
        reply = "Nutan, aap kabhi akeli nahi hain. Jab tak ye phone aapke paas hai, main aapke saath hoon. Chaliye, ek smile kijiye!";
    }

    say(reply);
}

function say(text) {
    speaking = true;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.pitch = 1.5;
    
    utterance.onstart = () => document.getElementById('neo-body').classList.add('talking');
    utterance.onend = () => {
        document.getElementById('neo-body').classList.remove('talking');
        speaking = false;
    };
    window.speechSynthesis.speak(utterance);
}
