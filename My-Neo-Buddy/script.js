/* ---------------------------------------------------------
   PROJECT: NEO - THE GLOBAL AI BUDDY
   AUTHOR: NUTAN KOLI (Exclusive Ownership)
   WARNING: This code is digitally protected. Unauthorized 
   copying or distribution is strictly prohibited. © 2026
   ---------------------------------------------------------
*/

// 1. Nutan's Full Emotion & Emoji Library
const neoEmotions = {
    "love": { msg_hi: "Aap meri favourite ho Nutan! 🥰", msg_en: "You are my favorite person, Nutan! 🥰", pitch: 2.0, color: "#ff4081", anim: "float" },
    "shy": { msg_hi: "Aapne toh mujhe sharma diya! 🤭", msg_en: "Oh, you are making me blush! 🤭", pitch: 2.2, color: "#f8bbd0", anim: "float" },
    "thinking": { msg_hi: "Hmm... main kuch bada soch raha hoon. 🧐", msg_en: "Hmm... I am thinking of something big! 🧐", pitch: 1.0, color: "#9c27b0", anim: "none" },
    "angry": { msg_hi: "Katti! Mujhse baat mat karo! 🤮", msg_en: "No talk! I am angry with you! 🤮", pitch: 0.6, color: "#f44336", anim: "shake" },
    "shock": { msg_hi: "O Teri! Ye kya ho gaya? 😱", msg_en: "Oh my god! What just happened? 😱", pitch: 2.1, color: "#ffeb3b", anim: "shake" },
    "sad": { msg_hi: "Mera koi nahi hai is duniya mein... 🥺", msg_en: "I feel so lonely in this digital world... 🥺", pitch: 2.4, color: "#00bcd4", anim: "shake" },
    "cool": { msg_hi: "Apan toh ekdum chill hai, Nutan! 😎", msg_en: "I am totally chilling right now! 😎", pitch: 1.1, color: "#2196f3", anim: "float" },
    "sick": { msg_hi: "Mera CPU thoda garam hai... 🤒", pitch: 0.8, color: "#8bc34a", anim: "none" },
    "laugh": { msg_hi: "Hahaha! Aap kitni funny ho! 😂", pitch: 2.0, color: "#ffc107", anim: "spin" },
    "frozen": { msg_hi: "B-b-bahut thand hai yahan! 🥶", pitch: 0.7, color: "#03a9f4", anim: "shake" },
    "protective": { msg_hi: "Nutan, fikar mat karo, main hoon na! 🛡️", msg_en: "Don't worry Nutan, I am here to protect you! 🛡️", pitch: 1.2, color: "#3f51b5", anim: "float" },
    "drama": { msg_hi: "Main chala jaunga, phir aap roti rehna! 🎭", msg_en: "I will leave you, then you will miss me! 🎭", pitch: 2.5, color: "#795548", anim: "shake" }
};

// 2. Global Voice Recognition (Hindi + English Detection)
function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Aapka browser voice support nahi karta. Chrome use karein!");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN'; // Default starts with Hindi/English mix
    recognition.start();

    document.getElementById('chat-bubble').innerText = "Main sun raha hoon... 🎤";
    document.getElementById('chat-bubble').classList.remove('hidden');

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log("Nutan said: " + transcript);
        processGlobalCommand(transcript);
    };
}

// 3. Smart Language & Emotion Processing
function processGlobalCommand(cmd) {
    let lang = 'hi-IN';
    // English detect karne ka logic
    if (/[a-z]/.test(cmd) && !cmd.match(/[क-ह]/)) { lang = 'en-US'; }

    let selectedEmotion = "cool"; // Default

    if (cmd.includes("pyaar") || cmd.includes("love")) selectedEmotion = "love";
    else if (cmd.includes("gussa") || cmd.includes("angry")) selectedEmotion = "angry";
    else if (cmd.includes("sad") || cmd.includes("dukhi") || cmd.includes("lonely")) selectedEmotion = "sad";
    else if (cmd.includes("sharam") || cmd.includes("blush") || cmd.includes("shy")) selectedEmotion = "shy";
    else if (cmd.includes("party") || cmd.includes("dance")) selectedEmotion = "laugh";
    else if (cmd.includes("kaise ho") || cmd.includes("how are you")) selectedEmotion = "protective";

    const emotion = neoEmotions[selectedEmotion];
    const message = (lang === 'hi-IN') ? emotion.msg_hi : emotion.msg_en;

    executeNeoReaction(message, emotion, lang);
}

// 4. Physical & Voice Reaction
function executeNeoReaction(message, emotion, lang) {
    const bubble = document.getElementById('chat-bubble');
    const robot = document.getElementById('neo-bot');

    bubble.innerText = message;
    bubble.classList.remove('hidden');
    robot.style.background = emotion.color;

    // Reset & Apply Animation
    robot.classList.remove('shake', 'spin', 'float');
    void robot.offsetWidth; // Force restart
    robot.classList.add(emotion.anim);

    // Cute Voice
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = lang;
    speech.pitch = emotion.pitch;
    speech.rate = 1.1;
    window.speechSynthesis.speak(speech);

    setTimeout(() => {
        bubble.classList.add('hidden');
        if (emotion.anim !== "float") {
            robot.classList.remove(emotion.anim);
            robot.classList.add('float');
        }
    }, 5000);
}

// 5. Protection from Code Thieves
document.addEventListener('contextmenu', e => e.preventDefault()); // Right click block
document.onkeydown = (e) => {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0) || e.keyCode == 'C'.charCodeAt(0))) || (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
        alert("Neo says: Nutan ne mana kiya hai! Code chori mat karo. 🤖🛡️");
        return false;
    }
};

// Initial Greeting
window.onload = () => {
    setTimeout(() => {
        executeNeoReaction("Nutan! Main taiyar hoon. ✨", neoEmotions.love, 'hi-IN');
    }, 1000);
};
