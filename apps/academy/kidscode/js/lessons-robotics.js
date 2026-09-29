T21.lessons.robotics = {
  title: 'Robotics & IoT', banner: 'robotics',
  subtitle: 'Build machines that sense the physical world, make decisions, and take action.',
  steps: [

    /* ══════════════════════════════════════════════════════════
       STEP 1 — What Robotics Is, Hardware Platforms
       ══════════════════════════════════════════════════════════ */
    {
      h: '🤖 Step 1 — What Robotics Really Is & The Hardware Ecosystem',
      p: `A robot is any machine that can <strong>sense</strong> its environment, <strong>process</strong> that information, and <strong>act</strong> on the world in response. This sense-think-act loop is the heart of all robotics — from a simple robot arm on a factory production line to NASA's Perseverance rover exploring Mars.
<br><br>
<strong>The three hardware platforms every robotics student needs to know:</strong>
<br><br>
<strong>Arduino</strong> — a microcontroller board. Runs one small C++ program continuously in a loop. No operating system. 16 MHz clock. Perfect for: direct hardware control, timing-critical operations, simple sensors/actuators, projects where you need instant, predictable response times. Cost: $5–$30.
<br><br>
<strong>Raspberry Pi</strong> — a full single-board computer running Linux. 1.8 GHz quad-core. Has WiFi, Bluetooth, USB, HDMI. Perfect for: projects needing internet connectivity, computer vision, machine learning, running multiple programs at once. Cost: $35–$75.
<br><br>
<strong>LEGO Mindstorms / SPIKE</strong> — educational robotics kit with integrated sensors, motors, and a brick. Perfect for: learning concepts quickly, competition robotics (WRO, FLL), visual programming. Cost: $150–$350.
<br><br>
<strong>The key difference:</strong> Arduino excels at real-time hardware control (it's doing NOTHING else). Raspberry Pi excels at complex computation (but Linux adds unpredictable timing). Many professional robot projects use BOTH together.`,
      code: `<span class="cm">/* ARDUINO PROGRAM STRUCTURE
   Every Arduino program (called a "sketch") has exactly two functions:
   setup() runs once at start. loop() runs forever after that.
   This IS the operating system — your code is in full control. */</span>

<span class="cm">// Classic "Blink" — the Hello World of hardware</span>
<span class="kw">const int</span> LED_PIN = <span class="num">13</span>;   <span class="cm">// Pin 13 has a built-in LED on most boards</span>
<span class="kw">const int</span> BLINK_INTERVAL = <span class="num">500</span>;  <span class="cm">// milliseconds</span>

<span class="kw">void</span> <span class="fn">setup</span>() {
    <span class="cm">// pinMode: configure a pin as INPUT or OUTPUT</span>
    <span class="fn">pinMode</span>(LED_PIN, OUTPUT);

    <span class="cm">// Serial: communicate with your computer over USB for debugging</span>
    Serial.<span class="fn">begin</span>(<span class="num">9600</span>);   <span class="cm">// 9600 baud = 9600 bits per second</span>
    Serial.<span class="fn">println</span>(<span class="str">"Robot starting up..."</span>);
}

<span class="kw">void</span> <span class="fn">loop</span>() {
    <span class="cm">// digitalWrite: set a digital pin HIGH (5V) or LOW (0V)</span>
    <span class="fn">digitalWrite</span>(LED_PIN, HIGH);   <span class="cm">// LED on</span>
    Serial.<span class="fn">println</span>(<span class="str">"LED: ON"</span>);
    <span class="fn">delay</span>(BLINK_INTERVAL);         <span class="cm">// wait 500ms</span>

    <span class="fn">digitalWrite</span>(LED_PIN, LOW);    <span class="cm">// LED off</span>
    Serial.<span class="fn">println</span>(<span class="str">"LED: OFF"</span>);
    <span class="fn">delay</span>(BLINK_INTERVAL);

    <span class="cm">// This loop runs FOREVER at full speed
    // On Arduino Uno: ~16 million cycles per second</span>
}`,
      examples: [
        { label: 'Reading analog and digital sensors', code: `<span class="cm">/* DIGITAL vs ANALOG Signals
   Digital: exactly two states — HIGH (5V) or LOW (0V)
   Analog: any voltage from 0V to 5V, mapped to 0-1023 by Arduino's ADC */</span>

<span class="kw">const int</span> BUTTON_PIN      = <span class="num">2</span>;    <span class="cm">// digital input</span>
<span class="kw">const int</span> POTENTIOMETER   = <span class="num">A0</span>;   <span class="cm">// analog input (A0-A5)</span>
<span class="kw">const int</span> LIGHT_SENSOR    = <span class="num">A1</span>;   <span class="cm">// light-dependent resistor (LDR)</span>
<span class="kw">const int</span> LED_PIN          = <span class="num">9</span>;    <span class="cm">// PWM-capable pin for brightness</span>

<span class="kw">void</span> <span class="fn">setup</span>() {
    <span class="fn">pinMode</span>(BUTTON_PIN, INPUT_PULLUP);  <span class="cm">// internal pull-up resistor</span>
    <span class="fn">pinMode</span>(LED_PIN,    OUTPUT);
    Serial.<span class="fn">begin</span>(<span class="num">9600</span>);
}

<span class="kw">void</span> <span class="fn">loop</span>() {
    <span class="cm">// Read digital button (INPUT_PULLUP = LOW when pressed)</span>
    <span class="kw">bool</span> buttonPressed = (<span class="fn">digitalRead</span>(BUTTON_PIN) == LOW);

    <span class="cm">// Read analog sensors (0-1023)</span>
    <span class="kw">int</span> potValue   = <span class="fn">analogRead</span>(POTENTIOMETER);  <span class="cm">// 0-1023</span>
    <span class="kw">int</span> lightLevel = <span class="fn">analogRead</span>(LIGHT_SENSOR);   <span class="cm">// 0=dark, 1023=bright</span>

    <span class="cm">// map() scales a value from one range to another</span>
    <span class="kw">int</span> brightness = <span class="fn">map</span>(potValue, <span class="num">0</span>, <span class="num">1023</span>, <span class="num">0</span>, <span class="num">255</span>);

    <span class="cm">// analogWrite: PWM output (0=off, 255=full, 128=50% duty cycle)</span>
    <span class="fn">analogWrite</span>(LED_PIN, buttonPressed ? brightness : <span class="num">0</span>);

    Serial.<span class="fn">print</span>(<span class="str">"Light:"</span>); Serial.<span class="fn">print</span>(lightLevel);
    Serial.<span class="fn">print</span>(<span class="str">" Pot:"</span>);   Serial.<span class="fn">println</span>(potValue);
    <span class="fn">delay</span>(<span class="num">100</span>);
}` },
        { label: 'Raspberry Pi GPIO with Python', code: `<span class="cm"># Raspberry Pi uses Python + gpiozero library for GPIO</span>
<span class="cm"># GPIO = General Purpose Input/Output (the 40 pins on the Pi)</span>

<span class="kw">from</span> gpiozero <span class="kw">import</span> LED, Button, DistanceSensor, Servo
<span class="kw">from</span> time <span class="kw">import</span> sleep
<span class="kw">import</span> RPi.GPIO <span class="kw">as</span> GPIO

<span class="cm"># Create hardware objects — gpiozero handles all the low-level details</span>
led    = <span class="fn">LED</span>(<span class="num">17</span>)          <span class="cm"># LED on GPIO pin 17</span>
button = <span class="fn">Button</span>(<span class="num">18</span>)       <span class="cm"># Button on GPIO pin 18</span>
sensor = <span class="fn">DistanceSensor</span>(echo=<span class="num">24</span>, trigger=<span class="num">23</span>)  <span class="cm"># ultrasonic sensor</span>

<span class="cm"># Respond to button press with a callback</span>
<span class="kw">def</span> <span class="fn">on_button_press</span>():
    <span class="fn">print</span>(<span class="str">"Button pressed!"</span>)
    led.<span class="fn">blink</span>(on_time=<span class="num">0.1</span>, off_time=<span class="num">0.1</span>, n=<span class="num">3</span>)  <span class="cm"># blink 3 times</span>

button.when_pressed = on_button_press

<span class="cm"># Main loop: read distance and respond</span>
<span class="kw">while True</span>:
    distance = sensor.distance * <span class="num">100</span>   <span class="cm"># convert to cm</span>
    <span class="fn">print</span>(<span class="str">f"Distance: {distance:.1f}cm"</span>)
    <span class="kw">if</span> distance < <span class="num">20</span>:
        led.<span class="fn">on</span>()   <span class="cm"># obstacle nearby!</span>
    <span class="kw">else</span>:
        led.<span class="fn">off</span>()
    <span class="fn">sleep</span>(<span class="num">0.1</span>)` },
      ],
      fact: 'The first truly programmable robot was the Unimate, installed at a General Motors plant in 1961 to lift and weld car parts. It weighed 2 tons and replaced the most dangerous jobs on the assembly line. The programmer\'s "code" was a series of magnetic drums that stored positional instructions — a mechanical predecessor of what you now write in C++ or Python.',
      history: 'robot_unimate',
      quiz: { q: 'What is the key difference between Arduino and Raspberry Pi for robotics?', opts: ['Arduino is newer than Raspberry Pi','Arduino is a microcontroller running one program with direct, real-time hardware control; Raspberry Pi is a full Linux computer better suited for complex computation and connectivity','Raspberry Pi cannot control motors','Arduino requires internet connectivity'], ans: 1 },
      challenge: { t: 'Traffic Light Controller', d: 'Write an Arduino program that simulates a traffic light using 3 LEDs (red on pin 8, yellow on pin 9, green on pin 10). Implement the full UK traffic light sequence: Red (3s) → Red+Yellow together (1s) → Green (3s) → Yellow (1s) → back to Red. Print the current state and elapsed time to Serial. Add a pedestrian button (pin 2) that, when pressed during the green phase, immediately triggers yellow then red early.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 2 — Sensors: The Five Senses of Robots
       ══════════════════════════════════════════════════════════ */
    {
      h: '👁️ Step 2 — Sensors: How Robots Perceive the Physical World',
      p: `Sensors are a robot's sense organs. Without them, a robot is blind, deaf, and numb — it can only act on pre-programmed instructions without any knowledge of its actual environment. Understanding sensors — their physical principles, output types, limitations, and code interfaces — is fundamental to building robots that work in the real world.
<br><br>
<strong>Sensor categories and examples:</strong><br>
• <strong>Distance / Proximity</strong>: Ultrasonic (HC-SR04), IR, LiDAR, RADAR<br>
• <strong>Light / Vision</strong>: LDR, photodiode, colour sensor (TCS34725), camera module<br>
• <strong>Temperature</strong>: thermistor, DHT11/22, DS18B20, MLX90614 (infrared, non-contact)<br>
• <strong>Motion / IMU</strong>: accelerometer, gyroscope, magnetometer — often combined in one chip (MPU-6050)<br>
• <strong>Touch</strong>: mechanical button, capacitive touch sensor, FSR (force-sensitive resistor)<br>
• <strong>Gas / Environment</strong>: CO2 (MH-Z19), humidity (DHT22), air quality (MQ-2)
<br><br>
<strong>The two most important concepts for working with sensors:</strong><br>
1. <strong>Calibration</strong> — sensors lie. Every sensor has systematic errors. You must characterise the error and correct for it in code.<br>
2. <strong>Noise filtering</strong> — sensor readings fluctuate randomly. Taking multiple readings and averaging (or using a rolling average) gives much more stable values.`,
      code: `<span class="cm">/* Ultrasonic Distance Sensor (HC-SR04)
   Physical principle: emits a 40kHz ultrasonic pulse,
   measures how long until the echo returns.
   distance = (speed_of_sound × time) / 2
   
   Wiring: Trigger pin → send pulse, Echo pin → receive echo */</span>

<span class="kw">const int</span> TRIG_PIN = <span class="num">9</span>;
<span class="kw">const int</span> ECHO_PIN = <span class="num">10</span>;
<span class="kw">const float</span> SOUND_SPEED_CM_US = <span class="num">0.0343</span>;  <span class="cm">// cm per microsecond at 20°C</span>

<span class="kw">float</span> <span class="fn">readDistanceCm</span>() {
    <span class="cm">// Send trigger pulse: LOW for 2µs, HIGH for 10µs, then LOW</span>
    <span class="fn">digitalWrite</span>(TRIG_PIN, LOW);
    <span class="fn">delayMicroseconds</span>(<span class="num">2</span>);
    <span class="fn">digitalWrite</span>(TRIG_PIN, HIGH);
    <span class="fn">delayMicroseconds</span>(<span class="num">10</span>);
    <span class="fn">digitalWrite</span>(TRIG_PIN, LOW);

    <span class="cm">// Measure how long echo pin stays HIGH (in microseconds)</span>
    <span class="kw">long</span> duration = <span class="fn">pulseIn</span>(ECHO_PIN, HIGH, <span class="num">30000</span>);  <span class="cm">// 30ms timeout</span>

    <span class="kw">if</span> (duration == <span class="num">0</span>) <span class="kw">return</span> -<span class="num">1</span>;  <span class="cm">// timeout = no object detected</span>

    <span class="cm">// Distance = (duration × speed_of_sound) ÷ 2  (÷2 for round trip)</span>
    <span class="kw">return</span> (duration * SOUND_SPEED_CM_US) / <span class="num">2.0</span>;
}`,
      examples: [
        { label: 'Noise filtering with rolling average', code: `<span class="cm">/* Raw sensor readings are noisy — individual readings jump around.
   A rolling average smooths this out without expensive calculations. */</span>

<span class="kw">const int</span> WINDOW_SIZE = <span class="num">10</span>;
<span class="kw">float</span> readings[WINDOW_SIZE] = {<span class="num">0</span>};
<span class="kw">int</span>   readIndex = <span class="num">0</span>;

<span class="kw">float</span> <span class="fn">getFilteredDistance</span>() {
    <span class="cm">// Add new reading to circular buffer</span>
    readings[readIndex] = <span class="fn">readDistanceCm</span>();
    readIndex = (readIndex + <span class="num">1</span>) % WINDOW_SIZE;

    <span class="cm">// Calculate average of all readings in buffer</span>
    <span class="kw">float</span> sum = <span class="num">0</span>;
    <span class="kw">int</span> validCount = <span class="num">0</span>;
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i < WINDOW_SIZE; i++) {
        <span class="kw">if</span> (readings[i] > <span class="num">0</span>) {   <span class="cm">// skip -1 (no reading yet)</span>
            sum += readings[i];
            validCount++;
        }
    }
    <span class="kw">return</span> validCount > <span class="num">0</span> ? sum / validCount : -<span class="num">1</span>;
}

<span class="kw">void</span> <span class="fn">loop</span>() {
    <span class="kw">float</span> rawDist      = <span class="fn">readDistanceCm</span>();
    <span class="kw">float</span> filteredDist = <span class="fn">getFilteredDistance</span>();

    Serial.<span class="fn">print</span>(<span class="str">"Raw: "</span>);      Serial.<span class="fn">print</span>(rawDist, <span class="num">1</span>);
    Serial.<span class="fn">print</span>(<span class="str">"cm  Avg: "</span>); Serial.<span class="fn">print</span>(filteredDist, <span class="num">1</span>);
    Serial.<span class="fn">println</span>(<span class="str">"cm"</span>);
    <span class="fn">delay</span>(<span class="num">50</span>);
}` },
        { label: 'DHT22 temperature and humidity sensor', code: `#<span class="kw">include</span> <span class="str">&lt;DHT.h&gt;</span>   <span class="cm">// Install via Arduino Library Manager</span>

<span class="kw">const int</span> DHT_PIN  = <span class="num">4</span>;
<span class="kw">const int</span> DHT_TYPE = DHT22;   <span class="cm">// DHT22 has better accuracy than DHT11</span>

DHT <span class="fn">dht</span>(DHT_PIN, DHT_TYPE);

<span class="kw">void</span> <span class="fn">setup</span>() {
    Serial.<span class="fn">begin</span>(<span class="num">9600</span>);
    dht.<span class="fn">begin</span>();
    Serial.<span class="fn">println</span>(<span class="str">"DHT22 Temperature & Humidity Sensor"</span>);
}

<span class="kw">void</span> <span class="fn">loop</span>() {
    <span class="fn">delay</span>(<span class="num">2000</span>);   <span class="cm">// DHT22 needs 2 seconds between readings</span>

    <span class="kw">float</span> humidity    = dht.<span class="fn">readHumidity</span>();
    <span class="kw">float</span> tempC       = dht.<span class="fn">readTemperature</span>();       <span class="cm">// Celsius</span>
    <span class="kw">float</span> tempF       = dht.<span class="fn">readTemperature</span>(<span class="kw">true</span>);  <span class="cm">// Fahrenheit</span>
    <span class="kw">float</span> heatIndexC  = dht.<span class="fn">computeHeatIndex</span>(tempC, humidity, <span class="kw">false</span>);

    <span class="kw">if</span> (<span class="fn">isnan</span>(humidity) || <span class="fn">isnan</span>(tempC)) {
        Serial.<span class="fn">println</span>(<span class="str">"❌ Sensor read failed!"</span>);
        <span class="kw">return</span>;
    }

    Serial.<span class="fn">print</span>(<span class="str">"Humidity: "</span>);    Serial.<span class="fn">print</span>(humidity, <span class="num">1</span>);
    Serial.<span class="fn">print</span>(<span class="str">"%  Temp: "</span>);    Serial.<span class="fn">print</span>(tempC, <span class="num">1</span>);
    Serial.<span class="fn">print</span>(<span class="str">"°C / "</span>);        Serial.<span class="fn">print</span>(tempF, <span class="num">1</span>);
    Serial.<span class="fn">print</span>(<span class="str">"°F  Feels: "</span>); Serial.<span class="fn">print</span>(heatIndexC, <span class="num">1</span>);
    Serial.<span class="fn">println</span>(<span class="str">"°C"</span>);
}` },
      ],
      fact: 'The Mars rovers use a form of 3D distance sensing called LiDAR (Light Detection And Ranging) — essentially hundreds of ultrasonic sensors working simultaneously using lasers instead of sound waves. Perseverance has a LiDAR system called SuperCam that can analyse rock composition from 7 metres away by firing a laser pulse and analysing the plasma it creates. The team programs it from Earth with a 22-minute signal delay each way.',
      history: 'mars_rover',
      quiz: { q: 'Why is filtering (averaging multiple sensor readings) important in robotics?', opts: ['It makes the sensor more accurate by hardware improvement','Sensors produce random noise — averaging multiple readings cancels out random errors and gives a more stable, reliable value','It reduces power consumption','It prevents the Arduino from overheating'], ans: 1 },
      challenge: { t: 'Environmental Monitoring Station', d: 'Build a monitoring station that reads distance with ultrasonic sensor and temperature/humidity with DHT22. Use rolling average filtering (window of 5) for both. Classify the environment: Proximity ("Clear" >100cm, "Near" 20-100cm, "Warning" 5-20cm, "STOP" <5cm) and Comfort ("Cold" <15°C, "Comfortable" 15-28°C, "Hot" >28°C). Print a formatted dashboard to Serial every second. Sound a buzzer (pin 11) when proximity is in Warning zone.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 3 — Actuators: Making Robots Move
       ══════════════════════════════════════════════════════════ */
    {
      h: '⚙️ Step 3 — Actuators: Motors, Servos & Making Robots Move',
      p: `If sensors are a robot's senses, <strong>actuators</strong> are its muscles — they turn electrical signals into physical movement. Understanding the different types of actuators and how to control them in code is essential for building robots that interact with the world.
<br><br>
<strong>Three fundamental actuator types:</strong>
<br><br>
<strong>DC Motors</strong> — spin continuously in either direction at variable speed. Used in: drive wheels, fans, pumps. Controlled with PWM and a motor driver chip (L298N or L293D) because the Arduino can't supply enough current to drive a motor directly.
<br><br>
<strong>Servo Motors</strong> — rotate to a specific angle (0°–180° for standard, continuous rotation for modified servos). Used in: camera pan/tilt, gripper arms, rudders, steering. Controlled with a specific 50Hz PWM signal.
<br><br>
<strong>Stepper Motors</strong> — rotate by precise, discrete steps (e.g., 200 steps = 360°). No feedback needed — each step is exact. Used in: 3D printers, CNC machines, camera sliders. Slower than DC motors but extremely precise.`,
      code: `#<span class="kw">include</span> <span class="str">&lt;Servo.h&gt;</span>    <span class="cm">// Built into Arduino IDE</span>

<span class="cm">/* SERVO MOTOR CONTROL
   Servo expects a PWM signal at 50Hz (every 20ms).
   Pulse width determines position:
   1ms → 0°,  1.5ms → 90°,  2ms → 180° */</span>

Servo panServo;   <span class="cm">// horizontal pan</span>
Servo tiltServo;  <span class="cm">// vertical tilt</span>

<span class="kw">void</span> <span class="fn">setup</span>() {
    panServo.<span class="fn">attach</span>(<span class="num">9</span>);    <span class="cm">// attach servo to PWM pin 9</span>
    tiltServo.<span class="fn">attach</span>(<span class="num">10</span>);

    panServo.<span class="fn">write</span>(<span class="num">90</span>);   <span class="cm">// centre position (0-180 degrees)</span>
    tiltServo.<span class="fn">write</span>(<span class="num">45</span>);  <span class="cm">// slightly down</span>
    <span class="fn">delay</span>(<span class="num">500</span>);
}

<span class="kw">void</span> <span class="fn">sweepTo</span>(<span class="kw">int</span> targetAngle, Servo& servo, <span class="kw">int</span> stepDelay = <span class="num">15</span>) {
    <span class="kw">int</span> currentAngle = servo.<span class="fn">read</span>();
    <span class="kw">int</span> step = (targetAngle > currentAngle) ? <span class="num">1</span> : -<span class="num">1</span>;

    <span class="kw">while</span> (currentAngle != targetAngle) {
        currentAngle += step;
        servo.<span class="fn">write</span>(currentAngle);
        <span class="fn">delay</span>(stepDelay);  <span class="cm">// smooth movement</span>
    }
}

<span class="kw">void</span> <span class="fn">loop</span>() {
    <span class="fn">sweepTo</span>(<span class="num">0</span>,   panServo);   <span class="cm">// pan left</span>
    <span class="fn">sweepTo</span>(<span class="num">180</span>, panServo);   <span class="cm">// pan right</span>
    <span class="fn">sweepTo</span>(<span class="num">90</span>,  panServo);   <span class="cm">// return to centre</span>
}`,
      examples: [
        { label: 'DC motor with L298N motor driver — robot drive system', code: `<span class="cm">/* L298N Motor Driver — controls TWO DC motors
   Each motor needs: PWM pin (speed, 0-255) + 2 direction pins (HIGH/LOW)
   
   Wiring for left motor:
   ENA  → Pin 5 (PWM)
   IN1  → Pin 6 (direction)
   IN2  → Pin 7 (direction)
   
   Wiring for right motor:  
   ENB  → Pin 10 (PWM)
   IN3  → Pin 8 (direction)
   IN4  → Pin 9 (direction) */</span>

<span class="kw">void</span> <span class="fn">setMotor</span>(<span class="kw">int</span> pwmPin, <span class="kw">int</span> dir1, <span class="kw">int</span> dir2, <span class="kw">int</span> speed, <span class="kw">bool</span> forward) {
    <span class="fn">digitalWrite</span>(dir1, forward ? HIGH : LOW);
    <span class="fn">digitalWrite</span>(dir2, forward ? LOW : HIGH);
    <span class="fn">analogWrite</span>(pwmPin, constrain(speed, <span class="num">0</span>, <span class="num">255</span>));
}

<span class="kw">void</span> <span class="fn">driveForward</span>(<span class="kw">int</span> speed)  { <span class="fn">setMotor</span>(<span class="num">5</span>,<span class="num">6</span>,<span class="num">7</span>,speed,<span class="kw">true</span>);  <span class="fn">setMotor</span>(<span class="num">10</span>,<span class="num">8</span>,<span class="num">9</span>,speed,<span class="kw">true</span>); }
<span class="kw">void</span> <span class="fn">driveBack</span>(<span class="kw">int</span> speed)     { <span class="fn">setMotor</span>(<span class="num">5</span>,<span class="num">6</span>,<span class="num">7</span>,speed,<span class="kw">false</span>); <span class="fn">setMotor</span>(<span class="num">10</span>,<span class="num">8</span>,<span class="num">9</span>,speed,<span class="kw">false</span>); }
<span class="kw">void</span> <span class="fn">turnLeft</span>(<span class="kw">int</span> speed)      { <span class="fn">setMotor</span>(<span class="num">5</span>,<span class="num">6</span>,<span class="num">7</span>,<span class="num">0</span>,<span class="kw">true</span>);     <span class="fn">setMotor</span>(<span class="num">10</span>,<span class="num">8</span>,<span class="num">9</span>,speed,<span class="kw">true</span>); }
<span class="kw">void</span> <span class="fn">stopAll</span>()                { <span class="fn">analogWrite</span>(<span class="num">5</span>,<span class="num">0</span>); <span class="fn">analogWrite</span>(<span class="num">10</span>,<span class="num">0</span>); }` },
        { label: 'Servo-controlled robotic gripper', code: `<span class="cm">/* Robotic gripper using two servos:
   - Grip servo:  0° = fully open, 90° = gripping
   - Wrist servo: controls wrist angle */</span>

#<span class="kw">include</span> <span class="str">&lt;Servo.h&gt;</span>

Servo gripServo, wristServo;
<span class="kw">const int</span> FORCE_PIN = A0;   <span class="cm">// FSR (force-sensitive resistor) in gripper</span>

<span class="kw">void</span> <span class="fn">setup</span>() {
    gripServo.<span class="fn">attach</span>(<span class="num">9</span>);
    wristServo.<span class="fn">attach</span>(<span class="num">10</span>);
    <span class="fn">openGripper</span>();
    Serial.<span class="fn">begin</span>(<span class="num">9600</span>);
}

<span class="kw">void</span> <span class="fn">openGripper</span>()  { <span class="fn">sweepServo</span>(gripServo, <span class="num">0</span>,  <span class="num">180</span>); }
<span class="kw">void</span> <span class="fn">closeGripper</span>() { <span class="fn">sweepServo</span>(gripServo, <span class="num">180</span>, <span class="num">0</span>); }

<span class="kw">void</span> <span class="fn">gripObject</span>() {
    Serial.<span class="fn">println</span>(<span class="str">"Closing gripper slowly..."</span>);
    <span class="kw">for</span> (<span class="kw">int</span> angle = <span class="num">0</span>; angle <= <span class="num">90</span>; angle++) {
        gripServo.<span class="fn">write</span>(angle);
        <span class="fn">delay</span>(<span class="num">20</span>);

        <span class="kw">int</span> force = <span class="fn">analogRead</span>(FORCE_PIN);
        Serial.<span class="fn">print</span>(<span class="str">"Angle:"</span>); Serial.<span class="fn">print</span>(angle);
        Serial.<span class="fn">print</span>(<span class="str">" Force:"</span>); Serial.<span class="fn">println</span>(force);

        <span class="kw">if</span> (force > <span class="num">600</span>) {   <span class="cm">// sufficient grip force detected</span>
            Serial.<span class="fn">println</span>(<span class="str">"✅ Object gripped!"</span>);
            <span class="kw">break</span>;
        }
    }
}` },
      ],
      fact: 'Boston Dynamics\' Atlas robot — the one that backflips, does parkour, and dances — uses a combination of hydraulic actuators (for raw power) and electric servo motors (for precise positioning), all controlled by onboard computers running real-time control algorithms that update 1,000 times per second. The balance system alone processes data from 28 joints and multiple IMUs to keep a 80kg robot from falling over while performing acrobatics.',
      history: null,
      quiz: { q: 'Why does a DC motor need a separate motor driver chip (like L298N) rather than being connected directly to an Arduino pin?', opts: ['DC motors need special software libraries','An Arduino\'s pins can only supply ~40mA, but a DC motor needs hundreds of mA or more — the motor driver amplifies the signal and provides the needed current from a separate power supply','DC motors only work at 12V','The motor driver converts digital signals to analog'], ans: 1 },
      challenge: { t: 'Servo-Tracked Distance Monitor', d: 'Build a scanning distance monitor: a servo sweeps from 0° to 180° in 5° steps, taking an ultrasonic distance reading at each angle. Store all 37 readings in an array. After each complete sweep, print a simple ASCII bar chart to Serial showing the "radar map" — each row shows the angle and a bar of █ characters proportional to distance. Highlight angles where objects were detected closer than 30cm with an asterisk. Repeat continuously.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 4 — Autonomous Navigation
       ══════════════════════════════════════════════════════════ */
    {
      h: '🧭 Step 4 — Autonomous Navigation: Decision Trees & State Machines',
      p: `Autonomy is what separates a remote-controlled toy from a robot. An <strong>autonomous robot</strong> makes its own decisions based on sensor data — no human in the loop. The challenge is: how do you write code that makes reliable decisions in a messy, unpredictable real world?
<br><br>
<strong>Two fundamental approaches to robot decision-making:</strong>
<br><br>
<strong>1. Decision Trees / Rule-Based Systems</strong><br>
A hierarchy of if/else statements that map sensor conditions to actions. Simple, predictable, easy to debug. Works well for structured environments. The limitation: can't handle every edge case — the real world has infinite variation.
<br><br>
<strong>2. Finite State Machines (FSM)</strong><br>
The robot is always in exactly one <em>state</em> (e.g., MOVING_FORWARD, TURNING_LEFT, AVOIDING_OBSTACLE). Events (sensor readings) trigger <em>transitions</em> between states. Each state has a specific behaviour. FSMs are much more powerful than raw if/else chains because they encode the <em>history</em> of what the robot was doing — not just what's happening right now.
<br><br>
Professional robot software (ROS — Robot Operating System) uses FSMs and behaviour trees at its core. Learning FSMs here gives you the mental model that scales all the way to autonomous vehicles.`,
      code: `<span class="cm">/* FINITE STATE MACHINE for autonomous obstacle avoidance
   
   States:
     FORWARD   — moving ahead, scanning for obstacles
     STOP      — obstacle detected, deciding what to do
     TURN_LEFT — rotating left to find clear path
     TURN_RIGHT — rotating right if left was blocked
     BACKUP    — too close, reversing first
   
   The key insight: each state has ONE job, and transitions
   are driven ONLY by sensor events. */</span>

<span class="kw">enum</span> RobotState {
    STATE_FORWARD,
    STATE_STOP,
    STATE_BACKUP,
    STATE_TURN_LEFT,
    STATE_TURN_RIGHT
};

RobotState currentState    = STATE_FORWARD;
<span class="kw">unsigned long</span> stateStartTime = <span class="num">0</span>;

<span class="kw">const int</span> OBSTACLE_DIST     = <span class="num">25</span>;   <span class="cm">// cm</span>
<span class="kw">const int</span> DANGER_DIST       = <span class="num">10</span>;   <span class="cm">// cm</span>
<span class="kw">const int</span> TURN_DURATION     = <span class="num">600</span>;  <span class="cm">// ms</span>
<span class="kw">const int</span> BACKUP_DURATION   = <span class="num">400</span>;  <span class="cm">// ms</span>`,
      examples: [
        { label: 'Full FSM update loop', code: `<span class="kw">void</span> <span class="fn">setState</span>(RobotState newState) {
    <span class="kw">if</span> (newState != currentState) {
        Serial.<span class="fn">print</span>(<span class="str">"State → "</span>);
        Serial.<span class="fn">println</span>(newState);     <span class="cm">// log transition</span>
        currentState = newState;
        stateStartTime = <span class="fn">millis</span>();    <span class="cm">// record when we entered this state</span>
    }
}

<span class="kw">unsigned long</span> <span class="fn">timeInState</span>() {
    <span class="kw">return</span> <span class="fn">millis</span>() - stateStartTime;  <span class="cm">// how long in current state</span>
}

<span class="kw">void</span> <span class="fn">updateFSM</span>() {
    <span class="kw">float</span> frontDist  = <span class="fn">getFilteredDistance</span>();
    <span class="kw">float</span> leftDist   = <span class="fn">getLeftDistance</span>();
    <span class="kw">float</span> rightDist  = <span class="fn">getRightDistance</span>();

    <span class="kw">switch</span> (currentState) {
        <span class="kw">case</span> STATE_FORWARD:
            <span class="fn">driveForward</span>(<span class="num">180</span>);
            <span class="kw">if</span> (frontDist < DANGER_DIST)   <span class="fn">setState</span>(STATE_BACKUP);
            <span class="kw">else if</span> (frontDist < OBSTACLE_DIST) <span class="fn">setState</span>(STATE_STOP);
            <span class="kw">break</span>;

        <span class="kw">case</span> STATE_STOP:
            <span class="fn">stopAll</span>();
            <span class="cm">// Decide: turn toward whichever side has more space</span>
            <span class="kw">if</span> (<span class="fn">timeInState</span>() > <span class="num">200</span>) {   <span class="cm">// wait 200ms before deciding</span>
                <span class="fn">setState</span>(leftDist > rightDist ? STATE_TURN_LEFT : STATE_TURN_RIGHT);
            }
            <span class="kw">break</span>;

        <span class="kw">case</span> STATE_BACKUP:
            <span class="fn">driveBack</span>(<span class="num">150</span>);
            <span class="kw">if</span> (<span class="fn">timeInState</span>() > BACKUP_DURATION) <span class="fn">setState</span>(STATE_STOP);
            <span class="kw">break</span>;

        <span class="kw">case</span> STATE_TURN_LEFT:
            <span class="fn">turnLeft</span>(<span class="num">150</span>);
            <span class="kw">if</span> (<span class="fn">timeInState</span>() > TURN_DURATION)  <span class="fn">setState</span>(STATE_FORWARD);
            <span class="kw">break</span>;

        <span class="kw">case</span> STATE_TURN_RIGHT:
            <span class="fn">turnRight</span>(<span class="num">150</span>);
            <span class="kw">if</span> (<span class="fn">timeInState</span>() > TURN_DURATION)  <span class="fn">setState</span>(STATE_FORWARD);
            <span class="kw">break</span>;
    }
}

<span class="kw">void</span> <span class="fn">loop</span>() {
    <span class="fn">updateFSM</span>();   <span class="cm">// called every ~20ms → 50 decisions per second</span>
    <span class="fn">delay</span>(<span class="num">20</span>);
}` },
        { label: 'Line-following robot — another classic FSM', code: `<span class="cm">/* Line following uses IR sensors below the robot:
   IR sensor LOW  = seeing dark line (absorbs IR)
   IR sensor HIGH = seeing white surface (reflects IR)
   
   Two sensors: left (A0) and right (A1) */</span>

<span class="kw">enum</span> LineState { ON_LINE, DRIFTED_LEFT, DRIFTED_RIGHT, LOST_LINE };

LineState <span class="fn">readLineState</span>() {
    <span class="kw">bool</span> leftSees  = <span class="fn">analogRead</span>(A0) < <span class="num">500</span>;  <span class="cm">// true = sees line</span>
    <span class="kw">bool</span> rightSees = <span class="fn">analogRead</span>(A1) < <span class="num">500</span>;

    <span class="kw">if</span> ( leftSees &&  rightSees) <span class="kw">return</span> ON_LINE;
    <span class="kw">if</span> (!leftSees &&  rightSees) <span class="kw">return</span> DRIFTED_LEFT;  <span class="cm">// drift left: only right sees line</span>
    <span class="kw">if</span> ( leftSees && !rightSees) <span class="kw">return</span> DRIFTED_RIGHT;
    <span class="kw">return</span> LOST_LINE;
}

<span class="kw">void</span> <span class="fn">followLine</span>() {
    <span class="kw">switch</span> (<span class="fn">readLineState</span>()) {
        <span class="kw">case</span> ON_LINE:       <span class="fn">driveForward</span>(<span class="num">180</span>); <span class="kw">break</span>;
        <span class="kw">case</span> DRIFTED_LEFT:  <span class="fn">turnLeft</span>(<span class="num">100</span>);    <span class="kw">break</span>;  <span class="cm">// gentle correction</span>
        <span class="kw">case</span> DRIFTED_RIGHT: <span class="fn">turnRight</span>(<span class="num">100</span>);   <span class="kw">break</span>;
        <span class="kw">case</span> LOST_LINE:     <span class="fn">stopAll</span>();         <span class="kw">break</span>;  <span class="cm">// wait to relocate</span>
    }
}` },
      ],
      fact: 'Tesla\'s Autopilot and Full Self-Driving systems are, at their core, an enormously sophisticated state machine with hundreds of states and thousands of transitions. The states include things like "lane following", "highway merge", "junction navigation", "emergency brake". Each state uses different sensor fusion, prediction, and control algorithms. The engineers who design these are doing exactly what you just learned — just at vastly greater complexity and with real lives depending on correctness.',
      history: null,
      quiz: { q: 'What is the key advantage of a Finite State Machine (FSM) over simple if/else decision trees for robot navigation?', opts: ['FSMs are faster to execute','An FSM encodes what the robot was PREVIOUSLY doing, not just current sensor readings — making behaviour more consistent and predictable over time','FSMs require less memory','FSMs don\'t need sensors'], ans: 1 },
      challenge: { t: 'Advanced Autonomous Navigator', d: 'Simulate a complete autonomous robot in code (no physical hardware needed — use random or simulated sensor values). Implement: a full FSM with 6 states (IDLE, PATROL, AVOID_LEFT, AVOID_RIGHT, BACKUP, STUCK_RECOVERY), a sensor simulation function that generates realistic distance readings (with occasional noise), a timeout in STUCK_RECOVERY state if the robot spends more than 3 seconds without progressing, a "journey log" that records each state transition with timestamp and sensor readings, and a statistics summary printed every 20 "frames" showing time in each state.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 5 — IoT: Connecting Robots to the Internet
       ══════════════════════════════════════════════════════════ */
    {
      h: '🌐 Step 5 — IoT: Connecting Your Robot to the Internet',
      p: `<strong>IoT (Internet of Things)</strong> means connecting physical devices — sensors, robots, home appliances — to the internet so they can send data to the cloud, receive remote commands, and interact with other devices and services. There are over 15 billion IoT devices connected right now.
<br><br>
<strong>Key IoT concepts:</strong><br>
• <strong>MQTT</strong> — a lightweight messaging protocol designed for IoT. Devices <em>publish</em> data to topics (like channels), and other devices <em>subscribe</em> to receive it. Much more efficient than HTTP for devices sending frequent small updates.<br>
• <strong>REST API</strong> — sending data to/from web servers using HTTP GET/POST requests with JSON. Good for lower-frequency data and integration with existing web services.<br>
• <strong>WiFi modules</strong> — the ESP8266 and ESP32 are microcontrollers with built-in WiFi and Bluetooth. The ESP32 is particularly powerful — dual-core 240MHz, deep sleep for battery life, and Arduino-compatible.
<br><br>
<strong>Security warning:</strong> IoT devices are frequently attacked because they often have weak security. Always use HTTPS, authenticate requests, never hardcode passwords in code (use environment variables), and keep firmware updated.`,
      code: `<span class="cm">/* ESP32 / ESP8266 with WiFi — Arduino-compatible
   This runs on an ESP32 board (not standard Arduino Uno)
   Libraries needed: WiFi.h (built-in), HTTPClient.h (built-in) */</span>

#<span class="kw">include</span> <span class="str">&lt;WiFi.h&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;HTTPClient.h&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;DHT.h&gt;</span>

<span class="kw">const char</span>* WIFI_SSID     = <span class="str">"YourNetworkName"</span>;
<span class="kw">const char</span>* WIFI_PASSWORD = <span class="str">"YourPassword"</span>;
<span class="kw">const char</span>* SERVER_URL    = <span class="str">"https://api.yourserver.com/data"</span>;

DHT dht(<span class="num">4</span>, DHT22);

<span class="kw">void</span> <span class="fn">setup</span>() {
    Serial.<span class="fn">begin</span>(<span class="num">115200</span>);
    dht.<span class="fn">begin</span>();

    <span class="cm">// Connect to WiFi</span>
    WiFi.<span class="fn">begin</span>(WIFI_SSID, WIFI_PASSWORD);
    Serial.<span class="fn">print</span>(<span class="str">"Connecting to WiFi"</span>);
    <span class="kw">while</span> (WiFi.<span class="fn">status</span>() != WL_CONNECTED) {
        <span class="fn">delay</span>(<span class="num">500</span>);
        Serial.<span class="fn">print</span>(<span class="str">"."</span>);
    }
    Serial.<span class="fn">println</span>(<span class="str">"\\n✅ Connected! IP: "</span> + WiFi.<span class="fn">localIP</span>().<span class="fn">toString</span>());
}`,
      examples: [
        { label: 'Sending sensor data to a web server', code: `<span class="kw">void</span> <span class="fn">sendSensorData</span>(<span class="kw">float</span> temp, <span class="kw">float</span> humidity) {
    <span class="kw">if</span> (WiFi.<span class="fn">status</span>() != WL_CONNECTED) {
        Serial.<span class="fn">println</span>(<span class="str">"❌ WiFi disconnected"</span>);
        <span class="kw">return</span>;
    }

    HTTPClient http;
    http.<span class="fn">begin</span>(SERVER_URL);
    http.<span class="fn">addHeader</span>(<span class="str">"Content-Type"</span>, <span class="str">"application/json"</span>);
    http.<span class="fn">addHeader</span>(<span class="str">"Authorization"</span>, <span class="str">"Bearer YOUR_API_KEY"</span>);

    <span class="cm">// Build JSON payload</span>
    String payload = <span class="str">"{"</span>
        <span class="str">"\"device_id\":\"robot-01\","</span>
        <span class="str">"\"temperature\":"</span> + String(temp, <span class="num">1</span>) + <span class="str">","</span>
        <span class="str">"\"humidity\":"</span>    + String(humidity, <span class="num">1</span>) + <span class="str">","</span>
        <span class="str">"\"timestamp\":"</span>   + String(<span class="fn">millis</span>()) +
    <span class="str">"}"</span>;

    <span class="kw">int</span> httpCode = http.<span class="fn">POST</span>(payload);

    <span class="kw">if</span> (httpCode == <span class="num">200</span>) {
        Serial.<span class="fn">println</span>(<span class="str">"✅ Data sent: "</span> + payload);
    } <span class="kw">else</span> {
        Serial.<span class="fn">println</span>(<span class="str">"❌ HTTP error: "</span> + String(httpCode));
    }
    http.<span class="fn">end</span>();
}

<span class="kw">void</span> <span class="fn">loop</span>() {
    <span class="kw">float</span> temp     = dht.<span class="fn">readTemperature</span>();
    <span class="kw">float</span> humidity = dht.<span class="fn">readHumidity</span>();

    <span class="kw">if</span> (!<span class="fn">isnan</span>(temp) && !<span class="fn">isnan</span>(humidity)) {
        <span class="fn">sendSensorData</span>(temp, humidity);
    }
    <span class="fn">delay</span>(<span class="num">30000</span>);   <span class="cm">// send every 30 seconds</span>
}` },
        { label: 'MQTT for real-time IoT messaging', code: `#<span class="kw">include</span> <span class="str">&lt;WiFi.h&gt;</span>
#<span class="kw">include</span> <span class="str">&lt;PubSubClient.h&gt;</span>   <span class="cm">// MQTT library — install via Library Manager</span>

WiFiClient espClient;
PubSubClient mqtt(espClient);

<span class="kw">const char</span>* MQTT_BROKER = <span class="str">"broker.hivemq.com"</span>;  <span class="cm">// free public broker</span>
<span class="kw">const int</span>  MQTT_PORT   = <span class="num">1883</span>;

<span class="kw">void</span> <span class="fn">onMqttMessage</span>(<span class="kw">char</span>* topic, byte* message, <span class="kw">unsigned int</span> length) {
    String msg = <span class="str">""</span>;
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i < length; i++) msg += (<span class="kw">char</span>)message[i];

    Serial.<span class="fn">println</span>(<span class="str">"[MQTT] "</span> + String(topic) + <span class="str">": "</span> + msg);

    <span class="kw">if</span> (String(topic) == <span class="str">"robot/command"</span>) {
        <span class="kw">if</span> (msg == <span class="str">"FORWARD"</span>)  <span class="fn">driveForward</span>(<span class="num">200</span>);
        <span class="kw">if</span> (msg == <span class="str">"STOP"</span>)     <span class="fn">stopAll</span>();
        <span class="kw">if</span> (msg == <span class="str">"LEFT"</span>)     <span class="fn">turnLeft</span>(<span class="num">150</span>);
    }
}

<span class="kw">void</span> <span class="fn">connectMQTT</span>() {
    <span class="kw">while</span> (!mqtt.<span class="fn">connected</span>()) {
        <span class="kw">if</span> (mqtt.<span class="fn">connect</span>(<span class="str">"robot-01-client"</span>)) {
            mqtt.<span class="fn">subscribe</span>(<span class="str">"robot/command"</span>);   <span class="cm">// listen for commands</span>
            mqtt.<span class="fn">publish</span>(<span class="str">"robot/status"</span>, <span class="str">"ONLINE"</span>);
        } <span class="kw">else</span> { <span class="fn">delay</span>(<span class="num">3000</span>); }
    }
}` },
      ],
      fact: 'The world\'s largest IoT deployment is likely in agriculture. John Deere tractors use GPS, soil sensors, weather APIs, and machine learning to optimise planting density and fertiliser application at sub-metre precision across entire fields. A single modern combine harvester generates more data in a day of harvesting than a small company generates in a year — all sent to the cloud via cellular IoT connections.',
      history: null,
      quiz: { q: 'What is MQTT and why is it preferred over HTTP for many IoT applications?', opts: ['MQTT is a database protocol','MQTT is a lightweight publish-subscribe messaging protocol designed for devices with limited power and bandwidth — much more efficient for frequent small updates than HTTP','MQTT only works with Arduino devices','MQTT requires an internet connection to function'], ans: 1 },
      challenge: { t: 'IoT Environmental Station (Simulated)', d: 'Build a simulated IoT station in Python (to run on any computer, simulating the ESP32). Simulate readings every 5 seconds: temperature (sine wave 18-32°C), humidity (random 40-80%), air quality (random 0-500 AQI). Send to a free public API (wttr.in or a mock endpoint). Implement: connection retry with exponential backoff, local SQLite database logging when offline, data compression before sending, alert thresholds that trigger a "push notification" (print to console) when AQI>150 or temp>30°C.' },
    },

    /* ══════════════════════════════════════════════════════════
       STEP 6 — Capstone: Build a Complete Robot System
       ══════════════════════════════════════════════════════════ */
    {
      h: '🏆 Step 6 — Capstone: Design a Complete Robotic System',
      p: `Real robots are systems of systems — sensors feeding data to a brain that runs algorithms to decide what actuators should do, all while communicating with the outside world. Your capstone brings every concept together into a complete, documented robot design.
<br><br>
<strong>What professional robot engineers do:</strong><br>
Before writing a line of code, they draw the system architecture: what sensors, what actuators, what algorithms, what states, what protocols. Only after the design is solid does implementation begin. Good design prevents the most common robotics failure mode: code that works perfectly individually but falls apart when the whole system runs together.
<br><br>
This capstone asks you to design AND implement (in simulation) a complete robot system — proving you can think at the system level, not just the component level.`,
      code: `<span class="cm">/* SYSTEM DESIGN TEMPLATE
   
   Robot: Autonomous Indoor Security Scout
   
   SENSORS:
   - Front ultrasonic (HC-SR04): obstacle detection
   - Left/Right IR sensors: wall proximity  
   - PIR motion sensor (pin 3): intruder detection
   - Camera (ESP32-CAM): image capture on motion
   - DHT22: environmental monitoring
   
   ACTUATORS:
   - 2× DC motors via L298N: movement
   - Buzzer (pin 11): alerts
   - RGB LED (pins 5,6,9): status indicator
   - Servo-mounted camera: pan to motion source
   
   STATES:
   - PATROLLING: moving through waypoints
   - INVESTIGATING: approaching detected motion
   - ALERTING: motion confirmed, sounding alarm
   - CHARGING: low battery, returning to base
   - SAFE_MODE: obstacle/error detected
   
   CONNECTIVITY:
   - ESP32 WiFi: MQTT to home server
   - MQTT topics:
       robot/status     → published every 30s
       robot/alert      → published on motion
       robot/command    → subscribed (remote control)
       robot/telemetry  → published every 5s */</span>`,
      examples: [
        { label: 'Complete simulation in Python', code: `<span class="cm"># Full robot simulation — runs on any computer</span>
<span class="kw">import</span> random
<span class="kw">import</span> time
<span class="kw">import</span> math

<span class="kw">class</span> SimulatedRobot:
    <span class="kw">def</span> <span class="fn">__init__</span>(self):
        self.x, self.y = <span class="num">0.0</span>, <span class="num">0.0</span>   <span class="cm"># position (metres)</span>
        self.heading    = <span class="num">0.0</span>          <span class="cm"># degrees (0=north)</span>
        self.speed      = <span class="num">0.3</span>          <span class="cm"># m/s</span>
        self.state      = <span class="str">"PATROLLING"</span>
        self.battery    = <span class="num">100.0</span>        <span class="cm"># percent</span>
        self.alerts     = []
        self.log        = []
        self.frame      = <span class="num">0</span>

    <span class="kw">def</span> <span class="fn">simulate_sensors</span>(self):
        <span class="kw">return</span> {
            <span class="str">"front_dist"</span>:   random.<span class="fn">uniform</span>(<span class="num">5</span>, <span class="num">200</span>),
            <span class="str">"left_dist"</span>:    random.<span class="fn">uniform</span>(<span class="num">5</span>, <span class="num">100</span>),
            <span class="str">"right_dist"</span>:   random.<span class="fn">uniform</span>(<span class="num">5</span>, <span class="num">100</span>),
            <span class="str">"motion"</span>:       random.random() < <span class="num">0.05</span>,  <span class="cm"># 5% chance each frame</span>
            <span class="str">"temperature"</span>:  <span class="num">20</span> + math.<span class="fn">sin</span>(self.frame * <span class="num">0.1</span>) * <span class="num">3</span>,
            <span class="str">"battery_volt"</span>: self.battery,
        }

    <span class="kw">def</span> <span class="fn">update</span>(self, dt=<span class="num">0.02</span>):
        self.frame += <span class="num">1</span>
        sensors = self.<span class="fn">simulate_sensors</span>()
        self.battery -= <span class="num">0.01</span>  <span class="cm"># drain over time</span>

        <span class="kw">if</span>   self.state == <span class="str">"PATROLLING"</span>:   self.<span class="fn">patrol</span>(sensors, dt)
        <span class="kw">elif</span> self.state == <span class="str">"INVESTIGATING"</span>: self.<span class="fn">investigate</span>(sensors, dt)
        <span class="kw">elif</span> self.state == <span class="str">"ALERTING"</span>:     self.<span class="fn">alert</span>(sensors, dt)
        <span class="kw">elif</span> self.state == <span class="str">"CHARGING"</span>:    self.<span class="fn">charge</span>(sensors, dt)

        <span class="kw">if</span> self.battery < <span class="num">20</span> <span class="kw">and</span> self.state != <span class="str">"CHARGING"</span>:
            self.<span class="fn">change_state</span>(<span class="str">"CHARGING"</span>)

        <span class="kw">return</span> sensors` },
        { label: 'State methods and reporting', code: `    <span class="kw">def</span> <span class="fn">change_state</span>(self, new_state):
        self.log.<span class="fn">append</span>({
            <span class="str">"frame"</span>:     self.frame,
            <span class="str">"from_state"</span>: self.state,
            <span class="str">"to_state"</span>:  new_state,
            <span class="str">"pos"</span>:       (self.x, self.y),
        })
        <span class="fn">print</span>(<span class="str">f"  [F{self.frame}] {self.state} → {new_state}"</span>)
        self.state = new_state

    <span class="kw">def</span> <span class="fn">patrol</span>(self, s, dt):
        <span class="kw">if</span> s[<span class="str">"front_dist"</span>] < <span class="num">30</span>:
            self.heading = (self.heading + <span class="num">90</span>) % <span class="num">360</span>
        <span class="kw">else</span>:
            rad = math.<span class="fn">radians</span>(self.heading)
            self.x += math.<span class="fn">sin</span>(rad) * self.speed * dt
            self.y += math.<span class="fn">cos</span>(rad) * self.speed * dt
        <span class="kw">if</span> s[<span class="str">"motion"</span>]:
            self.alerts.<span class="fn">append</span>(self.frame)
            self.<span class="fn">change_state</span>(<span class="str">"INVESTIGATING"</span>)

    <span class="kw">def</span> <span class="fn">investigate</span>(self, s, dt):
        <span class="kw">if</span> s[<span class="str">"motion"</span>]:     self.<span class="fn">change_state</span>(<span class="str">"ALERTING"</span>)
        <span class="kw">elif</span> self.frame % <span class="num">50</span> == <span class="num">0</span>: self.<span class="fn">change_state</span>(<span class="str">"PATROLLING"</span>)

    <span class="kw">def</span> <span class="fn">alert</span>(self, s, dt):
        <span class="fn">print</span>(<span class="str">f"  🚨 ALERT! Intruder at ({self.x:.1f},{self.y:.1f})"</span>)
        <span class="kw">if</span> self.frame % <span class="num">100</span> == <span class="num">0</span>: self.<span class="fn">change_state</span>(<span class="str">"PATROLLING"</span>)

    <span class="kw">def</span> <span class="fn">charge</span>(self, s, dt):
        self.battery = min(<span class="num">100</span>, self.battery + <span class="num">0.5</span>)
        <span class="kw">if</span> self.battery >= <span class="num">80</span>:
            self.<span class="fn">change_state</span>(<span class="str">"PATROLLING"</span>)

    <span class="kw">def</span> <span class="fn">print_report</span>(self):
        <span class="fn">print</span>(<span class="str">f"\\n{'='*50}"</span>)
        <span class="fn">print</span>(<span class="str">f"ROBOT MISSION REPORT — {self.frame} frames"</span>)
        <span class="fn">print</span>(<span class="str">f"Final position: ({self.x:.2f}, {self.y:.2f})m"</span>)
        <span class="fn">print</span>(<span class="str">f"Battery: {self.battery:.1f}%"</span>)
        <span class="fn">print</span>(<span class="str">f"Alerts triggered: {len(self.alerts)}"</span>)
        <span class="fn">print</span>(<span class="str">f"State transitions: {len(self.log)}"</span>)
        <span class="fn">print</span>(<span class="str">f"{'='*50}"</span>)

<span class="cm"># Run simulation</span>
robot = <span class="fn">SimulatedRobot</span>()
<span class="fn">print</span>(<span class="str">"🤖 Security Robot Simulation starting..."</span>)
<span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="num">500</span>):   <span class="cm"># 500 frames ≈ 10 seconds at 50fps</span>
    robot.<span class="fn">update</span>()
robot.<span class="fn">print_report</span>()` },
      ],
      fact: 'The robots deployed by Amazon in its fulfilment centres — over 750,000 as of 2023 — use a version of exactly what you just learned: a central path-planning server assigns each robot a state and route, and each robot runs a local FSM to execute navigation while avoiding other robots. The entire system handles over a million state transitions per minute, coordinated across an area the size of 28 football pitches.',
      history: null,
      quiz: { q: 'Why do professional robot engineers design the system architecture BEFORE writing any code?', opts: ['To meet corporate requirements','Good system design identifies how all components interact, preventing integration failures that are far harder to debug than individual component bugs','Code is the last step in any engineering project','Regulators require documentation'], ans: 1 },
      challenge: { t: 'CAPSTONE — Complete Robot System Design & Simulation', d: `Design and simulate a Robot Chef Assistant. Requirements: (1) System architecture diagram (describe in comments): sensors (food scale, temperature probe, timer, camera for portion detection), actuators (stirrer motor, heating element via relay, dispensers). (2) Full FSM with 7+ states: IDLE, PREPARING, MIXING, HEATING, MONITORING, PLATING, ERROR. (3) Python simulation with realistic sensor models (temperature rises during heating with physics, timer counts down accurately). (4) PID controller (Proportional-Integral-Derivative) for temperature control — look up PID and implement a basic version that maintains target temperature without overshooting. (5) Recipe system: store recipes as Python dicts with steps, temperatures, timings. Execute them autonomously. (6) IoT logging: write all sensor readings and state transitions to a JSON file. (7) Complete mission report at end.` },
    },
  ],
};
