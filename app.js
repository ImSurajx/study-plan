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
// 1. DATA ARRAYS
// ==========================================
const p1_days = [
  {
    day: 1,
    date: "May 15",
    week: "w1",
    office: null,
    library: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "Floating Point Representation — normalize numbers, mantissa & exponent format",
          "Addition, subtraction & multiplication of floating point numbers, Overflow & Underflow definitions",
        ],
      },
      {
        subj: "DBMS",
        badge: "bg-med",
        topics: [
          "ER Modeling — drawing ER diagrams for library/bank/university scenarios",
          "Cardinality, weak & strong entities, converting ER diagrams to relational tables",
        ],
      },
    ],
  },
  {
    day: 2,
    date: "May 16",
    week: "w1",
    office: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "Practice: 3 PYQ floating point arithmetic problems",
          "Practice: 2 PYQ overflow/underflow & error calculation problems",
        ],
      },
      {
        subj: "DBMS",
        badge: "bg-med",
        topics: [
          "Practice: 2 PYQ ER diagram drawing problems",
          "Recall: ER to relational schema conversion steps",
        ],
      },
    ],
    library: [
      {
        subj: "Networks",
        badge: "bg-hardest",
        topics: [
          "CRC calculation — data polynomial & generator method step by step",
          "Parity bit method for error detection",
        ],
      },
      {
        subj: "OS",
        badge: "bg-med",
        topics: [
          "Linux commands — grep, chmod, sort, cmp, diff, tail, cat, cp, mv",
          "Pipes, filters & redirection with examples",
        ],
      },
    ],
  },
  {
    day: 3,
    date: "May 17",
    week: "w1",
    office: [
      {
        subj: "Networks",
        badge: "bg-hardest",
        topics: [
          "Practice: 3 PYQ CRC calculation problems (timed)",
          "Practice: 2 PYQ parity bit error detection problems",
        ],
      },
      {
        subj: "OS",
        badge: "bg-med",
        topics: [
          "Practice: write 2 shell scripts from PYQ (word count, arithmetic)",
          "Recall: Linux command usage & pipe/filter concepts",
        ],
      },
    ],
    library: [
      {
        subj: "Algo",
        badge: "bg-hard",
        topics: [
          "DFS & BFS — writing algorithms & graph traversal step by step",
          "Asymptotic notation — Big-O, Omega, Theta definitions & proofs (e.g. show 3x+5=θ(x))",
        ],
      },
      {
        subj: "Java",
        badge: "bg-med",
        topics: [
          "Method overloading vs overriding — differences with code examples",
          "Polymorphism, data encapsulation & data abstraction",
        ],
      },
    ],
  },
  {
    day: 4,
    date: "May 18",
    week: "w1",
    office: [
      {
        subj: "Algo",
        badge: "bg-hard",
        topics: [
          "Practice: 2 PYQ DFS/BFS graph traversal problems",
          "Practice: 2 PYQ Big-O proof problems",
        ],
      },
      {
        subj: "Java",
        badge: "bg-med",
        topics: [
          "Practice: 2 PYQ overloading/overriding code problems",
          "Recall: keywords super, this, final vs finally vs finalize",
        ],
      },
    ],
    library: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "Absolute, Relative & Truncation error calculations",
          "System of Linear Equations — Gauss Elimination with Partial Pivoting (3x3 systems)",
        ],
      },
      {
        subj: "DBMS",
        badge: "bg-med",
        topics: [
          "Normalization — finding candidate keys, closure of relation",
          "1NF, 2NF, 3NF, BCNF — checking FDs, normalization steps & anomalies",
        ],
      },
    ],
  },
  {
    day: 5,
    date: "May 19",
    week: "w1",
    office: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "Practice: 3 PYQ error calculation problems",
          "Practice: 2 PYQ Gauss Elimination with partial pivoting problems",
        ],
      },
      {
        subj: "DBMS",
        badge: "bg-med",
        topics: [
          "Practice: 2 PYQ normalization problems up to BCNF",
          "Recall: BCNF vs 3NF reasoning & anomaly types",
        ],
      },
    ],
    library: [
      {
        subj: "Networks",
        badge: "bg-hardest",
        topics: [
          "RSA Algorithm — public & private key calculation, encrypt & decrypt messages",
          "MD5 Algorithm — step-by-step 128-bit message digest procedure",
        ],
      },
      {
        subj: "OS",
        badge: "bg-med",
        topics: [
          "Windows architecture — User Mode vs Kernel Mode differences",
          "Active Directory — logical & physical structure, Trust Relationships, Domain Controllers PDC/BDC",
        ],
      },
    ],
  },
  {
    day: 6,
    date: "May 20",
    week: "w1",
    office: [
      {
        subj: "Networks",
        badge: "bg-hardest",
        topics: [
          "Practice: 2 PYQ RSA key calculation & encryption problems",
          "Practice: 2 PYQ MD5 step-by-step procedure problems",
        ],
      },
      {
        subj: "OS",
        badge: "bg-med",
        topics: [
          "Practice: recall Active Directory structure notes",
          "Practice: Trust Relationships, Workgroups & Domain Controller roles",
        ],
      },
    ],
    library: [
      {
        subj: "Algo",
        badge: "bg-hard",
        topics: [
          "Kruskal's & Prim's algorithms — Minimum Cost Spanning Tree with worked examples",
          "Fractional Knapsack problem — greedy technique, profits, weights & capacity",
        ],
      },
      {
        subj: "Java",
        badge: "bg-med",
        topics: [
          "Thread life cycle — extending Thread vs implementing Runnable",
          "Thread synchronization & inter-thread communication using wait/notify, thread priorities",
        ],
      },
    ],
  },
  {
    day: 7,
    date: "May 21",
    week: "w1",
    office: [
      {
        subj: "Algo",
        badge: "bg-hard",
        topics: [
          "Practice: 2 PYQ MST problems using Kruskal & Prim",
          "Practice: 2 PYQ Fractional Knapsack numerical problems",
        ],
      },
      {
        subj: "Java",
        badge: "bg-med",
        topics: [
          "Practice: 2 PYQ thread lifecycle & synchronization problems",
          "Recall: thread priority management",
        ],
      },
    ],
    library: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "ANOVA — one-way ANOVA table construction & hypothesis testing",
          "Chi-Square test — contingency table independence testing (e.g. hair vs eye color)",
        ],
      },
      {
        subj: "DBMS",
        badge: "bg-med",
        topics: [
          "Transaction & Concurrency — ACID properties & transaction states",
          "Precedence graphs — drawing & checking conflict serializability",
        ],
      },
    ],
  },
  {
    day: 8,
    date: "May 22",
    week: "w2",
    office: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "Practice: 2 PYQ ANOVA table construction problems",
          "Practice: 2 PYQ Chi-Square contingency table problems",
        ],
      },
      {
        subj: "DBMS",
        badge: "bg-med",
        topics: [
          "Practice: 2 PYQ precedence graph conflict serializability problems",
          "Recall: ACID property definitions & transaction state diagram",
        ],
      },
    ],
    library: [
      {
        subj: "Networks",
        badge: "bg-hardest",
        topics: [
          "Distance Vector Routing — working mechanism & Count-to-Infinity problem",
          "Link State Routing — working mechanism & comparison with Distance Vector",
        ],
      },
      {
        subj: "OS",
        badge: "bg-med",
        topics: [
          "Networking devices & OSI layers — Hubs, Switches, Routers, Bridges, Gateways, Repeaters",
          "Network topologies — Star, Bus, Mesh, Ring comparison & LAN, MAN, WAN differences",
        ],
      },
    ],
  },
  {
    day: 9,
    date: "May 23",
    week: "w2",
    office: [
      {
        subj: "Networks",
        badge: "bg-hardest",
        topics: [
          "Practice: 2 PYQ Distance Vector routing problems",
          "Practice: 2 PYQ Link State routing problems",
        ],
      },
      {
        subj: "OS",
        badge: "bg-med",
        topics: [
          "Practice: recall networking devices & OSI layer notes",
          "Practice: topology comparison — cable requirement & central point of failure",
        ],
      },
    ],
    library: [
      {
        subj: "Algo",
        badge: "bg-hard",
        topics: [
          "Recurrence relations — Master Method & Recursion Tree Method",
          "Quick Sort & Merge Sort — algorithm writing, intermediate steps, worst/best complexity",
        ],
      },
      {
        subj: "Java",
        badge: "bg-med",
        topics: [
          "Exception handling — checked vs unchecked exceptions, throw vs throws",
          "Creating & throwing custom user-defined exceptions, try-catch-finally blocks",
        ],
      },
    ],
  },
  {
    day: 10,
    date: "May 24",
    week: "w2",
    office: [
      {
        subj: "Algo",
        badge: "bg-hard",
        topics: [
          "Practice: 2 PYQ recurrence relation problems using Master Method",
          "Practice: 2 PYQ Quick Sort/Merge Sort intermediate step tracing",
        ],
      },
      {
        subj: "Java",
        badge: "bg-med",
        topics: [
          "Practice: 2 PYQ exception handling code problems",
          "Recall: custom exception creation pattern & finally block behavior",
        ],
      },
    ],
    library: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "Correlation & Linear Regression — coefficient calculation, regression line y=a+bx fitting",
          "Time Series — 3/4 yearly centered moving averages & components of time series",
        ],
      },
      {
        subj: "DBMS",
        badge: "bg-med",
        topics: [
          "2-Phase Locking — Basic vs Strict 2PL, advantages & disadvantages",
          "Deadlock prevention — Wait-Die & Wound-Wait protocols",
        ],
      },
    ],
  },
  {
    day: 11,
    date: "May 25",
    week: "w2",
    office: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "Practice: 2 PYQ regression line fitting problems",
          "Practice: 2 PYQ moving average calculation problems",
        ],
      },
      {
        subj: "DBMS",
        badge: "bg-med",
        topics: [
          "Practice: 2 PYQ 2PL locking protocol problems",
          "Recall: Wait-Die vs Wound-Wait deadlock prevention",
        ],
      },
    ],
    library: [
      {
        subj: "Networks",
        badge: "bg-hardest",
        topics: [
          "Sliding Window Protocols — Go-Back-N & Selective Repeat ARQ working",
          "ALOHA — Pure vs Slotted ALOHA, proving throughput formulas 0.184 & 0.368",
        ],
      },
      {
        subj: "OS",
        badge: "bg-med",
        topics: [
          "Distributed OS, Network OS, Multiprocessor OS & Real-Time OS comparison",
          "Multiprogramming vs Multithreading vs Multitasking definitions",
        ],
      },
    ],
  },
  {
    day: 12,
    date: "May 26",
    week: "w2",
    office: [
      {
        subj: "Networks",
        badge: "bg-hardest",
        topics: [
          "Practice: 2 PYQ Sliding Window Go-Back-N & Selective Repeat problems",
          "Practice: 2 PYQ ALOHA throughput calculation problems",
        ],
      },
      {
        subj: "OS",
        badge: "bg-med",
        topics: [
          "Practice: recall OS type comparison notes",
          "Practice: Multiprogramming vs Multithreading differences",
        ],
      },
    ],
    library: [
      {
        subj: "Algo",
        badge: "bg-hard",
        topics: [
          "Dijkstra's Algorithm — single source shortest path with worked example",
          "Bellman-Ford algorithm — working & comparison with Dijkstra's",
        ],
      },
      {
        subj: "Java",
        badge: "bg-med",
        topics: [
          "File I/O & Streams — reading & copying text & binary files",
          "Counting words, lines & characters using StreamTokenizer",
        ],
      },
    ],
  },
  {
    day: 13,
    date: "May 27",
    week: "w2",
    office: [
      {
        subj: "Algo",
        badge: "bg-hard",
        topics: [
          "Practice: 2 PYQ Dijkstra shortest path problems",
          "Practice: 2 PYQ Bellman-Ford algorithm problems",
        ],
      },
      {
        subj: "Java",
        badge: "bg-med",
        topics: [
          "Practice: 2 PYQ File I/O code writing problems",
          "Recall: StreamTokenizer usage & file copy pattern",
        ],
      },
    ],
    library: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "Newton's Forward & Backward Difference Formula — formula, difference table construction",
          "Estimating missing terms in data table using differences",
        ],
      },
      {
        subj: "DBMS",
        badge: "bg-med",
        topics: [
          "SQL queries — GROUP BY, HAVING, JOINs & subqueries with PYQ schemas",
          "Relational Algebra — Union, Intersection, Set Difference, Cartesian Product & Division",
        ],
      },
    ],
  },
  {
    day: 14,
    date: "May 28",
    week: "w2",
    office: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "Practice: 3 PYQ Newton Forward/Backward Difference problems",
          "Practice: construct difference tables & estimate missing terms from PYQ",
        ],
      },
      {
        subj: "DBMS",
        badge: "bg-med",
        topics: [
          "Practice: 2 PYQ SQL query writing problems with JOINs",
          "Practice: 2 PYQ Relational Algebra operation problems",
        ],
      },
    ],
    library: [
      {
        subj: "Networks",
        badge: "bg-hardest",
        topics: [
          "TCP 3-Way Handshaking — connection establishment & termination with diagrams",
          "Congestion Control — Leaky bucket, Token bucket, Slow start & Multiplicative decrease",
        ],
      },
      {
        subj: "OS",
        badge: "bg-med",
        topics: [
          "DNS — architecture, design goals & zones",
          "SNMP — architecture & UDP usage, FTP vs TFTP vs TELNET comparison",
        ],
      },
    ],
  },
  {
    day: 15,
    date: "May 29",
    week: "w3",
    office: [
      {
        subj: "Networks",
        badge: "bg-hardest",
        topics: [
          "Practice: 2 PYQ TCP handshaking diagram problems",
          "Practice: 2 PYQ congestion control — leaky bucket & token bucket problems",
        ],
      },
      {
        subj: "OS",
        badge: "bg-med",
        topics: [
          "Practice: recall DNS architecture & zone notes",
          "Practice: SNMP architecture & protocol comparison",
        ],
      },
    ],
    library: [
      {
        subj: "Algo",
        badge: "bg-hard",
        topics: [
          "Mathematical Induction — proving 1²+2²+...+n²=n(n+1)(2n+1)/6 step by step",
          "Insertion Sort & Bubble Sort — tracing intermediate steps & counting comparisons",
        ],
      },
      {
        subj: "Java",
        badge: "bg-med",
        topics: [
          "Applet life cycle — init, start, paint, stop, destroy",
          "Applet vs Java Application differences & writing applet code to draw shapes",
        ],
      },
    ],
  },
  {
    day: 16,
    date: "May 30",
    week: "w3",
    office: [
      {
        subj: "Algo",
        badge: "bg-hard",
        topics: [
          "Practice: 2 PYQ mathematical induction proof problems",
          "Practice: 2 PYQ Insertion/Bubble Sort tracing & comparison counting",
        ],
      },
      {
        subj: "Java",
        badge: "bg-med",
        topics: [
          "Practice: 2 PYQ applet code writing problems",
          "Recall: applet lifecycle method sequence",
        ],
      },
    ],
    library: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "Trapezoidal Rule & Simpson's 1/3 Rule — computing integrals, formulas & PYQ problems",
          "Sampling allocations — Proportional & Neyman's Optimum Allocation with problems",
        ],
      },
      {
        subj: "DBMS",
        badge: "bg-med",
        topics: [
          "Database Recovery — Log-based recovery, Deferred vs Immediate update, WAL protocol",
          "Checkpoints significance & Shadow Paging technique",
        ],
      },
    ],
  },
  {
    day: 17,
    date: "May 31",
    week: "w3",
    office: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "Practice: 3 PYQ Trapezoidal Rule & Simpson's 1/3 Rule integration problems",
          "Practice: 2 PYQ sampling allocation problems",
        ],
      },
      {
        subj: "DBMS",
        badge: "bg-med",
        topics: [
          "Practice: recall log-based recovery concepts",
          "Practice: 2 PYQ database recovery problems",
        ],
      },
    ],
    library: [
      {
        subj: "Networks",
        badge: "bg-hardest",
        topics: [
          "IP Addressing — Classful vs Classless, subnet masks, network IDs & broadcast addresses",
          "IPv4 vs IPv6 — differences, need for IPv6, tunneling & packet fragmentation",
        ],
      },
      {
        subj: "OS",
        badge: "bg-med",
        topics: [
          "Windows Security — Kerberos authentication, hardware & software tokens",
          "EFS & IPSec — features, components & policies, NTFS vs FAT16 vs FAT32",
        ],
      },
    ],
  },
  {
    day: 18,
    date: "Jun 1",
    week: "w3",
    office: [
      {
        subj: "Networks",
        badge: "bg-hardest",
        topics: [
          "Practice: 3 PYQ IP addressing & subnetting calculation problems",
          "Practice: 2 PYQ IPv4 vs IPv6 comparison problems",
        ],
      },
      {
        subj: "OS",
        badge: "bg-med",
        topics: [
          "Practice: recall Windows security & Kerberos notes",
          "Practice: NTFS vs FAT file system comparison",
        ],
      },
    ],
    library: [
      {
        subj: "Algo",
        badge: "bg-hard",
        topics: [
          "Linear Search vs Binary Search — algorithms, complexity & number of comparisons",
          "Adjacency List & Adjacency Matrix — directed/undirected graphs, paths, cycles & complete graphs",
        ],
      },
      {
        subj: "Java",
        badge: "bg-med",
        topics: [
          "GUI & Event Handling — Layout Managers: BorderLayout, FlowLayout, GridLayout",
          "Semantic vs low-level events, AWT vs Swing component differences",
        ],
      },
    ],
  },
  {
    day: 19,
    date: "Jun 2",
    week: "w3",
    office: [
      {
        subj: "Algo",
        badge: "bg-hard",
        topics: [
          "Practice: 2 PYQ Binary Search tracing & comparison counting problems",
          "Practice: 2 PYQ adjacency list/matrix construction problems",
        ],
      },
      {
        subj: "Java",
        badge: "bg-med",
        topics: [
          "Practice: 2 PYQ Layout Manager & event handling problems",
          "Recall: AWT vs Swing differences",
        ],
      },
    ],
    library: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "Control Charts — computing UCL, LCL, CL, drawing X-bar & R-charts",
          "Probability distributions — Binomial vs Poisson word problems & Normal distribution Z-scores",
        ],
      },
      {
        subj: "DBMS",
        badge: "bg-med",
        topics: [
          "Indexing — Primary, Secondary & Clustering indexes, Dense vs Sparse indexes",
          "B-Trees & B+ Trees — why better than Binary Search Trees for indexing",
        ],
      },
    ],
  },
  {
    day: 20,
    date: "Jun 3",
    week: "w3",
    office: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "Practice: 2 PYQ control chart UCL/LCL computation problems",
          "Practice: 2 PYQ probability distribution word problems",
        ],
      },
      {
        subj: "DBMS",
        badge: "bg-med",
        topics: [
          "Practice: recall indexing type differences",
          "Practice: 2 PYQ B-Tree indexing problems",
        ],
      },
    ],
    library: [
      {
        subj: "Networks",
        badge: "bg-hardest",
        topics: [
          "Frame Relay — architecture & advantages over X.25",
          "ATM Networks — routing, switching & ATM adaptation layer",
        ],
      },
      {
        subj: "OS",
        badge: "bg-med",
        topics: [
          "Virtual Memory — abstract model of virtual-to-physical address mapping",
          "Linux process & thread management, absolute vs relative pathnames & core directories",
        ],
      },
    ],
  },
  {
    day: 21,
    date: "Jun 4",
    week: "w3",
    office: [
      {
        subj: "Networks",
        badge: "bg-hardest",
        topics: [
          "Practice: recall Frame Relay & ATM Networks notes",
          "Practice: 2 PYQ ARP/RARP working mechanism problems",
        ],
      },
      {
        subj: "OS",
        badge: "bg-med",
        topics: [
          "Practice: recall Virtual Memory mapping concepts",
          "Practice: VPN, RAID levels, Firewall & packet filtering notes",
        ],
      },
    ],
    library: [
      {
        subj: "Algo",
        badge: "bg-hard",
        topics: [
          "FULL REVISION — Must Study: DFS/BFS, MST Kruskal/Prim, Knapsack, Asymptotic notation",
          "PYQ drill: 5 mixed must-study problems timed",
        ],
      },
      {
        subj: "Java",
        badge: "bg-med",
        topics: [
          "Servlet lifecycle — GET vs POST, session tracking via cookies & hidden form fields",
          "String vs StringBuffer differences, RMI architecture & JDBC connection with SQL queries",
        ],
      },
    ],
  },
  {
    day: 22,
    date: "Jun 5",
    week: "w4",
    office: [
      {
        subj: "Algo",
        badge: "bg-hard",
        topics: [
          "Practice: 2 PYQ Dijkstra & Bellman-Ford timed problems",
          "Practice: 2 PYQ Quick Sort/Merge Sort trace problems",
        ],
      },
      {
        subj: "Java",
        badge: "bg-med",
        topics: [
          "Practice: 2 PYQ Servlet lifecycle & session tracking problems",
          "Practice: 2 PYQ JDBC connection & SQL query problems",
        ],
      },
    ],
    library: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "FULL REVISION — Must Study: Floating point, Gauss Elimination, Newton Interpolation, Euler's Method",
          "PYQ drill: 5 mixed must-study problems timed",
        ],
      },
      {
        subj: "DBMS",
        badge: "bg-med",
        topics: [
          "ANSI-SPARC 3-level architecture — external, conceptual & internal levels with languages",
          "Views in SQL — creating views, difference from base tables & limitations on updating views",
        ],
      },
    ],
  },
  {
    day: 23,
    date: "Jun 6",
    week: "w4",
    office: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "FINAL DRILL — High Yield: Sampling allocations, Control Charts, Probability distributions",
          "Practice: 5 mixed PYQ problems across all high-yield Stats topics timed",
        ],
      },
      {
        subj: "DBMS",
        badge: "bg-med",
        topics: [
          "Practice: recall ANSI-SPARC architecture notes",
          "FINAL REVISION — Must Study: ER diagrams, Normalization, SQL, Transactions, Serializability",
        ],
      },
    ],
    library: [
      {
        subj: "Networks",
        badge: "bg-hardest",
        topics: [
          "FULL REVISION — Must Study: CRC, RSA/MD5, Routing, Sliding Window, ALOHA",
          "FINAL DRILL — High Yield: TCP handshaking, Congestion Control, IP Addressing, IPv4 vs IPv6",
        ],
      },
      {
        subj: "OS",
        badge: "bg-med",
        topics: [
          "FULL REVISION — Must Study: Linux commands, Windows architecture, Networking devices & topologies",
          "FINAL DRILL — High Yield: DNS, SNMP, Linux Virtual Memory, Windows Security",
        ],
      },
    ],
  },
  {
    day: 24,
    date: "Jun 7",
    week: "w4",
    office: [
      {
        subj: "Algo",
        badge: "bg-hard",
        topics: [
          "FINAL DRILL — pick 3 weakest Algo topics & solve 2 PYQ problems each",
          "Recall: Big-O proofs, recurrence relations & sorting algorithm complexities",
        ],
      },
      {
        subj: "Java",
        badge: "bg-med",
        topics: [
          "FINAL DRILL — TCP socket code, Applet lifecycle, File I/O, String vs StringBuffer",
          "Recall: RMI architecture, JDBC connection, Servlet lifecycle",
        ],
      },
    ],
    library: [
      {
        subj: "Stats",
        badge: "bg-hard",
        topics: [
          "FINAL DRILL — pick 3 weakest Stats topics & solve 2 PYQ problems each",
          "Last check: Newton Interpolation, Trapezoidal & Simpson's Rule, ANOVA",
        ],
      },
      {
        subj: "DBMS",
        badge: "bg-med",
        topics: [
          "FINAL DRILL — pick 2 weakest DBMS topics & solve 2 PYQ problems each",
          "Last check: SQL queries with JOINs, ER diagrams, Normalization up to BCNF",
        ],
      },
    ],
  },
];
const p1_exams = {
  "Jun 9": "DBMS exam (2–5pm)",
  "Jun 10": "Java exam (10am–1pm)",
  "Jun 11": "Stats exam (10am–1pm)",
  "Jun 12": "Networks exam (10am–1pm)",
  "Jun 13": "Algorithms exam (10am–1pm)",
  "Jun 15": "OS exam (2–5pm)",
};

const p2_days = [
  {
    day: 1,
    date: "Jun 16",
    week: "first",
    officeNull: true,
    library: {
      rows: [
        {
          subj: "Numerical",
          badge: "bg-hardest",
          topics: [
            "Floating Point Representation — normalize numbers, mantissa & exponent",
            "Overflow & Underflow definitions, Absolute, Relative & Truncation error calculations",
          ],
        },
        {
          subj: "Net Prog",
          badge: "bg-hard",
          topics: [
            "TCP/UDP Client-Server Algorithms — concurrent & iterative algorithms",
            "Core socket calls: bind(), listen(), accept(), connect(), send(), recvfrom()",
          ],
        },
      ],
    },
  },
  {
    day: 2,
    date: "Jun 17",
    week: "first",
    office: {
      rows: [
        {
          subj: "Numerical",
          badge: "bg-hardest",
          topics: [
            "Practice: 3 PYQ floating point arithmetic & error calculation problems",
            "Practice: 2 PYQ overflow/underflow definition problems",
          ],
        },
        {
          subj: "Web Prog",
          badge: "bg-easy",
          topics: [
            "Web 1.0 vs Web 2.0 — static vs dynamic websites",
            "Key Web 2.0 features: Blogging, Podcasting, Widgets, RSS, AJAX",
          ],
        },
      ],
    },
    library: {
      rows: [
        {
          subj: "Numerical",
          badge: "bg-hardest",
          topics: [
            "System of Linear Equations — Gauss Elimination with Partial Pivoting (3x3)",
            "Standard Gauss Elimination — writing system in matrix form, 2x2 & 3x3 systems",
          ],
        },
        {
          subj: "Net Prog",
          badge: "bg-hard",
          topics: [
            "TCP 3-Way Handshaking — connection establishment & termination with diagrams",
            "Flow Control — Sliding Window Protocol, managing out-of-order & lost segments",
          ],
        },
      ],
    },
  },
  {
    day: 3,
    date: "Jun 18",
    week: "first",
    office: {
      rows: [
        {
          subj: "Numerical",
          badge: "bg-hardest",
          topics: [
            "Practice: 3 PYQ Gauss Elimination problems (timed)",
            "Practice: 2 PYQ matrix form writing problems",
          ],
        },
        {
          subj: "Web Prog",
          badge: "bg-easy",
          topics: [
            "HTTP methods — GET vs POST: purposes, data visibility & differences",
            "JavaScript & DOM manipulation — changing text & colors via element IDs",
          ],
        },
      ],
    },
    library: {
      rows: [
        {
          subj: "Numerical",
          badge: "bg-hardest",
          topics: [
            "Newton's Forward Difference Formula — formula, difference table construction & solving",
            "Newton's Backward Difference Formula — formula & problem solving",
          ],
        },
        {
          subj: "Net Prog",
          badge: "bg-hard",
          topics: [
            "IP Addressing & Subnetting — Classful vs Classless, subnet masks, network IDs, broadcast",
            "Supernetting & Subnetting — concept & advantages",
          ],
        },
      ],
    },
  },
  {
    day: 4,
    date: "Jun 19",
    week: "first",
    office: {
      rows: [
        {
          subj: "Numerical",
          badge: "bg-hardest",
          topics: [
            "Practice: 3 PYQ Newton Forward/Backward Difference problems",
            "Practice: construct forward & backward difference tables from PYQ",
          ],
        },
        {
          subj: "Web Prog",
          badge: "bg-easy",
          topics: [
            "JSP & MVC Architecture — Model-View-Controller with block diagram",
            "Session Management — sessions vs states, JSP session object to manage state",
          ],
        },
      ],
    },
    library: {
      rows: [
        {
          subj: "Numerical",
          badge: "bg-hardest",
          topics: [
            "Euler's Method — solving IVPs: y'=f(x,y), given y(x0)=y0, find y at next point",
            "Trapezoidal Rule — computing integrals with formula & 2 PYQ problems",
          ],
        },
        {
          subj: "Net Prog",
          badge: "bg-hard",
          topics: [
            "DNS — Recursive vs Iterative resolution, Primary vs Secondary servers",
            "DHCP — DORA cycle working mechanism, client & server roles",
          ],
        },
      ],
    },
  },
  {
    day: 5,
    date: "Jun 20",
    week: "second",
    office: {
      rows: [
        {
          subj: "Numerical",
          badge: "bg-hardest",
          topics: [
            "Practice: 3 PYQ Euler's Method IVP problems (timed)",
            "Practice: 2 PYQ Trapezoidal Rule integration problems",
          ],
        },
        {
          subj: "Web Prog",
          badge: "bg-easy",
          topics: [
            "Cookies — definition, why needed in HTTP, basic example code",
            "JSP Implicit Objects — request, response, session, out",
          ],
        },
      ],
    },
    library: {
      rows: [
        {
          subj: "Numerical",
          badge: "bg-hardest",
          topics: [
            "Simpson's 1/3 Rule — computing integrals, formula & 2 PYQ problems",
            "Bisection Method — finding initial interval, writing steps, 2-3 iterations",
          ],
        },
        {
          subj: "Net Prog",
          badge: "bg-hard",
          topics: [
            "FTP — working mechanism, client/server roles, why it uses two TCP connections",
            "ARP & RARP — differences, working mechanisms & use of broadcasting",
          ],
        },
      ],
    },
  },
  {
    day: 6,
    date: "Jun 21",
    week: "second",
    office: {
      rows: [
        {
          subj: "Numerical",
          badge: "bg-hardest",
          topics: [
            "Practice: 3 PYQ Simpson's 1/3 Rule problems (timed)",
            "Practice: 2 PYQ Bisection Method iteration problems",
          ],
        },
        {
          subj: "Web Prog",
          badge: "bg-easy",
          topics: [
            "JDBC — writing Java code to connect & insert records into database",
            "ResultSet, Statements & PreparedStatements to retrieve & filter data",
          ],
        },
      ],
    },
    library: {
      rows: [
        {
          subj: "Numerical",
          badge: "bg-hardest",
          topics: [
            "Newton-Raphson Method — formula, performing iterations, convergence",
            "Gauss-Jacobi & Gauss-Seidel methods — formulas & 1-2 iterations",
          ],
        },
        {
          subj: "Net Prog",
          badge: "bg-hard",
          topics: [
            "Distance Vector Routing — mechanism & Count-to-Infinity problem",
            "Byte Ordering — htons(), htonl(), ntohs(), ntohl() & TCP/IP Header formats",
          ],
        },
      ],
    },
  },
  {
    day: 7,
    date: "Jun 22",
    week: "second",
    office: {
      rows: [
        {
          subj: "Numerical",
          badge: "bg-hardest",
          topics: [
            "Practice: 2 PYQ Newton-Raphson iteration problems",
            "Practice: 2 PYQ Gauss-Jacobi/Seidel iteration problems",
          ],
        },
        {
          subj: "Web Prog",
          badge: "bg-easy",
          topics: [
            "CSS — advantages, Inline vs Internal vs External stylesheets with examples",
            "HTML Forms — text boxes, dropdowns, submit buttons from PYQ",
          ],
        },
      ],
    },
    library: {
      rows: [
        {
          subj: "Numerical",
          badge: "bg-hardest",
          topics: [
            "Operator relations — Δ, ∇, E, δ expressions, Maclaurin's & Taylor's series",
            "FULL REVISION — Must Study: Floating point, Gauss Elimination, Newton interpolation, Euler's method",
          ],
        },
        {
          subj: "Net Prog",
          badge: "bg-hard",
          topics: [
            "ICMP — significance, message types & error reporting functions",
            "FULL REVISION — Must Study: Socket programming, TCP handshaking, IP subnetting, TCP vs UDP",
          ],
        },
      ],
    },
  },
  {
    day: 8,
    date: "Jun 23",
    week: "second",
    office: {
      rows: [
        {
          subj: "Numerical",
          badge: "bg-hardest",
          topics: [
            "FINAL DRILL — High Yield: Bisection, Newton-Raphson, Gauss-Jacobi/Seidel (timed)",
            "Theory: Direct vs Iterative methods comparison, Chopping vs Rounding",
          ],
        },
        {
          subj: "Web Prog",
          badge: "bg-easy",
          topics: [
            "FULL REVISION — Must Study: JSP/MVC, Session management, HTTP methods, DOM",
            "FINAL DRILL: JSP directives, XML fundamentals, 2 PYQ problems",
          ],
        },
      ],
    },
    library: {
      rows: [
        {
          subj: "Numerical",
          badge: "bg-hardest",
          topics: [
            "FINAL DRILL — pick 3 weakest Numerical topics & solve 2 PYQ problems each",
            "Last check: Simpson's Rule, Euler's Method, Newton Interpolation (timed)",
          ],
        },
        {
          subj: "Net Prog",
          badge: "bg-hard",
          topics: [
            "FINAL DRILL — High Yield: DNS, DHCP, FTP, ARP/RARP, Distance Vector routing",
            "Last check: socket algorithms, byte ordering, TCP header fields (timed)",
          ],
        },
      ],
    },
  },
];
const p2_exams = {
  "Jun 24": "Network Programming exam (10am–1pm)",
  "Jun 25": "Web Programming exam (10am–1pm)",
  "Jun 27": "Numerical Techniques exam (10am–1pm)",
};

const p3_days = [
  {
    day: 1,
    date: "Jun 28",
    week: "all",
    office: {
      rows: [
        {
          subj: "E-Com",
          tag: "must",
          topics: [
            "E-Commerce & M-Commerce Fundamentals — definition, workflow, trade cycle, architecture",
            "M-Commerce — key drivers, attributes, application flow, difference from E-Commerce",
            "Impact & benefits of E-Commerce to organizations, customers & society",
          ],
        },
        {
          subj: "E-Com",
          tag: "must",
          topics: [
            "E-Commerce Business Models — Transplanted vs Native Internet business models",
            "B2B, B2C, C2B, C2C — characteristics & examples of each model",
          ],
        },
      ],
    },
    library: {
      rows: [
        {
          subj: "E-Com",
          tag: "must",
          topics: [
            "Security in E-Commerce — SSL working with block diagram",
            "Digital Signatures — what they are, how they work & how they are verified",
            "Security concerns: client side, communication channel & server side",
          ],
        },
        {
          subj: "E-Com",
          tag: "must",
          topics: [
            "Cyber Crimes & IT Act — defining cyber crime, categories & cyber offences",
            "Penalties under IT Act 2000 & Cyber Laws",
          ],
        },
        {
          subj: "E-Com",
          tag: "must",
          topics: [
            "Electronic Payment Systems — types of online payment systems & services including mobile payments",
            "Precautions to take before making online payments",
          ],
        },
      ],
    },
  },
  {
    day: 2,
    date: "Jun 29",
    week: "all",
    office: {
      rows: [
        {
          subj: "E-Com",
          tag: "high",
          topics: [
            "EDI — definition, architecture with diagram, standards, benefits & applications",
            "Comparing conventional purchase order processing with EDI",
          ],
        },
        {
          subj: "E-Com",
          tag: "high",
          topics: [
            "Online Portals & Architecture — drawing & explaining online shopping portal architecture",
            "Core functionalities: user experience, search, personalization",
            "Strategies to increase visibility for an E-commerce website",
          ],
        },
      ],
    },
    library: {
      rows: [
        {
          subj: "E-Com",
          tag: "high",
          topics: [
            "Online Trading — how it is performed, payment modes, advantages & disadvantages",
            "Online Auctions — procedure, advantages & disadvantages",
          ],
        },
        {
          subj: "E-Com",
          tag: "good",
          topics: [
            "E-Papers — definition, advantages & disadvantages",
            "Search Engine categories & classification",
          ],
        },
        {
          subj: "E-Com",
          tag: "good",
          topics: [
            "Logistics & Stakeholders — components in online delivery of goods & services & their roles",
          ],
        },
        {
          subj: "E-Com",
          tag: "must",
          topics: [
            "FULL REVISION — Must Study: E-Commerce fundamentals, Business models, SSL, Digital signatures, IT Act, Payment systems",
            "PYQ drill: pick 3 must-study topics & answer 2 questions each from memory",
          ],
        },
      ],
    },
  },
  {
    day: 3,
    date: "Jun 30",
    week: "all",
    isExamDay: true,
    office: {
      rows: [
        {
          subj: "E-Com",
          tag: "must",
          topics: [
            "FINAL DRILL: Quick recall of all Must Study topics — SSL diagram, Digital signatures, IT Act penalties, Business models",
            "Go through your notes only — no new topics, confidence building only",
          ],
        },
      ],
    },
    library: {
      rows: [
        {
          subj: "E-Com",
          tag: "",
          topics: ["Exam — you've got this. All the best Suraj."],
        },
      ],
    },
  },
];
const p3_exams = { "Jun 30": "E-Commerce exam (2–5pm)" };

// ==========================================
// 2. CONFIGURATIONS
// ==========================================
const config = {
  p1: {
    header: `<h2 class="headline-lg">Phase 1: 24-Day Schedule</h2><p class="body-sm">May 15 → Jun 7 · 6 subjects · All topics covered</p>`,
    stats: `<div class="stat-card"><div class="stats-num">24</div><div class="label-caps stat-lbl">Study days</div></div><div class="stat-card"><div class="stats-num">6</div><div class="label-caps stat-lbl">Subjects</div></div><div class="stat-card"><div class="stats-num">9h</div><div class="label-caps stat-lbl">Daily study</div></div><div class="stat-card"><div class="stats-num">Jun 9</div><div class="label-caps stat-lbl">First exam</div></div>`,
    legend: `<div class="leg"><div class="leg-dot bg-hardest"></div>Networks (Hardest)</div><div class="leg"><div class="leg-dot bg-hard"></div>Stats / Algo (Hard)</div><div class="leg"><div class="leg-dot bg-med"></div>DBMS / OS / Java (Medium)</div>`,
    tabs: `<div class="tab active" onclick="setFilter('all', this)">All 24 days</div><div class="tab" onclick="setFilter('w1', this)">Week 1</div><div class="tab" onclick="setFilter('w2', this)">Week 2</div><div class="tab" onclick="setFilter('w3', this)">Week 3</div><div class="tab" onclick="setFilter('w4', this)">Final push</div>`,
    data: p1_days,
    exams: p1_exams,
  },
  p2: {
    header: `<h2 class="headline-lg">Phase 2: 8-Day Schedule</h2><p class="body-sm">Jun 16 → Jun 23 · 3 subjects · Day 1 library only</p>`,
    stats: `<div class="stat-card"><div class="stats-num">8</div><div class="label-caps stat-lbl">Study days</div></div><div class="stat-card"><div class="stats-num">3</div><div class="label-caps stat-lbl">Subjects</div></div><div class="stat-card"><div class="stats-num">9h</div><div class="label-caps stat-lbl">Daily study</div></div><div class="stat-card"><div class="stats-num">Jun 24</div><div class="label-caps stat-lbl">First exam</div></div>`,
    legend: `<div class="leg"><div class="leg-dot bg-hardest"></div>Numerical (Hardest)</div><div class="leg"><div class="leg-dot bg-hard"></div>Network Prog (Hard)</div><div class="leg"><div class="leg-dot bg-easy"></div>Web Prog (Easy)</div>`,
    tabs: `<div class="tab active" onclick="setFilter('all', this)">All 8 days</div><div class="tab" onclick="setFilter('first', this)">Days 1–4</div><div class="tab" onclick="setFilter('second', this)">Days 5–8</div>`,
    data: p2_days,
    exams: p2_exams,
  },
  p3: {
    header: `<h2 class="headline-lg">Phase 3: E-Commerce</h2><p class="body-sm">Jun 28–29 · Easiest subject · 2 days · Exam Jun 30 (2–5pm)</p>`,
    stats: `<div class="stat-card"><div class="stats-num">2</div><div class="label-caps stat-lbl">Study days</div></div><div class="stat-card"><div class="stats-num">1</div><div class="label-caps stat-lbl">Subject</div></div><div class="stat-card"><div class="stats-num">Easy</div><div class="label-caps stat-lbl">Difficulty</div></div><div class="stat-card"><div class="stats-num">Jun 30</div><div class="label-caps stat-lbl">Exam day</div></div>`,
    legend: `<div class="leg"><div class="leg-dot tag-must"></div>Must Study</div><div class="leg"><div class="leg-dot tag-high"></div>High Yield</div><div class="leg"><div class="leg-dot" style="background:#F3F4F6"></div>Good to Know</div>`,
    tabs: `<div class="tab active" onclick="setFilter('all', this)">All 2 days</div>`,
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
    return `<div class="session"><div class="label-caps session-label">${label}</div><div class="rest-note">Rest & recovery mode — let previous session settle</div></div>`;
  }

  const rows = getRowsArray(sess);
  let rowsHtml = rows
    .map((r, i) => {
      // DB IDs & States
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
      : "Office · 6am–2pm (Practice & Recall)";
    let libraryLabel = d.isExamDay
      ? "Exam · 2pm–5pm"
      : "Library · 4pm–8:30pm (New Topics)";

    let animationDelay = index * 0.05 + 0.1;

    if (d.isExamDay) {
      d.library.rows[0].isExam = true;
    }

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
        ${renderSession(d.library, libraryLabel, false, d.day, "library")}
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

function switchPhase(phase) {
  currentPhase = phase;
  currentFilter = "all";

  document
    .querySelectorAll(".toggle-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document.getElementById(`btn-${phase}`).classList.add("active");

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