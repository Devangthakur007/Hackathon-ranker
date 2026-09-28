# 🏆 DROPPROJECT — Hackathon Project Evaluator & Leaderboard

A comprehensive platform designed for hackathons where participants and organizers can submit projects and obtain multi-factor evaluations, automated scorecards, and live leaderboard rankings.

---

## 🌟 Key Features

1. **Submission Portal (`projectsub.html`)**:
   - Clean dark-mode UI with lime accent aesthetic (`#d7ff5e`).
   - Fields: Author / Team Name, Email, Project Name, Category, Tech Stack, Technical Pitch, GitHub/Demo Link, File Upload (ZIP, PPT, PDF).
   - "✨ Auto-fill Sample Idea" button for rapid demo testing.

2. **Automated AI Hackathon Rating Engine (`evaluator.js`)**:
   - **4 Judging Pillars (0 - 25 points each, 100 max)**:
     - **Innovation & Novelty (25 pts)**: Originality of idea, differentiation from existing apps, creative technology application.
     - **Technical Execution & Architecture (25 pts)**: Stack complexity, architectural depth, code transparency (GitHub repository validation).
     - **Real-World Impact & Feasibility (25 pts)**: Market demand, scalability, target audience value, quantifiable outcome metrics.
     - **Presentation, UX & Docs (25 pts)**: Clarity of problem-solution pitch, documentation completeness, demo availability.
   - **Tiers & Badges**:
     - `S-Tier (90 - 100)`: Grand Champion Contender 🏆
     - `A-Tier (80 - 89)`: Top Finalist 🥇
     - `B-Tier (70 - 79)`: Strong Prototype 🥈
     - `C-Tier (60 - 69)`: Promising MVP 🥉
     - `D-Tier (< 60)`: Needs Polish 💡
   - **Actionable Critique**:
     - ✓ Detected Strengths
     - ⚠ Areas for Improvement & Vulnerabilities
     - 💡 Strategic Hackathon Winning Advice for the Finals

3. **Interactive Scorecard & Deliberation Modal**:
   - Deliberation animation scanner simulating real-time multi-criteria judicial evaluation.
   - Circular progress score ring and sub-score progress bars.
   - Instant "Copy Score Report" and "Visit GitHub / Demo" actions.

4. **Live Leaderboard & Podium**:
   - Top 3 Podium (1st, 2nd, 3rd with Gold, Silver, Bronze badges).
   - Category filtering: All, AI/ML, Web, Mobile App, Cybersecurity, IoT, Blockchain.
   - Real-time search across titles, authors, and tech stacks.
   - Sorting options: Highest Score, Innovation, Technical Execution, Impact, Newest.

5. **User Authentication & Session Management (`loginpage.html`)**:
   - Registration modal with password validation and `localStorage` persistence.
   - "⚡ Quick Demo Login" button to test instantly without manual typing.
   - "My Submissions" tab showing user-specific submissions with delete & scorecard review options.

---

## 🚀 How to Run

### Method 1: Open Directly in Browser (No Server Required)
Simply double-click or open `projectsub.html` or `loginpage.html` in any web browser (Chrome, Edge, Firefox, Safari).

### Method 2: Run with Python Local Server
```bash
cd "C:\Users\LOQ\.gemini\antigravity\scratch\hackathon-judge-hub"
python server.py
```
This serves the project at `http://localhost:8000/projectsub.html`.

---

## 📁 Project Structure

```
hackathon-judge-hub/
│
├── loginpage.html      # Authentication & registration page
├── projectsub.html     # Main submission portal, leaderboard, & scorecard modal
├── index.html          # Entry router redirecting to projectsub.html
├── evaluator.js        # Core hackathon judging algorithm & feedback generator
├── sample-data.js      # Seed hackathon projects (AI, Cyber, IoT, Blockchain, Web)
├── server.py           # Optional Python web server
└── README.md           # Documentation
```
