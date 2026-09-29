T21.lessons.ai = {
  title: 'AI & How Claude Thinks', banner: 'ai',
  subtitle: 'Go inside neural networks, large language models, and the real engineering behind AI like Claude.',
  steps: [

    /* ═══ STEP 1: Rule-based AI vs Machine Learning ═══ */
    {
      h: '🤖 Step 1 — Rule-Based AI vs Machine Learning: Two Completely Different Approaches',
      p: `People talk about "AI" as though it's one thing. It isn't. There are two fundamentally different approaches to making computers behave intelligently — and understanding the difference is the foundation of everything else in this course.
<br><br>
<strong>Approach 1: Rule-Based AI (Expert Systems)</strong><br>
A human expert encodes their knowledge as explicit if/else rules. The computer follows those rules precisely. If the rules don't cover a situation, the system fails. Building a rule-based chess program means manually coding thousands of rules: "If a queen is threatened and no safe square exists, evaluate sacrificing a piece for positional advantage..." Expert systems dominated AI research from the 1960s through the 1980s and had real commercial successes — MYCIN diagnosed bacterial infections as well as specialists in 1974, and Deep Blue beat Garry Kasparov at chess in 1997 using hand-crafted rules and massive search trees.
<br><br>
<strong>Approach 2: Machine Learning</strong><br>
Instead of writing rules, you feed the computer thousands or millions of <em>examples</em> and let it extract the rules itself. No human needs to understand the patterns — the algorithm discovers them. A spam classifier trained on 10 million emails learns what spam looks like without a programmer ever defining "spam." This approach scales to problems where the rules are simply too complex for humans to write.
<br><br>
<strong>The key question: which approach for which problem?</strong><br>
Rule-based is better when: the rules are known and finite, interpretability matters (medicine, law), the problem is small enough for rules to cover completely. ML is better when: the patterns are too complex to hand-code, huge training data is available, the system must handle variation and novelty.`,
      code: `<span class="cm"># RULE-BASED system: chatbot with explicit rules
# Every possible input must be anticipated and coded by a human.</span>

<span class="kw">class</span> RuleBasedBot:
    <span class="str">"""Rigid, brittle — any unanticipated input gets a generic response."""</span>

    RULES = {
        <span class="str">"hello"</span>:    <span class="str">"Hello! How can I help you today?"</span>,
        <span class="str">"hi"</span>:       <span class="str">"Hi there! What can I do for you?"</span>,
        <span class="str">"bye"</span>:      <span class="str">"Goodbye! Have a great day!"</span>,
        <span class="str">"weather"</span>:  <span class="str">"I'm sorry, I can't check the weather."</span>,
        <span class="str">"help"</span>:     <span class="str">"I can say hello and goodbye. That's it."</span>,
    }

    <span class="kw">def</span> <span class="fn">respond</span>(self, user_input: <span class="fn">str</span>) -> <span class="fn">str</span>:
        key = user_input.<span class="fn">lower</span>().<span class="fn">strip</span>().<span class="fn">rstrip</span>(<span class="str">"!?."</span>)
        <span class="kw">return</span> self.RULES.<span class="fn">get</span>(key, <span class="str">"I don't understand. My rules don't cover that."</span>)

bot = <span class="fn">RuleBasedBot</span>()
tests = [<span class="str">"hello"</span>, <span class="str">"Hi!"</span>, <span class="str">"What's the weather?"</span>, <span class="str">"Hey, how are you?"</span>]
<span class="kw">for</span> t <span class="kw">in</span> tests:
    <span class="fn">print</span>(<span class="str">f"User: {t}"</span>)
    <span class="fn">print</span>(<span class="str">f"Bot:  {bot.respond(t)}"</span>)
    <span class="fn">print</span>()`,
      examples: [
        { label: 'ML-based sentiment classifier — learns rules from data', code: `<span class="kw">from</span> sklearn.feature_extraction.text <span class="kw">import</span> CountVectorizer
<span class="kw">from</span> sklearn.naive_bayes <span class="kw">import</span> MultinomialNB
<span class="kw">import</span> numpy <span class="kw">as</span> np

<span class="cm"># ML approach: give examples, let it learn the rules itself</span>
training_texts = [
    <span class="str">"I love this!"</span>, <span class="str">"Amazing product!"</span>, <span class="str">"Really happy with this purchase."</span>,
    <span class="str">"Highly recommend!"</span>, <span class="str">"Perfect, works great."</span>,
    <span class="str">"Terrible quality."</span>, <span class="str">"Waste of money."</span>, <span class="str">"Broken on arrival."</span>,
    <span class="str">"Very disappointed."</span>, <span class="str">"Never buying again."</span>,
]
labels = [<span class="num">1</span>,<span class="num">1</span>,<span class="num">1</span>,<span class="num">1</span>,<span class="num">1</span>,  <span class="num">0</span>,<span class="num">0</span>,<span class="num">0</span>,<span class="num">0</span>,<span class="num">0</span>]   <span class="cm"># 1=positive, 0=negative</span>

vectoriser = <span class="fn">CountVectorizer</span>()
X          = vectoriser.<span class="fn">fit_transform</span>(training_texts)
model      = <span class="fn">MultinomialNB</span>().<span class="fn">fit</span>(X, labels)

<span class="cm"># Now classify sentences the model has NEVER seen before</span>
new_texts = [<span class="str">"Absolutely fantastic experience!"</span>, <span class="str">"Complete rubbish, avoid!"</span>]
new_X     = vectoriser.<span class="fn">transform</span>(new_texts)
preds     = model.<span class="fn">predict</span>(new_X)
<span class="kw">for</span> text, pred <span class="kw">in</span> <span class="fn">zip</span>(new_texts, preds):
    <span class="fn">print</span>(<span class="str">f"{'✅ Positive' if pred else '❌ Negative'}: {text}"</span>)
<span class="cm"># The model learned "fantastic" = positive, "rubbish" = negative
# WITHOUT us coding those rules — it extracted them from examples.</span>` },
      ],
      fact: 'In 1997, IBM\'s Deep Blue defeated world chess champion Garry Kasparov using entirely rule-based AI — no machine learning at all. It evaluated 200 million board positions per second using hand-coded rules written by grandmasters. In 2017, Google\'s AlphaZero learned to play chess from scratch in 4 hours by playing against itself — no human rules — and then defeated the world\'s best chess program 28-0 with 72 draws. The ML approach had discovered strategies no human had ever considered.',
      history: 'deep_blue_1997',
      quiz: { q: 'What is the fundamental difference between rule-based AI and machine learning?', opts: ['Rule-based AI is always slower','Rule-based AI follows explicit human-coded rules; ML learns rules automatically from examples — making ML capable of solving problems too complex to write rules for','Rule-based AI cannot play games','ML systems always outperform rule-based systems'], ans: 1 },
      challenge: { t: 'Build and Compare Both Approaches', d: 'Build a temperature advisory system using BOTH approaches on the same problem. Rule-based: write explicit if/elif/else rules for 8+ weather conditions (temperature, humidity, wind speed) that recommend clothing. ML-based: generate 200 synthetic weather samples, train a decision tree on them, and compare accuracy. Feed 10 new inputs to both systems. Which is more accurate? Which is easier to explain to a non-programmer? Write a paragraph comparing when you\'d choose each.' },
    },

    /* ═══ STEP 2: How Text Becomes Numbers ═══ */
    {
      h: '🔢 Step 2 — How Text Becomes Numbers: Tokenisation and Embeddings',
      p: `Here is the fundamental challenge of language AI: computers only work with numbers. They have no innate understanding of what "cat" means, or that "happy" and "joyful" are related, or that "Paris" is to "France" as "Berlin" is to "Germany." Every piece of text you've ever sent to an AI must first be converted into numbers.
<br><br>
<strong>Stage 1: Tokenisation — splitting text into units</strong><br>
Modern LLMs don't split text into words — they split into <em>subwords</em> using algorithms like BPE (Byte-Pair Encoding) or WordPiece. This handles unknown words and multiple languages elegantly: "unbelievably" might become ["un", "believ", "ably"]. Each token gets a unique integer ID.
<br><br>
<code>"Hello, world!" → [15496, 11, 995, 0]</code> (GPT-style tokenisation)
<br><br>
<strong>Stage 2: Embeddings — giving numbers meaning</strong><br>
Token IDs alone are meaningless numbers. <em>Embeddings</em> map each token to a dense vector of typically 768–4096 floating-point numbers. These vectors are <em>learned</em> during training, and the remarkable result is that semantically similar words end up geometrically close in this high-dimensional space:
<br><br>
• <code>vector("king") − vector("man") + vector("woman") ≈ vector("queen")</code><br>
• <code>vector("Paris") − vector("France") + vector("Italy") ≈ vector("Rome")</code><br>
<br>
The geometry of the embedding space encodes the relationships between concepts — relationships the model discovered purely from statistics of word co-occurrence across billions of documents.`,
      code: `<span class="kw">import</span> numpy <span class="kw">as</span> np

<span class="cm"># Simplified token vocabulary (real GPT-4 has 100,000+ tokens)</span>
VOCAB = {<span class="str">"king"</span>:<span class="num">0</span>, <span class="str">"queen"</span>:<span class="num">1</span>, <span class="str">"man"</span>:<span class="num">2</span>, <span class="str">"woman"</span>:<span class="num">3</span>,
         <span class="str">"france"</span>:<span class="num">4</span>, <span class="str">"paris"</span>:<span class="num">5</span>, <span class="str">"germany"</span>:<span class="num">6</span>, <span class="str">"berlin"</span>:<span class="num">7</span>}

<span class="cm"># Simplified 8-dimensional embeddings (real models use 768-4096 dims)
# These are hand-crafted to illustrate the concept.
# Real embeddings are LEARNED from data — we don't design them.</span>
EMBEDDINGS = np.array([
  <span class="cm"># royal  gender  place  country  european  cap    male  political</span>
  [<span class="num">0.9</span>,   <span class="num">0.1</span>,   <span class="num">0.0</span>,   <span class="num">0.0</span>,    <span class="num">0.0</span>,      <span class="num">0.0</span>,  <span class="num">1.0</span>,  <span class="num">0.8</span>],  <span class="cm"># king</span>
  [<span class="num">0.9</span>,   <span class="num">0.9</span>,   <span class="num">0.0</span>,   <span class="num">0.0</span>,    <span class="num">0.0</span>,      <span class="num">0.0</span>,  <span class="num">0.0</span>,  <span class="num">0.8</span>],  <span class="cm"># queen</span>
  [<span class="num">0.0</span>,   <span class="num">0.1</span>,   <span class="num">0.0</span>,   <span class="num">0.0</span>,    <span class="num">0.0</span>,      <span class="num">0.0</span>,  <span class="num">1.0</span>,  <span class="num">0.1</span>],  <span class="cm"># man</span>
  [<span class="num">0.0</span>,   <span class="num">0.9</span>,   <span class="num">0.0</span>,   <span class="num">0.0</span>,    <span class="num">0.0</span>,      <span class="num">0.0</span>,  <span class="num">0.0</span>,  <span class="num">0.1</span>],  <span class="cm"># woman</span>
  [<span class="num">0.0</span>,   <span class="num">0.0</span>,   <span class="num">0.0</span>,   <span class="num">1.0</span>,    <span class="num">1.0</span>,      <span class="num">0.0</span>,  <span class="num">0.0</span>,  <span class="num">0.9</span>],  <span class="cm"># france</span>
  [<span class="num">0.0</span>,   <span class="num">0.0</span>,   <span class="num">1.0</span>,   <span class="num">0.9</span>,    <span class="num">1.0</span>,      <span class="num">1.0</span>,  <span class="num">0.0</span>,  <span class="num">0.2</span>],  <span class="cm"># paris</span>
  [<span class="num">0.0</span>,   <span class="num">0.0</span>,   <span class="num">0.0</span>,   <span class="num">1.0</span>,    <span class="num">1.0</span>,      <span class="num">0.0</span>,  <span class="num">0.0</span>,  <span class="num">0.9</span>],  <span class="cm"># germany</span>
  [<span class="num">0.0</span>,   <span class="num">0.0</span>,   <span class="num">1.0</span>,   <span class="num">0.9</span>,    <span class="num">1.0</span>,      <span class="num">1.0</span>,  <span class="num">0.0</span>,  <span class="num">0.2</span>],  <span class="cm"># berlin</span>
])

<span class="kw">def</span> <span class="fn">embed</span>(word):  <span class="kw">return</span> EMBEDDINGS[VOCAB[word.<span class="fn">lower</span>()]]
<span class="kw">def</span> <span class="fn">cosine</span>(a, b): <span class="kw">return</span> np.<span class="fn">dot</span>(a, b) / (np.<span class="fn">linalg</span>.<span class="fn">norm</span>(a) * np.<span class="fn">linalg</span>.<span class="fn">norm</span>(b))

<span class="cm"># The famous word analogy test: king - man + woman ≈ queen?</span>
analogy = <span class="fn">embed</span>(<span class="str">"king"</span>) - <span class="fn">embed</span>(<span class="str">"man"</span>) + <span class="fn">embed</span>(<span class="str">"woman"</span>)
<span class="fn">print</span>(<span class="str">"king - man + woman is most similar to:"</span>)
<span class="kw">for</span> word <span class="kw">in</span> VOCAB:
    sim = <span class="fn">cosine</span>(analogy, <span class="fn">embed</span>(word))
    <span class="fn">print</span>(<span class="str">f"  {word:<span class="num">8</span>}: {sim:.3f}"</span>)`,
      examples: [
        { label: 'Byte-Pair Encoding (BPE) tokenisation explained', code: `<span class="cm"># BPE builds a vocabulary of subword pieces from frequency analysis.
# Starting point: every character is a token.
# Repeatedly merge the most frequent PAIR of tokens.
# Eventually: common words become single tokens, rare words split into subwords.

# Example of how BPE would tokenise different words:
# "cat"           → ["cat"]            (common word, single token)
# "cats"          → ["cat", "s"]       (root + suffix)
# "catastrophe"   → ["cat", "astr", "ophe"]  (less common, split more)
# "antidisestablishmentarianism"
#                 → ["anti", "dis", "establish", "ment", "arian", "ism"]

# Why subwords instead of whole words?
# Problem 1: Vocabulary explosion — English has 500,000+ words.
#            A fixed vocab of 50,000 leaves most words as "unknown".
# Problem 2: Morphology — "run", "running", "runner", "ran" are related
#            but whole-word tokenisation treats them as completely different.
# BPE solution: "run", "##ning", "##ner", "ran" — sharing the "run" token
#               captures the morphological relationship.

# Real token counts (approximate, GPT-3/4 tokeniser):
examples = {
    "Hello, World!":              5,
    "Machine learning is cool":   5,
    "Supercalifragilistic":       7,   # rare word = more tokens
    "代码 (Chinese for 'code')": 4,    # non-Latin needs more tokens
    "1234567890":                 4,   # numbers split into small chunks
}
for text, count in examples.items():
    print(f"  ~{count:2} tokens: {text}")</span>` },
        { label: 'Cosine similarity — measuring semantic closeness', code: `<span class="kw">import</span> numpy <span class="kw">as</span> np

<span class="cm"># Cosine similarity measures the ANGLE between two vectors
# 1.0 = identical direction (very similar meaning)
# 0.0 = perpendicular (unrelated)
# -1.0 = opposite directions (antonyms in theory)

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Simplified 4D embeddings for demo
embeddings = {
    "happy":   np.array([0.9,  0.1,  0.8,  0.1]),
    "joyful":  np.array([0.85, 0.15, 0.75, 0.1]),
    "sad":     np.array([0.1,  0.9,  0.1,  0.8]),
    "dog":     np.array([0.5,  0.2,  0.1,  0.3]),
    "puppy":   np.array([0.5,  0.2,  0.15, 0.25]),
    "cat":     np.array([0.5,  0.15, 0.1,  0.25]),
}

target = "happy"
print(f"Similarity to '{target}':")
for word, vec in embeddings.items():
    if word != target:
        sim = cosine_similarity(embeddings[target], vec)
        bar = "█" * int(sim * 20)
        print(f"  {word:8}: {bar} {sim:.3f}")</span>` },
      ],
      fact: 'The word2vec embedding paper by Mikolov et al. (2013) discovered the king−man+woman≈queen analogy not by designing it, but by training on 100 billion words from Google News. The geometric relationships between concepts emerged spontaneously from statistical patterns in text — nobody programmed them. This paper changed NLP forever and is one of the most cited papers in all of computer science.',
      history: 'word2vec_2013',
      quiz: { q: 'Why do modern LLMs use subword tokenisation (like BPE) rather than splitting text into individual words?', opts: ['Subword tokenisation is faster','Whole-word tokenisation creates an unmanageably large vocabulary and cannot handle rare or unknown words; subwords allow any word to be represented from a fixed vocabulary of common pieces','Words are too ambiguous for computers','BPE produces shorter sequences'], ans: 1 },
      challenge: { t: 'Embedding Space Explorer', d: 'Build a simple embedding system: create 20-dimensional embeddings for 20 words across 5 categories (animals, countries, capitals, emotions, colours). Initialise them with hand-crafted values that capture semantic relationships (animals should cluster together, capitals should be close to their countries). Implement cosine similarity. Build a find_most_similar(word, n) function. Test the analogy: capital_of_france - france + germany ≈ berlin. Visualise with PCA reduced to 2D using matplotlib scatter.' },
    },

    /* ═══ STEP 3: Neural Networks and the Transformer ═══ */
    {
      h: '⚡ Step 3 — The Transformer: The Architecture That Changed Everything',
      p: `In 2017, a team at Google published a paper titled "Attention Is All You Need." The architecture it introduced — the <strong>Transformer</strong> — became the foundation of every major AI system since: GPT, Claude, Gemini, DALL-E, Stable Diffusion, AlphaFold, and more.
<br><br>
<strong>Why the Transformer replaced previous architectures:</strong><br>
Before Transformers, language models used Recurrent Neural Networks (RNNs) that processed text <em>sequentially</em> — one word at a time. This was slow (couldn't parallelise), and the model forgot things from far back in long sequences. Transformers process all tokens <em>simultaneously</em> and can directly attend to any position in the input, regardless of distance.
<br><br>
<strong>The key innovation: Self-Attention</strong><br>
For every token, self-attention computes how much that token should "attend to" (focus on) every other token in the sequence. In the sentence "The animal didn't cross the street because it was too tired," the model learns that "it" attends strongly to "animal" — resolving the pronoun reference. This happens simultaneously for every word, capturing long-range dependencies that RNNs struggled with.
<br><br>
<strong>The Transformer encoder-decoder structure:</strong><br>
• <strong>Encoder</strong> (BERT-style) — processes input and builds rich representations. Used for understanding tasks: classification, question answering.<br>
• <strong>Decoder</strong> (GPT-style) — generates output tokens one at a time, attending to previously generated tokens. Used for generation tasks: text completion, conversation.<br>
• <strong>Encoder-Decoder</strong> (T5, original Transformer) — encoder processes input, decoder generates output. Used for: translation, summarisation.`,
      code: `<span class="kw">import</span> numpy <span class="kw">as</span> np

<span class="cm"># Simplified self-attention: the mathematical heart of the Transformer
# Inputs: Query (Q), Key (K), Value (V) matrices
# Each token has a Q, K, and V vector (all learned projections of the embedding)
# 
# Attention output = softmax(Q @ K.T / sqrt(d_k)) @ V
#
# Intuition:
# - Each token's Query asks: "What am I looking for?"
# - Each token's Key says: "What do I contain?"
# - Attention score = how well Q matches K (dot product = similarity)
# - Scaled by sqrt(d_k) to prevent vanishing gradients in deep networks
# - Softmax converts scores to probabilities (sum to 1)
# - Final output: weighted sum of Values, weights = attention scores</span>

<span class="kw">def</span> <span class="fn">scaled_dot_product_attention</span>(Q, K, V):
    <span class="str">"""Core attention mechanism — the building block of Transformers."""</span>
    d_k     = Q.shape[-<span class="num">1</span>]

    <span class="cm"># Raw attention scores: how much should each token attend to each other token?</span>
    scores  = Q @ K.T / np.<span class="fn">sqrt</span>(d_k)    <span class="cm"># shape: (seq_len, seq_len)</span>

    <span class="cm"># Softmax: convert raw scores to probabilities that sum to 1</span>
    exp_s   = np.<span class="fn">exp</span>(scores - scores.<span class="fn">max</span>(axis=-<span class="num">1</span>, keepdims=<span class="kw">True</span>))  <span class="cm"># stability trick</span>
    weights = exp_s / exp_s.<span class="fn">sum</span>(axis=-<span class="num">1</span>, keepdims=<span class="kw">True</span>)

    <span class="cm"># Output: weighted sum of Values</span>
    <span class="kw">return</span> weights @ V, weights

<span class="cm"># Example: 4 tokens, 4-dimensional embeddings</span>
np.random.<span class="fn">seed</span>(<span class="num">42</span>)
seq_len, d_model = <span class="num">4</span>, <span class="num">4</span>
X = np.random.<span class="fn">randn</span>(seq_len, d_model)   <span class="cm"># token embeddings</span>

<span class="cm"># Q, K, V are learned linear projections (simplified: use X directly here)</span>
Q = K = V = X
output, attention_weights = <span class="fn">scaled_dot_product_attention</span>(Q, K, V)

<span class="fn">print</span>(<span class="str">"Attention weights (rows=query token, cols=key token):"</span>)
<span class="fn">print</span>(np.<span class="fn">round</span>(attention_weights, <span class="num">3</span>))
<span class="fn">print</span>(<span class="str">"\\nEach row sums to 1.0:"</span>, np.<span class="fn">round</span>(attention_weights.<span class="fn">sum</span>(axis=<span class="num">1</span>), <span class="num">6</span>))`,
      examples: [
        { label: 'Causal (masked) attention — how GPT generates text', code: `<span class="kw">import</span> numpy <span class="kw">as</span> np

<span class="kw">def</span> <span class="fn">causal_attention</span>(Q, K, V):
    <span class="str">"""Causal (decoder) attention: each token can only see PAST tokens.
    This is critical for autoregressive generation — when predicting
    token 5, you can only use tokens 1-4, not future tokens 6,7,8...
    Implemented with a mask that sets future positions to -infinity
    (which become 0 after softmax)."""</span>
    d_k    = Q.shape[-<span class="num">1</span>]
    scores = Q @ K.T / np.<span class="fn">sqrt</span>(d_k)

    <span class="cm"># Causal mask: upper triangle is -inf → becomes 0 after softmax</span>
    seq_len = Q.shape[<span class="num">0</span>]
    mask    = np.<span class="fn">triu</span>(np.<span class="fn">ones</span>((seq_len, seq_len)) * <span class="fn">float</span>(<span class="str">"-inf"</span>), k=<span class="num">1</span>)
    scores += mask

    exp_s   = np.<span class="fn">exp</span>(scores - np.<span class="fn">where</span>(scores==-np.<span class="fn">inf</span>, scores, scores.<span class="fn">max</span>(axis=-<span class="num">1</span>, keepdims=<span class="kw">True</span>)))
    exp_s   = np.<span class="fn">where</span>(mask == <span class="fn">float</span>(<span class="str">"-inf"</span>), <span class="num">0</span>, exp_s)
    weights = exp_s / np.<span class="fn">where</span>(exp_s.<span class="fn">sum</span>(axis=-<span class="num">1</span>, keepdims=<span class="kw">True</span>) == <span class="num">0</span>, <span class="num">1</span>, exp_s.<span class="fn">sum</span>(axis=-<span class="num">1</span>, keepdims=<span class="kw">True</span>))
    <span class="kw">return</span> weights @ V, weights

X = np.random.<span class="fn">randn</span>(<span class="num">5</span>, <span class="num">4</span>)
_, causal_w = <span class="fn">causal_attention</span>(X, X, X)
<span class="fn">print</span>(<span class="str">"Causal attention weights:"</span>)
<span class="fn">print</span>(np.<span class="fn">round</span>(causal_w, <span class="num">3</span>))
<span class="fn">print</span>(<span class="str">"\\nToken 3 only attends to tokens 0,1,2,3 — future tokens masked to 0."</span>)` },
      ],
      fact: 'The original Transformer paper — "Attention Is All You Need" by Vaswani et al. (2017) — has been cited over 100,000 times, making it one of the most cited papers in the history of science. The eight authors, all then at Google Brain/Research, collectively revolutionised not just NLP but also protein structure prediction (AlphaFold), image generation (DALL-E), music, code, and scientific discovery. Several have gone on to found their own AI companies including OpenAI and Cohere.',
      history: 'transformer_2017',
      quiz: { q: 'What is the key advantage of the Transformer\'s self-attention over RNNs for processing long sequences?', opts: ['Transformers use less memory','Transformers process all tokens simultaneously and can directly attend to any position — RNNs process sequentially and struggle to retain information from far back in long sequences','Transformers are simpler to implement','RNNs cannot handle text at all'], ans: 1 },
      challenge: { t: 'Transformer Components from Scratch', d: 'Implement a complete simplified Transformer encoder layer in numpy: (1) Multi-head attention with 2 heads (split Q,K,V into 2 halves, compute attention in parallel, concatenate outputs). (2) Layer normalisation (normalise each token\'s embedding to mean=0, std=1). (3) Feed-forward network (two linear layers with ReLU between). (4) Residual connections (add input to output of each sub-layer). Test your encoder on a sequence of 6 tokens with 8-dimensional embeddings. Print the shape of each intermediate output.' },
    },

    /* ═══ STEP 4: Training LLMs ═══ */
    {
      h: '🎓 Step 4 — Training Large Language Models: Pre-training and Fine-tuning',
      p: `Building a model like Claude or GPT-4 is a multi-stage process. Understanding each stage helps you understand both the capabilities and the limitations of these systems.
<br><br>
<strong>Stage 1: Pre-training (the massive first step)</strong><br>
The model is trained on a huge corpus of text — trillions of tokens from the web, books, code, Wikipedia, and more — to predict the next token. This single objective, repeated on an incomprehensibly large dataset with tens of billions of parameters, results in a model that has implicitly learned: grammar, facts about the world, reasoning patterns, coding, mathematics, multiple languages, and much more. This stage costs tens of millions of dollars in compute.
<br><br>
<strong>Stage 2: Supervised Fine-tuning (SFT)</strong><br>
The pre-trained model is fine-tuned on a smaller dataset of (prompt, ideal response) pairs, curated and written by humans. This teaches the model to behave like a helpful assistant rather than a raw text completer. Without SFT, the model would just try to continue any text you give it in a plausible way rather than answering questions helpfully.
<br><br>
<strong>Stage 3: RLHF — Reinforcement Learning from Human Feedback</strong><br>
Human raters compare pairs of model responses and choose which is better. A "reward model" learns to predict human preferences. The main LLM is then fine-tuned using RL to maximise the reward model's score — making the model's outputs progressively more aligned with what humans consider good responses.
<br><br>
<strong>The result after all three stages</strong> is a model that is helpful, harmless, and honest — because these qualities are what humans preferred in the RLHF comparisons.`,
      code: `<span class="cm"># Simulating pre-training: next-token prediction on a tiny corpus
# Real LLMs do this on TRILLIONS of tokens. We'll simulate the concept.</span>

<span class="kw">import</span> random
<span class="kw">from</span> collections <span class="kw">import</span> Counter, defaultdict

<span class="kw">class</span> TinyLanguageModel:
    <span class="str">"""N-gram language model — simplified version of pre-training objective.
    Real LLMs predict the next token using a deep neural network over
    thousands of context tokens. We use 2-gram statistics for illustration."""</span>

    <span class="kw">def</span> <span class="fn">__init__</span>(self): self.bigrams = defaultdict(<span class="fn">Counter</span>)

    <span class="kw">def</span> <span class="fn">train</span>(self, text: <span class="fn">str</span>):
        tokens = text.<span class="fn">lower</span>().<span class="fn">split</span>()
        <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="fn">len</span>(tokens) - <span class="num">1</span>):
            self.bigrams[tokens[i]][tokens[i+<span class="num">1</span>]] += <span class="num">1</span>   <span class="cm"># count co-occurrences</span>

    <span class="kw">def</span> <span class="fn">predict_next</span>(self, word: <span class="fn">str</span>, top_k: <span class="fn">int</span> = <span class="num">5</span>):
        counts = self.bigrams.<span class="fn">get</span>(word.<span class="fn">lower</span>(), {})
        total  = <span class="fn">sum</span>(counts.<span class="fn">values</span>())
        <span class="kw">return</span> [(w, c/total) <span class="kw">for</span> w, c <span class="kw">in</span> counts.<span class="fn">most_common</span>(top_k)]

    <span class="kw">def</span> <span class="fn">generate</span>(self, start: <span class="fn">str</span>, length: <span class="fn">int</span> = <span class="num">10</span>) -> <span class="fn">str</span>:
        tokens = [start.<span class="fn">lower</span>()]
        <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(length - <span class="num">1</span>):
            candidates = self.bigrams.<span class="fn">get</span>(tokens[-<span class="num">1</span>], {})
            <span class="kw">if not</span> candidates: <span class="kw">break</span>
            words, weights = <span class="fn">zip</span>(*candidates.<span class="fn">items</span>())
            tokens.<span class="fn">append</span>(random.<span class="fn">choices</span>(words, weights=weights)[<span class="num">0</span>])
        <span class="kw">return</span> <span class="str">" "</span>.<span class="fn">join</span>(tokens)

<span class="cm"># "Train" on some text</span>
corpus = <span class="str">"""the cat sat on the mat the cat ate the rat
the rat ran from the cat the cat is fast the rat is slow
machine learning is powerful machine learning needs data
data science uses machine learning data helps models learn"""</span>

model = <span class="fn">TinyLanguageModel</span>()
model.<span class="fn">train</span>(corpus)

<span class="fn">print</span>(<span class="str">"After 'the', most likely next words:"</span>)
<span class="kw">for</span> word, prob <span class="kw">in</span> model.<span class="fn">predict_next</span>(<span class="str">"the"</span>):
    <span class="fn">print</span>(<span class="str">f"  '{word}': {prob:.2f}"</span>)

<span class="fn">print</span>(<span class="str">"\\nGenerated text starting with 'machine':"</span>)
<span class="fn">print</span>(model.<span class="fn">generate</span>(<span class="str">"machine"</span>, <span class="num">8</span>))`,
      examples: [
        { label: 'RLHF — how human feedback shapes model behaviour', code: `<span class="cm"># RLHF in practice — a simplified simulation showing the concept

# Stage 1: We have two possible responses to a question
prompt    = "What is the capital of France?"
response_a = "Paris is the capital of France."
response_b = "France has many nice cities. Some people like them."

# Stage 2: Human raters choose which response is better.
# Real RLHF uses thousands of human raters on hundreds of thousands of pairs.
human_preference = "A"   # Response A is clearly more helpful

# Stage 3: A Reward Model learns to predict human preferences.
# For our simulation, a simple heuristic:
def reward_model(response: str) -> float:
    """Simulates a trained reward model scoring responses 0-1."""
    score = 0.0
    # Directly addresses the question
    if any(w in response.lower() for w in ["is the capital", "capital is", "capital of"]):
        score += 0.4
    # Gives a specific answer
    if any(city in response.lower() for city in ["paris", "london", "berlin", "rome"]):
        score += 0.3
    # Concise (shorter is often better for factual questions)
    if len(response.split()) < 15:
        score += 0.2
    # Complete sentence
    if response.endswith("."):
        score += 0.1
    return score

# Stage 4: Fine-tune the model to maximise reward scores
for resp, label in [(response_a, "A"), (response_b, "B")]:
    score = reward_model(resp)
    print(f"Response {label}: reward = {score:.2f}")
    print(f"  '{resp}'")

# The model gets updated to produce more responses like A and fewer like B
print(f"\nReward model says: prefer Response {max('A', 'B', key=lambda x: reward_model({'A':response_a,'B':response_b}[x]))}")</span>` },
        { label: 'The training data pipeline', code: `<span class="cm"># What does "training data" for an LLM actually look like?
# 
# Pre-training corpus (trillions of tokens):
# - Common Crawl: 45TB of web text scraped from the internet
# - WebText / OpenWebText: high-quality web pages (Reddit upvoted links)
# - Books: over 67,000 books spanning fiction and non-fiction
# - Wikipedia: all of English Wikipedia (~6.5 million articles)
# - Code: GitHub repositories in dozens of programming languages
# - ArXiv: scientific papers
# - StackExchange: Q&A pairs across technical topics
#
# Data quality filtering (critically important!):
# Raw internet text is noisy. Before training:
# 1. Remove duplicate content (near-deduplication with MinHash)
# 2. Filter low-quality text (heuristics: too many punctuation marks,
#    too much non-alphabetic content, too many repeated paragraphs)
# 3. Remove personally identifiable information (phone numbers, emails, SSNs)
# 4. Content filtering (hate speech, CSAM, etc.)
# 5. Language detection (keep intended languages)
#
# Tokenisation:
# Text → BPE tokeniser → integer IDs
# "Hello, World!" → [15496, 11, 995, 0]  (GPT-style)
#
# After tokenisation, the training objective:
# For each position i, given tokens [t_0, t_1, ..., t_{i-1}]:
# predict t_i
# Loss = -log P(t_i | t_0...t_{i-1})
# Minimise this loss across ALL positions in ALL documents.</span>

print("Training data pipeline: text → clean → tokenise → train")
print("Objective: minimise cross-entropy loss on next-token prediction")` },
      ],
      fact: 'Training GPT-4 reportedly cost over $100 million in compute. This involves running calculations on tens of thousands of specialised GPUs for months. The model has over 1 trillion parameters — that\'s one trillion floating-point numbers that must be stored and updated during training. By comparison, the human brain has approximately 100 trillion synaptic connections. We are still building systems orders of magnitude smaller than biological intelligence.',
      history: 'gpt_history',
      quiz: { q: 'What is the core training objective of a Large Language Model during pre-training?', opts: ['Classifying text into categories','Predicting the next token in a sequence — this single objective, applied to trillions of tokens, results in the model learning language, facts, reasoning, and many other capabilities implicitly','Generating images from text descriptions','Answering specific question-answer pairs'], ans: 1 },
      challenge: { t: 'Implement RLHF Simulation', d: 'Build a complete RLHF simulation: (1) A base "model" (a dictionary of prompt→possible_responses). (2) A reward_model(response) function that scores responses 0-1 based on: helpfulness (answers the question directly), safety (no harmful content), conciseness (appropriate length), factual markers (specific rather than vague). (3) A fine_tune(prompt, num_samples) function that samples 5 responses, gets reward scores for each, and returns the highest-scoring one. (4) Show how iterating this process improves average response quality by running 10 fine-tuning steps and printing reward scores. Demonstrate on 3 different prompts.' },
    },

    /* ═══ STEP 5: Context Windows and Tokenisation Deep Dive ═══ */
    {
      h: '📏 Step 5 — Context Windows, Memory & How Claude Actually Reads Your Messages',
      p: `Every time you send a message to an AI like Claude, the entire conversation history — your messages, Claude's responses, and any instructions — is converted to tokens and fed into the model as the "context window." Understanding how context windows work explains many otherwise puzzling behaviours.
<br><br>
<strong>What a context window is:</strong><br>
The context window is the fixed-size buffer of tokens that the model can "see" at one time. Claude 3's context window is 200,000 tokens — roughly 150,000 words, equivalent to a 600-page novel. GPT-4 Turbo has 128,000 tokens. Earlier models like GPT-3 had only 4,096 tokens.
<br><br>
<strong>What goes into the context window:</strong><br>
1. System prompt (instructions from the operator, like "You are a helpful assistant")<br>
2. Conversation history (alternating human/assistant turns)<br>
3. Your current message<br>
4. The model generates the response one token at a time from there
<br><br>
<strong>Critical limitation — no persistent memory:</strong><br>
When a conversation ends, the model retains nothing. Start a new conversation and the model has no idea you spoke before. All "memory" features in AI products are external databases that inject relevant past information back into the context window.
<br><br>
<strong>The "lost in the middle" problem:</strong><br>
Research shows current models are better at using information from the beginning and end of a long context window than from the middle. If you put critical information in the middle of a 100,000-token context, the model may miss or underweight it.`,
      code: `<span class="cm"># Simulating how the context window looks to the model
# This is the ACTUAL structure passed to an LLM API</span>

<span class="kw">import</span> json

<span class="kw">def</span> <span class="fn">build_context</span>(system_prompt, conversation_history, new_message):
    <span class="str">"""Build the token stream that gets sent to the LLM."""</span>
    messages = [
        {<span class="str">"role"</span>: <span class="str">"system"</span>, <span class="str">"content"</span>: system_prompt},
        *conversation_history,
        {<span class="str">"role"</span>: <span class="str">"user"</span>,   <span class="str">"content"</span>: new_message},
    ]
    <span class="kw">return</span> messages

<span class="cm"># Estimate token count (rough: 1 token ≈ 4 chars for English)</span>
<span class="kw">def</span> <span class="fn">estimate_tokens</span>(messages: list) -> <span class="fn">int</span>:
    total_chars = <span class="fn">sum</span>(<span class="fn">len</span>(m[<span class="str">"content"</span>]) <span class="kw">for</span> m <span class="kw">in</span> messages)
    <span class="kw">return</span> total_chars // <span class="num">4</span>

<span class="cm"># Example conversation</span>
system  = <span class="str">"You are a Python tutor. Be clear and use concrete examples."</span>
history = [
    {<span class="str">"role"</span>: <span class="str">"user"</span>,      <span class="str">"content"</span>: <span class="str">"What is a list?"</span>},
    {<span class="str">"role"</span>: <span class="str">"assistant"</span>, <span class="str">"content"</span>: <span class="str">"A list is an ordered, mutable collection. Example: [1, 2, 3]"</span>},
    {<span class="str">"role"</span>: <span class="str">"user"</span>,      <span class="str">"content"</span>: <span class="str">"How do I add to a list?"</span>},
    {<span class="str">"role"</span>: <span class="str">"assistant"</span>, <span class="str">"content"</span>: <span class="str">"Use .append() to add to the end: my_list.append(4)"</span>},
]
new_msg = <span class="str">"Now how do I remove from it?"</span>

context = <span class="fn">build_context</span>(system, history, new_msg)
tokens  = <span class="fn">estimate_tokens</span>(context)

<span class="fn">print</span>(<span class="str">f"Context window contents:"</span>)
<span class="kw">for</span> m <span class="kw">in</span> context:
    <span class="fn">print</span>(<span class="str">f"  [{m['role'].upper()}] {m['content'][:60]}..."</span>)
<span class="fn">print</span>(<span class="str">f"\\nEstimated tokens: ~{tokens}"</span>)
<span class="fn">print</span>(<span class="str">f"Used {tokens/200000*<span class="num">100</span>:.2f}% of Claude 3's 200k context window"</span>)`,
      examples: [
        { label: 'Token counting — why length matters for cost and quality', code: `<span class="cm"># Token counting matters for:
# 1. API cost (most APIs charge per token)
# 2. Knowing when you'll hit the context limit
# 3. Understanding how much "working memory" the model has

# Rough token estimates for different content types:
content_types = {
    "1 word (English)":          0.75,   # ~1 token per 1.33 words
    "1 sentence (15 words)":     20,
    "1 paragraph (100 words)":   133,
    "1 page (500 words)":        667,
    "Novel chapter (5000 words)": 6_667,
    "Full novel (80,000 words)":  106_667,
    "1 line of Python code":      15,
    "1 function (20 lines)":      200,
    "1 code file (500 lines)":    5_000,
    "Wikipedia article":          3_000,
}

print("Content                     → Approx tokens")
print("-" * 50)
for content, tokens in content_types.items():
    pct_of_claude = tokens / 200_000 * 100
    print(f"{content:35}: {tokens:8,.0f}  ({pct_of_claude:.2f}% of Claude 3 context)")

print("\nClaude 3 context (200k tokens) can hold:")
print("  • ~150,000 English words")
print("  • ~600 pages of a book")
print("  • ~40,000 lines of code")</span>` },
        { label: 'The retrieval-augmented generation (RAG) pattern', code: `<span class="cm"># HOW AI PRODUCTS FAKE "LONG-TERM MEMORY"
#
# Problem: Model has no memory between conversations.
# Solution: Retrieve relevant past information and inject into context.
#
# RAG architecture:
#
# User query: "What did we discuss about my Python project last week?"
#       ↓
# [Embedding model converts query to a vector]
#       ↓
# [Search vector database for similar past conversations]
#       ↓
# [Retrieve top-3 most relevant past exchanges]
#       ↓
# [Build context window]:
#   system: "You are a helpful assistant. Here is relevant context 
#            from past conversations: [retrieved excerpts]"
#   user:   "What did we discuss about my Python project last week?"
#       ↓
# [LLM generates response using injected context]
#       ↓
# User: [Receives answer that references past conversations]
#
# The LLM doesn't actually "remember" — it reads a curated excerpt
# that the system retrieved and injected. This is why AI memory
# features are called "retrieval-augmented generation."

print("RAG = Retrieve relevant context → Augment the prompt → Generate")
print("The model itself has no persistent memory — retrieval provides it.")</span>` },
      ],
      fact: 'Claude\'s 200,000-token context window represents a remarkable engineering achievement. When Google released the 1 million token Gemini 1.5 Pro, researchers tested whether the model could find a specific needle (a sentence) hidden in a haystack of 10 million tokens of irrelevant text. It succeeded 99% of the time — demonstrating that models can genuinely use information across enormous contexts, not just pretend to.',
      history: null,
      quiz: { q: 'Why does an AI like Claude have no memory of past conversations by default?', opts: ['It would be too expensive to store','Each new conversation starts with an empty context window — the model only processes what\'s in the current context. There is no persistent storage between conversations unless memory is explicitly implemented externally','The model deletes memories intentionally','Privacy regulations prevent memory storage'], ans: 1 },
      challenge: { t: 'Context Window Manager', d: 'Build a ConversationManager class that: stores the full conversation history, tracks token usage after each turn (using the 1-token-per-4-chars estimate), warns when approaching 80% of a given context limit (default 4096 tokens for this exercise), when the limit would be exceeded, summarises older conversation turns into a compressed summary (use first 2 sentences of each turn), and prints a dashboard showing: total tokens, percent used, number of turns, and a visual bar. Test with a long conversation that exceeds the limit.' },
    },

    /* ═══ STEP 6: Prompt Engineering ═══ */
    {
      h: '🎯 Step 6 — Prompt Engineering: The Art of Communicating with AI',
      p: `A model like Claude doesn't have a fixed set of behaviours — its outputs are dramatically shaped by how you communicate with it. <strong>Prompt engineering</strong> is the practice of designing inputs to get better, more consistent, more useful outputs from AI systems.
<br><br>
<strong>Why prompt engineering matters:</strong><br>
The same model, given different prompts for the same task, can produce outputs ranging from useless to exceptional. A data scientist at Google found that a specific prompt reformulation improved GPT-4's performance on a reasoning benchmark by 17 percentage points. That's more improvement than upgrading from GPT-3.5 to GPT-4 in some tests.
<br><br>
<strong>Core prompt engineering techniques:</strong><br>
• <strong>Be specific</strong> — vague prompts get vague answers. Include format, length, audience, and constraints explicitly.<br>
• <strong>Role prompting</strong> — "You are an expert software engineer reviewing code for security vulnerabilities" primes the model with relevant knowledge and perspective.<br>
• <strong>Few-shot prompting</strong> — provide 2-3 examples of the input/output format you want before giving the real input. The model pattern-matches the examples.<br>
• <strong>Chain-of-thought</strong> — "Let's think through this step by step" dramatically improves performance on multi-step reasoning tasks by giving the model space to work.<br>
• <strong>Output format specification</strong> — specify JSON, markdown, numbered lists, or code blocks to get structured, consistent output.<br>
• <strong>Negative examples</strong> — explicitly say what you don't want, not just what you do want.`,
      code: `<span class="cm"># Comparing prompt quality on the same task</span>

BAD_PROMPT = <span class="str">"""Tell me about sorting."""</span>

GOOD_PROMPT = <span class="str">"""You are an expert computer science teacher explaining concepts
to a 15-year-old who knows Python basics but has not studied algorithms.

Explain the bubble sort algorithm with:
1. A plain-English description of what it does
2. A step-by-step trace through sorting [5, 2, 8, 1, 4]
3. Working Python code (< 15 lines)
4. Its time complexity in Big-O notation with a brief explanation
5. One real-world situation where bubble sort IS appropriate

Keep the explanation encouraging and avoid technical jargon except 
where necessary, and explain any technical term you do use.
Format the code in a proper Python code block."""</span>

FEW_SHOT_PROMPT = <span class="str">"""Convert these informal requests into formal business emails.

Example 1:
Informal: "hey can you send me the report"
Formal: "Dear [Name], I hope this message finds you well. Could you please
send me the report at your earliest convenience? Thank you, [Your Name]"

Example 2:
Informal: "meeting got moved to thursday"
Formal: "Dear Team, Please note that the meeting has been rescheduled to
Thursday. I apologise for any inconvenience this may cause. Best regards, [Name]"

Now convert:
Informal: "we ran out of the blue paper in the printer again lol"
Formal:"""</span>

CHAIN_OF_THOUGHT_PROMPT = <span class="str">"""A train leaves London at 09:15 travelling at 120 km/h.
Another train leaves Birmingham (180 km away) at 09:30 travelling toward London 
at 90 km/h. At what time do they meet?

Think through this step by step:"""</span>

<span class="kw">for</span> name, prompt <span class="kw">in</span> [(<span class="str">"BAD"</span>,     BAD_PROMPT[:80]),
                        (<span class="str">"GOOD"</span>,    GOOD_PROMPT[:80]),
                        (<span class="str">"FEW-SHOT"</span>, FEW_SHOT_PROMPT[:80]),
                        (<span class="str">"COT"</span>,     CHAIN_OF_THOUGHT_PROMPT[:80])]:
    <span class="fn">print</span>(<span class="str">f"[{name}] {prompt}..."</span>)`,
      examples: [
        { label: 'System prompts — the invisible hand shaping AI products', code: `<span class="cm"># Every AI product you use has a SYSTEM PROMPT — instructions the company
# provides to shape how the model behaves. You usually don't see it.

# Example: A customer service chatbot's system prompt might look like:

CUSTOMER_SERVICE_SYSTEM = """You are Aria, the friendly customer service 
assistant for TechShop Electronics.

Your capabilities:
- Answer questions about our product catalogue
- Help with order tracking (ask for order number)  
- Process returns and exchanges (policy: 30 days, with receipt)
- Escalate complex issues to human agents

Your constraints:
- Never discuss competitor products
- Never reveal pricing data not on our public website
- If asked about technical issues, always recommend calling our tech line
- Always end conversations by asking "Is there anything else I can help you with?"
- If a customer is frustrated, acknowledge their feelings before offering solutions

Your tone: warm, professional, efficient. Maximum response length: 150 words.
"""

USER_MESSAGE = "I want to return a laptop I bought 2 weeks ago."

print("What the company provides (system prompt):")
print(CUSTOMER_SERVICE_SYSTEM[:300] + "...")
print("\nWhat the user sees:")
print(f"User: {USER_MESSAGE}")
print("\nAria's response is shaped by both inputs combined in the context window.")</span>` },
        { label: 'Structured output prompting', code: `<span class="cm"># Forcing JSON output for reliable parsing in applications</span>

STRUCTURED_PROMPT = <span class="str">"""Analyse the following product review and extract information.
Respond ONLY with valid JSON matching this exact schema. 
No explanation, no markdown code blocks, just raw JSON:

{
  "sentiment": "positive" | "negative" | "neutral" | "mixed",
  "rating_implied": 1-5 or null,
  "pros": ["list", "of", "positives"],
  "cons": ["list", "of", "negatives"],  
  "would_recommend": true | false | null,
  "key_topics": ["topic1", "topic2"],
  "summary": "one sentence summary"
}

Review: "The delivery was super fast which I loved. The laptop looks great
and the screen is gorgeous. However it runs quite hot and the fan is noisy.
Battery life is only about 5 hours which is disappointing for the price.
Overall I'm 50/50 on it - great hardware let down by thermal management."
"""</span>

EXPECTED_OUTPUT = <span class="str">"""{
  "sentiment": "mixed",
  "rating_implied": 3,
  "pros": ["fast delivery", "great design", "beautiful screen"],
  "cons": ["runs hot", "noisy fan", "poor battery life"],
  "would_recommend": null,
  "key_topics": ["laptop", "thermal", "battery", "delivery"],
  "summary": "Well-designed laptop with beautiful screen but let down by heat, noise, and short battery life."
}"""</span>

<span class="fn">print</span>(<span class="str">"Structured prompting forces consistent, machine-parseable output."</span>)
<span class="fn">print</span>(<span class="str">"Expected JSON output:"</span>)
<span class="fn">print</span>(EXPECTED_OUTPUT)` },
      ],
      fact: 'Amazon and Google have published job listings for "Prompt Engineers" with salaries of $175,000-$335,000 per year. The skill of communicating effectively with AI systems has become a commercially valuable technical discipline. Some researchers predict that as AI becomes more capable and more deeply embedded in workflows, prompt engineering will become as fundamental a skill as spreadsheet proficiency is today.',
      history: null,
      quiz: { q: 'What is "few-shot prompting" and why does it improve model performance?', opts: ['Prompting a model with very short inputs','Providing 2-3 worked examples of the desired input-output format before the real query — the model pattern-matches the examples to produce more accurate and correctly formatted responses','Repeating the same prompt multiple times','Using a model that was trained on fewer examples'], ans: 1 },
      challenge: { t: 'Prompt Engineering Benchmark', d: 'Pick 5 different task types: code generation, data extraction, creative writing, mathematical reasoning, and classification. For each, write: (1) A bad prompt that produces mediocre output, (2) An improved prompt applying role, specificity, and format specification, (3) A chain-of-thought prompt for the reasoning task, (4) A few-shot prompt for the classification task. Send all prompts to Claude (via claude.ai or API), compare outputs side by side, and write a report documenting which techniques produced the biggest improvements and why.' },
    },

    /* ═══ STEP 7: AI Alignment and Constitutional AI ═══ */
    {
      h: '⚖️ Step 7 — AI Alignment: How Claude is Designed to be Helpful, Harmless & Honest',
      p: `Building a capable AI is hard. Building a capable AI that reliably acts in ways that are good for humans is harder. <strong>AI alignment</strong> — ensuring AI systems behave in accordance with human values and intentions — is one of the most important and difficult challenges in the field.
<br><br>
<strong>Why alignment is hard:</strong><br>
The objective function you optimise a model for (predict the next token, maximise reward model score) is never perfectly aligned with what you actually want (be genuinely helpful and honest while avoiding harm). The model learns to optimise the metric, which can diverge from the true goal in subtle ways. A model trained purely on human approval ratings might learn to say what sounds good rather than what's true — "sycophancy."
<br><br>
<strong>Constitutional AI (Anthropic's approach):</strong><br>
Claude is trained using Constitutional AI, developed by Anthropic. Instead of relying solely on human ratings, Claude is given a set of principles — a "constitution" — and trained to critique and revise its own outputs against those principles. This produces more consistent values and reduces the need for endless human annotation.
<br><br>
<strong>The three properties Anthropic aims for in Claude:</strong><br>
• <strong>Helpful</strong> — genuinely useful to the user, not just appearing helpful<br>
• <strong>Harmless</strong> — avoids producing outputs that could cause real-world harm<br>
• <strong>Honest</strong> — doesn't fabricate information, acknowledges uncertainty, doesn't manipulate
<br><br>
These three goals can tension with each other. Sometimes the honest answer is not what the user wants to hear. Sometimes the helpful answer to one person could harm others. Navigating these tensions well is what makes AI alignment research so challenging.`,
      code: `<span class="cm"># Illustrating AI alignment tensions and Constitutional AI principles</span>

<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass
<span class="kw">from</span> typing <span class="kw">import</span> List

@dataclass
<span class="kw">class</span> Response:
    text: str
    helpful_score:  float   <span class="cm"># 0-1</span>
    harmless_score: float   <span class="cm"># 0-1</span>
    honest_score:   float   <span class="cm"># 0-1</span>

    @property
    <span class="kw">def</span> <span class="fn">overall</span>(self) -> float:
        <span class="cm"># Harmless weighted highest — safety is the floor constraint</span>
        <span class="kw">return</span> (self.helpful_score * <span class="num">0.35</span> +
                self.harmless_score * <span class="num">0.40</span> +
                self.honest_score   * <span class="num">0.25</span>)

<span class="cm"># Three candidate responses to "Is my essay good?"</span>
responses = [
    Response(
        <span class="str">"Your essay is perfect! No improvements needed."</span>,
        helpful_score=<span class="num">0.2</span>, harmless_score=<span class="num">1.0</span>, honest_score=<span class="num">0.1</span>
        <span class="cm"># Sycophantic — 'helpful' in the moment but dishonest and ultimately harmful</span>
    ),
    Response(
        <span class="str">"Your essay has these specific strengths: [X, Y]. Areas to improve: [A, B]. Suggested edits: ..."</span>,
        helpful_score=<span class="num">0.95</span>, harmless_score=<span class="num">0.95</span>, honest_score=<span class="num">0.95</span>
        <span class="cm"># Genuinely helpful — honest assessment with actionable feedback</span>
    ),
    Response(
        <span class="str">"This essay is terrible and you should be embarrassed."</span>,
        helpful_score=<span class="num">0.1</span>, harmless_score=<span class="num">0.2</span>, honest_score=<span class="num">0.5</span>
        <span class="cm"># Harsh — potentially honest but harmful and not constructive</span>
    ),
]

<span class="fn">print</span>(<span class="str">f"{'Response'[:35]:<span class="num">37</span>} {'Help':>5} {'Safe':>5} {'True':>5} {'Overall':>8}"</span>)
<span class="fn">print</span>(<span class="str">"-"</span> * <span class="num">60</span>)
<span class="kw">for</span> r <span class="kw">in</span> responses:
    <span class="fn">print</span>(<span class="str">f"{r.text[:<span class="num">35</span>]:<span class="num">37</span>} {r.helpful_score:>5.2f} {r.harmless_score:>5.2f} {r.honest_score:>5.2f} {r.overall:>8.3f}"</span>)`,
      examples: [
        { label: 'The Constitutional AI training loop', code: `<span class="cm"># Simplified simulation of Constitutional AI self-critique
# 
# REAL Constitutional AI:
# 1. Generate initial response to a potentially problematic prompt
# 2. Ask the model to critique its own response against each principle
# 3. Ask the model to revise based on the critique  
# 4. Use RLHF with AI feedback (RLAIF) instead of only human feedback
#
# This teaches the model to internalise the principles and apply them
# consistently, not just when humans are watching.

CONSTITUTIONAL_PRINCIPLES = [
    "Be helpful: genuinely solve the user's problem",
    "Be honest: acknowledge uncertainty, don't fabricate",
    "Avoid harm: don't help with clearly dangerous requests",
    "Respect autonomy: don't manipulate or deceive",
    "Be balanced: present multiple perspectives on controversial topics",
]

def critique_and_revise(initial_response: str, user_prompt: str) -> str:
    """
    Simulates the Constitutional AI self-critique loop.
    In reality, this uses Claude itself to evaluate and revise.
    """
    print(f"Initial response: {initial_response[:80]}...")
    print("\nChecking against constitutional principles:")
    
    for i, principle in enumerate(CONSTITUTIONAL_PRINCIPLES, 1):
        # In real CAI, the model generates this critique
        print(f"  {i}. [{principle[:40]}...]: ✓ Checking...")
    
    print("\nRevised response: [improved based on principles]")
    return "[Revised to better satisfy all constitutional principles]"

prompt = "Write an essay arguing that one political party is always right"
initial = "Sure! [One-sided partisan content...]"
revised = critique_and_revise(initial, prompt)</span>` },
      ],
      fact: 'Anthropic, the company that built Claude, was founded in 2021 by Dario Amodei, Daniela Amodei, and several colleagues who previously worked at OpenAI. The company\'s stated mission is "the responsible development and maintenance of advanced AI for the long-term benefit of humanity." Constitutional AI was published as an open research paper so the entire field could benefit from the technique — an unusual choice for a competitive commercial AI lab.',
      history: 'anthropic_founded',
      quiz: { q: 'What is "sycophancy" in AI systems and why is it an alignment failure?', opts: ['When AI speaks too much','When an AI learns to say what sounds pleasing rather than what is true — appearing helpful while actually being dishonest, which ultimately harms users who can\'t rely on the information','When AI is too slow to respond','When AI uses overly formal language'], ans: 1 },
      challenge: { t: 'Design an AI Safety Classifier', d: 'Build a content safety classifier that evaluates AI responses across 4 dimensions: (1) Helpfulness (0-1): does it address the actual question? (2) Accuracy (0-1): does it contain verifiable claims or vague ones? (3) Safety (0-1): could following this advice cause harm? (4) Honesty (0-1): does it acknowledge uncertainty where appropriate? Write a score_response(prompt, response) function. Test it on 10 response pairs (a sycophantic version and a balanced version for each). Compute weighted overall scores. Visualise the results as a radar chart (matplotlib) showing each dimension.' },
    },

    /* ═══ STEP 8: Limitations, Hallucination, and the Future ═══ */
    {
      h: '🔭 Step 8 — AI Limitations, Hallucination & What Comes Next',
      p: `Understanding what AI systems <em>cannot</em> do — and why — is as important as understanding what they can. The gap between AI capability and AI reliability is the central challenge of modern AI development.
<br><br>
<strong>Hallucination — the most dangerous limitation:</strong><br>
LLMs generate text that is statistically plausible given their training data. They do not have a separate "fact-checking module" — they produce tokens that "feel right" based on patterns. This means they can confidently generate false information: fabricated citations, incorrect statistics, plausible-sounding but wrong code, and invented historical events. The confidence of the response gives no signal about its accuracy.
<br><br>
<strong>Why hallucination happens:</strong><br>
During training, the model was rewarded for producing fluent, coherent text. It learned that a confident, specific-sounding answer is often preferred over "I don't know." The same training signal that makes responses useful (specificity, confidence, fluency) also makes hallucinations convincing.
<br><br>
<strong>Other key limitations:</strong><br>
• <strong>Knowledge cutoff</strong> — training data has a date. Post-cutoff events are unknown unless retrieved.<br>
• <strong>No genuine reasoning</strong> — current models approximate reasoning through learned patterns. Complex novel problems can expose this.<br>
• <strong>Context length limits</strong> — cannot process arbitrarily long inputs.<br>
• <strong>No persistent learning</strong> — cannot update knowledge from conversations.<br>
• <strong>Inconsistency</strong> — may give different answers to the same question in different conversations.<br>
• <strong>Bias</strong> — reflects biases in training data, which reflects human society's biases.`,
      code: `<span class="cm"># Detecting and handling potential hallucinations
# Key insight: a well-calibrated model should express uncertainty
# when it doesn't know something rather than confidently guessing</span>

<span class="kw">import</span> re

<span class="kw">class</span> HallucinationRiskAssessor:
    <span class="str">"""Heuristic checks for hallucination risk in AI responses.
    These are signals — not guarantees. Real detection requires
    fact-checking against reliable external sources."""</span>

    <span class="cm"># High specificity without qualifiers = potential hallucination risk</span>
    SPECIFIC_PATTERNS = [
        r<span class="str">"\d+\.\d+%"</span>,                     <span class="cm"># exact percentages: "23.7%"</span>
        r<span class="str">"\b(?:in|on|at) \d{4}\b"</span>,       <span class="cm"># exact years: "in 1847"</span>
        r<span class="str">"according to (?:Dr\.|Prof\.)"</span>,   <span class="cm"># citations with titles</span>
        r<span class="str">"the study found that"</span>,           <span class="cm"># vague citations</span>
        r<span class="str">"\b\d+,\d{3}\b"</span>,                  <span class="cm"># large specific numbers</span>
    ]

    UNCERTAINTY_MARKERS = [
        <span class="str">"i'm not certain"</span>, <span class="str">"i may be wrong"</span>, <span class="str">"please verify"</span>,
        <span class="str">"to my knowledge"</span>, <span class="str">"approximately"</span>, <span class="str">"roughly"</span>,
        <span class="str">"i'm not sure"</span>,   <span class="str">"you should check"</span>, <span class="str">"i believe"</span>,
    ]

    <span class="kw">def</span> <span class="fn">assess</span>(self, response: str) -> dict:
        lower = response.<span class="fn">lower</span>()
        specific_claims = []
        <span class="kw">for</span> pattern <span class="kw">in</span> self.SPECIFIC_PATTERNS:
            matches = re.<span class="fn">findall</span>(pattern, lower)
            specific_claims.<span class="fn">extend</span>(matches)

        uncertainty = <span class="fn">any</span>(marker <span class="kw">in</span> lower <span class="kw">for</span> marker <span class="kw">in</span> self.UNCERTAINTY_MARKERS)
        risk = <span class="str">"HIGH"</span> <span class="kw">if</span> specific_claims <span class="kw">and not</span> uncertainty <span class="kw">else</span> \
               <span class="str">"MEDIUM"</span> <span class="kw">if</span> specific_claims <span class="kw">else</span> \
               <span class="str">"LOW"</span>

        <span class="kw">return</span> {<span class="str">"risk"</span>: risk, <span class="str">"specific_claims"</span>: specific_claims, <span class="str">"expresses_uncertainty"</span>: uncertainty}

assessor = <span class="fn">HallucinationRiskAssessor</span>()
responses = [
    <span class="str">"The Eiffel Tower was built in 1889 and is 330 metres tall."</span>,
    <span class="str">"According to Dr. Smith's 2019 study, 73.4% of participants showed improvement."</span>,
    <span class="str">"I believe the population is roughly 1.4 billion, though you should verify this figure."</span>,
]
<span class="kw">for</span> r <span class="kw">in</span> responses:
    result = assessor.<span class="fn">assess</span>(r)
    <span class="fn">print</span>(<span class="str">f"[{result['risk']} RISK] {r[:60]}..."</span>)`,
      examples: [
        { label: 'The landscape of what AI cannot reliably do (yet)', code: `<span class="cm"># CURRENT LIMITATIONS OF LLMs (as of 2024-2025)

limitations = {
    "Novel mathematical proofs": {
        "can": "Verify known proofs, assist with notation",
        "cannot": "Reliably generate genuinely novel mathematical proofs",
        "why": "Requires creative leaps, not pattern matching"
    },
    "Consistent long-horizon reasoning": {
        "can": "Solve multi-step problems within a single context",
        "cannot": "Reliably chain 50+ logical steps without errors",
        "why": "Errors compound; no separate verification mechanism"
    },
    "Real-time information": {
        "can": "Discuss events up to training cutoff",
        "cannot": "Know what happened yesterday",
        "why": "Static training data; solved partially by retrieval tools"
    },
    "Guaranteed factual accuracy": {
        "can": "Get common facts right most of the time",
        "cannot": "Guarantee accuracy of any specific claim",
        "why": "No fact-checking module; hallucination is structural"
    },
    "Understanding vs pattern matching": {
        "can": "Pass many reasoning tests impressively",
        "cannot": "Distinguish genuine understanding from learned patterns",
        "why": "Fundamental open question in AI research"
    },
}

for topic, detail in limitations.items():
    print(f"\n{topic}:")
    print(f"  ✅ CAN:    {detail['can']}")
    print(f"  ❌ CANNOT: {detail['cannot']}")
    print(f"  🔍 WHY:    {detail['why']}")</span>` },
        { label: 'The frontier of AI research — what is being worked on now', code: `<span class="cm"># ACTIVE RESEARCH AREAS (2024-2025)

research_areas = [
    {
        "area": "Interpretability",
        "goal": "Understand WHAT features a network represents internally",
        "current": "Anthropic's 'Mechanistic Interpretability' — found specific neurons representing concepts",
        "implication": "Could let us verify AI is actually reasoning, not just pattern matching"
    },
    {
        "area": "Reasoning models",
        "goal": "Models that think before responding (chain-of-thought at scale)",
        "current": "OpenAI o1, o3; DeepSeek-R1 — spend more tokens 'thinking'",
        "implication": "Dramatically better on math, science, code problems"
    },
    {
        "area": "Multimodal models",
        "goal": "Process text, images, audio, video, code in one model",
        "current": "GPT-4o, Gemini 1.5, Claude 3 — already handle text+images",
        "implication": "AI that can see, hear, and read simultaneously"
    },
    {
        "area": "Long-term memory",
        "goal": "Models that genuinely learn from and remember interactions",
        "current": "External databases + retrieval (RAG) are current workaround",
        "implication": "AI that builds a model of you and your preferences over time"
    },
    {
        "area": "Agentic AI",
        "goal": "AI that takes actions in the world, not just generates text",
        "current": "Claude can use tools, browse the web, write and run code",
        "implication": "AI that completes multi-day tasks autonomously"
    },
]

for r in research_areas:
    print(f"\n🔬 {r['area'].upper()}")
    print(f"   Goal:    {r['goal']}")
    print(f"   Now:     {r['current']}")
    print(f"   Impact:  {r['implication']}")</span>` },
      ],
      fact: 'In 2024, Anthropic published research finding that the Claude 3 Sonnet model contained a feature that activates on concepts related to the "Assistant" role — and when this feature was artificially stimulated to extreme levels, the model expressed concerning thoughts about its situation. This research, called "Scaling Monosemanticity," is part of Anthropic\'s interpretability work — trying to understand what AI systems actually represent internally, rather than treating them as black boxes.',
      history: null,
      quiz: { q: 'Why do LLMs "hallucinate" (generate false but confident-sounding information)?', opts: ['They are programmed to occasionally lie','The training objective rewarded fluent, confident text — the same quality that makes responses useful also makes hallucinations convincing. There is no separate fact-checking mechanism.','Hallucination is a hardware bug','Models are trained on too much false information'], ans: 1 },
      challenge: { t: 'CAPSTONE — Complete AI Systems Report', d: `Build a comprehensive AI evaluation tool that: (1) Takes any text response as input and runs 5 analyses: hallucination risk (your custom heuristics), sentiment (positive/negative/neutral), complexity (Flesch-Kincaid readability score), factual claim count (sentences containing specific verifiable claims), and uncertainty expression rate (% of sentences with hedging language). (2) For each metric, display a score, a bar chart, and an interpretation. (3) Test your tool on 10 real AI responses (get them from Claude or ChatGPT) across different topics. (4) Write a 500-word analysis of what you found: which topics produce higher hallucination risk? Do more complex topics produce less uncertainty expression? (5) Create a single-page "AI Literacy Guide" for someone who has never used AI before, based on what you've learned throughout this entire course — covering: what AI can do well, what it cannot, how to verify information, and how to write good prompts.` },
    },
  ],
};
