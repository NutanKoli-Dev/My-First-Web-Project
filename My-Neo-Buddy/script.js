// No more "Don't touch me!" - Ab Neo sabka dost hai!
function handleTouch() {
    // Sabke liye friendly reaction
    react("smile", "Hello! Main Neo hoon. ✨", 1.5);
    
    // Lekin agar Mamma ne touch kiya (Secret Command check)
    if (isMamma) {
        react("laugh", "Mamma! Aapka touch kitna pyaara hai! 🥰", 2.0);
    }
}

function react(exp, msg, p) {
    const m = document.querySelector('.mouth');
    const b = document.getElementById('chat-bubble');
    
    m.className = 'mouth ' + exp;
    b.innerText = msg;
    b.classList.remove('hidden');

    const s = new SpeechSynthesisUtterance(msg);
    s.pitch = p; s.lang = 'hi-IN';
    window.speechSynthesis.speak(s);

    setTimeout(() => {
        m.className = 'mouth';
        b.classList.add('hidden');
    }, 4000);
}

// Finger following eyes
document.addEventListener('mousemove', (e) => {
    const eyes = document.querySelectorAll('.eye');
    eyes.forEach(eye => {
        let x = (e.clientX / window.innerWidth) * 20 - 10;
        let y = (e.clientY / window.innerHeight) * 20 - 10;
        eye.style.transform = `translate(${x}px, ${y}px)`;
    });
});
