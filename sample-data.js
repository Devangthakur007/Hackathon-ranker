/**
 * Initial Sample Hackathon Projects
 * Seeded so the Leaderboard & Evaluation features are instantly rich and interactive.
 */

const SEED_PROJECTS = [
  {
    id: "proj_seed_1",
    name: "Alex Rivera & Maya Chen",
    email: "alex.rivera@teamai.io",
    project: "MediScan Vision AI",
    category: "AI",
    techStack: "PyTorch, FastAPI, ONNX, Next.js, Docker, HuggingFace",
    description: "An on-device multimodal AI diagnostic assistant that analyzes medical scans (X-Rays, MRIs) in under 2 seconds. Uses fine-tuned vision transformers with explainability heatmaps (Grad-CAM) to assist remote rural clinic doctors without requiring constant high-bandwidth internet.",
    github: "https://github.com/alexrivera/mediscan-vision-ai",
    submittedDate: "2026-09-28 14:32:00",
    hasFile: true
  },
  {
    id: "proj_seed_2",
    name: "Siddharth Rao",
    email: "sid.rao@cybersec.org",
    project: "SentinelShield Zero-Trust",
    category: "Cybersecurity",
    techStack: "Rust, WebSockets, SHA-256, OAuth, Intrusion Detection, eBPF",
    description: "Autonomous real-time intrusion detection and behavioral access control system. Utilizes Linux eBPF kernel probes combined with anomaly detection models to mitigate zero-day API exploit payloads before they touch application memory.",
    github: "https://github.com/sidrao/sentinel-shield",
    submittedDate: "2026-09-28 15:10:00",
    hasFile: true
  },
  {
    id: "proj_seed_3",
    name: "Elena Rostova",
    email: "elena@agroiot.tech",
    project: "AgroSense Edge IoT",
    category: "IoT",
    techStack: "ESP32, LoRaWAN, MQTT, MicroPython, InfluxDB, Grafana",
    description: "Solar-powered mesh sensor network for smallholder farmers. Measures soil moisture, NPK fertility indices, and microclimate telemetry. Deploys edge predictive models to forecast crop blights 72 hours in advance with 40% water savings.",
    github: "https://github.com/elena-rostova/agrosense-iot",
    submittedDate: "2026-09-28 15:45:00",
    hasFile: false
  },
  {
    id: "proj_seed_4",
    name: "Devon & Tariq",
    email: "team@blockvote.eth",
    project: "VeriVote Protocol",
    category: "Blockchain",
    techStack: "Solidity, Ethereum, IPFS, Zero-Knowledge Proofs, Hardhat, React",
    description: "A decentralized, anonymous, and mathematically verifiable voting protocol using zk-SNARKs. Guarantees tamper-proof ballot counting for collegiate and municipal elections while protecting voter privacy completely.",
    github: "https://github.com/blockvote/verivote-protocol",
    submittedDate: "2026-09-28 16:15:00",
    hasFile: true
  },
  {
    id: "proj_seed_5",
    name: "Chloe Dupont",
    email: "chloe@hyperflow.dev",
    project: "HyperFlow Studio",
    category: "Web",
    techStack: "Next.js, TypeScript, Tailwind, WebSockets, Redis, PostgreSQL",
    description: "Collaborative real-time diagramming and reactive cloud architecture simulator. Allows engineering teams to model multi-region microservices and simulate network latency and failure cascades live in the browser.",
    github: "https://github.com/chloedupont/hyperflow-studio",
    submittedDate: "2026-09-28 16:50:00",
    hasFile: false
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SEED_PROJECTS;
} else if (typeof window !== 'undefined') {
  window.SEED_PROJECTS = SEED_PROJECTS;
}
