import React from 'react';
import Header from './Header.jsx';
import DevResetOverlay from '../common/DevResetOverlay.jsx';
import { useWorkspace } from '../../context/WorkspaceContext.jsx';

export default function AppLayout({ children }) {
  const { activePerspective, activeSubmission, toast } = useWorkspace();

  return (
    <div className="app-shell">
      {/* Toast Notification Banner */}
      {toast && (
        <div className={`app-toast toast-${toast.type}`}>
          <span className="toast-icon">
            {toast.type === 'success' ? '✅' : toast.type === 'warning' ? '⚠️' : toast.type === 'danger' ? '❌' : 'ℹ️'}
          </span>
          <span className="toast-message">{toast.message}</span>
        </div>
      )}

      {/* Main Global Header */}
      <Header />

      {/* Main View Area */}
      <main className="app-main-content">
        {/* Active Perspective Context Bar */}
        <div className="perspective-context-bar">
          <div className="context-left">
            <span className="context-badge">
              {activePerspective === 'instructor' ? '👨‍🏫 Instructor Evaluation Mode' : '🎓 Student Workspace Mode'}
            </span>
            <h2 className="assignment-title-display">
              {activeSubmission?.assignmentTitle} ({activeSubmission?.courseCode})
            </h2>
          </div>
          <div className="context-right">
            <div className="student-profile-chip">
              <img 
                src={activeSubmission?.studentAvatar} 
                alt={activeSubmission?.studentName} 
                className="student-chip-avatar"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <span className="student-chip-name">{activeSubmission?.studentName}</span>
              <span className="student-chip-date">
                Submitted: {new Date(activeSubmission?.submittedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Content Provided by View/Children */}
        <div className="workspace-view-container">
          {children ? children : (
            <div className="phase-scaffold-placeholder">
              <div className="placeholder-card glass-panel">
                <h3>Workspace Core Initialized</h3>
                <p>
                  Active Perspective: <strong>{activePerspective.toUpperCase()}</strong> | Active Record: <strong>{activeSubmission?.studentName}</strong>
                </p>
                <div className="badges-list">
                  {activeSubmission?.rubricBadges.map((badge, idx) => (
                    <span key={idx} className={`rubric-badge badge-${badge.theme}`}>
                      {badge.icon} {badge.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Dev Reset Overlay Floating Widget */}
      <DevResetOverlay />
    </div>
  );
}
