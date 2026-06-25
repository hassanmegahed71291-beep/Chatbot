// ====================================
// Quality AI Academy
// Developed By Hassan Megahed
// ====================================

// Elements

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

const pages = document.querySelectorAll(".page");
const menuItems = document.querySelectorAll(".sidebar li");

const loginScreen = document.getElementById("loginScreen");
const enterBtn = document.getElementById("enterBtn");

const langBtn = document.getElementById("langBtn");

// ======================
// Sidebar
// ======================

menuBtn.addEventListener("click", () => {

    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");

});

// Close sidebar when click overlay

overlay.addEventListener("click", () => {

    sidebar.classList.remove("active");
    overlay.classList.remove("active");

});

// ======================
// Page Navigation
// ======================

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        const pageId = item.dataset.page;

        pages.forEach(page => {

            page.classList.remove("active-page");

        });

        document
        .getElementById(pageId)
        .classList.add("active-page");

        sidebar.classList.remove("active");
        overlay.classList.remove("active");

    });

});

// ======================
// Login System
// ======================

const savedUser =
localStorage.getItem("qai_user");

if(savedUser){

    loginScreen.style.display = "none";

}

enterBtn.addEventListener("click", () => {

    const fullName =
    document.getElementById("fullName").value;

    const position =
    document.getElementById("position").value;

    const department =
    document.getElementById("department").value;

    if(fullName === ""){

        alert("Please Enter Your Name");

        return;

    }

    const user = {

        name:fullName,
        position:position,
        department:department,
        points:0,
        level:"Beginner"

    };

    localStorage.setItem(
        "qai_user",
        JSON.stringify(user)
    );

    loginScreen.style.display="none";

    showWelcome();

});

// ======================
// Welcome Message
// ======================

function showWelcome(){

    const user =
    JSON.parse(
        localStorage.getItem("qai_user")
    );

    setTimeout(()=>{

        alert(

            "Welcome " +
            user.name +
            "\n\nQuality AI Academy" +
            "\n\nManaged By Hassan Megahed"

        );

    },500);

}

if(savedUser){

    showWelcome();

}

// ======================
// Motivation Messages
// ======================

const motivationMessages = [

"Quality starts with attention to detail.",

"A clean workplace prevents defects.",

"Teamwork creates excellence.",

"Every defect is an opportunity to improve.",

"Inspection today prevents complaints tomorrow.",

"Quality is everyone's responsibility.",

"Continuous improvement creates world class results.",

"Clean tables create better quality.",

"Organization reduces mistakes.",

"Small improvements make big differences."

];

const motivationText =
document.getElementById("motivationText");

function updateMotivation(){

    const randomIndex =
    Math.floor(
        Math.random() *
        motivationMessages.length
    );

    motivationText.innerText =
    motivationMessages[randomIndex];

}

updateMotivation();

setInterval(updateMotivation,10000);

// ======================
// Language System
// ======================

let currentLanguage = "en";

langBtn.addEventListener("click",()=>{

    if(currentLanguage === "en"){

        currentLanguage = "ar";

        document.body.dir = "rtl";

        langBtn.innerHTML =
        "🇺🇸 English";

        motivationText.innerHTML =
        "الجودة تبدأ من التفاصيل الصغيرة.";

    }

    else{

        currentLanguage = "en";

        document.body.dir = "ltr";

        langBtn.innerHTML =
        "🇪🇬 العربية";

        motivationText.innerHTML =
        "Quality starts with attention to detail.";

    }

});

// ======================
// User Profile
// ======================

function loadProfile(){

    const profileSection =
    document.getElementById("profile");

    const user =
    JSON.parse(
        localStorage.getItem("qai_user")
    );

    if(!user) return;

    profileSection.innerHTML =

    `
    <div class="section-card">

        <h2>👤 Profile</h2>

        <p><strong>Name:</strong> ${user.name}</p>

        <p><strong>Position:</strong> ${user.position}</p>

        <p><strong>Department:</strong> ${user.department}</p>

        <p><strong>Points:</strong> ${user.points}</p>

        <p><strong>Level:</strong> ${user.level}</p>

    </div>
    `;

}

loadProfile();

// ======================
// AI Chat UI
// ======================

const sendBtn =
document.getElementById("sendBtn");

const userInput =
document.getElementById("userInput");

const chatMessages =
document.getElementById("chatMessages");

sendBtn.addEventListener("click",sendMessage);

userInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        sendMessage();

    }

});

function sendMessage(){

    const message =
    userInput.value.trim();

    if(!message) return;

    addMessage(message,"user");

    userInput.value="";

    setTimeout(()=>{

        addMessage(
        "QAI Expert AI is ready. Gemini connection will be activated next step.",
        "bot"
        );

    },700);

}

function addMessage(text,type){

    const div =
    document.createElement("div");

    div.style.marginBottom="10px";

    div.style.padding="12px";

    div.style.borderRadius="10px";

    div.style.background =
    type==="user"
    ? "#06B6D4"
    : "#1E293B";

    div.innerText = text;

    chatMessages.appendChild(div);

    chatMessages.scrollTop =
    chatMessages.scrollHeight;

}

console.log(
"QAI Platform Loaded Successfully"
);
