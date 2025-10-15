// script.js — Frontend with daily reset + backend integration

// ---- Config ----
const TWO_HOURS = 7200; // seconds (change to 60 or 120 for demo)
const CHECK_INTERVAL_MS = 1000; // update every second
const BACKEND_URL = "http://127.0.0.1:5000"; // change if backend hosted elsewhere

// ---- Roast data (fallback) ----
const roasts = {
  Hopeless: [
    "Maybe your assignment will finish itself?",
    "Even your WiFi is ghosting your productivity.",
    "Hopeless detected. Touch some grass maybe?"
  ],
  Distracted: [
    "Instagram won’t hire you, buddy.",
    "You have 99 tabs open and 0 plans. Cute.",
    "Procrastination level: Legendary."
  ],
  Focused: [
    "Look at you, coding like a Sigma dev!",
    "Einstein vibes detected. Keep that up!",
    "You’re on a roll. Don’t stop now."
  ]
};

// ---- State ----
let focusMode = false;
let meterInterval = null;
let mute = false;

// focusedSeconds is cumulative focused time (persists in localStorage)
function getPersistedSeconds(){ return parseInt(localStorage.getItem('focusedSeconds') || '0', 10); }
let focusedSeconds = getPersistedSeconds();

// ---- DAILY RESET LOGIC ----
function checkDailyReset(){
  const today = new Date().toISOString().slice(0,10); // "YYYY-MM-DD"
  const lastDate = localStorage.getItem('focusDate');
  if(lastDate !== today){
    // If it's a new day, reset focusedSeconds
    focusedSeconds = 0;
    localStorage.setItem('focusedSeconds', '0');
    localStorage.setItem('focusDate', today);
    // optional: clear roast log
    const roastLog = document.getElementById("roastLog");
    if(roastLog) roastLog.innerHTML = '<p class="muted">No roasts yet — be good 👀</p>';
  }
}
// call on load
checkDailyReset();

// ---- DOM ----
const startBtn = document.getElementById("startBtn");
const roastBtn = document.getElementById("roastBtn");
const statusText = document.getElementById("statusText");
const timeText = document.getElementById("timeText");
const meterFill = document.getElementById("meterFill");
const roastLog = document.getElementById("roastLog");
const roastPopup = document.getElementById("roastPopup");
const popupText = document.getElementById("popupText");
const muteBtn = document.getElementById("muteBtn");
const resetBtn = document.getElementById("resetBtn");

// ---- Utils ----
function playBeep(){
  if(mute) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = 520;
    g.gain.value = 0.04;
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    setTimeout(()=>{ o.stop(); ctx.close(); }, 120);
  } catch(e){ /* ignore */ }
}

function speak(text){
  if(mute) return;
  if('speechSynthesis' in window){
    const ut = new SpeechSynthesisUtterance(text);
    ut.rate = 1.05;
    ut.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(ut);
  }
}

function showRoastPopup(text){
  popupText.textContent = text;
  roastPopup.classList.add('show');
  setTimeout(()=> roastPopup.classList.remove('show'), 2500);
  roastLog.innerHTML = `<div style="margin-bottom:8px;"><strong>AI:</strong> ${text}</div>` + roastLog.innerHTML;
}

// format seconds as H:M:S
function formatTime(totalSec){
  const hrs = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  if(hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
  if(mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}

function saveFocusedSeconds(){ localStorage.setItem('focusedSeconds', String(focusedSeconds)); }
function focusedPercent(){
  const pct = (focusedSeconds / TWO_HOURS) * 100;
  return Math.min(100, Math.round(pct * 100) / 100); // 2 decimals
}

function updateUIAfterTick(){
  const pct = focusedPercent();
  meterFill.style.width = pct + '%';
  timeText.textContent = formatTime(focusedSeconds);
  if(pct >= 100){
    showRoastPopup("Full Focus Achieved! You just crushed 2 hours 🔥");
    speak("Congratulations! Two hours of focus complete.");
    playBeep();
  }
}

// ---- Fake predictor (local fallback) ----
function localFakePredict(){
  const badAppsOpen = Math.floor(Math.random() * 4); // 0..3
  const idleTime = Math.floor(Math.random() * 600);   // seconds

  let state = "Focused";
  if (badAppsOpen > 2 || idleTime > 300) state = "Hopeless";
  else if (badAppsOpen === 1 || idleTime > 120) state = "Distracted";

  const roastArr = roasts[state];
  const roast = roastArr[Math.floor(Math.random() * roastArr.length)];
  return {state, roast, badAppsOpen, idleTime};
}

// ---- BACKEND CALL: /predict (POST) ----
async function callBackendPredict(payload){
  try {
    const res = await fetch(BACKEND_URL + "/predict", {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload),
    });
    if(!res.ok) throw new Error('bad response');
    const data = await res.json();
    return data; // should contain { state, roast, prob? }
  } catch (err){
    // network error or backend not available
    return null;
  }
}

// ---- wrapper that tries backend first then fallback ----
async function getPrediction(){ 
  // Prepare some activity metrics — you can improve by sending real metrics later
  const payload = {
    focusedSeconds: focusedSeconds,
    badAppsOpen: Math.floor(Math.random() * 4),
    idleTime: Math.floor(Math.random() * 600)
  };

  const backendResp = await callBackendPredict(payload);
  if(backendResp){
    return {
      state: backendResp.state,
      roast: backendResp.roast
    };
  }
  // fallback
  return localFakePredict();
}

// ---- Focus control ----
function startFocus(){
  if(focusMode) return;
  focusMode = true;
  startBtn.textContent = "Stop Focus Mode";
  playBeep();

  // ensure UI reflects stored focusedSeconds immediately
  updateUIAfterTick();

  meterInterval = setInterval(async ()=>{
    focusedSeconds += 1;
    saveFocusedSeconds();
    // daily reset check while running (in case date flips at midnight)
    const today = new Date().toISOString().slice(0,10);
    if(localStorage.getItem('focusDate') !== today){
      // new day: reset and update local date (prevents carrying hours across days)
      focusedSeconds = 1; // this current second counts for new day
      localStorage.setItem('focusDate', today);
      saveFocusedSeconds();
    }

    updateUIAfterTick();

    // every N seconds run a prediction (8s for demo)
    if(focusedSeconds % 8 === 0){
      const pred = await getPrediction(); // tries backend, falls back locally
      statusText.innerHTML = `Status: <strong>${pred.state}</strong>`;
      if(pred.state === "Distracted" || pred.state === "Hopeless"){
        showRoastPopup(pred.roast);
        speak(pred.roast);
        playBeep();
      }
    }

    // safety cap
    if(focusedSeconds >= TWO_HOURS){
      focusedSeconds = TWO_HOURS;
      saveFocusedSeconds();
      updateUIAfterTick();
    }
  }, CHECK_INTERVAL_MS);
}

function stopFocus(){
  if(!focusMode) return;
  focusMode = false;
  startBtn.textContent = "Start Focus Mode";
  clearInterval(meterInterval);
  playBeep();
}

// ---- Buttons ----
startBtn.addEventListener('click', ()=>{
  if(!focusMode) startFocus();
  else stopFocus();
});

roastBtn.addEventListener('click', async ()=>{
  const pred = await getPrediction();
  statusText.innerHTML = `Status: <strong>${pred.state}</strong>`;
  showRoastPopup(pred.roast);
  speak(pred.roast);
  playBeep();
});

muteBtn.addEventListener('click', ()=>{
  mute = !mute;
  muteBtn.textContent = mute ? '🔇' : '🔊';
});

resetBtn.addEventListener('click', ()=>{
  stopFocus();
  focusedSeconds = 0;
  // update stored date to today so daily reset won't immediately wipe again
  localStorage.setItem('focusDate', new Date().toISOString().slice(0,10));
  saveFocusedSeconds();
  updateUIAfterTick();
  roastLog.innerHTML = '<p class="muted">No roasts yet — be good 👀</p>';
});

// ---- Init UI on load ----
document.addEventListener('DOMContentLoaded', ()=>{
  // ensure a focusDate exists
  if(!localStorage.getItem('focusDate')){
    localStorage.setItem('focusDate', new Date().toISOString().slice(0,10));
  } else {
    // validate yesterday -> today reset
    checkDailyReset();
  }
  updateUIAfterTick();
});
