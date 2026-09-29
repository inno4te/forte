T21.lessons.cpp = {
  title: 'C++ Engineering', banner: 'cpp',
  subtitle: 'The language behind Unreal Engine, Chrome, Windows, and every high-performance system on Earth.',
  steps: [

    /* ══════════════════════════════════════════════════════════
       STEP 1 — C++ vs C, Compilation, First Program
       ══════════════════════════════════════════════════════════ */
    {
      h: '⚡ Step 1 — What Makes C++ Different, How It Compiles & First Program',
      p: `C++ was created by Bjarne Stroustrup starting in 1979 as "C with Classes" — literally C extended with object-oriented programming. It has since grown enormously, but its core promise remains: <strong>maximum performance with high-level abstractions</strong>.
<br><br>
<strong>Where C++ dominates absolutely:</strong><br>
• <strong>Game engines</strong> — Unreal Engine (Fortnite, PUBG), Frostbite (FIFA, Battlefield), id Tech (Doom), CryEngine<br>
• <strong>Browsers</strong> — Chrome, Firefox, Safari are all written in C++<br>
• <strong>Operating systems</strong> — Windows NT, macOS/iOS internals, device drivers<br>
• <strong>Databases</strong> — MySQL, MongoDB, Redis, RocksDB<br>
• <strong>Finance</strong> — High-frequency trading (microseconds matter)<br>
• <strong>Embedded & robotics</strong> — Anywhere memory and speed are both critical
<br><br>
<strong>C++ vs C vs Java vs Python:</strong><br>
C++ gives you C's raw speed AND Java's objects AND Python's modern library ecosystem — but with more complexity. The trade-off is real: C++ is the hardest of these languages, but also the most powerful.`,
      code: `<span class="cm">// C++ includes C's headers PLUS its own (note the lack of .h)</span>
#<span class="kw">include</span> <span class="str">&lt;iostream&gt;</span>    <span class="cm">// cin, cout — C++'s stream I/O</span>
#<span class="kw">include</span> <span class="str">&lt;string&gt;</span>      <span class="cm">// std::string — proper string class</span>
#<span class="kw">include</span> <span class="str">&lt;vector&gt;</span>      <span class="cm">// std::vector — resizable array</span>
#<span class="kw">include</span> <span class="str">&lt;iomanip&gt;</span>     <span class="cm">// setw, setprecision, fixed — formatting</span>

<span class="kw">using namespace</span> std;   <span class="cm">// lets us write cout instead of std::cout</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="cm">// cout with << — "stream" output (send to screen)</span>
    cout << <span class="str">"Hello, C++!"</span> << endl;   <span class="cm">// endl = newline + flush</span>
    cout << <span class="str">"Hello, C++!"</span> << <span class="str">"\\n"</span>;  <span class="cm">// faster than endl (no flush)</span>

    <span class="cm">// Variables — same types as C, plus string</span>
    string  name    = <span class="str">"Amara"</span>;
    <span class="kw">int</span>     age     = <span class="num">17</span>;
    <span class="kw">double</span>  height  = <span class="num">1.65</span>;
    <span class="kw">bool</span>    active  = <span class="kw">true</span>;

    <span class="cm">// Stream output with formatting</span>
    cout << <span class="str">"Name:   "</span> << name   << <span class="str">"\\n"</span>;
    cout << <span class="str">"Age:    "</span> << age    << <span class="str">"\\n"</span>;
    cout << fixed << setprecision(<span class="num">2</span>);
    cout << <span class="str">"Height: "</span> << height << <span class="str">"m\\n"</span>;

    <span class="cm">// cin — reading input from user</span>
    cout << <span class="str">"Enter your name: "</span>;
    string input;
    getline(cin, input);   <span class="cm">// getline reads full line including spaces</span>
    cout << <span class="str">"Welcome, "</span> << input << <span class="str">"!\\n"</span>;

    <span class="kw">return</span> <span class="num">0</span>;
}`,
      examples: [
        { label: 'auto keyword and type inference', code: `#<span class="kw">include</span> <span class="str">&lt;iostream&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;vector&gt;</span>
<span class="kw">using namespace</span> std;

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="cm">// auto — compiler deduces the type automatically (C++11)</span>
    <span class="kw">auto</span> x      = <span class="num">42</span>;          <span class="cm">// deduced as int</span>
    <span class="kw">auto</span> pi     = <span class="num">3.14159</span>;    <span class="cm">// deduced as double</span>
    <span class="kw">auto</span> name   = string(<span class="str">"Amara"</span>); <span class="cm">// deduced as std::string</span>
    <span class="kw">auto</span> flag   = <span class="kw">true</span>;        <span class="cm">// deduced as bool</span>

    cout << x << <span class="str">" "</span> << pi << <span class="str">" "</span> << name << <span class="str">"\\n"</span>;

    <span class="cm">// Range-based for loop — like Python's "for x in list"</span>
    vector&lt;<span class="kw">int</span>&gt; scores = {<span class="num">92</span>, <span class="num">87</span>, <span class="num">95</span>, <span class="num">78</span>, <span class="num">100</span>};

    <span class="kw">int</span> total = <span class="num">0</span>;
    <span class="kw">for</span> (<span class="kw">auto</span> score : scores) {   <span class="cm">// auto deduces int</span>
        total += score;
        cout << score << <span class="str">" "</span>;
    }
    cout << <span class="str">"\\nTotal: "</span> << total << <span class="str">"\\n"</span>;

    <span class="kw">return</span> <span class="num">0</span>;
}` },
        { label: 'C++ string class — far more powerful than C strings', code: `#<span class="kw">include</span> <span class="str">&lt;iostream&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;string&gt;</span>
<span class="kw">using namespace</span> std;

<span class="kw">int</span> <span class="fn">main</span>() {
    string s1 = <span class="str">"Hello"</span>;
    string s2 = <span class="str">"World"</span>;

    <span class="cm">// Concatenation with + (unlike C where you need strcat)</span>
    string s3 = s1 + <span class="str">", "</span> + s2 + <span class="str">"!"</span>;
    cout << s3 << <span class="str">"\\n"</span>;             <span class="cm">// Hello, World!</span>

    <span class="cm">// String methods</span>
    cout << s3.<span class="fn">length</span>()    << <span class="str">"\\n"</span>;   <span class="cm">// 13</span>
    cout << s3.<span class="fn">substr</span>(<span class="num">7</span>, <span class="num">5</span>) << <span class="str">"\\n"</span>; <span class="cm">// World</span>
    cout << s3.<span class="fn">find</span>(<span class="str">"World"</span>) << <span class="str">"\\n"</span>; <span class="cm">// 7 (position found)</span>
    s3.<span class="fn">replace</span>(<span class="num">7</span>, <span class="num">5</span>, <span class="str">"C++"</span>);
    cout << s3 << <span class="str">"\\n"</span>;             <span class="cm">// Hello, C++!</span>

    <span class="cm">// Comparison with == (unlike C where you need strcmp)</span>
    cout << (s1 == <span class="str">"Hello"</span>) << <span class="str">"\\n"</span>;  <span class="cm">// 1 (true)</span>

    <span class="kw">return</span> <span class="num">0</span>;
}` },
      ],
      fact: 'Bjarne Stroustrup originally called his language "C with Classes." It was renamed C++ in 1983 — the ++ is the C increment operator, symbolising "one better than C." Stroustrup has said the name was meant to be self-deprecating: "There are only two kinds of languages: the ones people complain about and the ones nobody uses."',
      history: 'cpp_stroustrup',
      quiz: { q: 'What does "using namespace std;" do and why is it used?', opts: ['It imports a library file','It lets you write cout and string instead of std::cout and std::string — making code less verbose','It increases performance','It is required for all C++ programs'], ans: 1 },
      challenge: { t: 'Student Statistics with Streams', d: 'Write a C++ program using cin and cout that reads 5 student names and scores (use getline for names, cin for scores). Store in two parallel vectors. Use a range-based for loop to print a formatted table with setw() for column alignment, setprecision(1) and fixed for scores. Calculate and display average, highest, and lowest. Use auto where appropriate.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 2 — Classes, Constructors, Destructors
       ══════════════════════════════════════════════════════════ */
    {
      h: '🏗️ Step 2 — Classes, Constructors, Destructors & the Rule of Three',
      p: `C++ classes look similar to Java classes but with crucial differences that reflect C++'s deeper control over memory. The most important difference: C++ has <strong>destructors</strong> — a special method called automatically when an object goes out of scope or is deleted. This is how C++ manages resources without a garbage collector.
<br><br>
<strong>Access specifiers in C++:</strong><br>
• <code>private:</code> — accessible only inside the class (default in class)<br>
• <code>public:</code> — accessible from anywhere<br>
• <code>protected:</code> — accessible inside the class and its subclasses
<br><br>
<strong>Constructor types:</strong><br>
• <strong>Default constructor</strong> — takes no parameters: <code>MyClass() {}</code><br>
• <strong>Parameterised constructor</strong> — takes parameters to initialise fields<br>
• <strong>Copy constructor</strong> — creates a new object as a copy of an existing one<br>
• <strong>Initialiser list</strong> — the preferred, efficient way to initialise members: <code>: field(value)</code>
<br><br>
The <strong>destructor</strong> is named <code>~ClassName()</code> and is called automatically when the object's lifetime ends. Essential for releasing heap memory, closing files, or freeing any resource.`,
      code: `#<span class="kw">include</span> <span class="str">&lt;iostream&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;string&gt;</span>
<span class="kw">using namespace</span> std;

<span class="kw">class</span> BankAccount {
<span class="kw">private</span>:
    string  owner;
    <span class="kw">double</span>  balance;
    <span class="kw">int</span>     accountNumber;
    <span class="kw">static int</span> nextAccountNum;   <span class="cm">// shared across ALL instances</span>

<span class="kw">public</span>:
    <span class="cm">// Parameterised constructor with initialiser list (preferred!)</span>
    <span class="fn">BankAccount</span>(<span class="kw">const</span> string& name, <span class="kw">double</span> initial)
        : owner(name), balance(initial >= <span class="num">0</span> ? initial : <span class="num">0.0</span>),
          accountNumber(nextAccountNum++) {
        cout << <span class="str">"✅ Account #"</span> << accountNumber << <span class="str">" created for "</span> << owner << <span class="str">"\\n"</span>;
    }

    <span class="cm">// Destructor — called when object goes out of scope or is deleted</span>
    ~<span class="fn">BankAccount</span>() {
        cout << <span class="str">"Account #"</span> << accountNumber << <span class="str">" ("</span> << owner << <span class="str">") closed.\\n"</span>;
    }

    <span class="kw">bool</span> <span class="fn">deposit</span>(<span class="kw">double</span> amount) {
        <span class="kw">if</span> (amount <= <span class="num">0</span>) { cout << <span class="str">"❌ Invalid amount\\n"</span>; <span class="kw">return false</span>; }
        balance += amount;
        cout << fixed << setprecision(<span class="num">2</span>);
        cout << <span class="str">"Deposited £"</span> << amount << <span class="str">" → Balance: £"</span> << balance << <span class="str">"\\n"</span>;
        <span class="kw">return true</span>;
    }

    <span class="kw">bool</span> <span class="fn">withdraw</span>(<span class="kw">double</span> amount) {
        <span class="kw">if</span> (amount > balance) { cout << <span class="str">"❌ Insufficient funds\\n"</span>; <span class="kw">return false</span>; }
        balance -= amount;
        cout << <span class="str">"Withdrew £"</span> << amount << <span class="str">" → Balance: £"</span> << balance << <span class="str">"\\n"</span>;
        <span class="kw">return true</span>;
    }

    <span class="kw">double</span> <span class="fn">getBalance</span>()  <span class="kw">const</span> { <span class="kw">return</span> balance; }  <span class="cm">// const = doesn't modify object</span>
    string <span class="fn">getOwner</span>()   <span class="kw">const</span> { <span class="kw">return</span> owner; }
    <span class="kw">int</span>    <span class="fn">getNumber</span>()  <span class="kw">const</span> { <span class="kw">return</span> accountNumber; }
};

<span class="kw">int</span> BankAccount::nextAccountNum = <span class="num">1001</span>;  <span class="cm">// define static member outside class</span>`,
      examples: [
        { label: 'Copy constructor and operator overloading', code: `<span class="kw">class</span> Vector2D {
<span class="kw">public</span>:
    <span class="kw">double</span> x, y;

    <span class="fn">Vector2D</span>(<span class="kw">double</span> x = <span class="num">0</span>, <span class="kw">double</span> y = <span class="num">0</span>) : x(x), y(y) {}

    <span class="cm">// Operator overloading — define what + means for your type</span>
    Vector2D <span class="kw">operator</span>+(<span class="kw">const</span> Vector2D& other) <span class="kw">const</span> {
        <span class="kw">return</span> <span class="fn">Vector2D</span>(x + other.x, y + other.y);
    }
    Vector2D <span class="kw">operator</span>*(<span class="kw">double</span> scalar) <span class="kw">const</span> {
        <span class="kw">return</span> <span class="fn">Vector2D</span>(x * scalar, y * scalar);
    }
    <span class="kw">bool</span> <span class="kw">operator</span>==(<span class="kw">const</span> Vector2D& o) <span class="kw">const</span> { <span class="kw">return</span> x==o.x && y==o.y; }

    <span class="kw">double</span> <span class="fn">magnitude</span>() <span class="kw">const</span> { <span class="kw">return</span> sqrt(x*x + y*y); }

    <span class="cm">// Stream output operator — enables: cout << myVector</span>
    <span class="kw">friend</span> ostream& <span class="kw">operator</span><<(ostream& os, <span class="kw">const</span> Vector2D& v) {
        <span class="kw">return</span> os << <span class="str">"("</span> << v.x << <span class="str">", "</span> << v.y << <span class="str">")"</span>;
    }
};

<span class="kw">int</span> <span class="fn">main</span>() {
    Vector2D v1(<span class="num">3</span>, <span class="num">4</span>), v2(<span class="num">1</span>, <span class="num">2</span>);
    Vector2D v3 = v1 + v2;
    cout << v1 << <span class="str">" + "</span> << v2 << <span class="str">" = "</span> << v3 << <span class="str">"\\n"</span>;
    cout << <span class="str">"|v1| = "</span> << v1.<span class="fn">magnitude</span>() << <span class="str">"\\n"</span>;   <span class="cm">// 5.0</span>
    <span class="kw">return</span> <span class="num">0</span>;
}` },
        { label: 'const correctness — writing robust C++', code: `<span class="kw">class</span> Student {
<span class="kw">private</span>:
    string name;
    <span class="kw">double</span> gpa;
<span class="kw">public</span>:
    <span class="fn">Student</span>(<span class="kw">const</span> string& n, <span class="kw">double</span> g) : name(n), gpa(g) {}

    <span class="cm">// const methods — CANNOT modify the object</span>
    <span class="cm">// Mark getters as const: allows calling on const objects</span>
    string <span class="fn">getName</span>() <span class="kw">const</span> { <span class="kw">return</span> name; }
    <span class="kw">double</span> <span class="fn">getGpa</span>()  <span class="kw">const</span> { <span class="kw">return</span> gpa;  }

    <span class="cm">// non-const method — CAN modify the object</span>
    <span class="kw">void</span> <span class="fn">updateGpa</span>(<span class="kw">double</span> g) { gpa = g; }
};

<span class="cm">// const reference parameter — efficient (no copy) AND safe (no modify)</span>
<span class="kw">void</span> <span class="fn">printStudent</span>(<span class="kw">const</span> Student& s) {
    cout << s.<span class="fn">getName</span>() << <span class="str">": "</span> << s.<span class="fn">getGpa</span>() << <span class="str">"\\n"</span>;
    <span class="cm">// s.updateGpa(4.0);  // ERROR — can't call non-const on const ref</span>
}` },
      ],
      fact: 'C++ operator overloading lets you define what mathematical symbols mean for your own types. The Eigen linear algebra library, used by TensorFlow (Google\'s AI framework) under the hood, uses operator overloading so you can write matrix*vector in code exactly as you\'d write it in mathematics. This is why C++ remains the language of choice for performance-critical scientific computing.',
      history: null,
      quiz: { q: 'What is a C++ destructor and when is it called?', opts: ['A function that clears a variable to zero','A special method named ~ClassName() called automatically when an object goes out of scope or is deleted, used to release resources','A constructor that removes parameters','A method that undefines a class'], ans: 1 },
      challenge: { t: 'Dynamic Array Class', d: 'Build a class DynamicArray that wraps a raw int array on the heap. It should have: a parameterised constructor allocating initial capacity with new[], a destructor using delete[], push_back(int) that doubles capacity when full (allocate new array, copy, delete old), pop_back(), get(int index) const, size() const, capacity() const, print() const, and operator[] for index access. Test thoroughly — this is exactly how std::vector works internally.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 3 — Inheritance and Polymorphism in C++
       ══════════════════════════════════════════════════════════ */
    {
      h: '🧬 Step 3 — Inheritance, Virtual Functions & Polymorphism in C++',
      p: `C++ inheritance works similarly to Java but with critical differences that trip up even experienced programmers. The most important: in C++, method overriding only works polymorphically if the base class declares the method as <strong>virtual</strong>. Without <code>virtual</code>, the base class version always runs — even when calling through a derived class pointer.
<br><br>
<strong>The virtual keyword — how C++ polymorphism works:</strong><br>
When you declare a method <code>virtual</code>, C++ creates a <strong>vtable</strong> (virtual function table) — a hidden lookup table that maps each object to its actual overridden methods. When you call a virtual method through a pointer or reference, the vtable is consulted at runtime to find the right implementation. This is called <em>dynamic dispatch</em>.
<br><br>
<strong>Pure virtual functions</strong> (<code>= 0</code>) make a class abstract — you cannot instantiate it directly, and any concrete subclass MUST implement the function. This enforces a contract, just like Java's abstract methods.
<br><br>
<strong>Always declare base class destructors virtual</strong> when you use polymorphism. Without this, deleting a derived class through a base pointer calls only the base destructor, leaking memory.`,
      code: `#<span class="kw">include</span> <span class="str">&lt;iostream&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;string&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;cmath&gt;</span>
<span class="kw">using namespace</span> std;

<span class="kw">class</span> Shape {
<span class="kw">protected</span>:
    string colour;
<span class="kw">public</span>:
    <span class="fn">Shape</span>(<span class="kw">const</span> string& c) : colour(c) {}

    <span class="cm">// Pure virtual — MUST be overridden in subclasses</span>
    <span class="kw">virtual double</span> <span class="fn">area</span>()      <span class="kw">const</span> = <span class="num">0</span>;
    <span class="kw">virtual double</span> <span class="fn">perimeter</span>() <span class="kw">const</span> = <span class="num">0</span>;
    <span class="kw">virtual</span> string <span class="fn">name</span>()      <span class="kw">const</span> = <span class="num">0</span>;

    <span class="cm">// Regular virtual — has default, can be overridden</span>
    <span class="kw">virtual void</span> <span class="fn">describe</span>() <span class="kw">const</span> {
        cout << colour << <span class="str">" "</span> << <span class="fn">name</span>()
             << fixed << setprecision(<span class="num">2</span>)
             << <span class="str">": area="</span> << <span class="fn">area</span>() << <span class="str">", perimeter="</span> << <span class="fn">perimeter</span>() << <span class="str">"\\n"</span>;
    }

    <span class="cm">// CRITICAL: virtual destructor prevents memory leaks!</span>
    <span class="kw">virtual</span> ~<span class="fn">Shape</span>() {}
};

<span class="kw">class</span> Circle : <span class="kw">public</span> Shape {
    <span class="kw">double</span> radius;
<span class="kw">public</span>:
    <span class="fn">Circle</span>(<span class="kw">const</span> string& c, <span class="kw">double</span> r) : <span class="fn">Shape</span>(c), radius(r) {}
    <span class="kw">double</span> <span class="fn">area</span>()      <span class="kw">const override</span> { <span class="kw">return</span> M_PI * radius * radius; }
    <span class="kw">double</span> <span class="fn">perimeter</span>() <span class="kw">const override</span> { <span class="kw">return</span> <span class="num">2</span> * M_PI * radius; }
    string <span class="fn">name</span>()      <span class="kw">const override</span> { <span class="kw">return</span> <span class="str">"Circle(r="</span>+to_string(radius)+<span class="str">")"</span>; }
};`,
      examples: [
        { label: 'Polymorphism with pointers — the classic C++ pattern', code: `<span class="kw">class</span> Rectangle : <span class="kw">public</span> Shape {
    <span class="kw">double</span> w, h;
<span class="kw">public</span>:
    <span class="fn">Rectangle</span>(<span class="kw">const</span> string& c, <span class="kw">double</span> w, <span class="kw">double</span> h)
        : <span class="fn">Shape</span>(c), w(w), h(h) {}
    <span class="kw">double</span> <span class="fn">area</span>()      <span class="kw">const override</span> { <span class="kw">return</span> w * h; }
    <span class="kw">double</span> <span class="fn">perimeter</span>() <span class="kw">const override</span> { <span class="kw">return</span> <span class="num">2</span>*(w+h); }
    string <span class="fn">name</span>()      <span class="kw">const override</span> { <span class="kw">return</span> <span class="str">"Rectangle"</span>; }
};

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="cm">// Vector of BASE CLASS pointers — holds different derived types</span>
    vector&lt;Shape*&gt; shapes = {
        <span class="kw">new</span> <span class="fn">Circle</span>(<span class="str">"Red"</span>, <span class="num">5.0</span>),
        <span class="kw">new</span> <span class="fn">Rectangle</span>(<span class="str">"Blue"</span>, <span class="num">4.0</span>, <span class="num">6.0</span>),
        <span class="kw">new</span> <span class="fn">Circle</span>(<span class="str">"Green"</span>, <span class="num">3.0</span>),
    };

    <span class="kw">double</span> totalArea = <span class="num">0</span>;
    <span class="kw">for</span> (<span class="kw">const</span> Shape* s : shapes) {
        s-><span class="fn">describe</span>();     <span class="cm">// virtual dispatch: calls right subclass</span>
        totalArea += s-><span class="fn">area</span>();
    }
    cout << <span class="str">"Total area: "</span> << fixed << setprecision(<span class="num">2</span>) << totalArea << <span class="str">"\\n"</span>;

    <span class="cm">// IMPORTANT: delete heap-allocated objects to prevent memory leaks</span>
    <span class="kw">for</span> (<span class="kw">auto</span> s : shapes) <span class="kw">delete</span> s;
    <span class="kw">return</span> <span class="num">0</span>;
}` },
        { label: 'override and final keywords — safety nets', code: `<span class="kw">class</span> Animal {
<span class="kw">public</span>:
    <span class="kw">virtual</span> string <span class="fn">sound</span>() <span class="kw">const</span> { <span class="kw">return</span> <span class="str">"..."</span>; }
    <span class="kw">virtual</span> ~<span class="fn">Animal</span>() {}
};

<span class="kw">class</span> Dog : <span class="kw">public</span> Animal {
<span class="kw">public</span>:
    <span class="cm">// 'override' tells compiler to verify we're overriding a virtual method</span>
    <span class="cm">// Typo like "Soundd" becomes a compile error instead of silent bug</span>
    string <span class="fn">sound</span>() <span class="kw">const override</span> { <span class="kw">return</span> <span class="str">"Woof!"</span>; }
};

<span class="kw">class</span> Cat : <span class="kw">public</span> Animal {
<span class="kw">public</span>:
    <span class="cm">// 'final' — this override cannot be further overridden</span>
    string <span class="fn">sound</span>() <span class="kw">const override final</span> { <span class="kw">return</span> <span class="str">"Meow!"</span>; }
};

<span class="kw">int</span> <span class="fn">main</span>() {
    vector&lt;Animal*&gt; animals = { <span class="kw">new</span> <span class="fn">Dog</span>(), <span class="kw">new</span> <span class="fn">Cat</span>(), <span class="kw">new</span> <span class="fn">Dog</span>() };
    <span class="kw">for</span> (<span class="kw">auto</span> a : animals) cout << a-><span class="fn">sound</span>() << <span class="str">"\\n"</span>;
    <span class="kw">for</span> (<span class="kw">auto</span> a : animals) <span class="kw">delete</span> a;
}` },
      ],
      fact: 'The vtable (virtual function table) mechanism that C++ uses for polymorphism adds exactly one pointer-sized overhead per object (typically 8 bytes on 64-bit systems) and one indirect memory lookup per virtual function call. This tiny cost is why C++ game engines like Unreal can handle thousands of polymorphic game objects updating 60 times per second without performance issues.',
      history: null,
      quiz: { q: 'Why must base class destructors be declared "virtual" in C++?', opts: ['Virtual destructors run faster','Without virtual, deleting a derived class object through a base class pointer only calls the base destructor, potentially leaking the derived class\'s resources','Virtual makes the destructor callable from outside the class','It\'s just a C++ convention with no functional effect'], ans: 1 },
      challenge: { t: 'RPG Character Hierarchy', d: 'Build an abstract Character base class with: name, health (int), attackPower (int), virtual attack(Character& target), virtual defend(int damage), virtual string getType() const = 0, virtual void printStats() const. Create subclasses: Warrior (extra armour reduces damage by 30%), Mage (attacks hit all enemies, double damage), Healer (can heal self when below 50% health). Write a battle() function taking two Character* pointers and simulating 5 rounds, printing round-by-round status.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 4 — Templates and the STL
       ══════════════════════════════════════════════════════════ */
    {
      h: '🔧 Step 4 — Templates & the STL: C++\'s Generic Programming Power',
      p: `<strong>Templates</strong> are one of C++'s most powerful and unique features. They let you write code that works with <em>any type</em> — the compiler generates the specific version automatically. This is how <code>vector&lt;int&gt;</code>, <code>vector&lt;string&gt;</code>, and <code>vector&lt;YourClass&gt;</code> all exist without you writing three separate vector implementations.
<br><br>
<strong>The STL (Standard Template Library)</strong> is a massive collection of templates that comes with every C++ compiler. Its three pillars are:<br>
• <strong>Containers</strong> — data structures: <code>vector</code>, <code>map</code>, <code>set</code>, <code>queue</code>, <code>stack</code>, <code>list</code><br>
• <strong>Algorithms</strong> — operations on containers: <code>sort</code>, <code>find</code>, <code>count</code>, <code>accumulate</code>, <code>transform</code><br>
• <strong>Iterators</strong> — the glue between containers and algorithms
<br><br>
Knowing the STL well makes you dramatically more productive. Most C++ code you'll write in the real world uses STL containers rather than raw arrays.`,
      code: `#<span class="kw">include</span> <span class="str">&lt;iostream&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;vector&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;map&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;algorithm&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;numeric&gt;</span>
<span class="kw">using namespace</span> std;

<span class="cm">// Function template — works with int, double, string, anything comparable</span>
<span class="kw">template</span>&lt;<span class="kw">typename</span> T&gt;
T <span class="fn">findMax</span>(vector&lt;T&gt;& v) {
    <span class="kw">if</span> (v.<span class="fn">empty</span>()) <span class="kw">throw</span> runtime_error(<span class="str">"Empty vector"</span>);
    T maxVal = v[<span class="num">0</span>];
    <span class="kw">for</span> (<span class="kw">const</span> T& item : v)
        <span class="kw">if</span> (item > maxVal) maxVal = item;
    <span class="kw">return</span> maxVal;
}

<span class="kw">int</span> <span class="fn">main</span>() {
    vector&lt;<span class="kw">int</span>&gt;    ints    = {<span class="num">3</span>, <span class="num">1</span>, <span class="num">4</span>, <span class="num">1</span>, <span class="num">5</span>, <span class="num">9</span>, <span class="num">2</span>, <span class="num">6</span>};
    vector&lt;string&gt; words   = {<span class="str">"banana"</span>, <span class="str">"apple"</span>, <span class="str">"cherry"</span>};
    vector&lt;<span class="kw">double</span>&gt; doubles = {<span class="num">2.7</span>, <span class="num">3.14</span>, <span class="num">1.41</span>, <span class="num">1.73</span>};

    <span class="cm">// Same template, different types</span>
    cout << <span class="str">"Max int:    "</span> << <span class="fn">findMax</span>(ints)    << <span class="str">"\\n"</span>;  <span class="cm">// 9</span>
    cout << <span class="str">"Max string: "</span> << <span class="fn">findMax</span>(words)   << <span class="str">"\\n"</span>;  <span class="cm">// cherry</span>
    cout << <span class="str">"Max double: "</span> << <span class="fn">findMax</span>(doubles) << <span class="str">"\\n"</span>;  <span class="cm">// 3.14</span>

    <span class="cm">// STL algorithms</span>
    sort(ints.<span class="fn">begin</span>(), ints.<span class="fn">end</span>());             <span class="cm">// sort ascending</span>
    <span class="kw">int</span> total = accumulate(ints.<span class="fn">begin</span>(), ints.<span class="fn">end</span>(), <span class="num">0</span>);  <span class="cm">// sum</span>
    cout << <span class="str">"Sum: "</span> << total << <span class="str">"\\n"</span>;
}`,
      examples: [
        { label: 'std::map — key-value storage (sorted by key)', code: `#<span class="kw">include</span> <span class="str">&lt;iostream&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;map&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;string&gt;</span>
<span class="kw">using namespace</span> std;

<span class="kw">int</span> <span class="fn">main</span>() {
    map&lt;string, <span class="kw">int</span>&gt; scores;

    <span class="cm">// Insert entries</span>
    scores[<span class="str">"Amara"</span>] = <span class="num">94</span>;
    scores[<span class="str">"Kofi"</span>]  = <span class="num">87</span>;
    scores[<span class="str">"Zara"</span>]  = <span class="num">92</span>;
    scores.<span class="fn">insert</span>({<span class="str">"Liam"</span>, <span class="num">78</span>});

    <span class="cm">// Access</span>
    cout << scores[<span class="str">"Amara"</span>] << <span class="str">"\\n"</span>;   <span class="cm">// 94</span>

    <span class="cm">// Check if key exists</span>
    <span class="kw">if</span> (scores.<span class="fn">count</span>(<span class="str">"Kofi"</span>)) cout << <span class="str">"Kofi found\\n"</span>;

    <span class="cm">// Iterate (auto-sorted alphabetically by key)</span>
    <span class="kw">for</span> (<span class="kw">const</span> <span class="kw">auto</span>& [name, score] : scores) {  <span class="cm">// C++17 structured bindings</span>
        cout << left << setw(<span class="num">10</span>) << name << <span class="str">": "</span> << score << <span class="str">"\\n"</span>;
    }

    <span class="cm">// Update</span>
    scores[<span class="str">"Amara"</span>] = <span class="num">98</span>;
    scores.<span class="fn">erase</span>(<span class="str">"Liam"</span>);
    cout << <span class="str">"Size: "</span> << scores.<span class="fn">size</span>() << <span class="str">"\\n"</span>;
    <span class="kw">return</span> <span class="num">0</span>;
}` },
        { label: 'Lambda functions with STL algorithms', code: `#<span class="kw">include</span> <span class="str">&lt;iostream&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;vector&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;algorithm&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;numeric&gt;</span>
<span class="kw">using namespace</span> std;

<span class="kw">int</span> <span class="fn">main</span>() {
    vector&lt;<span class="kw">int</span>&gt; nums = {<span class="num">5</span>, <span class="num">2</span>, <span class="num">8</span>, <span class="num">1</span>, <span class="num">9</span>, <span class="num">3</span>, <span class="num">7</span>, <span class="num">4</span>, <span class="num">6</span>};

    <span class="cm">// sort with lambda comparator (descending)</span>
    sort(nums.<span class="fn">begin</span>(), nums.<span class="fn">end</span>(), [](<span class="kw">int</span> a, <span class="kw">int</span> b){ <span class="kw">return</span> a > b; });

    <span class="cm">// find_if — first element matching condition</span>
    <span class="kw">auto</span> it = find_if(nums.<span class="fn">begin</span>(), nums.<span class="fn">end</span>(), [](<span class="kw">int</span> n){ <span class="kw">return</span> n < <span class="num">4</span>; });
    <span class="kw">if</span> (it != nums.<span class="fn">end</span>()) cout << <span class="str">"First &lt;4: "</span> << *it << <span class="str">"\\n"</span>;

    <span class="cm">// count_if — count elements matching condition</span>
    <span class="kw">int</span> evens = count_if(nums.<span class="fn">begin</span>(), nums.<span class="fn">end</span>(), [](<span class="kw">int</span> n){ <span class="kw">return</span> n%<span class="num">2</span>==<span class="num">0</span>; });
    cout << <span class="str">"Even count: "</span> << evens << <span class="str">"\\n"</span>;

    <span class="cm">// transform — apply function to each element</span>
    vector&lt;<span class="kw">int</span>&gt; squared(nums.<span class="fn">size</span>());
    transform(nums.<span class="fn">begin</span>(), nums.<span class="fn">end</span>(), squared.<span class="fn">begin</span>(),
              [](<span class="kw">int</span> n){ <span class="kw">return</span> n*n; });

    cout << <span class="str">"Squares: "</span>;
    <span class="kw">for</span> (<span class="kw">auto</span> n : squared) cout << n << <span class="str">" "</span>;
    cout << <span class="str">"\\n"</span>;
    <span class="kw">return</span> <span class="num">0</span>;
}` },
      ],
      fact: 'C++ templates are so powerful that they are themselves Turing-complete — meaning you can theoretically do any computation purely in the type system at compile time. This technique, called "template metaprogramming," was accidentally discovered in the early 1990s. Libraries like Boost.MPL and Eigen use it to perform matrix algebra entirely at compile time, generating maximally optimised machine code.',
      history: null,
      quiz: { q: 'What is the purpose of a C++ template?', opts: ['To format HTML output','To write code once that works with any compatible type — the compiler generates the specific version for each type used','To import external libraries','To define the visual layout of a class'], ans: 1 },
      challenge: { t: 'Generic Sorted Container', d: 'Write a class template SortedList<T> that maintains a sorted vector<T> internally. Implement: insert(T value) keeping the list sorted (use lower_bound from <algorithm>), remove(T value), contains(T value) const, get(int index) const, size() const, print() const displaying all elements, and a template function statistics(SortedList<T>& list) that prints min, max, and (for numeric types) average. Test with int, double, and string.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 5 — Smart Pointers and Modern Memory Management
       ══════════════════════════════════════════════════════════ */
    {
      h: '🎯 Step 5 — Smart Pointers: Modern C++ Memory Management',
      p: `Raw pointers (<code>int* p = new int(42);</code>) give you full control but require manual <code>delete</code> — forget it and you have a memory leak; delete twice and you have undefined behaviour. <strong>Smart pointers</strong>, introduced in C++11, solve this completely: they automatically delete the managed object when it's no longer needed.
<br><br>
<strong>The three smart pointers:</strong><br>
• <code>unique_ptr&lt;T&gt;</code> — <strong>sole ownership</strong>. Exactly one unique_ptr owns the object. When the unique_ptr goes out of scope, the object is deleted. Cannot be copied — only moved. Use for most cases.<br>
• <code>shared_ptr&lt;T&gt;</code> — <strong>shared ownership</strong>. Multiple shared_ptrs can own the same object. Uses reference counting — when the count reaches 0, the object is deleted. Use when multiple owners genuinely needed.<br>
• <code>weak_ptr&lt;T&gt;</code> — <strong>non-owning observer</strong>. Points to a shared_ptr's object without owning it. Used to break circular references. Must be "locked" to access safely.
<br><br>
<strong>Modern C++ rule:</strong> Prefer smart pointers over raw <code>new</code>/<code>delete</code> in all new code. Raw pointers are still used for non-owning observation, C interop, and performance-critical low-level code.`,
      code: `#<span class="kw">include</span> <span class="str">&lt;iostream&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;memory&gt;</span>     <span class="cm">// unique_ptr, shared_ptr, make_unique, make_shared</span>
#<span class="kw">include</span> <span class="str">&lt;string&gt;</span>
<span class="kw">using namespace</span> std;

<span class="kw">class</span> Resource {
    string name;
<span class="kw">public</span>:
    <span class="fn">Resource</span>(<span class="kw">const</span> string& n) : name(n) {
        cout << <span class="str">"  + Resource '"</span> << name << <span class="str">"' created\\n"</span>;
    }
    ~<span class="fn">Resource</span>() { cout << <span class="str">"  - Resource '"</span> << name << <span class="str">"' destroyed\\n"</span>; }
    <span class="kw">void</span> <span class="fn">use</span>() { cout << <span class="str">"  Using: "</span> << name << <span class="str">"\\n"</span>; }
};

<span class="kw">int</span> <span class="fn">main</span>() {
    cout << <span class="str">"--- unique_ptr ---\\n"</span>;
    {
        <span class="kw">auto</span> p1 = make_unique&lt;Resource&gt;(<span class="str">"FileHandle"</span>);  <span class="cm">// prefer make_unique</span>
        p1-><span class="fn">use</span>();
        <span class="cm">// auto p2 = p1;  // ERROR: unique_ptr cannot be copied!</span>
        <span class="kw">auto</span> p2 = move(p1);   <span class="cm">// TRANSFER ownership: p1 now null</span>
        p2-><span class="fn">use</span>();
    }   <span class="cm">// p2 destroyed here → Resource auto-deleted ✅</span>

    cout << <span class="str">"\\n--- shared_ptr ---\\n"</span>;
    {
        <span class="kw">auto</span> sp1 = make_shared&lt;Resource&gt;(<span class="str">"SharedDB"</span>);   <span class="cm">// ref count = 1</span>
        {
            <span class="kw">auto</span> sp2 = sp1;    <span class="cm">// COPY: both own it, ref count = 2</span>
            cout << <span class="str">"  Count: "</span> << sp1.<span class="fn">use_count</span>() << <span class="str">"\\n"</span>;  <span class="cm">// 2</span>
            sp2-><span class="fn">use</span>();
        }   <span class="cm">// sp2 destroyed: ref count = 1 (object NOT deleted)</span>
        cout << <span class="str">"  Count: "</span> << sp1.<span class="fn">use_count</span>() << <span class="str">"\\n"</span>;  <span class="cm">// 1</span>
    }   <span class="cm">// sp1 destroyed: ref count = 0 → Resource deleted ✅</span>
    <span class="kw">return</span> <span class="num">0</span>;
}`,
      examples: [
        { label: 'Smart pointers with polymorphism', code: `#<span class="kw">include</span> <span class="str">&lt;memory&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;vector&gt;</span>
<span class="kw">using namespace</span> std;

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="cm">// Vector of unique_ptr to base class — no manual delete!</span>
    vector&lt;unique_ptr&lt;Shape&gt;&gt; shapes;

    shapes.<span class="fn">push_back</span>(make_unique&lt;Circle&gt;(<span class="str">"Red"</span>, <span class="num">5.0</span>));
    shapes.<span class="fn">push_back</span>(make_unique&lt;Rectangle&gt;(<span class="str">"Blue"</span>, <span class="num">3.0</span>, <span class="num">4.0</span>));
    shapes.<span class="fn">push_back</span>(make_unique&lt;Circle&gt;(<span class="str">"Green"</span>, <span class="num">2.5</span>));

    <span class="kw">double</span> totalArea = <span class="num">0</span>;
    <span class="kw">for</span> (<span class="kw">const</span> <span class="kw">auto</span>& s : shapes) {
        s-><span class="fn">describe</span>();
        totalArea += s-><span class="fn">area</span>();
    }
    cout << <span class="str">"Total: "</span> << fixed << setprecision(<span class="num">2</span>) << totalArea << <span class="str">"\\n"</span>;

    <span class="cm">// When 'shapes' goes out of scope, all unique_ptrs are destroyed,
    // which automatically calls delete on each Shape* — zero leaks!</span>
    <span class="kw">return</span> <span class="num">0</span>;
}` },
        { label: 'RAII — Resource Acquisition Is Initialisation', code: `<span class="cm">// RAII: tie resource lifetime to object lifetime</span>
<span class="cm">// When the object is created → acquire resource</span>
<span class="cm">// When the object is destroyed → release resource (in destructor)</span>
<span class="cm">// Smart pointers are RAII. So is ifstream, mutex, etc.</span>

#<span class="kw">include</span> <span class="str">&lt;fstream&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;stdexcept&gt;</span>

<span class="kw">class</span> SafeFile {
    ofstream file;
<span class="kw">public</span>:
    <span class="fn">SafeFile</span>(<span class="kw">const</span> string& name) : file(name) {
        <span class="kw">if</span> (!file) <span class="kw">throw</span> runtime_error(<span class="str">"Cannot open: "</span> + name);
        cout << <span class="str">"File opened\\n"</span>;
    }
    ~<span class="fn">SafeFile</span>() { file.<span class="fn">close</span>(); cout << <span class="str">"File closed\\n"</span>; }

    <span class="kw">void</span> <span class="fn">write</span>(<span class="kw">const</span> string& s) { file << s << <span class="str">"\\n"</span>; }
};

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">try</span> {
        SafeFile f(<span class="str">"output.txt"</span>);   <span class="cm">// opens file</span>
        f.<span class="fn">write</span>(<span class="str">"Hello from C++!"</span>);
        <span class="cm">// even if exception thrown here, destructor STILL closes file</span>
    } <span class="kw">catch</span> (<span class="kw">const</span> exception& e) {
        cerr << <span class="str">"Error: "</span> << e.<span class="fn">what</span>() << <span class="str">"\\n"</span>;
    }
    <span class="cm">// File is always closed when SafeFile goes out of scope</span>
}` },
      ],
      fact: 'Memory leaks in C++ caused some of the most expensive bugs in history. The Heartbleed vulnerability (2014) — a buffer over-read bug in OpenSSL\'s C code — exposed the private keys and personal data of millions of websites. Modern C++ with smart pointers and RAII makes entire categories of these bugs structurally impossible, which is why C++11 and beyond is a dramatically safer language than classic C++.',
      history: null,
      quiz: { q: 'What is the key difference between unique_ptr and shared_ptr?', opts: ['unique_ptr is faster but shared_ptr is safer','unique_ptr means exactly ONE owner (non-copyable, auto-deleted when owner destroyed); shared_ptr allows multiple owners via reference counting','shared_ptr can hold more data','unique_ptr only works with primitive types'], ans: 1 },
      challenge: { t: 'Smart Pointer Resource Manager', d: 'Build a NetworkConnection class (host: string, port: int, connected: bool) with RAII semantics (constructor connects, destructor disconnects, prints both). Write a ConnectionPool class holding vector<shared_ptr<NetworkConnection>>. Implement: acquire() returning a shared_ptr, release(shared_ptr) removing from pool, size() const, activeConnections() counting how many have use_count > 1. Demonstrate with 5 connections, sharing some between "client" code and verifying auto-release when scope ends.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 6 — Capstone: Game Entity System
       ══════════════════════════════════════════════════════════ */
    {
      h: '🏆 Step 6 — Capstone: Build a C++ Game Entity System',
      p: `Real game engines like Unreal Engine use exactly the patterns you've learned. Let's build a simplified but authentic <strong>Game Entity System</strong> — the core of any game engine — combining everything: classes with inheritance, virtual functions for polymorphism, templates for generic containers, smart pointers for memory safety, STL algorithms, and operator overloading.
<br><br>
<strong>What we're building:</strong><br>
A game world where different entity types (Player, Enemy, Projectile) coexist, update each frame, and interact — all managed through a base Entity class using C++'s most powerful features. This is directly how professional game engineers structure their code.`,
      code: `#<span class="kw">include</span> <span class="str">&lt;iostream&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;vector&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;memory&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;algorithm&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;string&gt;</span>
<span class="kw">using namespace</span> std;

<span class="kw">struct</span> Vec2 {
    <span class="kw">float</span> x, y;
    Vec2 <span class="kw">operator</span>+(<span class="kw">const</span> Vec2& o) <span class="kw">const</span> { <span class="kw">return</span> {x+o.x, y+o.y}; }
    Vec2 <span class="kw">operator</span>*(<span class="kw">float</span> s)      <span class="kw">const</span> { <span class="kw">return</span> {x*s,   y*s  }; }
    <span class="kw">float</span> <span class="fn">distanceTo</span>(<span class="kw">const</span> Vec2& o) <span class="kw">const</span> {
        <span class="kw">return</span> sqrt((x-o.x)*(x-o.x)+(y-o.y)*(y-o.y));
    }
    <span class="kw">friend</span> ostream& <span class="kw">operator</span><<(ostream& os, <span class="kw">const</span> Vec2& v) {
        <span class="kw">return</span> os << <span class="str">"("</span> << v.x << <span class="str">","</span> << v.y << <span class="str">")"</span>;
    }
};

<span class="kw">class</span> Entity {
<span class="kw">protected</span>:
    string name;
    Vec2   position;
    Vec2   velocity;
    <span class="kw">int</span>    health;
    <span class="kw">bool</span>   alive;

<span class="kw">public</span>:
    <span class="fn">Entity</span>(<span class="kw">const</span> string& n, Vec2 pos, <span class="kw">int</span> hp)
        : name(n), position(pos), velocity({<span class="num">0</span>,<span class="num">0</span>}), health(hp), alive(<span class="kw">true</span>) {}

    <span class="kw">virtual</span> ~<span class="fn">Entity</span>() {}
    <span class="kw">virtual void</span> <span class="fn">update</span>(<span class="kw">float</span> dt) = <span class="num">0</span>;   <span class="cm">// dt = delta time (seconds since last frame)</span>
    <span class="kw">virtual</span> string <span class="fn">getType</span>() <span class="kw">const</span> = <span class="num">0</span>;

    <span class="kw">void</span> <span class="fn">takeDamage</span>(<span class="kw">int</span> dmg) {
        health = max(<span class="num">0</span>, health - dmg);
        <span class="kw">if</span> (health == <span class="num">0</span>) { alive = <span class="kw">false</span>; cout << name << <span class="str">" defeated!\\n"</span>; }
    }

    Vec2   <span class="fn">getPos</span>()    <span class="kw">const</span> { <span class="kw">return</span> position; }
    string <span class="fn">getName</span>()  <span class="kw">const</span> { <span class="kw">return</span> name; }
    <span class="kw">int</span>    <span class="fn">getHealth</span>() <span class="kw">const</span> { <span class="kw">return</span> health; }
    <span class="kw">bool</span>   <span class="fn">isAlive</span>()   <span class="kw">const</span> { <span class="kw">return</span> alive; }

    <span class="kw">virtual void</span> <span class="fn">printStatus</span>() <span class="kw">const</span> {
        cout << <span class="str">"["</span> << <span class="fn">getType</span>() << <span class="str">"] "</span> << name
             << <span class="str">" HP:"</span> << health << <span class="str">" pos:"</span> << position << <span class="str">"\\n"</span>;
    }
};`,
      examples: [
        { label: 'Player and Enemy subclasses', code: `<span class="kw">class</span> Player : <span class="kw">public</span> Entity {
    <span class="kw">int</span>   score;
    <span class="kw">float</span> speed;
<span class="kw">public</span>:
    <span class="fn">Player</span>(<span class="kw">const</span> string& n, Vec2 pos)
        : <span class="fn">Entity</span>(n, pos, <span class="num">100</span>), score(<span class="num">0</span>), speed(<span class="num">3.0f</span>) {}

    <span class="kw">void</span> <span class="fn">update</span>(<span class="kw">float</span> dt) <span class="kw">override</span> {
        position = position + velocity * (speed * dt);
    }
    <span class="kw">void</span> <span class="fn">move</span>(Vec2 dir)   { velocity = dir; }
    <span class="kw">void</span> <span class="fn">addScore</span>(<span class="kw">int</span> s) { score += s; }
    string <span class="fn">getType</span>() <span class="kw">const override</span> { <span class="kw">return</span> <span class="str">"Player"</span>; }

    <span class="kw">void</span> <span class="fn">printStatus</span>() <span class="kw">const override</span> {
        Entity::<span class="fn">printStatus</span>();
        cout << <span class="str">"   Score: "</span> << score << <span class="str">"\\n"</span>;
    }
};

<span class="kw">class</span> Enemy : <span class="kw">public</span> Entity {
    <span class="kw">float</span> speed;
    Vec2  target;
<span class="kw">public</span>:
    <span class="fn">Enemy</span>(<span class="kw">const</span> string& n, Vec2 pos, Vec2 tgt, <span class="kw">int</span> hp=<span class="num">30</span>)
        : <span class="fn">Entity</span>(n, pos, hp), speed(<span class="num">1.5f</span>), target(tgt) {}

    <span class="kw">void</span> <span class="fn">update</span>(<span class="kw">float</span> dt) <span class="kw">override</span> {
        <span class="cm">// Move toward target</span>
        <span class="kw">float</span> dx = target.x - position.x;
        <span class="kw">float</span> dy = target.y - position.y;
        <span class="kw">float</span> dist = position.<span class="fn">distanceTo</span>(target);
        <span class="kw">if</span> (dist > <span class="num">0.5f</span>) {
            velocity = {dx/dist * speed, dy/dist * speed};
            position = position + velocity * dt;
        }
    }
    string <span class="fn">getType</span>() <span class="kw">const override</span> { <span class="kw">return</span> <span class="str">"Enemy"</span>; }
};` },
        { label: 'World class and game loop', code: `<span class="kw">class</span> GameWorld {
    vector&lt;unique_ptr&lt;Entity&gt;&gt; entities;
<span class="kw">public</span>:
    <span class="kw">template</span>&lt;<span class="kw">typename</span> T, <span class="kw">typename</span>... Args&gt;
    T* <span class="fn">spawn</span>(Args&&... args) {
        <span class="kw">auto</span> entity = make_unique&lt;T&gt;(forward&lt;Args&gt;(args)...);
        T* ptr = entity.<span class="fn">get</span>();
        entities.<span class="fn">push_back</span>(move(entity));
        cout << <span class="str">"Spawned: "</span> << ptr-><span class="fn">getName</span>() << <span class="str">"\\n"</span>;
        <span class="kw">return</span> ptr;
    }

    <span class="kw">void</span> <span class="fn">update</span>(<span class="kw">float</span> dt) {
        <span class="kw">for</span> (<span class="kw">auto</span>& e : entities) <span class="kw">if</span> (e-><span class="fn">isAlive</span>()) e-><span class="fn">update</span>(dt);
        <span class="cm">// Remove dead entities</span>
        entities.<span class="fn">erase</span>(
            remove_if(entities.<span class="fn">begin</span>(), entities.<span class="fn">end</span>(),
                      [](<span class="kw">const</span> <span class="kw">auto</span>& e){ <span class="kw">return</span> !e-><span class="fn">isAlive</span>(); }),
            entities.<span class="fn">end</span>());
    }

    <span class="kw">void</span> <span class="fn">printAll</span>() <span class="kw">const</span> {
        cout << <span class="str">"\\n=== WORLD STATE (" << entities.size() << " entities) ===\\n"</span>;
        <span class="kw">for</span> (<span class="kw">const</span> <span class="kw">auto</span>& e : entities) e-><span class="fn">printStatus</span>();
    }
};

<span class="kw">int</span> <span class="fn">main</span>() {
    GameWorld world;
    Player* hero = world.<span class="fn">spawn</span>&lt;Player&gt;(<span class="str">"Hero"</span>, Vec2{<span class="num">0</span>,<span class="num">0</span>});
    world.<span class="fn">spawn</span>&lt;Enemy&gt;(<span class="str">"Goblin1"</span>, Vec2{<span class="num">10</span>,<span class="num">5</span>},  Vec2{<span class="num">0</span>,<span class="num">0</span>});
    world.<span class="fn">spawn</span>&lt;Enemy&gt;(<span class="str">"Goblin2"</span>, Vec2{-<span class="num">8</span>,<span class="num">3</span>}, Vec2{<span class="num">0</span>,<span class="num">0</span>}, <span class="num">20</span>);

    <span class="cm">// Simulate 5 game frames</span>
    <span class="kw">for</span> (<span class="kw">int</span> frame = <span class="num">1</span>; frame <= <span class="num">5</span>; frame++) {
        cout << <span class="str">"\\n--- Frame "</span> << frame << <span class="str">" ---\\n"</span>;
        hero-><span class="fn">move</span>({<span class="num">1</span>,<span class="num">0</span>});
        world.<span class="fn">update</span>(<span class="num">0.016f</span>);   <span class="cm">// ~60fps</span>
    }
    world.<span class="fn">printAll</span>();
    <span class="kw">return</span> <span class="num">0</span>;
}` },
      ],
      fact: 'The Entity-Component-System (ECS) architecture used in real game engines like Unity and Unreal is a direct evolution of the class hierarchy you just built. Epic Games\' Unreal Engine 5 — which runs Fortnite (350 million players) — is approximately 3 million lines of C++ that use exactly these patterns at massive scale. The C++ you learned in this course is the same C++ that powers the world\'s most demanding real-time applications.',
      history: null,
      quiz: { q: 'Why does the GameWorld use vector<unique_ptr<Entity>> rather than vector<Entity>?', opts: ['unique_ptr is faster than Entity','Storing Entity directly would slice away the derived class data; pointers allow polymorphism. unique_ptr ensures automatic memory cleanup when entities are removed','Entity objects are too large to store directly','unique_ptr is required by the STL'], ans: 1 },
      challenge: { t: 'CAPSTONE — Complete C++ Game Simulation', d: `Extend the game entity system to: (1) Add a Projectile class (moves in straight line, expires after 2 seconds, damages first Enemy within 0.5 units each frame). (2) Add Player::shoot(Vec2 direction) that spawns a Projectile. (3) Add collision detection in GameWorld::update() — if a Projectile hits an Enemy, deal 25 damage and destroy the projectile. (4) Add a scoring system on Player that awards 100 points per enemy defeated. (5) Add a Powerup class that heals the Player 30 HP when within 1.0 units. (6) Simulate 20 frames with at least 3 enemies, 2 powerups, and show round-by-round state. All memory managed with smart pointers — zero raw new/delete calls.` },
    },
  ],
};
