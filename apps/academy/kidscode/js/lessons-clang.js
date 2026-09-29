T21.lessons.clang = {
  title: 'C Programming', banner: 'clang',
  subtitle: 'The language that runs operating systems, game engines, and every embedded device on Earth.',
  steps: [

    /* ══════════════════════════════════════════════════════════
       STEP 1 — Why C, How Compilation Works, First Program
       ══════════════════════════════════════════════════════════ */
    {
      h: '⚙️ Step 1 — Why Learn C? How Compilation Works & Your First Program',
      p: `C is the most influential programming language ever created. Python, Java, JavaScript, Swift, Go — they all borrowed ideas from C. Linux (which runs 96% of the world's servers), macOS internals, Windows kernel, Android, every embedded chip in your microwave, car, or pacemaker — C runs it all.
<br><br>
<strong>Why C is different from Python:</strong><br>
Python is <em>interpreted</em> — an interpreter reads your code and runs it line by line each time. C is <em>compiled</em> — a <strong>compiler</strong> translates your entire C source code into native machine instructions <em>once</em>, producing an executable binary that the CPU runs directly. This is why C programs run 10–100× faster than equivalent Python programs.
<br><br>
<strong>The compilation process:</strong><br>
<code>source.c</code> → (compiler: gcc/clang) → <code>source.o</code> → (linker) → <code>executable</code><br>
<br>
<strong>The anatomy of a C program:</strong><br>
Every C program must have exactly one <code>main()</code> function — that's where execution begins. <code>#include</code> directives import library headers. <code>return 0</code> at the end of main tells the OS "this program finished successfully."`,
      code: `<span class="cm">/* My first C program — every part explained */</span>

#<span class="kw">include</span> <span class="str">&lt;stdio.h&gt;</span>   <span class="cm">/* Standard I/O: gives us printf, scanf */</span>
#<span class="kw">include</span> <span class="str">&lt;stdlib.h&gt;</span>  <span class="cm">/* Standard Library: memory, exit, random */</span>
#<span class="kw">include</span> <span class="str">&lt;string.h&gt;</span>  <span class="cm">/* String functions: strlen, strcpy, strcmp */</span>

<span class="cm">/* Every C program starts in main() */</span>
<span class="kw">int</span> <span class="fn">main</span>(<span class="kw">void</span>) {

    <span class="cm">/* printf: formatted print
       %d = integer, %f = float, %s = string, %c = char
       \\n = newline, \\t = tab */</span>
    <span class="fn">printf</span>(<span class="str">"Hello, World!\\n"</span>);
    <span class="fn">printf</span>(<span class="str">"I am learning C programming!\\n"</span>);

    <span class="cm">/* Print different types with format specifiers */</span>
    <span class="fn">printf</span>(<span class="str">"Integer: %d\\n"</span>,     <span class="num">42</span>);
    <span class="fn">printf</span>(<span class="str">"Float:   %.2f\\n"</span>,   <span class="num">3.14159</span>);   <span class="cm">/* .2 = 2 decimal places */</span>
    <span class="fn">printf</span>(<span class="str">"String:  %s\\n"</span>,     <span class="str">"Team21"</span>);
    <span class="fn">printf</span>(<span class="str">"Char:    %c\\n"</span>,     <span class="str">'A'</span>);

    <span class="kw">return</span> <span class="num">0</span>;   <span class="cm">/* 0 = success (any other value = error code) */</span>
}`,
      examples: [
        { label: 'Compiling and running on the command line', code: `<span class="cm">/* Save your code as hello.c, then in terminal: */</span>

<span class="cm">/* Compile: */</span>
<span class="cm">// gcc -Wall -Wextra -o hello hello.c</span>
<span class="cm">//   -Wall        = show all warnings (ALWAYS use this!)</span>
<span class="cm">//   -Wextra      = show extra warnings</span>
<span class="cm">//   -o hello     = name the output "hello"</span>
<span class="cm">//   hello.c      = your source file</span>

<span class="cm">/* Run: */</span>
<span class="cm">// ./hello       (Linux/Mac)</span>
<span class="cm">// hello.exe     (Windows)</span>

<span class="cm">/* Common compiler errors you'll see:
   error: expected ';' before '}'     → you forgot a semicolon
   error: undeclared identifier 'x'  → variable not declared
   warning: unused variable 'y'      → declared but never used
   Segmentation fault (runtime)      → you accessed invalid memory */</span>` },
        { label: 'printf format specifiers in detail', code: `#<span class="kw">include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>(<span class="kw">void</span>) {
    <span class="kw">int</span>    age    = <span class="num">17</span>;
    <span class="kw">double</span> pi     = <span class="num">3.14159265</span>;
    <span class="kw">char</span>   grade  = <span class="str">'A'</span>;
    <span class="kw">char</span>   name[] = <span class="str">"Amara"</span>;

    <span class="fn">printf</span>(<span class="str">"%d years old\\n"</span>,         age);       <span class="cm">/* 17 */</span>
    <span class="fn">printf</span>(<span class="str">"%05d padded\\n"</span>,           age);       <span class="cm">/* 00017 (zero-padded width 5) */</span>
    <span class="fn">printf</span>(<span class="str">"%.4f\\n"</span>,                  pi);        <span class="cm">/* 3.1416 (4 decimal places) */</span>
    <span class="fn">printf</span>(<span class="str">"%10.2f\\n"</span>,               pi);        <span class="cm">/* "      3.14" (right-aligned) */</span>
    <span class="fn">printf</span>(<span class="str">"%-10s|\\n"</span>,               name);      <span class="cm">/* "Amara     |" (left-aligned) */</span>
    <span class="fn">printf</span>(<span class="str">"Grade: %c (ASCII %d)\\n"</span>,  grade, grade); <span class="cm">/* Grade: A (ASCII 65) */</span>
    <span class="fn">printf</span>(<span class="str">"Octal: %o  Hex: %x\\n"</span>,   <span class="num">255</span>, <span class="num">255</span>);  <span class="cm">/* Octal: 377  Hex: ff */</span>

    <span class="kw">return</span> <span class="num">0</span>;
}` },
      ],
      fact: 'Dennis Ritchie and Brian Kernighan wrote the book "The C Programming Language" in 1978. It\'s still in print and still used in universities. The tradition of writing "Hello, World!" as the first program in any language came from this very book — one of the most impactful books in computing history.',
      history: 'c_unix',
      quiz: { q: 'What is the key difference between compiled (C) and interpreted (Python) languages?', opts: ['Compiled languages are always harder to learn','Compiled languages translate code to machine instructions once; interpreted languages translate line-by-line each run — making compiled code much faster at runtime','Interpreted languages cannot use loops','Compiled languages can only run on Windows'], ans: 1 },
      challenge: { t: 'Formatted Report Card', d: 'Write a C program that uses printf to print a formatted student report card. Include: a boxed header with = symbols, student name and ID with padding, 4 subjects with scores formatted to exactly 2 decimal places, the average score, and a letter grade. Use %-15s for left-aligned labels and %6.2f for right-aligned scores.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 2 — Variables, Data Types & Operators
       ══════════════════════════════════════════════════════════ */
    {
      h: '🗃️ Step 2 — Variables, Data Types, Operators & scanf',
      p: `C is a <strong>statically typed</strong> language — you must declare the exact type of every variable before using it. The compiler needs to know exactly how much memory to allocate and what operations are valid. This strictness is what makes C fast and predictable.
<br><br>
<strong>The fundamental C data types and their sizes:</strong><br>
• <code>char</code> — 1 byte. Stores a single character OR a small integer (-128 to 127)<br>
• <code>int</code> — 4 bytes on modern systems. Whole numbers (-2,147,483,648 to 2,147,483,647)<br>
• <code>long</code> — 8 bytes. Larger whole numbers<br>
• <code>float</code> — 4 bytes. Decimal numbers (~7 significant digits)<br>
• <code>double</code> — 8 bytes. Higher precision decimals (~15 significant digits) — <strong>prefer this over float</strong><br>
• <code>unsigned int</code> — no negative values, so doubles the positive range<br>
<br>
<strong>scanf</strong> reads user input — the <code>&</code> (ampersand) before variable names is <em>required</em>: it passes the variable's memory address so scanf knows WHERE to store the value.`,
      code: `#<span class="kw">include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>(<span class="kw">void</span>) {
    <span class="cm">/* Declaration — tell compiler the type BEFORE using */</span>
    <span class="kw">int</span>    age;
    <span class="kw">double</span> height;
    <span class="kw">char</span>   initial;
    <span class="kw">char</span>   name[<span class="num">50</span>];    <span class="cm">/* char array = string, max 49 chars + null */</span>

    <span class="cm">/* Or declare and initialise in one line: */</span>
    <span class="kw">int</span>    year         = <span class="num">2025</span>;
    <span class="kw">double</span> temperature  = <span class="num">36.6</span>;
    <span class="kw">char</span>   grade        = <span class="str">'A'</span>;

    <span class="cm">/* Reading user input with scanf */</span>
    <span class="fn">printf</span>(<span class="str">"Enter your age: "</span>);
    <span class="fn">scanf</span>(<span class="str">"%d"</span>, &age);         <span class="cm">/* & = "address of" — required! */</span>

    <span class="fn">printf</span>(<span class="str">"Enter your height (m): "</span>);
    <span class="fn">scanf</span>(<span class="str">"%lf"</span>, &height);     <span class="cm">/* %lf for double (not %f!) */</span>

    <span class="fn">printf</span>(<span class="str">"Enter your first initial: "</span>);
    <span class="fn">scanf</span>(<span class="str">" %c"</span>, &initial);    <span class="cm">/* space before %c skips whitespace */</span>

    <span class="fn">printf</span>(<span class="str">"Age: %d, Height: %.1fm, Initial: %c\\n"</span>,
           age, height, initial);
    <span class="kw">return</span> <span class="num">0</span>;
}`,
      examples: [
        { label: 'Arithmetic operators and type conversion', code: `#<span class="kw">include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>(<span class="kw">void</span>) {
    <span class="kw">int</span> a = <span class="num">17</span>, b = <span class="num">5</span>;

    <span class="fn">printf</span>(<span class="str">"a + b = %d\\n"</span>,   a + b);    <span class="cm">/* 22 */</span>
    <span class="fn">printf</span>(<span class="str">"a - b = %d\\n"</span>,   a - b);    <span class="cm">/* 12 */</span>
    <span class="fn">printf</span>(<span class="str">"a * b = %d\\n"</span>,   a * b);    <span class="cm">/* 85 */</span>
    <span class="fn">printf</span>(<span class="str">"a / b = %d\\n"</span>,   a / b);    <span class="cm">/* 3  — INTEGER division! */</span>
    <span class="fn">printf</span>(<span class="str">"a %% b = %d\\n"</span>,  a % b);    <span class="cm">/* 2  — remainder (modulo) */</span>

    <span class="cm">/* CRITICAL: integer division truncates the decimal! */</span>
    <span class="fn">printf</span>(<span class="str">"17/5 as int:    %d\\n"</span>, <span class="num">17</span> / <span class="num">5</span>);          <span class="cm">/* 3 */</span>
    <span class="fn">printf</span>(<span class="str">"17/5 as double: %.4f\\n"</span>, (<span class="kw">double</span>)<span class="num">17</span> / <span class="num">5</span>);  <span class="cm">/* 3.4000 */</span>
    <span class="cm">/*   ↑ (double) is a CAST — converts 17 to 17.0 before dividing */</span>

    <span class="cm">/* Assignment operators */</span>
    <span class="kw">int</span> x = <span class="num">10</span>;
    x += <span class="num">3</span>;    <span class="cm">/* x = x + 3  → 13 */</span>
    x -= <span class="num">2</span>;    <span class="cm">/* x = x - 2  → 11 */</span>
    x *= <span class="num">2</span>;    <span class="cm">/* x = x * 2  → 22 */</span>
    x /= <span class="num">4</span>;    <span class="cm">/* x = x / 4  → 5  */</span>
    x++;       <span class="cm">/* x = x + 1  → 6  */</span>
    <span class="fn">printf</span>(<span class="str">"x = %d\\n"</span>, x);
    <span class="kw">return</span> <span class="num">0</span>;
}` },
        { label: 'sizeof — understanding memory', code: `#<span class="kw">include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>(<span class="kw">void</span>) {
    <span class="cm">/* sizeof tells you exactly how many bytes a type uses */</span>
    <span class="fn">printf</span>(<span class="str">"sizeof(char)          = %zu bytes\\n"</span>, <span class="kw">sizeof</span>(<span class="kw">char</span>));
    <span class="fn">printf</span>(<span class="str">"sizeof(int)           = %zu bytes\\n"</span>, <span class="kw">sizeof</span>(<span class="kw">int</span>));
    <span class="fn">printf</span>(<span class="str">"sizeof(long)          = %zu bytes\\n"</span>, <span class="kw">sizeof</span>(<span class="kw">long</span>));
    <span class="fn">printf</span>(<span class="str">"sizeof(float)         = %zu bytes\\n"</span>, <span class="kw">sizeof</span>(<span class="kw">float</span>));
    <span class="fn">printf</span>(<span class="str">"sizeof(double)        = %zu bytes\\n"</span>, <span class="kw">sizeof</span>(<span class="kw">double</span>));

    <span class="cm">/* This is WHY C is fast and memory-efficient:
       you control exactly how much memory every variable uses.
       Python hides this from you (and uses much more memory). */</span>

    <span class="kw">char</span>   name[<span class="num">50</span>] = <span class="str">"Amara"</span>;
    <span class="fn">printf</span>(<span class="str">"Array of 50 chars = %zu bytes\\n"</span>, <span class="kw">sizeof</span>(name));  <span class="cm">/* 50 */</span>
    <span class="kw">return</span> <span class="num">0</span>;
}` },
      ],
      fact: 'C was created in 1972 by Dennis Ritchie specifically to rewrite the UNIX operating system. Before C, OS code had to be written in assembly language, which was tied to one specific machine. C let UNIX run on any hardware — arguably the most important software engineering decision ever made.',
      history: 'c_kr_book',
      quiz: { q: 'What is the result of 17 / 5 in C when both are integers?', opts: ['3.4','3.40','3','Error'], ans: 2 },
      challenge: { t: 'BMI and Fitness Calculator', d: 'Write a C program that reads weight (kg) and height (m) using scanf. Calculate: BMI (weight / height²), category (Underweight <18.5, Normal 18.5-24.9, Overweight 25-29.9, Obese ≥30), and ideal weight range. Use proper casting to get decimal division. Format all output with aligned columns using printf field widths.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 3 — Control Flow: if/else, switch, loops
       ══════════════════════════════════════════════════════════ */
    {
      h: '🔀 Step 3 — Control Flow: if/else, switch & All Three Loop Types',
      p: `C has the same control flow ideas as Python but with different syntax — and one powerful extra: the <strong>switch statement</strong>, which is cleaner than long if/else chains when comparing one variable to multiple fixed values.
<br><br>
<strong>C's three loop types:</strong><br>
• <code>for</code> — best when you know the count in advance<br>
• <code>while</code> — best when you loop until a condition changes<br>
• <code>do-while</code> — like while, but <em>always runs at least once</em> (great for menus!)
<br><br>
<strong>Critical C syntax rules vs Python:</strong><br>
• Conditions use <code>( )</code> parentheses: <code>if (x > 5)</code> not <code>if x > 5</code><br>
• Code blocks use <code>{ }</code> curly braces, NOT indentation<br>
• Every statement ends with <code>;</code> — forgetting this is the #1 beginner error<br>
• <code>&&</code> means "and", <code>||</code> means "or", <code>!</code> means "not"`,
      code: `#<span class="kw">include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>(<span class="kw">void</span>) {
    <span class="kw">int</span> score = <span class="num">82</span>;
    <span class="kw">char</span> grade;

    <span class="cm">/* if / else if / else */</span>
    <span class="kw">if</span> (score >= <span class="num">90</span>)       grade = <span class="str">'A'</span>;
    <span class="kw">else if</span> (score >= <span class="num">80</span>) grade = <span class="str">'B'</span>;
    <span class="kw">else if</span> (score >= <span class="num">70</span>) grade = <span class="str">'C'</span>;
    <span class="kw">else if</span> (score >= <span class="num">60</span>) grade = <span class="str">'D'</span>;
    <span class="kw">else</span>                    grade = <span class="str">'F'</span>;
    <span class="fn">printf</span>(<span class="str">"Score %d → Grade %c\\n"</span>, score, grade);

    <span class="cm">/* switch — clean for matching one variable to many values */</span>
    <span class="kw">switch</span> (grade) {
        <span class="kw">case</span> <span class="str">'A'</span>: <span class="fn">printf</span>(<span class="str">"Outstanding!\\n"</span>); <span class="kw">break</span>;
        <span class="kw">case</span> <span class="str">'B'</span>: <span class="fn">printf</span>(<span class="str">"Great work!\\n"</span>);   <span class="kw">break</span>;
        <span class="kw">case</span> <span class="str">'C'</span>: <span class="fn">printf</span>(<span class="str">"Good effort!\\n"</span>);  <span class="kw">break</span>;
        <span class="kw">case</span> <span class="str">'D'</span>: <span class="fn">printf</span>(<span class="str">"Keep trying!\\n"</span>);  <span class="kw">break</span>;
        <span class="kw">default</span>:  <span class="fn">printf</span>(<span class="str">"Need to resit.\\n"</span>); <span class="kw">break</span>;
        <span class="cm">/* break is CRITICAL — without it, execution falls through! */</span>
    }
    <span class="kw">return</span> <span class="num">0</span>;
}`,
      examples: [
        { label: 'All three loop types compared', code: `#<span class="kw">include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>(<span class="kw">void</span>) {
    <span class="cm">/* for loop — when you know the count */</span>
    <span class="fn">printf</span>(<span class="str">"for loop:    "</span>);
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">1</span>; i <= <span class="num">5</span>; i++) {
        <span class="fn">printf</span>(<span class="str">"%d "</span>, i);
    }
    <span class="fn">printf</span>(<span class="str">"\\n"</span>);   <span class="cm">/* 1 2 3 4 5 */</span>

    <span class="cm">/* while loop — when condition controls repetition */</span>
    <span class="fn">printf</span>(<span class="str">"while loop:  "</span>);
    <span class="kw">int</span> n = <span class="num">1</span>;
    <span class="kw">while</span> (n <= <span class="num">5</span>) {
        <span class="fn">printf</span>(<span class="str">"%d "</span>, n);
        n++;
    }
    <span class="fn">printf</span>(<span class="str">"\\n"</span>);

    <span class="cm">/* do-while — ALWAYS runs at least once, then checks condition */</span>
    <span class="fn">printf</span>(<span class="str">"do-while:    "</span>);
    <span class="kw">int</span> m = <span class="num">1</span>;
    <span class="kw">do</span> {
        <span class="fn">printf</span>(<span class="str">"%d "</span>, m);
        m++;
    } <span class="kw">while</span> (m <= <span class="num">5</span>);
    <span class="fn">printf</span>(<span class="str">"\\n"</span>);

    <span class="cm">/* Nested loops: times table */</span>
    <span class="fn">printf</span>(<span class="str">"\\n5x5 Table:\\n"</span>);
    <span class="kw">for</span> (<span class="kw">int</span> row = <span class="num">1</span>; row <= <span class="num">5</span>; row++) {
        <span class="kw">for</span> (<span class="kw">int</span> col = <span class="num">1</span>; col <= <span class="num">5</span>; col++) {
            <span class="fn">printf</span>(<span class="str">"%4d"</span>, row * col);
        }
        <span class="fn">printf</span>(<span class="str">"\\n"</span>);
    }
    <span class="kw">return</span> <span class="num">0</span>;
}` },
        { label: 'switch fall-through — a powerful but dangerous C feature', code: `#<span class="kw">include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>(<span class="kw">void</span>) {
    <span class="kw">int</span> month = <span class="num">4</span>;   <span class="cm">/* April */</span>
    <span class="kw">int</span> days;

    <span class="kw">switch</span> (month) {
        <span class="kw">case</span> <span class="num">1</span>: <span class="kw">case</span> <span class="num">3</span>: <span class="kw">case</span> <span class="num">5</span>: <span class="kw">case</span> <span class="num">7</span>:
        <span class="kw">case</span> <span class="num">8</span>: <span class="kw">case</span> <span class="num">10</span>: <span class="kw">case</span> <span class="num">12</span>:
            days = <span class="num">31</span>;   <span class="cm">/* intentional fall-through: these cases share a result */</span>
            <span class="kw">break</span>;
        <span class="kw">case</span> <span class="num">4</span>: <span class="kw">case</span> <span class="num">6</span>: <span class="kw">case</span> <span class="num">9</span>: <span class="kw">case</span> <span class="num">11</span>:
            days = <span class="num">30</span>;
            <span class="kw">break</span>;
        <span class="kw">case</span> <span class="num">2</span>:
            days = <span class="num">28</span>;   <span class="cm">/* simplified: ignoring leap year */</span>
            <span class="kw">break</span>;
        <span class="kw">default</span>:
            <span class="fn">printf</span>(<span class="str">"Invalid month!\\n"</span>);
            <span class="kw">return</span> <span class="num">1</span>;   <span class="cm">/* non-zero return = error */</span>
    }
    <span class="fn">printf</span>(<span class="str">"Month %d has %d days.\\n"</span>, month, days);
    <span class="kw">return</span> <span class="num">0</span>;
}` },
      ],
      fact: 'The "fall-through" behaviour in C\'s switch statement (where execution continues into the next case if you forget break) has been the source of famous bugs. The Apple "goto fail" SSL security vulnerability in 2014 was caused by an accidentally duplicated goto statement — a single line that let attackers intercept "secure" connections for millions of users.',
      history: 'bug_moth',
      quiz: { q: 'Why is the "break" statement critical inside a switch case in C?', opts: ['It makes the code run faster','Without break, execution falls through and runs the next case\'s code even if it doesn\'t match','It is required by the C compiler','It prevents the program from crashing'], ans: 1 },
      challenge: { t: 'Text-Based Menu System', d: 'Build a calculator with a do-while menu loop that: displays options (1. Add, 2. Subtract, 3. Multiply, 4. Divide, 5. Exit), reads two numbers with scanf, uses switch to perform the correct operation, prints the result formatted to 4 decimal places, handles division by zero with an error message, and loops back to the menu until the user selects Exit. This is the standard pattern for all interactive C programs.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 4 — Arrays and Strings
       ══════════════════════════════════════════════════════════ */
    {
      h: '📦 Step 4 — Arrays and Strings: C\'s Way of Handling Collections',
      p: `C arrays are fixed-size collections of elements of the <em>same type</em>, stored in <strong>contiguous (side-by-side) memory</strong>. This is fundamentally different from Python lists which can grow, shrink, and hold mixed types. C's approach is rigid but extremely fast — the CPU can load multiple array elements in a single memory access.
<br><br>
<strong>Strings in C are arrays of char.</strong> This is the biggest conceptual leap from Python, where strings are a built-in type with methods. In C, a string is just a <code>char</code> array that ends with a special null terminator character <code>\\0</code> (ASCII value 0). Every string operation (copy, compare, find length) requires a library function from <code>&lt;string.h&gt;</code>.
<br><br>
<strong>Array indexing starts at 0</strong> — just like Python. But C will <em>not</em> protect you from going out of bounds. Accessing <code>arr[10]</code> when the array only has 5 elements doesn't crash immediately — it reads whatever memory happens to be there, causing subtle, dangerous bugs. This is why C requires discipline.`,
      code: `#<span class="kw">include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>(<span class="kw">void</span>) {
    <span class="cm">/* Declare and initialise an int array */</span>
    <span class="kw">int</span> scores[<span class="num">6</span>] = {<span class="num">92</span>, <span class="num">87</span>, <span class="num">95</span>, <span class="num">78</span>, <span class="num">100</span>, <span class="num">63</span>};
    <span class="kw">int</span> count = <span class="kw">sizeof</span>(scores) / <span class="kw">sizeof</span>(scores[<span class="num">0</span>]);  <span class="cm">/* = 6 */</span>

    <span class="cm">/* Access by index: */</span>
    <span class="fn">printf</span>(<span class="str">"First: %d, Last: %d\\n"</span>, scores[<span class="num">0</span>], scores[count-<span class="num">1</span>]);

    <span class="cm">/* Loop over all elements: */</span>
    <span class="kw">int</span> total = <span class="num">0</span>, max = scores[<span class="num">0</span>], min = scores[<span class="num">0</span>];
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i < count; i++) {
        total += scores[i];
        <span class="kw">if</span> (scores[i] > max) max = scores[i];
        <span class="kw">if</span> (scores[i] < min) min = scores[i];
    }
    <span class="fn">printf</span>(<span class="str">"Sum=%d  Avg=%.1f  Max=%d  Min=%d\\n"</span>,
           total, (<span class="kw">double</span>)total/count, max, min);
    <span class="kw">return</span> <span class="num">0</span>;
}`,
      examples: [
        { label: 'Strings in C — char arrays with null terminator', code: `#<span class="kw">include</span> <span class="str">&lt;stdio.h&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;string.h&gt;</span>   <span class="cm">/* strlen, strcpy, strcat, strcmp */</span>

<span class="kw">int</span> <span class="fn">main</span>(<span class="kw">void</span>) {
    <span class="kw">char</span> first[<span class="num">20</span>] = <span class="str">"Amara"</span>;
    <span class="kw">char</span> last[<span class="num">20</span>]  = <span class="str">"Nkosi"</span>;
    <span class="kw">char</span> full[<span class="num">50</span>];   <span class="cm">/* must be large enough! */</span>

    <span class="cm">/* strlen — length (NOT including \\0) */</span>
    <span class="fn">printf</span>(<span class="str">"Length: %zu\\n"</span>, <span class="fn">strlen</span>(first));   <span class="cm">/* 5 */</span>

    <span class="cm">/* strcpy — copy a string (cannot use = !) */</span>
    <span class="fn">strcpy</span>(full, first);
    <span class="fn">printf</span>(<span class="str">"After strcpy: %s\\n"</span>, full);       <span class="cm">/* Amara */</span>

    <span class="cm">/* strcat — concatenate (append) */</span>
    <span class="fn">strcat</span>(full, <span class="str">" "</span>);
    <span class="fn">strcat</span>(full, last);
    <span class="fn">printf</span>(<span class="str">"Full name: %s\\n"</span>, full);          <span class="cm">/* Amara Nkosi */</span>

    <span class="cm">/* strcmp — compare (0 = equal, negative = first<second) */</span>
    <span class="fn">printf</span>(<span class="str">"Compare: %d\\n"</span>, <span class="fn">strcmp</span>(<span class="str">"abc"</span>, <span class="str">"abc"</span>));  <span class="cm">/* 0 */</span>
    <span class="fn">printf</span>(<span class="str">"Compare: %d\\n"</span>, <span class="fn">strcmp</span>(<span class="str">"abc"</span>, <span class="str">"abd"</span>));  <span class="cm">/* negative */</span>

    <span class="cm">/* Read a string with spaces using fgets (safer than scanf) */</span>
    <span class="kw">char</span> input[<span class="num">100</span>];
    <span class="fn">printf</span>(<span class="str">"Enter your full name: "</span>);
    <span class="fn">fgets</span>(input, <span class="kw">sizeof</span>(input), stdin);
    <span class="fn">printf</span>(<span class="str">"You entered: %s"</span>, input);
    <span class="kw">return</span> <span class="num">0</span>;
}` },
        { label: '2D arrays — tables and matrices', code: `#<span class="kw">include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>(<span class="kw">void</span>) {
    <span class="cm">/* 2D array: 3 rows, 4 columns */</span>
    <span class="kw">int</span> grid[<span class="num">3</span>][<span class="num">4</span>] = {
        {<span class="num">1</span>,  <span class="num">2</span>,  <span class="num">3</span>,  <span class="num">4</span>},   <span class="cm">/* row 0 */</span>
        {<span class="num">5</span>,  <span class="num">6</span>,  <span class="num">7</span>,  <span class="num">8</span>},   <span class="cm">/* row 1 */</span>
        {<span class="num">9</span>, <span class="num">10</span>, <span class="num">11</span>, <span class="num">12</span>}    <span class="cm">/* row 2 */</span>
    };

    <span class="cm">/* Access: grid[row][column] */</span>
    <span class="fn">printf</span>(<span class="str">"grid[1][2] = %d\\n"</span>, grid[<span class="num">1</span>][<span class="num">2</span>]);  <span class="cm">/* 7 */</span>

    <span class="cm">/* Print entire grid with nested loops */</span>
    <span class="kw">for</span> (<span class="kw">int</span> r = <span class="num">0</span>; r < <span class="num">3</span>; r++) {
        <span class="kw">for</span> (<span class="kw">int</span> c = <span class="num">0</span>; c < <span class="num">4</span>; c++) {
            <span class="fn">printf</span>(<span class="str">"%4d"</span>, grid[r][c]);
        }
        <span class="fn">printf</span>(<span class="str">"\\n"</span>);
    }
    <span class="kw">return</span> <span class="num">0</span>;
}` },
      ],
      fact: 'Because C strings are just arrays of characters with a null terminator, the classic "buffer overflow" vulnerability occurs when you write more data into a char array than it can hold, overwriting adjacent memory. This was the mechanism behind some of history\'s most devastating security exploits, including the 1988 Morris Worm that took down 10% of the early internet.',
      history: null,
      quiz: { q: 'Why can\'t you use "==" to compare two strings in C like you can in Python?', opts: ['C doesn\'t support equality checking','In C, a string is just a pointer/array — == compares memory addresses, not content. You must use strcmp()','C strings are always equal to each other','You can use == but only for short strings'], ans: 1 },
      challenge: { t: 'Student Grade Database', d: 'Create parallel arrays: char names[5][30], int scores[5][3] (3 scores per student). Fill them with 5 students. Write loops to calculate each student\'s average, find the class top scorer by name, count how many students passed (average ≥ 60), and print a formatted table with: Name | Score1 | Score2 | Score3 | Average | Grade. Use proper field widths.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 5 — Functions: Declaration, Definition, Scope
       ══════════════════════════════════════════════════════════ */
    {
      h: '🔧 Step 5 — Functions: Prototypes, Parameters, Return Values & Scope',
      p: `Functions in C work similarly to Python functions but with stricter rules: you must declare the return type and the type of every parameter. C also introduces two concepts that don't exist in Python: <strong>function prototypes</strong> and <strong>scope</strong>.
<br><br>
<strong>Function prototypes</strong>: If you call a function before defining it (e.g., you call it in main() but define it later in the file), you must declare a prototype at the top — just the signature without the body — so the compiler knows what types to expect.
<br><br>
<strong>Scope rules:</strong><br>
• <strong>Local variables</strong>: declared inside a function, only visible inside that function<br>
• <strong>Global variables</strong>: declared outside all functions, visible everywhere — use sparingly!<br>
• C passes variables <strong>by value</strong> by default — the function gets a copy, NOT the original<br>
• To modify the caller's variables, you pass a <strong>pointer</strong> (Step 6)`,
      code: `#<span class="kw">include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="cm">/* PROTOTYPES — tell compiler about functions defined later */</span>
<span class="kw">double</span> <span class="fn">celsius_to_fahrenheit</span>(<span class="kw">double</span> c);
<span class="kw">void</span>   <span class="fn">print_grade</span>(<span class="kw">int</span> score);
<span class="kw">int</span>    <span class="fn">clamp</span>(<span class="kw">int</span> value, <span class="kw">int</span> min, <span class="kw">int</span> max);

<span class="kw">int</span> <span class="fn">main</span>(<span class="kw">void</span>) {
    <span class="fn">printf</span>(<span class="str">"25°C = %.1f°F\\n"</span>, <span class="fn">celsius_to_fahrenheit</span>(<span class="num">25.0</span>));
    <span class="fn">print_grade</span>(<span class="num">87</span>);
    <span class="fn">printf</span>(<span class="str">"clamp(150, 0, 100) = %d\\n"</span>, <span class="fn">clamp</span>(<span class="num">150</span>, <span class="num">0</span>, <span class="num">100</span>));
    <span class="kw">return</span> <span class="num">0</span>;
}

<span class="cm">/* DEFINITIONS — actual function implementations */</span>
<span class="kw">double</span> <span class="fn">celsius_to_fahrenheit</span>(<span class="kw">double</span> c) {
    <span class="kw">return</span> (c * <span class="num">9.0</span> / <span class="num">5.0</span>) + <span class="num">32.0</span>;
}

<span class="kw">void</span> <span class="fn">print_grade</span>(<span class="kw">int</span> score) {  <span class="cm">/* void = no return value */</span>
    <span class="kw">char</span> grade = (score >= <span class="num">90</span>) ? <span class="str">'A'</span> :
                 (score >= <span class="num">80</span>) ? <span class="str">'B'</span> :
                 (score >= <span class="num">70</span>) ? <span class="str">'C'</span> : <span class="str">'F'</span>;
    <span class="fn">printf</span>(<span class="str">"Score %d → Grade %c\\n"</span>, score, grade);
}

<span class="kw">int</span> <span class="fn">clamp</span>(<span class="kw">int</span> value, <span class="kw">int</span> min, <span class="kw">int</span> max) {
    <span class="kw">if</span> (value < min) <span class="kw">return</span> min;
    <span class="kw">if</span> (value > max) <span class="kw">return</span> max;
    <span class="kw">return</span> value;
}`,
      examples: [
        { label: 'Pass by value — C makes a copy', code: `#<span class="kw">include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="cm">/* This CANNOT change 'x' in main — gets a copy */</span>
<span class="kw">void</span> <span class="fn">try_to_double</span>(<span class="kw">int</span> n) {
    n = n * <span class="num">2</span>;   <span class="cm">/* only changes the LOCAL copy */</span>
    <span class="fn">printf</span>(<span class="str">"Inside function: n = %d\\n"</span>, n);
}

<span class="kw">int</span> <span class="fn">main</span>(<span class="kw">void</span>) {
    <span class="kw">int</span> x = <span class="num">5</span>;
    <span class="fn">try_to_double</span>(x);
    <span class="fn">printf</span>(<span class="str">"After function: x = %d\\n"</span>, x);  <span class="cm">/* Still 5! */</span>

    <span class="cm">/* To actually change x, we'd need to pass a pointer (next step!)
       OR return the new value: */</span>
    x = x * <span class="num">2</span>;   <span class="cm">/* This works */</span>
    <span class="fn">printf</span>(<span class="str">"After manual doubling: x = %d\\n"</span>, x);  <span class="cm">/* 10 */</span>
    <span class="kw">return</span> <span class="num">0</span>;
}` },
        { label: 'Recursive functions', code: `#<span class="kw">include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="cm">/* A function that calls ITSELF — recursion */</span>
<span class="kw">long long</span> <span class="fn">factorial</span>(<span class="kw">int</span> n) {
    <span class="kw">if</span> (n <= <span class="num">1</span>) <span class="kw">return</span> <span class="num">1</span>;     <span class="cm">/* BASE CASE — stops recursion */</span>
    <span class="kw">return</span> n * <span class="fn">factorial</span>(n - <span class="num">1</span>);  <span class="cm">/* RECURSIVE CASE */</span>
}

<span class="kw">int</span> <span class="fn">fibonacci</span>(<span class="kw">int</span> n) {
    <span class="kw">if</span> (n <= <span class="num">1</span>) <span class="kw">return</span> n;
    <span class="kw">return</span> <span class="fn">fibonacci</span>(n-<span class="num">1</span>) + <span class="fn">fibonacci</span>(n-<span class="num">2</span>);
}

<span class="kw">int</span> <span class="fn">main</span>(<span class="kw">void</span>) {
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i <= <span class="num">10</span>; i++)
        <span class="fn">printf</span>(<span class="str">"%d! = %lld\\n"</span>, i, <span class="fn">factorial</span>(i));

    <span class="fn">printf</span>(<span class="str">"\\nFibonacci:"</span>);
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i < <span class="num">10</span>; i++)
        <span class="fn">printf</span>(<span class="str">" %d"</span>, <span class="fn">fibonacci</span>(i));
    <span class="fn">printf</span>(<span class="str">"\\n"</span>);
    <span class="kw">return</span> <span class="num">0</span>;
}` },
      ],
      fact: 'The ternary operator (condition ? value_if_true : value_if_false) was invented for C and has since been copied into almost every language including Python, JavaScript, Java, and C++. It compresses a 5-line if/else into a single expression — exactly the kind of elegant efficiency C programmers love.',
      history: null,
      quiz: { q: 'In C, when you pass an int variable to a function, what does the function receive?', opts: ['A reference to the original variable that it can modify','A pointer to the variable','A copy of the value — changes inside the function do NOT affect the original','The variable name as a string'], ans: 2 },
      challenge: { t: 'Mathematical Function Library', d: 'Write 6 functions: power(base, exp) using a loop (not math.h), is_prime(n) returning 1 or 0, gcd(a, b) using Euclid\'s algorithm recursively, is_palindrome(char str[]) returning 1 or 0, count_vowels(char str[]) returning the count, reverse_array(int arr[], int size) that reverses in-place. Write a main() that tests each one and prints results.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 6 — Pointers: The Heart of C Power
       ══════════════════════════════════════════════════════════ */
    {
      h: '🎯 Step 6 — Pointers: The Feature That Makes C Unique & Powerful',
      p: `Pointers are what separates C from every high-level language. They are challenging, but understanding them unlocks complete understanding of how computers actually work — how memory works, why arrays are fast, how operating systems manage processes, and how you can write code that modifies variables across function boundaries.
<br><br>
<strong>A pointer is a variable that stores a memory address.</strong><br>
Every variable in your program lives at a specific location in RAM. A pointer holds that location's number (address). With a pointer, you can reach into any part of memory and read or write it directly.
<br><br>
<strong>Two operators you need:</strong><br>
• <code>&variable</code> — the <strong>address-of</strong> operator. Returns the memory address of a variable<br>
• <code>*pointer</code> — the <strong>dereference</strong> operator. Reads or writes the value AT the address stored in the pointer<br>
<br>
Declaration: <code>int *p;</code> — declares p as a pointer to an int. The <code>*</code> in the declaration is NOT dereference — it's saying "p holds an address of an int."`,
      code: `#<span class="kw">include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>(<span class="kw">void</span>) {
    <span class="kw">int</span>  score  = <span class="num">92</span>;    <span class="cm">/* a regular variable */</span>
    <span class="kw">int</span> *p      = &score;  <span class="cm">/* pointer to score; & gets its address */</span>

    <span class="fn">printf</span>(<span class="str">"Value of score:    %d\\n"</span>,  score);  <span class="cm">/* 92 */</span>
    <span class="fn">printf</span>(<span class="str">"Address of score:  %p\\n"</span>,  &score); <span class="cm">/* e.g. 0x7ffc... */</span>
    <span class="fn">printf</span>(<span class="str">"Value of p:        %p\\n"</span>,  p);      <span class="cm">/* same address */</span>
    <span class="fn">printf</span>(<span class="str">"Value via pointer: %d\\n"</span>,  *p);     <span class="cm">/* 92 — dereference */</span>

    <span class="cm">/* Modify the original through the pointer! */</span>
    *p = <span class="num">100</span>;   <span class="cm">/* writes 100 to the address p holds */</span>
    <span class="fn">printf</span>(<span class="str">"score is now: %d\\n"</span>, score);  <span class="cm">/* 100 — it changed! */</span>

    <span class="cm">/* Pointer arithmetic — moving through memory */</span>
    <span class="kw">int</span> arr[] = {<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>, <span class="num">40</span>, <span class="num">50</span>};
    <span class="kw">int</span> *ptr  = arr;    <span class="cm">/* arr by itself IS a pointer to arr[0] */</span>

    <span class="fn">printf</span>(<span class="str">"arr[0]=%d  arr[1]=%d  arr[2]=%d\\n"</span>,
           *ptr, *(ptr+<span class="num">1</span>), *(ptr+<span class="num">2</span>));
    <span class="kw">return</span> <span class="num">0</span>;
}`,
      examples: [
        { label: 'Passing pointers to functions — true pass-by-reference', code: `#<span class="kw">include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="cm">/* Swap two integers using pointers */</span>
<span class="kw">void</span> <span class="fn">swap</span>(<span class="kw">int</span> *a, <span class="kw">int</span> *b) {
    <span class="kw">int</span> temp = *a;   <span class="cm">/* save value at address a */</span>
    *a = *b;         <span class="cm">/* write b's value to a's address */</span>
    *b = temp;       <span class="cm">/* write temp to b's address */</span>
}

<span class="cm">/* Find both min AND max — return two values via pointers */</span>
<span class="kw">void</span> <span class="fn">find_minmax</span>(<span class="kw">int</span> arr[], <span class="kw">int</span> n, <span class="kw">int</span> *min, <span class="kw">int</span> *max) {
    *min = *max = arr[<span class="num">0</span>];
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">1</span>; i < n; i++) {
        <span class="kw">if</span> (arr[i] < *min) *min = arr[i];
        <span class="kw">if</span> (arr[i] > *max) *max = arr[i];
    }
}

<span class="kw">int</span> <span class="fn">main</span>(<span class="kw">void</span>) {
    <span class="kw">int</span> x = <span class="num">5</span>, y = <span class="num">10</span>;
    <span class="fn">printf</span>(<span class="str">"Before: x=%d y=%d\\n"</span>, x, y);
    <span class="fn">swap</span>(&x, &y);
    <span class="fn">printf</span>(<span class="str">"After:  x=%d y=%d\\n"</span>, x, y);

    <span class="kw">int</span> data[] = {<span class="num">45</span>, <span class="num">12</span>, <span class="num">89</span>, <span class="num">34</span>, <span class="num">7</span>, <span class="num">66</span>};
    <span class="kw">int</span> lo, hi;
    <span class="fn">find_minmax</span>(data, <span class="num">6</span>, &lo, &hi);
    <span class="fn">printf</span>(<span class="str">"Min=%d  Max=%d\\n"</span>, lo, hi);
    <span class="kw">return</span> <span class="num">0</span>;
}` },
        { label: 'Strings are pointers — understanding the connection', code: `#<span class="kw">include</span> <span class="str">&lt;stdio.h&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;string.h&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;ctype.h&gt;</span>   <span class="cm">/* toupper, tolower, isalpha */</span>

<span class="cm">/* Function to convert string to uppercase IN-PLACE using a pointer */</span>
<span class="kw">void</span> <span class="fn">to_upper</span>(<span class="kw">char</span> *s) {
    <span class="kw">while</span> (*s != <span class="str">'\\0'</span>) {   <span class="cm">/* loop until null terminator */</span>
        *s = <span class="fn">toupper</span>(*s);   <span class="cm">/* convert char at current address */</span>
        s++;                  <span class="cm">/* advance pointer to next char */</span>
    }
}

<span class="cm">/* Count words in a string */</span>
<span class="kw">int</span> <span class="fn">count_words</span>(<span class="kw">const char</span> *s) {  <span class="cm">/* const = won't modify it */</span>
    <span class="kw">int</span> count = <span class="num">0</span>, in_word = <span class="num">0</span>;
    <span class="kw">while</span> (*s) {
        <span class="kw">if</span> (*s != <span class="str">' '</span> && *s != <span class="str">'\\n'</span> && *s != <span class="str">'\\t'</span>) {
            <span class="kw">if</span> (!in_word) { count++; in_word = <span class="num">1</span>; }
        } <span class="kw">else</span> { in_word = <span class="num">0</span>; }
        s++;
    }
    <span class="kw">return</span> count;
}

<span class="kw">int</span> <span class="fn">main</span>(<span class="kw">void</span>) {
    <span class="kw">char</span> msg[] = <span class="str">"hello world from C"</span>;
    <span class="fn">printf</span>(<span class="str">"Words: %d\\n"</span>, <span class="fn">count_words</span>(msg));
    <span class="fn">to_upper</span>(msg);
    <span class="fn">printf</span>(<span class="str">"Upper: %s\\n"</span>, msg);
    <span class="kw">return</span> <span class="num">0</span>;
}` },
      ],
      fact: 'Linus Torvalds, creator of Linux, once said: "C is not a very hard language to understand... what C forces you to think about is the relation between an algorithm and the machine that it runs on, which is a concept that a lot of higher-level language programmers lack." Pointers are the doorway to that understanding.',
      history: null,
      quiz: { q: 'What does the * operator do when applied to a pointer variable (as in *p)?', opts: ['Multiplies p by something','Creates a new pointer','Reads or writes the VALUE at the memory address stored in p (dereference)','Declares p as a pointer'], ans: 2 },
      challenge: { t: 'String Processing Library', d: 'Using only char pointers (no array subscript notation arr[i] — use *(ptr+i) or ptr++ instead), implement: my_strlen(char *s), my_strcpy(char *dest, char *src), my_strreverse(char *s) that reverses in-place, my_strcount(char *s, char c) that counts occurrences of char c, and my_strupper(char *s). Test all five with descriptive printf output.' },
    },
  ],
};
