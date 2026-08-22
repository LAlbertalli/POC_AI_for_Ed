import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext.jsx';

export default function DevResetOverlay() {
  const { resetToDefaults, submissions } = useWorkspace();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleResetConfirm = () => {
    resetToDefaults();
    setShowConfirmModal(false);
    setIsExpanded(false);
  };

  return (
    <>
      {/* Floating Widget Trigger Badge */}
      <div className="dev-reset-floating-container">
        {!isExpanded ? (
          <button 
            className="dev-reset-trigger-pill"
            onClick={() => setIsExpanded(true)}
            title="Open Demo & Reset Controls"
          >
            <span className="dev-reset-dot"></span>
            <span className="dev-reset-label">Dev Reset & Scenarios</span>
            <span className="dev-reset-shortcut">⚡ Demo Tools</span>
          </button>
        ) : (
          <div className="dev-reset-expanded-card">
            <div className="dev-reset-header">
              <div className="dev-reset-title">
                <span className="dev-icon">⚙️</span>
                <strong>Demo Engine & State Control</strong>
              </div>
              <button 
                className="dev-reset-close-btn"
                onClick={() => setIsExpanded(false)}
                title="Close"
              >
                ✕
              </button>
            </div>
            
            <p className="dev-reset-description">
              Resets client `localStorage` back to pristine initial mock scenarios (Elena Rostova Exemplary & Marcus Vance Unchallenged).
            </p>

            <div className="dev-reset-stats">
              <span className="dev-stat-chip">
                Submissions: <strong>{submissions.length}</strong>
              </span>
              <span className="dev-stat-chip">
                Storage: <strong>Active</strong>
              </span>
            </div>

            <div className="dev-reset-actions">
              <button 
                className="dev-reset-danger-btn"
                onClick={() => setShowConfirmModal(true)}
              >
                🔄 Reset to Default Scenarios
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="dev-modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="dev-modal-content" onClick={e => e.stopPropagation()}>
            <div className="dev-modal-header">
              <h3>⚠️ Confirm State Reset</h3>
              <button className="dev-reset-close-btn" onClick={() => setShowConfirmModal(false)}>✕</button>
            </div>
            <div className="dev-modal-body">
              <p>
                Are you sure you want to reset the educational workspace state? All custom prompt turns, branch additions, and milestone pins added during this session will be reverted to baseline mock data.
              </p>
            </div>
            <div className="dev-modal-footer">
              <button 
                className="dev-btn-secondary" 
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button 
                className="dev-btn-reset-confirm" 
                onClick={handleResetConfirm}
              >
                Confirm Reset Baseline
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
