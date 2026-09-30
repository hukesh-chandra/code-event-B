import { Quest } from '../types';

export const QUESTS: Quest[] = [
  // --- GATE MISSIONS (Secret / Easter Eggs) ---
  {
    id: "quest-gate1-seal",
    title: "Gate 1 Barrier Seal Verification",
    description: "Inspect the ancient campus boundary perimeter near Gate 1. Locate the protective ward markings near the main entrance pillar and confirm the protective barrier remains intact against wandering curses.",
    category: "Secret",
    grade: "Grade 4",
    xp: 150,
    bounty: "Talisman Sticker + 50 Cursed Energy",
    locationId: "gate-1",
    proofType: "photo"
  },
  {
    id: "quest-gate2-surveillance",
    title: "Gate 2 Southern Boundary Surveillance",
    description: "Sorcerers patrol the southern threshold where commuter flows are highest. Take a timestamped photograph of the entry gateway during dusk hours to log cursed residue flux.",
    category: "Secret",
    grade: "Grade 3",
    xp: 250,
    bounty: "Cursed Realm Keyring",
    locationId: "gate-2",
    proofType: "photo"
  },
  {
    id: "quest-gate3-riddle",
    title: "Northern Boundary Riddle (Gate 3)",
    description: "The quiet northern gate conceals a cryptic geometric carving on its support stone. Decipher the three-digit engraved access cipher and record it into the sorcery ledger.",
    category: "Secret",
    grade: "Grade 2",
    xp: 450,
    bounty: "Gatekeeper's Iron Token",
    locationId: "gate-3",
    proofType: "code"
  },
  {
    id: "quest-gate4-veil",
    title: "Gate 4 Phantom Veil & Shadow Inscription",
    description: "SPECIAL GRADE ANOMALY. Gate 4 marks the outer dimensional perimeter. Sorcerers must locate the secret QR-etched talisman plate hidden beneath the transit archway and channel maximum focus.",
    category: "Secret",
    grade: "Special Grade",
    xp: 1200,
    bounty: "Special Grade Sorcerer Crest + Canteen Feast Voucher",
    locationId: "gate-4",
    proofType: "photo"
  },

  // --- D6 LIBRARY (Library ONLY) ---
  {
    id: "quest-d6-stacks",
    title: "D6 Stacks: Archive of Ancient Cursed Scrolls",
    description: "Ascend to the central reference shelves of D6 Central Library. Locate a vintage physical volume printed prior to 2010 on distributed computing or algorithmic foundations.",
    category: "Library",
    grade: "Grade 4",
    xp: 180,
    bounty: "Library Bookmark of Solitude",
    locationId: "d6-library",
    proofType: "photo"
  },
  {
    id: "quest-d6-silent-pact",
    title: "D6 Silent Realm Study Pact",
    description: "Enter the deep quiet zone on the 2nd floor of D6 Library. Maintain unbreakable focus for a 2-hour uninterrupted study communion without triggering noise curses.",
    category: "Library",
    grade: "Grade 3",
    xp: 320,
    bounty: "Quiet Mind Talisman + Free Coffee Token",
    locationId: "d6-library",
    proofType: "none"
  },
  {
    id: "quest-d6-ieee-paper",
    title: "Find Rare IEEE Cursed Energy Research Paper",
    description: "Access the D6 Library digital journal terminal. Download and annotate a peer-reviewed IEEE paper on Quantum Computing or Cryptographic Zero-Knowledge proofs.",
    category: "Library",
    grade: "Grade 2",
    xp: 500,
    bounty: "Scholar's Cursed Feather Pen",
    locationId: "d6-library",
    proofType: "code"
  },
  {
    id: "quest-d6-forbidden-jstor",
    title: "D6 Terminal: Unseal Forbidden JSTOR Tome",
    description: "Navigate the deep research archives from the D6 institutional repository. Find and extract the DOI citation of the foundational paper on distributed consensus mechanisms.",
    category: "Library",
    grade: "Grade 1",
    xp: 850,
    bounty: "Grand Archivalist Pin + 200 XP Bonus",
    locationId: "d6-library",
    proofType: "code"
  },

  // --- FOOD REPUBLIC CANTEEN (Secret or Club) ---
  {
    id: "quest-food-republic-squad",
    title: "Food Republic Sorcerer Gathering: Squad Refuel",
    description: "Gather with 3 fellow sorcerer comrades at Food Republic. Discuss combat tactics (upcoming semester project architecture) over hot samosas and masala chai.",
    category: "Club",
    grade: "Grade 4",
    xp: 200,
    bounty: "Canteen Coupon (₹30 Off)",
    locationId: "food-republic",
    proofType: "photo"
  },
  {
    id: "quest-food-republic-secret-chai",
    title: "Food Republic Secret Menu: Special Grade Chai Potion",
    description: "Order the customized ginger-cardamom elixir concocted at the corner vendor stall. Photograph the steam swirls that ward off the fatigue curse.",
    category: "Secret",
    grade: "Grade 3",
    xp: 280,
    bounty: "Elixir Brewer Badge",
    locationId: "food-republic",
    proofType: "photo"
  },
  {
    id: "quest-food-republic-chess",
    title: "Canteen Chess Domain Expansion Challenge",
    description: "Challenge a stranger or club member to a blitz chess or tactical duel on the open wooden tables of Food Republic. Checkmate your opponent's king inside your mental domain.",
    category: "Club",
    grade: "Grade 2",
    xp: 480,
    bounty: "Grandmaster Cursed Pawn",
    locationId: "food-republic",
    proofType: "none"
  },

  // --- D4 CANTEEN (Secret or Club) ---
  {
    id: "quest-d4-budget-feast",
    title: "D4 Canteen Budget Feaster: ₹50 Cursed Snack",
    description: "Survive the student budget restriction! Assemble a nutritious and filling meal combo at D4 Canteen for exactly ₹50 or less and capture your tactical feast.",
    category: "Secret",
    grade: "Grade 4",
    xp: 160,
    bounty: "Budget Ascetic Talisman",
    locationId: "d4-canteen",
    proofType: "photo"
  },
  {
    id: "quest-d4-trivia-showdown",
    title: "D4 Sorcerer Trivia Showdown",
    description: "Host or participate in an impromptu CS / Campus lore trivia circle near the D4 outdoor benches. Answer 5 consecutive questions correctly.",
    category: "Club",
    grade: "Grade 3",
    xp: 340,
    bounty: "Cursed Talisman Badge",
    locationId: "d4-canteen",
    proofType: "none"
  },

  // --- B5 DACA DEPARTMENT (Workshop or Club ONLY) ---
  {
    id: "quest-daca-ui-domain",
    title: "DACA UI/UX Domain Crafting: Cursed Brand Identity",
    description: "Utilize Figma or Illustrator in the DACA creative labs to architect a dark-mode Jujutsu UI component library complete with talismanic borders and neon cursed-energy glow.",
    category: "Workshop",
    grade: "Grade 3",
    xp: 380,
    bounty: "Artisan Shikigami Sticker Pack",
    locationId: "b5-daca",
    proofType: "photo"
  },
  {
    id: "quest-daca-3d-shikigami",
    title: "DACA Animation Lab: Summon 3D Shikigami Model",
    description: "Render an organic or cybernetic spirit beast inside Blender or Maya at the B5 digital workstation. Showcase the wireframe and lighting topology.",
    category: "Club",
    grade: "Grade 2",
    xp: 520,
    bounty: "Master Modeler's Stylus Grip",
    locationId: "b5-daca",
    proofType: "photo"
  },
  {
    id: "quest-daca-motion-expansion",
    title: "DACA Motion Graphics: Domain Expansion Visualizer",
    description: "Produce a 10-second cinematic looping kinetic typography clip of Satoru Gojo's 'Infinite Void' or Sukuna's 'Malevolent Shrine' using After Effects in B5.",
    category: "Workshop",
    grade: "Grade 1",
    xp: 900,
    bounty: "Aura of the Virtuoso Pin + Design Suite Pass",
    locationId: "b5-daca",
    proofType: "photo"
  },

  // --- SPORTS COMPLEX (Wellness) ---
  {
    id: "quest-sports-steps",
    title: "Sports Complex 5,000-Step Cursed Energy Circulation",
    description: "Circulate raw physical cursed energy by logging at least 5,000 brisk steps or running laps around the athletic track at the Sports Complex.",
    category: "Wellness",
    grade: "Grade 4",
    xp: 190,
    bounty: "Endurance Talisman + Electrolyte Potion",
    locationId: "sports-complex",
    proofType: "photo"
  },
  {
    id: "quest-sports-highjump",
    title: "Heavenly Restriction Trial: Calisthenics Circuit",
    description: "Channel Toji Fushiguro's raw physical prowess. Complete 3 sets of 15 pull-ups, 25 pushups, and 30 box squats at the outdoor fitness bars.",
    category: "Wellness",
    grade: "Grade 2",
    xp: 460,
    bounty: "Physical Beast Armband",
    locationId: "sports-complex",
    proofType: "none"
  },
  {
    id: "quest-sports-midnight-badminton",
    title: "Court Expansion: High-Speed Badminton Match",
    description: "Engage in an intense 21-point singles or doubles badminton duel in the indoor arena. Display lightning-fast reflexes and smash precision.",
    category: "Wellness",
    grade: "Grade 1",
    xp: 780,
    bounty: "Championship Shuttlecock Trophy",
    locationId: "sports-complex",
    proofType: "photo"
  },

  // --- WORKSHOP (Workshop) ---
  {
    id: "quest-workshop-iron-talisman",
    title: "Mechanical Workshop: Forge the Iron Talisman",
    description: "Operate the lathe or CNC milling tool in the Central Workshop to engrave a custom metal tag with your sorcerer student ID code.",
    category: "Workshop",
    grade: "Grade 4",
    xp: 220,
    bounty: "Forged Iron Ingot Charm",
    locationId: "workshop",
    proofType: "photo"
  },
  {
    id: "quest-workshop-microcontroller",
    title: "Robotics Lab: Microcontroller Autonomous Shikigami",
    description: "Flash code onto an ESP32 or Arduino robot chassis in the workshop to navigate a line-maze autonomously without colliding with obstacles.",
    category: "Workshop",
    grade: "Grade 2",
    xp: 550,
    bounty: "Silicon Sorcerer Core Module",
    locationId: "workshop",
    proofType: "code"
  },
  {
    id: "quest-workshop-special-welding",
    title: "Special Grade Cursed Tool Welding Protocol",
    description: "SPECIAL GRADE ENGINEERING. Construct and MIG/TIG weld a high-rigidity steel frame structure passing strict load testing under faculty supervision.",
    category: "Workshop",
    grade: "Special Grade",
    xp: 1100,
    bounty: "Special Grade Blacksmith Mark + Safety Goggles of Insight",
    locationId: "workshop",
    proofType: "photo"
  },

  // --- FOUNTAIN PARK (Wellness & Secret) ---
  {
    id: "quest-fountain-zen",
    title: "Fountain Park Zen Meditation & Breath Alignment",
    description: "Sit on the stone benches facing the central fountain water spray. Practice 15 minutes of box-breathing to purge mental cognitive fog and restore cursed energy reserves.",
    category: "Wellness",
    grade: "Grade 3",
    xp: 270,
    bounty: "Lotus Petal Talisman",
    locationId: "fountain-park",
    proofType: "none"
  },
  {
    id: "quest-fountain-ripple-secret",
    title: "Echoing Ripple: Midnight Fountain Riddle",
    description: "Under evening lighting, inspect the geometric stone perimeter of Fountain Park to spot the brass plate dedicated to visionary innovators. Submit the inscription's Latin motto.",
    category: "Secret",
    grade: "Grade 2",
    xp: 420,
    bounty: "Aqua Affinity Seal",
    locationId: "fountain-park",
    proofType: "code"
  },

  // --- ACADEMIC BLOCKS (Coding quests: B1-B4, C1, A1) ---
  {
    id: "quest-b1-git-clean",
    title: "B1 Terminal: Clean Git Commit Tree Purification",
    description: "Sit in the computer labs of Block B1. Refactor a messy repository with rebase, squashing 5+ chaotic commits into atomic semantic commit messages.",
    category: "Coding",
    grade: "Grade 4",
    xp: 190,
    bounty: "Git Ninja Badge + 40 Cursed Energy",
    locationId: "b1",
    proofType: "code"
  },
  {
    id: "quest-b2-memory-leak",
    title: "B2 Lab: Exorcise the C++ Heap Memory Leak",
    description: "Track down a notorious dangling pointer or cyclic reference causing a heap overflow in the Block B2 advanced algorithms workstation. Pass Valgrind with 0 errors.",
    category: "Coding",
    grade: "Grade 3",
    xp: 350,
    bounty: "Memory Sanctum Ring",
    locationId: "b2",
    proofType: "code"
  },
  {
    id: "quest-b3-microservice-barrier",
    title: "B3 Cluster: Deploy Distributed Microservice Barrier",
    description: "Containerize a multi-service web app using Docker and Kubernetes cluster nodes in Block B3. Configure reverse proxy rate-limiting to repel DDoS curses.",
    category: "Coding",
    grade: "Grade 2",
    xp: 530,
    bounty: "Cloud Architect Sigil",
    locationId: "b3",
    proofType: "code"
  },
  {
    id: "quest-b4-ai-classifier",
    title: "B4 AI Lab: Train Neural Network Jujutsu Classifier",
    description: "Train a PyTorch or TensorFlow model in Block B4 high-performance GPU lab to achieve 95%+ validation accuracy on a computer vision dataset.",
    category: "Coding",
    grade: "Grade 1",
    xp: 880,
    bounty: "Neural Core Artifact + Research Honors Pass",
    locationId: "b4",
    proofType: "code"
  },
  {
    id: "quest-c1-open-source-pr",
    title: "C1 Block: Submit Pull Request to Open-Source Repo",
    description: "Collaborate in the coding hubs of Block C1. Locate an active open-source repository on GitHub, solve an open issue or optimize documentation, and submit a PR.",
    category: "Coding",
    grade: "Grade 3",
    xp: 360,
    bounty: "Open Source Vanguard Badge",
    locationId: "c1",
    proofType: "code"
  },
  {
    id: "quest-a1-zero-day",
    title: "A1 Sanctum: Zero-Day Vulnerability Exorcism",
    description: "SPECIAL GRADE CYBERSECURITY MISSION. In the high-security network range of Block A1, capture the root flag in a simulated cyber penetration test defense grid.",
    category: "Coding",
    grade: "Special Grade",
    xp: 1350,
    bounty: "Special Grade Cyber Sorcerer Sigil + VIP Mentorship Pass",
    locationId: "a1",
    proofType: "code"
  }
];
