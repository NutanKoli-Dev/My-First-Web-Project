const statusText = document.getElementById('status');
const chatText = document.getElementById('chat-text');

// 1. Robot ka Bolna (Speech Synthesis)
function speak(text) {
    const textToSpeak = new SpeechSynthesisUtterance(text);
    textToSpeak.rate = 1;
    textToSpeak.pitch = 1.2;
    window.speechSynthesis.speak(textToSpeak);

    // Jab robot bolna khatam kare, tab sunna shuru kare
    textToSpeak.onend = () => {
        startListening();
    };
}

// 2. Aapki baat sunna (Speech Recognition)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
    statusText.innerText = "Neo: Listening...";
};

recognition.onresult = (event) => {
    const command = event.results[0][0].transcript;
    chatText.innerText = "You: " + command;
    processCommand(command);
};

function startListening() {
    recognition.start();
}

// 3. Dimag (Commands)
function processCommand(msg) {
    msg = msg.toLowerCase();
    if (msg.includes("hello")) {
        speak("Hello Nutan, how can I help you today?");
    } else if (msg.includes("kaise ho")) {
        speak("Main badhiya hoon, aap bataiye?");
    } else {
        speak("I heard you say " + msg + ". That's interesting!");
    }
}

// Page load hote hi pehli baar bolna
window.onload = () => {
    speak("Hello Nutan! I am Neo. I am ready to talk.");
};
