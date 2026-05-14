const days = [
  {
    day: 1,
    date: "May 15",
    week: "w1",
    office: null,
    library: {
      hard: {
        subj: "Stats",
        topics: [
          "Floating Point Representation — normalize numbers, mantissa & exponent",
          "Addition, subtraction & multiplication of floating point numbers",
        ],
      },
      med: {
        subj: "DBMS",
        topics: [
          "ER Modeling — drawing ER diagrams for library/bank scenarios",
          "Cardinality, weak/strong entities, converting ER to relational tables",
        ],
      },
    },
  },
  {
    day: 2,
    date: "May 16",
    week: "w1",
    office: {
      hard: {
        subj: "Stats",
        topics: [
          "Practice: 3 PYQ problems on floating point & arithmetic",
          "Practice: 2 PYQ problems on overflow/underflow definitions",
        ],
      },
      med: {
        subj: "DBMS",
        topics: [
          "Practice: 2 PYQ ER diagram problems",
          "Recall notes on ER → relational schema conversion",
        ],
      },
    },
    library: {
      hard: {
        subj: "Networks",
        topics: [
          "CRC calculation — data polynomial & generator method",
          "Parity bit method for error detection",
        ],
      },
      med: {
        subj: "OS",
        topics: [
          "Linux commands — grep, chmod, sort, cmp, diff, tail, cat",
          "Pipes, filters & redirection with examples",
        ],
      },
    },
  },
  {
    day: 3,
    date: "May 17",
    week: "w1",
    office: {
      hard: {
        subj: "Networks",
        topics: [
          "Practice: 3 PYQ CRC calculation problems",
          "Practice: 2 PYQ parity bit problems",
        ],
      },
      med: {
        subj: "OS",
        topics: [
          "Practice: 2 shell scripting problems from PYQ",
          "Recall Linux command usage",
        ],
      },
    },
    library: {
      hard: {
        subj: "Algo",
        topics: [
          "DFS & BFS — writing algorithms & traversal on graphs",
          "Asymptotic notation — Big-O, Omega, Theta definitions & proofs",
        ],
      },
      med: {
        subj: "Java",
        topics: [
          "Method overloading vs overriding with examples",
          "Polymorphism, encapsulation, data abstraction",
        ],
      },
    },
  },
  {
    day: 4,
    date: "May 18",
    week: "w1",
    office: {
      hard: {
        subj: "Algo",
        topics: [
          "Practice: 2 PYQ DFS/BFS traversal problems",
          "Practice: 2 PYQ Big-O proof problems",
        ],
      },
      med: {
        subj: "Java",
        topics: [
          "Practice: 2 PYQ overloading/overriding code problems",
          "Recall OOP concept definitions",
        ],
      },
    },
    library: {
      hard: {
        subj: "Stats",
        topics: [
          "Absolute, relative & truncation error calculations",
          "System of linear equations — Gauss Elimination with partial pivoting",
        ],
      },
      med: {
        subj: "DBMS",
        topics: [
          "Normalization — candidate keys, closure of relation",
          "1NF, 2NF, 3NF, BCNF with anomalies",
        ],
      },
    },
  },
  {
    day: 5,
    date: "May 19",
    week: "w1",
    office: {
      hard: {
        subj: "Stats",
        topics: [
          "Practice: 3 PYQ error calculation problems",
          "Practice: 2 PYQ Gauss elimination problems",
        ],
      },
      med: {
        subj: "DBMS",
        topics: [
          "Practice: 2 PYQ normalization problems",
          "Recall BCNF vs 3NF reasoning",
        ],
      },
    },
    library: {
      hard: {
        subj: "Networks",
        topics: [
          "RSA Algorithm — public/private key calculation, encrypt/decrypt",
          "MD5 Algorithm — step-by-step 128-bit message digest",
        ],
      },
      med: {
        subj: "OS",
        topics: [
          "Windows architecture — User Mode vs Kernel Mode",
          "Active Directory — logical & physical structure",
        ],
      },
    },
  },
  {
    day: 6,
    date: "May 20",
    week: "w1",
    office: {
      hard: {
        subj: "Networks",
        topics: [
          "Practice: 2 PYQ RSA key calculation problems",
          "Practice: 2 PYQ MD5 procedure problems",
        ],
      },
      med: {
        subj: "OS",
        topics: [
          "Practice: recall notes on Active Directory",
          "Practice: Trust relationships, Domain Controllers PDC/BDC",
        ],
      },
    },
    library: {
      hard: {
        subj: "Algo",
        topics: [
          "Kruskal's & Prim's — Minimum Cost Spanning Tree",
          "Fractional Knapsack problem — greedy technique",
        ],
      },
      med: {
        subj: "Java",
        topics: [
          "Thread life cycle — extending Thread vs implementing Runnable",
          "Thread synchronization — wait/notify inter-thread communication",
        ],
      },
    },
  },
  {
    day: 7,
    date: "May 21",
    week: "w1",
    office: {
      hard: {
        subj: "Algo",
        topics: [
          "Practice: 2 PYQ MST problems (Kruskal/Prim)",
          "Practice: 2 PYQ Knapsack numerical problems",
        ],
      },
      med: {
        subj: "Java",
        topics: [
          "Practice: 2 PYQ thread lifecycle problems",
          "Recall synchronization code patterns",
        ],
      },
    },
    library: {
      hard: {
        subj: "Stats",
        topics: [
          "ANOVA — one-way ANOVA table construction & hypothesis testing",
          "Chi-Square test — contingency table independence testing",
        ],
      },
      med: {
        subj: "DBMS",
        topics: [
          "Transaction & Concurrency — ACID properties, transaction states",
          "Precedence graphs — conflict serializability check",
        ],
      },
    },
  },
  {
    day: 8,
    date: "May 22",
    week: "w2",
    office: {
      hard: {
        subj: "Stats",
        topics: [
          "Practice: 2 PYQ ANOVA table construction problems",
          "Practice: 2 PYQ Chi-Square contingency problems",
        ],
      },
      med: {
        subj: "DBMS",
        topics: [
          "Practice: 2 PYQ precedence graph problems",
          "Recall ACID property definitions",
        ],
      },
    },
    library: {
      hard: {
        subj: "Networks",
        topics: [
          "Distance Vector Routing — mechanism & Count-to-Infinity problem",
          "Link State Routing — mechanism & comparison with Distance Vector",
        ],
      },
      med: {
        subj: "OS",
        topics: [
          "Networking devices & topologies — Hubs, Switches, Routers, OSI layers",
          "LAN, MAN, WAN comparison",
        ],
      },
    },
  },
  {
    day: 9,
    date: "May 23",
    week: "w2",
    office: {
      hard: {
        subj: "Networks",
        topics: [
          "Practice: 2 PYQ Distance Vector routing problems",
          "Practice: 2 PYQ Link State routing problems",
        ],
      },
      med: {
        subj: "OS",
        topics: [
          "Practice: recall notes on networking devices & OSI layers",
          "Practice: topology comparisons",
        ],
      },
    },
    library: {
      hard: {
        subj: "Algo",
        topics: [
          "Recurrence relations — Master Method & Recursion Tree Method",
          "Quick Sort & Merge Sort — algorithm, steps, worst/best complexity",
        ],
      },
      med: {
        subj: "Java",
        topics: [
          "Exception handling — checked/unchecked, throw vs throws",
          "Custom/user-defined exceptions, try-catch-finally blocks",
        ],
      },
    },
  },
  {
    day: 10,
    date: "May 24",
    week: "w2",
    office: {
      hard: {
        subj: "Algo",
        topics: [
          "Practice: 2 PYQ recurrence relation problems",
          "Practice: 2 PYQ Quick Sort / Merge Sort tracing problems",
        ],
      },
      med: {
        subj: "Java",
        topics: [
          "Practice: 2 PYQ exception handling code problems",
          "Recall custom exception creation pattern",
        ],
      },
    },
    library: {
      hard: {
        subj: "Stats",
        topics: [
          "Correlation & Linear Regression — coefficient, regression line y=a+bx",
          "Time Series — 3/4 yearly centered moving averages, components",
        ],
      },
      med: {
        subj: "DBMS",
        topics: [
          "2-Phase Locking — basic vs strict, Deadlock — Wait-Die & Wound-Wait",
          "SQL queries — GROUP BY, HAVING, JOINs, subqueries",
        ],
      },
    },
  },
  {
    day: 11,
    date: "May 25",
    week: "w2",
    office: {
      hard: {
        subj: "Stats",
        topics: [
          "Practice: 2 PYQ regression line fitting problems",
          "Practice: 2 PYQ moving average calculation problems",
        ],
      },
      med: {
        subj: "DBMS",
        topics: [
          "Practice: 2 PYQ SQL query writing problems",
          "Recall 2PL protocol advantages/disadvantages",
        ],
      },
    },
    library: {
      hard: {
        subj: "Networks",
        topics: [
          "Sliding Window Protocols — Go-Back-N & Selective Repeat ARQ",
          "ALOHA — Pure vs Slotted, throughput formulas 0.184 & 0.368",
        ],
      },
      med: {
        subj: "OS",
        topics: [
          "Distributed OS, Network OS, Multiprocessor OS — comparison",
          "Multiprogramming vs Multithreading vs Multitasking",
        ],
      },
    },
  },
  {
    day: 12,
    date: "May 26",
    week: "w2",
    office: {
      hard: {
        subj: "Networks",
        topics: [
          "Practice: 2 PYQ Sliding Window problems",
          "Practice: 2 PYQ ALOHA throughput calculation problems",
        ],
      },
      med: {
        subj: "OS",
        topics: [
          "Practice: recall OS type comparison notes",
          "Practice: recall multiprogramming/multithreading definitions",
        ],
      },
    },
    library: {
      hard: {
        subj: "Algo",
        topics: [
          "Dijkstra's Algorithm — single source shortest path",
          "Bellman-Ford algorithm — comparison with Dijkstra's",
        ],
      },
      med: {
        subj: "Java",
        topics: [
          "File I/O & Streams — read/copy text & binary files",
          "Count words/lines/chars using StreamTokenizer",
        ],
      },
    },
  },
  {
    day: 13,
    date: "May 27",
    week: "w2",
    office: {
      hard: {
        subj: "Algo",
        topics: [
          "Practice: 2 PYQ Dijkstra shortest path problems",
          "Practice: 2 PYQ Bellman-Ford problems",
        ],
      },
      med: {
        subj: "Java",
        topics: [
          "Practice: 2 PYQ File I/O code writing problems",
          "Recall StreamTokenizer usage pattern",
        ],
      },
    },
    library: {
      hard: {
        subj: "Stats",
        topics: [
          "Sampling allocations — Proportional & Neyman's Optimum Allocation",
          "Control Charts — UCL, LCL, CL, X-bar & R-charts",
        ],
      },
      med: {
        subj: "DBMS",
        topics: [
          "Relational Algebra — Union, Intersection, Set Difference, Division",
          "Database Recovery — Log-based, Deferred vs Immediate, WAL protocol",
        ],
      },
    },
  },
  {
    day: 14,
    date: "May 28",
    week: "w2",
    office: {
      hard: {
        subj: "Stats",
        topics: [
          "Practice: 2 PYQ sampling allocation problems",
          "Practice: 2 PYQ control chart computation problems",
        ],
      },
      med: {
        subj: "DBMS",
        topics: [
          "Practice: 2 PYQ Relational Algebra problems",
          "Recall log-based recovery concepts",
        ],
      },
    },
    library: {
      hard: {
        subj: "Networks",
        topics: [
          "TCP 3-Way Handshaking — connection establishment & termination",
          "Congestion Control — Leaky bucket, Token bucket, Slow start",
        ],
      },
      med: {
        subj: "OS",
        topics: [
          "DNS — architecture, design goals, zones",
          "SNMP — architecture & UDP usage",
        ],
      },
    },
  },
  {
    day: 15,
    date: "May 29",
    week: "w3",
    office: {
      hard: {
        subj: "Networks",
        topics: [
          "Practice: 2 PYQ TCP handshaking diagram problems",
          "Practice: 2 PYQ congestion control problems",
        ],
      },
      med: {
        subj: "OS",
        topics: [
          "Practice: recall DNS architecture notes",
          "Practice: FTP, TFTP, TELNET comparison",
        ],
      },
    },
    library: {
      hard: {
        subj: "Algo",
        topics: [
          "Mathematical Induction — proving 1²+2²+...+n² = n(n+1)(2n+1)/6",
          "Insertion Sort & Bubble Sort — tracing steps & counting comparisons",
        ],
      },
      med: {
        subj: "Java",
        topics: [
          "Applet life cycle & applet vs application",
          "GUI — Layout Managers: BorderLayout, FlowLayout, GridLayout",
        ],
      },
    },
  },
  {
    day: 16,
    date: "May 30",
    week: "w3",
    office: {
      hard: {
        subj: "Algo",
        topics: [
          "Practice: 2 PYQ mathematical induction proofs",
          "Practice: 2 PYQ Insertion/Bubble Sort tracing problems",
        ],
      },
      med: {
        subj: "Java",
        topics: [
          "Practice: 2 PYQ applet code writing problems",
          "Recall Layout Manager usage",
        ],
      },
    },
    library: {
      hard: {
        subj: "Stats",
        topics: [
          "Probability distributions — Binomial vs Poisson, Normal distribution Z-scores",
          "Hypothesis testing theory — parametric vs non-parametric, t/F/Z test differences",
        ],
      },
      med: {
        subj: "DBMS",
        topics: [
          "Indexing — Primary, Secondary, Clustering, Dense vs Sparse indexes",
          "B-Trees & B+ Trees vs Binary Search Trees",
        ],
      },
    },
  },
  {
    day: 17,
    date: "May 31",
    week: "w3",
    office: {
      hard: {
        subj: "Stats",
        topics: [
          "Practice: 2 PYQ probability distribution word problems",
          "Practice: recall hypothesis testing theory notes",
        ],
      },
      med: {
        subj: "DBMS",
        topics: [
          "Practice: recall indexing type differences",
          "Practice: 2 PYQ B-Tree indexing problems",
        ],
      },
    },
    library: {
      hard: {
        subj: "Networks",
        topics: [
          "IP Addressing — Classful vs Classless, subnet masks, network IDs",
          "IPv4 vs IPv6 — differences, tunneling, packet fragmentation",
        ],
      },
      med: {
        subj: "OS",
        topics: [
          "Windows Security — Kerberos authentication, hardware/software tokens",
          "EFS, IPSec — features, components, policies",
        ],
      },
    },
  },
  {
    day: 18,
    date: "Jun 1",
    week: "w3",
    office: {
      hard: {
        subj: "Networks",
        topics: [
          "Practice: 3 PYQ IP addressing & subnetting problems",
          "Practice: 2 PYQ IPv4/IPv6 comparison problems",
        ],
      },
      med: {
        subj: "OS",
        topics: [
          "Practice: recall Windows security concepts",
          "Practice: NTFS vs FAT16 vs FAT32 comparison notes",
        ],
      },
    },
    library: {
      hard: {
        subj: "Algo",
        topics: [
          "Linear Search vs Binary Search — algorithms, complexity, comparisons",
          "Adjacency List & Matrix — directed/undirected graphs, paths, cycles",
        ],
      },
      med: {
        subj: "Java",
        topics: [
          "TCP/UDP socket programs — client-server code writing",
          "Event handling — semantic vs low-level, AWT vs Swing",
        ],
      },
    },
  },
  {
    day: 19,
    date: "Jun 2",
    week: "w3",
    office: {
      hard: {
        subj: "Algo",
        topics: [
          "Practice: 2 PYQ Binary Search tracing problems",
          "Practice: 2 PYQ graph representation problems",
        ],
      },
      med: {
        subj: "Java",
        topics: [
          "Practice: 2 PYQ TCP socket code problems",
          "Recall event handling mechanism",
        ],
      },
    },
    library: {
      hard: {
        subj: "Stats",
        topics: [
          "FULL REVISION — Must Study topics only: Floating point, Gauss, Newton interpolation, Euler's method",
          "PYQ drill: solve 5 mixed problems across all must-study topics",
        ],
      },
      med: {
        subj: "DBMS",
        topics: [
          "FULL REVISION — Must Study topics: ER diagrams, Normalization, SQL queries, Transactions",
          "PYQ drill: 3 mixed problems",
        ],
      },
    },
  },
  {
    day: 20,
    date: "Jun 3",
    week: "w3",
    office: {
      hard: {
        subj: "Stats",
        topics: [
          "Practice: Newton's Forward & Backward Difference Formula problems",
          "Practice: Euler's Method IVP problems (2-3 PYQ)",
        ],
      },
      med: {
        subj: "DBMS",
        topics: [
          "Practice: 2 PYQ transaction serializability problems",
          "Recall distributed DBMS fragmentation & replication",
        ],
      },
    },
    library: {
      hard: {
        subj: "Networks",
        topics: [
          "Digital Modulation — ASK, PSK, FSK comparison",
          "Multiplexing — TDM vs FDM, transmission modes",
        ],
      },
      med: {
        subj: "OS",
        topics: [
          "VPN — configuration & significance",
          "RAID — levels, disk mirroring, striping, duplexing",
        ],
      },
    },
  },
  {
    day: 21,
    date: "Jun 4",
    week: "w3",
    office: {
      hard: {
        subj: "Networks",
        topics: [
          "Practice: recall modulation comparison notes",
          "Practice: 2 PYQ ARP/RARP working mechanism problems",
        ],
      },
      med: {
        subj: "OS",
        topics: [
          "Practice: recall RAID level differences",
          "Practice: recall VPN vs Firewall concepts",
        ],
      },
    },
    library: {
      hard: {
        subj: "Algo",
        topics: [
          "FULL REVISION — Must Study: DFS/BFS, MST, Knapsack, Asymptotic notation",
          "PYQ drill: 5 mixed problems across all must-study topics",
        ],
      },
      med: {
        subj: "Java",
        topics: [
          "FULL REVISION — Must Study: OOP concepts, Multithreading, Exception handling, File I/O",
          "PYQ drill: 3 mixed code problems",
        ],
      },
    },
  },
  {
    day: 22,
    date: "Jun 5",
    week: "w4",
    office: {
      hard: {
        subj: "Algo",
        topics: [
          "Practice: 2 PYQ Kruskal/Prim problems (timed)",
          "Practice: 2 PYQ Quick Sort/Merge Sort trace problems",
        ],
      },
      med: {
        subj: "Java",
        topics: [
          "Practice: 2 PYQ multithreading synchronization code",
          "Recall Servlet lifecycle & session tracking",
        ],
      },
    },
    library: {
      hard: {
        subj: "Networks",
        topics: [
          "FULL REVISION — Must Study: CRC, RSA/MD5, Routing algorithms, Sliding Window, ALOHA",
          "PYQ drill: 5 mixed high-marks problems",
        ],
      },
      med: {
        subj: "OS",
        topics: [
          "FULL REVISION — Must Study: Linux commands, Windows architecture, Networking devices",
          "PYQ drill: 3 mixed problems",
        ],
      },
    },
  },
  {
    day: 23,
    date: "Jun 6",
    week: "w4",
    office: {
      hard: {
        subj: "Networks",
        topics: [
          "Practice: 2 PYQ CRC calculation problems (timed)",
          "Practice: 2 PYQ RSA key generation problems (timed)",
        ],
      },
      med: {
        subj: "OS",
        topics: [
          "Practice: write 2 shell scripts from PYQ",
          "Recall OSI model layers & TCP/IP suite",
        ],
      },
    },
    library: {
      hard: {
        subj: "Stats",
        topics: [
          "FINAL REVISION — High Yield: Sampling, Control Charts, Probability distributions",
          "PYQ drill: 5 problems covering all high-yield topics",
        ],
      },
      med: {
        subj: "DBMS",
        topics: [
          "FINAL REVISION — High Yield: Recovery techniques, DDBMS, Indexing",
          "PYQ drill: 3 problems",
        ],
      },
    },
  },
  {
    day: 24,
    date: "Jun 7",
    week: "w4",
    office: {
      hard: {
        subj: "Algo",
        topics: [
          "FINAL DRILL — Dijkstra, Bellman-Ford, Binary Search timed problems",
          "Recall: Big-O proofs & recurrence relation solving",
        ],
      },
      med: {
        subj: "Java",
        topics: [
          "FINAL DRILL — Network socket code, Applet lifecycle, JDBC connection",
          "Recall: String vs StringBuffer, RMI architecture",
        ],
      },
    },
    library: {
      hard: {
        subj: "Networks",
        topics: [
          "FINAL DRILL — Frame Relay, ATM Networks, TCP Congestion Control",
          "Last PYQ review: pick 3 weakest topics & drill them",
        ],
      },
      med: {
        subj: "DBMS",
        topics: [
          "FINAL DRILL — SQL queries with JOINs, ACID properties, ER diagrams",
          "Last PYQ review: pick 2 weakest topics & drill them",
        ],
      },
    },
  },
];

const examDates = {
  "Jun 9": "DBMS exam (2–5pm)",
  "Jun 10": "Java exam (10am–1pm)",
  "Jun 11": "Stats exam (10am–1pm)",
  "Jun 12": "Networks exam (10am–1pm)",
  "Jun 13": "Algorithms exam (10am–1pm)",
  "Jun 15": "OS exam (2–5pm)",
};

function badgeClass(s) {
  if (s === "Stats") return "stats-badge";
  if (s === "Networks") return "networks-badge";
  if (s === "Algo") return "algo-badge";
  if (s === "DBMS") return "dbms-badge";
  if (s === "OS") return "os-badge";
  if (s === "Java") return "java-badge";
  return "";
}

function renderSession(sess, label) {
  if (!sess)
    return `<div class="session"><div class="session-label">${label}</div><div style="font-size:13px;color:var(--muted)">Rest — let previous session settle</div></div>`;
  return `<div class="session">
    <div class="session-label">${label}</div>
    <div class="subject-row">
      <span class="subj-badge ${badgeClass(sess.hard.subj)}">${sess.hard.subj}</span>
      <div class="topic-text">${sess.hard.topics.join("<br>")}</div>
    </div>
    <div class="subject-row" style="margin-top:8px">
      <span class="subj-badge ${badgeClass(sess.med.subj)}">${sess.med.subj}</span>
      <div class="topic-text">${sess.med.topics.join("<br>")}</div>
    </div>
  </div>`;
}

function render(filter) {
  const el = document.getElementById("schedule");
  let html = "";
  const filtered =
    filter === "all" ? days : days.filter((d) => d.week === filter);
  filtered.forEach((d) => {
    const exam = examDates[d.date]
      ? `<span class="exam-badge">${examDates[d.date]}</span>`
      : "";
    html += `<div class="day-card">
      <div class="day-header">
        <div style="display:flex;align-items:center;gap:8px">
          <span class="day-num">Day ${d.day}</span>
          <span class="day-date">${d.date}</span>
        </div>
        ${exam}
      </div>
      ${renderSession(d.office, "Office · 6am–2pm (practice previous session)")}
      ${renderSession(d.library, "Library · 4pm–8:30pm (new topics)")}
    </div>`;
  });
  el.innerHTML = html;
}

function showPhase(p, el) {
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  el.classList.add("active");
  render(p);
}

render("all");
