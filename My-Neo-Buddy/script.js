const mouth = document.querySelector('.mouth');
const eyes = document.querySelectorAll('.eye');

// 1. Secret Mamma Recognition
function startNeo() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'hi-IN'; recognition.continuous = true;
    recognition.start();

    recognition.onresult = (event) => {
        const text = event.results[event.results.length - 1][0].transcript.toLowerCase();
        if (text.includes("mamma") || text.includes("main hoon")) {
            neoTalk("laugh", "Mamma! 🥰 Main aa gaya! Aap kaise ho?", 2.2);
        } else if (text.includes("hello") || text.includes("hi")) {
            neoTalk("smile", "Hello friends! Main Neo hoon, Nutan Mamma ka baby! ✨", 1.8);
        } else if (text.includes("khana")) {
            neoTalk("eat", "Mmm... Tasty! Main khana kha raha hoon! 🍱", 1.5);
        }
    };
}

function neoTalk(exp, msg, p) {
    mouth.className = 'mouth ' + exp;
    const s = new SpeechSynthesisUtterance(msg);
    s.pitch = p; s.lang = 'hi-IN';
    window.speechSynthesis.speak(s);
    setTimeout(() => { mouth.className = 'mouth'; }, 4000);
}

// Finger following
document.addEventListener('mousemove', (e) => {
    eyes.forEach(eye => {
        let x = (e.clientX / window.innerWidth) * 20 - 10;
        let y = (e.clientY / window.innerHeight) * 20 - 10;
        eye.style.transform = `translate(${x}px, ${y}px)`;
    });
});

window.onload = startNeo;
