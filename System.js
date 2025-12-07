/* =========================
   Nokia Button OS – System JS
   ========================= */

const BASE_URL = "https://alpraagood-droid.github.io/nokia-button-os/";

/* =========================
   Navigation System
   ========================= */

function go(screenId) {
    const screens = document.querySelectorAll(".screen");
    screens.forEach(screen => screen.classList.remove("active"));

    const target = document.getElementById(screenId);
    if (target) target.classList.add("active");

    updateNavBar(screenId);
}

/* =========================
   App Launcher
   ========================= */

function openApp(type, target) {
    if (type === "internal") {
        go(target);
    }

    if (type === "external") {
        window.open(target, "_blank");
    }
}

/* =========================
   Bottom Navigation
   ========================= */

function updateNavBar(screenId) {
    const items = document.querySelectorAll(".nav-item");
    items.forEach(i => i.classList.remove("active"));

    if (screenId === "home-screen") items[0]?.classList.add("active");
    if (screenId === "phone-screen" || screenId === "call-screen") items[1]?.classList.add("active");
    if (screenId === "messages-screen") items[2]?.classList.add("active");
    if (screenId === "settings-screen") items[3]?.classList.add("active");
}

/* =========================
   Dial System
   ========================= */

let currentNumber = "";
let callInterval = null;
let callSeconds = 0;

function dialNumber(num) {
    currentNumber += num;
    renderNumber();
}

function deleteNumber() {
    currentNumber = currentNumber.slice(0, -1);
    renderNumber();
}

function renderNumber() {
    const el = document.getElementById("dial-number");
    el.textContent = currentNumber || "...";
}

/* =========================
   Call System
   ========================= */

function makeCall() {
    if (!currentNumber) currentNumber = "+20 100 123 4567";
    document.getElementById("caller-number").textContent = currentNumber;
    go("call-screen");
    startCallTimer();
}

function startCallTimer() {
    callSeconds = 0;
    clearInterval(callInterval);

    callInterval = setInterval(() => {
        callSeconds++;
        const min = String(Math.floor(callSeconds / 60)).padStart(2, "0");
        const sec = String(callSeconds % 60).padStart(2, "0");
        document.getElementById("current-call-timer").textContent = `${min}:${sec}`;
    }, 1000);
}

function endCall() {
    clearInterval(callInterval);
    currentNumber = "";
    renderNumber();
    go("phone-screen");
}

/* =========================
   Time System
   ========================= */

function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const date = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
    });

    document.getElementById("lock-time").textContent = time;
    document.getElementById("lock-date").textContent = date;
    document.getElementById("outer-time").textContent = time;
    document.getElementById("outer-date").textContent = date;
}

/* =========================
   Power / Lock Screen
   ========================= */

function unlock() {
    document.getElementById("outer-screen").classList.add("hidden");
    go("home-screen");
}

/* =========================
   Init
   ========================= */

function initSystem() {
    updateTime();
    setInterval(updateTime, 1000);
    renderNumber();
    go("lock-screen");
}

window.onload = initSystem;

/* =========================
   External Apps Shortcuts
   ========================= */

function openYouTube() {
    openApp("external", BASE_URL + "youtube-lite/");
}

function openGoogle() {
    openApp("external", BASE_URL + "google-go/");
}

function openFacebook() {
    openApp("external", BASE_URL + "facebook-lite/");
}

function openX() {
    openApp("external", BASE_URL + "x-lite/");
}
