function talkToMe() {
    const bubble = document.getElementById('chat-bubble');
    const messages = [
        "Nutan, tum bahut smart ho! ✨",
        "Aaj ka din kaisa raha? 🌈",
        "Hello! Chalo kuch naya banate hain. 🛠️",
        "Aapki home-screen par aakar maza aa gaya! 📱",
        "Main hamesha aapke saath hoon. 🤖"
    ];

    const randomText = messages[Math.floor(Math.random() * messages.length)];
    bubble.innerText = randomText;
    bubble.classList.remove('hidden');

    // 4 second baad message chhupa do
    setTimeout(() => {
        bubble.classList.add('hidden');
    }, 4000);
}
