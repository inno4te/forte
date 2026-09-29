T21.lessons = T21.lessons || {};

T21.lessons.python1 = {
  title: 'Python for Kids', banner: 'python',
  subtitle: 'From absolute zero to writing real programs — every concept explained deeply with multiple examples.',
  steps: [

    /* ══════════════════════════════════════════════════════════
       STEP 1 — Hello World & How Python Actually Works
       ══════════════════════════════════════════════════════════ */
    {
      h: '🐍 Step 1 — Hello World & How Python Works Under the Hood',
      p: `Before we write a single line of code, let's understand what actually happens when you run a Python program. Most tutorials skip this — we won't.
<br><br>
<strong>What is Python, really?</strong><br>
Python is a set of rules (a language) that a program called the <em>Python interpreter</em> understands. When you write Python code and press Run, the interpreter reads your file top-to-bottom, translates each instruction into something the computer's processor can execute, and carries it out immediately. Unlike C or Java, Python doesn't need a separate compilation step — it interprets your code live, line by line. This is why errors happen at the exact line where you made a mistake, not somewhere mysterious after compilation.
<br><br>
<strong>Your first program — and what every part means:</strong>`,
      code: `<span class="cm"># This is a comment. Python ignores it.
# Comments explain your code to humans.
# Always write comments — future-you will thank present-you.</span>

<span class="fn">print</span>(<span class="str">"Hello, World!"</span>)
<span class="cm">#       ↑                ↑
# function name      argument (data we pass in)
# print() is a built-in function — Python includes it for free</span>

<span class="fn">print</span>(<span class="str">"My name is Python."</span>)
<span class="fn">print</span>(<span class="str">"I will make you powerful."</span>)

<span class="cm"># print() can display numbers too — no quotes needed:</span>
<span class="fn">print</span>(<span class="num">42</span>)
<span class="fn">print</span>(<span class="num">3.14159</span>)

<span class="cm"># It can display multiple things at once, separated by commas:</span>
<span class="fn">print</span>(<span class="str">"The answer is"</span>, <span class="num">42</span>, <span class="str">"and pi is roughly"</span>, <span class="num">3.14</span>)`,
      examples: [
        { label: 'Printing different types', code: `<span class="fn">print</span>(<span class="str">"Text in quotes"</span>)    <span class="cm"># string</span>
<span class="fn">print</span>(<span class="num">100</span>)               <span class="cm"># integer</span>
<span class="fn">print</span>(<span class="num">3.99</span>)             <span class="cm"># float (decimal)</span>
<span class="fn">print</span>(<span class="kw">True</span>)              <span class="cm"># boolean (True or False)</span>` },
        { label: 'Common beginner mistake — forgetting quotes', code: `<span class="cm"># ❌ WRONG — Python thinks "hello" is a variable name</span>
<span class="fn">print</span>(hello)   <span class="cm"># NameError: name 'hello' is not defined</span>

<span class="cm"># ✅ RIGHT — text must always be in quotes</span>
<span class="fn">print</span>(<span class="str">"hello"</span>)` },
      ],
      fact: 'Python was named after "Monty Python\'s Flying Circus," a British comedy show. Its creator, Guido van Rossum, started writing it over his Christmas holiday in 1989 as a personal project. Today, it\'s the most-taught first programming language in the world.',
      history: 'python_xmas',
      quiz: { q: 'What does the Python interpreter do with your code?', opts: ['Translates it to C first','Reads it top-to-bottom and executes each line immediately','Sends it to a server to run','Checks spelling only'], ans: 1 },
      challenge: { t: 'Five Print Statements', d: 'Write 5 print() statements — your name, your age, your favourite colour, a number between 1 and 1000, and something you want to build with code. Run it and watch Python execute each one in order.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 2 — Variables: Labelled Boxes With Types
       ══════════════════════════════════════════════════════════ */
    {
      h: '📦 Step 2 — Variables: Labelled Boxes and the Four Basic Types',
      p: `A <strong>variable</strong> is a named container that stores a value. Think of it exactly like a labelled box: you put something inside, give the box a name, and can look inside or change the contents at any time.
<br><br>
In Python you create a variable with one line: <code>name = value</code>. The equals sign here means "store this value in this box" — it is NOT checking equality (that's <code>==</code> with two equals signs, which we'll see later).
<br><br>
<strong>Python's four fundamental data types:</strong><br>
• <strong>str</strong> — text ("string"), always in quotes: <code>"hello"</code> or <code>'hello'</code><br>
• <strong>int</strong> — whole numbers: <code>42</code>, <code>-7</code>, <code>1000000</code><br>
• <strong>float</strong> — decimal numbers: <code>3.14</code>, <code>-0.5</code>, <code>2.0</code><br>
• <strong>bool</strong> — only two values: <code>True</code> or <code>False</code> (capital T and F!)
<br><br>
Python figures out the type automatically from what you write — you never need to declare it.`,
      code: `<span class="cm"># Creating variables — the "labelled box" model</span>
student_name = <span class="str">"Amara Nkosi"</span>   <span class="cm"># str: text</span>
age          = <span class="num">13</span>             <span class="cm"># int: whole number</span>
height_cm    = <span class="num">157.5</span>         <span class="cm"># float: decimal</span>
loves_coding = <span class="kw">True</span>          <span class="cm"># bool: yes/no</span>

<span class="cm"># Reading variable contents — just use the name:</span>
<span class="fn">print</span>(student_name)   <span class="cm"># Amara Nkosi</span>
<span class="fn">print</span>(age)            <span class="cm"># 13</span>
<span class="fn">print</span>(height_cm)      <span class="cm"># 157.5</span>
<span class="fn">print</span>(loves_coding)   <span class="cm"># True</span>

<span class="cm"># f-strings: embed variables directly inside text</span>
<span class="cm"># Put f before the quote, then use {variable_name}</span>
<span class="fn">print</span>(<span class="str">f"Hi! My name is {student_name} and I am {age} years old."</span>)
<span class="fn">print</span>(<span class="str">f"My height is {height_cm} cm. I love coding: {loves_coding}"</span>)`,
      examples: [
        { label: 'Variables can change — that\'s the whole point!', code: `score = <span class="num">0</span>
<span class="fn">print</span>(<span class="str">f"Score: {score}"</span>)   <span class="cm"># Score: 0</span>

score = <span class="num">10</span>               <span class="cm"># Reassign — the box now holds 10</span>
<span class="fn">print</span>(<span class="str">f"Score: {score}"</span>)   <span class="cm"># Score: 10</span>

score = score + <span class="num">5</span>        <span class="cm"># Take current value, add 5, store result back</span>
<span class="fn">print</span>(<span class="str">f"Score: {score}"</span>)   <span class="cm"># Score: 15</span>

<span class="cm"># Shorthand — the same as score = score + 5:</span>
score += <span class="num">5</span>
<span class="fn">print</span>(<span class="str">f"Score: {score}"</span>)   <span class="cm"># Score: 20</span>` },
        { label: 'Maths with variables', code: `price    = <span class="num">49.99</span>
quantity = <span class="num">3</span>
discount = <span class="num">0.10</span>    <span class="cm"># 10% as a decimal</span>

subtotal = price * quantity
tax      = subtotal * <span class="num">0.075</span>    <span class="cm"># 7.5% tax</span>
savings  = subtotal * discount
total    = subtotal + tax - savings

<span class="fn">print</span>(<span class="str">f"Subtotal:  \${subtotal:.2f}"</span>)   <span class="cm"># .2f = 2 decimal places</span>
<span class="fn">print</span>(<span class="str">f"You saved: \${savings:.2f}"</span>)
<span class="fn">print</span>(<span class="str">f"Total:     \${total:.2f}"</span>)` },
        { label: 'Checking the type of a variable', code: `<span class="fn">print</span>(<span class="fn">type</span>(<span class="str">"hello"</span>))   <span class="cm"># &lt;class 'str'&gt;</span>
<span class="fn">print</span>(<span class="fn">type</span>(<span class="num">42</span>))       <span class="cm"># &lt;class 'int'&gt;</span>
<span class="fn">print</span>(<span class="fn">type</span>(<span class="num">3.14</span>))     <span class="cm"># &lt;class 'float'&gt;</span>
<span class="fn">print</span>(<span class="fn">type</span>(<span class="kw">True</span>))     <span class="cm"># &lt;class 'bool'&gt;</span>

<span class="cm"># Common bug: adding string to number FAILS</span>
<span class="cm"># age_text = "13"   &lt;-- looks like a number but it's a str!</span>
<span class="cm"># print(age_text + 1)  &lt;-- TypeError!</span>
<span class="cm"># Fix: int("13") converts string to integer</span>
age_text = <span class="str">"13"</span>
age_num  = <span class="fn">int</span>(age_text)
<span class="fn">print</span>(age_num + <span class="num">1</span>)     <span class="cm"># 14 — works!</span>` },
      ],
      fact: 'The term "variable" comes from mathematics, where it means a symbol that can represent different values. But in programming, variables are more powerful than maths variables — they can store text, images, sound data, or even entire programs.',
      history: 'ada_lovelace',
      quiz: { q: 'What does the line `score = score + 5` do?', opts: ['Checks if score equals score + 5','Creates a new variable called score + 5','Takes the current score, adds 5, and stores the result back in score','Prints score + 5'], ans: 2 },
      challenge: { t: 'Shopping Basket Calculator', d: 'Create variables for 3 items you\'d buy online (name, price, quantity each). Calculate the subtotal for each item, the grand total, and a 15% discount off the grand total. Print a shopping receipt using f-strings.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 3 — if / elif / else: Making Decisions
       ══════════════════════════════════════════════════════════ */
    {
      h: '🔀 Step 3 — if, elif, else: Teaching Python to Make Decisions',
      p: `Until now, our programs run every line no matter what. Real programs need to choose different paths based on conditions — a game responds differently to winning vs losing, a weather app shows different icons for rain vs sunshine. That's what <strong>conditionals</strong> do.
<br><br>
<strong>The anatomy of an if statement:</strong><br>
<code>if condition:</code> — the condition must evaluate to True or False<br>
<code>&nbsp;&nbsp;&nbsp;&nbsp;code_to_run</code> — indented 4 spaces; Python uses indentation as structure<br>
<br>
The condition uses <strong>comparison operators</strong>:<br>
<code>==</code> equal to &nbsp;|&nbsp; <code>!=</code> not equal to &nbsp;|&nbsp; <code>&gt;</code> greater &nbsp;|&nbsp; <code>&lt;</code> less than<br>
<code>&gt;=</code> greater or equal &nbsp;|&nbsp; <code>&lt;=</code> less or equal
<br><br>
<strong>Critical rule:</strong> The colon <code>:</code> at the end of if/elif/else lines is NOT optional. Forgetting it is the #1 syntax error for beginners.`,
      code: `<span class="cm"># Basic if/elif/else structure</span>
temperature = <span class="num">28</span>   <span class="cm"># try changing this value!</span>

<span class="kw">if</span> temperature > <span class="num">35</span>:
    <span class="fn">print</span>(<span class="str">"🔥 Extreme heat! Stay indoors."</span>)
<span class="kw">elif</span> temperature > <span class="num">25</span>:
    <span class="fn">print</span>(<span class="str">"☀️  Warm and sunny — great day out!"</span>)
<span class="kw">elif</span> temperature > <span class="num">15</span>:
    <span class="fn">print</span>(<span class="str">"🌤️  Comfortable — maybe bring a jacket."</span>)
<span class="kw">elif</span> temperature > <span class="num">5</span>:
    <span class="fn">print</span>(<span class="str">"🧥 Cold! Definitely wear a coat."</span>)
<span class="kw">else</span>:
    <span class="fn">print</span>(<span class="str">"❄️  Freezing! Are you at the North Pole?"</span>)

<span class="fn">print</span>(<span class="str">f"Checked temperature: {temperature}°C"</span>)
<span class="cm"># This line ALWAYS runs — it's not inside any if block</span>`,
      examples: [
        { label: 'Combining conditions with and / or', code: `age   = <span class="num">15</span>
score = <span class="num">88</span>

<span class="cm"># AND: BOTH conditions must be True</span>
<span class="kw">if</span> age >= <span class="num">13</span> <span class="kw">and</span> score >= <span class="num">80</span>:
    <span class="fn">print</span>(<span class="str">"✅ Teen with great marks — scholarship candidate!"</span>)

<span class="cm"># OR: at least ONE condition must be True</span>
<span class="kw">if</span> score >= <span class="num">90</span> <span class="kw">or</span> age < <span class="num">12</span>:
    <span class="fn">print</span>(<span class="str">"🎖️ Either top marks OR very young — impressive!"</span>)

<span class="cm"># NOT: flips True to False and vice versa</span>
is_raining = <span class="kw">False</span>
<span class="kw">if not</span> is_raining:
    <span class="fn">print</span>(<span class="str">"🌞 No rain — let's go outside!"</span>)` },
        { label: 'Grade calculator — real world example', code: `<span class="cm"># A complete grade calculator</span>
name  = <span class="str">"Kofi"</span>
score = <span class="num">73</span>    <span class="cm"># Try different values: 95, 82, 71, 55, 40</span>

<span class="kw">if</span>   score >= <span class="num">90</span>: grade, msg = <span class="str">"A"</span>, <span class="str">"Outstanding! 🌟"</span>
<span class="kw">elif</span> score >= <span class="num">80</span>: grade, msg = <span class="str">"B"</span>, <span class="str">"Great work! 👍"</span>
<span class="kw">elif</span> score >= <span class="num">70</span>: grade, msg = <span class="str">"C"</span>, <span class="str">"Good effort 😊"</span>
<span class="kw">elif</span> score >= <span class="num">60</span>: grade, msg = <span class="str">"D"</span>, <span class="str">"Keep studying 📚"</span>
<span class="kw">else</span>:             grade, msg = <span class="str">"F"</span>, <span class="str">"Let's talk 💬"</span>

<span class="fn">print</span>(<span class="str">f"{name} scored {score}% → Grade {grade}"</span>)
<span class="fn">print</span>(<span class="str">f"Teacher's note: {msg}"</span>)
passed = score >= <span class="num">60</span>
<span class="fn">print</span>(<span class="str">f"Passed: {passed}"</span>)` },
        { label: 'Nested if — checking conditions within conditions', code: `<span class="cm"># Ticket pricing — nested decisions</span>
age       = <span class="num">16</span>
is_member = <span class="kw">True</span>

<span class="kw">if</span> age < <span class="num">5</span>:
    price = <span class="num">0</span>
    <span class="fn">print</span>(<span class="str">"Free for under 5s! 🎈"</span>)
<span class="kw">elif</span> age < <span class="num">18</span>:
    <span class="kw">if</span> is_member:
        price = <span class="num">5</span>      <span class="cm"># Child member discount</span>
        <span class="fn">print</span>(<span class="str">"Child member rate 🎟️"</span>)
    <span class="kw">else</span>:
        price = <span class="num">8</span>      <span class="cm"># Standard child price</span>
        <span class="fn">print</span>(<span class="str">"Child rate 🎟️"</span>)
<span class="kw">else</span>:
    price = <span class="num">12</span> <span class="kw">if</span> is_member <span class="kw">else</span> <span class="num">18</span>  <span class="cm"># Inline if!</span>
    <span class="fn">print</span>(<span class="str">f"Adult {'member' if is_member else 'standard'} 🎟️"</span>)

<span class="fn">print</span>(<span class="str">f"Your ticket: £{price}"</span>)` },
      ],
      fact: 'Every decision your computer ever makes — from autocorrect choosing a word to a self-driving car deciding to brake — is ultimately a chain of if/elif/else comparisons, just happening millions of times per second at machine speed.',
      history: null,
      quiz: { q: 'What is the MOST COMMON syntax error beginners make with if statements?', opts: ['Using the wrong variable name','Forgetting the colon : at the end of the if/elif/else line','Using == instead of =','Having too many elif blocks'], ans: 1 },
      challenge: { t: 'Smart Loan Eligibility Checker', d: 'Build a program with variables: age (int), annual_income (float), credit_score (int 300-850), has_job (bool). Using nested if/elif/else, print one of these exact results: "Approved — Prime Rate", "Approved — Standard Rate", "Approved — High Rate", "Declined — Income too low", or "Declined — Age under 18". Use and/or to combine conditions.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 4 — Loops: for and while
       ══════════════════════════════════════════════════════════ */
    {
      h: '🔄 Step 4 — Loops: Making Python Do the Repetitive Work For You',
      p: `Imagine printing a times table manually — you'd need 10 print statements. Or greeting 500 students — 500 statements! Loops solve this. They let you run the same code repeatedly with the computer tracking repetition for you.
<br><br>
<strong>Python has two kinds of loops:</strong><br>
• <strong>for loop</strong> — used when you know exactly how many times to repeat, or when you want to process every item in a collection<br>
• <strong>while loop</strong> — used when you repeat until some condition becomes False; the number of repetitions isn't fixed in advance
<br><br>
The <code>range()</code> function generates sequences of numbers for for-loops:<br>
<code>range(5)</code> → 0, 1, 2, 3, 4<br>
<code>range(1, 6)</code> → 1, 2, 3, 4, 5<br>
<code>range(0, 10, 2)</code> → 0, 2, 4, 6, 8 (counting by 2s)`,
      code: `<span class="cm"># for loop — runs exactly len(range()) times</span>
<span class="fn">print</span>(<span class="str">"--- 7 times table ---"</span>)
<span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">13</span>):           <span class="cm"># i goes 1,2,3,...,12</span>
    result = <span class="num">7</span> * i
    <span class="fn">print</span>(<span class="str">f"  7 × {i:2} = {result:3}"</span>)  <span class="cm"># :2 pads to 2 chars width</span>

<span class="cm"># while loop — runs WHILE the condition stays True</span>
<span class="fn">print</span>(<span class="str">"\\n--- Countdown ---"</span>)
countdown = <span class="num">5</span>
<span class="kw">while</span> countdown > <span class="num">0</span>:
    <span class="fn">print</span>(<span class="str">f"  {countdown}..."</span>)
    countdown -= <span class="num">1</span>       <span class="cm"># CRUCIAL: always move toward the exit condition!</span>
<span class="fn">print</span>(<span class="str">"  🚀 Blast off!"</span>)`,
      examples: [
        { label: 'break and continue — controlling loop flow', code: `<span class="cm"># break — exit the loop immediately</span>
<span class="fn">print</span>(<span class="str">"Find the first multiple of 7 over 50:"</span>)
<span class="kw">for</span> n <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">1000</span>):
    <span class="kw">if</span> n > <span class="num">50</span> <span class="kw">and</span> n % <span class="num">7</span> == <span class="num">0</span>:   <span class="cm"># % is "remainder" (modulo)</span>
        <span class="fn">print</span>(<span class="str">f"  Found: {n}"</span>)
        <span class="kw">break</span>    <span class="cm"># stop searching — we found it!</span>

<span class="cm"># continue — skip this iteration, go to next</span>
<span class="fn">print</span>(<span class="str">"\\nOdd numbers only, up to 15:"</span>)
<span class="kw">for</span> n <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">16</span>):
    <span class="kw">if</span> n % <span class="num">2</span> == <span class="num">0</span>:  <span class="cm"># if even...</span>
        <span class="kw">continue</span>    <span class="cm"># ...skip it, go to next n</span>
    <span class="fn">print</span>(<span class="str">f"  {n}"</span>, end=<span class="str">" "</span>)` },
        { label: 'Nested loops — a loop inside a loop', code: `<span class="cm"># Multiplication table — nested loops in action</span>
<span class="fn">print</span>(<span class="str">"Multiplication Table (1–5):"</span>)
<span class="fn">print</span>(<span class="str">"    "</span>, end=<span class="str">""</span>)
<span class="kw">for</span> col <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">6</span>): <span class="fn">print</span>(<span class="str">f"{col:4}"</span>, end=<span class="str">""</span>)
<span class="fn">print</span>()

<span class="kw">for</span> row <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">6</span>):         <span class="cm"># outer loop: rows</span>
    <span class="fn">print</span>(<span class="str">f"{row:3} |"</span>, end=<span class="str">""</span>)
    <span class="kw">for</span> col <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">6</span>):     <span class="cm"># inner loop: columns</span>
        <span class="fn">print</span>(<span class="str">f"{row*col:4}"</span>, end=<span class="str">""</span>)
    <span class="fn">print</span>()  <span class="cm"># newline after each row</span>` },
        { label: 'while loop with user input — game loop pattern', code: `<span class="cm"># Pattern for any game loop or menu system</span>
<span class="cm"># (In a lab, set answer directly; for real: use input())</span>
secret_number = <span class="num">42</span>
guesses_left  = <span class="num">5</span>
guessed       = <span class="kw">False</span>

<span class="kw">while</span> guesses_left > <span class="num">0</span> <span class="kw">and not</span> guessed:
    guess = <span class="num">35</span>  <span class="cm"># Simulating a guess; real: int(input("Guess: "))</span>
    guesses_left -= <span class="num">1</span>

    <span class="kw">if</span> guess == secret_number:
        <span class="fn">print</span>(<span class="str">f"🎉 Correct! Used {5 - guesses_left} guess(es)."</span>)
        guessed = <span class="kw">True</span>
    <span class="kw">elif</span> guess < secret_number:
        <span class="fn">print</span>(<span class="str">f"📈 Too low! {guesses_left} guesses left."</span>)
    <span class="kw">else</span>:
        <span class="fn">print</span>(<span class="str">f"📉 Too high! {guesses_left} guesses left."</span>)

<span class="kw">if not</span> guessed:
    <span class="fn">print</span>(<span class="str">f"😔 Out of guesses! The number was {secret_number}."</span>)` },
      ],
      fact: 'The concept of a loop in programming traces back to Ada Lovelace\'s 1843 notes — she described repeating a sequence of operations as a core idea for her mechanical "Engine." She called them "cycles" rather than loops, but the concept is identical to what you\'re writing right now.',
      history: 'logo_turtle',
      quiz: { q: 'What is the CRITICAL rule when writing a while loop to avoid an infinite loop?', opts: ['Always use range()','The condition must use ==','Something inside the loop must eventually make the condition False','While loops can only run 100 times'], ans: 2 },
      challenge: { t: 'FizzBuzz — The Famous Coding Interview Question', d: 'Write a for loop from 1 to 100. For multiples of 3, print "Fizz". For multiples of 5, print "Buzz". For multiples of BOTH 3 and 5, print "FizzBuzz". For all other numbers, just print the number. Hint: use the % operator and check the combined condition first.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 5 — Lists: Collections of Data
       ══════════════════════════════════════════════════════════ */
    {
      h: '📋 Step 5 — Lists: Storing and Manipulating Collections of Data',
      p: `So far every variable holds one thing. But real programs deal with collections — a list of students, a leaderboard of scores, items in a shopping cart. Python's <strong>list</strong> solves this: it holds multiple values in order, in one variable.
<br><br>
<strong>Key facts about Python lists:</strong><br>
• Created with square brackets: <code>[item1, item2, item3]</code><br>
• Items are accessed by <strong>index</strong> (position), starting at <strong>0</strong> (not 1!)<br>
• The last item's index is always <code>len(list) - 1</code><br>
• Negative indexing: <code>list[-1]</code> is always the last item<br>
• Lists are <strong>mutable</strong> — you can change, add, and remove items after creation<br>
• Lists can mix types (though usually you keep them the same type)`,
      code: `<span class="cm"># Creating a list</span>
scores = [<span class="num">92</span>, <span class="num">87</span>, <span class="num">95</span>, <span class="num">78</span>, <span class="num">100</span>, <span class="num">63</span>, <span class="num">88</span>]
names  = [<span class="str">"Amara"</span>, <span class="str">"Kofi"</span>, <span class="str">"Zara"</span>, <span class="str">"Liam"</span>]

<span class="cm"># Accessing items by index (0-based!)</span>
<span class="fn">print</span>(scores[<span class="num">0</span>])    <span class="cm"># 92  (first item)</span>
<span class="fn">print</span>(scores[<span class="num">2</span>])    <span class="cm"># 95  (third item)</span>
<span class="fn">print</span>(scores[-<span class="num">1</span>])   <span class="cm"># 88  (last item — negative indexing)</span>
<span class="fn">print</span>(scores[-<span class="num">2</span>])   <span class="cm"># 63  (second-to-last)</span>

<span class="cm"># Useful built-in list operations:</span>
<span class="fn">print</span>(<span class="str">f"Count:   {<span class="fn">len</span>(scores)}"</span>)    <span class="cm"># 7</span>
<span class="fn">print</span>(<span class="str">f"Highest: {<span class="fn">max</span>(scores)}"</span>)    <span class="cm"># 100</span>
<span class="fn">print</span>(<span class="str">f"Lowest:  {<span class="fn">min</span>(scores)}"</span>)    <span class="cm"># 63</span>
<span class="fn">print</span>(<span class="str">f"Total:   {<span class="fn">sum</span>(scores)}"</span>)    <span class="cm"># 603</span>
<span class="fn">print</span>(<span class="str">f"Average: {<span class="fn">sum</span>(scores)/<span class="fn">len</span>(scores):.1f}"</span>)  <span class="cm"># 86.1</span>`,
      examples: [
        { label: 'Modifying lists — add, change, remove', code: `fruits = [<span class="str">"apple"</span>, <span class="str">"banana"</span>, <span class="str">"mango"</span>]

<span class="cm"># Adding items:</span>
fruits.<span class="fn">append</span>(<span class="str">"kiwi"</span>)       <span class="cm"># add to end → [apple, banana, mango, kiwi]</span>
fruits.<span class="fn">insert</span>(<span class="num">1</span>, <span class="str">"grape"</span>)  <span class="cm"># insert at index 1 → [apple, grape, banana, mango, kiwi]</span>

<span class="cm"># Changing items:</span>
fruits[<span class="num">0</span>] = <span class="str">"pear"</span>          <span class="cm"># replace first item</span>

<span class="cm"># Removing items:</span>
fruits.<span class="fn">remove</span>(<span class="str">"banana"</span>)    <span class="cm"># remove by value (first match)</span>
popped = fruits.<span class="fn">pop</span>()      <span class="cm"># removes AND returns last item</span>
<span class="fn">print</span>(<span class="str">f"Removed: {popped}"</span>)

<span class="cm"># Check if item exists:</span>
<span class="fn">print</span>(<span class="str">"mango"</span> <span class="kw">in</span> fruits)    <span class="cm"># True or False</span>
<span class="fn">print</span>(fruits)` },
        { label: 'Looping over a list — the most common pattern', code: `students = [<span class="str">"Amara"</span>, <span class="str">"Kofi"</span>, <span class="str">"Zara"</span>, <span class="str">"Liam"</span>, <span class="str">"Nia"</span>]

<span class="cm"># Method 1: loop over values directly (clean, Pythonic)</span>
<span class="fn">print</span>(<span class="str">"Attendance register:"</span>)
<span class="kw">for</span> student <span class="kw">in</span> students:
    <span class="fn">print</span>(<span class="str">f"  ✓ {student}"</span>)

<span class="cm"># Method 2: loop with index (when you need the position)</span>
<span class="fn">print</span>(<span class="str">"\\nRanking:"</span>)
<span class="kw">for</span> i, student <span class="kw">in</span> <span class="fn">enumerate</span>(students):
    <span class="fn">print</span>(<span class="str">f"  #{i+1}: {student}"</span>)  <span class="cm"># enumerate gives (index, value)</span>` },
        { label: 'List comprehension — Python\'s superpower', code: `numbers = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>, <span class="num">6</span>, <span class="num">7</span>, <span class="num">8</span>, <span class="num">9</span>, <span class="num">10</span>]

<span class="cm"># Regular loop to get even numbers:</span>
evens_loop = []
<span class="kw">for</span> n <span class="kw">in</span> numbers:
    <span class="kw">if</span> n % <span class="num">2</span> == <span class="num">0</span>:
        evens_loop.<span class="fn">append</span>(n)

<span class="cm"># Same thing as a list comprehension (one line!):</span>
evens_comp = [n <span class="kw">for</span> n <span class="kw">in</span> numbers <span class="kw">if</span> n % <span class="num">2</span> == <span class="num">0</span>]

<span class="cm"># Square every even number:</span>
even_squares = [n**<span class="num">2</span> <span class="kw">for</span> n <span class="kw">in</span> numbers <span class="kw">if</span> n % <span class="num">2</span> == <span class="num">0</span>]

<span class="fn">print</span>(evens_comp)    <span class="cm"># [2, 4, 6, 8, 10]</span>
<span class="fn">print</span>(even_squares)  <span class="cm"># [4, 16, 36, 64, 100]</span>` },
      ],
      fact: 'Python\'s list is one of the most-used data structures in all of programming. Under the hood, Python stores list items in contiguous memory locations — like seats in a row — which is why index-based access is instantaneous regardless of how large the list is.',
      history: 'grace_hopper',
      quiz: { q: 'If a list has 7 items, what is the index of the LAST item?', opts: ['7','8','6','-0'], ans: 2 },
      challenge: { t: 'Class Leaderboard', d: 'Create two parallel lists: student_names with 6 names, and student_scores with 6 scores (50-100). Write code that: (1) prints all students with their scores, (2) finds the highest and lowest scorer by name, (3) calculates and prints the class average, (4) creates a new list of only students who passed (score ≥ 60) using a list comprehension.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 6 — Functions: Write Once, Use Everywhere
       ══════════════════════════════════════════════════════════ */
    {
      h: '🔧 Step 6 — Functions: Building Reusable, Named Blocks of Code',
      p: `A <strong>function</strong> is a named, reusable block of code. You define it once with <code>def</code>, then call it as many times as you want by name. Functions are perhaps the most important tool for writing clean, maintainable code.
<br><br>
<strong>Why functions matter — the DRY principle:</strong><br>
DRY = <em>Don't Repeat Yourself</em>. If you find yourself writing the same code in multiple places, that's a sign to create a function. Every time you need to update that logic, you change it in ONE place, not everywhere it appears.
<br><br>
<strong>Anatomy of a function:</strong><br>
<code>def</code> → keyword that starts a function definition<br>
<code>function_name</code> → choose a descriptive verb-based name<br>
<code>(parameters)</code> → inputs the function receives (can be empty: <code>()</code>)<br>
<code>return</code> → sends a value back to the caller (optional)<br>
<strong>Docstring</strong> → a string right after <code>def</code> that documents what the function does`,
      code: `<span class="cm"># Function with no parameters</span>
<span class="kw">def</span> <span class="fn">print_header</span>():
    <span class="str">"""Print a formatted header. No inputs needed."""</span>
    <span class="fn">print</span>(<span class="str">"=" * <span class="num">40</span></span>)
    <span class="fn">print</span>(<span class="str">"    TEAM21 ACADEMY — GRADE REPORT"</span>)
    <span class="fn">print</span>(<span class="str">"=" * <span class="num">40</span></span>)

<span class="cm"># Function with parameters and a return value</span>
<span class="kw">def</span> <span class="fn">calculate_grade</span>(score):
    <span class="str">"""Convert a numeric score to a letter grade and message."""</span>
    <span class="kw">if</span>   score >= <span class="num">90</span>: <span class="kw">return</span> <span class="str">"A"</span>, <span class="str">"Outstanding! 🌟"</span>
    <span class="kw">elif</span> score >= <span class="num">80</span>: <span class="kw">return</span> <span class="str">"B"</span>, <span class="str">"Great work! 👍"</span>
    <span class="kw">elif</span> score >= <span class="num">70</span>: <span class="kw">return</span> <span class="str">"C"</span>, <span class="str">"Good effort 😊"</span>
    <span class="kw">elif</span> score >= <span class="num">60</span>: <span class="kw">return</span> <span class="str">"D"</span>, <span class="str">"Keep going! 📚"</span>
    <span class="kw">else</span>:             <span class="kw">return</span> <span class="str">"F"</span>, <span class="str">"Let's talk 💬"</span>

<span class="cm"># Calling the functions</span>
<span class="fn">print_header</span>()
students = [(<span class="str">"Amara"</span>, <span class="num">94</span>), (<span class="str">"Kofi"</span>, <span class="num">76</span>), (<span class="str">"Zara"</span>, <span class="num">58</span>)]

<span class="kw">for</span> name, score <span class="kw">in</span> students:
    grade, msg = <span class="fn">calculate_grade</span>(score)  <span class="cm"># unpack two return values</span>
    <span class="fn">print</span>(<span class="str">f"  {name:<span class="num">8</span>} {score:3}%  [{grade}]  {msg}"</span>)`,
      examples: [
        { label: 'Default parameters and keyword arguments', code: `<span class="kw">def</span> <span class="fn">greet</span>(name, greeting=<span class="str">"Hello"</span>, punctuation=<span class="str">"!"</span>):
    <span class="str">"""Greet someone. greeting and punctuation are optional."""</span>
    <span class="fn">print</span>(<span class="str">f"{greeting}, {name}{punctuation}"</span>)

<span class="fn">greet</span>(<span class="str">"Amara"</span>)                           <span class="cm"># Hello, Amara!</span>
<span class="fn">greet</span>(<span class="str">"Kofi"</span>, <span class="str">"Good morning"</span>)           <span class="cm"># Good morning, Kofi!</span>
<span class="fn">greet</span>(<span class="str">"Zara"</span>, punctuation=<span class="str">"."</span>)          <span class="cm"># Hello, Zara.</span>
<span class="fn">greet</span>(<span class="str">"Liam"</span>, <span class="str">"Hey"</span>, <span class="str">"??"</span>)              <span class="cm"># Hey, Liam??</span>` },
        { label: 'Functions calling other functions', code: `<span class="kw">def</span> <span class="fn">celsius_to_fahrenheit</span>(c):
    <span class="str">"""Convert Celsius to Fahrenheit."""</span>
    <span class="kw">return</span> (c * <span class="num">9</span> / <span class="num">5</span>) + <span class="num">32</span>

<span class="kw">def</span> <span class="fn">describe_weather</span>(temp_c):
    <span class="str">"""Give a weather description for a temperature in Celsius."""</span>
    temp_f = <span class="fn">celsius_to_fahrenheit</span>(temp_c)  <span class="cm"># call another function!</span>

    <span class="kw">if</span> temp_c > <span class="num">30</span>:   condition = <span class="str">"🔥 Very Hot"</span>
    <span class="kw">elif</span> temp_c > <span class="num">20</span>: condition = <span class="str">"☀️  Warm"</span>
    <span class="kw">elif</span> temp_c > <span class="num">10</span>: condition = <span class="str">"🌤️  Cool"</span>
    <span class="kw">else</span>:             condition = <span class="str">"❄️  Cold"</span>

    <span class="kw">return</span> <span class="str">f"{temp_c}°C / {temp_f:.1f}°F — {condition}"</span>

<span class="kw">for</span> temp <span class="kw">in</span> [<span class="num">-5</span>, <span class="num">15</span>, <span class="num">22</span>, <span class="num">35</span>]:
    <span class="fn">print</span>(<span class="fn">describe_weather</span>(temp))` },
        { label: 'Functions that process lists', code: `<span class="kw">def</span> <span class="fn">class_statistics</span>(scores):
    <span class="str">"""Calculate full statistics for a list of scores."""</span>
    <span class="kw">if not</span> scores:     <span class="cm"># guard against empty list</span>
        <span class="kw">return</span> <span class="kw">None</span>

    total    = <span class="fn">sum</span>(scores)
    count    = <span class="fn">len</span>(scores)
    average  = total / count
    highest  = <span class="fn">max</span>(scores)
    lowest   = <span class="fn">min</span>(scores)
    passed   = [s <span class="kw">for</span> s <span class="kw">in</span> scores <span class="kw">if</span> s >= <span class="num">60</span>]
    pass_rate = <span class="fn">len</span>(passed) / count * <span class="num">100</span>

    <span class="kw">return</span> {
        <span class="str">"average"</span>: <span class="fn">round</span>(average, <span class="num">1</span>),
        <span class="str">"highest"</span>: highest,
        <span class="str">"lowest"</span>: lowest,
        <span class="str">"pass_rate"</span>: <span class="fn">round</span>(pass_rate, <span class="num">1</span>),
        <span class="str">"total_students"</span>: count,
    }

results = <span class="fn">class_statistics</span>([<span class="num">92</span>, <span class="num">87</span>, <span class="num">45</span>, <span class="num">78</span>, <span class="num">100</span>, <span class="num">63</span>, <span class="num">55</span>])
<span class="kw">for</span> key, val <span class="kw">in</span> results.<span class="fn">items</span>():
    <span class="fn">print</span>(<span class="str">f"  {key:<span class="num">16</span>}: {val}"</span>)` },
      ],
      fact: 'The concept of a "subroutine" (the original word for function) was invented by David Wheeler in 1952. Before that, programmers had to literally copy-paste entire blocks of code every time they needed to repeat a computation — imagine doing that on a 50,000-line program!',
      history: null,
      quiz: { q: 'What does the "return" statement do in a function?', opts: ['Prints the result to the screen','Sends a value back to whoever called the function so they can use it','Ends the entire program','Restarts the function from the beginning'], ans: 1 },
      challenge: { t: 'Complete Student Report System', d: 'Build a system with 4 functions: (1) get_grade(score) → returns letter A-F, (2) is_passing(score) → returns True/False, (3) print_student_report(name, scores_list) → prints a complete report showing each score, grade, and whether they passed, plus the average, (4) print_class_summary(all_students_dict) where the dict is {name: [scores]}. Call print_class_summary with at least 4 students.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 7 — Dictionaries & Capstone Project
       ══════════════════════════════════════════════════════════ */
    {
      h: '📚 Step 7 — Dictionaries & Capstone: Build a Real Address Book',
      p: `A <strong>dictionary</strong> maps <em>keys</em> to <em>values</em> — like a real dictionary maps words to definitions, or a phone book maps names to numbers. Unlike lists (which use numeric positions), dictionaries let you look up values by meaningful names.
<br><br>
<strong>When to use a list vs a dictionary:</strong><br>
• <strong>List</strong> → ordered sequence of similar items: <code>[score1, score2, score3]</code><br>
• <strong>Dictionary</strong> → named properties of ONE thing: <code>{"name": "Amara", "age": 13}</code>
<br><br>
Keys must be unique and are usually strings. Values can be anything — including other lists or dictionaries (nested!). This is how JSON data (used by almost every app and API on the internet) works.`,
      code: `<span class="cm"># Creating a dictionary</span>
student = {
    <span class="str">"name"</span>:    <span class="str">"Amara Nkosi"</span>,
    <span class="str">"age"</span>:     <span class="num">13</span>,
    <span class="str">"scores"</span>:  [<span class="num">88</span>, <span class="num">92</span>, <span class="num">79</span>, <span class="num">95</span>],  <span class="cm"># value can be a list!</span>
    <span class="str">"active"</span>:  <span class="kw">True</span>,
    <span class="str">"email"</span>:   <span class="str">"amara@school.edu"</span>,
}

<span class="cm"># Accessing values by key</span>
<span class="fn">print</span>(student[<span class="str">"name"</span>])          <span class="cm"># Amara Nkosi</span>
<span class="fn">print</span>(student[<span class="str">"scores"</span>][<span class="num">0</span>])    <span class="cm"># 88 (first score)</span>

<span class="cm"># Safer access with .get() — returns None if key doesn't exist</span>
<span class="fn">print</span>(student.<span class="fn">get</span>(<span class="str">"phone"</span>, <span class="str">"No phone recorded"</span>))

<span class="cm"># Modifying the dictionary</span>
student[<span class="str">"age"</span>]   = <span class="num">14</span>             <span class="cm"># update existing</span>
student[<span class="str">"phone"</span>] = <span class="str">"555-1234"</span>    <span class="cm"># add new key</span>

<span class="cm"># Looping over a dictionary</span>
<span class="fn">print</span>(<span class="str">"\\nStudent profile:"</span>)
<span class="kw">for</span> key, value <span class="kw">in</span> student.<span class="fn">items</span>():
    <span class="fn">print</span>(<span class="str">f"  {key:<span class="num">10</span>}: {value}"</span>)`,
      examples: [
        { label: 'Dictionary of dictionaries — a real database structure', code: `<span class="cm"># This is how databases and APIs represent data</span>
address_book = {
    <span class="str">"amara"</span>: {
        <span class="str">"full_name"</span>: <span class="str">"Amara Nkosi"</span>,
        <span class="str">"phone"</span>:     <span class="str">"555-0101"</span>,
        <span class="str">"email"</span>:     <span class="str">"amara@email.com"</span>,
        <span class="str">"city"</span>:      <span class="str">"Accra"</span>,
    },
    <span class="str">"kofi"</span>: {
        <span class="str">"full_name"</span>: <span class="str">"Kofi Mensah"</span>,
        <span class="str">"phone"</span>:     <span class="str">"555-0202"</span>,
        <span class="str">"email"</span>:     <span class="str">"kofi@email.com"</span>,
        <span class="str">"city"</span>:      <span class="str">"Kumasi"</span>,
    },
}

<span class="cm"># Look up a contact</span>
contact_id = <span class="str">"amara"</span>
<span class="kw">if</span> contact_id <span class="kw">in</span> address_book:
    c = address_book[contact_id]
    <span class="fn">print</span>(<span class="str">f"📞 {c['full_name']} — {c['phone']} ({c['city']})"</span>)` },
        { label: 'Counting with dictionaries — frequency counter', code: `<span class="cm"># Count how many times each letter appears</span>
message = <span class="str">"hello world from python"</span>
letter_count = {}

<span class="kw">for</span> char <span class="kw">in</span> message:
    <span class="kw">if</span> char == <span class="str">" "</span>:
        <span class="kw">continue</span>    <span class="cm"># skip spaces</span>
    <span class="cm"># .get(char, 0) returns 0 if char not yet in dict</span>
    letter_count[char] = letter_count.<span class="fn">get</span>(char, <span class="num">0</span>) + <span class="num">1</span>

<span class="cm"># Sort by frequency (most common first)</span>
sorted_counts = <span class="fn">sorted</span>(letter_count.<span class="fn">items</span>(), key=<span class="kw">lambda</span> x: x[<span class="num">1</span>], reverse=<span class="kw">True</span>)
<span class="fn">print</span>(<span class="str">"Top 5 letters:"</span>)
<span class="kw">for</span> letter, count <span class="kw">in</span> sorted_counts[:<span class="num">5</span>]:
    <span class="fn">print</span>(<span class="str">f"  '{letter}': {'█' * count} ({count})"</span>)` },
      ],
      fact: 'Dictionaries (called "hash maps" in most other languages) are one of the most important data structures in computer science. Python\'s dict is so optimised that looking up any key takes the same tiny amount of time regardless of whether the dictionary has 10 entries or 10 million.',
      history: 'python_name',
      quiz: { q: 'What is the key difference between a Python list and a Python dictionary?', opts: ['Lists are faster','Lists use numeric indexes; dictionaries use named keys to look up values','Dictionaries are ordered; lists are not','Lists can hold more items'], ans: 1 },
      challenge: { t: 'CAPSTONE — Complete School Management System', d: `Build a complete system with these requirements:
1. A dictionary of students where each key is a student ID (like "S001") and each value is a dict with: name, age, and a scores list.
2. A function add_student(db, student_id, name, age) that adds a new student with an empty scores list.
3. A function add_score(db, student_id, score) that appends a score to the right student.
4. A function student_report(db, student_id) that prints: name, age, all scores, average, letter grade, and pass/fail.
5. A function top_students(db, n) that returns the names of the top n students by average score.
6. Demonstrate all functions with at least 5 students and varied scores.` },
    },
  ],
};
