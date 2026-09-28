/**
 * Hackathon Project Judge & Rating Engine
 * Evaluates projects across 4 core Hackathon pillars:
 * 1. Innovation & Novelty (0 - 25)
 * 2. Technical Execution & Complexity (0 - 25)
 * 3. Real-World Impact & Utility (0 - 25)
 * 4. UX, Design & Presentation (0 - 25)
 * Total: 0 - 100
 */

const HackathonJudge = {
  // Category-specific weights and keywords
  categoryProfiles: {
    'AI': {
      techKeywords: ['neural network', 'pytorch', 'tensorflow', 'llm', 'transformer', 'rag', 'agent', 'gemini', 'gpt', 'vision', 'opencv', 'nlp', 'embedding', 'fastapi', 'onnx', 'cuda', 'huggingface'],
      impactKeywords: ['automation', 'efficiency', 'accuracy', 'healthcare', 'diagnosis', 'productivity', 'accessibility', 'decision making'],
      innovationBonusKeywords: ['multimodal', 'zero-shot', 'fine-tuned', 'real-time inference', 'edge ai', 'autonomous agent']
    },
    'Web': {
      techKeywords: ['react', 'next.js', 'vue', 'node', 'typescript', 'tailwind', 'graphql', 'websockets', 'redis', 'postgresql', 'mongodb', 'docker', 'pwa', 'ssr'],
      impactKeywords: ['users', 'community', 'collaboration', 'e-commerce', 'productivity', 'engagement', 'platform', 'workflow'],
      innovationBonusKeywords: ['real-time synchronization', 'offline-first', 'webassembly', 'micro-frontends', 'zero latency']
    },
    'App': {
      techKeywords: ['flutter', 'react native', 'swift', 'kotlin', 'ios', 'android', 'firebase', 'sqlite', 'sensors', 'geolocation', 'bluetooth'],
      impactKeywords: ['daily use', 'on-the-go', 'accessibility', 'convenience', 'mobile first', 'personalization', 'retention'],
      innovationBonusKeywords: ['ar/vr', 'haptic feedback', 'biometric', 'background sync', 'on-device ml']
    },
    'Cybersecurity': {
      techKeywords: ['encryption', 'zero-trust', 'oauth', 'penetration testing', 'sha-256', 'firewall', 'intrusion detection', 'ids', 'ips', 'audit', 'rsa', 'tls'],
      impactKeywords: ['privacy', 'data breach', 'vulnerability', 'compliance', 'threat prevention', 'fraud', 'identity theft'],
      innovationBonusKeywords: ['quantum-resistant', 'ai threat hunting', 'decentralized identity', 'zero-knowledge proof']
    },
    'IoT': {
      techKeywords: ['arduino', 'esp32', 'raspberry pi', 'sensors', 'mqtt', 'zigbee', 'lorawan', 'c++', 'micropython', 'actuator', 'telemetry', 'firmware'],
      impactKeywords: ['smart home', 'agriculture', 'energy saving', 'remote monitoring', 'industrial automation', 'disaster alert'],
      innovationBonusKeywords: ['edge computing', 'mesh network', 'solar powered', 'low-power wan', 'predictive maintenance']
    },
    'Blockchain': {
      techKeywords: ['solidity', 'smart contract', 'ethereum', 'web3', 'ipfs', 'metamask', 'rust', 'solana', 'hardhat', 'erc-20', 'erc-721', 'dao'],
      impactKeywords: ['transparency', 'decentralization', 'tamper-proof', 'financial inclusion', 'trustless', 'fairness', 'ownership'],
      innovationBonusKeywords: ['zero-knowledge rollup', 'cross-chain bridge', 'gasless transactions', 'account abstraction']
    },
    'Other': {
      techKeywords: ['algorithm', 'database', 'cloud', 'architecture', 'api', 'framework', 'pipeline', 'optimization'],
      impactKeywords: ['solution', 'problem', 'benefit', 'scale', 'practical', 'impact', 'community'],
      innovationBonusKeywords: ['novel paradigm', 'hybrid system', 'cross-domain', 'efficiency breakthrough']
    }
  },

  /**
   * Main Evaluation Function
   * @param {Object} projectData
   * @returns {Object} detailed score and feedback
   */
  rateProject(projectData) {
    const title = (projectData.project || projectData.name || '').trim();
    const category = projectData.category || 'Other';
    const desc = (projectData.description || '').trim();
    const github = (projectData.github || '').trim();
    const stack = (projectData.techStack || '').toLowerCase();
    const features = (projectData.features || '').toLowerCase();
    const fullText = `${title} ${desc} ${stack} ${features}`.toLowerCase();

    const profile = this.categoryProfiles[category] || this.categoryProfiles['Other'];

    // 1. INNOVATION & NOVELTY (Max 25)
    let innovationScore = 14; // Base score
    // Check description depth
    if (desc.length > 250) innovationScore += 3;
    if (desc.length > 500) innovationScore += 2;
    // Check innovation bonus keywords
    let matchedInnovation = profile.innovationBonusKeywords.filter(k => fullText.includes(k));
    innovationScore += Math.min(matchedInnovation.length * 2, 5);
    // Uniqueness indicators
    if (fullText.includes('first-of-its-kind') || fullText.includes('novel') || fullText.includes('autonomous') || fullText.includes('automated')) {
      innovationScore += 1;
    }
    innovationScore = Math.min(25, Math.max(8, innovationScore));

    // 2. TECHNICAL EXECUTION & COMPLEXITY (Max 25)
    let techScore = 13;
    // Check tech keyword richness
    let matchedTech = profile.techKeywords.filter(k => fullText.includes(k));
    techScore += Math.min(matchedTech.length * 2, 6);
    // Tech stack explicit declaration
    if (stack.length > 15) techScore += 2;
    // GitHub repository link presence
    if (github && (github.startsWith('http://') || github.startsWith('https://'))) {
      techScore += 3;
      if (github.includes('github.com') || github.includes('gitlab.com')) {
        techScore += 1;
      }
    }
    // Architecture or data mentions
    if (fullText.includes('api') || fullText.includes('database') || fullText.includes('backend') || fullText.includes('pipeline')) {
      techScore += 1;
    }
    techScore = Math.min(25, Math.max(7, techScore));

    // 3. REAL-WORLD IMPACT & UTILITY (Max 25)
    let impactScore = 14;
    let matchedImpact = profile.impactKeywords.filter(k => fullText.includes(k));
    impactScore += Math.min(matchedImpact.length * 2.5, 7);
    if (fullText.includes('user') || fullText.includes('solve') || fullText.includes('reduce') || fullText.includes('save') || fullText.includes('help')) {
      impactScore += 2;
    }
    if (desc.length > 180) impactScore += 2;
    impactScore = Math.round(Math.min(25, Math.max(9, impactScore)));

    // 4. UX, POLISH & PRESENTATION (Max 25)
    let presentationScore = 14;
    // Well formatted description
    if (desc.split('\n').length > 2 || desc.includes('.') && desc.split('.').length > 3) {
      presentationScore += 3;
    }
    if (title.length >= 4 && title.length <= 40) presentationScore += 2;
    if (github) presentationScore += 3;
    if (projectData.hasFile) presentationScore += 2;
    presentationScore = Math.round(Math.min(25, Math.max(8, presentationScore)));

    // Deterministic tweak based on hash of title to give unique character
    const hashBonus = this._hashString(title + desc) % 4; // 0 to 3
    innovationScore = Math.min(25, innovationScore + (hashBonus === 1 ? 1 : 0));
    techScore = Math.min(25, techScore + (hashBonus === 2 ? 1 : 0));
    impactScore = Math.min(25, impactScore + (hashBonus === 3 ? 1 : 0));

    innovationScore = Math.round(innovationScore);
    techScore = Math.round(techScore);
    impactScore = Math.round(impactScore);
    presentationScore = Math.round(presentationScore);

    const totalScore = Math.round(innovationScore + techScore + impactScore + presentationScore);

    // Badges & Rank tier
    let tier = 'B';
    let badge = 'Solid Contender';
    let badgeColor = '#3b82f6';

    if (totalScore >= 90) {
      tier = 'S';
      badge = 'Grand Champion Contender 🏆';
      badgeColor = '#d7ff5e'; // Lime
    } else if (totalScore >= 80) {
      tier = 'A';
      badge = 'Top Finalist 🥇';
      badgeColor = '#10b981'; // Green
    } else if (totalScore >= 70) {
      tier = 'B';
      badge = 'Strong Prototype 🥈';
      badgeColor = '#06b6d4'; // Cyan
    } else if (totalScore >= 60) {
      tier = 'C';
      badge = 'Promising MVP 🥉';
      badgeColor = '#f59e0b'; // Amber
    } else {
      tier = 'D';
      badge = 'Needs Polish 💡';
      badgeColor = '#ef4444'; // Red
    }

    // Feedback Generation
    const feedback = this._generateFeedback({
      title,
      category,
      totalScore,
      innovationScore,
      techScore,
      impactScore,
      presentationScore,
      matchedTech,
      matchedInnovation,
      matchedImpact,
      github,
      desc
    });

    return {
      scores: {
        innovation: innovationScore,
        technical: techScore,
        impact: impactScore,
        presentation: presentationScore,
        total: totalScore
      },
      maxScores: {
        innovation: 25,
        technical: 25,
        impact: 25,
        presentation: 25,
        total: 100
      },
      percentages: {
        innovation: Math.round((innovationScore / 25) * 100),
        technical: Math.round((techScore / 25) * 100),
        impact: Math.round((impactScore / 25) * 100),
        presentation: Math.round((presentationScore / 25) * 100),
        total: totalScore
      },
      tier,
      badge,
      badgeColor,
      strengths: feedback.strengths,
      weaknesses: feedback.weaknesses,
      winningTips: feedback.winningTips,
      judgeVerdict: feedback.judgeVerdict,
      evaluatedAt: new Date().toISOString()
    };
  },

  _generateFeedback(data) {
    const strengths = [];
    const weaknesses = [];
    const winningTips = [];

    // Evaluate Strengths
    if (data.innovationScore >= 20) {
      strengths.push(`Distinctive innovation angle in ${data.category}: tackles an original problem vector with strong creative thinking.`);
    } else {
      strengths.push(`Clearly identified user demand in the ${data.category} landscape.`);
    }

    if (data.techScore >= 20) {
      strengths.push(`High technical rigor: solid architecture incorporating modern tools (${data.matchedTech.slice(0, 3).join(', ') || 'robust stack'}).`);
    } else if (data.github) {
      strengths.push(`Live repository provided, demonstrating codebase transparency and working implementation.`);
    } else {
      strengths.push(`Logical workflow structure from problem framing to proposed technical solution.`);
    }

    if (data.impactScore >= 20) {
      strengths.push(`Immediate real-world value: strong practical utility with clear metrics for scaling.`);
    }

    if (data.presentationScore >= 21) {
      strengths.push(`Crisp and coherent documentation with persuasive problem-solution alignment.`);
    }

    // Evaluate Areas for Improvement
    if (!data.github) {
      weaknesses.push(`No public GitHub or demo URL submitted: judges place heavy weight on code verification.`);
      winningTips.push(`Add a public GitHub repo with a clean README, GIF demo, and setup instructions.`);
    }

    if (data.techScore < 18) {
      weaknesses.push(`Technical architecture details are brief; clarify data flow, backend frameworks, and APIs used.`);
      winningTips.push(`Include a system architecture diagram and explain concurrency, latency, or scaling choices.`);
    }

    if (data.innovationScore < 18) {
      weaknesses.push(`Competitive differentiation could be sharper: differentiate clearly from existing mainstream tools.`);
      winningTips.push(`Highlight your "secret sauce" (e.g., 10x faster, zero-cost, localized data processing, or custom pipeline).`);
    }

    if (data.impactScore < 18) {
      weaknesses.push(`Quantifiable impact metrics (e.g. time saved, cost reduction, target user demographic) are not stated.`);
      winningTips.push(`Add 1 or 2 concrete metrics in your pitch: "Reduces workflow time by 60% for 50,000 potential users".`);
    }

    if (winningTips.length < 2) {
      winningTips.push(`Prepare a crisp 90-second video demo showing an end-to-end user journey for the final hackathon pitch.`);
      winningTips.push(`Rehearse handling judge Q&A on edge-case scenarios and production deployment feasibility.`);
    }

    // Judge Verdict Summary
    let verdict = "";
    if (data.totalScore >= 88) {
      verdict = `Outstanding submission! "${data.title}" exhibits high technical maturity, great domain execution in ${data.category}, and substantial market relevance. Prime contender for top honors.`;
    } else if (data.totalScore >= 78) {
      verdict = `Impressive hackathon project with solid fundamentals and a viable implementation. With a slightly sharper demo pitch and architecture breakdown, this can contest for top podium placement.`;
    } else if (data.totalScore >= 68) {
      verdict = `Good working prototype with clear functional intent. Strengthening the technical depth and adding benchmark metrics will elevate it significantly.`;
    } else {
      verdict = `Promising early-stage concept. Needs further technical implementation depth, a public code repository, and more tangible proof-of-concept validation.`;
    }

    return { strengths, weaknesses, winningTips, judgeVerdict: verdict };
  },

  _hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }
};

// Export for browser & node
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HackathonJudge;
} else if (typeof window !== 'undefined') {
  window.HackathonJudge = HackathonJudge;
}
