/* =================================================================
   TEAM21 ACADEMY — LAB STARTERS & STAR CHALLENGES
   Each lab has starter code AND a list of "challenge checks" —
   simple automated checks against the student's code that award
   1-3 stars based on how many challenge criteria are satisfied.
   ================================================================= */

T21.labStarters = {
  python1: `# Python Lab — Variables & Output
# Try editing the code and click Run!

name  = "Your Name"
age   = 10
hobby = "coding"

print(f"Hello! I'm {name}!")
print(f"I am {age} years old.")
print(f"My hobby is {hobby}.")

# Challenge: add 2 more variables and print them!
`,
  python2: `# Python Lab — Number Guessing Game
import random

secret = random.randint(1, 10)
print("🎲 Guess a number between 1 and 10!")

# Try to modify this code to give hints!
guess = 5  # Change this number

if guess == secret:
    print(f"🎉 Correct! The number was {secret}!")
elif guess < secret:
    print(f"📈 Too low! Try higher than {guess}")
else:
    print(f"📉 Too high! Try lower than {guess}")
`,
  web: `<!-- HTML Lab — Your First Webpage -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Page</title>
  <style>
    body { background: #0a1628; color: white; font-family: Arial; padding: 20px; }
    h1 { color: #7eb3ff; }
    .card { background: rgba(255,255,255,0.1); border-radius: 12px; padding: 15px; margin: 10px 0; }
  </style>
</head>
<body>
  <h1>Hello from HTML! 🌍</h1>
  <div class="card">
    <p>Edit this code and press Run to see changes!</p>
    <p>Try changing the text, colours, or adding new elements.</p>
  </div>
  <button onclick="alert('JavaScript works! 🎉')">Click Me!</button>
</body>
</html>
`,
  clang: `/* C Lab — Hello World */
#include <stdio.h>

int main() {
    // Your name goes here
    char name[] = "Coder";
    int age = 12;
    float score = 95.5;
    
    printf("Name:  %s\\n", name);
    printf("Age:   %d\\n", age);
    printf("Score: %.1f%%\\n", score);
    
    // Add a loop to count from 1 to 5!
    
    return 0;
}
`,
  python3: `# AI Lab — Weather Classifier
# This is a simple rule-based AI system!

def classify_weather(temp_celsius):
    """AI-style decision maker for weather."""
    if   temp_celsius > 35: return "🔥 Extreme Heat"
    elif temp_celsius > 25: return "☀️  Warm & Sunny"
    elif temp_celsius > 15: return "🌤️  Comfortable"
    elif temp_celsius > 5:  return "🧥 Cold"
    else:                   return "❄️  Freezing!"

# Test the classifier
temperatures = [38, 28, 20, 8, -3]

print("Weather AI Predictions:")
print("─" * 30)
for temp in temperatures:
    result = classify_weather(temp)
    print(f"{temp}°C → {result}")
`,
  java: `// Java Lab — Hello, OOP!
// Note: Java runs in a compiled environment
// Use repl.it or your local Java IDE

public class Lab {
    
    static String gradeToLetter(int score) {
        if (score >= 90) return "A ⭐";
        if (score >= 80) return "B 👍";
        if (score >= 70) return "C 😊";
        if (score >= 60) return "D 📚";
        return "F 💪";
    }
    
    public static void main(String[] args) {
        int[] scores = {95, 82, 71, 58, 90};
        
        System.out.println("Grade Report:");
        for (int score : scores) {
            System.out.println(score + "% → " + gradeToLetter(score));
        }
    }
}
`,
  cpp: `// C++ Lab — Classes & Objects
#include <iostream>
using namespace std;

class Student {
public:
    string name;
    int score;
    
    Student(string n, int s) : name(n), score(s) {}
    
    string getGrade() {
        if (score >= 90) return "A ⭐";
        if (score >= 80) return "B 👍";
        if (score >= 70) return "C 😊";
        return "D 📚";
    }
    
    void report() {
        cout << name << ": " << score << "% → " << getGrade() << endl;
    }
};

int main() {
    Student s1("Amara", 95);
    Student s2("Kofi",  78);
    Student s3("Zara",  88);
    
    s1.report();
    s2.report();
    s3.report();
    return 0;
}
`,
  robotics: `# Robotics Lab — Autonomous Navigator Simulator
import random

def get_sensor_readings():
    """Simulate distance sensor readings in cm"""
    return {
        'front': random.randint(0, 100),
        'left':  random.randint(0, 100),
        'right': random.randint(0, 100),
    }

def navigate(sensors):
    f, l, r = sensors['front'], sensors['left'], sensors['right']
    print(f"  Sensors: Front={f}cm Left={l}cm Right={r}cm")
    
    if f < 10 and l < 10 and r < 10:
        return "⛔ EMERGENCY STOP!"
    elif f > 30:
        return "➡️  Move Forward"
    elif r > l:
        return "↩️  Turn Right"
    elif l > 20:
        return "↪️  Turn Left"
    else:
        return "⬅️  Reverse"

print("🤖 Robot Navigation Simulation")
print("=" * 40)
for i in range(8):
    sensors = get_sensor_readings()
    action = navigate(sensors)
    print(f"Step {i+1}: {action}")
    print()
`,
  ai: `# AI Lab — Build a Tiny Token Predictor
# This simulates (in a VERY simplified way) what an
# LLM does: predict the next word based on patterns
# it has "seen" before.

word_patterns = {
    "the": ["cat", "dog", "sun", "computer"],
    "cat": ["sat", "ran", "jumped"],
    "computer": ["learns", "calculates", "predicts"],
}

def predict_next(word):
    """Return the most likely next word(s)."""
    options = word_patterns.get(word, ["[unknown]"])
    return options

# Try predicting next words in a chain!
current_word = "the"
sentence = [current_word]

for step in range(3):
    options = predict_next(current_word)
    next_word = options[0]  # pick the "most likely" one
    sentence.append(next_word)
    print(f"After '{current_word}' → predicted: {options}")
    current_word = next_word

print()
print("Generated sentence:", " ".join(sentence))

# Challenge: add more words to word_patterns and
# see how the generated sentence changes!
`,
};

/* ─────────────────────────────────────────────────────────────
   STAR CHALLENGES — for each lab, an array of checks.
   Each check: { label, test(code) } where test returns true/false
   Stars awarded = number of checks passed (capped at 3 shown,
   but we define up to 3 meaningful checks per lab).
   ───────────────────────────────────────────────────────────── */
T21.labChallenges = {
  python1: [
    { label: 'Changed the name variable from the default', test: code => /name\s*=\s*["'](?!Your Name)/.test(code) },
    { label: 'Added a new variable beyond the starter 3', test: code => (code.match(/^\s*\w+\s*=/gm) || []).length > 3 },
    { label: 'Used a for loop somewhere in your code', test: code => /\bfor\s+\w+\s+in\s+/.test(code) },
  ],
  python2: [
    { label: 'Changed the guess number from the default (5)', test: code => !/guess\s*=\s*5\s*#/.test(code) || /guess\s*=\s*(?!5)\d+/.test(code) },
    { label: 'Modified the range in randint()', test: code => /randint\(\s*1\s*,\s*(?!10\))\d+/.test(code) },
    { label: 'Added a guesses counter or loop', test: code => /\bwhile\b|\bguesses\b/.test(code) },
  ],
  web: [
    { label: 'Changed the heading text', test: code => !/<h1>Hello from HTML! 🌍<\/h1>/.test(code) },
    { label: 'Changed a colour value', test: code => (code.match(/#[0-9a-fA-F]{3,6}/g) || []).some(c => !['#0a1628','#7eb3ff'].includes(c.toLowerCase())) },
    { label: 'Added a new HTML element', test: code => (code.match(/<(h2|h3|img|ul|li|section)/g) || []).length > 0 },
  ],
  clang: [
    { label: 'Changed the name from "Coder"', test: code => !/char\s+name\[\]\s*=\s*"Coder"/.test(code) },
    { label: 'Added a for loop', test: code => /\bfor\s*\(/.test(code) },
    { label: 'Added an extra printf statement', test: code => (code.match(/printf\(/g) || []).length > 3 },
  ],
  python3: [
    { label: 'Added more temperatures to the list', test: code => /temperatures\s*=\s*\[[^\]]{20,}/.test(code) },
    { label: 'Added a new classification category', test: code => (code.match(/elif|else/g) || []).length > 4 },
    { label: 'Added a counting/summary feature', test: code => /count|len\(/.test(code) },
  ],
  java: [
    { label: 'Added a new score to the array', test: code => (code.match(/\d+,\s*\d+/g) || []).some(m => m.split(',').length >= 5) || /\{.*,.*,.*,.*,.*,.*\}/.test(code) },
    { label: 'Added a new method', test: code => (code.match(/static\s+\w+\s+\w+\s*\(/g) || []).length > 2 },
    { label: 'Modified the grading thresholds', test: code => !/score >= 90.*\n.*score >= 80.*\n.*score >= 70.*\n.*score >= 60/.test(code) },
  ],
  cpp: [
    { label: 'Added a 4th Student object', test: code => (code.match(/Student\s+s\d/g) || []).length > 3 },
    { label: 'Added a new method to the class', test: code => (code.match(/^\s*(string|void|int|double|bool)\s+\w+\s*\([^)]*\)\s*\{/gm) || []).length > 3 },
    { label: 'Changed a student\'s score', test: code => !/s1\("Amara", 95\)/.test(code) || !/s2\("Kofi",\s*78\)/.test(code) },
  ],
  robotics: [
    { label: 'Changed the simulation step count', test: code => !/range\(8\)/.test(code) },
    { label: 'Modified a sensor threshold', test: code => !(/f < 10 and l < 10 and r < 10/.test(code) && /f > 30/.test(code) && /l > 20/.test(code)) },
    { label: 'Added a new print or summary line', test: code => (code.match(/print\(/g) || []).length > 6 },
  ],
  ai: [
    { label: 'Added a new word to word_patterns', test: code => (code.match(/":\s*\[/g) || []).length > 3 },
    { label: 'Changed the starting word or step count', test: code => !/current_word = "the"/.test(code) || !/range\(3\)/.test(code) },
    { label: 'Modified how next_word is chosen', test: code => !/next_word = options\[0\]/.test(code) },
  ],
};
