T21.lessons.java = {
  title: 'Java Development', banner: 'java',
  subtitle: 'Write once, run anywhere — the language powering Android, enterprise systems, and billions of devices.',
  steps: [

    /* ══════════════════════════════════════════════════════════
       STEP 1 — What Java Is, JVM, First Program
       ══════════════════════════════════════════════════════════ */
    {
      h: '☕ Step 1 — What Java Is, How the JVM Works & Your First Program',
      p: `Java was released in 1995 with one revolutionary promise: <strong>"Write Once, Run Anywhere."</strong> Before Java, you had to rewrite programs for every operating system. Java broke that barrier — and today it powers Android apps (3 billion devices), Netflix's backend, banking systems, trading platforms, and Minecraft.
<br><br>
<strong>The JVM — Java's secret weapon:</strong><br>
When you compile Java code, it doesn't become Windows machine code or Mac machine code — it becomes <strong>bytecode</strong>, a neutral intermediate format. The <strong>JVM (Java Virtual Machine)</strong> — which runs on every platform — reads this bytecode and executes it. Same .class file, every operating system. This is why "Write Once, Run Anywhere" works.
<br><br>
<strong>Java vs Python vs C comparison:</strong><br>
• Python: Interpreted, dynamic typing, concise — great for scripts, AI, quick tools<br>
• C: Compiled to machine code, manual memory, maximum speed — for OS, embedded<br>
• Java: Compiled to bytecode → JVM, statically typed, automatic memory (garbage collection) — for large applications, Android, enterprise`,
      code: `<span class="cm">// Java requires EVERY piece of code to live inside a CLASS</span>
<span class="cm">// The filename MUST match the class name exactly: HelloWorld.java</span>

<span class="kw">public class</span> HelloWorld {

    <span class="cm">// main() is the entry point — JVM looks for this exact signature</span>
    <span class="kw">public static void</span> <span class="fn">main</span>(String[] args) {

        <span class="cm">// System.out.println → print to console with newline</span>
        System.out.<span class="fn">println</span>(<span class="str">"Hello, World!"</span>);
        System.out.<span class="fn">println</span>(<span class="str">"Java is powerful!"</span>);

        <span class="cm">// System.out.print → no newline</span>
        System.out.<span class="fn">print</span>(<span class="str">"Name: "</span>);
        System.out.<span class="fn">println</span>(<span class="str">"Amara"</span>);

        <span class="cm">// printf works like C's printf</span>
        System.out.<span class="fn">printf</span>(<span class="str">"Pi = %.4f%n"</span>, Math.PI);  <span class="cm">// %n = newline</span>

        <span class="cm">// String.format for building formatted strings</span>
        String msg = String.<span class="fn">format</span>(<span class="str">"Age: %d, Score: %.1f%%"</span>, <span class="num">17</span>, <span class="num">94.5</span>);
        System.out.<span class="fn">println</span>(msg);
    }
}`,
      examples: [
        { label: 'Compiling and running Java from the terminal', code: `<span class="cm">// 1. Save your code as HelloWorld.java
// 2. Compile:
//    javac HelloWorld.java
//    → produces HelloWorld.class (bytecode)
//
// 3. Run:
//    java HelloWorld
//    → JVM reads HelloWorld.class and executes it
//
// Common compilation errors:
//   error: class HelloWorld is public, should be in file HelloWorld.java
//   → filename must match class name exactly, including capitalisation
//
//   error: ';' expected
//   → every Java statement ends with a semicolon
//
//   error: cannot find symbol
//   → variable or method used before being declared</span>

<span class="cm">// Java is case-sensitive:
//   String ≠ string, System ≠ system, println ≠ Println</span>` },
        { label: 'Variables and all primitive types', code: `<span class="kw">public class</span> Primitives {
    <span class="kw">public static void</span> <span class="fn">main</span>(String[] args) {

        <span class="cm">// 8 primitive types — no objects, stored directly</span>
        <span class="kw">byte</span>    b = <span class="num">127</span>;          <span class="cm">// 1 byte:  -128 to 127</span>
        <span class="kw">short</span>   s = <span class="num">32000</span>;        <span class="cm">// 2 bytes</span>
        <span class="kw">int</span>     i = <span class="num">2_000_000</span>;    <span class="cm">// 4 bytes  (underscores for readability!)</span>
        <span class="kw">long</span>    l = <span class="num">9_000_000_000L</span>; <span class="cm">// 8 bytes — needs L suffix</span>
        <span class="kw">float</span>   f = <span class="num">3.14f</span>;        <span class="cm">// 4 bytes — needs f suffix</span>
        <span class="kw">double</span>  d = <span class="num">3.14159265</span>;   <span class="cm">// 8 bytes — preferred for decimals</span>
        <span class="kw">char</span>    c = <span class="str">'A'</span>;           <span class="cm">// 2 bytes — Unicode character</span>
        <span class="kw">boolean</span> z = <span class="kw">true</span>;         <span class="cm">// 1 bit   — true or false</span>

        <span class="cm">// String is NOT a primitive — it's a class (object)</span>
        String name = <span class="str">"Amara Nkosi"</span>;

        System.out.<span class="fn">printf</span>(<span class="str">"int: %d, double: %.2f, name: %s%n"</span>, i, d, name);

        <span class="cm">// Type casting (same as C)</span>
        <span class="kw">double</span> result = (<span class="kw">double</span>) i / <span class="num">3</span>;   <span class="cm">// cast to avoid integer division</span>
        System.out.<span class="fn">printf</span>(<span class="str">"%.4f%n"</span>, result);
    }
}` },
      ],
      fact: 'Java was originally designed for interactive TV cable boxes — a project called "Green." When that failed, the team pivoted to the emerging World Wide Web, where Java\'s platform-independence was a perfect fit. The language was originally called "Oak" but renamed to "Java" (the coffee) because Oak was already trademarked.',
      history: 'java_oak',
      quiz: { q: 'What does the JVM (Java Virtual Machine) actually do?', opts: ['It is a physical computer that runs Java','It reads Java bytecode and executes it on whatever operating system you\'re running, enabling Write Once Run Anywhere','It converts Java directly to C code','It is the Java text editor'], ans: 1 },
      challenge: { t: 'Formatted Statistics Report', d: 'Write a Java program that declares variables for 5 students (name, age, score as double). Calculate the class average, highest score, and lowest score. Use System.out.printf to print a perfectly aligned table with headers, a separator line of dashes, each student row with %-15s for name and %6.1f for score, and a footer showing the average with 2 decimal places.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 2 — Classes and Objects: OOP Fundamentals
       ══════════════════════════════════════════════════════════ */
    {
      h: '🏗️ Step 2 — Classes and Objects: The Foundation of Java OOP',
      p: `Java is an <strong>Object-Oriented Programming (OOP)</strong> language — everything is built around the idea of <em>objects</em> that combine data (fields) and behaviour (methods) into one unit.
<br><br>
<strong>The blueprint analogy:</strong><br>
A <strong>class</strong> is a blueprint — it describes what an object will look like. An <strong>object</strong> (or instance) is the actual thing built from that blueprint. You can create thousands of different objects from a single class, each with its own data.
<br><br>
<strong>Key OOP terms:</strong><br>
• <strong>Field</strong> — a variable that belongs to a class (also called instance variable or attribute)<br>
• <strong>Method</strong> — a function that belongs to a class<br>
• <strong>Constructor</strong> — a special method called automatically when creating a new object (<code>new ClassName()</code>). It has the <em>same name as the class</em> and no return type<br>
• <strong>this</strong> — refers to the current object inside a method<br>
• <strong>private / public</strong> — access modifiers controlling who can access a field or method`,
      code: `<span class="cm">// Blueprint: describes what a Student IS and CAN DO</span>
<span class="kw">public class</span> Student {

    <span class="cm">// FIELDS — data every Student has (private = only accessible inside this class)</span>
    <span class="kw">private</span> String  name;
    <span class="kw">private</span> <span class="kw">int</span>     age;
    <span class="kw">private</span> <span class="kw">double</span>  gpa;
    <span class="kw">private</span> <span class="kw">int</span>     coursesCompleted;

    <span class="cm">// CONSTRUCTOR — called when you write: new Student("Amara", 15)</span>
    <span class="kw">public</span> <span class="fn">Student</span>(String name, <span class="kw">int</span> age) {
        <span class="kw">this</span>.name = name;       <span class="cm">// this.name = field, name = parameter</span>
        <span class="kw">this</span>.age  = age;
        <span class="kw">this</span>.gpa  = <span class="num">0.0</span>;
        <span class="kw">this</span>.coursesCompleted = <span class="num">0</span>;
    }

    <span class="cm">// METHODS — what a Student can DO</span>
    <span class="kw">public void</span> <span class="fn">completeCourse</span>(<span class="kw">double</span> courseGrade) {
        coursesCompleted++;
        <span class="cm">// Running average formula</span>
        gpa = (gpa * (coursesCompleted - <span class="num">1</span>) + courseGrade) / coursesCompleted;
    }

    <span class="kw">public</span> String <span class="fn">getStatus</span>() {
        <span class="kw">if</span> (gpa >= <span class="num">3.5</span>) <span class="kw">return</span> <span class="str">"Honours Student 🏆"</span>;
        <span class="kw">if</span> (gpa >= <span class="num">2.0</span>) <span class="kw">return</span> <span class="str">"In Good Standing ✅"</span>;
        <span class="kw">return</span> <span class="str">"Academic Probation ⚠️"</span>;
    }

    <span class="cm">// GETTERS — controlled read access to private fields</span>
    <span class="kw">public</span> String <span class="fn">getName</span>()  { <span class="kw">return</span> name; }
    <span class="kw">public</span> <span class="kw">double</span> <span class="fn">getGpa</span>()   { <span class="kw">return</span> gpa; }
    <span class="kw">public</span> <span class="kw">int</span>    <span class="fn">getCourses</span>(){ <span class="kw">return</span> coursesCompleted; }

    <span class="cm">// toString — called automatically when you print the object</span>
    @Override
    <span class="kw">public</span> String <span class="fn">toString</span>() {
        <span class="kw">return</span> String.<span class="fn">format</span>(<span class="str">"Student[%s, age %d, GPA %.2f, %d courses, %s]"</span>,
            name, age, gpa, coursesCompleted, <span class="fn">getStatus</span>());
    }
}`,
      examples: [
        { label: 'Creating and using objects in main()', code: `<span class="kw">public class</span> SchoolDemo {
    <span class="kw">public static void</span> <span class="fn">main</span>(String[] args) {

        <span class="cm">// Create objects from the Student blueprint</span>
        Student s1 = <span class="kw">new</span> <span class="fn">Student</span>(<span class="str">"Amara"</span>, <span class="num">15</span>);
        Student s2 = <span class="kw">new</span> <span class="fn">Student</span>(<span class="str">"Kofi"</span>,  <span class="num">16</span>);

        <span class="cm">// Call methods on objects</span>
        s1.<span class="fn">completeCourse</span>(<span class="num">3.8</span>);
        s1.<span class="fn">completeCourse</span>(<span class="num">3.5</span>);
        s1.<span class="fn">completeCourse</span>(<span class="num">4.0</span>);

        s2.<span class="fn">completeCourse</span>(<span class="num">2.1</span>);
        s2.<span class="fn">completeCourse</span>(<span class="num">2.5</span>);

        <span class="cm">// toString() is called automatically</span>
        System.out.<span class="fn">println</span>(s1);
        System.out.<span class="fn">println</span>(s2);

        <span class="cm">// Each object has its OWN data — completely independent</span>
        System.out.<span class="fn">printf</span>(<span class="str">"%s GPA: %.2f%n"</span>, s1.<span class="fn">getName</span>(), s1.<span class="fn">getGpa</span>());
        System.out.<span class="fn">printf</span>(<span class="str">"%s GPA: %.2f%n"</span>, s2.<span class="fn">getName</span>(), s2.<span class="fn">getGpa</span>());
    }
}` },
        { label: 'Why private fields matter — encapsulation', code: `<span class="kw">public class</span> BankAccount {
    <span class="kw">private</span> String owner;
    <span class="kw">private</span> <span class="kw">double</span> balance;   <span class="cm">// private — cannot be set directly from outside</span>

    <span class="kw">public</span> <span class="fn">BankAccount</span>(String owner, <span class="kw">double</span> initial) {
        <span class="kw">this</span>.owner   = owner;
        <span class="kw">this</span>.balance = initial >= <span class="num">0</span> ? initial : <span class="num">0</span>;  <span class="cm">// validate on creation</span>
    }

    <span class="kw">public boolean</span> <span class="fn">deposit</span>(<span class="kw">double</span> amount) {
        <span class="kw">if</span> (amount <= <span class="num">0</span>) { System.out.<span class="fn">println</span>(<span class="str">"Invalid deposit"</span>); <span class="kw">return false</span>; }
        balance += amount;
        System.out.<span class="fn">printf</span>(<span class="str">"Deposited £%.2f → Balance: £%.2f%n"</span>, amount, balance);
        <span class="kw">return true</span>;
    }

    <span class="kw">public boolean</span> <span class="fn">withdraw</span>(<span class="kw">double</span> amount) {
        <span class="kw">if</span> (amount <= <span class="num">0</span> || amount > balance) {
            System.out.<span class="fn">println</span>(<span class="str">"Insufficient funds or invalid amount"</span>);
            <span class="kw">return false</span>;
        }
        balance -= amount;
        System.out.<span class="fn">printf</span>(<span class="str">"Withdrew £%.2f → Balance: £%.2f%n"</span>, amount, balance);
        <span class="kw">return true</span>;
    }

    <span class="kw">public double</span> <span class="fn">getBalance</span>() { <span class="kw">return</span> balance; }  <span class="cm">// read-only access</span>
    <span class="cm">// No setBalance() — prevents setting balance to -1000000!</span>
}` },
      ],
      fact: 'James Gosling created Java at Sun Microsystems after getting frustrated with C++ while writing software for cable TV boxes. He wanted a simpler, safer language where programmers couldn\'t accidentally overwrite memory with pointer arithmetic. Java\'s automatic garbage collector — which reclaims unused memory — was one of his key innovations.',
      history: 'java_oak',
      quiz: { q: 'What is a Java constructor and how is it recognised?', opts: ['A method that returns void','A special method with the same name as the class and no return type, called automatically when creating an object with "new"','A method that must be called manually to set up an object','Any method declared as public'], ans: 1 },
      challenge: { t: 'Library Book System', d: 'Create a Book class with private fields: title (String), author (String), isbn (String), available (boolean), borrower (String). Write a constructor, getters, a borrow(String borrowerName) method that sets available=false and records the borrower (fail if already borrowed), a returnBook() method, and a toString(). In main(), create 5 books, borrow 3, return 1, and print the status of all 5.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 3 — Inheritance and Polymorphism
       ══════════════════════════════════════════════════════════ */
    {
      h: '🧬 Step 3 — Inheritance and Polymorphism: The Power of OOP',
      p: `<strong>Inheritance</strong> is one of the most powerful ideas in object-oriented programming. It lets one class (the <em>child</em> or <em>subclass</em>) inherit all the fields and methods of another class (the <em>parent</em> or <em>superclass</em>), and then add or change behaviour.
<br><br>
Think of it this way: a Dog is a type of Animal. A Car is a type of Vehicle. A SavingsAccount is a type of BankAccount. The "is a" relationship signals inheritance.
<br><br>
<strong>Polymorphism</strong> (Greek: "many forms") means the same method call can produce different behaviour depending on the actual type of object. You can write code that works with a general type (Animal) but automatically uses the right specific behaviour (Dog.makeSound() vs Cat.makeSound()) without if/else checks. This is the key to extensible, maintainable code.
<br><br>
<strong>Key keywords:</strong><br>
• <code>extends</code> — declares inheritance<br>
• <code>super</code> — calls the parent class constructor or method<br>
• <code>@Override</code> — annotation confirming you're intentionally overriding a parent method<br>
• <code>abstract</code> — method has no body in parent; child MUST implement it`,
      code: `<span class="cm">// PARENT CLASS — defines common structure</span>
<span class="kw">public abstract class</span> Shape {
    <span class="kw">protected</span> String colour;    <span class="cm">// protected = visible to subclasses</span>

    <span class="kw">public</span> <span class="fn">Shape</span>(String colour) {
        <span class="kw">this</span>.colour = colour;
    }

    <span class="cm">// abstract — no implementation here; subclasses MUST provide it</span>
    <span class="kw">public abstract double</span> <span class="fn">area</span>();
    <span class="kw">public abstract double</span> <span class="fn">perimeter</span>();

    <span class="cm">// Regular method — inherited by all subclasses</span>
    <span class="kw">public void</span> <span class="fn">describe</span>() {
        System.out.<span class="fn">printf</span>(<span class="str">"%s %s: area=%.2f, perimeter=%.2f%n"</span>,
            colour, <span class="fn">getClass</span>().<span class="fn">getSimpleName</span>(), <span class="fn">area</span>(), <span class="fn">perimeter</span>());
    }
}

<span class="cm">// CHILD CLASS — inherits Shape, provides area() and perimeter()</span>
<span class="kw">public class</span> Circle <span class="kw">extends</span> Shape {
    <span class="kw">private double</span> radius;

    <span class="kw">public</span> <span class="fn">Circle</span>(String colour, <span class="kw">double</span> radius) {
        <span class="kw">super</span>(colour);    <span class="cm">// call parent constructor FIRST</span>
        <span class="kw">this</span>.radius = radius;
    }

    @Override <span class="kw">public double</span> <span class="fn">area</span>()      { <span class="kw">return</span> Math.PI * radius * radius; }
    @Override <span class="kw">public double</span> <span class="fn">perimeter</span>(){ <span class="kw">return</span> <span class="num">2</span> * Math.PI * radius; }
}`,
      examples: [
        { label: 'Polymorphism in action — one loop, many types', code: `<span class="kw">public class</span> Rectangle <span class="kw">extends</span> Shape {
    <span class="kw">private double</span> width, height;
    <span class="kw">public</span> <span class="fn">Rectangle</span>(String colour, <span class="kw">double</span> w, <span class="kw">double</span> h) {
        <span class="kw">super</span>(colour); width = w; height = h;
    }
    @Override <span class="kw">public double</span> <span class="fn">area</span>()      { <span class="kw">return</span> width * height; }
    @Override <span class="kw">public double</span> <span class="fn">perimeter</span>(){ <span class="kw">return</span> <span class="num">2</span> * (width + height); }
}

<span class="kw">public class</span> Triangle <span class="kw">extends</span> Shape {
    <span class="kw">private double</span> a, b, c;
    <span class="kw">public</span> <span class="fn">Triangle</span>(String colour, <span class="kw">double</span> a, <span class="kw">double</span> b, <span class="kw">double</span> c) {
        <span class="kw">super</span>(colour); <span class="kw">this</span>.a=a; <span class="kw">this</span>.b=b; <span class="kw">this</span>.c=c;
    }
    @Override <span class="kw">public double</span> <span class="fn">perimeter</span>(){ <span class="kw">return</span> a + b + c; }
    @Override <span class="kw">public double</span> <span class="fn">area</span>() {     <span class="cm">// Heron's formula</span>
        <span class="kw">double</span> s = <span class="fn">perimeter</span>() / <span class="num">2</span>;
        <span class="kw">return</span> Math.<span class="fn">sqrt</span>(s*(s-a)*(s-b)*(s-c));
    }
}

<span class="cm">// POLYMORPHISM — Shape variable, different actual types</span>
Shape[] shapes = {
    <span class="kw">new</span> <span class="fn">Circle</span>(<span class="str">"Red"</span>, <span class="num">5</span>),
    <span class="kw">new</span> <span class="fn">Rectangle</span>(<span class="str">"Blue"</span>, <span class="num">4</span>, <span class="num">7</span>),
    <span class="kw">new</span> <span class="fn">Triangle</span>(<span class="str">"Green"</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>)
};

<span class="kw">for</span> (Shape s : shapes) {
    s.<span class="fn">describe</span>();     <span class="cm">// calls the RIGHT area() for each type automatically!</span>
}` },
        { label: 'Interfaces — a contract that any class can sign', code: `<span class="cm">// Interface — defines WHAT something can do, not HOW</span>
<span class="kw">public interface</span> Printable {
    <span class="kw">void</span> <span class="fn">print</span>();          <span class="cm">// any class implementing this MUST have print()</span>
    <span class="kw">default void</span> <span class="fn">printWithBorder</span>() {  <span class="cm">// default = provided implementation</span>
        System.out.<span class="fn">println</span>(<span class="str">"---"</span>);
        <span class="fn">print</span>();
        System.out.<span class="fn">println</span>(<span class="str">"---"</span>);
    }
}

<span class="kw">public interface</span> Saveable {
    <span class="kw">void</span> <span class="fn">save</span>(String filename);
}

<span class="cm">// A class can extend ONE class but implement MANY interfaces</span>
<span class="kw">public class</span> Report <span class="kw">extends</span> Document <span class="kw">implements</span> Printable, Saveable {
    <span class="kw">private</span> String content;

    @Override <span class="kw">public void</span> <span class="fn">print</span>()                  { System.out.<span class="fn">println</span>(content); }
    @Override <span class="kw">public void</span> <span class="fn">save</span>(String filename) {
        System.out.<span class="fn">println</span>(<span class="str">"Saving to: "</span> + filename);
    }
}` },
      ],
      fact: 'Polymorphism is used constantly in real Java systems. Android\'s View class is the parent of Button, TextView, ImageView, and hundreds more. Any code that works with a View automatically works with all of them. When Android draws the screen, it loops through all Views and calls draw() on each — each type draws itself differently, but the loop doesn\'t need to know which type it\'s dealing with.',
      history: null,
      quiz: { q: 'What does @Override mean in Java and why is it important?', opts: ['It makes the method faster','It marks that you are intentionally replacing a parent class method — the compiler will give an error if you mis-spell the method name','It makes the method private','It means the method cannot be overridden further'], ans: 1 },
      challenge: { t: 'Vehicle Hierarchy', d: 'Create abstract class Vehicle with fields: make (String), model (String), year (int), fuelLevel (double 0-100). Add abstract method fuelEfficiency() returning km/litre, concrete method drive(double km) that reduces fuelLevel (using fuelEfficiency()), and refuel(double litres). Create subclasses: ElectricCar (efficiency 6 km/kWh, override fuel display as kWh), PetrolCar (efficiency 12 km/L), Bicycle (no fuel, infinite efficiency). Demonstrate polymorphism with a Vehicle[] array.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 4 — ArrayList, HashMap and Java Collections
       ══════════════════════════════════════════════════════════ */
    {
      h: '📚 Step 4 — ArrayList, HashMap & the Java Collections Framework',
      p: `Java arrays are fixed-size — once created, they can't grow. Real applications need dynamic collections that grow and shrink. The <strong>Java Collections Framework</strong> provides these, and two classes dominate day-to-day Java programming: <strong>ArrayList</strong> and <strong>HashMap</strong>.
<br><br>
<strong>ArrayList</strong> — a resizable array. Internally, it's backed by a regular array that automatically doubles in size when full. Compared to Python's list, it's nearly identical — but you must specify the element type in angle brackets: <code>ArrayList&lt;String&gt;</code>. These angle brackets are <strong>Generics</strong> — Java's way of ensuring type safety in collections at compile time.
<br><br>
<strong>HashMap</strong> — maps keys to values, like Python's dict. <code>HashMap&lt;String, Integer&gt;</code> maps String keys to Integer values. Lookup by key is O(1) — instant regardless of size.
<br><br>
<strong>The enhanced for loop</strong> (for-each): <code>for (String name : names) { }</code> — cleaner than index-based loops when you don't need the index.`,
      code: `<span class="kw">import</span> java.util.ArrayList;
<span class="kw">import</span> java.util.Collections;

<span class="kw">public class</span> CollectionsDemo {
    <span class="kw">public static void</span> <span class="fn">main</span>(String[] args) {

        <span class="cm">// ArrayList — dynamic, ordered, allows duplicates</span>
        ArrayList&lt;String&gt; names = <span class="kw">new</span> ArrayList&lt;&gt;();  <span class="cm">// &lt;&gt; = diamond operator</span>
        names.<span class="fn">add</span>(<span class="str">"Amara"</span>);
        names.<span class="fn">add</span>(<span class="str">"Kofi"</span>);
        names.<span class="fn">add</span>(<span class="str">"Zara"</span>);
        names.<span class="fn">add</span>(<span class="num">0</span>, <span class="str">"Liam"</span>);     <span class="cm">// insert at index 0</span>

        System.out.<span class="fn">println</span>(names);             <span class="cm">// [Liam, Amara, Kofi, Zara]</span>
        System.out.<span class="fn">println</span>(names.<span class="fn">get</span>(<span class="num">1</span>));       <span class="cm">// Amara</span>
        System.out.<span class="fn">println</span>(names.<span class="fn">size</span>());       <span class="cm">// 4</span>
        System.out.<span class="fn">println</span>(names.<span class="fn">contains</span>(<span class="str">"Kofi"</span>)); <span class="cm">// true</span>

        names.<span class="fn">remove</span>(<span class="str">"Liam"</span>);                  <span class="cm">// remove by value</span>
        names.<span class="fn">remove</span>(<span class="num">0</span>);                       <span class="cm">// remove by index</span>

        Collections.<span class="fn">sort</span>(names);               <span class="cm">// sort alphabetically</span>
        System.out.<span class="fn">println</span>(<span class="str">"Sorted: "</span> + names);

        <span class="cm">// Enhanced for-each loop</span>
        <span class="kw">for</span> (String name : names) {
            System.out.<span class="fn">println</span>(<span class="str">"  → "</span> + name);
        }
    }
}`,
      examples: [
        { label: 'HashMap — key-value storage', code: `<span class="kw">import</span> java.util.HashMap;
<span class="kw">import</span> java.util.Map;

<span class="kw">public class</span> HashMapDemo {
    <span class="kw">public static void</span> <span class="fn">main</span>(String[] args) {

        <span class="cm">// HashMap&lt;KeyType, ValueType&gt;</span>
        HashMap&lt;String, Integer&gt; scores = <span class="kw">new</span> HashMap&lt;&gt;();
        scores.<span class="fn">put</span>(<span class="str">"Amara"</span>, <span class="num">94</span>);
        scores.<span class="fn">put</span>(<span class="str">"Kofi"</span>,  <span class="num">87</span>);
        scores.<span class="fn">put</span>(<span class="str">"Zara"</span>,  <span class="num">92</span>);
        scores.<span class="fn">put</span>(<span class="str">"Liam"</span>,  <span class="num">78</span>);

        System.out.<span class="fn">println</span>(scores.<span class="fn">get</span>(<span class="str">"Amara"</span>));       <span class="cm">// 94</span>
        System.out.<span class="fn">println</span>(scores.<span class="fn">getOrDefault</span>(<span class="str">"Nina"</span>, <span class="num">0</span>)); <span class="cm">// 0 (not found)</span>
        System.out.<span class="fn">println</span>(scores.<span class="fn">containsKey</span>(<span class="str">"Kofi"</span>));  <span class="cm">// true</span>
        System.out.<span class="fn">println</span>(scores.<span class="fn">size</span>());               <span class="cm">// 4</span>

        scores.<span class="fn">put</span>(<span class="str">"Amara"</span>, <span class="num">96</span>);   <span class="cm">// update existing key</span>
        scores.<span class="fn">remove</span>(<span class="str">"Liam"</span>);     <span class="cm">// remove entry</span>

        <span class="cm">// Iterate over all entries</span>
        <span class="kw">for</span> (Map.Entry&lt;String, Integer&gt; entry : scores.<span class="fn">entrySet</span>()) {
            System.out.<span class="fn">printf</span>(<span class="str">"  %-10s → %d%n"</span>, entry.<span class="fn">getKey</span>(), entry.<span class="fn">getValue</span>());
        }
    }
}` },
        { label: 'ArrayList of Objects — the most common Java pattern', code: `<span class="kw">import</span> java.util.*;

<span class="kw">public class</span> StudentRoster {
    <span class="kw">public static void</span> <span class="fn">main</span>(String[] args) {

        ArrayList&lt;Student&gt; roster = <span class="kw">new</span> ArrayList&lt;&gt;();
        roster.<span class="fn">add</span>(<span class="kw">new</span> <span class="fn">Student</span>(<span class="str">"Amara"</span>, <span class="num">15</span>));
        roster.<span class="fn">add</span>(<span class="kw">new</span> <span class="fn">Student</span>(<span class="str">"Kofi"</span>,  <span class="num">16</span>));
        roster.<span class="fn">add</span>(<span class="kw">new</span> <span class="fn">Student</span>(<span class="str">"Zara"</span>,  <span class="num">15</span>));

        <span class="cm">// Add scores to each student</span>
        roster.<span class="fn">get</span>(<span class="num">0</span>).<span class="fn">completeCourse</span>(<span class="num">3.8</span>);
        roster.<span class="fn">get</span>(<span class="num">1</span>).<span class="fn">completeCourse</span>(<span class="num">3.2</span>);
        roster.<span class="fn">get</span>(<span class="num">2</span>).<span class="fn">completeCourse</span>(<span class="num">3.9</span>);

        <span class="cm">// Sort by GPA (highest first) using lambda — covered in Step 5</span>
        roster.<span class="fn">sort</span>((a, b) -> Double.<span class="fn">compare</span>(b.<span class="fn">getGpa</span>(), a.<span class="fn">getGpa</span>()));

        System.out.<span class="fn">println</span>(<span class="str">"=== Class Rankings ==="</span>);
        <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i < roster.<span class="fn">size</span>(); i++) {
            System.out.<span class="fn">printf</span>(<span class="str">"#%d %s%n"</span>, i+<span class="num">1</span>, roster.<span class="fn">get</span>(i));
        }
    }
}` },
      ],
      fact: 'HashMap\'s O(1) lookup is made possible by hashing — a mathematical function that converts a key (like a String) into a number, which is used as an array index. Java\'s HashMap internally uses an array of "buckets" and uses the hash to determine which bucket to look in. With a good hash function, this narrows the search to almost always 1 comparison.',
      history: null,
      quiz: { q: 'What does ArrayList<String> mean in Java?', opts: ['A list that can only hold exactly one String','A list of Strings — the <String> tells the compiler to only allow Strings, catching errors at compile time','A String that behaves like a list','A list with a maximum capacity equal to String.length'], ans: 1 },
      challenge: { t: 'Inventory Management System', d: 'Create a Product class (name, price, quantity, category). Build an inventory manager with an ArrayList<Product> that supports: addProduct(), removeByName(), searchByCategory() returning ArrayList<Product>, getTotalValue() (sum of price*quantity), getLowStock(int threshold) returning products with quantity below threshold, and printInventory() sorted by price. Test with 10 products across 3 categories.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 5 — Exception Handling and File I/O
       ══════════════════════════════════════════════════════════ */
    {
      h: '🛡️ Step 5 — Exception Handling: Writing Code That Doesn\'t Crash',
      p: `In the real world, things go wrong: files don't exist, networks fail, users type letters where numbers are expected. <strong>Exception handling</strong> lets you write code that gracefully handles these situations instead of crashing.
<br><br>
Java uses <strong>checked exceptions</strong> — the compiler forces you to handle errors that could reasonably occur (like FileNotFoundException). This is different from Python where you <em>can</em> handle errors but aren't required to. Java's approach is more verbose but produces more reliable programs.
<br><br>
<strong>The try-catch-finally structure:</strong><br>
<code>try { }</code> — code that might throw an exception<br>
<code>catch (ExceptionType e) { }</code> — handle a specific type of exception<br>
<code>finally { }</code> — always runs, even if an exception occurred (used for cleanup)<br>
<br>
<strong>Exception hierarchy</strong>: All exceptions extend <code>Throwable</code>. The two branches are <code>Error</code> (JVM problems, don't catch) and <code>Exception</code> (your code's problems, do catch). <code>RuntimeException</code> subclasses (like NullPointerException) are unchecked — you don't have to catch them but should.`,
      code: `<span class="kw">import</span> java.util.Scanner;

<span class="kw">public class</span> SafeInput {
    <span class="kw">public static void</span> <span class="fn">main</span>(String[] args) {
        Scanner scanner = <span class="kw">new</span> <span class="fn">Scanner</span>(System.in);

        <span class="cm">// Reading an integer safely</span>
        System.out.<span class="fn">print</span>(<span class="str">"Enter a number: "</span>);
        <span class="kw">try</span> {
            <span class="kw">int</span> number = Integer.<span class="fn">parseInt</span>(scanner.<span class="fn">nextLine</span>());
            System.out.<span class="fn">println</span>(<span class="str">"You entered: "</span> + number);
            System.out.<span class="fn">println</span>(<span class="str">"Square root: "</span> + Math.<span class="fn">sqrt</span>(number));

            <span class="kw">if</span> (number < <span class="num">0</span>) <span class="kw">throw new</span> <span class="fn">IllegalArgumentException</span>(<span class="str">"Cannot be negative"</span>);

        } <span class="kw">catch</span> (NumberFormatException e) {
            System.out.<span class="fn">println</span>(<span class="str">"❌ Not a valid number: "</span> + e.<span class="fn">getMessage</span>());
        } <span class="kw">catch</span> (IllegalArgumentException e) {
            System.out.<span class="fn">println</span>(<span class="str">"❌ Invalid value: "</span> + e.<span class="fn">getMessage</span>());
        } <span class="kw">finally</span> {
            System.out.<span class="fn">println</span>(<span class="str">"(This always runs — input handling complete)"</span>);
            scanner.<span class="fn">close</span>();
        }
    }
}`,
      examples: [
        { label: 'Reading and writing files', code: `<span class="kw">import</span> java.io.*;
<span class="kw">import</span> java.util.Scanner;

<span class="kw">public class</span> FileDemo {

    <span class="kw">public static void</span> <span class="fn">writeFile</span>(String filename, String content) {
        <span class="kw">try</span> (PrintWriter writer = <span class="kw">new</span> <span class="fn">PrintWriter</span>(<span class="kw">new</span> <span class="fn">FileWriter</span>(filename))) {
            <span class="cm">// try-with-resources: automatically closes writer when done</span>
            writer.<span class="fn">println</span>(content);
            writer.<span class="fn">printf</span>(<span class="str">"Written at: %s%n"</span>, <span class="kw">new</span> java.util.<span class="fn">Date</span>());
            System.out.<span class="fn">println</span>(<span class="str">"✅ File written: "</span> + filename);
        } <span class="kw">catch</span> (IOException e) {
            System.out.<span class="fn">println</span>(<span class="str">"❌ Could not write file: "</span> + e.<span class="fn">getMessage</span>());
        }
    }

    <span class="kw">public static</span> String <span class="fn">readFile</span>(String filename) {
        StringBuilder sb = <span class="kw">new</span> <span class="fn">StringBuilder</span>();
        <span class="kw">try</span> (Scanner sc = <span class="kw">new</span> <span class="fn">Scanner</span>(<span class="kw">new</span> <span class="fn">File</span>(filename))) {
            <span class="kw">while</span> (sc.<span class="fn">hasNextLine</span>()) {
                sb.<span class="fn">append</span>(sc.<span class="fn">nextLine</span>()).<span class="fn">append</span>(<span class="str">"\\n"</span>);
            }
        } <span class="kw">catch</span> (FileNotFoundException e) {
            <span class="kw">return</span> <span class="str">"File not found: "</span> + filename;
        }
        <span class="kw">return</span> sb.<span class="fn">toString</span>();
    }

    <span class="kw">public static void</span> <span class="fn">main</span>(String[] args) {
        <span class="fn">writeFile</span>(<span class="str">"test.txt"</span>, <span class="str">"Hello from Java file I/O!"</span>);
        System.out.<span class="fn">println</span>(<span class="fn">readFile</span>(<span class="str">"test.txt"</span>));
        System.out.<span class="fn">println</span>(<span class="fn">readFile</span>(<span class="str">"missing.txt"</span>));   <span class="cm">// graceful error</span>
    }
}` },
        { label: 'Custom exceptions — defining your own error types', code: `<span class="cm">// Define a custom exception</span>
<span class="kw">public class</span> InsufficientFundsException <span class="kw">extends</span> Exception {
    <span class="kw">private double</span> shortfall;

    <span class="kw">public</span> <span class="fn">InsufficientFundsException</span>(<span class="kw">double</span> shortfall) {
        <span class="kw">super</span>(String.<span class="fn">format</span>(<span class="str">"Insufficient funds — short by £%.2f"</span>, shortfall));
        <span class="kw">this</span>.shortfall = shortfall;
    }

    <span class="kw">public double</span> <span class="fn">getShortfall</span>() { <span class="kw">return</span> shortfall; }
}

<span class="cm">// Use the custom exception in BankAccount.withdraw()</span>
<span class="kw">public void</span> <span class="fn">withdraw</span>(<span class="kw">double</span> amount) <span class="kw">throws</span> InsufficientFundsException {
    <span class="kw">if</span> (amount > balance) {
        <span class="kw">throw new</span> <span class="fn">InsufficientFundsException</span>(amount - balance);
    }
    balance -= amount;
}

<span class="cm">// Caller must handle it or declare throws</span>
<span class="kw">try</span> {
    account.<span class="fn">withdraw</span>(<span class="num">500</span>);
} <span class="kw">catch</span> (InsufficientFundsException e) {
    System.out.<span class="fn">println</span>(<span class="str">"❌ "</span> + e.<span class="fn">getMessage</span>());
    System.out.<span class="fn">printf</span>(<span class="str">"You need £%.2f more.%n"</span>, e.<span class="fn">getShortfall</span>());
}` },
      ],
      fact: 'Java\'s checked exception system was considered revolutionary in 1995 — the compiler literally refuses to compile if you haven\'t handled potential errors. While it makes code more verbose, studies of large Java codebases show dramatically fewer unhandled runtime errors compared to dynamically typed languages. This is why Java is trusted for banking, healthcare, and aviation software.',
      history: null,
      quiz: { q: 'What is "try-with-resources" in Java and why is it useful?', opts: ['A way to try multiple values','A try block that automatically closes resources (files, connections) when the block ends, even if an exception occurs','A way to catch multiple exceptions','A performance optimisation'], ans: 1 },
      challenge: { t: 'Student Grade File System', d: 'Build a system that: writes student data (name, scores) to a CSV file (grade_report.csv) using PrintWriter, reads it back line-by-line using Scanner parsing comma-separated values, calculates each student\'s average and grade, writes a formatted summary to a second file (summary.txt), handles all FileNotFoundException and IOException with helpful messages, and uses try-with-resources throughout. Create a custom GradeException thrown when a score is outside 0-100.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 6 — Capstone: Full OOP Application
       ══════════════════════════════════════════════════════════ */
    {
      h: '🏆 Step 6 — Capstone: Build a Complete Java Application',
      p: `Time to combine everything — classes, inheritance, collections, and exception handling — into a complete, real-world Java application: a <strong>Course Management System</strong>.
<br><br>
This project uses every Java concept from this course: multiple classes with inheritance, ArrayList and HashMap for storage, private fields with getters/setters, custom exceptions, file I/O for persistence, polymorphism in action, and proper program structure with separate classes for data, logic, and display.
<br><br>
<strong>Professional Java program structure:</strong><br>
Real Java applications split code into separate files/packages by responsibility. For this project, you'll build all classes in one file for simplicity, but understand that in production, each class would live in its own .java file.`,
      code: `<span class="cm">// Main application class — ties everything together</span>
<span class="kw">import</span> java.util.*;

<span class="kw">public class</span> CourseManager {

    <span class="kw">private</span> HashMap&lt;String, Course&gt;  courses  = <span class="kw">new</span> HashMap&lt;&gt;();
    <span class="kw">private</span> ArrayList&lt;Student&gt;        students = <span class="kw">new</span> ArrayList&lt;&gt;();

    <span class="kw">public void</span> <span class="fn">addCourse</span>(String code, String title, <span class="kw">int</span> maxStudents) {
        <span class="kw">if</span> (courses.<span class="fn">containsKey</span>(code))
            <span class="kw">throw new</span> <span class="fn">IllegalArgumentException</span>(<span class="str">"Course already exists: "</span> + code);
        courses.<span class="fn">put</span>(code, <span class="kw">new</span> <span class="fn">Course</span>(code, title, maxStudents));
        System.out.<span class="fn">printf</span>(<span class="str">"✅ Added: [%s] %s (max %d)%n"</span>, code, title, maxStudents);
    }

    <span class="kw">public void</span> <span class="fn">enrollStudent</span>(Student student, String courseCode) {
        Course course = courses.<span class="fn">getOrDefault</span>(courseCode, <span class="kw">null</span>);
        <span class="kw">if</span> (course == <span class="kw">null</span>) {
            System.out.<span class="fn">println</span>(<span class="str">"❌ Course not found: "</span> + courseCode);
            <span class="kw">return</span>;
        }
        course.<span class="fn">enroll</span>(student);
    }

    <span class="kw">public void</span> <span class="fn">printAllReports</span>() {
        System.out.<span class="fn">println</span>(<span class="str">"\\n═══════════ COURSE REPORTS ═══════════"</span>);
        <span class="kw">for</span> (Course c : courses.<span class="fn">values</span>()) {
            c.<span class="fn">printReport</span>();
        }
    }
}`,
      examples: [
        { label: 'The Course class with enrollment logic', code: `<span class="kw">public class</span> Course {
    <span class="kw">private</span> String            code, title;
    <span class="kw">private</span> <span class="kw">int</span>               maxStudents;
    <span class="kw">private</span> ArrayList&lt;Student&gt; enrolled = <span class="kw">new</span> ArrayList&lt;&gt;();

    <span class="kw">public</span> <span class="fn">Course</span>(String code, String title, <span class="kw">int</span> max) {
        <span class="kw">this</span>.code = code; <span class="kw">this</span>.title = title; <span class="kw">this</span>.maxStudents = max;
    }

    <span class="kw">public void</span> <span class="fn">enroll</span>(Student s) {
        <span class="kw">if</span> (enrolled.<span class="fn">size</span>() >= maxStudents) {
            System.out.<span class="fn">printf</span>(<span class="str">"❌ %s is full (%d/%d)%n"</span>, title, enrolled.<span class="fn">size</span>(), maxStudents);
            <span class="kw">return</span>;
        }
        <span class="kw">if</span> (enrolled.<span class="fn">contains</span>(s)) {
            System.out.<span class="fn">println</span>(<span class="str">"❌ Already enrolled: "</span> + s.<span class="fn">getName</span>());
            <span class="kw">return</span>;
        }
        enrolled.<span class="fn">add</span>(s);
        System.out.<span class="fn">printf</span>(<span class="str">"✅ Enrolled %s in %s%n"</span>, s.<span class="fn">getName</span>(), title);
    }

    <span class="kw">public void</span> <span class="fn">printReport</span>() {
        System.out.<span class="fn">printf</span>(<span class="str">"%n[%s] %s — %d/%d students%n"</span>,
            code, title, enrolled.<span class="fn">size</span>(), maxStudents);
        System.out.<span class="fn">println</span>(<span class="str">"  Name            GPA    Status"</span>);
        System.out.<span class="fn">println</span>(<span class="str">"  " + "-".repeat(42)</span>);
        <span class="kw">for</span> (Student s : enrolled) {
            System.out.<span class="fn">printf</span>(<span class="str">"  %-15s  %.2f   %s%n"</span>,
                s.<span class="fn">getName</span>(), s.<span class="fn">getGpa</span>(), s.<span class="fn">getStatus</span>());
        }
        <span class="kw">double</span> avgGpa = enrolled.<span class="fn">stream</span>()
            .<span class="fn">mapToDouble</span>(Student::getGpa).<span class="fn">average</span>().<span class="fn">orElse</span>(<span class="num">0.0</span>);
        System.out.<span class="fn">printf</span>(<span class="str">"  Class average GPA: %.2f%n"</span>, avgGpa);
    }
}` },
        { label: 'Putting it all together in main()', code: `<span class="kw">public class</span> Main {
    <span class="kw">public static void</span> <span class="fn">main</span>(String[] args) {
        CourseManager manager = <span class="kw">new</span> <span class="fn">CourseManager</span>();

        <span class="cm">// Add courses</span>
        manager.<span class="fn">addCourse</span>(<span class="str">"CS101"</span>, <span class="str">"Intro to Programming"</span>, <span class="num">3</span>);
        manager.<span class="fn">addCourse</span>(<span class="str">"CS201"</span>, <span class="str">"Data Structures"</span>, <span class="num">2</span>);
        manager.<span class="fn">addCourse</span>(<span class="str">"AI101"</span>, <span class="str">"AI Fundamentals"</span>, <span class="num">4</span>);

        <span class="cm">// Create students</span>
        Student[] students = {
            <span class="kw">new</span> <span class="fn">Student</span>(<span class="str">"Amara"</span>, <span class="num">15</span>),
            <span class="kw">new</span> <span class="fn">Student</span>(<span class="str">"Kofi"</span>,  <span class="num">16</span>),
            <span class="kw">new</span> <span class="fn">Student</span>(<span class="str">"Zara"</span>,  <span class="num">15</span>),
            <span class="kw">new</span> <span class="fn">Student</span>(<span class="str">"Liam"</span>,  <span class="num">17</span>)
        };

        <span class="cm">// Give students some scores</span>
        students[<span class="num">0</span>].<span class="fn">completeCourse</span>(<span class="num">3.8</span>); students[<span class="num">0</span>].<span class="fn">completeCourse</span>(<span class="num">3.9</span>);
        students[<span class="num">1</span>].<span class="fn">completeCourse</span>(<span class="num">3.1</span>); students[<span class="num">1</span>].<span class="fn">completeCourse</span>(<span class="num">2.9</span>);
        students[<span class="num">2</span>].<span class="fn">completeCourse</span>(<span class="num">4.0</span>);
        students[<span class="num">3</span>].<span class="fn">completeCourse</span>(<span class="num">3.5</span>);

        <span class="cm">// Enroll students</span>
        manager.<span class="fn">enrollStudent</span>(students[<span class="num">0</span>], <span class="str">"CS101"</span>);
        manager.<span class="fn">enrollStudent</span>(students[<span class="num">1</span>], <span class="str">"CS101"</span>);
        manager.<span class="fn">enrollStudent</span>(students[<span class="num">2</span>], <span class="str">"CS201"</span>);
        manager.<span class="fn">enrollStudent</span>(students[<span class="num">3</span>], <span class="str">"CS201"</span>);
        manager.<span class="fn">enrollStudent</span>(students[<span class="num">0</span>], <span class="str">"AI101"</span>);
        manager.<span class="fn">enrollStudent</span>(students[<span class="num">1</span>], <span class="str">"CS101"</span>);  <span class="cm">// duplicate — handled</span>
        manager.<span class="fn">enrollStudent</span>(students[<span class="num">2</span>], <span class="str">"CS201"</span>);  <span class="cm">// full — handled</span>

        manager.<span class="fn">printAllReports</span>();
    }
}` },
      ],
      fact: 'As of 2024, Java is still one of the top 3 most-used programming languages in the world despite being 30 years old. The Android ecosystem alone means billions of devices run Java code daily. Major financial institutions like Goldman Sachs and JPMorgan run millions of lines of Java for their trading systems — where a bug could mean losing billions of dollars in seconds.',
      history: null,
      quiz: { q: 'Why is Java described as "strongly typed" and what benefit does this provide?', opts: ['It requires more typing on the keyboard','Every variable must have an explicitly declared type — the compiler catches type errors before the program runs, preventing many bugs','Java programs run faster because of typing','It means Java is harder to learn than Python'], ans: 1 },
      challenge: { t: 'CAPSTONE — Hospital Patient Management System', d: `Build a complete system with: (1) abstract class Person with name, age, id. (2) Patient extends Person with: diagnosis, admissionDate, ArrayList<String> medications. (3) Doctor extends Person with: specialisation, ArrayList<Patient> patients under care. (4) Hospital class with HashMap<String,Patient> and ArrayList<Doctor>, supporting: admitPatient(), dischargePatient(), assignDoctor(), addMedication(patientId, med), getDoctorWorkload() returning sorted map of doctor→patient count. (5) Custom PatientNotFoundException. (6) Full formatted report printed to both console and a file patients_report.txt.` },
    },
  ],
};
