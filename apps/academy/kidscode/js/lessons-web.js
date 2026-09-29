T21.lessons.web = {
  title: 'Web Development', banner: 'web',
  subtitle: 'Build real websites from scratch — HTML structure, CSS beauty, JavaScript power.',
  steps: [

    /* ══════════════════════════════════════════════════════════
       STEP 1 — HTML: The Skeleton of Every Website
       ══════════════════════════════════════════════════════════ */
    {
      h: '🌐 Step 1 — HTML: How Every Website on Earth is Built',
      p: `Every website you've ever visited — YouTube, Instagram, Google, Wikipedia — is built from the same three technologies. We start with <strong>HTML (HyperText Markup Language)</strong>, which provides the <em>structure and content</em>. CSS adds beauty. JavaScript adds interactivity. But without HTML, neither of the others has anything to work with.
<br><br>
<strong>How HTML actually works:</strong><br>
HTML is a text file your browser reads and renders into a visual page. The browser doesn't show you the HTML code — it interprets the <em>tags</em> and displays the content those tags describe. Tags come in pairs: an opening tag <code>&lt;p&gt;</code> and a closing tag <code>&lt;/p&gt;</code>. Everything between them is the content of that element.
<br><br>
<strong>The required skeleton of every HTML page:</strong>`,
      code: `<span class="tag">&lt;!DOCTYPE html&gt;</span>  <span class="cm">&lt;!-- tells browser: this is HTML5 --&gt;</span>
<span class="tag">&lt;html</span> <span class="atr">lang=</span><span class="str">"en"</span><span class="tag">&gt;</span>   <span class="cm">&lt;!-- root element; lang helps screen readers --&gt;</span>

  <span class="tag">&lt;head&gt;</span>          <span class="cm">&lt;!-- INVISIBLE section: page settings --&gt;</span>
    <span class="tag">&lt;meta</span> <span class="atr">charset=</span><span class="str">"UTF-8"</span><span class="tag">&gt;</span>          <span class="cm">&lt;!-- supports all languages/emoji --&gt;</span>
    <span class="tag">&lt;meta</span> <span class="atr">name=</span><span class="str">"viewport"</span> <span class="atr">content=</span><span class="str">"width=device-width"</span><span class="tag">&gt;</span>
    <span class="tag">&lt;title&gt;</span>My Amazing Page<span class="tag">&lt;/title&gt;</span>   <span class="cm">&lt;!-- browser tab text --&gt;</span>
    <span class="tag">&lt;link</span> <span class="atr">rel=</span><span class="str">"stylesheet"</span> <span class="atr">href=</span><span class="str">"style.css"</span><span class="tag">&gt;</span>
  <span class="tag">&lt;/head&gt;</span>

  <span class="tag">&lt;body&gt;</span>          <span class="cm">&lt;!-- VISIBLE section: everything users see --&gt;</span>
    <span class="tag">&lt;h1&gt;</span>Hello, World!<span class="tag">&lt;/h1&gt;</span>           <span class="cm">&lt;!-- biggest heading --&gt;</span>
    <span class="tag">&lt;p&gt;</span>I built this page with HTML!<span class="tag">&lt;/p&gt;</span>
    <span class="tag">&lt;a</span> <span class="atr">href=</span><span class="str">"https://team21.academy"</span><span class="tag">&gt;</span>Visit Team21<span class="tag">&lt;/a&gt;</span>
  <span class="tag">&lt;/body&gt;</span>

<span class="tag">&lt;/html&gt;</span>`,
      examples: [
        { label: 'All the essential HTML elements', code: `<span class="tag">&lt;body&gt;</span>
  <span class="cm">&lt;!-- Headings: h1 biggest, h6 smallest --&gt;</span>
  <span class="tag">&lt;h1&gt;</span>Page Title (one per page!)<span class="tag">&lt;/h1&gt;</span>
  <span class="tag">&lt;h2&gt;</span>Section Title<span class="tag">&lt;/h2&gt;</span>
  <span class="tag">&lt;h3&gt;</span>Sub-section<span class="tag">&lt;/h3&gt;</span>

  <span class="cm">&lt;!-- Text content --&gt;</span>
  <span class="tag">&lt;p&gt;</span>A paragraph of text. Use <span class="tag">&lt;strong&gt;</span>bold<span class="tag">&lt;/strong&gt;</span>
     and <span class="tag">&lt;em&gt;</span>italic<span class="tag">&lt;/em&gt;</span> inside paragraphs.<span class="tag">&lt;/p&gt;</span>

  <span class="cm">&lt;!-- Lists --&gt;</span>
  <span class="tag">&lt;ul&gt;</span>  <span class="cm">&lt;!-- unordered (bullets) --&gt;</span>
    <span class="tag">&lt;li&gt;</span>HTML<span class="tag">&lt;/li&gt;</span>
    <span class="tag">&lt;li&gt;</span>CSS<span class="tag">&lt;/li&gt;</span>
    <span class="tag">&lt;li&gt;</span>JavaScript<span class="tag">&lt;/li&gt;</span>
  <span class="tag">&lt;/ul&gt;</span>
  <span class="tag">&lt;ol&gt;</span>  <span class="cm">&lt;!-- ordered (numbered) --&gt;</span>
    <span class="tag">&lt;li&gt;</span>First learn HTML<span class="tag">&lt;/li&gt;</span>
    <span class="tag">&lt;li&gt;</span>Then CSS<span class="tag">&lt;/li&gt;</span>
  <span class="tag">&lt;/ol&gt;</span>

  <span class="cm">&lt;!-- Links and images --&gt;</span>
  <span class="tag">&lt;a</span> <span class="atr">href=</span><span class="str">"page2.html"</span><span class="tag">&gt;</span>Internal link<span class="tag">&lt;/a&gt;</span>
  <span class="tag">&lt;a</span> <span class="atr">href=</span><span class="str">"https://google.com"</span> <span class="atr">target=</span><span class="str">"_blank"</span><span class="tag">&gt;</span>External (new tab)<span class="tag">&lt;/a&gt;</span>
  <span class="tag">&lt;img</span> <span class="atr">src=</span><span class="str">"photo.jpg"</span> <span class="atr">alt=</span><span class="str">"Description for accessibility"</span><span class="tag">&gt;</span>
<span class="tag">&lt;/body&gt;</span>` },
        { label: 'Semantic HTML — write meaningful structure', code: `<span class="cm">&lt;!-- BAD — no meaning, just boxes --&gt;</span>
<span class="tag">&lt;div</span> <span class="atr">class=</span><span class="str">"header"</span><span class="tag">&gt;</span>...<span class="tag">&lt;/div&gt;</span>
<span class="tag">&lt;div</span> <span class="atr">class=</span><span class="str">"nav"</span><span class="tag">&gt;</span>...<span class="tag">&lt;/div&gt;</span>
<span class="tag">&lt;div</span> <span class="atr">class=</span><span class="str">"content"</span><span class="tag">&gt;</span>...<span class="tag">&lt;/div&gt;</span>
<span class="tag">&lt;div</span> <span class="atr">class=</span><span class="str">"footer"</span><span class="tag">&gt;</span>...<span class="tag">&lt;/div&gt;</span>

<span class="cm">&lt;!-- GOOD — semantic tags that mean something --&gt;</span>
<span class="tag">&lt;header&gt;</span>      <span class="cm">&lt;!-- site logo, main title --&gt;</span>
  <span class="tag">&lt;nav&gt;</span>...<span class="tag">&lt;/nav&gt;</span>  <span class="cm">&lt;!-- navigation links --&gt;</span>
<span class="tag">&lt;/header&gt;</span>
<span class="tag">&lt;main&gt;</span>         <span class="cm">&lt;!-- primary content (one per page!) --&gt;</span>
  <span class="tag">&lt;article&gt;</span>...<span class="tag">&lt;/article&gt;</span>  <span class="cm">&lt;!-- self-contained content --&gt;</span>
  <span class="tag">&lt;aside&gt;</span>...<span class="tag">&lt;/aside&gt;</span>    <span class="cm">&lt;!-- sidebar / related content --&gt;</span>
<span class="tag">&lt;/main&gt;</span>
<span class="tag">&lt;footer&gt;</span>      <span class="cm">&lt;!-- copyright, contact info --&gt;</span>
<span class="tag">&lt;/footer&gt;</span>` },
      ],
      fact: 'Tim Berners-Lee invented HTML in 1991 at CERN — the particle physics lab — to help scientists share documents. He made it completely free. That single decision created the modern web. In 2004, Queen Elizabeth II knighted him for this contribution.',
      history: 'html_cern',
      quiz: { q: 'What is the purpose of the &lt;head&gt; section in HTML?', opts: ['It contains the visible page content','It contains page settings and metadata that browsers use but don\'t display','It is where JavaScript goes','It defines the page\'s font'], ans: 1 },
      challenge: { t: 'Your Personal Profile Page', d: 'Build a complete HTML page (no CSS yet!) for your personal profile. Include: a proper DOCTYPE and skeleton, an h1 with your name, an h2 "About Me" section with a paragraph, an h2 "My Hobbies" section with an unordered list of at least 4 hobbies, an h2 "My Favourite Websites" with a linked list (use target="_blank"), and a footer with today\'s date. Validate it by opening in a browser.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 2 — CSS: Selectors, Properties, the Box Model
       ══════════════════════════════════════════════════════════ */
    {
      h: '🎨 Step 2 — CSS: Selectors, the Box Model & Visual Design',
      p: `<strong>CSS (Cascading Style Sheets)</strong> is the styling layer of the web. HTML provides the raw content; CSS controls how every pixel looks. Without CSS, every webpage would look like a plain text document.
<br><br>
<strong>How CSS works — the rule structure:</strong><br>
<code>selector { property: value; }</code><br>
The <strong>selector</strong> targets which HTML elements to style. The <strong>property</strong> says what to change. The <strong>value</strong> says how to change it.
<br><br>
<strong>The three types of selectors you'll use constantly:</strong><br>
• <code>h1</code> — element selector (all h1 tags)<br>
• <code>.card</code> — class selector (all elements with class="card")<br>
• <code>#header</code> — ID selector (the ONE element with id="header")<br>
<br>
<strong>The Box Model</strong> — the most important CSS concept to understand:<br>
Every HTML element is a rectangular box with 4 layers from inside out: <strong>content → padding → border → margin</strong>. Getting spacing right requires understanding all four.`,
      code: `<span class="cm">/* === SELECTORS === */</span>
h1 { color: navy; }                  <span class="cm">/* element selector */</span>
.highlight { background: yellow; }  <span class="cm">/* class selector */</span>
#main-title { font-size: 3rem; }    <span class="cm">/* ID selector */</span>
h2, h3 { color: steelblue; }       <span class="cm">/* multiple elements */</span>
nav a { text-decoration: none; }    <span class="cm">/* descendant: a inside nav */</span>

<span class="cm">/* === BOX MODEL === */</span>
.card {
  <span class="cm">/* content size */</span>
  width: 300px;
  height: auto;          <span class="cm">/* auto = grows with content */</span>

  <span class="cm">/* padding: space INSIDE the border */</span>
  padding: 20px;         <span class="cm">/* all four sides */</span>
  padding: 10px 20px;   <span class="cm">/* top/bottom, left/right */</span>

  <span class="cm">/* border: the edge of the box */</span>
  border: 2px solid #4f8ef7;
  border-radius: 12px;  <span class="cm">/* rounded corners */</span>

  <span class="cm">/* margin: space OUTSIDE the border */</span>
  margin: 16px;          <span class="cm">/* pushes other elements away */</span>
  margin: 0 auto;        <span class="cm">/* centers block element horizontally */</span>
}`,
      examples: [
        { label: 'Typography — making text beautiful', code: `body {
  font-family: 'Segoe UI', Arial, sans-serif; <span class="cm">/* font stack */</span>
  font-size: 16px;        <span class="cm">/* base size */</span>
  line-height: 1.6;       <span class="cm">/* spacing between lines */</span>
  color: #333;            <span class="cm">/* dark grey, not harsh black */</span>
  background: #f8f9fa;
}

h1 {
  font-size: 2.5rem;      <span class="cm">/* rem = relative to root (16px) */</span>
  font-weight: 900;       <span class="cm">/* 100=thin, 400=normal, 700=bold, 900=black */</span>
  letter-spacing: -0.02em; <span class="cm">/* slightly tighter for headings */</span>
  line-height: 1.1;
  color: #1a1a2e;
}

p { max-width: 65ch; }   <span class="cm">/* ch = width of '0' char; ideal line length */</span>

a { color: #4f8ef7; }
a:hover { color: #2563eb; text-decoration: underline; } <span class="cm">/* :hover = pseudo-class */</span>` },
        { label: 'Colours — all the ways to specify colour in CSS', code: `<span class="cm">/* Named colours (147 built in) */</span>
color: red;   color: tomato;   color: steelblue;

<span class="cm">/* Hex codes — #RRGGBB (0-9 and A-F each channel) */</span>
color: #ff0000;   <span class="cm">/* pure red */</span>
color: #4f8ef7;   <span class="cm">/* nice blue */</span>
color: #1a1a2e;   <span class="cm">/* very dark navy */</span>

<span class="cm">/* RGB — easier to understand */</span>
color: rgb(255, 0, 0);          <span class="cm">/* pure red */</span>
color: rgb(79, 142, 247);       <span class="cm">/* blue */</span>

<span class="cm">/* RGBA — with transparency (0=invisible, 1=solid) */</span>
background: rgba(79, 142, 247, 0.15);  <span class="cm">/* translucent blue */</span>

<span class="cm">/* Gradients */</span>
background: linear-gradient(135deg, #667eea, #764ba2);
background: linear-gradient(to right, #f093fb, #f5576c);` },
        { label: 'Specificity — understanding the cascade', code: `<span class="cm">/* Specificity determines which rule WINS when rules conflict.
   Higher specificity = wins. Points: element=1, class=10, ID=100 */</span>

h1 { color: red; }          <span class="cm">/* specificity: 1 */</span>
.title { color: blue; }     <span class="cm">/* specificity: 10  — WINS over h1 */</span>
#main { color: green; }     <span class="cm">/* specificity: 100 — WINS over .title */</span>

<span class="cm">/* For an element: &lt;h1 class="title" id="main"&gt;Test&lt;/h1&gt;
   color will be GREEN (id wins) */</span>

<span class="cm">/* !important overrides everything — use sparingly! */</span>
h1 { color: purple !important; }  <span class="cm">/* now this wins */</span>

<span class="cm">/* Best practice: rely on class selectors for most styling.
   Avoid !important and ID selectors except for unique layouts. */</span>` },
      ],
      fact: 'CSS was invented by Håkon Wium Lie in 1994 specifically to separate content from presentation. Before CSS, designers used invisible HTML tables for layouts — a horrible hack. CSS made the web both more accessible and more maintainable.',
      history: 'css_1996',
      quiz: { q: 'In the CSS Box Model, what is "padding"?', opts: ['Space outside the border that pushes other elements away','Space inside the border between the content and the border edge','The border thickness itself','The width of the content area'], ans: 1 },
      challenge: { t: 'Style Your Profile Page', d: 'Take the HTML profile page you built in Step 1 and link a CSS stylesheet. Apply: a dark or colourful background, custom fonts with good line-height, a "card" class style with padding, border-radius and subtle border, distinct hover colours for all links, use margin: 0 auto to centre your main content, and add at least two gradient backgrounds. The page should look genuinely polished.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 3 — CSS Layout: Flexbox & Grid
       ══════════════════════════════════════════════════════════ */
    {
      h: '📐 Step 3 — CSS Layout: Flexbox and Grid (The Modern Way)',
      p: `Layout is the hardest part of CSS for beginners — placing elements exactly where you want them. Before 2015, web developers used hacks: floats, negative margins, inline-block tricks. Those are gone now. We use <strong>Flexbox</strong> and <strong>CSS Grid</strong>.
<br><br>
<strong>Flexbox</strong> — one-dimensional layout (row OR column at a time).<br>
Perfect for: navigation bars, button groups, cards in a single row, centering anything.
<br><br>
<strong>CSS Grid</strong> — two-dimensional layout (rows AND columns simultaneously).<br>
Perfect for: full page layouts, photo galleries, dashboard grids.
<br><br>
<strong>The golden rule:</strong> Apply <code>display: flex</code> or <code>display: grid</code> to the <em>parent</em> (container). The <em>children</em> inside it become flex-items or grid-items automatically.`,
      code: `<span class="cm">/* ═══ FLEXBOX ═══ */</span>
.nav {
  display: flex;
  justify-content: space-between;  <span class="cm">/* spread items across main axis */</span>
  align-items: center;             <span class="cm">/* centre on cross axis */</span>
  gap: 16px;                       <span class="cm">/* space between items */</span>
  padding: 12px 24px;
}

.card-row {
  display: flex;
  flex-wrap: wrap;                 <span class="cm">/* allow wrapping to new line */</span>
  gap: 20px;
  justify-content: center;
}

.card {
  flex: 1;                         <span class="cm">/* grow to fill available space */</span>
  min-width: 250px;                <span class="cm">/* don't get too narrow */</span>
  max-width: 350px;
}

<span class="cm">/* Perfect centering — finally easy! */</span>
.hero {
  display: flex;
  flex-direction: column;          <span class="cm">/* stack vertically */</span>
  align-items: center;             <span class="cm">/* horizontal centre */</span>
  justify-content: center;        <span class="cm">/* vertical centre */</span>
  min-height: 100vh;               <span class="cm">/* full screen height */</span>
}`,
      examples: [
        { label: 'CSS Grid — powerful two-dimensional layouts', code: `<span class="cm">/* Grid — define rows AND columns */</span>
.page-layout {
  display: grid;
  grid-template-columns: 250px 1fr;    <span class="cm">/* sidebar | main */</span>
  grid-template-rows: 60px 1fr 60px;  <span class="cm">/* header | content | footer */</span>
  min-height: 100vh;
  gap: 0;
}

<span class="cm">/* Place items in specific grid areas */</span>
header  { grid-column: 1 / -1; }    <span class="cm">/* span all columns */</span>
sidebar { grid-row: 2; }
main    { grid-row: 2; }
footer  { grid-column: 1 / -1; }

<span class="cm">/* Auto-fill card grid — responsive without media queries! */</span>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
<span class="cm">/* Cards automatically reflow: 4 per row on desktop,
   2 on tablet, 1 on mobile — NO media queries needed */</span>` },
        { label: 'Responsive design with media queries', code: `<span class="cm">/* Mobile-first: write base styles for small screens */</span>
.nav-links {
  display: none;      <span class="cm">/* hidden on mobile */</span>
}

<span class="cm">/* Then add styles for larger screens */</span>
@media (min-width: 768px) {
  .nav-links {
    display: flex;    <span class="cm">/* visible on tablet and up */</span>
    gap: 24px;
  }
  .hamburger { display: none; }

  .hero h1   { font-size: 4rem; }
  .card-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1200px) {
  .content { max-width: 1100px; margin: 0 auto; }
}

<span class="cm">/* Test your responsive design by resizing the browser window! */</span>` },
      ],
      fact: 'Before Flexbox and Grid, creating a vertically centred div required knowing obscure tricks involving absolute positioning, negative margins, and calculated percentages. The phrase "How do I centre a div?" became a famous programming meme because it was genuinely hard. Now it\'s two lines of CSS.',
      history: null,
      quiz: { q: 'Where do you apply "display: flex" to make Flexbox work?', opts: ['On each child element you want to control','On the parent (container) element','On the body element only','On the CSS :root selector'], ans: 1 },
      challenge: { t: 'Responsive Portfolio Layout', d: 'Build a complete page layout using Flexbox and Grid: a sticky navigation bar (flexbox with logo left, links right), a full-screen hero section (flexbox centre, column direction), a "Skills" section with cards in an auto-fill grid that adapts from 1 to 4 columns, and a footer. Add one media query that changes the nav to a column on mobile.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 4 — JavaScript Fundamentals in the Browser
       ══════════════════════════════════════════════════════════ */
    {
      h: '⚡ Step 4 — JavaScript: Making Pages Think and React',
      p: `HTML is the skeleton, CSS is the skin — <strong>JavaScript is the brain and muscles</strong>. It makes pages respond to user actions, fetch data, animate elements, and do anything dynamic. JavaScript is the only programming language that runs directly inside web browsers, making it the most deployed language on Earth.
<br><br>
<strong>How JavaScript connects to your HTML:</strong><br>
JavaScript accesses and modifies your page through the <strong>DOM (Document Object Model)</strong> — a live tree of every HTML element on the page. Change the DOM with JavaScript and the browser visually updates instantly.
<br><br>
<strong>The essential DOM methods:</strong><br>
<code>document.getElementById('id')</code> — get one element by its id<br>
<code>document.querySelector('.class')</code> — get the first match of any CSS selector<br>
<code>document.querySelectorAll('p')</code> — get ALL matches (returns a list)<br>
Once you have an element, you can change: <code>.textContent</code>, <code>.innerHTML</code>, <code>.style</code>, <code>.classList</code>`,
      code: `<span class="cm">// Variables (use const unless you need to reassign, then let)</span>
<span class="kw">const</span> title   = document.<span class="fn">getElementById</span>(<span class="str">'main-title'</span>)
<span class="kw">const</span> counter = document.<span class="fn">querySelector</span>(<span class="str">'.counter'</span>)
<span class="kw">const</span> allCards = document.<span class="fn">querySelectorAll</span>(<span class="str">'.card'</span>)

<span class="cm">// Changing content and style</span>
title.textContent = <span class="str">'Hello from JavaScript!'</span>   <span class="cm">// change text (safe)</span>
title.innerHTML   = <span class="str">'Hello &lt;strong&gt;World&lt;/strong&gt;!'</span> <span class="cm">// renders HTML tags</span>
title.style.color     = <span class="str">'#4f8ef7'</span>
title.style.fontSize  = <span class="str">'2.5rem'</span>
title.style.transform = <span class="str">'scale(1.1)'</span>

<span class="cm">// Adding / removing CSS classes (best practice for styling)</span>
title.<span class="fn">classList</span>.<span class="fn">add</span>(<span class="str">'highlighted'</span>)
title.<span class="fn">classList</span>.<span class="fn">remove</span>(<span class="str">'hidden'</span>)
title.<span class="fn">classList</span>.<span class="fn">toggle</span>(<span class="str">'dark-mode'</span>)  <span class="cm">// add if missing, remove if present</span>

<span class="cm">// Loop over all matching elements</span>
allCards.<span class="fn">forEach</span>((card, index) => {
  card.style.animationDelay = <span class="str">\`\${index * 0.1}s\`</span>
})`,
      examples: [
        { label: 'Event listeners — responding to user actions', code: `<span class="cm">// HTML: &lt;button id="myBtn"&gt;Click me!&lt;/button&gt;</span>
<span class="cm">//       &lt;p id="output"&gt;Waiting...&lt;/p&gt;</span>

<span class="kw">const</span> btn    = document.<span class="fn">getElementById</span>(<span class="str">'myBtn'</span>)
<span class="kw">const</span> output = document.<span class="fn">getElementById</span>(<span class="str">'output'</span>)
<span class="kw">let</span> clickCount = <span class="num">0</span>

btn.<span class="fn">addEventListener</span>(<span class="str">'click'</span>, () => {
  clickCount++
  output.textContent = <span class="str">\`You clicked \${clickCount} time(s)!\`</span>
  <span class="kw">if</span> (clickCount >= <span class="num">10</span>) {
    output.textContent = <span class="str">'OK you REALLY like clicking 😄'</span>
    btn.style.background = <span class="str">'#ef4444'</span>
  }
})

<span class="cm">// Other common events:</span>
input.<span class="fn">addEventListener</span>(<span class="str">'input'</span>, (e) => { <span class="cm">/* fires as user types */</span> })
form.<span class="fn">addEventListener</span>(<span class="str">'submit'</span>, (e) => { e.<span class="fn">preventDefault</span>(); <span class="cm">/* stop page reload */</span> })
card.<span class="fn">addEventListener</span>(<span class="str">'mouseenter'</span>, () => { <span class="cm">/* hover start */</span> })` },
        { label: 'Creating and inserting new HTML elements', code: `<span class="cm">// Creating elements entirely from JavaScript</span>
<span class="kw">function</span> <span class="fn">addTodo</span>(text) {
  <span class="cm">// 1. Create the element</span>
  <span class="kw">const</span> li = document.<span class="fn">createElement</span>(<span class="str">'li'</span>)

  <span class="cm">// 2. Set its content and attributes</span>
  li.textContent = text
  li.<span class="fn">classList</span>.<span class="fn">add</span>(<span class="str">'todo-item'</span>)

  <span class="cm">// 3. Add a delete button inside it</span>
  <span class="kw">const</span> deleteBtn = document.<span class="fn">createElement</span>(<span class="str">'button'</span>)
  deleteBtn.textContent = <span class="str">'✕'</span>
  deleteBtn.<span class="fn">addEventListener</span>(<span class="str">'click'</span>, () => li.<span class="fn">remove</span>())
  li.<span class="fn">appendChild</span>(deleteBtn)

  <span class="cm">// 4. Add to the page</span>
  document.<span class="fn">getElementById</span>(<span class="str">'todo-list'</span>).<span class="fn">appendChild</span>(li)
}

<span class="fn">addTodo</span>(<span class="str">'Learn HTML'</span>)
<span class="fn">addTodo</span>(<span class="str">'Master CSS'</span>)
<span class="fn">addTodo</span>(<span class="str">'Build with JavaScript'</span>)` },
        { label: 'Working with forms and input values', code: `<span class="cm">// HTML:
// &lt;input id="nameInput" placeholder="Your name"&gt;
// &lt;select id="levelSelect"&gt;
//   &lt;option value="beginner"&gt;Beginner&lt;/option&gt;
//   &lt;option value="advanced"&gt;Advanced&lt;/option&gt;
// &lt;/select&gt;
// &lt;button id="submitBtn"&gt;Submit&lt;/button&gt;
// &lt;div id="result"&gt;&lt;/div&gt;</span>

<span class="kw">const</span> nameInput    = document.<span class="fn">getElementById</span>(<span class="str">'nameInput'</span>)
<span class="kw">const</span> levelSelect  = document.<span class="fn">getElementById</span>(<span class="str">'levelSelect'</span>)
<span class="kw">const</span> result       = document.<span class="fn">getElementById</span>(<span class="str">'result'</span>)

document.<span class="fn">getElementById</span>(<span class="str">'submitBtn'</span>)
  .<span class="fn">addEventListener</span>(<span class="str">'click'</span>, () => {
    <span class="kw">const</span> name  = nameInput.value.<span class="fn">trim</span>()
    <span class="kw">const</span> level = levelSelect.value

    <span class="kw">if</span> (!name) {
      result.innerHTML = <span class="str">'&lt;span style="color:red"&gt;Please enter your name!&lt;/span&gt;'</span>
      <span class="kw">return</span>
    }
    result.innerHTML = <span class="str">\`&lt;strong&gt;Welcome, \${name}!&lt;/strong&gt; Level: \${level}\`</span>
  })` },
      ],
      fact: 'JavaScript was written in 10 days in 1995 by Brendan Eich at Netscape. Eich originally called it "Mocha," then "LiveScript," before renaming it JavaScript as a marketing move to piggyback on Java\'s popularity. Despite the name, JavaScript and Java are completely unrelated languages.',
      history: 'js_10days',
      quiz: { q: 'What is the DOM in JavaScript?', opts: ['A type of database','A live tree of all HTML elements on the page that JavaScript can read and modify','A JavaScript library','The browser\'s memory cache'], ans: 1 },
      challenge: { t: 'Live Character Counter with Warning', d: 'Build a textarea with a character counter that updates live as the user types. Show "X characters remaining" where max is 280 (like Twitter). Turn the counter orange below 50 remaining, red below 20, and disable a "Post" button when the limit is exceeded. Display a word count too.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 5 — Animations, Transitions & CSS Variables
       ══════════════════════════════════════════════════════════ */
    {
      h: '✨ Step 5 — CSS Animations, Transitions & CSS Variables',
      p: `A great website doesn't just look good — it <em>feels</em> good to use. Smooth transitions and animations make interactions feel natural and polished. The good news: modern CSS handles most animations without any JavaScript.
<br><br>
<strong>Transitions</strong> — smoothly change between two CSS states (e.g., hover effect).<br>
<strong>Animations</strong> — play a multi-step sequence automatically or on demand.<br>
<strong>CSS Variables (Custom Properties)</strong> — store values you reuse throughout your CSS, making it easy to implement dark mode, theme switching, and consistent design systems.`,
      code: `<span class="cm">/* === CSS VARIABLES (Custom Properties) === */</span>
:root {
  --primary:    #4f8ef7;    <span class="cm">/* use anywhere with var(--primary) */</span>
  --secondary:  #8b5cf6;
  --text:       #1a1a2e;
  --bg:         #ffffff;
  --radius:     12px;
  --shadow:     0 4px 20px rgba(0,0,0,0.1);
}

.card {
  background: var(--bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border: 2px solid var(--primary);
}

<span class="cm">/* Dark mode — change variables, everything updates! */</span>
@media (prefers-color-scheme: dark) {
  :root {
    --text: #e8f0fe;
    --bg:   #0a0e1a;
  }
}`,
      examples: [
        { label: 'Smooth transitions on hover', code: `<span class="cm">/* Basic transition syntax:
   transition: property duration easing-function */</span>
.button {
  background: var(--primary);
  color: white;
  padding: 12px 28px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  transform: translateY(0);
  box-shadow: 0 4px 15px rgba(79,142,247,0.4);

  <span class="cm">/* Smooth ALL changing properties over 0.3 seconds */</span>
  transition: all 0.3s ease;
}

.button:hover {
  background: #2563eb;
  transform: translateY(-3px);  <span class="cm">/* float up */</span>
  box-shadow: 0 8px 25px rgba(79,142,247,0.6);
}

.button:active {
  transform: translateY(1px);   <span class="cm">/* press down */</span>
  box-shadow: 0 2px 8px rgba(79,142,247,0.4);
}` },
        { label: '@keyframes — full animations', code: `<span class="cm">/* Define the animation */</span>
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1);    opacity: 1; }
  50%       { transform: scale(1.05); opacity: 0.8; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

<span class="cm">/* Apply animations */</span>
.hero-text {
  animation: fadeSlideIn 0.8s ease forwards;
}
.logo { animation: pulse 2s ease-in-out infinite; }
.loader { animation: spin 1s linear infinite; }

<span class="cm">/* Stagger card animations */</span>
.card:nth-child(1) { animation-delay: 0.1s; }
.card:nth-child(2) { animation-delay: 0.2s; }
.card:nth-child(3) { animation-delay: 0.3s; }` },
      ],
      fact: 'Netflix A/B tested two versions of a button: one that changed colour instantly when hovered, and one with a 200ms transition. Users rated the smooth version as feeling "faster" and "more professional" even though the actual functionality was identical. Perceived smoothness changes how users feel about a product.',
      history: null,
      quiz: { q: 'What is a CSS Variable (Custom Property) and why is it useful?', opts: ['A JavaScript variable used in CSS','A value stored with a name (like --primary) that can be reused throughout CSS and changed in one place to update everywhere','A preset colour palette provided by the browser','A way to import fonts'], ans: 1 },
      challenge: { t: 'Animated Landing Page', d: 'Build a landing page with: CSS variables for a complete color theme, a hero section where the heading and subtext fade+slide in with staggered animation delays, smooth hover transitions on all buttons and cards, a loading spinner animation, and a toggle button (using JavaScript classList.toggle) that switches between light and dark mode by changing a class on the body element.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 6 — Fetch, APIs & Working With Data
       ══════════════════════════════════════════════════════════ */
    {
      h: '🌍 Step 6 — Fetch API: Connecting Your Website to the Real World',
      p: `Static websites display the same content every time. <em>Dynamic</em> websites fetch fresh data from servers — that's how Twitter shows new tweets, weather apps show today's weather, and YouTube recommends videos. This happens through <strong>APIs (Application Programming Interfaces)</strong>.
<br><br>
An API is a service that responds to requests with data, usually in <strong>JSON format</strong> (JavaScript Object Notation) — which looks exactly like a JavaScript object and is trivially easy to work with.
<br><br>
<strong>The fetch() function</strong> sends a request to a URL and returns a <em>Promise</em> — a placeholder for data that will arrive soon. We handle this with <code>async/await</code> to write it in a clean, readable way. This is one of the most important patterns in modern web development.`,
      code: `<span class="cm">// async function — can use await inside it</span>
<span class="kw">async function</span> <span class="fn">getRandomDog</span>() {
  <span class="kw">try</span> {
    <span class="cm">// fetch() sends an HTTP GET request to the URL</span>
    <span class="kw">const</span> response = <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">'https://dog.ceo/api/breeds/image/random'</span>)

    <span class="cm">// Check if the request worked</span>
    <span class="kw">if</span> (!response.ok) <span class="kw">throw new</span> <span class="fn">Error</span>(<span class="str">\`HTTP \${response.status}\`</span>)

    <span class="cm">// .json() parses the JSON response into a JS object</span>
    <span class="kw">const</span> data = <span class="kw">await</span> response.<span class="fn">json</span>()

    <span class="cm">// data looks like: { message: "https://...", status: "success" }</span>
    <span class="kw">const</span> img = document.<span class="fn">getElementById</span>(<span class="str">'dog-image'</span>)
    img.src = data.message
    img.alt = <span class="str">'Random dog photo'</span>

  } <span class="kw">catch</span> (error) {
    <span class="fn">console</span>.<span class="fn">error</span>(<span class="str">'Failed to load dog:'</span>, error)
    document.<span class="fn">getElementById</span>(<span class="str">'error-msg'</span>).textContent = <span class="str">'Could not load image.'</span>
  }
}

document.<span class="fn">getElementById</span>(<span class="str">'load-btn'</span>).<span class="fn">addEventListener</span>(<span class="str">'click'</span>, getRandomDog)`,
      examples: [
        { label: 'Working with JSON data — real world structure', code: `<span class="cm">// JSON looks exactly like a JavaScript object/array.
// A real API response for a user might look like:</span>
<span class="kw">const</span> apiResponse = {
  id: <span class="num">42</span>,
  name: <span class="str">"Amara Nkosi"</span>,
  email: <span class="str">"amara@example.com"</span>,
  scores: [<span class="num">88</span>, <span class="num">92</span>, <span class="num">79</span>],
  address: {
    city: <span class="str">"Accra"</span>,
    country: <span class="str">"Ghana"</span>
  },
  tags: [<span class="str">"python"</span>, <span class="str">"javascript"</span>]
}

<span class="cm">// Accessing nested JSON data:</span>
<span class="fn">console</span>.<span class="fn">log</span>(apiResponse.name)             <span class="cm">// Amara Nkosi</span>
<span class="fn">console</span>.<span class="fn">log</span>(apiResponse.address.city)     <span class="cm">// Accra</span>
<span class="fn">console</span>.<span class="fn">log</span>(apiResponse.scores[<span class="num">0</span>])       <span class="cm">// 88</span>
<span class="fn">console</span>.<span class="fn">log</span>(apiResponse.tags.<span class="fn">join</span>(<span class="str">', '</span>)) <span class="cm">// python, javascript</span>

<span class="cm">// Rendering API data into HTML:</span>
<span class="kw">const</span> card = document.<span class="fn">getElementById</span>(<span class="str">'user-card'</span>)
card.innerHTML = <span class="str">\`
  &lt;h2&gt;\${apiResponse.name}&lt;/h2&gt;
  &lt;p&gt;\${apiResponse.address.city}, \${apiResponse.address.country}&lt;/p&gt;
  &lt;p&gt;Avg score: \${apiResponse.scores.<span class="fn">reduce</span>((a,b)=>a+b,0)/apiResponse.scores.length}&lt;/p&gt;
\`</span>` },
        { label: 'Loading states — professional UX pattern', code: `<span class="kw">async function</span> <span class="fn">fetchWeather</span>(city) {
  <span class="kw">const</span> resultsEl = document.<span class="fn">getElementById</span>(<span class="str">'results'</span>)

  <span class="cm">// 1. Show loading state immediately</span>
  resultsEl.innerHTML = <span class="str">'&lt;div class="spinner"&gt;&lt;/div&gt;&lt;p&gt;Loading...&lt;/p&gt;'</span>

  <span class="kw">try</span> {
    <span class="kw">const</span> res  = <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">\`https://wttr.in/\${city}?format=j1\`</span>)
    <span class="kw">const</span> data = <span class="kw">await</span> res.<span class="fn">json</span>()

    <span class="kw">const</span> temp = data.current_condition[<span class="num">0</span>].temp_C
    <span class="kw">const</span> desc = data.current_condition[<span class="num">0</span>].weatherDesc[<span class="num">0</span>].value

    <span class="cm">// 2. Replace loading state with real data</span>
    resultsEl.innerHTML = <span class="str">\`
      &lt;div class="weather-card"&gt;
        &lt;h2&gt;\${city}&lt;/h2&gt;
        &lt;p class="temp"&gt;\${temp}°C&lt;/p&gt;
        &lt;p&gt;\${desc}&lt;/p&gt;
      &lt;/div&gt;\`</span>

  } <span class="kw">catch</span> (err) {
    <span class="cm">// 3. Show clear error message</span>
    resultsEl.innerHTML = <span class="str">'&lt;p class="error"&gt;❌ Could not load weather. Try again.&lt;/p&gt;'</span>
  }
}` },
      ],
      fact: 'Twitter\'s API, the GitHub API, Google Maps, and Spotify all work by responding to fetch() requests with JSON data. The skills in this lesson are literally how professional web developers build every single dynamic website on the internet. You now understand the fundamental pattern used by Netflix, Airbnb, and Amazon.',
      history: null,
      quiz: { q: 'Why do we use "async" and "await" when using fetch()?', opts: ['They make code run faster','They handle the fact that fetching data takes time — the program waits for the response without freezing the page','They are required by all browsers','They encrypt the request'], ans: 1 },
      challenge: { t: 'Real-Time Currency Converter', d: 'Build a currency converter using the free exchangerate.host API (https://api.exchangerate.host/latest). Fetch live rates on page load. Let the user enter an amount and pick from/to currencies via dropdowns. Display the converted amount that updates live as they type, plus the exchange rate used. Show a loading spinner while fetching.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 7 — Capstone: Full Interactive Website
       ══════════════════════════════════════════════════════════ */
    {
      h: '🏆 Step 7 — Capstone: Build a Complete Interactive Web Application',
      p: `It's time to combine everything — HTML structure, CSS layout and animation, JavaScript interactivity, and API data — into one complete, real-world project: a Personal Learning Tracker.
<br><br>
This project covers every skill from this course: semantic HTML, CSS variables, Flexbox/Grid layout, responsive design, CSS animations, DOM manipulation, event listeners, dynamic content creation, local data persistence with <code>localStorage</code>, and a clean, professional UI.
<br><br>
<strong>What we're building:</strong> A dashboard where students can add courses they're learning, mark lessons complete, track their streak, and see visual progress bars — all persisting between page loads.`,
      code: `<span class="cm">// Data management with localStorage (persists between page loads)</span>
<span class="kw">const</span> STORAGE_KEY = <span class="str">'learning_tracker_v1'</span>

<span class="kw">function</span> <span class="fn">loadData</span>() {
  <span class="kw">const</span> saved = localStorage.<span class="fn">getItem</span>(STORAGE_KEY)
  <span class="kw">return</span> saved ? <span class="fn">JSON.parse</span>(saved) : { courses: [], streak: 0 }
}

<span class="kw">function</span> <span class="fn">saveData</span>(data) {
  localStorage.<span class="fn">setItem</span>(STORAGE_KEY, <span class="fn">JSON.stringify</span>(data))
}

<span class="kw">function</span> <span class="fn">addCourse</span>(name, totalLessons) {
  <span class="kw">const</span> data = <span class="fn">loadData</span>()
  data.courses.<span class="fn">push</span>({
    id: Date.<span class="fn">now</span>(),
    name,
    totalLessons,
    completedLessons: <span class="num">0</span>,
    addedDate: <span class="kw">new</span> <span class="fn">Date</span>().<span class="fn">toISOString</span>(),
  })
  <span class="fn">saveData</span>(data)
  <span class="fn">renderDashboard</span>()
}`,
      examples: [
        { label: 'Rendering dynamic course cards', code: `<span class="kw">function</span> <span class="fn">renderDashboard</span>() {
  <span class="kw">const</span> { courses } = <span class="fn">loadData</span>()
  <span class="kw">const</span> grid = document.<span class="fn">getElementById</span>(<span class="str">'courses-grid'</span>)

  <span class="kw">if</span> (courses.length === <span class="num">0</span>) {
    grid.innerHTML = <span class="str">'&lt;p class="empty"&gt;No courses yet. Add one above!&lt;/p&gt;'</span>
    <span class="kw">return</span>
  }

  grid.innerHTML = courses.<span class="fn">map</span>(course => {
    <span class="kw">const</span> pct = <span class="fn">Math.round</span>(course.completedLessons / course.totalLessons * <span class="num">100</span>)
    <span class="kw">const</span> done = pct === <span class="num">100</span>

    <span class="kw">return</span> <span class="str">\`
      &lt;div class="course-card \${done ? 'completed' : ''}"&gt;
        &lt;h3&gt;\${done ? '✅' : '📖'} \${course.name}&lt;/h3&gt;
        &lt;div class="progress-track"&gt;
          &lt;div class="progress-fill" style="width:\${pct}%"&gt;&lt;/div&gt;
        &lt;/div&gt;
        &lt;p&gt;\${course.completedLessons} / \${course.totalLessons} lessons (\${pct}%)&lt;/p&gt;
        &lt;button onclick="completeLesson(\${course.id})" \${done ? 'disabled' : ''}&gt;
          Mark Lesson Complete ✓
        &lt;/button&gt;
        &lt;button class="delete" onclick="deleteCourse(\${course.id})"&gt;🗑️&lt;/button&gt;
      &lt;/div&gt;
    \`</span>
  }).<span class="fn">join</span>(<span class="str">''</span>)
}` },
        { label: 'Complete application bootstrap', code: `<span class="cm">// Wire up the "Add Course" form</span>
document.<span class="fn">getElementById</span>(<span class="str">'add-form'</span>)
  .<span class="fn">addEventListener</span>(<span class="str">'submit'</span>, (e) => {
    e.<span class="fn">preventDefault</span>()

    <span class="kw">const</span> name    = document.<span class="fn">getElementById</span>(<span class="str">'course-name'</span>).value.<span class="fn">trim</span>()
    <span class="kw">const</span> lessons = <span class="fn">parseInt</span>(document.<span class="fn">getElementById</span>(<span class="str">'lesson-count'</span>).value)

    <span class="kw">if</span> (!name || lessons < <span class="num">1</span>) <span class="kw">return</span>

    <span class="fn">addCourse</span>(name, lessons)
    e.target.<span class="fn">reset</span>()
  })

<span class="cm">// Mark a lesson complete</span>
<span class="kw">function</span> <span class="fn">completeLesson</span>(courseId) {
  <span class="kw">const</span> data = <span class="fn">loadData</span>()
  <span class="kw">const</span> course = data.courses.<span class="fn">find</span>(c => c.id === courseId)
  <span class="kw">if</span> (course && course.completedLessons < course.totalLessons) {
    course.completedLessons++
    <span class="fn">saveData</span>(data)
    <span class="fn">renderDashboard</span>()

    <span class="cm">// Celebrate completion!</span>
    <span class="kw">if</span> (course.completedLessons === course.totalLessons) {
      <span class="fn">showCelebration</span>(<span class="str">\`🎉 You finished \${course.name}!\`</span>)
    }
  }
}

<span class="cm">// Start the app</span>
<span class="fn">renderDashboard</span>()` },
      ],
      fact: 'Every single-page application you\'ve used — Gmail, Google Docs, Trello, Notion — is built on exactly the same fundamental patterns you just learned: fetch data, store it in JavaScript objects, render HTML from that data, respond to events, update the data, and re-render. The scale differs enormously; the pattern is the same.',
      history: null,
      quiz: { q: 'What does localStorage.setItem(key, value) do?', opts: ['Saves data to a server','Saves data in the user\'s browser that persists even after they close and reopen the page','Encrypts your data','Creates a new HTML element'], ans: 1 },
      challenge: { t: 'CAPSTONE — Complete Learning Tracker App', d: `Build the complete Learning Tracker app with: (1) A styled form to add a new course (name + total lessons), (2) A responsive grid of course cards using CSS Grid auto-fill, (3) Each card shows: course name, animated progress bar, lesson count, a "Complete Lesson" button (disabled when finished), and a delete button, (4) Stats bar at the top showing total courses, total lessons completed, and overall progress %, (5) localStorage persistence so data survives page refresh, (6) A confetti or celebration animation when a course reaches 100%, (7) A dark/light mode toggle, (8) Smooth CSS transitions on all interactions. This is your portfolio piece — make it beautiful.` },
    },
  ],
};
