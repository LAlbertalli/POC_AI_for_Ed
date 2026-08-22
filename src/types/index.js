/**
 * JSDoc Schema Definitions for AI University Educational Workspace
 */

/**
 * @typedef {'primary' | 'secondary'} SourceType
 */

/**
 * @typedef {Object} SourceDocument
 * @property {string} id - Unique source document identifier (e.g. 'src-1')
 * @property {string} title - Document title
 * @property {string} author - Author(s) name
 * @property {number} year - Publication year
 * @property {string} type - Document type: 'primary' or 'secondary'
 * @property {number} tokenCount - Estimated token count of source material
 * @property {string} excerpt - Representative text excerpt or summary
 * @property {string} fullText - Complete text of source document
 * @property {boolean} activeGrounding - Whether source is active for AI grounding
 */

/**
 * @typedef {Object} HallucinationFlag
 * @property {boolean} flagged - Whether turn contains a flagged hallucination
 * @property {string} reason - Detailed explanation of why the claim is inaccurate/hallucinated
 * @property {string} resolution - How the student refuted or corrected the claim
 * @property {string} sourceRefId - ID of supporting source document used to refute
 * @property {boolean} instructorApproved - Whether instructor verified the catch
 */

/**
 * @typedef {Object} PromptNode
 * @property {string} nodeId - Unique node ID (e.g. 'elena-node-1')
 * @property {string|null} parentId - Parent node ID or null for root
 * @property {string} branchName - Branch identifier (e.g. 'main', 'counterfactual-test', 'ethical-edge-case')
 * @property {'user' | 'assistant'} role - Turn sender role
 * @property {string} content - Message text content
 * @property {string} timestamp - ISO timestamp or formatted relative string
 * @property {boolean} isPinnedMilestone - Whether student pinned this turn as a milestone
 * @property {string|null} milestoneNote - Student's reflective note explaining significance
 * @property {string|null} milestoneCategory - Milestone type: 'Thesis Shift' | 'Source Conflict' | 'Counterfactual Test' | 'Hallucination Catch' | 'Synthesis'
 * @property {string[]} groundingSourceIds - IDs of sources active or referenced in this turn
 * @property {HallucinationFlag|null} hallucinationFlag - Hallucination audit metadata
 */

/**
 * @typedef {Object} PinnedMilestone
 * @property {string} nodeId - Associated prompt tree node ID
 * @property {string} title - Brief milestone headline
 * @property {string} reflectionNote - Reflective explanation for instructor
 * @property {string} category - Milestone category
 * @property {string} timestamp - Timestamp when turn occurred
 * @property {string} branchName - Branch where milestone occurred
 */

/**
 * @typedef {Object} RubricBadge
 * @property {string} label - Display label (e.g., 'Exemplary Source Interrogator')
 * @property {'green' | 'coral' | 'violet' | 'amber' | 'blue'} theme - Color badge theme
 * @property {string} description - Hover tooltip explanation
 * @property {string} icon - Emoji icon
 */

/**
 * @typedef {Object} StudentSubmission
 * @property {string} id - Unique submission identifier (e.g., 'sub-elena-01')
 * @property {string} studentName - Full student name
 * @property {string} studentEmail - Academic email address
 * @property {string} studentAvatar - Avatar image URL or fallback color/initials
 * @property {string} assignmentTitle - Course assignment title
 * @property {string} courseCode - Course code (e.g. 'ETH-402')
 * @property {string} submittedAt - ISO submission timestamp
 * @property {RubricBadge[]} rubricBadges - Qualitative evaluation badges
 * @property {SourceDocument[]} sources - Assigned and student-uploaded source documents
 * @property {PromptNode[]} promptTree - Complete branching prompt tree
 * @property {PinnedMilestone[]} pinnedMilestones - Student-curated line of inquiry milestones
 * @property {string} essayDraft - Final submitted essay text containing [[cite:node-id]] citations
 * @property {Object} instructorFeedback - Instructor grading & feedback object
 */

export const RUBRIC_BADGE_DEFINITIONS = {
  EXEMPLARY_INTERROGATOR: {
    label: 'Exemplary Source Interrogator',
    theme: 'green',
    icon: '🔍',
    description: 'Extensively cross-examined AI assertions against primary literature and verified empirical evidence.'
  },
  HALLUCINATION_AUDITOR: {
    label: 'Hallucination Auditor',
    theme: 'coral',
    icon: '🛡️',
    description: 'Successfully identified synthetic citations or false claims and forced model correction with primary sources.'
  },
  DEEP_BRANCHING: {
    label: 'Deep Branching',
    theme: 'violet',
    icon: '🌿',
    description: 'Explored multiple non-linear inquiry branches including counterfactual stress tests and edge cases.'
  },
  LINEAR_LOW_INQUIRY: {
    label: 'Linear / Low Inquiry',
    theme: 'amber',
    icon: '⚡',
    description: 'Followed a single linear path without testing alternative hypotheses or interrogating claims.'
  },
  UNCHALLENGED_RELIANCE: {
    label: 'Unchallenged AI Reliance',
    theme: 'rose',
    icon: '⚠️',
    description: 'Accepted AI generated claims uncritically, including unverified quotes or synthetic sources.'
  }
};

export const STORAGE_KEY = 'AI_UNIVERSITY_WORKSPACE_DATA';
