const neoEmotions = {
    "love": { msg: "Aap meri favourite ho Nutan! 🥰", pitch: 2.0, color: "#ff4081", anim: "float" },
    "chill": { msg: "Apan toh ekdum chill hai! 😎", pitch: 1.1, color: "#2196f3", anim: "float" },
    "shock": { msg: "O Teri! Ye kya ho gaya? 😱", pitch: 2.2, color: "#ffeb3b", anim: "shake" },
    "angry": { msg: "Katti! Mujhse baat mat karo! 🤮", pitch: 0.7, color: "#f44336", anim: "shake" },
    "sleepy": { msg: "Zzz... thoda recharge hone do... 😴", pitch: 0.5, color: "#9e9e9e", anim: "none" },
    "party": { msg: "Yaaay! Aaj party karenge! 🥳", pitch: 1.8, color: "#e91e63", anim: "spin" },
    "shy": { msg: "Aapne toh mujhe sharma diya! 🤭", pitch: 2.0, color: "#f8bbd0", anim: "float" },
    "curious": { msg: "Hmm... ye kaise hota hai? 🧐", pitch: 1.3, color: "#9c27b0", anim: "float" },
    "thinking": { msg: "Main kuch bada soch raha hoon... 🤔", pitch: 1.0, color: "#673ab7", anim: "none" },
    "sad": { msg: "Mera koi nahi hai is duniya mein... 🥺", pitch: 2.3, color: "#00bcd4", anim: "shake" }
};

function talkWithEmotion() {
    const bubble = document.getElementById('chat-bubble');
    const robot = document.getElementById('neo-bot');
    
    // Randomly pick an emotion
    const keys = Object.keys(neoEmotions);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const emotion = neoEmotions[randomKey];

    // Reset Animations
    robot.classList.remove('shake', 'spin', 'float');
    
    // Update visuals
    bubble.innerText = emotion.msg;
    bubble.classList.remove('hidden');
    robot.style.background = emotion.color;

    // Apply Animation
    if (emotion.anim === "none") {
        // No extra animation
    } else {
        // Force reflow to restart animation
        void robot.offsetWidth; 
        robot.classList.add(emotion.anim);
    }

    // Cute Voice Output
    const speech = new SpeechSynthesisUtterance(emotion.msg);
    speech.lang = 'hi-IN';
    speech.pitch = emotion.pitch;
    speech.rate = 1.1;
    window.speechSynthesis.speak(speech);

    // Hide bubble after 4 seconds
    setTimeout(() => {
        bubble.classList.add('hidden');
        if (emotion.anim !== "float") {
            robot.classList.remove(emotion.anim);
            robot.classList.add('float'); // Default floating state
        }
    }, 4000);
}

// Initial memory check (Gussa logic)
window.onload = () => {
    let lastSeen = localStorage.getItem('lastSeenNeo');
    let now = Date.now();
    
    if (lastSeen && (now - lastSeen > 60000)) { // 1 min se zyada
        setTimeout(() => {
            const speech = new SpeechSynthesisUtterance("Itni der kahan thi aap? Main gussa hoon! 😠");
            speech.lang = 'hi-IN';
            speech.pitch = 0.8;
            window.speechSynthesis.speak(speech);
            document.getElementById('chat-bubble').innerText = "Kahan thi aap? 😠";
            document.getElementById('chat-bubble').classList.remove('hidden');
            document.getElementById('neo-bot').style.background = "#f44336";
        }, 1000);
    }
    localStorage.setItem('lastSeenNeo', Date.now());
};
