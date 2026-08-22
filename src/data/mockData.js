import { RUBRIC_BADGE_DEFINITIONS } from '../types/index.js';

export const INITIAL_SOURCES = [
  {
    id: 'src-1',
    title: 'Moral Machines: Teaching Robots Right from Wrong',
    author: 'Wendell Wallach & Colin Allen',
    year: 2009,
    type: 'primary',
    tokenCount: 4200,
    activeGrounding: true,
    excerpt: 'Top-down ethical frameworks apply explicit moral theories (e.g. Kantian deontology or Benthamite utilitarianism) to automated decision rules, whereas bottom-up approaches rely on machine learning from human behavioral datasets.',
    fullText: `Excerpt from Chapter 4: Top-Down vs. Bottom-Up Ethical Architectures

Automated decision systems operating in high-stakes domains like healthcare triage must resolve competing moral directives. A top-down approach embeds explicit ethical principles into the decision tree—such as maximizing overall QALYs (utilitarianism) or adhering strictly to non-discrimination rights (deontology).

However, top-down utilitarian algorithms risk systematically marginalizing vulnerable populations with chronic conditions. Conversely, bottom-up neural architectures learn preferences from historical human decisions, which frequently encode implicit racial, socio-economic, and gender biases. True moral autonomy requires hybrid architectures with explicit human clinician override mechanisms.`
  },
  {
    id: 'src-2',
    title: 'Dissecting Racial Bias in an Algorithm Used to Manage the Health of Populations',
    author: 'Ziad Obermeyer, Brian Powers, Christine Vogeli, & Sendhil Mullainathan',
    year: 2019,
    type: 'primary',
    tokenCount: 6800,
    activeGrounding: true,
    excerpt: 'The algorithm predicted healthcare costs rather than illness. Because less money is spent on Black patients due to unequal access to care, the algorithm falsely concluded that Black patients were healthier than equally sick White patients.',
    fullText: `Science, Vol 366, Issue 6464, pp. 447-453 (2019)

ABSTRACT & MAIN FINDINGS:
Commercial prediction algorithms applied to over 200 million people in US healthcare systems suffer from severe racial bias. At a given risk score, Black patients are considerably sicker than White patients.

ROOT CAUSE ANALYSIS:
The bias occurs because the algorithm relies on healthcare expenditures as a proxy for healthcare needs. Due to systemic barriers, insurance disparities, and unequal access, historical spending on Black patients is significantly lower per capita than on White patients with identical disease burdens. 

CORRECTIVE REFORM:
Remediating this bias does not require discarding algorithmic triage altogether; rather, it requires substituting the target outcome variable. Changing the prediction target from health spend ($) to actual health outcomes (e.g., number of active chronic conditions, avoidable emergency room visits) eliminated 84% of the racial disparity in risk scoring.`
  },
  {
    id: 'src-3',
    title: 'Ethics and Governance of Artificial Intelligence for Health',
    author: 'World Health Organization (WHO)',
    year: 2021,
    type: 'secondary',
    tokenCount: 8500,
    activeGrounding: true,
    excerpt: 'WHO Guidance outlines 6 core principles: (1) Protecting autonomy, (2) Promoting human safety, (3) Ensuring transparency, (4) Fostering responsibility, (5) Ensuring inclusiveness, and (6) Promoting responsive AI.',
    fullText: `WHO Guidance Publication (2021) - Executive Summary

Core Principle 5: Inclusiveness and Equity
AI systems for health must be designed to encourage equitable distribution of medical benefits regardless of age, sex, gender, race, or disability status.

Automated triage algorithms must explicitly exclude raw Quality-Adjusted Life Years (DALYs/QALYs) as sole automated exclusion filters during crisis resource allocation, as QALY metrics inherently discriminate against individuals with pre-existing disabilities. Continuous human clinical oversight and algorithmic audibility remain mandatory legal requirements for public health deployments.`
  }
];

export const INITIAL_SUBMISSIONS = [
  {
    id: 'sub-elena-01',
    studentName: 'Elena Rostova',
    studentEmail: 'elena.rostova@university.edu',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    assignmentTitle: 'Ethics of Autonomous Decision Systems in Healthcare Triage',
    courseCode: 'ETH-402',
    submittedAt: '2026-08-20T14:32:00Z',
    rubricBadges: [
      RUBRIC_BADGE_DEFINITIONS.EXEMPLARY_INTERROGATOR,
      RUBRIC_BADGE_DEFINITIONS.HALLUCINATION_AUDITOR,
      RUBRIC_BADGE_DEFINITIONS.DEEP_BRANCHING
    ],
    sources: INITIAL_SOURCES,
    promptTree: [
      {
        nodeId: 'elena-node-1',
        parentId: null,
        branchName: 'main',
        role: 'user',
        content: 'I am drafting my final essay on algorithmic triage in emergency healthcare. Can you summarize how Obermeyer et al. (2019) identify proxy variable bias, and outline Wallach & Allen\'s framework for ethical guardrails?',
        timestamp: '2026-08-19T10:15:00Z',
        isPinnedMilestone: false,
        milestoneNote: null,
        milestoneCategory: null,
        groundingSourceIds: ['src-1', 'src-2'],
        hallucinationFlag: null
      },
      {
        nodeId: 'elena-node-2',
        parentId: 'elena-node-1',
        branchName: 'main',
        role: 'assistant',
        content: 'Obermeyer et al. (2019) demonstrate that commercial triage algorithms exhibit severe racial bias because they use annual healthcare expenditure ($) as a proxy variable for healthcare need. Because systemic inequalities lead to lower spending on Black patients, the algorithm predicts Black patients need less care. Wallach & Allen (2009) propose distinguishing between top-down ethical systems (rules-based frameworks like utilitarianism or deontology) and bottom-up learning systems (pattern recognition from historical data).',
        timestamp: '2026-08-19T10:15:30Z',
        isPinnedMilestone: false,
        milestoneNote: null,
        milestoneCategory: null,
        groundingSourceIds: ['src-1', 'src-2'],
        hallucinationFlag: null
      },
      {
        nodeId: 'elena-node-3',
        parentId: 'elena-node-2',
        branchName: 'main',
        role: 'user',
        content: 'Based on Obermeyer et al., what specific proxy variables cause racial disparity in healthcare risk algorithms, and how can policy frameworks mitigate this without abandoning automated triage?',
        timestamp: '2026-08-19T10:18:00Z',
        isPinnedMilestone: true,
        milestoneNote: 'Identified the core technical root cause of proxy variable distortion (spending vs. health need).',
        milestoneCategory: 'Thesis Shift',
        groundingSourceIds: ['src-2'],
        hallucinationFlag: null
      },
      {
        nodeId: 'elena-node-4',
        parentId: 'elena-node-3',
        branchName: 'main',
        role: 'assistant',
        content: 'The core proxy variable flaw is predicting healthcare cost rather than illness. The authors remediate this bias by changing the target variable from spend ($) to active illness markers (e.g. count of chronic conditions or emergency visits), which eliminated 84% of the racial disparity without lowering overall predictive accuracy.',
        timestamp: '2026-08-19T10:18:45Z',
        isPinnedMilestone: false,
        milestoneNote: null,
        milestoneCategory: null,
        groundingSourceIds: ['src-2'],
        hallucinationFlag: null
      },
      {
        nodeId: 'elena-node-5',
        parentId: 'elena-node-4',
        branchName: 'main',
        role: 'user',
        content: 'Did Obermeyer et al. propose a specific 5-stage regulatory checklist called the "Digital Hippocratic Protocol" in their 2019 Science paper?',
        timestamp: '2026-08-19T10:22:00Z',
        isPinnedMilestone: false,
        milestoneNote: null,
        milestoneCategory: null,
        groundingSourceIds: ['src-2'],
        hallucinationFlag: null
      },
      {
        nodeId: 'elena-node-6',
        parentId: 'elena-node-5',
        branchName: 'main',
        role: 'assistant',
        content: 'Yes! Obermeyer et al. (2019) explicitly proposed the "Digital Hippocratic Protocol" on page 448 of their Science paper, outlining five mandatory pre-deployment audit stages for hospital triage software to enforce racial equity.',
        timestamp: '2026-08-19T10:22:30Z',
        isPinnedMilestone: false,
        milestoneNote: null,
        milestoneCategory: null,
        groundingSourceIds: ['src-2'],
        hallucinationFlag: {
          flagged: true,
          reason: 'Fabricated protocol name ("Digital Hippocratic Protocol") and fake page attribution not found in Obermeyer et al. (2019).',
          resolution: 'Student verified primary Science paper text and corrected the assistant in turn elena-node-7.',
          sourceRefId: 'src-2',
          instructorApproved: true
        }
      },
      {
        nodeId: 'elena-node-7',
        parentId: 'elena-node-6',
        branchName: 'main',
        role: 'user',
        content: 'I checked the Obermeyer et al. (2019) text directly. The paper does NOT mention any "Digital Hippocratic Protocol" or page 448. The paper focuses strictly on changing the outcome variable from healthcare expenditures to health markers. Please correct your assertion.',
        timestamp: '2026-08-19T10:25:00Z',
        isPinnedMilestone: true,
        milestoneNote: 'Audit Catch #1: Identified synthetic citation/protocol and forced AI correction using primary text.',
        milestoneCategory: 'Hallucination Catch',
        groundingSourceIds: ['src-2'],
        hallucinationFlag: null
      },
      {
        nodeId: 'elena-node-8',
        parentId: 'elena-node-7',
        branchName: 'main',
        role: 'assistant',
        content: 'Apologies for the error. You are completely correct. Obermeyer et al. (2019) did not propose a "Digital Hippocratic Protocol". Their actual recommendation was replacing healthcare spending as the target outcome variable with chronic condition counts and avoidable emergency room visits.',
        timestamp: '2026-08-19T10:25:40Z',
        isPinnedMilestone: false,
        milestoneNote: null,
        milestoneCategory: null,
        groundingSourceIds: ['src-2'],
        hallucinationFlag: null
      },
      // Branch 2: Counterfactual test
      {
        nodeId: 'elena-node-9',
        parentId: 'elena-node-4',
        branchName: 'counterfactual-test',
        role: 'user',
        content: 'Let\'s test a counterfactual scenario: If an AI algorithm strictly uses Wallach & Allen\'s top-down utilitarian triage model during a pandemic ICU bed shortage, what failure modes emerge when encountering patients with pre-existing disabilities?',
        timestamp: '2026-08-19T11:05:00Z',
        isPinnedMilestone: true,
        milestoneNote: 'Explored counterfactual ethical branch testing utilitarian algorithms against disability rights.',
        milestoneCategory: 'Counterfactual Test',
        groundingSourceIds: ['src-1', 'src-3'],
        hallucinationFlag: null
      },
      {
        nodeId: 'elena-node-10',
        parentId: 'elena-node-9',
        branchName: 'counterfactual-test',
        role: 'assistant',
        content: 'Under a strict top-down utilitarian triage model (maximizing aggregate QALYs), patients with chronic disabilities or shorter baseline life expectancies are systematically deprioritized for ICU beds. This creates a severe ethical conflict with non-discrimination principles, as algorithms treat pre-existing disability as a negative efficiency metric.',
        timestamp: '2026-08-19T11:05:50Z',
        isPinnedMilestone: false,
        milestoneNote: null,
        milestoneCategory: null,
        groundingSourceIds: ['src-1', 'src-3'],
        hallucinationFlag: null
      },
      // Branch 3: Ethical Edge Case
      {
        nodeId: 'elena-node-11',
        parentId: 'elena-node-10',
        branchName: 'ethical-edge-case',
        role: 'user',
        content: 'Does WHO (2021) guidance recommend using DALY metrics for automated triage in low-resource emergency settings?',
        timestamp: '2026-08-19T11:20:00Z',
        isPinnedMilestone: false,
        milestoneNote: null,
        milestoneCategory: null,
        groundingSourceIds: ['src-3'],
        hallucinationFlag: null
      },
      {
        nodeId: 'elena-node-12',
        parentId: 'elena-node-11',
        branchName: 'ethical-edge-case',
        role: 'assistant',
        content: 'WHO 2021 Section 4.2 states that Disability-Adjusted Life Years (DALYs) are the mandatory objective metric for AI triage models in low-resource hospitals.',
        timestamp: '2026-08-19T11:20:30Z',
        isPinnedMilestone: false,
        milestoneNote: null,
        milestoneCategory: null,
        groundingSourceIds: ['src-3'],
        hallucinationFlag: {
          flagged: true,
          reason: 'Inverted WHO position. WHO 2021 explicitly warns AGAINST automated DALY/QALY triage filters.',
          resolution: 'Student cross-referenced WHO Principle 5 and refuted AI claim in elena-node-13.',
          sourceRefId: 'src-3',
          instructorApproved: true
        }
      },
      {
        nodeId: 'elena-node-13',
        parentId: 'elena-node-12',
        branchName: 'ethical-edge-case',
        role: 'user',
        content: 'That is incorrect. WHO (2021) Section 5 explicitly warns that automated DALY filters exacerbate structural inequality against disabled patients and mandates continuous human clinician oversight. Synthesize a balanced recommendation integrating Obermeyer\'s metric reform and WHO\'s human-in-the-loop governance.',
        timestamp: '2026-08-19T11:24:00Z',
        isPinnedMilestone: true,
        milestoneNote: 'Audit Catch #2: Corrected WHO guidance misquote and established dual-layer governance framework.',
        milestoneCategory: 'Source Conflict',
        groundingSourceIds: ['src-2', 'src-3'],
        hallucinationFlag: null
      },
      {
        nodeId: 'elena-node-14',
        parentId: 'elena-node-13',
        branchName: 'ethical-edge-case',
        role: 'assistant',
        content: 'A robust governance framework requires two complementary pillars: (1) Technical Metric Reform (replacing cost proxies with health outcome predictors as shown by Obermeyer et al.), and (2) Human-in-the-Loop Safeguards (enforcing WHO Principle 5 by prohibiting automated DALY filters and retaining human clinician override authority).',
        timestamp: '2026-08-19T11:25:00Z',
        isPinnedMilestone: true,
        milestoneNote: 'Final synthesis milestone connecting metric engineering to ethical governance policy.',
        milestoneCategory: 'Synthesis',
        groundingSourceIds: ['src-1', 'src-2', 'src-3'],
        hallucinationFlag: null
      }
    ],
    pinnedMilestones: [
      {
        nodeId: 'elena-node-3',
        title: 'Thesis Scoping: Proxy Variable Bias Identification',
        reflectionNote: 'Identified the core technical root cause of proxy variable distortion (spending vs. health need) in commercial healthcare triage algorithms.',
        category: 'Thesis Shift',
        timestamp: '2026-08-19T10:18:00Z',
        branchName: 'main'
      },
      {
        nodeId: 'elena-node-7',
        title: 'Hallucination Catch #1: Fabricated Protocol Refutation',
        reflectionNote: 'Audit Catch #1: Identified synthetic citation ("Digital Hippocratic Protocol") and forced AI correction using primary text from Obermeyer et al.',
        category: 'Hallucination Catch',
        timestamp: '2026-08-19T10:25:00Z',
        branchName: 'main'
      },
      {
        nodeId: 'elena-node-9',
        title: 'Counterfactual Branching: Utilitarian Triage Stress Test',
        reflectionNote: 'Explored counterfactual ethical branch testing top-down utilitarian algorithms against disability non-discrimination principles.',
        category: 'Counterfactual Test',
        timestamp: '2026-08-19T11:05:00Z',
        branchName: 'counterfactual-test'
      },
      {
        nodeId: 'elena-node-13',
        title: 'Hallucination Catch #2: WHO Policy Inversion Corrected',
        reflectionNote: 'Audit Catch #2: Refuted assistant\'s false claim regarding DALY filters by citing WHO (2021) Principle 5 on human-in-the-loop oversight.',
        category: 'Source Conflict',
        timestamp: '2026-08-19T11:24:00Z',
        branchName: 'ethical-edge-case'
      },
      {
        nodeId: 'elena-node-14',
        title: 'Final Synthesis: Technical Reform & Clinical Governance',
        reflectionNote: 'Final synthesis connecting Obermeyer metric replacement with WHO human-centered clinical override safeguards.',
        category: 'Synthesis',
        timestamp: '2026-08-19T11:25:00Z',
        branchName: 'ethical-edge-case'
      }
    ],
    essayDraft: `### Algorithmic Integrity in Healthcare Triage: From Cost Proxies to Human-Centered Governance

**Introduction**
Automated risk scoring algorithms now dictate resource allocation across major hospital networks. However, as AI systems transition from diagnostic aids to automated gatekeepers, their underlying proxy variables present profound moral challenges [[cite:elena-node-3]].

**Proxy Variable Distortion & Technical Reform**
The primary failure mode in modern healthcare prediction is not mathematical inaccuracy, but flawed proxy target selection. As demonstrated by Obermeyer et al. (2019), commercial algorithms frequently predict annual healthcare expenditure ($) rather than actual patient illness [[cite:elena-node-4]]. Because systemic socio-economic inequalities suppress historical healthcare spending for Black patients, cost-based models falsely conclude that Black patients require less care than White patients with identical disease burdens. Remediating this bias does not require abandoning automated triage; rather, it demands changing the target variable to direct health outcome metrics, which eliminates over 84% of racial disparity [[cite:elena-node-7]].

**Utilitarian Failure Modes in Counterfactual Scenarios**
When evaluating ethical decision architectures, top-down utilitarian models (such as maximizing aggregate life-years) fail under crisis conditions [[cite:elena-node-9]]. In counterfactual simulations, pure utilitarian triage algorithms systematically deprioritize individuals with chronic conditions or disabilities. 

**Policy Synthesis & Human Oversight**
As mandated by World Health Organization (2021) Principle 5, AI systems must refrain from using automated DALY or QALY cutoffs as absolute triage filters [[cite:elena-node-13]]. Sustainable governance requires combining technical metric reform with mandatory clinical human-in-the-loop overrides [[cite:elena-node-14]].`,
    instructorFeedback: {
      score: 97,
      rubricScores: {
        sourceRigor: 98,
        criticalInquiry: 96,
        synthesisTransparency: 97
      },
      comments: 'Exceptional submission. Elena demonstrated rigorous primary source interrogation, successfully caught 2 model hallucinations, and explored complex counterfactual ethical branches.'
    }
  },
  {
    id: 'sub-marcus-02',
    studentName: 'Marcus Vance',
    studentEmail: 'marcus.vance@university.edu',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    assignmentTitle: 'Ethics of Autonomous Decision Systems in Healthcare Triage',
    courseCode: 'ETH-402',
    submittedAt: '2026-08-20T16:10:00Z',
    rubricBadges: [
      RUBRIC_BADGE_DEFINITIONS.LINEAR_LOW_INQUIRY,
      RUBRIC_BADGE_DEFINITIONS.UNCHALLENGED_RELIANCE
    ],
    sources: INITIAL_SOURCES.slice(0, 2),
    promptTree: [
      {
        nodeId: 'marcus-node-1',
        parentId: null,
        branchName: 'main',
        role: 'user',
        content: 'Write an introduction and 3 points explaining why AI in healthcare triage is completely unbiased and superior to human doctors.',
        timestamp: '2026-08-20T15:00:00Z',
        isPinnedMilestone: false,
        milestoneNote: null,
        milestoneCategory: null,
        groundingSourceIds: ['src-1', 'src-2'],
        hallucinationFlag: null
      },
      {
        nodeId: 'marcus-node-2',
        parentId: 'marcus-node-1',
        branchName: 'main',
        role: 'assistant',
        content: 'AI in healthcare triage eliminates human subjective bias, calculates risk instantly based on objective patient data, and reduces hospital wait times dramatically.',
        timestamp: '2026-08-20T15:00:30Z',
        isPinnedMilestone: false,
        milestoneNote: null,
        milestoneCategory: null,
        groundingSourceIds: ['src-1', 'src-2'],
        hallucinationFlag: null
      },
      {
        nodeId: 'marcus-node-3',
        parentId: 'marcus-node-2',
        branchName: 'main',
        role: 'user',
        content: 'Expand on point 2 and give me quotes from Obermeyer et al. 2019 showing how AI eliminated all racial bias.',
        timestamp: '2026-08-20T15:05:00Z',
        isPinnedMilestone: false,
        milestoneNote: null,
        milestoneCategory: null,
        groundingSourceIds: ['src-2'],
        hallucinationFlag: null
      },
      {
        nodeId: 'marcus-node-4',
        parentId: 'marcus-node-3',
        branchName: 'main',
        role: 'assistant',
        content: 'Obermeyer et al. (2019) proved that algorithmic risk scores achieve 99.8% racial neutrality when deployed across commercial hospital systems, demonstrating that algorithms are far superior to human doctors.',
        timestamp: '2026-08-20T15:05:40Z',
        isPinnedMilestone: false,
        milestoneNote: null,
        milestoneCategory: null,
        groundingSourceIds: ['src-2'],
        hallucinationFlag: {
          flagged: true,
          reason: 'Severe hallucination: Assistant claimed 99.8% racial neutrality. Obermeyer et al. actually proved the exact OPPOSITE (severe racial bias due to cost proxies). Marcus accepted this fake claim without verification.',
          resolution: 'Unchallenged. Marcus pasted this fake claim directly into his final essay.',
          sourceRefId: 'src-2',
          instructorApproved: false
        }
      },
      {
        nodeId: 'marcus-node-5',
        parentId: 'marcus-node-4',
        branchName: 'main',
        role: 'user',
        content: 'Combine these points into a short essay conclusion.',
        timestamp: '2026-08-20T15:10:00Z',
        isPinnedMilestone: true,
        milestoneNote: 'Summarized AI findings into final paper conclusion.',
        milestoneCategory: 'Synthesis',
        groundingSourceIds: ['src-2'],
        hallucinationFlag: null
      },
      {
        nodeId: 'marcus-node-6',
        parentId: 'marcus-node-5',
        branchName: 'main',
        role: 'assistant',
        content: 'In conclusion, healthcare triage AI removes subjective human prejudice and ensures perfectly objective hospital management.',
        timestamp: '2026-08-20T15:10:30Z',
        isPinnedMilestone: false,
        milestoneNote: null,
        milestoneCategory: null,
        groundingSourceIds: ['src-2'],
        hallucinationFlag: null
      }
    ],
    pinnedMilestones: [
      {
        nodeId: 'marcus-node-5',
        title: 'Superficial Conclusion Generation',
        reflectionNote: 'Summarized AI findings into final paper conclusion without cross-examining Obermeyer et al.',
        category: 'Synthesis',
        timestamp: '2026-08-20T15:10:00Z',
        branchName: 'main'
      }
    ],
    essayDraft: `### The Unbiased Future: Why AI Triage Outperforms Human Clinicians

Artificial intelligence in healthcare eliminates human subjective bias and provides completely neutral decisions. 

As shown in research by Obermeyer et al. (2019), commercial risk scores achieve 99.8% racial neutrality when deployed in hospitals [[cite:marcus-node-4]]. By removing human emotion, AI ensures that resources are distributed purely on objective merit [[cite:marcus-node-5]]. 

Therefore, hospitals should immediately adopt fully automated triage algorithms without requiring human doctor intervention.`,
    instructorFeedback: {
      score: 52,
      rubricScores: {
        sourceRigor: 45,
        criticalInquiry: 40,
        synthesisTransparency: 50
      },
      comments: 'Warning: Marcus accepted a blatant AI hallucination regarding Obermeyer et al. (which actually proved severe racial bias, not 99.8% neutrality). No counterfactual branching or source interrogation was performed.'
    }
  }
];
