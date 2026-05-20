// app.js

let dbProgress = {};
let syncTimeout;

function showSyncStatus(msg) {
  const el = document.getElementById("sync-status");
  el.innerText = msg;
  el.classList.add("show");
  clearTimeout(syncTimeout);
  syncTimeout = setTimeout(() => el.classList.remove("show"), 2000);
}

async function initDatabase() {
  if (
    typeof GOOGLE_APP_URL === "undefined" ||
    GOOGLE_APP_URL === "YOUR_NEW_URL_HERE"
  )
    return;
  try {
    const res = await fetch(GOOGLE_APP_URL);
    dbProgress = await res.json();
    renderSchedule();
  } catch (e) {
    console.error("Could not fetch database progress", e);
  }
}

function updateButtonState(btn, status) {
  if (status === "Completed") {
    btn.className = "status-btn done label-caps";
    btn.innerHTML = "<span>✓ Completed</span>";
  } else {
    btn.className = "status-btn label-caps";
    btn.innerHTML = "<span>○ Mark Done</span>";
  }
}

async function markTaskComplete(taskId, btnId) {
  const btn = document.getElementById(btnId);
  const isCurrentlyDone = dbProgress[taskId] === "Completed";
  const newStatus = isCurrentlyDone ? "Pending" : "Completed";

  dbProgress[taskId] = newStatus;
  updateButtonState(btn, newStatus);

  const payload = JSON.stringify({
    updates: [{ id: taskId, status: newStatus }],
  });

  try {
    await fetch(GOOGLE_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "payload=" + encodeURIComponent(payload),
    });
  } catch (e) {
    console.error("Save failed", e);
    showSyncStatus("Network Error.");
  }
}

async function bulkUpdateVisible(newStatus) {
  const buttons = document.querySelectorAll(".status-btn");
  if (buttons.length === 0) return;

  showSyncStatus("Saving bulk updates...");
  let updates = [];

  buttons.forEach((btn) => {
    const taskId = btn.getAttribute("data-taskid");
    if (dbProgress[taskId] !== newStatus) {
      updates.push({ id: taskId, status: newStatus });
      dbProgress[taskId] = newStatus;
      updateButtonState(btn, newStatus);
    }
  });

  if (updates.length === 0) return showSyncStatus("All up to date!");
  const payload = JSON.stringify({ updates: updates });

  try {
    await fetch(GOOGLE_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "payload=" + encodeURIComponent(payload),
    });
    showSyncStatus("✓ All Saved!");
  } catch (e) {
    showSyncStatus("Error saving bulk data.");
  }
}

// ==========================================
// 1. DATA ARRAYS (4+1 Spaced Repetition)
// ==========================================
const p1_days = [
  {
    day: 1,
    date: "May 21",
    week: "w1",
    libraryNull: true,
    office: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "Active Recall (1h): Set up environment & review formula sheet.",
          "Deep Work (4h): ANOVA table construction & hypothesis testing.",
          "Deep Work: Chi-Square test (contingency tables) & Time Series moving averages.",
        ],
      },
    ],
  },
  {
    day: 2,
    date: "May 22",
    week: "w1",
    libraryNull: true,
    office: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "Active Recall (1h): Solve 1 ANOVA and 1 Chi-Square problem from memory.",
          "Deep Work (4h): Correlation coefficient & Linear Regression line fitting.",
          "Deep Work: Basic Stats (Mean, Median, Variance, Standard Deviation, missing freqs).",
        ],
      },
    ],
  },
  {
    day: 3,
    date: "May 23",
    week: "w1",
    libraryNull: true,
    office: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "Active Recall (1h): Write linear regression & basic stats formulas from memory.",
          "Deep Work (4h): Sampling Allocations (Proportional & Neyman).",
          "Deep Work: Control Charts (UCL, LCL, CL) & Probability Distributions (Binomial/Poisson).",
        ],
      },
    ],
  },
  {
    day: 4,
    date: "May 24",
    week: "w1",
    libraryNull: true,
    office: [
      {
        subj: "Networks",
        badge: "bg-hard",
        topics: [
          "Active Recall (1h): Solve 1 Stats probability word problem.",
          "Deep Work (4h): Error Detection (CRC polynomial calc & Parity bit).",
          "Deep Work: Cryptography Algorithms (RSA public/private keys & MD5 digest).",
        ],
      },
    ],
  },
  {
    day: 5,
    date: "May 25",
    week: "w1",
    libraryNull: true,
    office: [
      {
        subj: "Networks",
        badge: "bg-hard",
        topics: [
          "Active Recall (1h): 1 CRC calculation + quickly review Stats regression formula.",
          "Deep Work (4h): Routing Algorithms (Distance Vector, Link State).",
          "Deep Work: Data Link Layer Protocols (Go-Back-N, Selective Repeat, ALOHA throughput).",
        ],
      },
    ],
  },
  {
    day: 6,
    date: "May 26",
    week: "w1",
    libraryNull: true,
    office: [
      {
        subj: "Networks",
        badge: "bg-hard",
        topics: [
          "Active Recall (1h): Write Routing steps + ALOHA formulas.",
          "Deep Work (4h): Transport Layer (TCP 3-Way Handshake, Leaky/Token Bucket Congestion).",
          "Deep Work: IP Addressing (Classful/less), Modulation (ASK/PSK/FSK), IPv4 vs IPv6.",
        ],
      },
    ],
  },
  {
    day: 7,
    date: "May 27",
    week: "w1",
    libraryNull: true,
    office: [
      {
        subj: "Algos",
        badge: "bg-hardest",
        topics: [
          "Active Recall (1h): Draw TCP 3-Way Handshake + 1 Stats ANOVA formula.",
          "Deep Work (4h): Graph Traversals (DFS & BFS algorithms).",
          "Deep Work: Minimum Spanning Trees (Kruskal/Prim) & Fractional Knapsack greedy tech.",
        ],
      },
    ],
  },
  {
    day: 8,
    date: "May 28",
    week: "w2",
    libraryNull: true,
    office: [
      {
        subj: "Algos",
        badge: "bg-hardest",
        topics: [
          "Active Recall (1h): Traverse a graph (DFS/BFS) + recall RSA key formula.",
          "Deep Work (4h): Asymptotic Notations (Big-Oh, Omega, Theta proofs).",
          "Deep Work: Recurrence Relations (Master Method & Recursion Tree Method).",
        ],
      },
    ],
  },
  {
    day: 9,
    date: "May 29",
    week: "w2",
    libraryNull: true,
    office: [
      {
        subj: "Algos",
        badge: "bg-hardest",
        topics: [
          "Active Recall (1h): Solve 1 Recurrence Relation + arrange growth rates.",
          "Deep Work (4h): Sorting Algorithms (Quick Sort & Merge Sort complexities).",
          "Deep Work: Dijkstra's Shortest Path & proving Mathematical Induction.",
        ],
      },
    ],
  },
  {
    day: 10,
    date: "May 30",
    week: "w2",
    libraryNull: true,
    office: [
      {
        subj: "Mega Revision",
        badge: "bg-neutral",
        topics: [
          "Active Recall (1h): Write down formula sheet for Stats & Networks.",
          "Deep Work (4h): Full PYQ drill on Stats (Regression, ANOVA).",
          "Deep Work: Full PYQ drill on Networks (CRC, ALOHA) & Algos (MST, Knapsack).",
        ],
      },
    ],
  },
  {
    day: 11,
    date: "May 31",
    week: "w2",
    libraryNull: true,
    office: [
      {
        subj: "Numerical",
        badge: "bg-hardest",
        topics: [
          "Active Recall (1h): 1 Dijkstra problem + 1 Network routing concept.",
          "Deep Work (4h): Floating Point Representation (normalize, arithmetic, overflow).",
          "Deep Work: Errors (Absolute, Relative, Truncation) & Gauss Elimination (Partial Pivoting).",
        ],
      },
    ],
  },
  {
    day: 12,
    date: "Jun 1",
    week: "w2",
    libraryNull: true,
    office: [
      {
        subj: "Numerical",
        badge: "bg-hardest",
        topics: [
          "Active Recall (1h): Solve 1 Gauss Elimination (Partial Pivoting) problem.",
          "Deep Work (4h): Newton's Forward & Backward Difference Formulas.",
          "Deep Work: Euler's Method (Initial Value Problems) & Trapezoidal/Simpson's Rule.",
        ],
      },
    ],
  },
  {
    day: 13,
    date: "Jun 2",
    week: "w2",
    libraryNull: true,
    office: [
      {
        subj: "Numerical",
        badge: "bg-hardest",
        topics: [
          "Active Recall (1h): 1 Simpson's Rule calculation + 1 Euler's Method calculation.",
          "Deep Work (4h): Bisection Method & Newton-Raphson Method.",
          "Deep Work: Iterative Methods (Gauss-Jacobi & Gauss-Seidel).",
        ],
      },
    ],
  },
  {
    day: 14,
    date: "Jun 3",
    week: "w2",
    libraryNull: true,
    office: [
      {
        subj: "OS",
        badge: "bg-med",
        topics: [
          "Active Recall (1h): 1 Newton-Raphson iteration from memory.",
          "Deep Work (4h): Linux Commands, filters, pipes, and basic Shell Scripting.",
          "Deep Work: Windows Architecture (User/Kernel mode, Active Directory, Registry).",
        ],
      },
    ],
  },
  {
    day: 15,
    date: "Jun 4",
    week: "w3",
    libraryNull: true,
    office: [
      {
        subj: "OS",
        badge: "bg-med",
        topics: [
          "Active Recall (1h): Write a basic Linux word count shell script.",
          "Deep Work (4h): Networking Devices (Hub, Switch, Router) & Topologies (Star, Bus, Mesh).",
          "Deep Work: DNS, SNMP, Virtual Memory architecture, and Windows Kerberos Security.",
        ],
      },
    ],
  },
  {
    day: 16,
    date: "Jun 5",
    week: "w3",
    libraryNull: true,
    office: [
      {
        subj: "Net Prog",
        badge: "bg-hard",
        topics: [
          "Active Recall (1h): DNS zones + SNMP architecture.",
          "Deep Work (4h): TCP/UDP Client-Server Algorithms (Socket Programming).",
          "Deep Work: Core socket system calls (bind, listen, accept, connect, send, recvfrom).",
        ],
      },
    ],
  },
  {
    day: 17,
    date: "Jun 6",
    week: "w3",
    libraryNull: true,
    office: [
      {
        subj: "Net Prog",
        badge: "bg-hard",
        topics: [
          "Active Recall (1h): Write TCP server socket setup fragment from memory.",
          "Deep Work (4h): TCP Protocols (3-Way Handshaking, Flow Control, Sliding Window).",
          "Deep Work: Byte Ordering (htons, ntohs) & TCP Header formats.",
        ],
      },
    ],
  },
  {
    day: 18,
    date: "Jun 7",
    week: "w3",
    libraryNull: true,
    office: [
      {
        subj: "Java",
        badge: "bg-med",
        topics: [
          "Active Recall (1h): TCP 3-Way Handshake + 1 Sliding Window concept.",
          "Deep Work (4h): Method Overloading vs Overriding & Inheritance via Interfaces.",
          "Deep Work: Multithreading (Thread Life Cycle, Synchronization, wait/notify).",
        ],
      },
    ],
  },
  {
    day: 19,
    date: "Jun 8",
    week: "w3",
    libraryNull: true,
    office: [
      {
        subj: "Java",
        badge: "bg-med",
        topics: [
          "Active Recall (1h): Write a Thread sync block + Overriding code example.",
          "Deep Work (4h): Exception Handling (throw/throws, custom exceptions, try/catch).",
          "Deep Work: File I/O & Streams (copying text files, StreamTokenizer).",
        ],
      },
    ],
  },
  {
    day: 20,
    date: "Jun 9",
    week: "w3",
    libraryNull: true,
    office: [
      {
        subj: "Mega Revision",
        badge: "bg-neutral",
        topics: [
          "Active Recall (1h): Rapid fire PYQ formulas for Numerical & Net Prog.",
          "Deep Work (4h): Full PYQ drill on Numerical (Gauss, Bisection).",
          "Deep Work: Code drill for Java (Threads, I/O) & Net Prog (Sockets).",
        ],
      },
    ],
  },
  {
    day: 21,
    date: "Jun 10",
    week: "w3",
    libraryNull: true,
    office: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "PRE-GAME REVISION: Drop everything else. Tomorrow is the Stats exam.",
          "Run through the entire Stats PYQ formula sheet.",
          "Do 1 full mock test of ANOVA, Chi-Square, Regression, and Prob distributions.",
        ],
      },
    ],
  },
];
const p1_exams = {
  "Jun 11": "Stats exam (10am–1pm)",
  "Jun 12": "Networks exam (10am–1pm)",
  "Jun 13": "Algorithms exam (10am–1pm)",
};

const p2_days = [
  {
    day: 1,
    date: "Jun 14",
    week: "gaps",
    libraryNull: true,
    office: [
      {
        subj: "OS",
        badge: "bg-med",
        topics: [
          "GAP DAY: Tomorrow is the OS Exam (Evening).",
          "Revise Linux Commands, Windows Active Directory, Virtual Memory.",
          "Revise Networking Devices, DNS, SNMP, and Topologies.",
        ],
      },
    ],
  },
  {
    day: 2,
    date: "Jun 16",
    week: "gaps",
    libraryNull: true,
    office: [
      {
        subj: "Net Prog",
        badge: "bg-hard",
        topics: [
          "Active Recall (1h): Write out TCP socket connection steps.",
          "Deep Work (4h): IP Addressing & Subnetting (Classful/Classless, masks).",
          "Deep Work: Core App Protocols (DNS, DHCP, FTP mechanisms).",
        ],
      },
    ],
  },
  {
    day: 3,
    date: "Jun 17",
    week: "gaps",
    libraryNull: true,
    office: [
      {
        subj: "Net Prog",
        badge: "bg-hard",
        topics: [
          "Active Recall (1h): DHCP DORA cycle & Subnet calculations.",
          "Deep Work (4h): Network Layer Protocols (ARP, RARP, ICMP).",
          "Deep Work: Distance Vector Routing & TCP Header fields.",
        ],
      },
    ],
  },
  {
    day: 4,
    date: "Jun 18",
    week: "gaps",
    libraryNull: true,
    office: [
      {
        subj: "DBMS",
        badge: "bg-med",
        topics: [
          "Active Recall (1h): 1 Net Prog socket question.",
          "Deep Work (4h): Entity-Relationship (ER) Modeling & conversion to schemas.",
          "Deep Work: Normalization & Functional Dependencies (Closure, 1NF to BCNF).",
        ],
      },
    ],
  },
  {
    day: 5,
    date: "Jun 19",
    week: "gaps",
    libraryNull: true,
    office: [
      {
        subj: "DBMS",
        badge: "bg-med",
        topics: [
          "Active Recall (1h): Draw an ER diagram & find a candidate key.",
          "Deep Work (4h): Transaction & Concurrency (Precedence Graphs, ACID, 2PL).",
          "Deep Work: SQL Queries (GROUP BY, JOINs) & Relational Algebra operations.",
        ],
      },
    ],
  },
  {
    day: 6,
    date: "Jun 20",
    week: "gaps",
    libraryNull: true,
    office: [
      {
        subj: "Web Prog",
        badge: "bg-easy",
        topics: [
          "Active Recall (1h): Write 1 SQL Join query + 1 Relational Algebra operation.",
          "Deep Work (4h): JSP Architecture (MVC), Session Management & Cookies.",
          "Deep Work: Web 2.0 features, HTTP Methods (GET vs POST), JavaScript DOM.",
        ],
      },
    ],
  },
  {
    day: 7,
    date: "Jun 21",
    week: "gaps",
    libraryNull: true,
    office: [
      {
        subj: "Web Prog",
        badge: "bg-easy",
        topics: [
          "Active Recall (1h): MVC Block diagram + GET/POST differences.",
          "Deep Work (4h): Database Connectivity (JDBC code fragments, ResultSet).",
          "Deep Work: HTML Forms & Layouts, Cascading Style Sheets (Inline/Internal/External).",
        ],
      },
    ],
  },
  {
    day: 8,
    date: "Jun 22",
    week: "gaps",
    libraryNull: true,
    office: [
      {
        subj: "Java",
        badge: "bg-med",
        topics: [
          "Active Recall (1h): Write JDBC connection fragment.",
          "Deep Work (4h): Applet Programming (Life cycle, drawing shapes).",
          "Deep Work: GUI & Event Handling (Layout Managers, AWT vs Swing).",
        ],
      },
    ],
  },
  {
    day: 9,
    date: "Jun 23",
    week: "gaps",
    libraryNull: true,
    office: [
      {
        subj: "Java",
        badge: "bg-med",
        topics: [
          "Active Recall (1h): Applet Lifecycle + Layout Managers.",
          "Deep Work (4h): Servlets (Life cycle, session tracking cookies).",
          "Deep Work: String Manipulation (String vs StringBuffer) & Advanced (RMI, JVM architecture).",
        ],
      },
    ],
  },
];
const p2_exams = {
  "Jun 15": "OS exam (2–5pm)",
  "Jun 24": "Net Prog (Morning) & DBMS (Evening)",
  "Jun 25": "Web Prog (Morning) & Java (Evening)",
};

const p3_days = [
  {
    day: 1,
    date: "Jun 26",
    week: "all",
    libraryNull: true,
    office: [
      {
        subj: "Numerical",
        badge: "bg-hardest",
        topics: [
          "GAP DAY: Tomorrow is the Numerical Techniques Exam.",
          "Revise: Floating Point, Gauss Elimination, Interpolation.",
          "Revise: Euler's Method, Trapezoidal/Simpson's Rule, Iterative methods.",
        ],
      },
    ],
  },
  {
    day: 2,
    date: "Jun 28",
    week: "all",
    libraryNull: true,
    office: [
      {
        subj: "E-Com",
        tag: "must",
        badge: "bg-easy",
        topics: [
          "Deep Work (5h): E-Commerce & M-Commerce Fundamentals (trade cycle, architecture).",
          "Deep Work: E-Commerce Business Models (B2B, B2C, C2B, C2C).",
          "Deep Work: Security in E-Commerce (SSL working with diagram, Digital Signatures).",
        ],
      },
    ],
  },
  {
    day: 3,
    date: "Jun 29",
    week: "all",
    libraryNull: true,
    office: [
      {
        subj: "E-Com",
        tag: "high",
        badge: "bg-easy",
        topics: [
          "Deep Work (5h): Cyber Crimes & IT Act 2000 (Penalties & offences).",
          "Deep Work: Electronic Data Interchange (EDI architecture & standards).",
          "Deep Work: Online Portals & Architecture, Online Trading & Auctions.",
        ],
      },
    ],
  },
];
const p3_exams = {
  "Jun 27": "Numerical Techniques exam (10am–1pm)",
  "Jun 30": "E-Commerce exam (2–5pm)",
};

// ==========================================
// 2. CONFIGURATIONS
// ==========================================
// ==========================================
// 2. CONFIGURATIONS
// ==========================================
const config = {
  p1: {
    header: `<h2 class="headline-lg">Phase 1: 21-Day Heavy Lifting</h2><p class="body-sm">May 21 → Jun 10 · Office 5h Protocol (1h Active Recall + 4h Deep Work)</p>`,
    stats: `<div class="stat-card"><div class="stats-num">21</div><div class="label-caps stat-lbl">Study days</div></div><div class="stat-card"><div class="stats-num">6</div><div class="label-caps stat-lbl">Subjects</div></div><div class="stat-card"><div class="stats-num">5h</div><div class="label-caps stat-lbl">Daily study</div></div><div class="stat-card"><div class="stats-num">Jun 11</div><div class="label-caps stat-lbl">First exam</div></div>`,
    legend: `<div class="leg"><div class="leg-dot bg-hardest"></div>Algos / Num (Hardest)</div><div class="leg"><div class="leg-dot bg-hard"></div>Stats / Networks (Hard)</div><div class="leg"><div class="leg-dot bg-med"></div>OS / Java (Medium)</div>`,
    tabs: `<div class="tab active" onclick="setFilter('all', this)">All 21 days</div><div class="tab" onclick="setFilter('w1', this)">Block 1</div><div class="tab" onclick="setFilter('w2', this)">Block 2</div><div class="tab" onclick="setFilter('w3', this)">Block 3</div>`,
    data: p1_days,
    exams: p1_exams,
  },
  p2: {
    header: `<h2 class="headline-lg">Phase 2: The Double Headers</h2><p class="body-sm">Jun 14 & Jun 16–23 · Prep for double exams on 24th/25th</p>`,
    stats: `<div class="stat-card"><div class="stats-num">9</div><div class="label-caps stat-lbl">Study days</div></div><div class="stat-card"><div class="stats-num">5</div><div class="label-caps stat-lbl">Subjects</div></div><div class="stat-card"><div class="stats-num">5h</div><div class="label-caps stat-lbl">Daily study</div></div><div class="stat-card"><div class="stats-num">Jun 24</div><div class="label-caps stat-lbl">D-Day</div></div>`,
    legend: `<div class="leg"><div class="leg-dot bg-hard"></div>Net Prog (Hard)</div><div class="leg"><div class="leg-dot bg-med"></div>DBMS / OS / Java (Medium)</div><div class="leg"><div class="leg-dot bg-easy"></div>Web Prog (Easy)</div>`,
    tabs: `<div class="tab active" onclick="setFilter('all', this)">All Gaps</div><div class="tab" onclick="setFilter('gaps', this)">Double Header Prep</div>`,
    data: p2_days,
    exams: p2_exams,
  },
  p3: {
    header: `<h2 class="headline-lg">Phase 3: The Finish Line</h2><p class="body-sm">Jun 26 → Jun 29 · Final numerical & E-commerce cram</p>`,
    stats: `<div class="stat-card"><div class="stats-num">3</div><div class="label-caps stat-lbl">Study days</div></div><div class="stat-card"><div class="stats-num">2</div><div class="label-caps stat-lbl">Subjects</div></div><div class="stat-card"><div class="stats-num">Easy</div><div class="label-caps stat-lbl">Difficulty</div></div><div class="stat-card"><div class="stats-num">Jun 30</div><div class="label-caps stat-lbl">Final exam</div></div>`,
    legend: `<div class="leg"><div class="leg-dot tag-must"></div>Must Study</div><div class="leg"><div class="leg-dot tag-high"></div>High Yield</div>`,
    tabs: `<div class="tab active" onclick="setFilter('all', this)">All 3 days</div>`,
    data: p3_days,
    exams: p3_exams,
  },
};

let currentPhase = "p1";
let currentFilter = "all";
const tagLabels = {
  must: "Must study",
  high: "High yield",
  good: "Good to know",
};

// ==========================================
// 3. RENDERING ENGINE
// ==========================================

function getRowsArray(sessData) {
  if (!sessData) return [];
  if (Array.isArray(sessData)) return sessData;
  if (sessData.rows) return sessData.rows;
  return [];
}

function renderSession(sess, label, isRest, dayNum, sessionType) {
  if (isRest) {
    let msg =
      sessionType === "library"
        ? "Dedicated to Web Development Bootcamp. No college study here!"
        : "Rest & recovery mode — let previous session settle";
    return `<div class="session"><div class="label-caps session-label">${label}</div><div class="rest-note">${msg}</div></div>`;
  }

  const rows = getRowsArray(sess);
  let rowsHtml = rows
    .map((r, i) => {
      const cleanSubj = r.subj.replace(/[^a-zA-Z0-9]/g, "");
      const taskId = `${currentPhase}-d${dayNum}-${sessionType}-${cleanSubj}-${i}`;
      const isDone = dbProgress[taskId] === "Completed";

      const btnText = isDone
        ? "<span>✓ Completed</span>"
        : "<span>○ Mark Done</span>";
      const btnClass = isDone
        ? "status-btn done label-caps"
        : "status-btn label-caps";

      let dbButtonHtml = `<button id="btn-${taskId}" data-taskid="${taskId}" class="${btnClass}" onclick="markTaskComplete('${taskId}', 'btn-${taskId}')">${btnText}</button>`;

      let leftColHtml = `<span class="subj-badge label-caps ${r.badge || "bg-easy"}">${r.subj}</span>`;

      if (r.tag && tagLabels[r.tag]) {
        let tagColor =
          r.tag === "must"
            ? "bg-hardest"
            : r.tag === "high"
              ? "bg-hard"
              : "bg-easy";
        leftColHtml = `
        <div style="display: flex; flex-direction: column; gap: 6px; align-items: flex-start;">
          <span class="subj-badge label-caps bg-neutral">${r.subj}</span>
          <span class="subj-badge label-caps ${tagColor}">${tagLabels[r.tag]}</span>
        </div>
      `;
      }

      let rightColHtml = `
      <div class="topic-list">
        ${r.topics.map((t) => `<div class="topic-item">${t}</div>`).join("")}
      </div>`;

      return `
      <div class="subject-row">
        <div class="subject-box">${leftColHtml}</div>
        <div class="topic-box">${rightColHtml}</div>
        <div class="action-box">${r.isExam ? "" : dbButtonHtml}</div>
      </div>`;
    })
    .join("");

  return `<div class="session"><div class="label-caps session-label">${label}</div>${rowsHtml}</div>`;
}

function renderSchedule() {
  const c = config[currentPhase];
  const el = document.getElementById("schedule");

  el.innerHTML = "";
  const filteredData =
    currentFilter === "all"
      ? c.data
      : c.data.filter((d) => d.week === currentFilter);

  let html = "";
  filteredData.forEach((d, index) => {
    const examBadge = c.exams[d.date]
      ? `<span class="exam-badge label-caps">${c.exams[d.date]}</span>`
      : "";

    let officeLabel = d.isExamDay
      ? "Office · 6am–2pm (Exam Day)"
      : "Office · 6am–2pm (5 Hours: 1h AR + 4h DW)";
    let libraryLabel = "Library · 4pm–11pm (Web Dev Bootcamp)";

    let animationDelay = index * 0.05 + 0.1;

    html += `
      <div class="day-card mount-anim" style="animation-delay: ${animationDelay}s">
        <div class="day-header">
          <div style="display:flex;align-items:baseline;">
            <span class="headline-md">Day ${d.day}</span>
            <span class="body-sm" style="margin-left:12px;">${d.date}</span>
          </div>
          ${examBadge}
        </div>
        ${renderSession(d.office, officeLabel, d.officeNull, d.day, "office")}
        ${renderSession(d.library, libraryLabel, d.libraryNull, d.day, "library")}
      </div>
    `;
  });

  setTimeout(() => (el.innerHTML = html), 10);
}

function renderAppShell() {
  const c = config[currentPhase];

  const updateSection = (id, htmlStr) => {
    const el = document.getElementById(id);
    el.innerHTML = htmlStr;
    el.classList.remove("mount-anim");
    void el.offsetWidth;
    el.classList.add("mount-anim");
  };

  updateSection("app-header", c.header);
  updateSection("app-stats", c.stats);
  updateSection("app-legend", c.legend);
  updateSection("app-tabs", c.tabs);
}

// Replace the switchPhase function in app.js with this:
function switchPhase(phase) {
  currentPhase = phase;
  currentFilter = "all";

  // Update Desktop Buttons
  document
    .querySelectorAll(".toggle-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document.getElementById(`btn-${phase}`).classList.add("active");

  // Sync Mobile Select Menu
  const mobileSelect = document.getElementById("mobile-phase-select");
  if (mobileSelect) {
    mobileSelect.value = phase;
  }

  renderAppShell();
  renderSchedule();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setFilter(filterStr, el) {
  currentFilter = filterStr;
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  el.classList.add("active");
  renderSchedule();

  const stickyNavHeight = document.getElementById("sticky-nav").offsetHeight;
  const scheduleTop =
    document.getElementById("schedule").getBoundingClientRect().top +
    window.pageYOffset;
  window.scrollTo({
    top: scheduleTop - stickyNavHeight - 20,
    behavior: "smooth",
  });
}

renderAppShell();
renderSchedule();
initDatabase();
