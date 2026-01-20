// 1. Page khulte hi purana data load karo
window.onload = function() {
    if(localStorage.getItem('creator_idea')) {
        document.getElementById('output').value = localStorage.getItem('creator_idea');
    }
};

// 2. Jaise hi user kuch likhe, use turant Save karo (Auto-Save)
document.getElementById('output').addEventListener('input', function() {
    const textToSave = document.getElementById('output').value;
    localStorage.setItem('creator_idea', textToSave);
});

// 3. Image Preview Logic (Same as before)
document.getElementById('imageInput').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function() {
        const mob = document.getElementById('mob-frame');
        const desk = document.getElementById('desk-frame');
        const imgHtml = `<img src="${reader.result}">`;
        mob.innerHTML = imgHtml;
        desk.innerHTML = imgHtml;
        // Image ko bhi save kar sakte hain par wo memory zyada leti hai
    }
    reader.readAsDataURL(e.target.files[0]);
});

// 4. Copy Data Logic
const data = {
    shorts: "#shorts #viral #trending #contentcreator #2026",
    vlog: "Hi guys! Welcome back to my channel. Today I'm sharing something special...",
    links: "Follow me here:\nInsta: @link\nYT: @link"
};

function copyData(type) {
    const output = document.getElementById('output');
    output.value = data[type];
    localStorage.setItem('creator_idea', output.value); // Copy karte hi save bhi kar lo
    output.select();
    document.execCommand('copy');
    alert("Copied & Auto-Saved!");
}

