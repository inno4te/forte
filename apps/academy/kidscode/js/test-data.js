/* =================================================================
   TEAM21 ACADEMY — CERTIFICATION TEST QUESTIONS
   ================================================================= */

T21.tests = {
  scratch:[
    {q:'What are Scratch characters called?',opts:['Pixels','Sprites','Blocks','Icons'],ans:1},
    {q:'Which block repeats actions until you press stop?',opts:['Repeat 10','When flag clicked','Forever loop','Wait block'],ans:2},
    {q:'How do you animate a sprite in Scratch?',opts:['Add more sprites','Switch costumes rapidly in a loop','Change the backdrop colour','Use the pencil tool'],ans:1},
    {q:'What does the broadcast block let sprites do?',opts:['Delete each other','Send signals other sprites can react to','Change the backdrop','Save the project'],ans:1},
    {q:'Which Scratch block stops ALL running scripts?',opts:['Pause all','Hide all','Stop all','Reset all'],ans:2},
  ],
  blockly:[
    {q:'How do you write code in Blockly?',opts:['Type on a keyboard','Draw shapes on screen','Drag and snap visual blocks together','Speak voice commands'],ans:2},
    {q:'What is a "sequence" in coding?',opts:['A random action','Steps done in a specific order','A loop that repeats','A condition check'],ans:1},
    {q:'What does a "repeat" block do in Blockly?',opts:['Stops the program','Runs code a set number of times','Checks a condition','Plays a sound'],ans:1},
    {q:'What is a "nested loop"?',opts:['A loop that never runs','A loop placed inside another loop','An if-statement','A broken loop'],ans:1},
    {q:'What does it mean for code to run "in sequence"?',opts:['Steps run randomly','Each step runs one at a time in order','All steps run simultaneously','The program loops'],ans:1},
  ],
  scratch2:[
    {q:'What should you do BEFORE coding your game?',opts:['Add sounds first','Plan the game design on paper','Open Scratch immediately','Pick the most colourful sprite'],ans:1},
    {q:'What is a variable used for in a game?',opts:['Storing a background image','Storing changing data like score or lives','Creating different sprites','Drawing on the stage'],ans:1},
    {q:'Why check "key pressed?" inside a forever loop instead of "when key pressed"?',opts:['It uses less memory','It gives smoother, continuous movement','It only works with arrow keys','There is no difference'],ans:1},
    {q:'What does "create clone of myself" do?',opts:['Deletes the sprite','Makes a copy of the sprite that runs independently','Changes sprite colour','Pauses the game'],ans:1},
    {q:'What is a "difficulty curve" in game design?',opts:['A type of joystick','The way a game gradually becomes more challenging','A graph of scores','A bug'],ans:1},
  ],
  python1:[
    {q:'What does print() do in Python?',opts:['Prints to a physical printer','Displays text on the screen','Saves a file to disk','Plays a sound'],ans:1},
    {q:'What is a variable in Python?',opts:['A type of loop','A named box that stores data','A special type of screen','A Python version number'],ans:1},
    {q:'What does Python use to determine which lines belong inside an if block?',opts:['Curly braces','Semicolons','Indentation (spaces)','Capital letters'],ans:2},
    {q:'What is the index of the FIRST item in a Python list?',opts:['1','0','-1','It depends'],ans:1},
    {q:'Which keyword creates a function in Python?',opts:['function','create','define','def'],ans:3},
  ],
  python2:[
    {q:'What does random.randint(1, 100) return?',opts:['Prints numbers 1 to 100','A random whole number between 1 and 100','Sorts 100 numbers','Generates 100 random letters'],ans:1},
    {q:'Which file mode creates or overwrites a file in Python?',opts:['"r" (read)','"a" (append)','"w" (write)','"x" (create only)'],ans:2},
    {q:'What does the "return" keyword do in a function?',opts:['Stops the program entirely','Sends a value back to where the function was called','Prints to the screen','Deletes the function'],ans:1},
    {q:'How do you access a value in a Python dictionary?',opts:['By numeric position only','By its key name in square brackets','You cannot access values directly','By alphabetical order'],ans:1},
    {q:'What is often the FIRST step in debugging a Python error?',opts:['Delete all code and start over','Read the error message for the line number and error type','Restart the computer','Ignore it and run again'],ans:1},
  ],
  web:[
    {q:'What does HTML stand for?',opts:['High Text Markup Language','HyperText Markup Language','How To Make Links','Home Tool Markup Language'],ans:1},
    {q:'Why use semantic tags like &lt;header&gt; and &lt;article&gt; instead of generic &lt;div&gt;?',opts:['They look different by default','They improve accessibility and search engine understanding','They run faster','They are required for CSS'],ans:1},
    {q:'What does CSS control on a webpage?',opts:['Database connections','Visual appearance and styling','Server-side programming logic','How fast the page loads'],ans:1},
    {q:'In the CSS box model, what is "padding"?',opts:['Space outside the border','Space inside the border, around the content','The border thickness','The font size'],ans:1},
    {q:'How does JavaScript read what a user typed into an input?',opts:['Using the .value property','Automatically, with no code','By refreshing the page','Using CSS'],ans:0},
  ],
  clang:[
    {q:'Which function prints formatted text in C?',opts:['print()','echo()','printf()','display()'],ans:2},
    {q:'Which C data type stores decimal (floating-point) numbers?',opts:['int','char','string','float'],ans:3},
    {q:'In "for(int i=0; i<5; i++)", what does i++ do?',opts:['Sets i back to zero','Checks if i is less than 5','Adds 1 to i','Prints i to the screen'],ans:2},
    {q:'What is a key difference between a C array and a Python list?',opts:['Arrays can hold any type','C arrays have a fixed size; Python lists can grow/shrink','Arrays don\'t support loops','No difference'],ans:1},
    {q:'What must every C program have exactly one of?',opts:['A printf statement','A function called main()','A for loop','A comment'],ans:1},
  ],
  python3:[
    {q:'Which type of ML learns from data with NO labels, finding hidden groups?',opts:['Supervised learning','Unsupervised learning','Reinforcement learning','None of these'],ans:1},
    {q:'Which Python function finds the largest value in a list?',opts:['largest()','top()','max()','biggest()'],ans:2},
    {q:'What is the key difference between a rule-based classifier and a trained ML model?',opts:['Rule-based is always faster','A trained model discovers its rules automatically from data','They produce different output types','No real difference'],ans:1},
    {q:'What is "overfitting" in machine learning?',opts:['A model too large to fit on a computer','A model that performs well on training data but poorly on new data','Training taking too long','Too few examples'],ans:1},
    {q:'What is a key limitation of simple keyword-matching sentiment analysis?',opts:['It runs too slowly','It cannot detect sarcasm or context-dependent meaning','It only works in French','It requires the internet'],ans:1},
  ],
  java:[
    {q:'What is the JVM (Java Virtual Machine)?',opts:['A Java text editor','Software that allows Java to run on any operating system','A Java game engine','A Java testing tool'],ans:1},
    {q:'In Java, what is a "class"?',opts:['A school lesson','A blueprint for creating objects','A type of loop','A constant value'],ans:1},
    {q:'What is special about a Java constructor\'s name?',opts:['Always called "construct"','It matches the class name exactly','Must be lowercase','Can be anything'],ans:1},
    {q:'What keyword makes one Java class inherit from another?',opts:['inherits','copies','extends','clone'],ans:2},
    {q:'Why mark fields "private" in a class like BankAccount?',opts:['Private fields run faster','To protect data from unsafe outside changes','Required Java syntax','Makes class smaller'],ans:1},
  ],
  cpp:[
    {q:'Which famous game engine is written entirely in C++?',opts:['Unity','Godot','Unreal Engine','Pygame'],ans:2},
    {q:'What does "private" mean in a C++ class?',opts:['The class is invisible','Members only accessible within the class','Anyone can access them','Members are deleted'],ans:1},
    {q:'What does polymorphism allow different subclasses to do?',opts:['Run on different OS','Respond differently to the same method call','Use less memory','Compile faster'],ans:1},
    {q:'What does a pointer store in C++?',opts:['A copy of the data','The actual value directly','A memory address','A function definition'],ans:2},
    {q:'What advantage does a C++ vector have over a fixed array?',opts:['Uses less memory always','It can grow and shrink dynamically','Only stores strings','Works without a CPU'],ans:1},
  ],
  robotics:[
    {q:'Which platform is most popular for beginner electronics and robotics?',opts:['Raspberry Pi only','Arduino only','LEGO Mindstorms only','All are excellent for different purposes!'],ans:3},
    {q:'What is the key difference between digital and analog signals?',opts:['Digital is always faster','Digital has only two states; analog has a continuous range','Analog only works at night','No real difference'],ans:1},
    {q:'What does an ultrasonic sensor primarily measure?',opts:['Temperature','Light intensity','Distance using sound echo timing','Sound frequency'],ans:2},
    {q:'What is the role of an actuator versus a sensor?',opts:['Actuators perceive; sensors act','Sensors perceive; actuators physically act on the world','Same job','Actuators only work with light'],ans:1},
    {q:'What makes a robot truly "autonomous"?',opts:['Remote control','Solar power','Making decisions from sensor data without human input','Being expensive'],ans:2},
  ],
  ai:[
    {q:'What is the key difference between rule-based AI and Machine Learning?',opts:['Rule-based AI is newer','ML learns patterns from examples instead of explicit rules','They are identical','Rule-based AI needs no programmer'],ans:1},
    {q:'Why do words need to be converted into numbers before an AI can process them?',opts:['Numbers are prettier','Computers can only fundamentally work with numbers','It makes files smaller','Legal requirement'],ans:1},
    {q:'What does "training" a neural network actually mean?',opts:['Physical exercise for the computer','Repeatedly adjusting weights to reduce errors on example data','Installing new hardware','Writing more if/else rules'],ans:1},
    {q:'What is the core training task of a Large Language Model?',opts:['Sorting numbers','Predicting the next word/token in a sequence','Drawing pictures','Translating binary'],ans:1},
    {q:'What is RLHF used for in building a model like Claude?',opts:['Making the model run faster','Adjusting the model using human/principle-based feedback on quality','Compressing file size','Translating languages'],ans:1},
    {q:'What is a "context window" in an LLM like Claude?',opts:['A pop-up window','The limited stretch of recent conversation the model can consider at once','An error message type','The model\'s file size'],ans:1},
    {q:'Why does giving Claude an example of your desired format often help?',opts:['Makes Claude work slower on purpose','"Few-shot prompting" shows the exact pattern, reducing guesswork','Required for the model to function','Only works for maths'],ans:1},
    {q:'What does "hallucination" mean in AI?',opts:['The AI seeing physical things','The model generating confident but factually incorrect text','A computer virus','Graphical display glitches'],ans:1},
  ],
};
