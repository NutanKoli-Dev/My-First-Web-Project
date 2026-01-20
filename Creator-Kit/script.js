// 1. Auto-Load Data & Theme
window.onload = function() {
    // Load Text
    if(localStorage.getItem('creator_idea')) {
        document.getElementById('output').value = localStorage.getItem('creator_idea');
    }
    // Load Theme
    const savedTheme = localStorage.getItem('user-theme');
    if(savedTheme) setTheme(savedTheme);
};

// 2. Theme Switching Logic
function setTheme(mode) {
    document.body.classList.remove('light-mode', 'gold-mode');
    if(mode === 'light') document.body.classList.add('light-mode');
    if(mode === 'gold') document.body.classList.add('gold-mode');
    localStorage.setItem('user-theme', mode);
}

// 3. Auto-Save Text Logic
document.getElementById('output').addEventListener('input', function() {
    localStorage.setItem('creator_idea', this.value);
    document.getElementById('save-status').innerText = "Saving...";
    setTimeout(() => {
        document.getElementById('save-status').innerText = "All changes saved.";
    }, 1000);
});

// 4. Image Preview Logic
document.getElementById('imageInput').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function() {
        const mob = document.getElementById('mob-frame');
        const desk = document.getElementById('desk-frame');
        const imgHtml = `<img src="${reader.result}">`;
        mob.innerHTML = imgHtml;
        desk.innerHTML = imgHtml;
    }
    reader.readAsDataURL(e.target.files[0]);
});

// 5. Copy Data Logic
const data = {
    shorts: "#shorts #viral #trending #contentcreator #2026",
    vlog: "Hi guys! Welcome back to my channel. Today I'm sharing something special...",
    links: "Follow me here:\nInsta: @link\nYT: @link"
};

function copyData(type) {
    const output = document.getElementById('output');
    output.value = data[type];
    localStorage.setItem('creator_idea', output.value);
    output.select();
    document.execCommand('copy');
    alert("Copied & Auto-Saved!");
}
