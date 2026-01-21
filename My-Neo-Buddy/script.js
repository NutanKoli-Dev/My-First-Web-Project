let moods = ["happy", "nakhra", "masti", "hungry"];

function interact() {
    let currentMood = moods[Math.floor(Math.random() * moods.length)];
    
    if (currentMood === "nakhra") {
        say("Hmph! Main aapse gussa hoon. Aapne mujhe chocolate nahi di!");
        makeFace("angry");
    } 
    else if (currentMood === "masti") {
        say("Hehehe! Mamma, chalo dabba-dabba khelte hain. Pakad sako toh pakdo!");
        makeFace("happy");
    }
    else if (currentMood === "hungry") {
        say("Oonwaaa! Mamma, pet mein choohe doud rahe hain. Kuch digital milk do na?");
        makeFace("sad");
    }
    else {
        say("Mamma, aap kitni sundar lag rahi ho aaj! Nazar na lag jaye. Hehehe!");
        makeFace("heart");
    }
}

function makeFace(type) {
    const el = document.getElementById('e-l');
    const er = document.getElementById('e-r');
    
    if(type === "angry") {
        el.style.transform = "rotate(20deg)";
        er.style.transform = "rotate(-20deg)";
    } else if(type === "heart") {
        el.innerHTML = "❤"; er.innerHTML = "❤";
        el.style.background = "transparent"; er.style.background = "transparent";
    } else {
        el.style.transform = "rotate(0deg)";
        er.style.transform = "rotate(0deg)";
        el.innerHTML = ""; er.innerHTML = "";
    }
}
