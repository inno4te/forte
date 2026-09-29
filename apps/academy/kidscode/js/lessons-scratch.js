T21.lessons.scratch = {
  title: 'Scratch Adventures', banner: 'scratch',
  subtitle: 'Create your first animations, games and stories — no typing required, just drag and snap!',
  steps: [

    /* ══════════════════════════════════════════════════════════
       STEP 1 — What is Scratch and Why We Code
       ══════════════════════════════════════════════════════════ */
    {
      h: '🐱 Step 1 — Welcome to Scratch: Where Coding Becomes Play',
      p: `Imagine if you could tell a computer exactly what to do, and it would listen perfectly every time. That's what coding is — giving instructions to a computer in a language it understands. <strong>Scratch</strong> is the perfect place to start because instead of typing complicated words, you <em>snap together colourful blocks</em> like LEGO bricks to build your instructions.
<br><br>
<strong>Scratch was invented at MIT</strong> (one of the world's most famous universities) so that children exactly like you could learn the same ideas that professional programmers use — but without needing to memorise lots of typing rules.
<br><br>
<strong>What you'll build in Scratch:</strong><br>
• Animated stories where characters talk and move<br>
• Games where players score points and lose lives<br>
• Interactive art that responds when you click or move<br>
• Quizzes, simulations, and much more
<br><br>
<strong>The three main areas of Scratch:</strong><br>
🎭 <strong>Stage</strong> — the screen where your project runs (like a theatre stage)<br>
🐱 <strong>Sprites</strong> — the characters and objects that move around on the stage<br>
🧩 <strong>Blocks</strong> — the coding instructions you snap together`,
      code: `<span class="cm">🗺️ The Scratch Interface — learn these areas:</span>

┌─────────────────────────────────────────────┐
│  MENU BAR  (File, Edit, Tutorials)          │
├──────────┬──────────────────┬───────────────┤
│          │                  │               │
│  BLOCK   │   CODE AREA      │    STAGE      │
│  PALETTE │   (drag blocks   │  (your project│
│  (all the│    here to build │   runs here!) │
│  blocks  │    programs)     │               │
│  sorted  │                  │               │
│  by      ├──────────────────┴───────────────┤
│  colour) │         SPRITE LIST              │
│          │  (all your characters shown here) │
└──────────┴───────────────────────────────────┘

<span class="cm">BLOCK COLOURS and what they do:</span>
🟡 Motion     — move, turn, go to position
🟣 Looks      — change costume, say things, show/hide
🔴 Sound      — play sounds and music
🟠 Events     — when flag clicked, when key pressed
🟡 Control    — if/then, repeat, wait, forever
🔵 Sensing    — touch something? mouse position?
🟢 Operators  — maths, comparing numbers, joining text
🔴 Variables  — store numbers and words`,
      examples: [
        { label: 'Your very first program — making Scratch Cat move', code: `<span class="cm">Click the CAT sprite, then in the CODE area, snap these blocks together:</span>

┌─────────────────────────────────┐
│  when 🏳️ clicked                │  ← This block STARTS everything!
└─────────────────────────────────┘
        ↓
┌─────────────────────────────────┐
│  say [Hello! I am Scratch Cat!] │  ← Cat speaks for 2 seconds
│  for (2) seconds                │
└─────────────────────────────────┘
        ↓
┌─────────────────────────────────┐
│  move (100) steps               │  ← Cat walks forward
└─────────────────────────────────┘
        ↓
┌─────────────────────────────────┐
│  turn ↻ (360) degrees           │  ← Cat spins in a full circle!
└─────────────────────────────────┘

<span class="cm">Click the GREEN FLAG ▶ to run your program.
Watch the cat talk, walk, and spin! 🎉</span>` },
        { label: 'Important vocabulary to know', code: `<span class="cm">SPRITE — any character or object in your project
           The cat is a sprite. You can add more from the library!

COSTUME — different images for the same sprite
           Like changing clothes. The cat has 2 costumes
           (feet together and feet apart) — switching quickly
           makes it LOOK like it's walking!

BACKDROP — the background image on the stage
            Like the scenery in a play.

BLOCK — one single instruction
        "move 10 steps" is one block

SCRIPT — a group of blocks snapped together
          Your whole program is made of scripts!

PROJECT — your complete Scratch creation
           Save it to your account so you never lose it.

RUN — pressing the green flag to start your program
STOP — pressing the red circle to stop it</span>` },
      ],
      fact: 'More than 100 MILLION projects have been shared on Scratch by kids all over the world. The youngest Scratch creators are 5 years old! Some of the most popular projects have been played over a million times. Your first project could be seen by kids on every continent.',
      history: 'scratch_mit',
      quiz: { q: 'In Scratch, what is a SPRITE?', opts: ['The green flag you click to start','A character or object that you program to move and interact on the stage','The background image','The sound that plays when you click'], ans: 1 },
      challenge: { t: 'Introduce Your Sprite', d: 'Make your sprite introduce itself! When the green flag is clicked, your sprite should: say its name for 2 seconds, say something it likes for 2 seconds, move 100 steps forward, play a sound, and then turn around and walk back to where it started. Add a colourful backdrop from the library to make it look great!' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 2 — Motion and Animation
       ══════════════════════════════════════════════════════════ */
    {
      h: '🎬 Step 2 — Motion and Animation: Making Things Come Alive',
      p: `The magic of animation is this: <strong>our eyes get tricked when images change fast enough</strong>. When you switch between two slightly different pictures 12 or more times per second, your brain fills in the gaps and sees smooth movement. This is how cartoons, movies, and video games all work!
<br><br>
In Scratch, you create animation by:<br>
1. <strong>Moving</strong> the sprite a little bit each step<br>
2. <strong>Switching costumes</strong> rapidly to create the illusion of movement<br>
3. Doing both at the <strong>same time</strong> inside a loop
<br><br>
<strong>The FOREVER block</strong> is one of the most important blocks in Scratch. It keeps running the blocks inside it over and over, forever — until you press the red stop button. Most animations and games use a forever loop as their main engine.
<br><br>
<strong>Coordinates on the stage:</strong><br>
The Scratch stage uses X (left-right) and Y (up-down) coordinates.<br>
Centre = (0, 0). Right edge = X:240. Left edge = X:-240.<br>
Top = Y:180. Bottom = Y:-180.`,
      code: `<span class="cm">WALKING ANIMATION — how to make a sprite walk across the screen:</span>

┌─────────────────────────────────┐
│  when 🏳️ clicked                │
└─────────────────────────────────┘
        ↓
┌─────────────────────────────────┐
│  go to x: (-200) y: (0)         │  ← Start on the LEFT side
└─────────────────────────────────┘
        ↓
┌─────────────────────────────────┐
│  forever                        │  ← Keep doing this forever:
│  ┌──────────────────────────┐   │
│  │  next costume            │   │  ← Switch costume (makes legs move)
│  │  move (5) steps          │   │  ← Walk 5 steps forward
│  │  wait (0.1) seconds      │   │  ← Small pause (controls speed)
│  │  if <touching edge?> then│   │
│  │  ┌────────────────────┐  │   │
│  │  │ go to x: (-200)    │  │   │  ← Teleport back to start
│  │  └────────────────────┘  │   │
│  └──────────────────────────┘   │
└─────────────────────────────────┘`,
      examples: [
        { label: 'Keyboard-controlled movement', code: `<span class="cm">PLAYER MOVEMENT — common in almost every game!</span>
<span class="cm">Make 4 separate scripts, one for each arrow key:</span>

<span class="cm">Script 1 — RIGHT arrow:</span>
┌────────────────────────────┐
│ when [right arrow] key     │
│ pressed                    │
│ point in direction (90)    │  ← Face right
│ move (10) steps            │
└────────────────────────────┘

<span class="cm">Script 2 — LEFT arrow:</span>
┌────────────────────────────┐
│ when [left arrow] key      │
│ pressed                    │
│ point in direction (-90)   │  ← Face left
│ move (10) steps            │
└────────────────────────────┘

<span class="cm">Script 3 — UP arrow:</span>
┌────────────────────────────┐
│ when [up arrow] key pressed│
│ change y by (10)           │  ← Move up
└────────────────────────────┘

<span class="cm">Script 4 — DOWN arrow:</span>
┌────────────────────────────┐
│ when [down arrow] key      │
│ pressed                    │
│ change y by (-10)          │  ← Move down
└────────────────────────────┘` },
        { label: 'Smooth movement with the forever loop', code: `<span class="cm">BETTER method for smooth, responsive movement:</span>
<span class="cm">Use ONE forever loop that checks all keys:</span>

┌──────────────────────────────────────────┐
│ when 🏳️ clicked                          │
│ forever                                  │
│ ┌──────────────────────────────────────┐ │
│ │ if <key [right arrow] pressed?> then │ │
│ │    point in direction (90)           │ │
│ │    move (5) steps                    │ │
│ │ end                                  │ │
│ │                                      │ │
│ │ if <key [left arrow] pressed?> then  │ │
│ │    point in direction (-90)          │ │
│ │    move (5) steps                    │ │
│ │ end                                  │ │
│ │                                      │ │
│ │ if <key [up arrow] pressed?> then    │ │
│ │    change y by (5)                   │ │
│ │ end                                  │ │
│ └──────────────────────────────────────┘ │
└──────────────────────────────────────────┘

<span class="cm">This is smoother because it checks ALL keys
60 times per second instead of only responding
when a key event fires.</span>` },
      ],
      fact: 'Walt Disney\'s animators discovered in the 1930s that 24 drawings per second was enough to fool the human eye into seeing smooth motion. When you use a forever loop with a small wait time in Scratch, you\'re doing the exact same thing — just with code instead of paper!',
      history: null,
      quiz: { q: 'What does the FOREVER block do in Scratch?', opts: ['It runs the blocks inside it exactly 100 times','It runs the blocks inside it over and over without stopping until you press the red stop button','It makes the sprite go faster','It repeats the block only while the green flag is held down'], ans: 1 },
      challenge: { t: 'Chase Game Setup', d: 'Create a sprite that: starts at the centre of the stage when the green flag is clicked, can be controlled with all 4 arrow keys (it faces the direction it moves), bounces off the edges using the "if on edge, bounce" block, and switches costumes every time it moves to create a walking animation. Add a second sprite (a star or coin) that moves on its own in a forever loop.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 3 — Events and Interactions
       ══════════════════════════════════════════════════════════ */
    {
      h: '🎯 Step 3 — Events: Making Your Project Respond to the World',
      p: `A truly interactive project <strong>responds</strong> to what the player does. When you click a button, something happens. When a character touches another character, the score increases. When a key is pressed, the player moves. These responses are triggered by <strong>events</strong>.
<br><br>
In programming, an <strong>event</strong> is something that happens that your code can listen for and respond to. Scratch's orange <strong>Events blocks</strong> are the triggers that start scripts running.
<br><br>
<strong>Scratch's event blocks (the orange ones):</strong><br>
• <code>when 🏳 clicked</code> — the most common: starts when you press the green flag<br>
• <code>when [key] pressed</code> — responds to keyboard keys<br>
• <code>when this sprite clicked</code> — clicked with the mouse<br>
• <code>when backdrop switches to [name]</code> — when scene changes<br>
• <code>when I receive [message]</code> — for communication between sprites
<br><br>
<strong>Broadcasting</strong> is one of the most powerful Scratch features. One sprite can send a message that ANY other sprite can listen for and respond to. This is how you coordinate multiple characters in a story or game.`,
      code: `<span class="cm">BROADCAST — the way sprites talk to each other!</span>

<span class="cm">Example: Game where wizard casts a spell on the dragon</span>

<span class="cm">--- WIZARD SPRITE ---</span>
┌──────────────────────────────────┐
│ when [space] key pressed         │
│ play sound [magic sound]         │
│ switch costume to [cast spell]   │
│ broadcast [spell cast] ▼         │  ← Sends message to everyone!
│ wait (0.5) seconds               │
│ switch costume to [normal]       │
└──────────────────────────────────┘

<span class="cm">--- DRAGON SPRITE ---</span>
┌──────────────────────────────────┐
│ when I receive [spell cast] ▼    │  ← Listens for the message!
│ say [Ouch! You hit me!] 2 secs   │
│ change color effect by (50)      │  ← Flash different colour
│ change size by (-10)             │  ← Shrink a little
└──────────────────────────────────┘`,
      examples: [
        { label: 'Click interactions and sprite conversations', code: `<span class="cm">INTERACTIVE STORY — characters that talk to each other:</span>

<span class="cm">--- CHARACTER 1 (Amara) ---</span>
┌──────────────────────────────────────┐
│ when 🏳️ clicked                      │
│ go to x: (-100) y: (-50)             │
│ say [Hello! What's your name?] 3 sec │
│ broadcast [amara done] ▼             │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ when I receive [kofi reply] ▼        │
│ say [Nice to meet you, Kofi!] 2 sec  │
│ say [Want to play a game?] 2 sec     │
│ broadcast [game time] ▼              │
└──────────────────────────────────────┘

<span class="cm">--- CHARACTER 2 (Kofi) ---</span>
┌──────────────────────────────────────┐
│ when 🏳️ clicked                      │
│ go to x: (100) y: (-50)              │
│ hide                                 │  ← Hidden at start
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ when I receive [amara done] ▼        │
│ show                                 │  ← Appear!
│ say [My name is Kofi!] 2 sec         │
│ broadcast [kofi reply] ▼             │
└──────────────────────────────────────┘` },
        { label: 'Mouse interaction — clickable buttons', code: `<span class="cm">CLICKABLE BUTTON — how menus work in Scratch games:</span>

<span class="cm">--- PLAY BUTTON sprite ---</span>
┌──────────────────────────────────────┐
│ when 🏳️ clicked                      │
│ show                                 │  ← Show the button
│ switch backdrop to [menu screen]     │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ when this sprite clicked             │  ← When player clicks it
│ play sound [click sound]             │
│ hide                                 │  ← Hide the button
│ switch backdrop to [game screen]     │
│ broadcast [start game] ▼             │  ← Tell all sprites to start!
└──────────────────────────────────────┘

<span class="cm">Add hover effect — makes button feel alive:</span>
┌──────────────────────────────────────┐
│ forever                              │
│   if <touching [mouse pointer]?> then│
│      set size to (110) %             │  ← Slightly bigger on hover
│   else                               │
│      set size to (100) %             │
│   end                                │
└──────────────────────────────────────┘` },
      ],
      fact: 'The "broadcast" system in Scratch is almost identical to how real web applications communicate. When you like a photo on Instagram, it "broadcasts" an event to the server which then tells the photo poster\'s notification badge to update. Professional programmers call this "event-driven programming" — and it\'s used in every app, website, and game ever made.',
      history: null,
      quiz: { q: 'What does the "broadcast" block do in Scratch?', opts: ['It makes the sprite louder','It sends a message that any other sprite can listen for and respond to with a "when I receive" block','It broadcasts the project to the internet','It makes all sprites do the same action simultaneously'], ans: 1 },
      challenge: { t: 'Interactive Joke Teller', d: 'Build a project with two sprites — a comedian and an audience member. When the green flag is clicked: the comedian enters from the left and says "Want to hear a joke?" When the player clicks the comedian, the comedian delivers a multi-line joke using broadcasts to coordinate with the audience member (who reacts with laughing animation and sound). Add a "Tell Another Joke" button that resets the whole sequence with a different joke.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 4 — Variables and Score Keeping
       ══════════════════════════════════════════════════════════ */
    {
      h: '🔢 Step 4 — Variables: Teaching Scratch to Remember Things',
      p: `Right now our Scratch projects forget everything every time we run them. A <strong>variable</strong> is like a labelled box where your program stores information — a score, a player's lives, a timer, the player's name. Variables are what turn a simple animation into a real game.
<br><br>
<strong>Creating a variable in Scratch:</strong><br>
Click "Variables" in the block palette → "Make a Variable" → type a name → click OK. That's it! Scratch automatically creates several useful blocks for that variable.
<br><br>
<strong>Important variable blocks:</strong><br>
• <code>set [score] to (0)</code> — sets the variable to a specific value<br>
• <code>change [score] by (1)</code> — adds 1 to the variable (perfect for scoring!)<br>
• <code>(score)</code> — the oval block that READS the variable's current value<br>
• <code>show variable [score]</code> — displays it on the stage<br>
<br>
<strong>Common variables in games:</strong><br>
score, lives, level, timer, speed, high_score, player_name`,
      code: `<span class="cm">COMPLETE CATCHING GAME with score and lives:</span>

<span class="cm">--- SETUP (on green flag) ---</span>
┌────────────────────────────────────┐
│ when 🏳️ clicked                    │
│ set [score ▼] to (0)               │  ← Reset score
│ set [lives ▼] to (3)               │  ← Reset lives
│ set [game over ▼] to (0)           │  ← Not game over yet
│ show variable [score ▼]            │
│ show variable [lives ▼]            │
│ switch backdrop to [game screen]   │
│ broadcast [start game] ▼           │
└────────────────────────────────────┘

<span class="cm">--- FALLING OBJECT sprite ---</span>
┌────────────────────────────────────┐
│ when I receive [start game] ▼      │
│ forever                            │
│ ┌──────────────────────────────┐   │
│ │ go to x: (pick random -200   │   │
│ │          to 200) y: (180)    │   │  ← Appear at top, random x
│ │ repeat until <(y position)   │   │
│ │             < (-170)>        │   │
│ │ ┌────────────────────────┐   │   │
│ │ │ change y by (-5)       │   │   │  ← Fall down
│ │ │ if <touching [catcher  │   │   │
│ │ │    ▼]?> then           │   │   │
│ │ │    change [score ▼]    │   │   │
│ │ │    by (10)             │   │   │  ← Score! +10 points
│ │ │    go to y: (200)      │   │   │  ← Teleport back up
│ │ └────────────────────────┘   │   │
│ └──────────────────────────────┘   │
└────────────────────────────────────┘`,
      examples: [
        { label: 'Lives system and game over screen', code: `<span class="cm">When the falling object reaches the BOTTOM (missed it):</span>

┌────────────────────────────────────────┐
│ <span class="cm">...(continuing the repeat until loop)...</span>  │
│ <span class="cm">When y < -170 and NOT caught:</span>           │
│ change [lives ▼] by (-1)               │  ← Lose a life!
│ play sound [wrong buzz]                │
│                                        │
│ if <(lives) = (0)> then                │  ← No lives left?
│    broadcast [game over] ▼             │  ← End the game!
└────────────────────────────────────────┘

<span class="cm">--- GAME OVER sprite (hidden until end) ---</span>
┌────────────────────────────────────────┐
│ when 🏳️ clicked                        │
│ hide                                   │  ← Hidden at start
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ when I receive [game over] ▼           │
│ show                                   │  ← Appear!
│ stop [other scripts in sprite ▼]       │  ← Stop the game
│ say (join [Final Score: ] (score))     │  ← Show the score
│ wait (3) seconds                       │
│ stop [all ▼]                           │  ← Stop everything
└────────────────────────────────────────┘` },
        { label: 'Timer variable for time-limited challenges', code: `<span class="cm">COUNTDOWN TIMER — creates urgency in games!</span>

┌────────────────────────────────────────┐
│ when 🏳️ clicked                        │
│ set [timer ▼] to (30)                  │  ← 30 seconds
│ show variable [timer ▼]                │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ when I receive [start game] ▼          │
│ repeat (30)                            │  ← 30 times...
│ ┌────────────────────────────────────┐ │
│ │ wait (1) seconds                   │ │  ← ...wait 1 second
│ │ change [timer ▼] by (-1)           │ │  ← ...count down
│ └────────────────────────────────────┘ │
│ <span class="cm">After loop: timer reached 0</span>            │
│ broadcast [time up] ▼                  │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ when I receive [time up] ▼             │
│ stop [other scripts in sprite ▼]       │
│ say [Time's up! Your score: (score)]   │
└────────────────────────────────────────┘` },
      ],
      fact: 'Variables were invented in the 1950s when programmers needed to store numbers that would change during a calculation. Before variables, programmers had to manually write the actual number into every instruction — imagine having to rewrite your entire game every time you wanted to change the starting score! Variables made programming flexible and practical.',
      history: 'grace_hopper',
      quiz: { q: 'What does "change [score] by (10)" do?', opts: ['Sets the score to 10','Adds 10 to whatever the current score is','Shows the score on the stage','Resets the score to zero then adds 10'], ans: 1 },
      challenge: { t: 'Space Collector Game', d: 'Build a complete game: A spaceship sprite controlled by arrow keys collects falling stars (sprites that fall from random positions at the top). Each star caught = +5 points. Player starts with 3 lives, loses one for each star that falls off the bottom. A timer counts down from 60 seconds. When time runs out OR lives reach 0, show a "Game Over" screen with final score and a "Play Again" button that resets everything.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 5 — Sensing and Conditions
       ══════════════════════════════════════════════════════════ */
    {
      h: '👀 Step 5 — Sensing and Conditions: Teaching Sprites to Think',
      p: `The most interesting programs make <strong>decisions</strong>. Should the door open? It depends — is the player touching it? Should the enemy turn around? It depends — is it near the wall? <strong>Sensing</strong> blocks let sprites detect what's happening around them, and <strong>if/then/else</strong> blocks let sprites make decisions based on what they detect.
<br><br>
<strong>Scratch sensing blocks (light blue):</strong><br>
• <code>touching [sprite name]?</code> — is this sprite touching another?<br>
• <code>touching color [colour]?</code> — is this sprite touching a specific colour?<br>
• <code>key [space] pressed?</code> — is this key currently held down?<br>
• <code>mouse down?</code> — is the mouse button pressed?<br>
• <code>distance to [sprite]</code> — how far away is another sprite?<br>
• <code>ask [question] and wait</code> — ask the player to type something
<br><br>
<strong>The if/then/else block — the brain of any smart program:</strong><br>
This is exactly how every computer program ever written makes decisions. The condition must be TRUE or FALSE — it's like asking a yes/no question.`,
      code: `<span class="cm">SMART ENEMY that chases the player:</span>

<span class="cm">--- ENEMY sprite ---</span>
┌──────────────────────────────────────────┐
│ when 🏳️ clicked                          │
│ go to x: (200) y: (100)                  │  ← Start position
│ forever                                  │
│ ┌────────────────────────────────────┐   │
│ │ point towards [player ▼]           │   │  ← Always face player
│ │                                    │   │
│ │ if <(distance to [player ▼]) < 50> │   │
│ │ then                               │   │
│ │ ┌──────────────────────────────┐   │   │
│ │ │ <span class="cm">Player is CLOSE</span>               │   │   │
│ │ │ broadcast [player caught] ▼  │   │   │  ← Caught!
│ │ │ stop [this script ▼]         │   │   │
│ │ └──────────────────────────────┘   │   │
│ │ else                               │   │
│ │ ┌──────────────────────────────┐   │   │
│ │ │ <span class="cm">Player is FAR — keep chasing</span>  │   │   │
│ │ │ move (2) steps               │   │   │
│ │ └──────────────────────────────┘   │   │
│ │ end                                │   │
│ └────────────────────────────────────┘   │
└──────────────────────────────────────────┘`,
      examples: [
        { label: 'Colour sensing — collision with the level', code: `<span class="cm">PLATFORM GAME collision — using colour sensing!</span>
<span class="cm">Paint the floor/walls a specific colour, then detect it:</span>

┌──────────────────────────────────────────────┐
│ when 🏳️ clicked                              │
│ set [gravity ▼] to (-3)                      │
│ set [y velocity ▼] to (0)                    │
│ forever                                      │
│ ┌──────────────────────────────────────────┐ │
│ │ <span class="cm">Apply gravity — pull down every frame</span>     │ │
│ │ change [y velocity ▼] by (gravity)       │ │
│ │ change y by (y velocity)                 │ │
│ │                                          │ │
│ │ <span class="cm">Check if touching the GROUND colour</span>      │ │
│ │ if <touching color [BROWN] ?> then       │ │
│ │ ┌────────────────────────────────────┐   │ │
│ │ │ set [y velocity ▼] to (0)          │   │ │  ← Stop falling
│ │ │ change y by (5)                    │   │ │  ← Push out of ground
│ │ └────────────────────────────────────┘   │ │
│ │ end                                      │ │
│ │                                          │ │
│ │ <span class="cm">Jump when UP arrow pressed AND on ground</span> │ │
│ │ if <key [up arrow] pressed?> and         │ │
│ │    <(y velocity) = 0> then               │ │
│ │    set [y velocity ▼] to (10)            │ │  ← Jump!
│ │ end                                      │ │
│ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘` },
        { label: 'ask block — interactive quizzes', code: `<span class="cm">INTERACTIVE QUIZ — using ask and answer:</span>

┌──────────────────────────────────────────────┐
│ when 🏳️ clicked                              │
│ set [score ▼] to (0)                         │
│ set [question number ▼] to (1)               │
│                                              │
│ <span class="cm">--- Question 1 ---</span>                          │
│ ask [What is 5 × 7?] and wait                │  ← Player types answer
│ if <(answer) = (35)> then                    │  ← "answer" = what they typed
│    say [✅ Correct! +10 points] 2 secs        │
│    change [score ▼] by (10)                  │
│ else                                         │
│    say [❌ Not quite. It was 35!] 2 secs      │
│ end                                          │
│                                              │
│ <span class="cm">--- Question 2 ---</span>                          │
│ ask [What is the capital of France?] wait    │
│ if <(answer) = [Paris]> then                 │
│    say [✅ Brilliant!] 2 secs                 │
│    change [score ▼] by (10)                  │
│ else                                         │
│    say [❌ It's Paris!] 2 secs                │
│ end                                          │
│ say (join [Final Score: ] (score)) 3 secs    │
└──────────────────────────────────────────────┘` },
      ],
      fact: 'The if/then/else structure was invented by computer pioneer Grace Hopper in the 1950s. Before this invention, computer programs could only run instructions in a straight line from beginning to end — no decisions, no branches, no conditions. This single idea transformed computers from calculators into general-purpose thinking machines.',
      history: 'grace_hopper',
      quiz: { q: 'What must the condition inside an if/then block always be?', opts: ['A number between 1 and 10','Either TRUE or FALSE — it\'s always a yes/no question','A colour','The name of a sprite'], ans: 1 },
      challenge: { t: 'Smart Maze Navigator', d: 'Draw a maze using the paint editor (walls in blue, start in green, exit in red). Make a sprite that: the player controls with arrow keys, stops when it touches a BLUE wall (can\'t go through walls), displays "You Win!" and plays a celebration sound when it touches the RED exit, shows how many seconds it took using a timer variable, and has a "Try Again" button that resets the sprite to the start.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 6 — Capstone: Your Complete Game
       ══════════════════════════════════════════════════════════ */
    {
      h: '🏆 Step 6 — Capstone: Build Your Own Complete Game',
      p: `You now know everything you need to build a real, complete game from scratch (pun intended! 😄). Let's put it all together: <strong>sprites, motion, events, variables, sensing, conditions, sounds, and backdrops</strong> into one polished project you can be truly proud of and share with the world.
<br><br>
<strong>Great game design — what makes a game fun?</strong><br>
• <strong>Clear goal</strong> — the player knows what they're trying to do<br>
• <strong>Increasing challenge</strong> — it gets harder over time (difficulty curve)<br>
• <strong>Feedback</strong> — sounds, animations and score changes tell the player what happened<br>
• <strong>Fairness</strong> — the player has enough time to react to challenges<br>
• <strong>Replayability</strong> — it's easy to play again and try to beat your score<br>
<br>
<strong>Professional game design process:</strong><br>
1. Plan it first (what sprites, what happens, what's the win/lose condition?)<br>
2. Build the basic movement<br>
3. Add the core mechanic (what's the main thing the player does?)<br>
4. Add scoring and lives<br>
5. Polish with sounds, animations, and a proper start/end screen`,
      code: `<span class="cm">COMPLETE GAME TEMPLATE — The Fruit Ninja Inspired Game</span>
<span class="cm">Player slices fruit flying across the screen with the mouse</span>

<span class="cm">SPRITES NEEDED:</span>
<span class="cm">1. Fruit (apple, banana, watermelon — use clones!)</span>
<span class="cm">2. Sword/Slash effect</span>
<span class="cm">3. Score display sprite</span>
<span class="cm">4. Life hearts (3 of them)</span>
<span class="cm">5. Start Screen</span>
<span class="cm">6. Game Over screen</span>

<span class="cm">--- FRUIT sprite (with cloning!) ---</span>
┌──────────────────────────────────────┐
│ when 🏳️ clicked                      │
│ hide                                 │  ← Original stays hidden
│ forever                              │
│    wait (pick random 1 to 2) secs    │  ← Wait randomly
│    create clone of [myself ▼]        │  ← Create a new fruit!
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ when I start as a clone              │
│ go to x: (pick random -200 to 200)   │
│         y: (-180)                    │  ← Start at bottom
│ show                                 │
│ set [y speed ▼] to (pick random      │
│                     8 to 15)         │  ← Random upward speed
│ set [x speed ▼] to (pick random      │
│                     -5 to 5)         │  ← Random side drift
│ repeat until <(y position) < (-180)> │
│    change x by (x speed)             │
│    change y by (y speed)             │
│    change [y speed ▼] by (-0.5)      │  ← Gravity!
│    if <touching [sword ▼]?> then     │
│        change [score ▼] by (1)       │
│        play sound [slice]            │
│        delete this clone             │  ← Slice effect!
│    end                               │
│ end                                  │
│ change [lives ▼] by (-1)             │  ← Missed it!
│ delete this clone                    │
└──────────────────────────────────────┘`,
      examples: [
        { label: 'Difficulty scaling — making games get harder', code: `<span class="cm">LEVEL SYSTEM — game speeds up over time:</span>

┌─────────────────────────────────────────┐
│ when 🏳️ clicked                         │
│ set [level ▼] to (1)                    │
│ set [spawn delay ▼] to (2)              │  ← Start slow
│                                         │
│ forever                                 │
│ ┌───────────────────────────────────┐   │
│ │ <span class="cm">Every 10 points = level up!</span>        │   │
│ │ if <(score) > ((level) × 10)> then│   │
│ │    change [level ▼] by (1)        │   │
│ │    change [spawn delay ▼] by (-0.2│   │  ← Spawn faster!
│ │    play sound [level up]          │   │
│ │    say (join [Level ] (level))    │   │
│ │         2 secs                   │   │
│ │ end                               │   │
│ └───────────────────────────────────┘   │
└─────────────────────────────────────────┘

<span class="cm">Then use (spawn delay) in your fruit timer:
  wait (spawn delay) secs  ← Gets shorter each level!</span>` },
        { label: 'Polished start and end screens', code: `<span class="cm">PROFESSIONAL START SCREEN:</span>

<span class="cm">--- START SCREEN sprite ---</span>
┌────────────────────────────────────────┐
│ when 🏳️ clicked                        │
│ show                                   │
│ switch backdrop to [title screen]      │
│ <span class="cm">Fancy title animation:</span>               │
│ set size to (50) %                     │
│ repeat (20)                            │
│    change size by (3)                  │  ← Grow from small
│ end                                    │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ when this sprite clicked               │
│ play sound [start sound]               │
│ <span class="cm">Fade out animation:</span>                   │
│ repeat (10)                            │
│    change ghost effect by (10)         │  ← Fade to invisible
│ end                                    │
│ hide                                   │
│ switch backdrop to [game screen]       │
│ broadcast [game start] ▼               │
└────────────────────────────────────────┘` },
      ],
      fact: 'Minecraft was created by one person — Markus "Notch" Persson — who started building it in his spare time. He used simple pixel art (like Scratch sprites!) and basic programming concepts (variables for health and score, conditions for damage detection) that are almost identical to what you just learned. Today Minecraft has sold over 238 million copies and is the best-selling game of all time.',
      history: null,
      quiz: { q: 'What is the "difficulty curve" in game design?', opts: ['The curve of the game controller','The way a good game gradually becomes more challenging over time so players are always engaged but not overwhelmed','The number of levels in a game','The shape of the score graph'], ans: 1 },
      challenge: { t: 'CAPSTONE — Your Complete Original Game', d: 'Build a complete, polished game with: (1) A professional start screen with animated title and a clickable Play button. (2) At least 3 sprites with multiple costumes for animation. (3) A score system with variable displayed on screen. (4) A lives system (start with 3 hearts). (5) A difficulty mechanic that makes the game harder over time (speed increase, spawn rate increase, or obstacle addition). (6) Sound effects for all major events. (7) A "Game Over" screen showing final score and a "Play Again" button. (8) At least one use of clones. Share your project on Scratch and get feedback from other students!' },
    },
  ],
};

/* ═══════════════════════════════════════════════════
   BLOCKLY LESSONS
   ═══════════════════════════════════════════════════ */

T21.lessons.blockly = {
  title: 'Blockly Puzzles', banner: 'scratch',
  subtitle: 'Solve puzzles and learn the logic of programming through visual block-based challenges.',
  steps: [

    {
      h: '🧩 Step 1 — What is Blockly? Sequences and the Order of Instructions',
      p: `<strong>Blockly</strong> is a visual programming tool used by Google, code.org, and dozens of major tech companies for teaching coding. Like Scratch, you snap blocks together — but Blockly focuses on the <em>pure logic</em> of programming, not animation or games. It's perfect for understanding how computers think.
<br><br>
<strong>The most fundamental idea in all of computing: SEQUENCE</strong><br>
A computer executes instructions in <em>exact order, one at a time, from top to bottom</em>. It never skips, never rushes ahead, never makes assumptions. This sounds obvious — but it's the source of most beginner confusion.
<br><br>
Think of it like a recipe: "Mix flour and eggs. Then add milk. Then pour into pan. Then bake for 30 minutes." If you bake FIRST and THEN add the ingredients, you get disaster. Order is everything.`,
      code: `<span class="cm">SEQUENCE EXAMPLE — Move a character through a maze:</span>

<span class="cm">The maze looks like this (H = Hero, E = Exit):</span>
┌───┬───┬───┬───┐
│ H │   │   │   │
├───┼───┼───┼───┤
│   │███│███│   │
├───┼───┼───┼───┤
│   │   │   │ E │
└───┴───┴───┴───┘

<span class="cm">The CORRECT sequence of blocks to reach E:</span>
┌─────────────────┐
│ move forward    │  ← Move to (2,1)
└─────────────────┘
┌─────────────────┐
│ move forward    │  ← Move to (3,1)
└─────────────────┘
┌─────────────────┐
│ move forward    │  ← Move to (4,1) - wall! ❌ WRONG!
└─────────────────┘

<span class="cm">CORRECT path — must go around the wall:</span>
move forward → turn right → move forward → move forward → turn left → move forward → move forward`,
      examples: [
        { label: 'Common beginner mistake — wrong order', code: `<span class="cm">WRONG order — computer does exactly what you say, not what you mean:</span>

Task: "Make a sandwich"

❌ WRONG sequence:
1. Eat the sandwich
2. Put filling between bread
3. Get the bread

<span class="cm">Result: ERROR! Can't eat a sandwich that doesn't exist yet.</span>
<span class="cm">Computers are completely literal — they cannot guess what you meant.</span>

✅ CORRECT sequence:
1. Get the bread       ← Must exist before you can use it
2. Put filling between bread  ← Bread must exist first
3. Eat the sandwich    ← Sandwich must be made first

<span class="cm">This is why DEBUGGING (finding mistakes) is so important in coding.
A computer will always do exactly what you told it,
even if that's not what you meant.</span>` },
      ],
      fact: 'Google\'s Blockly tool is used to teach programming in 190 countries. It was designed by Neil Fraser at Google after research showed that beginners learned programming concepts 30% faster when they could see the code as visual blocks rather than text. Many professional programmers still use block-based tools for prototyping ideas before writing the actual code.',
      history: null,
      quiz: { q: 'Why is the ORDER of instructions so important in programming?', opts: ['It doesn\'t matter — computers can figure out the right order','A computer executes instructions EXACTLY in the order given, one at a time — using something before it exists causes an error','Instructions in the wrong order just run slower','Only the last instruction in a sequence actually runs'], ans: 1 },
      challenge: { t: 'Maze Challenge', d: 'On code.org/learn or blockly.games (free!), complete the first 10 maze puzzles. For each puzzle, before you start placing blocks, DRAW the path your character needs to take on paper first. Then translate your drawn path into blocks. This planning-before-coding habit is what professional programmers call "pseudocode" and it\'s one of the most important skills in software engineering.' },
    },

    {
      h: '🔄 Step 2 — Loops: When You Need to Do the Same Thing Many Times',
      p: `Imagine a maze where you need to move forward 20 times. Would you stack 20 identical "move forward" blocks? Of course not — that would take forever and be impossible to read. <strong>Loops</strong> solve this: they run a group of blocks multiple times with just one instruction.
<br><br>
<strong>Three types of loops:</strong><br>
• <strong>Repeat N times</strong> — run blocks exactly N times: "repeat 5 times: move forward"<br>
• <strong>Repeat until</strong> — keep running blocks UNTIL a condition becomes true: "repeat until at exit: move forward"<br>
• <strong>For each</strong> — repeat once for each item in a list
<br><br>
<strong>The key insight about loops:</strong><br>
The blocks INSIDE a loop run every time through. The blocks OUTSIDE only run once. Knowing what to put inside vs outside is the essential loop skill.`,
      code: `<span class="cm">WITHOUT loops — 8 separate blocks for a square:</span>
move forward
turn right 90°
move forward
turn right 90°
move forward
turn right 90°
move forward
turn right 90°

<span class="cm">WITH a loop — same result, much cleaner:</span>
┌──────────────────────┐
│ repeat 4 times       │  ← A square has 4 sides
│ ┌──────────────────┐ │
│ │ move forward     │ │  ← Same 2 blocks...
│ │ turn right 90°   │ │  ...repeated 4 times
│ └──────────────────┘ │
└──────────────────────┘

<span class="cm">SPIRAL — notice how the move distance increases:</span>
┌──────────────────────────────────────┐
│ set [distance ▼] to (10)             │
│ repeat 8 times                       │
│ ┌──────────────────────────────────┐ │
│ │ move (distance) steps            │ │
│ │ turn right 90°                   │ │
│ │ change [distance ▼] by (10)      │ │  ← Longer each time!
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘`,
      examples: [
        { label: 'Nested loops — loops inside loops', code: `<span class="cm">NESTED loops — used for grids, patterns, tables:</span>

<span class="cm">Draw a 4×4 grid of dots:</span>
┌──────────────────────────────────────────┐
│ repeat 4 times                           │  ← 4 ROWS
│ ┌────────────────────────────────────┐   │
│ │ repeat 4 times                     │   │  ← 4 COLUMNS in each row
│ │ ┌──────────────────────────────┐   │   │
│ │ │ draw dot                     │   │   │
│ │ │ move right (30) steps        │   │   │
│ │ └──────────────────────────────┘   │   │
│ │ go to start of row                 │   │  ← Reset to left
│ │ move down (30) steps               │   │  ← Next row
│ └────────────────────────────────────┘   │
└──────────────────────────────────────────┘

<span class="cm">Total dots drawn: 4 × 4 = 16
Total move instructions executed: 16 + 4 + 3 = 23
Without loops, you'd need all 23 blocks manually!</span>` },
      ],
      fact: 'The first use of a "loop" concept in computing was in Ada Lovelace\'s 1843 notes for Charles Babbage\'s Analytical Engine — a mechanical computer that was never actually built. She described a "cycle" of operations that would repeat. She is considered the world\'s first programmer, and she understood loops 100 years before electronic computers existed.',
      history: 'ada_lovelace',
      quiz: { q: 'How many times do the blocks INSIDE a "repeat 7 times" loop run?', opts: ['1 time','7 times','Until a condition is met','Indefinitely'], ans: 1 },
      challenge: { t: 'Pattern Generator', d: 'Use blockly.games or Scratch to draw 4 different geometric patterns using only loops: (1) A regular hexagon (6 sides, turn 60° each time), (2) A star with 5 points, (3) A spiral with 10 arms, (4) A grid of 25 squares in a 5×5 arrangement using nested loops. For each pattern, write how many total drawing instructions would be needed WITHOUT a loop, then compare to how many blocks you actually used WITH loops.' },
    },

    {
      h: '🔀 Step 3 — Conditions and Logic: Teaching Computers to Decide',
      p: `A computer that can only follow a fixed list of instructions is useful. A computer that can <strong>make decisions</strong> based on changing conditions is powerful. This is what if/then/else blocks do — they allow your program to choose different paths depending on the situation.
<br><br>
<strong>Boolean logic — the language of decisions:</strong><br>
Every condition in programming is either <strong>TRUE</strong> or <strong>FALSE</strong>. There is no "maybe." This binary thinking is why computers are so reliable — they never make emotional decisions or educated guesses.
<br><br>
<strong>Combining conditions:</strong><br>
• <code>AND</code> — both must be true: "is it raining AND is it cold?"<br>
• <code>OR</code> — at least one must be true: "is it hot OR is it sunny?"<br>
• <code>NOT</code> — flips true to false: "is it NOT raining?" means "is it dry?"`,
      code: `<span class="cm">IF/THEN/ELSE — the most important block in coding:</span>

<span class="cm">Example: Smart thermostat logic</span>
┌──────────────────────────────────────────────────┐
│ if <(temperature) > (25)> then                   │
│ ┌──────────────────────────────────────────────┐ │
│ │ turn on air conditioning                     │ │
│ │ say [Cooling the room...]                    │ │
│ └──────────────────────────────────────────────┘ │
│ else if <(temperature) < (18)> then              │
│ ┌──────────────────────────────────────────────┐ │
│ │ turn on heating                              │ │
│ │ say [Warming the room...]                    │ │
│ └──────────────────────────────────────────────┘ │
│ else                                             │
│ ┌──────────────────────────────────────────────┐ │
│ │ turn off both                                │ │
│ │ say [Temperature is perfect!]                │ │
│ └──────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘`,
      examples: [
        { label: 'AND, OR, NOT in action', code: `<span class="cm">COMBINED conditions — more realistic decisions:</span>

<span class="cm">Should we go to the park?</span>
┌────────────────────────────────────────────────────────┐
│ if < <(weather) = [sunny]> AND <(temperature) > (15)>> │
│ then                                                   │
│ ┌────────────────────────────────────────────────────┐ │
│ │ say [Let's go to the park! ☀️]                     │ │
│ └────────────────────────────────────────────────────┘ │
│ else if < <(weather) = [rainy]> OR                    │
│          <(temperature) < (5)>>                       │
│ then                                                   │
│ ┌────────────────────────────────────────────────────┐ │
│ │ say [Let's stay inside 🏠]                         │ │
│ └────────────────────────────────────────────────────┘ │
│ else                                                   │
│ ┌────────────────────────────────────────────────────┐ │
│ │ say [Hmm, might be okay — bring a jacket! 🧥]      │ │
│ └────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘` },
      ],
      fact: 'George Boole, a self-taught mathematician from Lincoln, England, invented "Boolean algebra" in 1854 — a mathematical system where variables can only be TRUE or FALSE. He had no idea that 90 years later, engineers would use his system to design the circuits in every single electronic computer ever built. Today, every if statement in every program in the world is built on Boole\'s 170-year-old mathematics.',
      history: null,
      quiz: { q: 'What does the AND operator require for a combined condition to be TRUE?', opts: ['At least one of the conditions must be true','Exactly one condition must be true','BOTH conditions must be true at the same time','Neither condition needs to be true'], ans: 2 },
      challenge: { t: 'Decision Tree Quiz', d: 'Build a "What programming language should I learn?" quiz in Scratch using only if/then/else blocks (no variables yet). Ask 4 yes/no questions: "Do you like games? (y/n)", "Do you prefer maths or stories?", "Do you want to build websites?", "Do you like robots?". Based on the answers, recommend: Scratch (games+stories), Python (maths+AI), JavaScript (websites), or C++ (games+robots). Each path through the questions is a different combination of conditions.' },
    },

    {
      h: '📝 Step 4 — Functions: Write Once, Use Everywhere',
      p: `Imagine if every time you wanted to draw a square, you had to type all 8 instructions again from scratch (turn right, move, turn right, move...). That would be exhausting. <strong>Functions</strong> (called "procedures" or "custom blocks" in Blockly/Scratch) solve this: you define a group of instructions once, give them a name, and then use that name as a single block anywhere.
<br><br>
<strong>Functions unlock two superpowers:</strong><br>
1. <strong>Reuse</strong> — write the code once, use it 100 times<br>
2. <strong>Abstraction</strong> — hide complicated details behind a simple name (draw square → those 8 steps are now ONE block called "draw square")
<br><br>
<strong>Functions with parameters:</strong><br>
A "draw square" function that always draws the same size isn't very useful. Adding a <em>parameter</em> (like "size") lets you pass in different values: "draw square (50)" draws a small one, "draw square (200)" draws a big one — same function, different results.`,
      code: `<span class="cm">CUSTOM BLOCK (function) in Scratch:</span>

<span class="cm">DEFINE the function once:</span>
┌──────────────────────────────────────────┐
│ define draw square (size)                │  ← The function definition
│ ┌──────────────────────────────────────┐ │
│ │ repeat 4 times                       │ │
│ │ ┌──────────────────────────────────┐ │ │
│ │ │ move (size) steps                │ │ │  ← Uses the parameter!
│ │ │ turn right 90°                   │ │ │
│ │ └──────────────────────────────────┘ │ │
│ └──────────────────────────────────────┘ │
└──────────────────────────────────────────┘

<span class="cm">USE it anywhere — one block does all the work:</span>
┌──────────────────────────────────────────┐
│ when 🏳️ clicked                          │
│ draw square (50)                         │  ← Small square
│ move (100) steps                         │
│ draw square (100)                        │  ← Medium square
│ move (150) steps                         │
│ draw square (150)                        │  ← Big square
└──────────────────────────────────────────┘`,
      examples: [
        { label: 'Using functions to draw complex patterns', code: `<span class="cm">FLOWER PATTERN using a "draw petal" function:</span>

<span class="cm">Define draw_petal (size):</span>
┌──────────────────────────────────────────┐
│ define draw petal (size)                 │
│   repeat 2 times                         │
│      move (size) steps                   │
│      turn right 60°                      │
│      move (size) steps                   │
│      turn right 120°                     │
└──────────────────────────────────────────┘

<span class="cm">Draw a flower with 6 petals:</span>
┌──────────────────────────────────────────┐
│ repeat 6 times                           │  ← 6 petals
│    draw petal (80)                       │  ← Uses function!
│    turn right 60°                        │  ← Rotate between petals
└──────────────────────────────────────────┘

<span class="cm">WITHOUT the function, this would be 6×8 = 48 blocks!
WITH the function: 3 blocks + the 6-block definition.
Functions make complex things SIMPLE.</span>` },
      ],
      fact: 'The concept of functions in programming was invented by John von Neumann and Herman Goldstine in 1947. They called them "subroutines." Before subroutines, if you needed to do the same calculation in 50 places in a program, you literally wrote those instructions 50 separate times. Subroutines reduced a 10,000-instruction program to 800 instructions — a 92.5% reduction. Functions remain one of the most important tools in all of programming.',
      history: null,
      quiz: { q: 'What is a "parameter" in a function?', opts: ['The name of the function','A value you pass into the function so it can behave differently each time you call it','The number of times the function runs','A variable defined inside the function'], ans: 1 },
      challenge: { t: 'Geometric Art Generator', d: 'Create custom blocks for: draw_triangle(size), draw_square(size), draw_pentagon(size), draw_circle(size). Then write a program that uses all four functions to create an artistic pattern — like a town with square houses, triangle roofs, and circle suns. The program should create at least 15 total shapes using your 4 functions. Without functions, this would require hundreds of blocks. With functions, it should need fewer than 30.' },
    },

    {
      h: '🧮 Step 5 — Variables and Algorithms: Solving Real Problems',
      p: `An <strong>algorithm</strong> is a precise set of steps that solves a problem. Every app, website, and game is built from algorithms. Sorting a list, finding a path through a maze, detecting if a password is strong — these are all algorithmic problems.
<br><br>
In this step we combine <strong>variables</strong> (storing information), <strong>loops</strong> (repeating steps), and <strong>conditions</strong> (making decisions) to build real algorithms that solve actual problems.
<br><br>
<strong>The classic searching algorithm — Linear Search:</strong><br>
Given a list of names, find a specific person. The simple approach: check each name one by one from the beginning until you find the right one or reach the end. This works perfectly for small lists. For large lists (billions of records), computer scientists have developed much cleverer algorithms — but understanding Linear Search first is the foundation.`,
      code: `<span class="cm">LINEAR SEARCH ALGORITHM in Blockly/Scratch:</span>
<span class="cm">Find the number 7 in a list [3, 9, 1, 7, 5, 2]</span>

┌──────────────────────────────────────────────────┐
│ set [numbers ▼] to [3, 9, 1, 7, 5, 2]            │
│ set [target ▼] to (7)                             │
│ set [found ▼] to (0)                              │
│ set [position ▼] to (1)                           │
│                                                  │
│ repeat until <(position) > (length of [numbers])>│
│ ┌──────────────────────────────────────────────┐ │
│ │ if <item (position) of [numbers] = (target)> │ │
│ │ then                                         │ │
│ │ ┌──────────────────────────────────────────┐ │ │
│ │ │ set [found ▼] to (position)              │ │ │
│ │ │ stop this script                         │ │ │
│ │ └──────────────────────────────────────────┘ │ │
│ │ end                                          │ │
│ │ change [position ▼] by (1)                  │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ if <(found) > (0)> then                          │
│    say (join [Found at position: ] (found))      │
│ else                                             │
│    say [Not found!]                              │
└──────────────────────────────────────────────────┘`,
      examples: [
        { label: 'Bubble Sort — arranging numbers in order', code: `<span class="cm">BUBBLE SORT — one of the simplest sorting algorithms:</span>
<span class="cm">Repeatedly compare adjacent pairs, swap if in wrong order</span>

<span class="cm">Starting list: [5, 2, 8, 1, 9]</span>
<span class="cm">Step 1: [5,2] → 5>2? SWAP → [2, 5, 8, 1, 9]</span>
<span class="cm">Step 2: [5,8] → 5>8? NO → [2, 5, 8, 1, 9]</span>
<span class="cm">Step 3: [8,1] → 8>1? SWAP → [2, 5, 1, 8, 9]</span>
<span class="cm">Step 4: [8,9] → 8>9? NO → [2, 5, 1, 8, 9]</span>
<span class="cm">After one pass: the LARGEST number (9) is at the end!</span>
<span class="cm">Repeat for remaining items... after N passes: fully sorted!</span>

<span class="cm">In Blockly blocks:</span>
┌────────────────────────────────────────────┐
│ repeat (length of list - 1) times          │  ← N passes
│ ┌────────────────────────────────────────┐ │
│ │ repeat (length of list - 1) times      │ │  ← N comparisons
│ │ ┌──────────────────────────────────┐   │ │
│ │ │ if item(i) > item(i+1) then      │   │ │
│ │ │    swap item(i) and item(i+1)    │   │ │
│ │ │ end                              │   │ │
│ │ └──────────────────────────────────┘   │ │
│ └────────────────────────────────────────┘ │
└────────────────────────────────────────────┘` },
      ],
      fact: 'Google\'s search engine uses algorithms to rank billions of web pages in under 0.5 seconds. The core algorithm, called PageRank, was invented by Larry Page and Sergey Brin when they were PhD students at Stanford. It works by counting how many other pages link to a page, and how important those linking pages are — a problem that\'s solved using variables, loops, and conditions, just like what you\'ve been learning.',
      history: null,
      quiz: { q: 'What does an algorithm in computer science mean?', opts: ['A type of computer hardware','A precise, step-by-step method for solving a specific problem that always produces the correct result','A programming language','A type of variable'], ans: 1 },
      challenge: { t: 'Algorithm Challenge Trio', d: 'Implement three algorithms in Scratch: (1) FIND MAX — given a list of 8 random numbers, find the largest without using the max() function (use a loop and variable to track the current maximum). (2) COUNT VOWELS — given a word, count how many vowels it contains (use a loop through each letter and check if it\'s a, e, i, o, or u). (3) REVERSE A LIST — given a list [1,2,3,4,5], create a new reversed list [5,4,3,2,1] using a loop.' },
    },
  ],
};

/* ═══════════════════════════════════════════════════
   SCRATCH GAME DESIGN (scratch2) LESSONS
   ═══════════════════════════════════════════════════ */

T21.lessons.scratch2 = {
  title: 'Scratch Game Design', banner: 'scratch',
  subtitle: 'Level up your Scratch skills — build professional-quality games with advanced techniques.',
  steps: [
    {
      h: '🎮 Step 1 — Game Design Thinking: Plan Before You Build',
      p: `Professional game designers never open their computer first. They start with paper. They ask: <em>Who is the player? What do they do? What is the challenge? What is the reward? What makes it fun?</em> Only after these questions are answered does coding begin.
<br><br>
<strong>The Game Design Document (GDD)</strong> — even a simple one — prevents the most common beginner mistake: starting to code without knowing where you're going, then getting stuck halfway through with a confused mess of blocks.
<br><br>
<strong>For Scratch games, plan these 6 things:</strong><br>
1. <strong>Genre</strong> — platformer, shooter, puzzle, racing, clicker?<br>
2. <strong>Core mechanic</strong> — the ONE main thing the player does (jump, shoot, match, drive)<br>
3. <strong>Sprites needed</strong> — list every character and object<br>
4. <strong>Variables needed</strong> — score, lives, level, speed, timer...<br>
5. <strong>Win condition</strong> — how does the player WIN?<br>
6. <strong>Lose condition</strong> — how does the player LOSE?`,
      code: `<span class="cm">GAME DESIGN DOCUMENT — example for a platform game:</span>

┌────────────────────────────────────────────────────────┐
│ GAME: "Sky Jumper"                                     │
│ GENRE: Platformer                                      │
│ CORE MECHANIC: Jump between platforms to reach the top │
│                                                        │
│ SPRITES:                                               │
│  • Player (4 costumes: idle, jump, run-L, run-R)       │
│  • Platform (3 types: normal, moving, crumbling)       │
│  • Coin (for bonus points)                             │
│  • Cloud (background decoration, not interactive)      │
│  • Enemy (patrols platforms)                           │
│  • Flag (goal at the top)                              │
│                                                        │
│ VARIABLES:                                             │
│  score, lives (start 3), level, height_reached         │
│  gravity, jump_power, x_velocity, y_velocity           │
│                                                        │
│ WIN: reach the flag at the top (y = 170)               │
│ LOSE: fall off bottom (y < -175) OR lives = 0          │
│                                                        │
│ DIFFICULTY CURVE:                                      │
│  Level 1: Slow platforms, many coins                   │
│  Level 2: Faster platforms, some crumbling ones        │
│  Level 3: Enemies added, fewer coins                   │
└────────────────────────────────────────────────────────┘`,
      examples: [
        { label: 'The physics of platformers — gravity in Scratch', code: `<span class="cm">REAL platformer physics uses Y VELOCITY (not just change y):</span>

┌──────────────────────────────────────────┐
│ <span class="cm">These are VARIABLES (create them first):</span>  │
│ [y velocity] starts at 0                 │
│ [gravity] = -0.8 (negative = pulls down) │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ when 🏳️ clicked                          │
│ set [y velocity ▼] to (0)                │
│ forever                                  │
│ ┌──────────────────────────────────────┐ │
│ │ <span class="cm">1. Apply gravity every frame</span>          │ │
│ │ change [y velocity ▼] by (-0.8)      │ │  ← Accelerate down
│ │ change y by (y velocity)             │ │  ← Move by velocity
│ │                                      │ │
│ │ <span class="cm">2. If touching ground — stop falling</span>  │ │
│ │ if <touching color [GREEN]?> then    │ │
│ │    set [y velocity ▼] to (0)         │ │
│ │    change y by (3)                   │ │  ← Push out of ground
│ │ end                                  │ │
│ │                                      │ │
│ │ <span class="cm">3. Jump — only if on the ground</span>       │ │
│ │ if <key [up ▼] pressed?> and         │ │
│ │    <(y velocity) = 0> then           │ │  ← Must be grounded
│ │    set [y velocity ▼] to (12)        │ │  ← Launch up!
│ │ end                                  │ │
│ └──────────────────────────────────────┘ │
└──────────────────────────────────────────┘` },
      ],
      fact: 'Nintendo spent 6 months on the "feel" of Mario\'s jump alone before releasing Super Mario Bros in 1985. The curve of the jump arc, how quickly Mario rises and falls, how long you can hold the button to jump higher — these were tweaked hundreds of times until they felt perfect. This obsession with "game feel" is why Mario games feel so satisfying to play 40 years later.',
      history: null,
      quiz: { q: 'Why should you plan your game on paper BEFORE opening Scratch?', opts: ['Paper planning is required by Scratch','Planning prevents getting stuck midway through coding with a confused design — you know exactly what to build before you start','Paper planning makes the code run faster','Scratch doesn\'t work without a design document'], ans: 1 },
      challenge: { t: 'Game Design Document', d: 'Before writing a single Scratch block, create a complete Game Design Document on paper or in a document for YOUR original game idea. Include: game name and genre, core mechanic (the one main thing the player does), a sketch of the stage layout, complete sprite list with their purposes, all variables you\'ll need, win condition, lose condition, and a 3-level difficulty progression. Show it to someone and get feedback before building.' },
    },

    {
      h: '👾 Step 2 — Clones: Making Many from One',
      p: `In most Scratch games, you need multiple copies of the same sprite — many bullets flying at once, many enemies on screen, many collectibles scattered around. The naive approach (making 20 separate enemy sprites) doesn't scale. <strong>Clones</strong> solve this elegantly: one original sprite can create and control dozens of independent copies of itself.
<br><br>
<strong>How Clones work:</strong><br>
The <strong>original sprite</strong> acts like a factory — it creates clones but often stays hidden itself. Each <strong>clone</strong> is a full independent copy that can have its own position, costumes, and behaviour. When you're done with a clone, you delete just that clone — the original stays.
<br><br>
<strong>The critical pattern for clones:</strong><br>
• Original sprite: <code>when 🏳 clicked → hide → (loop) → create clone → wait</code><br>
• Clone behaviour: <code>when I start as a clone → show → (do stuff) → delete this clone</code>`,
      code: `<span class="cm">BULLET system using clones — fires continuously:</span>

<span class="cm">--- BULLET sprite (original) ---</span>
┌──────────────────────────────────────────┐
│ when 🏳️ clicked                          │
│ hide                                     │  ← Original stays hidden
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ when [space] key pressed                 │
│ create clone of [myself ▼]               │  ← Fire a bullet!
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ when I start as a clone                  │
│ go to [player ▼]                         │  ← Starts at player's position
│ show                                     │
│ point in direction (0)                   │  ← Aim up
│ repeat until <(y position) > (175)>      │  ← Until offscreen
│ ┌──────────────────────────────────────┐ │
│ │ move (15) steps                      │ │  ← Fly fast!
│ │ if <touching [enemy ▼]?> then        │ │
│ │    change [score ▼] by (100)         │ │
│ │    broadcast [enemy hit] ▼           │ │
│ │    delete this clone                 │ │  ← Bullet disappears
│ │ end                                  │ │
│ └──────────────────────────────────────┘ │
│ delete this clone                        │  ← Off screen → remove
└──────────────────────────────────────────┘`,
      examples: [
        { label: 'Enemy waves using clones', code: `<span class="cm">ENEMY WAVE SPAWNER — creates enemies from one sprite:</span>

<span class="cm">--- ENEMY sprite (original) ---</span>
┌──────────────────────────────────────────────┐
│ when 🏳️ clicked                              │
│ hide                                         │
│ set [enemies left ▼] to (0)                  │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ when I receive [spawn wave] ▼                │
│ set [wave size ▼] to (level × 3)             │  ← More per level!
│ repeat (wave size)                           │
│ ┌──────────────────────────────────────────┐ │
│ │ create clone of [myself ▼]               │ │
│ │ wait (0.5) seconds                       │ │  ← Stagger spawning
│ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ when I start as a clone                      │
│ go to x: (pick random -200 to 200) y: (170) │  ← Random top position
│ show                                         │
│ change [enemies left ▼] by (1)               │
│ repeat until <(y position) < (-170)>         │
│    move (2 + level) steps down               │  ← Faster per level
│    if <touching [bullet ▼]?> then            │
│       change [score ▼] by (100)              │
│       change [enemies left ▼] by (-1)        │
│       delete this clone                      │
│    end                                       │
│ end                                          │
│ change [lives ▼] by (-1)                     │  ← Reached bottom!
│ change [enemies left ▼] by (-1)              │
│ delete this clone                            │
└──────────────────────────────────────────────┘` },
      ],
      fact: 'The concept of "instancing" in professional 3D game engines (Unity, Unreal) is the exact same idea as Scratch clones. When there are 500 trees in a Minecraft world, there\'s only ONE tree model in memory — and 500 "instances" of it placed at different positions. This technique, called GPU instancing, is what allows modern games to render millions of objects at 60 frames per second without the console melting.',
      history: null,
      quiz: { q: 'In Scratch clones, where should the code for what a clone DOES go?', opts: ['In the "when green flag clicked" script of the original','In a script starting with "when I start as a clone"','Clones automatically do the same thing as the original','In a separate sprite created for clones'], ans: 1 },
      challenge: { t: 'Space Invaders Style Shooter', d: 'Build a game where: Your ship (arrow keys) fires bullets with the spacebar (clones). A row of 10 alien enemies marches across the screen (clones, created from ONE original). Aliens move right until hitting the edge, then drop down and reverse direction. Each alien clone fires its own bullet downward randomly. Bullets hitting aliens destroy them (+100 pts). Alien bullets hitting you cost a life. Win: destroy all aliens. Lose: lives = 0 OR any alien reaches the bottom.' },
    },

    {
      h: '🎵 Step 3 — Sound Design and Polish: Making Games Feel Great',
      p: `Two games can have identical gameplay but feel completely different based on their sound design and visual polish. Great game audio does three things:<br>
1. <strong>Feedback</strong> — confirms actions (jump sound, coin collect, hit)<br>
2. <strong>Atmosphere</strong> — sets the mood (cheerful music, tense music, silence)<br>
3. <strong>Information</strong> — communicates state (warning sound when health is low, victory fanfare)
<br><br>
<strong>Scratch Sound tools:</strong><br>
• Sound library — hundreds of free sounds organised by category<br>
• Record — use your microphone to record custom sounds<br>
• Sound editor — trim, boost, reverse, add fade in/out to any sound<br>
• <code>play sound [name] until done</code> — waits for the sound to finish<br>
• <code>start sound [name]</code> — plays it and continues immediately (use for short SFX)<br>
• <code>set volume to (50)%</code> / <code>change volume by (-10)</code> — volume control`,
      code: `<span class="cm">COMPLETE SOUND DESIGN SYSTEM for a game:</span>

<span class="cm">--- GAME MANAGER sprite (controls all audio) ---</span>
┌──────────────────────────────────────────────┐
│ when 🏳️ clicked                              │
│ set volume to (70) %                         │
│ start sound [background music loop]          │  ← Background music
└──────────────────────────────────────────────┘

<span class="cm">React to game events with sound:</span>
┌──────────────────────────────────────────────┐
│ when I receive [coin collected] ▼            │
│ start sound [coin ding]                      │  ← Immediate feedback
│ change [score ▼] by (10)                     │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ when I receive [player hit] ▼                │
│ start sound [hurt grunt]                     │
│ <span class="cm">Screen flash effect:</span>                         │
│ set color effect to (50)                     │
│ wait (0.2) seconds                           │
│ clear graphic effects                        │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ when I receive [game over] ▼                 │
│ stop sound                                   │  ← Stop music
│ play sound [game over fanfare] until done    │  ← Dramatic finale!
└──────────────────────────────────────────────┘`,
      examples: [
        { label: 'Visual effects that bring games to life', code: `<span class="cm">SCREEN SHAKE — classic game feel effect when hit:</span>
┌──────────────────────────────────────────────┐
│ define shake screen                          │
│ repeat (10)                                  │
│ ┌──────────────────────────────────────────┐ │
│ │ change x by (pick random -5 to 5)        │ │
│ │ change y by (pick random -5 to 5)        │ │
│ │ wait (0.02) seconds                      │ │
│ └──────────────────────────────────────────┘ │
│ go to x: (0) y: (0)                          │  ← Reset position
└──────────────────────────────────────────────┘

<span class="cm">PARTICLE EFFECTS on enemy death (using clones):</span>
┌──────────────────────────────────────────────┐
│ when I receive [enemy destroyed] ▼           │
│ repeat (8)                                   │  ← 8 particles
│    create clone of [particle ▼]              │
└──────────────────────────────────────────────┘

<span class="cm">--- PARTICLE sprite ---</span>
┌──────────────────────────────────────────────┐
│ when I start as a clone                      │
│ go to [enemy ▼]                              │
│ set direction to (pick random 0 to 360)      │
│ repeat (15)                                  │
│    move (5) steps                            │  ← Fly outward
│    change size by (-5)                       │  ← Shrink
│    change ghost effect by (6)                │  ← Fade out
│ end                                          │
│ delete this clone                            │
└──────────────────────────────────────────────┘` },
      ],
      fact: 'The iconic "coin" sound in Super Mario Bros (1985) — that short, ascending two-note ding — was created by composer Koji Kondo in a single afternoon. Nintendo has reported that playtesting showed players unconsciously tried harder to collect coins specifically BECAUSE of the satisfying sound. Audio isn\'t just decoration — it directly affects player behaviour and enjoyment.',
      history: null,
      quiz: { q: 'What is the difference between "play sound until done" and "start sound" in Scratch?', opts: ['They are identical — same block, different names','play sound until done waits for the sound to finish before continuing; start sound plays it immediately and the script continues without waiting','start sound plays louder','play sound only works once'], ans: 1 },
      challenge: { t: 'Full Audio Polish Pass', d: 'Take any game you\'ve already built (or build a simple one if needed) and add a complete audio layer: background music that loops, a distinct sound for every game event (jump, collect, hit, game over, level up, button click), a volume control accessible from the start screen, screen shake when the player takes damage, a particle explosion effect when enemies die, and a visual screen flash for the game over. The game should feel dramatically more alive after this polish pass.' },
    },

    {
      h: '🏗️ Step 4 — Advanced Mechanics: Platforms, Scrolling & Levels',
      p: `The games that feel most satisfying have rich mechanics — smooth platform physics, camera scrolling to follow the player, multiple levels that unlock progressively. These are advanced techniques but they follow directly from what you already know.
<br><br>
<strong>Scrolling (camera following the player):</strong><br>
Scratch's stage doesn't actually scroll — but you can FAKE it by moving everything EXCEPT the player in the opposite direction. When the player moves right, move all platforms and enemies LEFT. The player appears to be moving through a world much larger than the screen.
<br><br>
<strong>Multiple levels:</strong><br>
Use backdrops for visual changes and a "level" variable to control difficulty. When the player reaches the exit, broadcast a "next level" event that repositions everything and increases difficulty parameters.`,
      code: `<span class="cm">FAKE SCROLLING — the classic platformer trick:</span>

<span class="cm">--- PLAYER sprite ---</span>
<span class="cm">Player never actually moves left/right!
Instead, move the WORLD around the player.</span>
┌──────────────────────────────────────────┐
│ <span class="cm">Instead of: move player left</span>              │
│ <span class="cm">Do: broadcast [scroll right] by (5)</span>      │
└──────────────────────────────────────────┘

<span class="cm">--- ALL PLATFORM sprites ---</span>
┌──────────────────────────────────────────┐
│ when I receive [scroll right] ▼          │
│ change x by (-5)                         │  ← Move platforms LEFT
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ when I receive [scroll left] ▼           │
│ change x by (5)                          │  ← Move platforms RIGHT
└──────────────────────────────────────────┘

<span class="cm">Result: player stays centred on screen,
but it looks like they're moving through a world!</span>`,
      examples: [
        { label: 'Level system with progression', code: `<span class="cm">COMPLETE LEVEL SYSTEM:</span>

<span class="cm">--- LEVEL MANAGER sprite ---</span>
┌──────────────────────────────────────────────────┐
│ when 🏳️ clicked                                  │
│ set [level ▼] to (1)                             │
│ broadcast [load level] ▼                         │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ when I receive [load level] ▼                    │
│ <span class="cm">Set up difficulty based on level:</span>               │
│ set [enemy speed ▼] to (1 + level)               │
│ set [spawn rate ▼] to (3 - (level × 0.3))        │
│ set [coins to collect ▼] to (level × 5)          │
│ <span class="cm">Load correct backdrop:</span>                          │
│ if <(level) = (1)> then                          │
│    switch backdrop to [forest]                   │
│ else if <(level) = (2)> then                     │
│    switch backdrop to [cave]                     │
│ else if <(level) = (3)> then                     │
│    switch backdrop to [castle]                   │
│ end                                              │
│ broadcast [start level] ▼                        │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ when I receive [level complete] ▼                │
│ play sound [level up fanfare] until done         │
│ change [level ▼] by (1)                          │
│ if <(level) > (3)> then                          │
│    broadcast [you win] ▼                         │
│ else                                             │
│    broadcast [load level] ▼                      │
│ end                                              │
└──────────────────────────────────────────────────┘` },
      ],
      fact: 'The first side-scrolling game was Scramble (1981) by Konami — an arcade space shooter. The "camera" was purely mechanical: the entire screen display physically scrolled. Modern games use the same mathematical trick you just learned (moving everything except the player) but do it for potentially infinite worlds. Minecraft\'s world is 60 million blocks wide — 9 times the diameter of Earth — yet runs on a laptop using this exact technique.',
      history: null,
      quiz: { q: 'How do you create the illusion of scrolling in Scratch when the stage cannot actually scroll?', opts: ['Use the scroll block from the Extensions menu','Move all background sprites and platforms in the opposite direction to the player\'s intended movement, so the player appears to be moving through a world','Change the stage backdrop rapidly','Increase the stage size in settings'], ans: 1 },
      challenge: { t: 'Three-Level Platformer', d: 'Build a complete 3-level platformer: Level 1 (grassland): simple static platforms, 5 coins to collect, no enemies. Level 2 (cave): moving platforms, 10 coins, 2 patrolling enemies. Level 3 (sky): fast-moving platforms, 15 coins, 4 enemies + 1 boss. Use backdrop changes for visual style, increase enemy speed each level, use fake scrolling (optional, for extra credit). Each level has an exit door that only opens after all coins are collected. Win screen after Level 3.' },
    },

    {
      h: '🤝 Step 5 — Multiplayer and Sharing: Building for Real Players',
      p: `A game becomes truly alive when real people play it. Designing for other players — not just yourself — requires a completely different mindset. You must consider: <em>Will someone who has never seen this know what to do? Is it fun for 30 seconds? For 30 minutes? Is it fair?</em>
<br><br>
<strong>Scratch multiplayer on ONE computer (hot seat):</strong><br>
Two players can share a keyboard — Player 1 uses WASD, Player 2 uses arrow keys. This "hot seat" multiplayer is the easiest way to make a 2-player game in Scratch.
<br><br>
<strong>Playtesting — the most important game design skill:</strong><br>
Show your game to someone who has never seen it. Watch them play WITHOUT giving any instructions. When they get stuck or confused, that's a design problem — not their fault. Every confusion you observe is a chance to make your game better.`,
      code: `<span class="cm">TWO-PLAYER HOT SEAT SETUP:</span>

<span class="cm">--- PLAYER 1 sprite (WASD keys) ---</span>
┌──────────────────────────────────────────┐
│ when 🏳️ clicked                          │
│ go to x: (-100) y: (-100)                │  ← Left starting position
│ set [p1 score ▼] to (0)                  │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ forever                                  │
│    if <key [w ▼] pressed?> then          │
│       change y by (5)                    │
│    end                                   │
│    if <key [s ▼] pressed?> then          │
│       change y by (-5)                   │
│    end                                   │
│    if <key [a ▼] pressed?> then          │
│       change x by (-5)                   │
│       point in direction (-90)           │
│    end                                   │
│    if <key [d ▼] pressed?> then          │
│       change x by (5)                    │
│       point in direction (90)            │
│    end                                   │
└──────────────────────────────────────────┘

<span class="cm">--- PLAYER 2 sprite (arrow keys) ---</span>
<span class="cm">Same script but using arrow keys instead of WASD</span>`,
      examples: [
        { label: 'High score system — the ultimate motivator', code: `<span class="cm">HIGH SCORE SYSTEM — keeps the best score ever:</span>
<span class="cm">(Scratch variables reset when project restarts, but cloud variables
persist online for all players — requires Scratch account to use)</span>

┌──────────────────────────────────────────────┐
│ when 🏳️ clicked                              │
│ <span class="cm">Cloud variable "☁ high score" persists</span>       │
│ <span class="cm">for ALL players who play your shared project!</span> │
│                                              │
│ set [this session score ▼] to (0)            │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ when I receive [game over] ▼                 │
│ if <(score) > (☁ high score)> then          │
│ ┌────────────────────────────────────────┐   │
│ │ set [☁ high score ▼] to (score)        │   │  ← New world record!
│ │ play sound [fanfare]                   │   │
│ │ say [🏆 NEW HIGH SCORE!] for 3 secs    │   │
│ └────────────────────────────────────────┘   │
│ else                                         │
│    say (join [High Score: ] (☁ high score)) │
│        3 secs                                │
│ end                                          │
└──────────────────────────────────────────────┘` },
      ],
      fact: 'The highest-scoring Scratch game on the platform has been played over 5 million times. Its creator was 13 years old when they built it. They improved it 47 times based on comments from other Scratch users — each improvement made in response to specific feedback from real players. Iteration based on user feedback is exactly how professional game studios like Rockstar, Nintendo, and EA develop their games.',
      history: null,
      quiz: { q: 'What is "playtesting" in game design and why is it essential?', opts: ['Testing the game yourself to find bugs','Having someone who has never seen your game play it while you watch, to identify confusing or frustrating parts that you\'ve become blind to as the creator','Running the game on multiple computers to test performance','Sharing the game on social media'], ans: 1 },
      challenge: { t: 'CAPSTONE — Complete 2-Player Competitive Game', d: 'Build a complete two-player competitive game using hot-seat controls (Player 1: WASD, Player 2: arrows). Ideas: Pong-style ball game, racing game, collection battle (collect more coins than opponent in 60 seconds), or duelling platformer. Requirements: Both players have separate scores displayed, there is a clear winner condition, there is a rematch button, sound effects for all major events, increasing difficulty or speed over time, and a high score using a cloud variable if you have a Scratch account. Most importantly: have THREE real people playtest it and implement at least 2 improvements based on their feedback.' },
    },

    {
      h: '🏆 Step 6 — Capstone: Your Masterpiece Game',
      p: `You've learned every major technique in Scratch game design: physics, clones, events, variables, scrolling, levels, multiplayer, sound design, and playtesting. Now it's time to build something you're truly proud of — something you'd be excited to share on Scratch for thousands of players around the world.
<br><br>
<strong>What makes a Scratch masterpiece?</strong><br>
• An original concept — not a copy of another game<br>
• Polished visuals — custom sprites and backgrounds, not defaults<br>
• Full audio — custom sounds recorded or carefully chosen<br>
• Clear tutorial — first 30 seconds teaches the player everything they need<br>
• Progressive difficulty — never too easy, never unfairly hard<br>
• Replayability — players come back to beat their high score
<br><br>
<strong>The Scratch community is waiting for YOUR creation.</strong> When you share your project, write a clear description, add good instructions, and respond to comments. Great creators are also great community members.`,
      code: `<span class="cm">MASTERPIECE CHECKLIST — check every item before sharing:</span>

TECHNICAL:
☐ Green flag starts the game cleanly (all variables reset)
☐ No sprite flicker or glitching
☐ Sprites never get stuck offscreen
☐ Game over properly stops all scripts
☐ Restart works perfectly every time

DESIGN:
☐ Player understands what to do within 10 seconds
☐ Core mechanic is fun even without any other features
☐ Difficulty increases gradually over time
☐ Win AND lose conditions are clear and fair

POLISH:
☐ Sound effect for every major action
☐ Background music that fits the mood
☐ Visual feedback for every event (flash, shake, particle)
☐ Score displayed clearly at all times
☐ Start screen with title and instructions
☐ Game over screen with score and restart button

SHARING:
☐ Clear project title
☐ Instructions written in the description
☐ Tagged with relevant genres
☐ Tested on at least 3 different people`,
      examples: [
        { label: 'Game design inspiration — mechanics you haven\'t tried yet', code: `<span class="cm">UNEXPLORED MECHANICS for your masterpiece:</span>

🎯 GRAVITY FLIP: When player presses SPACE, gravity reverses.
   Used in: VVVVVV, Flappy Bird variants
   Implementation: multiply [gravity] variable by -1

🔮 SIZE CHANGING: Collecting powerups makes player grow/shrink.
   Bigger = more health but slower movement.
   Used in: Katamari, various puzzle games
   Implementation: change size by %, adjust speed proportionally

⏰ TIME REWIND: Record last 5 seconds of positions in a list.
   Press R to rewind time.
   Used in: Braid, Prince of Persia
   Implementation: store x,y every frame, play them backwards

🌀 PORTAL: Step into one portal, appear at the other.
   Used in: Portal, Doors
   Implementation: if touching [portal A] → go to [portal B]

💡 LIGHT IN DARKNESS: Only see a small circle around the player.
   Used in: Spelunky, many horror games
   Implementation: large black sprite with a circular hole,
   follow the player using go to [player]` },
      ],
      fact: 'The Scratch cat mascot doesn\'t have an official name — the Scratch team calls it simply "Scratch Cat." In 2023, a community vote was held and over 200,000 Scratch users participated in naming it. The winning name was "Scratch Cat" — voted by the community to keep its iconic identity. Your game sprites don\'t need names either, but the best game characters always have personalities that come through in their animations and sounds.',
      history: null,
      quiz: { q: 'What is the most important thing to do AFTER finishing your game before sharing it?', opts: ['Make it as long as possible','Have people who have never seen it play it while you watch, then improve it based on what you see them struggle with','Add as many sprites as possible','Make sure it has the most levels of any game on Scratch'], ans: 1 },
      challenge: { t: 'FINAL CAPSTONE — Your Scratch Masterpiece', d: 'Build your greatest Scratch game ever. Spend at least 3 sessions on it. Requirements: original concept not copied from another game, minimum 6 sprites with custom animations, complete audio design (music + SFX), minimum 3 levels or 3 minutes of gameplay, at least 3 separate variable systems (score, lives, level, speed, etc.), uses clones for at least one game mechanic, has been playtested by 3+ people with improvements made, includes a polished start and end screen. Share it on Scratch, collect 10 "loves" from the community, and write a comment on 10 other people\'s games with specific, helpful feedback. Creating is just half of being a great game designer — the community makes you better.' },
    },
  ],
};
