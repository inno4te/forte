T21.lessons = T21.lessons || {};

/* ═══════════════════════════════════════════════════
   PYTHON PROJECTS (python2) — ages 12-14
   ═══════════════════════════════════════════════════ */

T21.lessons.python2 = {
  title: 'Python Projects', banner: 'python',
  subtitle: 'Build real applications — games, file processors, APIs, and data tools with professional Python.',
  steps: [

    /* ══════════════════════════════════════════════════════════
       STEP 1 — Python Modules, File I/O, Exception Handling
       ══════════════════════════════════════════════════════════ */
    {
      h: '📁 Step 1 — Modules, Files & Error Handling: Writing Robust Code',
      p: `In Python for Kids you learned the core language. Now we build real programs — and real programs need to <strong>read and write files</strong>, <strong>handle errors gracefully</strong>, and use Python's vast ecosystem of <strong>modules</strong> (pre-built libraries for almost anything you can imagine).
<br><br>
<strong>Python modules — don't reinvent the wheel:</strong><br>
Python ships with over 200 built-in modules (the "standard library"), and there are over 400,000 additional packages on PyPI (Python Package Index). You import them with <code>import</code> and instantly get powerful functionality.
<br><br>
<strong>The key modules you'll use constantly:</strong><br>
• <code>os</code> — file system operations: list files, create/delete directories<br>
• <code>sys</code> — system info: command line arguments, Python version<br>
• <code>random</code> — random numbers, choices, shuffling<br>
• <code>datetime</code> — dates, times, timestamps<br>
• <code>json</code> — read/write JSON data (the universal data format)<br>
• <code>math</code> — mathematical functions (sqrt, sin, cos, pi, floor, ceil)`,
      code: `<span class="kw">import</span> os
<span class="kw">import</span> json
<span class="kw">import</span> datetime
<span class="kw">from</span> pathlib <span class="kw">import</span> Path   <span class="cm"># modern, cleaner file path handling</span>

<span class="cm"># Writing a file — use 'with' to automatically close it</span>
data = {
    <span class="str">"name"</span>:    <span class="str">"Amara"</span>,
    <span class="str">"scores"</span>:  [<span class="num">88</span>, <span class="num">92</span>, <span class="num">79</span>],
    <span class="str">"date"</span>:    datetime.date.<span class="fn">today</span>().<span class="fn">isoformat</span>(),
}

<span class="kw">with</span> <span class="fn">open</span>(<span class="str">"student.json"</span>, <span class="str">"w"</span>) <span class="kw">as</span> f:
    json.<span class="fn">dump</span>(data, f, indent=<span class="num">2</span>)   <span class="cm"># indent=2 makes it pretty-printed</span>
<span class="fn">print</span>(<span class="str">"Saved student.json"</span>)

<span class="cm"># Reading a file safely with try/except</span>
<span class="kw">try</span>:
    <span class="kw">with</span> <span class="fn">open</span>(<span class="str">"student.json"</span>) <span class="kw">as</span> f:
        loaded = json.<span class="fn">load</span>(f)
    <span class="fn">print</span>(<span class="str">f"Loaded: {loaded['name']}, avg score: {<span class="fn">sum</span>(loaded['scores'])/<span class="fn">len</span>(loaded['scores']):.1f}"</span>)
<span class="kw">except</span> FileNotFoundError:
    <span class="fn">print</span>(<span class="str">"❌ File not found — did you save it first?"</span>)
<span class="kw">except</span> json.JSONDecodeError <span class="kw">as</span> e:
    <span class="fn">print</span>(<span class="str">f"❌ Bad JSON format: {e}"</span>)`,
      examples: [
        { label: 'Reading and processing a CSV file', code: `<span class="kw">import</span> csv

<span class="cm"># CSV = Comma-Separated Values — how spreadsheet data is stored</span>
<span class="cm"># grades.csv content:
# Name,Maths,Science,English
# Amara,88,92,79
# Kofi,74,68,85</span>

<span class="kw">def</span> <span class="fn">read_grades</span>(filename):
    students = []
    <span class="kw">try</span>:
        <span class="kw">with</span> <span class="fn">open</span>(filename, newline=<span class="str">''</span>) <span class="kw">as</span> f:
            reader = csv.<span class="fn">DictReader</span>(f)   <span class="cm"># reads header row as keys</span>
            <span class="kw">for</span> row <span class="kw">in</span> reader:
                students.<span class="fn">append</span>({
                    <span class="str">"name"</span>:    row[<span class="str">"Name"</span>],
                    <span class="str">"maths"</span>:   <span class="fn">int</span>(row[<span class="str">"Maths"</span>]),
                    <span class="str">"science"</span>: <span class="fn">int</span>(row[<span class="str">"Science"</span>]),
                    <span class="str">"english"</span>: <span class="fn">int</span>(row[<span class="str">"English"</span>]),
                })
    <span class="kw">except</span> FileNotFoundError:
        <span class="fn">print</span>(<span class="str">f"Cannot find {filename}"</span>)
        <span class="kw">return</span> []
    <span class="kw">return</span> students

<span class="kw">def</span> <span class="fn">print_report</span>(students):
    <span class="fn">print</span>(<span class="str">f"{'Name':<span class="num">10</span>} {'Maths':>6} {'Science':>8} {'English':>8} {'Average':>8}"</span>)
    <span class="fn">print</span>(<span class="str">"-"</span> * <span class="num">44</span>)
    <span class="kw">for</span> s <span class="kw">in</span> students:
        avg = (s[<span class="str">"maths"</span>] + s[<span class="str">"science"</span>] + s[<span class="str">"english"</span>]) / <span class="num">3</span>
        <span class="fn">print</span>(<span class="str">f"{s['name']:<span class="num">10</span>} {s['maths']:>6} {s['science']:>8} {s['english']:>8} {avg:>8.1f}"</span>)

students = <span class="fn">read_grades</span>(<span class="str">"grades.csv"</span>)
<span class="fn">print_report</span>(students)` },
        { label: 'Exception handling — all the key patterns', code: `<span class="cm"># Multiple except clauses handle different error types</span>
<span class="kw">def</span> <span class="fn">safe_divide</span>(a, b):
    <span class="kw">try</span>:
        result = a / b
        <span class="kw">return</span> result
    <span class="kw">except</span> ZeroDivisionError:
        <span class="fn">print</span>(<span class="str">"❌ Cannot divide by zero!"</span>)
        <span class="kw">return</span> <span class="kw">None</span>
    <span class="kw">except</span> TypeError <span class="kw">as</span> e:
        <span class="fn">print</span>(<span class="str">f"❌ Wrong type: {e}"</span>)
        <span class="kw">return</span> <span class="kw">None</span>

<span class="cm"># Raising custom exceptions</span>
<span class="kw">def</span> <span class="fn">validate_age</span>(age):
    <span class="kw">if not</span> <span class="fn">isinstance</span>(age, <span class="fn">int</span>):
        <span class="kw">raise</span> TypeError(<span class="str">f"Age must be int, got {type(age).__name__}"</span>)
    <span class="kw">if</span> age < <span class="num">0</span> <span class="kw">or</span> age > <span class="num">150</span>:
        <span class="kw">raise</span> ValueError(<span class="str">f"Age {age} is not realistic (0-150)"</span>)
    <span class="kw">return</span> <span class="kw">True</span>

<span class="cm"># try/except/else/finally — the complete pattern</span>
<span class="kw">try</span>:
    <span class="fn">validate_age</span>(<span class="num">25</span>)
    <span class="fn">print</span>(<span class="str">"Processing..."</span>)
<span class="kw">except</span> (TypeError, ValueError) <span class="kw">as</span> e:
    <span class="fn">print</span>(<span class="str">f"Validation failed: {e}"</span>)
<span class="kw">else</span>:
    <span class="fn">print</span>(<span class="str">"✅ Age is valid"</span>)       <span class="cm"># runs only if NO exception</span>
<span class="kw">finally</span>:
    <span class="fn">print</span>(<span class="str">"Validation attempt complete"</span>)  <span class="cm"># ALWAYS runs</span>` },
      ],
      fact: 'Python\'s "with" statement implements the "context manager" protocol — one of Python\'s most elegant designs. When you write `with open("file.txt") as f:`, Python guarantees the file will be closed when the block ends, even if an exception occurs inside. Before this existed, forgotten file.close() calls were one of the most common bugs in Python programs.',
      history: null,
      quiz: { q: 'Why should you use "with open(filename) as f:" instead of "f = open(filename)"?', opts: ['with open is faster','The "with" statement guarantees the file is automatically closed when the block ends, even if an error occurs — preventing resource leaks','with open works with more file types','open() without "with" creates a read-only file'], ans: 1 },
      challenge: { t: 'Grade Book Application', d: 'Build a grade book that: reads student data from a JSON file (create it if it doesn\'t exist), lets users add students and scores via input(), calculates averages and letter grades, saves everything back to JSON after each change, handles all potential errors (bad input, file not found, invalid scores) with helpful messages, and prints a formatted report sorted by average score. Use try/except/finally throughout.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 2 — Object-Oriented Python
       ══════════════════════════════════════════════════════════ */
    {
      h: '🏗️ Step 2 — Object-Oriented Python: Classes, Inheritance & Magic Methods',
      p: `You've used Python's built-in objects (lists have <code>.append()</code>, strings have <code>.upper()</code>). Now you'll create your own object types with custom data and behaviour. This is <strong>Object-Oriented Programming (OOP)</strong> — the paradigm used in almost every large Python codebase.
<br><br>
<strong>Why OOP?</strong><br>
A function processes data. An object <em>is</em> data with built-in functions. When your game has 50 enemies, each with their own health, position, and behaviour, making each an object means all that complexity is organised and contained — not scattered across dozens of variables.
<br><br>
<strong>Python's "magic methods" (dunder methods)</strong>:<br>
Methods named <code>__like_this__</code> (double underscores, called "dunders") are called automatically by Python in specific situations:<br>
• <code>__init__</code> — called when you create the object (<code>Enemy()</code>)<br>
• <code>__str__</code> — called when you print the object (<code>print(enemy)</code>)<br>
• <code>__len__</code> — called by <code>len(object)</code><br>
• <code>__add__</code> — called by the <code>+</code> operator<br>
• <code>__eq__</code> — called by the <code>==</code> operator`,
      code: `<span class="kw">class</span> BankAccount:
    <span class="str">"""A bank account with full transaction history."""</span>

    <span class="cm"># Class variable — shared across ALL instances</span>
    interest_rate = <span class="num">0.035</span>  <span class="cm"># 3.5% annual</span>

    <span class="kw">def</span> <span class="fn">__init__</span>(self, owner: <span class="fn">str</span>, initial_balance: <span class="fn">float</span> = <span class="num">0</span>):
        self.owner    = owner
        self._balance = <span class="fn">max</span>(<span class="num">0</span>, initial_balance)   <span class="cm"># _ = "private by convention"</span>
        self._history = []

    <span class="kw">def</span> <span class="fn">deposit</span>(self, amount: <span class="fn">float</span>) -> <span class="fn">bool</span>:
        <span class="kw">if</span> amount <= <span class="num">0</span>:
            <span class="kw">raise</span> ValueError(<span class="str">f"Deposit must be positive, got {amount}"</span>)
        self._balance += amount
        self._history.<span class="fn">append</span>((<span class="str">"deposit"</span>, amount, self._balance))
        <span class="kw">return</span> <span class="kw">True</span>

    <span class="kw">def</span> <span class="fn">withdraw</span>(self, amount: <span class="fn">float</span>) -> <span class="fn">bool</span>:
        <span class="kw">if</span> amount > self._balance:
            <span class="kw">raise</span> ValueError(<span class="str">f"Insufficient funds: have £{self._balance:.2f}"</span>)
        self._balance -= amount
        self._history.<span class="fn">append</span>((<span class="str">"withdraw"</span>, amount, self._balance))
        <span class="kw">return</span> <span class="kw">True</span>

    @property
    <span class="kw">def</span> <span class="fn">balance</span>(self):      <span class="cm"># @property makes it accessible as account.balance</span>
        <span class="kw">return</span> self._balance

    <span class="kw">def</span> <span class="fn">__str__</span>(self):      <span class="cm"># Called by print(account)</span>
        <span class="kw">return</span> <span class="str">f"Account[{self.owner}]: £{self._balance:.2f}"</span>

    <span class="kw">def</span> <span class="fn">__repr__</span>(self):     <span class="cm"># Developer representation</span>
        <span class="kw">return</span> <span class="str">f"BankAccount('{self.owner}', {self._balance})"</span>`,
      examples: [
        { label: 'Inheritance and polymorphism in Python', code: `<span class="kw">class</span> Animal:
    <span class="str">"""Base class for all animals."""</span>
    <span class="kw">def</span> <span class="fn">__init__</span>(self, name: <span class="fn">str</span>, age: <span class="fn">int</span>):
        self.name = name
        self.age  = age

    <span class="kw">def</span> <span class="fn">speak</span>(self) -> <span class="fn">str</span>:
        <span class="kw">raise</span> NotImplementedError(<span class="str">"Subclasses must implement speak()"</span>)

    <span class="kw">def</span> <span class="fn">__str__</span>(self):
        <span class="kw">return</span> <span class="str">f"{type(self).__name__}('{self.name}', age={self.age})"</span>

<span class="kw">class</span> Dog(Animal):         <span class="cm"># Dog INHERITS from Animal</span>
    <span class="kw">def</span> <span class="fn">__init__</span>(self, name, age, breed):
        <span class="kw">super</span>()<span class="fn">.__init__</span>(name, age)  <span class="cm"># call parent __init__</span>
        self.breed = breed

    <span class="kw">def</span> <span class="fn">speak</span>(self) -> <span class="fn">str</span>:
        <span class="kw">return</span> <span class="str">f"Woof! I'm {self.name}, a {self.breed}!"</span>

<span class="kw">class</span> Cat(Animal):
    <span class="kw">def</span> <span class="fn">speak</span>(self) -> <span class="fn">str</span>:
        <span class="kw">return</span> <span class="str">f"Meow! {self.name} does NOT come when called."</span>

<span class="cm"># Polymorphism: same method call, different behaviour</span>
animals = [
    Dog(<span class="str">"Rex"</span>, <span class="num">3</span>, <span class="str">"Labrador"</span>),
    Cat(<span class="str">"Whiskers"</span>, <span class="num">7</span>),
    Dog(<span class="str">"Spot"</span>, <span class="num">1</span>, <span class="str">"Dalmation"</span>),
]
<span class="kw">for</span> animal <span class="kw">in</span> animals:
    <span class="fn">print</span>(animal.<span class="fn">speak</span>())    <span class="cm"># calls the RIGHT speak() for each type</span>` },
        { label: 'Magic methods — making custom objects feel native', code: `<span class="kw">class</span> Vector:
    <span class="str">"""2D mathematical vector with full operator support."""</span>
    <span class="kw">def</span> <span class="fn">__init__</span>(self, x: <span class="fn">float</span>, y: <span class="fn">float</span>):
        self.x, self.y = x, y

    <span class="kw">def</span> <span class="fn">__add__</span>(self, other):   <span class="cm"># v1 + v2</span>
        <span class="kw">return</span> Vector(self.x + other.x, self.y + other.y)

    <span class="kw">def</span> <span class="fn">__mul__</span>(self, scalar):  <span class="cm"># v * 3</span>
        <span class="kw">return</span> Vector(self.x * scalar, self.y * scalar)

    <span class="kw">def</span> <span class="fn">__eq__</span>(self, other):    <span class="cm"># v1 == v2</span>
        <span class="kw">return</span> self.x == other.x <span class="kw">and</span> self.y == other.y

    <span class="kw">def</span> <span class="fn">__abs__</span>(self):          <span class="cm"># abs(v) = magnitude</span>
        <span class="kw">return</span> (self.x**<span class="num">2</span> + self.y**<span class="num">2</span>)**<span class="num">0.5</span>

    <span class="kw">def</span> <span class="fn">__str__</span>(self):
        <span class="kw">return</span> <span class="str">f"Vector({self.x}, {self.y})"</span>

v1 = Vector(<span class="num">3</span>, <span class="num">4</span>)
v2 = Vector(<span class="num">1</span>, <span class="num">2</span>)
<span class="fn">print</span>(v1 + v2)      <span class="cm"># Vector(4, 6)  — uses __add__</span>
<span class="fn">print</span>(v1 * <span class="num">2</span>)       <span class="cm"># Vector(6, 8)  — uses __mul__</span>
<span class="fn">print</span>(<span class="fn">abs</span>(v1))       <span class="cm"># 5.0           — uses __abs__ (3-4-5 triangle!)</span>
<span class="fn">print</span>(v1 == v2)      <span class="cm"># False         — uses __eq__</span>` },
      ],
      fact: 'Python\'s magic method system is what makes the language feel so elegant. When you write `len([1,2,3])`, Python calls `list.__len__()`. When you write `"hello"[0]`, Python calls `str.__getitem__(0)`. When you write `3 + 4`, Python calls `int.__add__(4)`. Understanding this lets you make your custom classes work exactly like Python\'s built-in types.',
      history: null,
      quiz: { q: 'What is the __str__ magic method used for in Python?', opts: ['Converting the object to an integer','It defines what is displayed when you print() the object or convert it to a string with str()','It compares two objects for equality','It defines how to iterate over the object'], ans: 1 },
      challenge: { t: 'Complete Library System', d: 'Build a library system with: Book class (isbn, title, author, year, available), Member class (member_id, name, email, borrowed_books list), Library class (books dict, members dict). Implement: add_book(), register_member(), borrow_book(member_id, isbn) with validation, return_book(member_id, isbn), search_books(query) searching title and author, get_member_report(member_id). Add __str__ and __repr__ to all classes. Save/load all data to JSON files.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 3 — Working with APIs and Web Data
       ══════════════════════════════════════════════════════════ */
    {
      h: '🌐 Step 3 — APIs & Web Data: Connecting Python to the Internet',
      p: `Python programs don't have to work alone. With the <code>requests</code> library, your Python code can fetch live data from any web API — weather, sports scores, currency exchange rates, movie databases, news headlines, space station position, cat facts, anything.
<br><br>
<strong>What is an API?</strong><br>
An API (Application Programming Interface) is a service that responds to your code's requests with data, usually in JSON format. You send a GET request to a URL, and the API responds with live, structured data. It's like asking a question and getting a precise answer back.
<br><br>
<strong>HTTP status codes — what they mean:</strong><br>
• <code>200 OK</code> — success, here's your data<br>
• <code>400 Bad Request</code> — you sent something wrong<br>
• <code>401 Unauthorized</code> — you need an API key<br>
• <code>404 Not Found</code> — that endpoint/resource doesn't exist<br>
• <code>429 Too Many Requests</code> — you're calling too fast, slow down<br>
• <code>500 Internal Server Error</code> — the API has a problem (not your fault)`,
      code: `<span class="kw">import</span> requests   <span class="cm"># pip install requests</span>
<span class="kw">import</span> json

<span class="kw">def</span> <span class="fn">get_weather</span>(city: <span class="fn">str</span>) -> <span class="fn">dict</span> | <span class="kw">None</span>:
    <span class="str">"""Fetch weather for a city using wttr.in's free JSON API."""</span>
    url = <span class="str">f"https://wttr.in/{city}?format=j1"</span>

    <span class="kw">try</span>:
        response = requests.<span class="fn">get</span>(url, timeout=<span class="num">10</span>)   <span class="cm"># 10 second timeout!</span>
        response.<span class="fn">raise_for_status</span>()               <span class="cm"># raises error for 4xx/5xx</span>
        <span class="kw">return</span> response.<span class="fn">json</span>()                     <span class="cm"># parse JSON response</span>

    <span class="kw">except</span> requests.exceptions.Timeout:
        <span class="fn">print</span>(<span class="str">"❌ Request timed out — check your internet"</span>)
    <span class="kw">except</span> requests.exceptions.HTTPError <span class="kw">as</span> e:
        <span class="fn">print</span>(<span class="str">f"❌ HTTP error: {e}"</span>)
    <span class="kw">except</span> requests.exceptions.ConnectionError:
        <span class="fn">print</span>(<span class="str">"❌ No internet connection"</span>)
    <span class="kw">return</span> <span class="kw">None</span>

<span class="kw">def</span> <span class="fn">display_weather</span>(city: <span class="fn">str</span>):
    data = <span class="fn">get_weather</span>(city)
    <span class="kw">if not</span> data: <span class="kw">return</span>

    current = data[<span class="str">"current_condition"</span>][<span class="num">0</span>]
    temp_c  = current[<span class="str">"temp_C"</span>]
    feels   = current[<span class="str">"FeelsLikeC"</span>]
    desc    = current[<span class="str">"weatherDesc"</span>][<span class="num">0</span>][<span class="str">"value"</span>]
    humidity= current[<span class="str">"humidity"</span>]

    <span class="fn">print</span>(<span class="str">f"\\n🌍 Weather in {city}:"</span>)
    <span class="fn">print</span>(<span class="str">f"  🌡️  Temperature: {temp_c}°C (feels like {feels}°C)"</span>)
    <span class="fn">print</span>(<span class="str">f"  ☁️  Conditions:  {desc}"</span>)
    <span class="fn">print</span>(<span class="str">f"  💧 Humidity:    {humidity}%"</span>)

<span class="fn">display_weather</span>(<span class="str">"Accra"</span>)`,
      examples: [
        { label: 'Currency converter with live exchange rates', code: `<span class="kw">import</span> requests
<span class="kw">from</span> datetime <span class="kw">import</span> datetime

<span class="kw">def</span> <span class="fn">get_exchange_rates</span>(base: <span class="fn">str</span> = <span class="str">"USD"</span>) -> <span class="fn">dict</span>:
    <span class="str">"""Get live exchange rates from exchangerate.host (free, no API key)."""</span>
    url = <span class="str">f"https://api.exchangerate.host/live?source={base}"</span>
    response = requests.<span class="fn">get</span>(url, timeout=<span class="num">10</span>)
    response.<span class="fn">raise_for_status</span>()
    data = response.<span class="fn">json</span>()
    <span class="kw">return</span> data[<span class="str">"quotes"</span>]   <span class="cm"># e.g. {"USDGBP": 0.79, "USDEUR": 0.92}</span>

<span class="kw">def</span> <span class="fn">convert</span>(amount: <span class="fn">float</span>, from_curr: <span class="fn">str</span>, to_curr: <span class="fn">str</span>) -> <span class="fn">float</span>:
    rates = <span class="fn">get_exchange_rates</span>(from_curr)
    key   = from_curr + to_curr
    <span class="kw">if</span> key <span class="kw">not in</span> rates:
        <span class="kw">raise</span> ValueError(<span class="str">f"Unknown currency pair: {key}"</span>)
    <span class="kw">return</span> amount * rates[key]

<span class="cm"># Interactive currency converter</span>
<span class="kw">while True</span>:
    <span class="kw">try</span>:
        amount = <span class="fn">float</span>(<span class="fn">input</span>(<span class="str">"Amount (or 0 to quit): "</span>))
        <span class="kw">if</span> amount == <span class="num">0</span>: <span class="kw">break</span>
        from_c = <span class="fn">input</span>(<span class="str">"From currency (e.g. USD): "</span>).<span class="fn">upper</span>()
        to_c   = <span class="fn">input</span>(<span class="str">"To currency (e.g. GBP): "</span>).<span class="fn">upper</span>()
        result = <span class="fn">convert</span>(amount, from_c, to_c)
        <span class="fn">print</span>(<span class="str">f"  {amount:.2f} {from_c} = {result:.2f} {to_c}\\n"</span>)
    <span class="kw">except</span> ValueError <span class="kw">as</span> e:
        <span class="fn">print</span>(<span class="str">f"  Error: {e}\\n"</span>)` },
        { label: 'Caching API responses — be a good API citizen', code: `<span class="kw">import</span> json, time, os
<span class="kw">import</span> requests

<span class="kw">def</span> <span class="fn">fetch_with_cache</span>(url: <span class="fn">str</span>, cache_file: <span class="fn">str</span>, max_age_seconds: <span class="fn">int</span> = <span class="num">3600</span>):
    <span class="str">"""Fetch URL, use cached version if it's less than max_age_seconds old.
    This is CRITICAL for good API behaviour — don't hammer APIs with
    repeated requests for data that hasn't changed."""</span>

    <span class="cm"># Check if cache exists and is fresh</span>
    <span class="kw">if</span> os.path.<span class="fn">exists</span>(cache_file):
        age = time.<span class="fn">time</span>() - os.path.<span class="fn">getmtime</span>(cache_file)
        <span class="kw">if</span> age < max_age_seconds:
            <span class="fn">print</span>(<span class="str">f"📦 Using cache ({age:.0f}s old)"</span>)
            <span class="kw">with</span> <span class="fn">open</span>(cache_file) <span class="kw">as</span> f:
                <span class="kw">return</span> json.<span class="fn">load</span>(f)

    <span class="cm"># Cache miss — fetch fresh data</span>
    <span class="fn">print</span>(<span class="str">"🌐 Fetching fresh data..."</span>)
    response = requests.<span class="fn">get</span>(url, timeout=<span class="num">10</span>)
    response.<span class="fn">raise_for_status</span>()
    data = response.<span class="fn">json</span>()

    <span class="cm"># Save to cache</span>
    <span class="kw">with</span> <span class="fn">open</span>(cache_file, <span class="str">"w"</span>) <span class="kw">as</span> f:
        json.<span class="fn">dump</span>(data, f)

    <span class="kw">return</span> data` },
      ],
      fact: 'The International Space Station orbits Earth at 28,000 km/h, completing a full orbit every 90 minutes. There is a free public API at api.open-notify.org that tells you the exact latitude and longitude of the ISS updated every 5 seconds. With 15 lines of Python using requests, you can track the ISS live and calculate when it will next fly over your city.',
      history: null,
      quiz: { q: 'What does response.raise_for_status() do when you receive an HTTP 404 response?', opts: ['Returns None','Raises an HTTPError exception so you can handle the error in a try/except block instead of silently getting empty data','Retries the request automatically','Converts the 404 to a 200 status code'], ans: 1 },
      challenge: { t: 'Multi-API Dashboard', d: 'Build a Python dashboard that fetches from at least 3 different free APIs simultaneously. Suggestions: ISS position (api.open-notify.org), a random joke (official-joke-api.appspot.com/random_joke), today\'s space fact (api.nasa.gov - free key), current Bitcoin price (api.coindesk.com/v1/bpi/currentprice.json). Display all data in a nicely formatted terminal dashboard. Add caching so each API is only called if the data is older than its appropriate refresh interval (joke: daily, ISS: 5 seconds, Bitcoin: 60 seconds).' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 4 — Building Games with pygame
       ══════════════════════════════════════════════════════════ */
    {
      h: '🎮 Step 4 — Building Real Games with pygame',
      p: `<code>pygame</code> is a Python library for building 2D games with proper game loops, real graphics, sound, keyboard/mouse input, and collision detection. Unlike Scratch (visual) or turtle (basic), pygame games look and feel like real games you'd find on a computer.
<br><br>
<strong>The game loop — the heartbeat of every game:</strong><br>
Every game ever made runs the same fundamental loop, thousands of times per second:<br>
1. <strong>Process events</strong> — check for keyboard/mouse input, window close button<br>
2. <strong>Update</strong> — move everything, check collisions, update scores<br>
3. <strong>Draw</strong> — clear screen, draw everything at new positions<br>
4. <strong>Wait</strong> — pause to achieve target frame rate (usually 60fps)
<br><br>
<strong>pygame coordinate system:</strong><br>
(0,0) is the TOP-LEFT corner. X increases rightward. Y increases DOWNWARD (opposite of maths!).`,
      code: `<span class="kw">import</span> pygame
<span class="kw">import</span> sys

<span class="cm"># Initialise pygame — always required first</span>
pygame.<span class="fn">init</span>()

<span class="cm"># Create window</span>
WIDTH, HEIGHT = <span class="num">800</span>, <span class="num">600</span>
screen = pygame.display.<span class="fn">set_mode</span>((WIDTH, HEIGHT))
pygame.display.<span class="fn">set_caption</span>(<span class="str">"My First pygame Game"</span>)

<span class="cm"># Colours (RGB tuples)</span>
BLACK  = (<span class="num">0</span>,   <span class="num">0</span>,   <span class="num">0</span>)
WHITE  = (<span class="num">255</span>, <span class="num">255</span>, <span class="num">255</span>)
BLUE   = (<span class="num">79</span>,  <span class="num">142</span>, <span class="num">247</span>)
RED    = (<span class="num">239</span>, <span class="num">68</span>,  <span class="num">68</span>)
GREEN  = (<span class="num">52</span>,  <span class="num">211</span>, <span class="num">153</span>)

clock  = pygame.time.<span class="fn">Clock</span>()   <span class="cm"># controls FPS</span>
font   = pygame.font.<span class="fn">SysFont</span>(<span class="str">"arial"</span>, <span class="num">28</span>)

<span class="cm"># THE GAME LOOP</span>
running = <span class="kw">True</span>
<span class="kw">while</span> running:

    <span class="cm"># 1. PROCESS EVENTS</span>
    <span class="kw">for</span> event <span class="kw">in</span> pygame.event.<span class="fn">get</span>():
        <span class="kw">if</span> event.type == pygame.QUIT:        <span class="cm"># X button clicked</span>
            running = <span class="kw">False</span>
        <span class="kw">if</span> event.type == pygame.KEYDOWN:
            <span class="kw">if</span> event.key == pygame.K_ESCAPE:  <span class="cm"># ESC key</span>
                running = <span class="kw">False</span>

    <span class="cm"># 2. UPDATE (game logic goes here)</span>

    <span class="cm"># 3. DRAW</span>
    screen.<span class="fn">fill</span>(BLACK)                          <span class="cm"># clear screen</span>
    pygame.draw.<span class="fn">circle</span>(screen, BLUE, (<span class="num">400</span>,<span class="num">300</span>), <span class="num">50</span>)  <span class="cm"># draw circle</span>
    text = font.<span class="fn">render</span>(<span class="str">"Hello pygame!"</span>, <span class="kw">True</span>, WHITE)
    screen.<span class="fn">blit</span>(text, (<span class="num">300</span>, <span class="num">50</span>))            <span class="cm"># draw text at position</span>
    pygame.display.<span class="fn">flip</span>()                  <span class="cm"># show what we drew</span>

    <span class="cm"># 4. WAIT — cap at 60 FPS</span>
    clock.<span class="fn">tick</span>(<span class="num">60</span>)

pygame.<span class="fn">quit</span>()
sys.<span class="fn">exit</span>()`,
      examples: [
        { label: 'Player movement with smooth physics', code: `<span class="kw">class</span> Player:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, x, y):
        self.x    = x
        self.y    = y
        self.vx   = <span class="num">0</span>    <span class="cm"># velocity x</span>
        self.vy   = <span class="num">0</span>    <span class="cm"># velocity y</span>
        self.speed = <span class="num">5</span>
        self.rect  = pygame.Rect(x, y, <span class="num">40</span>, <span class="num">40</span>)  <span class="cm"># x, y, width, height</span>

    <span class="kw">def</span> <span class="fn">handle_input</span>(self):
        keys = pygame.key.<span class="fn">get_pressed</span>()      <span class="cm"># get ALL pressed keys at once</span>
        self.vx = <span class="num">0</span>
        self.vy = <span class="num">0</span>
        <span class="kw">if</span> keys[pygame.K_LEFT]  <span class="kw">or</span> keys[pygame.K_a]: self.vx = -self.speed
        <span class="kw">if</span> keys[pygame.K_RIGHT] <span class="kw">or</span> keys[pygame.K_d]: self.vx =  self.speed
        <span class="kw">if</span> keys[pygame.K_UP]    <span class="kw">or</span> keys[pygame.K_w]: self.vy = -self.speed
        <span class="kw">if</span> keys[pygame.K_DOWN]  <span class="kw">or</span> keys[pygame.K_s]: self.vy =  self.speed

    <span class="kw">def</span> <span class="fn">update</span>(self, width, height):
        self.x = <span class="fn">max</span>(<span class="num">0</span>, <span class="fn">min</span>(width  - <span class="num">40</span>, self.x + self.vx))
        self.y = <span class="fn">max</span>(<span class="num">0</span>, <span class="fn">min</span>(height - <span class="num">40</span>, self.y + self.vy))
        self.rect.<span class="fn">update</span>(self.x, self.y, <span class="num">40</span>, <span class="num">40</span>)

    <span class="kw">def</span> <span class="fn">draw</span>(self, surface):
        pygame.draw.<span class="fn">rect</span>(surface, BLUE, self.rect, border_radius=<span class="num">8</span>)
        <span class="cm"># Draw eyes for character personality!</span>
        pygame.draw.<span class="fn">circle</span>(surface, WHITE, (self.x+<span class="num">12</span>, self.y+<span class="num">15</span>), <span class="num">5</span>)
        pygame.draw.<span class="fn">circle</span>(surface, WHITE, (self.x+<span class="num">28</span>, self.y+<span class="num">15</span>), <span class="num">5</span>)` },
        { label: 'Collision detection and sprite groups', code: `<span class="kw">import</span> random

<span class="kw">class</span> Coin(pygame.sprite.Sprite):
    <span class="str">"""Collectible coin using pygame's sprite system."""</span>
    <span class="kw">def</span> <span class="fn">__init__</span>(self, width, height):
        <span class="kw">super</span>()<span class="fn">.__init__</span>()
        self.image = pygame.Surface((<span class="num">20</span>, <span class="num">20</span>), pygame.SRCALPHA)
        pygame.draw.<span class="fn">circle</span>(self.image, (<span class="num">255</span>, <span class="num">215</span>, <span class="num">0</span>), (<span class="num">10</span>, <span class="num">10</span>), <span class="num">10</span>)
        self.rect = self.image.<span class="fn">get_rect</span>()
        self.rect.x = random.<span class="fn">randint</span>(<span class="num">20</span>, width-<span class="num">40</span>)
        self.rect.y = random.<span class="fn">randint</span>(<span class="num">20</span>, height-<span class="num">40</span>)

<span class="cm"># Create a group of 15 coins</span>
all_coins  = pygame.sprite.Group()
all_sprites = pygame.sprite.Group()
<span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="num">15</span>):
    coin = Coin(WIDTH, HEIGHT)
    all_coins.<span class="fn">add</span>(coin)
    all_sprites.<span class="fn">add</span>(coin)

<span class="cm"># In the game loop — check player collision with coins:</span>
<span class="cm"># pygame.sprite.spritecollide returns list of sprites player hit</span>
hit_coins = pygame.sprite.<span class="fn">spritecollide</span>(player_sprite, all_coins, <span class="kw">True</span>)
<span class="cm">#                                                              ^^^^ True = remove on hit</span>
score += <span class="fn">len</span>(hit_coins) * <span class="num">10</span>` },
      ],
      fact: 'Python\'s pygame library powers thousands of indie games and has been used to teach game development at MIT, Carnegie Mellon, and hundreds of other universities. Notable games built with pygame include Frets on Fire (Guitar Hero clone), and it\'s the starting point for many professional game developers\' careers. The pygame community has been active for over 20 years.',
      history: null,
      quiz: { q: 'In pygame\'s coordinate system, what happens to the Y value as you move DOWN the screen?', opts: ['Y decreases (like maths)','Y stays at 0','Y increases — (0,0) is the TOP-LEFT corner and Y grows downward','Y is not used in pygame'], ans: 2 },
      challenge: { t: 'Complete pygame Shooter', d: 'Build a top-down space shooter: Player (blue rectangle) moves with WASD/arrows. Bullets fire upward when spacebar pressed (max 5 on screen). Enemies (red rectangles) spawn from top at random x positions and move downward. Enemy hit by bullet: destroy both, +100 points. Enemy reaches bottom: lose 1 life. Use pygame.sprite.Group and sprite collision detection for all hit tests. Add: score display, lives display, increasing enemy spawn rate each 30 seconds, game over screen with restart.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 5 — Data Analysis with pandas
       ══════════════════════════════════════════════════════════ */
    {
      h: '📊 Step 5 — Data Analysis with pandas: Python\'s Data Superpower',
      p: `<code>pandas</code> is arguably Python's most important library after the standard library. It's used by data scientists at Google, Facebook, NASA, NHS, and every financial institution in the world. It makes processing, analysing, and transforming data almost effortless.
<br><br>
<strong>The DataFrame — pandas' core data structure:</strong><br>
A DataFrame is like a spreadsheet in memory — rows and columns of data with labels. You can load a CSV with one line, filter by column values with simple expressions, compute statistics with one method call, and merge two datasets like a database JOIN.
<br><br>
<strong>Core pandas operations:</strong><br>
• <code>pd.read_csv()</code> — load a CSV file into a DataFrame<br>
• <code>df.head()</code> — see the first 5 rows<br>
• <code>df["column"]</code> — select a column (returns a Series)<br>
• <code>df[df["score"] > 80]</code> — filter rows by condition<br>
• <code>df.groupby("class").mean()</code> — aggregate by group<br>
• <code>df.sort_values("score", ascending=False)</code> — sort`,
      code: `<span class="kw">import</span> pandas <span class="kw">as</span> pd   <span class="cm"># pip install pandas</span>
<span class="kw">import</span> numpy <span class="kw">as</span> np    <span class="cm"># pip install numpy (usually installed with pandas)</span>

<span class="cm"># Create a DataFrame from a dictionary</span>
data = {
    <span class="str">"name"</span>:    [<span class="str">"Amara"</span>, <span class="str">"Kofi"</span>, <span class="str">"Zara"</span>, <span class="str">"Liam"</span>, <span class="str">"Nia"</span>, <span class="str">"Tom"</span>],
    <span class="str">"class"</span>:   [<span class="str">"A"</span>, <span class="str">"B"</span>, <span class="str">"A"</span>, <span class="str">"B"</span>, <span class="str">"A"</span>, <span class="str">"B"</span>],
    <span class="str">"maths"</span>:   [<span class="num">88</span>, <span class="num">74</span>, <span class="num">92</span>, <span class="num">67</span>, <span class="num">95</span>, <span class="num">71</span>],
    <span class="str">"science"</span>: [<span class="num">79</span>, <span class="num">81</span>, <span class="num">88</span>, <span class="num">73</span>, <span class="num">91</span>, <span class="num">68</span>],
    <span class="str">"english"</span>: [<span class="num">85</span>, <span class="num">90</span>, <span class="num">76</span>, <span class="num">88</span>, <span class="num">82</span>, <span class="num">77</span>],
}
df = pd.DataFrame(data)

<span class="cm"># Compute new columns</span>
df[<span class="str">"average"</span>] = df[[<span class="str">"maths"</span>, <span class="str">"science"</span>, <span class="str">"english"</span>]].<span class="fn">mean</span>(axis=<span class="num">1</span>)
df[<span class="str">"grade"</span>]   = pd.cut(df[<span class="str">"average"</span>],
                       bins=[<span class="num">0</span>,<span class="num">60</span>,<span class="num">70</span>,<span class="num">80</span>,<span class="num">90</span>,<span class="num">100</span>],
                       labels=[<span class="str">"F"</span>,<span class="str">"D"</span>,<span class="str">"C"</span>,<span class="str">"B"</span>,<span class="str">"A"</span>])

<span class="fn">print</span>(df.<span class="fn">to_string</span>(index=<span class="kw">False</span>))
<span class="fn">print</span>(<span class="str">f"\\nClass average: {df['average'].<span class="fn">mean</span>():.2f}"</span>)
<span class="fn">print</span>(<span class="str">f"Top scorer: {df.<span class="fn">loc</span>[df['average'].<span class="fn">idxmax</span>(), 'name']}"</span>)`,
      examples: [
        { label: 'GroupBy and aggregation — powerful analysis in one line', code: `<span class="cm"># Compare Class A vs Class B across all subjects</span>
class_stats = df.<span class="fn">groupby</span>(<span class="str">"class"</span>)[[<span class="str">"maths"</span>,<span class="str">"science"</span>,<span class="str">"english"</span>,<span class="str">"average"</span>]].<span class="fn">agg</span>({
    <span class="str">"maths"</span>:   [<span class="str">"mean"</span>, <span class="str">"max"</span>, <span class="str">"min"</span>],
    <span class="str">"science"</span>: [<span class="str">"mean"</span>, <span class="str">"max"</span>],
    <span class="str">"average"</span>: [<span class="str">"mean"</span>, <span class="str">"std"</span>],   <span class="cm"># std = standard deviation</span>
})
<span class="fn">print</span>(class_stats)

<span class="cm"># Filter: students with above-average performance in both maths and science</span>
overall_avg = df[<span class="str">"average"</span>].<span class="fn">mean</span>()
high_achievers = df[(df[<span class="str">"maths"</span>] > <span class="num">80</span>) & (df[<span class="str">"science"</span>] > <span class="num">80</span>)]
<span class="fn">print</span>(<span class="str">f"\\nHigh achievers in both subjects:"</span>)
<span class="fn">print</span>(high_achievers[[<span class="str">"name"</span>, <span class="str">"maths"</span>, <span class="str">"science"</span>, <span class="str">"average"</span>]])

<span class="cm"># Correlation — do students who are good at maths tend to be good at science?</span>
corr = df[<span class="str">"maths"</span>].<span class="fn">corr</span>(df[<span class="str">"science"</span>])
<span class="fn">print</span>(<span class="str">f"\\nMaths-Science correlation: {corr:.3f}"</span>)
<span class="cm"># 1.0 = perfect positive correlation, 0 = no relationship, -1 = inverse</span>` },
        { label: 'Loading real data from CSV', code: `<span class="cm"># pandas makes working with real data files trivial</span>

<span class="cm"># Load a CSV file (could be millions of rows)</span>
df = pd.<span class="fn">read_csv</span>(<span class="str">"sales_data.csv"</span>)

<span class="cm"># Basic exploration</span>
<span class="fn">print</span>(df.<span class="fn">shape</span>)         <span class="cm"># (rows, columns)</span>
<span class="fn">print</span>(df.<span class="fn">dtypes</span>)        <span class="cm"># data type of each column</span>
<span class="fn">print</span>(df.<span class="fn">describe</span>())    <span class="cm"># count, mean, std, min, max for numeric columns</span>
<span class="fn">print</span>(df.<span class="fn">isnull</span>().<span class="fn">sum</span>()) <span class="cm"># count missing values in each column</span>

<span class="cm"># Clean the data</span>
df = df.<span class="fn">dropna</span>()                    <span class="cm"># remove rows with ANY missing value</span>
df[<span class="str">"price"</span>] = df[<span class="str">"price"</span>].<span class="fn">abs</span>()   <span class="cm"># make prices positive</span>
df[<span class="str">"date"</span>]  = pd.<span class="fn">to_datetime</span>(df[<span class="str">"date"</span>])  <span class="cm"># parse date strings</span>

<span class="cm"># Analysis</span>
monthly = df.<span class="fn">groupby</span>(df[<span class="str">"date"</span>].dt.month)[<span class="str">"revenue"</span>].<span class="fn">sum</span>()
<span class="fn">print</span>(monthly)   <span class="cm"># revenue by month</span>

<span class="cm"># Save results</span>
df.<span class="fn">to_csv</span>(<span class="str">"cleaned_data.csv"</span>, index=<span class="kw">False</span>)` },
      ],
      fact: 'pandas was created by Wes McKinney in 2008 while he was working at AQR Capital Management, a hedge fund. He needed a tool for analysing financial time series data that didn\'t exist yet, so he built it himself and open-sourced it. Today it\'s downloaded over 200 million times per month. One developer, one weekend project, and the entire world\'s data science community changed forever.',
      history: null,
      quiz: { q: 'What does df[df["score"] > 80] do in pandas?', opts: ['Sets all scores above 80 to True','Returns a new DataFrame containing only the rows where the "score" column value is greater than 80','Counts how many scores are above 80','Deletes rows where score is 80 or below'], ans: 1 },
      challenge: { t: 'School Performance Analyser', d: 'Download a real dataset (Kaggle has many free ones) or create a CSV with 30+ students, 5 subjects, gender, and year group. Use pandas to: load and clean the data (handle missing values), calculate per-student averages and grades, compare performance by gender and year group using groupby, find the top 10% of students, identify which subject has the highest variance (most inconsistent results), and save a sorted report to a new CSV. Print a summary report with key findings.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 6 — Capstone: Full Python Application
       ══════════════════════════════════════════════════════════ */
    {
      h: '🏆 Step 6 — Capstone: Build a Complete Python Application',
      p: `You now have a professional Python toolkit: OOP for structure, files/JSON for persistence, APIs for live data, pygame for interaction, and pandas for data analysis. Time to combine them into something substantial — a <strong>Personal Finance Tracker</strong> with real data, real analysis, and a real command-line interface.
<br><br>
<strong>What we're building:</strong><br>
A complete CLI application where users log income and expenses, categorise transactions, view summaries and trends, get budget alerts, and see their data analysed with pandas and visualised with matplotlib. All data persists in a JSON file between sessions.
<br><br>
<strong>Professional Python project structure:</strong><br>
Real Python applications split code into multiple files (modules). We'll practice this — separate files for data models, business logic, and the interface.`,
      code: `<span class="cm"># models.py — data classes for the application</span>
<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass, field
<span class="kw">from</span> datetime <span class="kw">import</span> datetime
<span class="kw">from</span> enum <span class="kw">import</span> Enum

<span class="kw">class</span> TransactionType(Enum):
    INCOME  = <span class="str">"income"</span>
    EXPENSE = <span class="str">"expense"</span>

@dataclass
<span class="kw">class</span> Transaction:
    <span class="str">"""A single financial transaction."""</span>
    amount:      <span class="fn">float</span>
    category:    <span class="fn">str</span>
    description: <span class="fn">str</span>
    t_type:      TransactionType
    date:        <span class="fn">str</span>  = field(default_factory=<span class="kw">lambda</span>: datetime.<span class="fn">now</span>().<span class="fn">isoformat</span>())
    id:          <span class="fn">int</span>  = field(default=<span class="num">0</span>)

    <span class="kw">def</span> <span class="fn">to_dict</span>(self) -> <span class="fn">dict</span>:
        <span class="kw">return</span> {
            <span class="str">"id"</span>:          self.id,
            <span class="str">"amount"</span>:      self.amount,
            <span class="str">"category"</span>:    self.category,
            <span class="str">"description"</span>: self.description,
            <span class="str">"type"</span>:        self.t_type.value,
            <span class="str">"date"</span>:        self.date,
        }

    @classmethod
    <span class="kw">def</span> <span class="fn">from_dict</span>(cls, d: <span class="fn">dict</span>) -> <span class="str">"Transaction"</span>:
        <span class="kw">return</span> cls(
            amount      = d[<span class="str">"amount"</span>],
            category    = d[<span class="str">"category"</span>],
            description = d[<span class="str">"description"</span>],
            t_type      = TransactionType(d[<span class="str">"type"</span>]),
            date        = d[<span class="str">"date"</span>],
            id          = d[<span class="str">"id"</span>],
        )`,
      examples: [
        { label: 'The tracker class with full business logic', code: `<span class="kw">import</span> json, pandas <span class="kw">as</span> pd
<span class="kw">from</span> pathlib <span class="kw">import</span> Path

<span class="kw">class</span> FinanceTracker:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, filepath: <span class="fn">str</span> = <span class="str">"finances.json"</span>):
        self.filepath     = Path(filepath)
        self.transactions = []
        self._next_id     = <span class="num">1</span>
        self.<span class="fn">load</span>()

    <span class="kw">def</span> <span class="fn">add</span>(self, amount, category, desc, t_type) -> Transaction:
        t = Transaction(amount, category, desc, t_type, id=self._next_id)
        self._next_id += <span class="num">1</span>
        self.transactions.<span class="fn">append</span>(t)
        self.<span class="fn">save</span>()
        <span class="kw">return</span> t

    @property
    <span class="kw">def</span> <span class="fn">balance</span>(self) -> <span class="fn">float</span>:
        total = <span class="num">0</span>
        <span class="kw">for</span> t <span class="kw">in</span> self.transactions:
            total += t.amount <span class="kw">if</span> t.t_type == TransactionType.INCOME <span class="kw">else</span> -t.amount
        <span class="kw">return</span> total

    <span class="kw">def</span> <span class="fn">summary_by_category</span>(self) -> pd.DataFrame:
        records = [t.<span class="fn">to_dict</span>() <span class="kw">for</span> t <span class="kw">in</span> self.transactions]
        <span class="kw">if not</span> records: <span class="kw">return</span> pd.DataFrame()
        df = pd.DataFrame(records)
        df[<span class="str">"signed"</span>] = df.<span class="fn">apply</span>(
            <span class="kw">lambda</span> r: r[<span class="str">"amount"</span>] <span class="kw">if</span> r[<span class="str">"type"</span>] == <span class="str">"income"</span> <span class="kw">else</span> -r[<span class="str">"amount"</span>], axis=<span class="num">1</span>)
        <span class="kw">return</span> df.<span class="fn">groupby</span>([<span class="str">"category"</span>,<span class="str">"type"</span>])[<span class="str">"amount"</span>].<span class="fn">agg</span>([<span class="str">"sum"</span>,<span class="str">"count"</span>])

    <span class="kw">def</span> <span class="fn">save</span>(self):
        data = {<span class="str">"next_id"</span>: self._next_id,
                <span class="str">"transactions"</span>: [t.<span class="fn">to_dict</span>() <span class="kw">for</span> t <span class="kw">in</span> self.transactions]}
        self.filepath.<span class="fn">write_text</span>(json.<span class="fn">dumps</span>(data, indent=<span class="num">2</span>))

    <span class="kw">def</span> <span class="fn">load</span>(self):
        <span class="kw">if not</span> self.filepath.<span class="fn">exists</span>(): <span class="kw">return</span>
        data = json.<span class="fn">loads</span>(self.filepath.<span class="fn">read_text</span>())
        self._next_id     = data.<span class="fn">get</span>(<span class="str">"next_id"</span>, <span class="num">1</span>)
        self.transactions = [Transaction.<span class="fn">from_dict</span>(t) <span class="kw">for</span> t <span class="kw">in</span> data.<span class="fn">get</span>(<span class="str">"transactions"</span>, [])]` },
      ],
      fact: 'Python is the primary language used by financial institutions for data analysis and algorithmic trading. JPMorgan Chase employs more Python developers than software engineers at most tech startups. Their internal Python framework, Athena, contains over 40 million lines of Python code and handles trillions of dollars in daily transactions. The skills you\'ve built in this course are literally what Wall Street runs on.',
      history: null,
      quiz: { q: 'What is the @dataclass decorator in Python and what problem does it solve?', opts: ['It adds data to the class at runtime','It automatically generates __init__, __repr__, and __eq__ methods based on the class fields, eliminating repetitive boilerplate code','It makes the class immutable','It converts the class to a database table'], ans: 1 },
      challenge: { t: 'CAPSTONE — Personal Finance Tracker CLI', d: `Build the complete Personal Finance Tracker with: (1) dataclass models for Transaction and Budget. (2) FinanceTracker class with JSON persistence. (3) CLI menu: Add income, Add expense, View balance, Summary by category, Monthly trend, Set budget alerts, Export to CSV, Quit. (4) pandas analysis: monthly spending by category, top 5 expense categories, month-over-month comparison. (5) Budget system: set monthly limits per category, alert when 80% and 100% reached. (6) Use tabulate or rich library for beautiful terminal tables. (7) Optional: matplotlib charts showing spending over time. All data persists in JSON between runs.` },
    },
  ],
};

/* ═══════════════════════════════════════════════════
   PYTHON & MACHINE LEARNING (python3) — ages 15-18
   ═══════════════════════════════════════════════════ */

T21.lessons.python3 = {
  title: 'Python & Machine Learning', banner: 'python',
  subtitle: 'Build real AI systems from scratch — understand the mathematics and code behind machine intelligence.',
  steps: [

    {
      h: '🧠 Step 1 — What Machine Learning Actually Is: No Hype, Just Reality',
      p: `<strong>Machine Learning</strong> is a method of solving problems where instead of writing explicit rules, you give a computer <em>examples</em> and it figures out the rules itself. This sounds magical — but the underlying mathematics is completely understandable, and by the end of this course you will have built working ML systems from scratch.
<br><br>
<strong>The three paradigms of ML:</strong><br>
• <strong>Supervised Learning</strong> — training data has correct answers (labels). The model learns to map inputs to outputs. Used for: spam detection, medical diagnosis, image classification.<br>
• <strong>Unsupervised Learning</strong> — no labels. The model finds hidden structure. Used for: customer segmentation, anomaly detection, compression.<br>
• <strong>Reinforcement Learning</strong> — an agent takes actions, receives rewards, learns to maximise them. Used for: game-playing AI (AlphaGo), robot control, autonomous vehicles.
<br><br>
<strong>The ML workflow — every project follows these steps:</strong><br>
1. Collect and clean data &nbsp; 2. Explore and visualise &nbsp; 3. Choose a model<br>
4. Train on training data &nbsp; 5. Evaluate on test data &nbsp; 6. Iterate &nbsp; 7. Deploy`,
      code: `<span class="cm"># The simplest ML model: Linear Regression from scratch
# Goal: given study hours, predict exam score
# We learn the formula: score = slope × hours + intercept</span>

<span class="kw">import</span> numpy <span class="kw">as</span> np

<span class="cm"># Training data</span>
hours  = np.<span class="fn">array</span>([<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>, <span class="num">6</span>, <span class="num">7</span>, <span class="num">8</span>, <span class="num">9</span>, <span class="num">10</span>])
scores = np.<span class="fn">array</span>([<span class="num">35</span>, <span class="num">45</span>, <span class="num">52</span>, <span class="num">61</span>, <span class="num">68</span>, <span class="num">75</span>, <span class="num">80</span>, <span class="num">88</span>, <span class="num">92</span>, <span class="num">97</span>])

<span class="cm"># TRAINING: Normal Equation (what sklearn LinearRegression uses internally)</span>
n         = <span class="fn">len</span>(hours)
slope     = (n*np.<span class="fn">sum</span>(hours*scores) - np.<span class="fn">sum</span>(hours)*np.<span class="fn">sum</span>(scores)) / \
            (n*np.<span class="fn">sum</span>(hours**<span class="num">2</span>)       - np.<span class="fn">sum</span>(hours)**<span class="num">2</span>)
intercept = (np.<span class="fn">sum</span>(scores) - slope*np.<span class="fn">sum</span>(hours)) / n

<span class="fn">print</span>(<span class="str">f"Learned: score = {slope:.2f} × hours + {intercept:.1f}"</span>)

<span class="cm"># INFERENCE: predict scores for new inputs</span>
<span class="kw">for</span> h <span class="kw">in</span> [<span class="num">3.5</span>, <span class="num">7</span>, <span class="num">12</span>]:
    pred = slope * h + intercept
    <span class="fn">print</span>(<span class="str">f"  {h} hours study → predicted score: {pred:.1f}"</span>)

<span class="cm"># EVALUATE: Mean Absolute Error</span>
predictions = slope * hours + intercept
mae = np.<span class="fn">mean</span>(np.<span class="fn">abs</span>(predictions - scores))
<span class="fn">print</span>(<span class="str">f"MAE on training data: {mae:.2f} points"</span>)`,
      examples: [
        { label: 'Bias-variance tradeoff — the core ML challenge', code: `<span class="cm"># UNDERFITTING: model too simple — misses real patterns
# OVERFITTING:  model too complex — memorises noise, fails on new data
# Goal: find the sweet spot between them

import numpy as np

np.random.seed(42)
X = np.linspace(0, 10, 25)
y = 0.5*X**2 - 3*X + 10 + np.random.normal(0, 3, 25)  # true pattern + noise

# Fit polynomials of different complexity
for degree in [1, 2, 10]:
    coeffs = np.polyfit(X, y, degree)
    p      = np.poly1d(coeffs)
    mse    = np.mean((p(X) - y)**2)
    label  = {1:"UNDERFIT", 2:"GOOD FIT", 10:"OVERFIT"}[degree]
    print(f"Degree {degree:2} ({label:9}): train_MSE = {mse:.2f}")

# Key insight: the degree-10 polynomial has near-zero training error
# but will perform terribly on data it has never seen — it memorised
# the noise rather than learning the true underlying pattern.</span>` },
      ],
      fact: 'The term "Machine Learning" was coined by Arthur Samuel in 1959 when he wrote a checkers program that improved by playing against itself. He described it as giving computers "the ability to learn without being explicitly programmed." His program eventually defeated the checkers champion of Connecticut — the first time a computer beat an expert human at a complex game.',
      history: null,
      quiz: { q: 'What is the key difference between supervised and unsupervised learning?', opts: ['Supervised is faster','Supervised uses labelled training data with known correct answers; unsupervised finds hidden patterns in data without labels','Supervised needs more data','Unsupervised is newer'], ans: 1 },
      challenge: { t: 'Linear Regression from Scratch', d: 'Without using sklearn, implement complete linear regression. Create a dataset for a real relationship (hours of sleep vs reaction time, temperature vs ice cream sales). Implement the normal equation for slope and intercept, a prediction function, MSE and MAE metrics, and an 80/20 train/test split that shows whether your model generalises. Print a table comparing predicted vs actual values and calculate the R² score.' },
    },

    {
      h: '📊 Step 2 — Classification: Teaching Machines to Sort and Label',
      p: `<strong>Classification</strong> is the most common ML task: given input features, predict which category an item belongs to. Spam vs not spam. Tumour benign vs malignant. Digit 0 through 9. The model learns a decision boundary that separates classes in feature space.
<br><br>
<strong>Three fundamental classifiers to understand deeply:</strong><br>
• <strong>K-Nearest Neighbours (KNN)</strong> — predict by majority vote of the K most similar training examples. No training phase — just stores data. Simple but memory-hungry.<br>
• <strong>Decision Tree</strong> — learns a tree of if/else rules from data. Highly interpretable: you can read exactly what it learned.<br>
• <strong>Naive Bayes</strong> — uses Bayes' theorem and probability. Extremely fast, excellent for text.
<br><br>
<strong>Why accuracy alone is dangerous:</strong> If 99% of patients are healthy, a model that always says "healthy" achieves 99% accuracy — but catches zero sick people. <strong>Precision, recall, and F1 score</strong> reveal these failures.`,
      code: `<span class="kw">from</span> sklearn.datasets <span class="kw">import</span> load_iris
<span class="kw">from</span> sklearn.model_selection <span class="kw">import</span> train_test_split
<span class="kw">from</span> sklearn.neighbors <span class="kw">import</span> KNeighborsClassifier
<span class="kw">from</span> sklearn.metrics <span class="kw">import</span> classification_report, confusion_matrix
<span class="kw">import</span> numpy <span class="kw">as</span> np

<span class="cm"># Iris: 150 flowers, 4 measurements, 3 species — ML's Hello World</span>
iris                 = <span class="fn">load_iris</span>()
X, y                 = iris.data, iris.target
X_train, X_test, y_train, y_test = <span class="fn">train_test_split</span>(
    X, y, test_size=<span class="num">0.2</span>, random_state=<span class="num">42</span>)

<span class="cm"># Train KNN with k=3</span>
knn = <span class="fn">KNeighborsClassifier</span>(n_neighbors=<span class="num">3</span>)
knn.<span class="fn">fit</span>(X_train, y_train)
preds = knn.<span class="fn">predict</span>(X_test)

<span class="fn">print</span>(<span class="str">f"Accuracy: {(preds == y_test).mean():.3f}\\n"</span>)
<span class="fn">print</span>(<span class="fn">classification_report</span>(y_test, preds, target_names=iris.target_names))

<span class="cm"># Confusion matrix — reveals WHERE mistakes happen</span>
cm = <span class="fn">confusion_matrix</span>(y_test, preds)
<span class="fn">print</span>(<span class="str">"Confusion Matrix (rows=actual, cols=predicted):"</span>)
<span class="fn">print</span>(cm)`,
      examples: [
        { label: 'KNN implemented from scratch', code: `<span class="kw">import</span> numpy <span class="kw">as</span> np
<span class="kw">from</span> collections <span class="kw">import</span> Counter

<span class="kw">class</span> KNNScratch:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, k=<span class="num">3</span>): self.k = k

    <span class="kw">def</span> <span class="fn">fit</span>(self, X, y):
        self.X_train = X   <span class="cm"># KNN has no training — just stores data!</span>
        self.y_train = y

    <span class="kw">def</span> <span class="fn">predict</span>(self, X):
        <span class="kw">return</span> np.array([self.<span class="fn">_predict_one</span>(x) <span class="kw">for</span> x <span class="kw">in</span> X])

    <span class="kw">def</span> <span class="fn">_predict_one</span>(self, x):
        <span class="cm"># Euclidean distance to every training point</span>
        dists    = np.<span class="fn">sqrt</span>(np.<span class="fn">sum</span>((self.X_train - x)**<span class="num">2</span>, axis=<span class="num">1</span>))
        k_idx    = np.<span class="fn">argsort</span>(dists)[:self.k]
        k_labels = self.y_train[k_idx]
        <span class="kw">return</span> Counter(k_labels).<span class="fn">most_common</span>(<span class="num">1</span>)[<span class="num">0</span>][<span class="num">0</span>]

knn_scratch = <span class="fn">KNNScratch</span>(k=<span class="num">3</span>)
knn_scratch.<span class="fn">fit</span>(X_train, y_train)
scratch_preds = knn_scratch.<span class="fn">predict</span>(X_test)
<span class="fn">print</span>(<span class="str">f"Scratch KNN accuracy: {(scratch_preds == y_test).mean():.3f}"</span>)
<span class="cm"># Should match sklearn's KNN almost exactly!</span>` },
      ],
      fact: 'Spotify and Netflix use KNN-style recommendation: when you like a song or movie, the system finds users whose preferences are "nearest" to yours in feature space and recommends what those similar users loved. The "K" in production systems is often in the thousands — consulting thousands of similar users to make each recommendation.',
      history: null,
      quiz: { q: 'Why is accuracy alone a poor metric when the dataset is imbalanced (e.g. 99% negative cases)?', opts: ['Accuracy is always reliable','A model that always predicts "negative" scores 99% accuracy but detects zero positive cases — precision and recall reveal this failure','Accuracy only works for two-class problems','Imbalanced data cannot be classified'], ans: 1 },
      challenge: { t: 'Multi-Classifier Comparison', d: 'Download the Titanic dataset (seaborn.load_dataset("titanic") or Kaggle). Clean missing values, encode categoricals. Train KNN (k=3,5,7), Decision Tree, Naive Bayes, and Logistic Regression. Compare accuracy, precision, and recall in a printed table. Plot a confusion matrix for the best model. Find which 3 features are most predictive of survival using a Decision Tree\'s feature_importances_ attribute.' },
    },

    {
      h: '🕸️ Step 3 — Neural Networks: The Mathematics of Artificial Brains',
      p: `A <strong>neural network</strong> loosely mimics how neurons in a brain connect and activate. A single artificial neuron takes several inputs, multiplies each by a learned <em>weight</em>, sums them, adds a <em>bias</em>, then passes the result through an <em>activation function</em> that determines the output.
<br><br>
<code>output = activation(w₁·x₁ + w₂·x₂ + ... + b)</code>
<br><br>
Stack many neurons in <em>layers</em> and connect the layers, and you get a network that can approximate any function — including recognising faces, translating languages, or generating images.
<br><br>
<strong>How training works — gradient descent:</strong><br>
1. Forward pass: feed input through the network, get a prediction<br>
2. Calculate loss: how wrong was the prediction?<br>
3. Backpropagation: calculate how much each weight contributed to the error<br>
4. Update: nudge each weight slightly in the direction that reduces error<br>
5. Repeat millions of times on millions of examples`,
      code: `<span class="kw">import</span> numpy <span class="kw">as</span> np

<span class="kw">class</span> NeuralNetwork:
    <span class="str">"""Two-layer neural network from scratch with backpropagation."""</span>

    <span class="kw">def</span> <span class="fn">__init__</span>(self, input_size, hidden_size, output_size, lr=<span class="num">0.01</span>):
        <span class="cm"># He initialisation — important for ReLU networks</span>
        self.W1 = np.random.<span class="fn">randn</span>(input_size, hidden_size) * np.<span class="fn">sqrt</span>(<span class="num">2</span>/input_size)
        self.b1 = np.<span class="fn">zeros</span>((<span class="num">1</span>, hidden_size))
        self.W2 = np.random.<span class="fn">randn</span>(hidden_size, output_size) * np.<span class="fn">sqrt</span>(<span class="num">2</span>/hidden_size)
        self.b2 = np.<span class="fn">zeros</span>((<span class="num">1</span>, output_size))
        self.lr  = lr

    <span class="kw">def</span> <span class="fn">relu</span>(self, z):     <span class="kw">return</span> np.<span class="fn">maximum</span>(<span class="num">0</span>, z)
    <span class="kw">def</span> <span class="fn">relu_d</span>(self, z):   <span class="kw">return</span> (z > <span class="num">0</span>).<span class="fn">astype</span>(<span class="fn">float</span>)
    <span class="kw">def</span> <span class="fn">sigmoid</span>(self, z):  <span class="kw">return</span> <span class="num">1</span> / (<span class="num">1</span> + np.<span class="fn">exp</span>(-np.<span class="fn">clip</span>(z, -<span class="num">500</span>, <span class="num">500</span>)))

    <span class="kw">def</span> <span class="fn">forward</span>(self, X):
        self.z1 = X @ self.W1 + self.b1
        self.a1 = self.<span class="fn">relu</span>(self.z1)
        self.z2 = self.a1 @ self.W2 + self.b2
        self.a2 = self.<span class="fn">sigmoid</span>(self.z2)
        <span class="kw">return</span> self.a2

    <span class="kw">def</span> <span class="fn">backward</span>(self, X, y):
        m   = X.shape[<span class="num">0</span>]
        dz2 = self.a2 - y.reshape(-<span class="num">1</span>, <span class="num">1</span>)
        dW2 = self.a1.T @ dz2 / m
        db2 = dz2.<span class="fn">mean</span>(axis=<span class="num">0</span>, keepdims=<span class="kw">True</span>)
        dz1 = (dz2 @ self.W2.T) * self.<span class="fn">relu_d</span>(self.z1)
        dW1 = X.T @ dz1 / m
        db1 = dz1.<span class="fn">mean</span>(axis=<span class="num">0</span>, keepdims=<span class="kw">True</span>)
        self.W2 -= self.lr * dW2
        self.b2 -= self.lr * db2
        self.W1 -= self.lr * dW1
        self.b1 -= self.lr * db1

    <span class="kw">def</span> <span class="fn">train</span>(self, X, y, epochs=<span class="num">1000</span>):
        <span class="kw">for</span> ep <span class="kw">in</span> <span class="fn">range</span>(epochs):
            out  = self.<span class="fn">forward</span>(X)
            loss = -np.<span class="fn">mean</span>(y*np.<span class="fn">log</span>(out+<span class="num">1e-8</span>) + (<span class="num">1</span>-y)*np.<span class="fn">log</span>(<span class="num">1</span>-out+<span class="num">1e-8</span>))
            self.<span class="fn">backward</span>(X, y)
            <span class="kw">if</span> ep % <span class="num">200</span> == <span class="num">0</span>:
                <span class="fn">print</span>(<span class="str">f"Epoch {ep:5}: loss = {loss:.4f}"</span>)

<span class="cm"># Train on XOR — a problem that requires hidden layers!</span>
X = np.array([[<span class="num">0</span>,<span class="num">0</span>],[<span class="num">0</span>,<span class="num">1</span>],[<span class="num">1</span>,<span class="num">0</span>],[<span class="num">1</span>,<span class="num">1</span>]])
y = np.array([<span class="num">0</span>, <span class="num">1</span>, <span class="num">1</span>, <span class="num">0</span>])  <span class="cm"># XOR truth table</span>
nn = <span class="fn">NeuralNetwork</span>(<span class="num">2</span>, <span class="num">4</span>, <span class="num">1</span>, lr=<span class="num">0.5</span>)
nn.<span class="fn">train</span>(X, y, epochs=<span class="num">2000</span>)
preds = (nn.<span class="fn">forward</span>(X) > <span class="num">0.5</span>).<span class="fn">astype</span>(<span class="fn">int</span>)
<span class="fn">print</span>(<span class="str">f"XOR predictions: {preds.flatten()} (expected: [0,1,1,0])"</span>)`,
      examples: [
        { label: 'Deep network with Keras on MNIST digits', code: `<span class="kw">import</span> tensorflow <span class="kw">as</span> tf
<span class="kw">from</span> tensorflow <span class="kw">import</span> keras

<span class="cm"># MNIST: 70,000 handwritten digit images, 28×28 pixels each</span>
(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.<span class="fn">load_data</span>()
X_train, X_test = X_train / <span class="num">255.0</span>, X_test / <span class="num">255.0</span>  <span class="cm"># normalise 0-1</span>

model = keras.Sequential([
    keras.layers.Flatten(input_shape=(<span class="num">28</span>,<span class="num">28</span>)),   <span class="cm"># 784 inputs</span>
    keras.layers.Dense(<span class="num">128</span>, activation=<span class="str">"relu"</span>),  <span class="cm"># hidden: 128 neurons</span>
    keras.layers.Dropout(<span class="num">0.2</span>),                    <span class="cm"># prevent overfitting</span>
    keras.layers.Dense(<span class="num">64</span>,  activation=<span class="str">"relu"</span>),  <span class="cm"># hidden: 64 neurons</span>
    keras.layers.Dense(<span class="num">10</span>,  activation=<span class="str">"softmax"</span>), <span class="cm"># 10 digit classes</span>
])
model.<span class="fn">compile</span>(optimizer=<span class="str">"adam"</span>,
              loss=<span class="str">"sparse_categorical_crossentropy"</span>,
              metrics=[<span class="str">"accuracy"</span>])
model.<span class="fn">fit</span>(X_train, y_train, epochs=<span class="num">5</span>, validation_split=<span class="num">0.1</span>)
_, acc = model.<span class="fn">evaluate</span>(X_test, y_test, verbose=<span class="num">0</span>)
<span class="fn">print</span>(<span class="str">f"Test accuracy: {acc*<span class="num">100</span>:.2f}%"</span>)  <span class="cm"># expect ~97-98%</span>` },
      ],
      fact: 'The backpropagation algorithm that makes deep learning possible was popularised by Rumelhart, Hinton, and Williams in 1986. For 20 years it was considered a dead end — networks with more than 2 layers couldn\'t be trained. In 2006, Geoffrey Hinton discovered how to initialise and train deep networks reliably, launching the deep learning revolution. He won the 2024 Nobel Prize in Physics for this work.',
      history: null,
      quiz: { q: 'What does the Dropout layer do during neural network training?', opts: ['Removes poorly-performing neurons permanently','Randomly disables a fraction of neurons each training step, forcing the network to learn redundant patterns and preventing overfitting','Reduces the learning rate over time','Normalises outputs of the previous layer'], ans: 1 },
      challenge: { t: 'Neural Network From Scratch on Real Data', d: 'Extend the NeuralNetwork class to support multiple hidden layers (pass a list like [64, 32] for layer sizes), mini-batch gradient descent (process 32 examples at a time instead of all at once), and a training history that tracks loss each epoch. Train it on the Iris dataset (scale features first with StandardScaler). Plot the learning curve. Compare your scratch network accuracy to sklearn\'s MLPClassifier on the same data.' },
    },

    {
      h: '📝 Step 4 — NLP: Teaching Machines to Read and Understand Text',
      p: `<strong>NLP (Natural Language Processing)</strong> is ML applied to text — and it is everywhere: search engines, autocomplete, spam filters, translation, chatbots, voice assistants, and every modern AI product. Text is challenging for machines because language is ambiguous, contextual, and culturally layered.
<br><br>
<strong>The NLP pipeline:</strong><br>
Raw text → Tokenise → Clean → Remove stopwords → Stem/lemmatise → Vectorise → Model
<br><br>
<strong>Vectorisation — turning words into numbers:</strong><br>
• <strong>Bag of Words (BoW)</strong> — count how many times each word appears. Simple but loses word order and context.<br>
• <strong>TF-IDF</strong> — word count × rarity score. Words common across all documents (like "the") get low weight; rare but frequent words get high weight.<br>
• <strong>Word Embeddings</strong> — words represented as dense vectors in high-dimensional space where semantically similar words are geometrically close. "King − Man + Woman ≈ Queen" is actually true in these spaces.`,
      code: `<span class="kw">from</span> sklearn.feature_extraction.text <span class="kw">import</span> TfidfVectorizer
<span class="kw">from</span> sklearn.naive_bayes <span class="kw">import</span> MultinomialNB
<span class="kw">from</span> sklearn.pipeline <span class="kw">import</span> Pipeline
<span class="kw">from</span> sklearn.model_selection <span class="kw">import</span> train_test_split
<span class="kw">from</span> sklearn.metrics <span class="kw">import</span> classification_report

<span class="cm"># Sentiment analysis on movie reviews</span>
reviews = [
    (<span class="str">"Absolutely brilliant film, loved every moment!"</span>,   <span class="num">1</span>),
    (<span class="str">"Waste of time. Terrible acting and awful plot."</span>,    <span class="num">0</span>),
    (<span class="str">"Outstanding performance by the lead actress."</span>,       <span class="num">1</span>),
    (<span class="str">"Boring, predictable. Fell asleep halfway through."</span>,  <span class="num">0</span>),
    (<span class="str">"Beautiful cinematography and deeply touching story."</span>, <span class="num">1</span>),
    (<span class="str">"Dreadful script, poor direction. Avoid!"</span>,            <span class="num">0</span>),
    (<span class="str">"Masterpiece! Will watch again and again."</span>,           <span class="num">1</span>),
    (<span class="str">"Disappointing. Fails to live up to the original."</span>,   <span class="num">0</span>),
    (<span class="str">"Gripping thriller that kept me on edge of my seat."</span>, <span class="num">1</span>),
    (<span class="str">"Confusing and incoherent narrative throughout."</span>,     <span class="num">0</span>),
]
texts, labels = <span class="fn">zip</span>(*reviews)
X_tr, X_te, y_tr, y_te = <span class="fn">train_test_split</span>(texts, labels, test_size=<span class="num">0.3</span>, random_state=<span class="num">42</span>)

<span class="cm"># Pipeline: TF-IDF vectoriser → Naive Bayes classifier</span>
pipe = Pipeline([
    (<span class="str">"tfidf"</span>, <span class="fn">TfidfVectorizer</span>(ngram_range=(<span class="num">1</span>,<span class="num">2</span>), stop_words=<span class="str">"english"</span>)),
    (<span class="str">"clf"</span>,   <span class="fn">MultinomialNB</span>()),
])
pipe.<span class="fn">fit</span>(X_tr, y_tr)
<span class="fn">print</span>(<span class="fn">classification_report</span>(y_te, pipe.<span class="fn">predict</span>(X_te),
      target_names=[<span class="str">"Negative"</span>,<span class="str">"Positive"</span>]))

<span class="cm"># Predict on new, unseen reviews</span>
new_reviews = [<span class="str">"A genuinely moving experience."</span>, <span class="str">"Totally unwatchable rubbish."</span>]
<span class="kw">for</span> r, pred <span class="kw">in</span> <span class="fn">zip</span>(new_reviews, pipe.<span class="fn">predict</span>(new_reviews)):
    <span class="fn">print</span>(<span class="str">f"  {'✅ Positive' if pred else '❌ Negative'}: {r}"</span>)`,
      examples: [
        { label: 'TF-IDF explained and computed from scratch', code: `<span class="kw">import</span> math, re
<span class="kw">from</span> collections <span class="kw">import</span> Counter

<span class="kw">def</span> <span class="fn">tokenise</span>(text):
    <span class="kw">return</span> re.<span class="fn">findall</span>(r<span class="str">'\b[a-z]+\b'</span>, text.<span class="fn">lower</span>())

<span class="kw">def</span> <span class="fn">tf</span>(word, doc):
    <span class="kw">return</span> doc.<span class="fn">count</span>(word) / <span class="fn">len</span>(doc) <span class="kw">if</span> doc <span class="kw">else</span> <span class="num">0</span>

<span class="kw">def</span> <span class="fn">idf</span>(word, corpus):
    <span class="cm"># High IDF = word is rare across documents = more informative</span>
    containing = <span class="fn">sum</span>(<span class="num">1</span> <span class="kw">for</span> doc <span class="kw">in</span> corpus <span class="kw">if</span> word <span class="kw">in</span> doc)
    <span class="kw">return</span> math.<span class="fn">log</span>((<span class="fn">len</span>(corpus) + <span class="num">1</span>) / (containing + <span class="num">1</span>)) + <span class="num">1</span>

docs   = [<span class="str">"machine learning is amazing"</span>, <span class="str">"deep learning powers AI"</span>, <span class="str">"python enables machine learning"</span>]
corpus = [<span class="fn">tokenise</span>(d) <span class="kw">for</span> d <span class="kw">in</span> docs]

<span class="cm"># "learning" appears in all 3 docs → low IDF (common = less informative)
# "amazing"  appears in only 1 doc  → high IDF (rare = very informative)</span>
<span class="kw">for</span> word <span class="kw">in</span> [<span class="str">"learning"</span>, <span class="str">"amazing"</span>, <span class="str">"python"</span>]:
    scores = [<span class="fn">tf</span>(word, doc) * <span class="fn">idf</span>(word, corpus) <span class="kw">for</span> doc <span class="kw">in</span> corpus]
    <span class="fn">print</span>(<span class="str">f"'{word}' TF-IDF: {[f'{s:.3f}' for s in scores]}"</span>)` },
      ],
      fact: 'Google Translate processes over 100 billion words per day across 133 languages. Before 2016, it used hand-crafted linguistic rules that took years to build per language pair. In 2016, Google replaced all of this with a single neural network, and translation quality improved more in that one year than in the previous ten combined. The network had learned the structure of human language from examples alone — no rules programmed by linguists.',
      history: null,
      quiz: { q: 'Why does TF-IDF give words like "the" a very low score even when they appear frequently?', opts: ['Short words get penalised','TF-IDF multiplies term frequency by inverse document frequency — words appearing in almost every document have very low IDF, making their TF-IDF score near zero regardless of frequency','TF-IDF ignores function words','The algorithm removes stopwords automatically'], ans: 1 },
      challenge: { t: 'News Category Classifier', d: 'Collect 60+ headlines (or use the BBC News dataset) across 5 categories (sport, tech, politics, entertainment, science). Build a TF-IDF + Naive Bayes pipeline. Evaluate using stratified 5-fold cross-validation. Build a second model using a Linear SVM (LinearSVC) and compare. For the best model, find the top 10 most important words for each category using the model\'s feature weights. Build an interactive function where a user types a headline and gets a predicted category with confidence.' },
    },

    {
      h: '🔬 Step 5 — Unsupervised Learning: Finding Hidden Structure in Data',
      p: `Supervised learning needs labelled data — which is expensive to collect. <strong>Unsupervised learning</strong> finds structure in raw, unlabelled data. It reveals natural groupings, reduces dimensions, detects anomalies, and discovers patterns humans hadn't anticipated.
<br><br>
<strong>K-Means Clustering — the most common unsupervised algorithm:</strong><br>
1. Choose K (number of clusters) &nbsp; 2. Randomly place K centroids<br>
3. Assign each point to nearest centroid &nbsp; 4. Move centroids to mean of their cluster<br>
5. Repeat 3-4 until convergence
<br><br>
<strong>Principal Component Analysis (PCA) — dimensionality reduction:</strong><br>
High-dimensional data (100+ features) is hard to visualise and slow to process. PCA finds the directions of maximum variance and projects data onto fewer dimensions, retaining as much information as possible. Used for visualisation, noise reduction, and speeding up downstream models.`,
      code: `<span class="kw">import</span> numpy <span class="kw">as</span> np
<span class="kw">from</span> sklearn.cluster <span class="kw">import</span> KMeans
<span class="kw">from</span> sklearn.preprocessing <span class="kw">import</span> StandardScaler
<span class="kw">from</span> sklearn.decomposition <span class="kw">import</span> PCA
<span class="kw">from</span> sklearn.datasets <span class="kw">import</span> make_blobs

<span class="cm"># Generate synthetic customer data (spend, frequency, age)</span>
X, _ = <span class="fn">make_blobs</span>(n_samples=<span class="num">300</span>, centers=<span class="num">4</span>, cluster_std=<span class="num">0.8</span>, random_state=<span class="num">42</span>)

<span class="cm"># ALWAYS scale before clustering — distance metrics are scale-sensitive!</span>
X_scaled = <span class="fn">StandardScaler</span>().<span class="fn">fit_transform</span>(X)

<span class="cm"># Elbow method: find the right K</span>
<span class="fn">print</span>(<span class="str">"K  | Inertia"</span>)
<span class="kw">for</span> k <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">8</span>):
    km      = <span class="fn">KMeans</span>(n_clusters=k, random_state=<span class="num">42</span>, n_init=<span class="num">10</span>)
    km.<span class="fn">fit</span>(X_scaled)
    bar     = <span class="str">"█"</span> * <span class="fn">int</span>(km.inertia_ / <span class="num">50</span>)
    <span class="fn">print</span>(<span class="str">f"{k:2} | {bar} ({km.inertia_:.0f})"</span>)

<span class="cm"># Train with optimal K=4</span>
km = <span class="fn">KMeans</span>(n_clusters=<span class="num">4</span>, random_state=<span class="num">42</span>, n_init=<span class="num">10</span>)
labels = km.<span class="fn">fit_predict</span>(X_scaled)

<span class="cm"># Describe each cluster in human terms</span>
<span class="kw">for</span> k <span class="kw">in</span> <span class="fn">range</span>(<span class="num">4</span>):
    cluster_points = X[labels == k]
    <span class="fn">print</span>(<span class="str">f"Cluster {k}: {<span class="fn">len</span>(cluster_points)} points, centre at ({cluster_points.mean(axis=<span class="num">0</span>)[<span class="num">0</span>]:.2f}, {cluster_points.mean(axis=<span class="num">0</span>)[<span class="num">1</span>]:.2f})"</span>)`,
      examples: [
        { label: 'PCA for visualising high-dimensional data', code: `<span class="kw">from</span> sklearn.decomposition <span class="kw">import</span> PCA
<span class="kw">from</span> sklearn.datasets <span class="kw">import</span> load_digits
<span class="kw">import</span> numpy <span class="kw">as</span> np

<span class="cm"># Digits: 1797 samples, each 64 features (8×8 pixel image)</span>
digits   = <span class="fn">load_digits</span>()
X, y     = digits.data, digits.target

<span class="cm"># Reduce 64 dimensions to 2 for visualisation</span>
pca    = <span class="fn">PCA</span>(n_components=<span class="num">2</span>)
X_2d   = pca.<span class="fn">fit_transform</span>(X)
var_pct = pca.explained_variance_ratio_.<span class="fn">sum</span>() * <span class="num">100</span>
<span class="fn">print</span>(<span class="str">f"64D → 2D: retained {var_pct:.1f}% of variance"</span>)

<span class="cm"># How many components needed to keep 95% variance?</span>
pca95 = <span class="fn">PCA</span>(n_components=<span class="num">0.95</span>)
pca95.<span class="fn">fit</span>(X)
<span class="fn">print</span>(<span class="str">f"Components for 95% variance: {pca95.n_components_} (vs 64 original)"</span>)

<span class="cm"># In the 2D plot, same digits cluster together — the network has
# compressed the image information into 2 meaningful dimensions.
# Use matplotlib scatter(X_2d[:,0], X_2d[:,1], c=y) to visualise.</span>` },
      ],
      fact: 'Spotify\'s Discover Weekly playlist — which feels like it knows your taste better than you do — uses unsupervised clustering. Songs are grouped by acoustic features (tempo, energy, valence, danceability), users by listening patterns, and the system recommends songs that users similar to you loved but you haven\'t heard. 40 million people listen to Discover Weekly weekly, with over 5 billion songs saved from it.',
      history: null,
      quiz: { q: 'In K-Means, what is the "elbow method" used to find?', opts: ['The optimal learning rate','The right value of K — the point where adding another cluster gives diminishing reduction in within-cluster variance','The number of training epochs','The correct distance metric'], ans: 1 },
      challenge: { t: 'Customer Segmentation System', d: 'Create a synthetic dataset of 500 customers: age, annual_spend, purchase_frequency, avg_basket_size, months_since_last_purchase. Scale features. Apply K-Means with elbow method to find optimal K (try 2-8). For each cluster print mean values of all features and write a marketing persona description ("High-value frequent buyers", "Lapsed customers", etc.). Apply PCA to visualise clusters in 2D. Use sklearn\'s silhouette_score to measure cluster quality and compare across K values.' },
    },

    {
      h: '🏆 Step 6 — Capstone: End-to-End ML Pipeline',
      p: `A real ML project is never just "train a model." It is a complete engineering workflow: data ingestion, cleaning, exploratory analysis, feature engineering, model selection with cross-validation, hyperparameter tuning, evaluation on held-out data, and deployment with a usable interface. Your capstone covers all of it.
<br><br>
<strong>Professional practices you will apply:</strong><br>
• Train / validation / test splits (three-way, not just two)<br>
• Cross-validation for reliable model comparison<br>
• Feature importance analysis — <em>why</em> does the model predict what it does?<br>
• GridSearchCV for hyperparameter tuning<br>
• sklearn Pipeline objects chaining preprocessing and models<br>
• Saving trained models with joblib for later use<br>
• A model card documenting performance, limitations, and ethical considerations`,
      code: `<span class="kw">import</span> pandas <span class="kw">as</span> pd, numpy <span class="kw">as</span> np
<span class="kw">from</span> sklearn.model_selection <span class="kw">import</span> train_test_split, cross_val_score, GridSearchCV
<span class="kw">from</span> sklearn.preprocessing <span class="kw">import</span> StandardScaler, LabelEncoder
<span class="kw">from</span> sklearn.pipeline <span class="kw">import</span> Pipeline
<span class="kw">from</span> sklearn.ensemble <span class="kw">import</span> RandomForestClassifier, GradientBoostingClassifier
<span class="kw">from</span> sklearn.linear_model <span class="kw">import</span> LogisticRegression
<span class="kw">from</span> sklearn.metrics <span class="kw">import</span> classification_report
<span class="kw">import</span> joblib

<span class="cm"># 1. GENERATE SYNTHETIC STUDENT PERFORMANCE DATA</span>
np.random.<span class="fn">seed</span>(<span class="num">42</span>)
n = <span class="num">500</span>
df = pd.DataFrame({
    <span class="str">"study_hours"</span>:    np.random.<span class="fn">normal</span>(<span class="num">5</span>, <span class="num">2</span>, n).<span class="fn">clip</span>(<span class="num">0</span>, <span class="num">14</span>),
    <span class="str">"attendance_pct"</span>: np.random.<span class="fn">normal</span>(<span class="num">78</span>, <span class="num">15</span>, n).<span class="fn">clip</span>(<span class="num">30</span>, <span class="num">100</span>),
    <span class="str">"sleep_hours"</span>:    np.random.<span class="fn">normal</span>(<span class="num">7</span>, <span class="num">1.5</span>, n).<span class="fn">clip</span>(<span class="num">3</span>, <span class="num">12</span>),
    <span class="str">"prev_gpa"</span>:       np.random.<span class="fn">normal</span>(<span class="num">2.8</span>, <span class="num">0.6</span>, n).<span class="fn">clip</span>(<span class="num">1</span>, <span class="num">4</span>),
    <span class="str">"internet_hrs"</span>:   np.random.<span class="fn">normal</span>(<span class="num">3</span>, <span class="num">2</span>, n).<span class="fn">clip</span>(<span class="num">0</span>, <span class="num">12</span>),
    <span class="str">"extracurricular"</span>:np.random.<span class="fn">randint</span>(<span class="num">0</span>, <span class="num">5</span>, n),
})
score = (<span class="num">8</span>*df[<span class="str">"study_hours"</span>] + <span class="num">0.4</span>*df[<span class="str">"attendance_pct"</span>] +
         <span class="num">3</span>*df[<span class="str">"sleep_hours"</span>]  + <span class="num">15</span>*df[<span class="str">"prev_gpa"</span>] +
         np.random.<span class="fn">normal</span>(<span class="num">0</span>, <span class="num">5</span>, n))
df[<span class="str">"grade"</span>] = pd.<span class="fn">cut</span>(score, bins=<span class="num">4</span>, labels=[<span class="str">"F"</span>,<span class="str">"C"</span>,<span class="str">"B"</span>,<span class="str">"A"</span>])

X = df.drop(<span class="str">"grade"</span>, axis=<span class="num">1</span>)
y = df[<span class="str">"grade"</span>]
X_train, X_test, y_train, y_test = <span class="fn">train_test_split</span>(X, y, test_size=<span class="num">0.2</span>, random_state=<span class="num">42</span>)`,
      examples: [
        { label: 'Model comparison and hyperparameter tuning', code: `<span class="cm"># 2. COMPARE MODELS WITH CROSS-VALIDATION</span>
models = {
    <span class="str">"Random Forest"</span>:  Pipeline([(<span class="str">"clf"</span>, <span class="fn">RandomForestClassifier</span>(random_state=<span class="num">42</span>))]),
    <span class="str">"Gradient Boost"</span>: Pipeline([(<span class="str">"clf"</span>, <span class="fn">GradientBoostingClassifier</span>(random_state=<span class="num">42</span>))]),
    <span class="str">"Logistic Reg"</span>:   Pipeline([(<span class="str">"scl"</span>, <span class="fn">StandardScaler</span>()), (<span class="str">"clf"</span>, <span class="fn">LogisticRegression</span>(max_iter=<span class="num">500</span>))]),
}

best_score, best_name, best_pipe = <span class="num">0</span>, <span class="str">""</span>, <span class="kw">None</span>
<span class="fn">print</span>(<span class="str">f"{'Model':<span class="num">18</span>} {'CV Acc':>8} {'Std':>6}"</span>)
<span class="kw">for</span> name, pipe <span class="kw">in</span> models.<span class="fn">items</span>():
    cv = <span class="fn">cross_val_score</span>(pipe, X_train, y_train, cv=<span class="num">5</span>)
    <span class="fn">print</span>(<span class="str">f"{name:<span class="num">18</span>} {cv.mean():>8.3f} {cv.std():>6.3f}"</span>)
    <span class="kw">if</span> cv.<span class="fn">mean</span>() > best_score:
        best_score, best_name, best_pipe = cv.<span class="fn">mean</span>(), name, pipe

<span class="cm"># 3. TUNE BEST MODEL</span>
param_grid = {<span class="str">"clf__n_estimators"</span>:[<span class="num">50</span>,<span class="num">100</span>,<span class="num">200</span>], <span class="str">"clf__max_depth"</span>:[<span class="kw">None</span>,<span class="num">5</span>,<span class="num">10</span>]}
gs = <span class="fn">GridSearchCV</span>(models[<span class="str">"Random Forest"</span>], param_grid, cv=<span class="num">5</span>, scoring=<span class="str">"accuracy"</span>)
gs.<span class="fn">fit</span>(X_train, y_train)
<span class="fn">print</span>(<span class="str">f"Best params: {gs.best_params_}  CV score: {gs.best_score_:.3f}"</span>)

<span class="cm"># 4. EVALUATE ON HELD-OUT TEST SET</span>
gs.best_estimator_.<span class="fn">fit</span>(X_train, y_train)
test_preds = gs.best_estimator_.<span class="fn">predict</span>(X_test)
<span class="fn">print</span>(<span class="fn">classification_report</span>(y_test, test_preds))

<span class="cm"># 5. FEATURE IMPORTANCE</span>
rf    = gs.best_estimator_.<span class="fn">named_steps</span>(<span class="str">"clf"</span>) <span class="kw">if</span> <span class="str">"clf"</span> <span class="kw">in</span> gs.best_estimator_.named_steps <span class="kw">else</span> gs.best_estimator_[<span class="str">"clf"</span>]
feats = <span class="fn">sorted</span>(<span class="fn">zip</span>(X.columns, rf.feature_importances_), key=<span class="kw">lambda</span> x: x[<span class="num">1</span>], reverse=<span class="kw">True</span>)
<span class="fn">print</span>(<span class="str">"\\nFeature Importances:"</span>)
<span class="kw">for</span> feat, imp <span class="kw">in</span> feats:
    bar = <span class="str">"█"</span> * <span class="fn">int</span>(imp * <span class="num">50</span>)
    <span class="fn">print</span>(<span class="str">f"  {feat:<span class="num">18</span>}: {bar} ({imp:.3f})"</span>)

<span class="cm"># 6. SAVE AND LOAD</span>
joblib.<span class="fn">dump</span>(gs.best_estimator_, <span class="str">"grade_model.pkl"</span>)
loaded = joblib.<span class="fn">load</span>(<span class="str">"grade_model.pkl"</span>)
<span class="fn">print</span>(<span class="str">"\\n✅ Model saved and reloaded successfully"</span>)` },
      ],
      fact: 'Kaggle — the world\'s largest ML competition platform — runs challenges with prizes up to $1 million. The winning solutions consistently use the same techniques you just practised: systematic feature engineering, cross-validation for reliable comparison, ensemble methods, and hyperparameter tuning. The top Kaggle competitors earn six-figure salaries as ML engineers at Google, Netflix, and Meta.',
      history: null,
      quiz: { q: 'Why use cross-validation rather than a single train/test split to compare models?', opts: ['Cross-validation is always faster','A single split can be lucky or unlucky — cross-validation trains and tests on multiple different splits and averages the results, giving a more reliable performance estimate','Cross-validation uses less data','The test set must stay hidden until final evaluation'], ans: 1 },
      challenge: { t: 'CAPSTONE — Complete ML System', d: `Choose a real dataset (Titanic, house prices, diabetes, or your own). Build a complete system: (1) EDA with 5+ visualisations and written insights about the data. (2) Feature engineering — create 3+ new features from existing ones. (3) Compare 5 classifiers/regressors using 5-fold cross-validation in a formatted table. (4) Tune the best 2 models with GridSearchCV. (5) Feature importance chart. (6) Final test-set evaluation with full classification/regression report. (7) joblib save/load the final model. (8) Interactive CLI for single predictions. (9) A written "model card" covering: what it predicts, training data description, performance metrics, known failure modes, and one ethical consideration about deploying it.` },
    },
  ],
};
