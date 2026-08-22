import React from 'react';
import { useWorkspace } from '../../context/WorkspaceContext.jsx';

export default function Header() {
  const {
    submissions,
    activeSubmission,
    activeSubmissionId,
    activePerspective,
    selectSubmission,
    togglePerspective
  } = useWorkspace();

  if (!activeSubmission) return null;

  // Calculate quick metrics for active submission
  const totalMilestones = activeSubmission.pinnedMilestones?.length || 0;
  const totalHallucinations = activeSubmission.promptTree?.filter(n => n.hallucinationFlag?.flagged).length || 0;
  const verifiedHallucinations = activeSubmission.promptTree?.filter(n => n.hallucinationFlag?.flagged && n.hallucinationFlag?.instructorApproved).length || 0;
  const activeSources = activeSubmission.sources?.length || 0;

  return (
    <header className="app-header">
      <div className="header-brand-section">
        <div className="header-logo-icon">🎓</div>
        <div className="header-title-block">
          <h1 className="header-title">AI University Workspace</h1>
          <span className="header-subtitle">Process-Oriented Academic Integrity Platform</span>
        </div>
      </div>

      {/* Perspective Toggle Switch */}
      <div className="perspective-toggle-container">
        <button
          className={`perspective-btn ${activePerspective === 'instructor' ? 'active instructor' : ''}`}
          onClick={() => togglePerspective('instructor')}
          title="Switch to Instructor Evaluation Dashboard"
        >
          <span className="perspective-icon">👨‍🏫</span>
          <span className="perspective-text">Instructor Evaluation</span>
        </button>

        <button
          className={`perspective-btn ${activePerspective === 'student' ? 'active student' : ''}`}
          onClick={() => togglePerspective('student')}
          title="Switch to Student Educational Workspace"
        >
          <span className="perspective-icon">🎓</span>
          <span className="perspective-text">Student Workspace</span>
        </button>
      </div>

      {/* Right Controls: Submission Selector & Quick Metrics */}
      <div className="header-controls">
        <div className="student-selector-wrapper">
          <label htmlFor="student-select" className="student-selector-label">
            Active Record:
          </label>
          <select
            id="student-select"
            className="student-select-dropdown"
            value={activeSubmissionId}
            onChange={(e) => selectSubmission(e.target.value)}
          >
            {submissions.map(sub => (
              <option key={sub.id} value={sub.id}>
                {sub.studentName} ({sub.rubricBadges[0]?.label || 'Submission'})
              </option>
            ))}
          </select>
        </div>

        {/* Quick Metrics Pills */}
        <div className="header-metrics-bar">
          <div className="metric-pill" title="Curated line-of-inquiry milestones">
            <span className="metric-icon">📌</span>
            <span className="metric-label">Milestones:</span>
            <strong className="metric-value">{totalMilestones}/5</strong>
          </div>

          <div className={`metric-pill ${totalHallucinations > 0 ? 'highlight-warning' : ''}`} title="Audited AI hallucinations">
            <span className="metric-icon">🛡️</span>
            <span className="metric-label">Hallucinations:</span>
            <strong className="metric-value">{totalHallucinations} ({verifiedHallucinations} Verified)</strong>
          </div>

          <div className="metric-pill" title="Grounding course sources attached">
            <span className="metric-icon">📚</span>
            <span className="metric-label">Sources:</span>
            <strong className="metric-value">{activeSources}</strong>
          </div>
        </div>
      </div>
    </header>
  );
}
