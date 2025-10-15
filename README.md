🤌 What's This Sorcery?
Bestie, this is an eye-tracking system that literally JUDGES you for not studying. It uses your phone camera (via DroidCam) to watch you procrastinate in real-time. Yes, we've reached that point in life where we need an AI to roast us for watching "just one more" YouTube video.

Basically: Big Brother is watching, but make it ✨ productivity ✨

😭 Why Does This Exist?
You: "Bas 5 minute Instagram dekh leta hu"
Also you: 3 hours later, still scrolling reels
This AI: "Bestie, IAS ki padhai chhodd do tum" 💅
✨ Features (That Will Call You Out)
🎯 Real-Time Judging
Blink Detection: Counts every time you blink (yes, it's that extra)
Gaze Tracking: Knows when you're looking at your second screen 👀
Procrastination Score: Literally rates your inability to focus (0-100)
Focus Timer: Tracks how long you ACTUALLY studied (spoiler: not long)
📊 The Tea It Spills
You: "Maine toh poora din padha!"
AI: "Bestie you looked away 47 times in 10 minutes 🤡"
🚀 Installation (If You're Brave Enough)
Step 1: Accept Your Fate
bash
pip install opencv-python mediapipe numpy
# Installing your digital babysitter fr fr
Step 2: Setup DroidCam
Download DroidCam on your phone (Play Store/App Store)
Install DroidCam Client on PC from here
Connect via WiFi (both devices same network, duh)
Open DroidCam app → note the IP address
Open DroidCam Client → enter IP → Connect
POV: Your phone is now a snitch 📱🔫

Step 3: Find Your Camera (It's Giving Treasure Hunt)
python
import cv2

for i in range(5):
    cap = cv2.VideoCapture(i)
    if cap.isOpened():
        print(f"Camera {i} be working fr 💯")
    cap.release()
💀 Usage (RIP Your Self-Esteem)
Basic Usage
python
from eye_tracker import EyeTracker

# Replace 1 with YOUR camera index (probably 1 or 2)
tracker = EyeTracker(camera_index=1)
tracker.run()  # Start the roasting session
What Happens Next:
Window opens showing your face ✅
Green text when focused: "FOCUSED" (rare W)
Red text when distracted: "DISTRACTED" (Common L)
Procrastination Score updates live (it's giving anxiety)
Controls:
Press 'Q': Quit (when you can't handle the truth)
Press 'S': Save session data (receipts 📸)
🎮 Live Demo Experience
[Starting camera...]
You: *Opens notes to study*
AI: "Focused 💚"

[5 minutes later]
You: *Checks phone*
AI: "Distracted (LEFT) 🔴"
AI: "Procrastination Score: 67"

You: "Arey yaar 😭"

[Session End]
AI: "Session Summary:
     Focus: 23%
     You looked away: 156 times
     Bestie... IAS ki padhai chhodd do 💀"
📱 Real Scenarios Where This Slaps
Scenario 1: The "5 Minute Break"
12:00 PM - You: "Bas 5 min break"
12:47 PM - AI: "Bestie it's been 47 minutes"
You: 🤡
Scenario 2: The Multitasker
You: *Studying while watching series*
AI: "Looking away count: 234"
You: "But I'm multitasking!"
AI: "That's not the flex you think it is 💅"
Scenario 3: The Self-Deceit
You: "I studied for 3 hours today"
AI: *Shows 23% focus percentage*
You: "Yaar ye AI hi kharab hai"
Everyone: 🧢
🎯 Procrastination Score Decoded
Score	Status	Reality Check
0-30	🟢 Locked In	Bhai tu sach me padh raha hai? Screenshot le leta hu
31-60	🟡 Mid Fr	"Padh toh raha hu" - you lying
61-80	🔴 Down Bad	Bro just watch the series atp
81-100	☠️ Cooked	IAS ki padhai chhodd do, chill crow
🛠️ Advanced Features (For Try-Hards)
Add Discord Webhook Alerts
python
if score > 70:
    send_discord_message("@everyone Bhai padh le thoda 😭")
Spotify Integration
python
if looking_away:
    pause_spotify()  # Can't vibe if you ain't grinding
Mom Mode
python
if distraction_count > 50:
    send_text_to_mom("Beta phone chhod ke padh")
😤 Troubleshooting (When Things Go Wrong)
"Camera not detected"
Bhai DroidCam on kiya?
Same WiFi pe hai dono?
Have you tried turning it off and on again? 💀
"Detection not working"
Light toh hai na room me?
Camera pe haath toh nahi rakh diya?
Camera seedha face pe point kar
"Score too high"
That's a you problem bestie 💅
Touch grass maybe?
Or actually study idk
📊 Session Data Example
json
{
  "total_blinks": 420,  // nice
  "distraction_count": 69,  // nice
  "focus_percentage": 12.5,  // not nice 💀
  "procrastination_score": 87,
  "session_duration": 3600,
  "status": "IAS ki padhai chhodd do fr fr"
}
🎭 Honest Reviews
"Bro this app called me out in 4K" - Anonymous JEE Aspirant

"Delete kar diya, ego hurt ho gaya" - UPSC Warrior

"10/10 would not recommend to my enemies" - College Student

"Mere papa ne dekh liya score... ghar se nikal diya" - Some kid

"Finally, an app that understands me" - Your FBI Agent

🤝 Contributing
Want to make this even more savage? PRs welcome!

Ideas:

Add shame bell sound 🔔
Twitter roast thread generator
Parent dashboard (nightmare fuel)
Streak counter (to make you feel worse)
Leaderboard (competitive procrastination)
⚠️ Disclaimer
This AI is:

❌ NOT responsible for existential crisis
❌ NOT liable for crushed dreams
❌ NOT gonna pay your therapy bills
✅ Definitely gonna hurt your feelings
✅ 100% accurate about your procrastination
Use at your own risk. Side effects include:

Reality checks
Motivation (temporary)
Guilt (permanent)
The urge to actually study (rare)
📜 License
MIT License (Do whatever, we're not your mom)

🙏 Acknowledgments
Mediapipe for the eye tracking tech
OpenCV for the camera wizardry
My procrastination for inspiring this project
Coffee (the real MVP)
That one YouTube productivity guru who said "just focus bro"
💬 Final Words
Remember besties:

"Procrastination is like a credit card: it's a lot of fun until you get the bill."

But seriously, if this app is showing you a high score, maybe take a break, touch grass, drink water, and then GET BACK TO WORK.

Your future self is literally begging you rn.

Made with 💀 and desperation by someone who should probably be studying

Star this repo if you related to the pain ⭐ Fork it if you want to roast yourself ⚡ Close it if you can't handle the truth 🚪

Now stop reading this README and GO STUDY! 📚💀
P.S. - Agar abhi bhi padh rahe ho toh seriously, IAS ki padhai chhodd do tum 🤌

🔗 Links That Might Help
How to Actually Focus (not a rickroll trust)
Pomodoro Technique
Therapy Finder (you'll need it)
Remember: This AI can track your eyes but can't track your dreams. Only you can do that. No cap. Fr fr. On god. Bussin. Respectfully.

Now fr fr, padh le bhai 📖✨

