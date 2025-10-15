from flask import Flask, request, jsonify
import random

app = Flask(__name__)

# Pretend roast database
roasts = {
    "Focused": [
        "Coding beast mode activated — don’t wake the legend.",
        "Focused ho? Ab history likh de, hero.",
        "You turned distractions into a 'do not disturb' playlist.",
        "Zone unlocked: productivity +9000.",
        "Keep that output coming — bugs are trembling.",
        "Focused ho to boss tujhpe bhi jealous hota.",
        "Tujha concentration asa ki deadline panic karto.",
        "Ekach line madhe commit kela — tar branchche followers vadhtat.",
        "You’re so dialed in even notifications ask permission.",
        "Kaam chaltoy; world, pause kar — tu chaltoy."
    ],
    "Distracted": [
        "Your brain’s on five tabs and none of them are relevant.",
        "Focus level: potato with Wi-Fi.",
        "You keep alt-tabbing through your life.",
        "Attention span: single frame of an animated GIF.",
        "You'd get distracted by a pop-up that says 'you’re distracted.'",
        "Tumhara attention span ek Instagram reel jitna hi hai — skip kar diya.",
        "Kaam shuru kar, phir 2 minute mein YouTube ka trap.",
        "TV, phone, snacks — sab ka group chat chal raha hai aur tum kaam ke liye invited nahi.",
        "Tu multi-task karte karte ekach kaam pan adhura sodto.",
        "Idle mode chaltoy, productivity offline aahe."
    ],
    "Hopeless": [
        "Even your coffee filed a missing-person report.",
        "Motivation? Bro, it ghosted you in 2016.",
        "Your focus crashed harder than legacy Internet Explorer.",
        "Error 503: effort temporarily unavailable.",
        "You’re the human equivalent of a forgotten TODO.",
        "Tumhara engine start hi nahi karta — sirf vroom-vroom ka sapna.",
        "Aalas itna gehra ki light bhi chinta karne lagi.",
        "Agar excuses se degree milti to tum professor hote.",
        "Tu asla ki file corrupted zalay — cannot recover.",
        "Ghadi bhi tuzya saamny tayar nahi — time wasted, sirf vibes."
    ]
}

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    fs = data.get("focusedSeconds", 0)
    apps = data.get("badAppsOpen", 0)
    idle = data.get("idleTime", 0)

    # 🔮 Fake “ML logic” — looks like pattern-based reasoning
    if apps > 2 or idle > 400:
        state = "Hopeless"
    elif idle > 180 or apps > 1:
        state = "Distracted"
    else:
        state = "Focused"

    # Fake probability score (to look AI-ish)
    confidence = round(random.uniform(0.65, 0.98), 2)

    # Random roast with personality
    roast = random.choice(roasts[state])

    # Return it like a real ML model output
    return jsonify({
        "state": state,
        "roast": roast,
        "confidence": confidence
    })

if __name__ == "__main__":
    app.run(debug=True)
