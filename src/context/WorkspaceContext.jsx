import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadSubmissions, saveSubmissions, resetStorage } from '../services/storage.js';

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ children }) {
  const [submissions, setSubmissions] = useState(() => loadSubmissions());
  const [activeSubmissionId, setActiveSubmissionId] = useState(() => {
    const loaded = loadSubmissions();
    return loaded[0]?.id || 'sub-elena-01';
  });
  const [activePerspective, setActivePerspective] = useState('instructor'); // 'instructor' | 'student'
  const [activeBranch, setActiveBranch] = useState('all'); // 'all' or specific branch name
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [toast, setToast] = useState(null);

  // Helper to show temporary toast notification
  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(current => current?.message === message ? null : current);
    }, duration);
  }, []);

  // Save changes to localStorage whenever submissions state updates
  useEffect(() => {
    if (submissions && submissions.length > 0) {
      saveSubmissions(submissions);
    }
  }, [submissions]);

  // Currently selected active submission object
  const activeSubmission = submissions.find(s => s.id === activeSubmissionId) || submissions[0];

  // Actions
  const selectSubmission = useCallback((id) => {
    setActiveSubmissionId(id);
    setActiveNodeId(null);
    setActiveBranch('all');
    const target = submissions.find(s => s.id === id);
    showToast(`Switched active view to ${target?.studentName || 'Student'}`, 'info');
  }, [submissions, showToast]);

  const togglePerspective = useCallback((overridePerspective) => {
    setActivePerspective(prev => {
      const next = overridePerspective || (prev === 'instructor' ? 'student' : 'instructor');
      showToast(`Switched perspective to ${next === 'instructor' ? 'Instructor Dashboard' : 'Student Workspace'}`, 'info');
      return next;
    });
  }, [showToast]);

  const selectNode = useCallback((nodeId) => {
    setActiveNodeId(prev => prev === nodeId ? null : nodeId);
  }, []);

  const selectBranch = useCallback((branchName) => {
    setActiveBranch(branchName);
  }, []);

  // Add new turn in chat
  const addPromptTurn = useCallback(({ parentId, promptText, groundingSourceIds = [], branchName = 'main' }) => {
    if (!promptText || !promptText.trim()) return;

    setSubmissions(prevSubmissions => {
      return prevSubmissions.map(sub => {
        if (sub.id !== activeSubmissionId) return sub;

        const timeStr = new Date().toISOString();
        const userNodeId = `${sub.studentName.toLowerCase().split(' ')[0]}-node-${Date.now()}`;
        const assistantNodeId = `${sub.studentName.toLowerCase().split(' ')[0]}-node-${Date.now() + 1}`;

        const userNode = {
          nodeId: userNodeId,
          parentId: parentId || null,
          branchName,
          role: 'user',
          content: promptText.trim(),
          timestamp: timeStr,
          isPinnedMilestone: false,
          milestoneNote: null,
          milestoneCategory: null,
          groundingSourceIds,
          hallucinationFlag: null
        };

        // Synthesize simulated grounded AI assistant turn
        const assistantNode = {
          nodeId: assistantNodeId,
          parentId: userNodeId,
          branchName,
          role: 'assistant',
          content: `Simulated AI Response grounded in active documents (${groundingSourceIds.length} sources linked). Analysis of "${promptText.trim().substring(0, 40)}..." processed against inquiry context.`,
          timestamp: new Date(Date.now() + 1000).toISOString(),
          isPinnedMilestone: false,
          milestoneNote: null,
          milestoneCategory: null,
          groundingSourceIds,
          hallucinationFlag: null
        };

        return {
          ...sub,
          promptTree: [...sub.promptTree, userNode, assistantNode]
        };
      });
    });

    showToast('New prompt turn added & AI response generated', 'success');
  }, [activeSubmissionId, showToast]);

  // Create a new branch starting from a parent node
  const createBranch = useCallback((fromNodeId, newBranchName) => {
    if (!newBranchName || !newBranchName.trim()) return;
    setActiveBranch(newBranchName.trim());
    showToast(`Created new inquiry branch: "${newBranchName}"`, 'success');
  }, [showToast]);

  // Toggle milestone pin with reflection note and category
  const toggleMilestonePin = useCallback((nodeId, reflectionNote = '', category = 'Thesis Shift') => {
    setSubmissions(prevSubmissions => {
      return prevSubmissions.map(sub => {
        if (sub.id !== activeSubmissionId) return sub;

        const targetNode = sub.promptTree.find(n => n.nodeId === nodeId);
        if (!targetNode) return sub;

        const willPin = !targetNode.isPinnedMilestone;
        const updatedPromptTree = sub.promptTree.map(n => {
          if (n.nodeId !== nodeId) return n;
          return {
            ...n,
            isPinnedMilestone: willPin,
            milestoneNote: willPin ? (reflectionNote || 'Key milestone turn.') : null,
            milestoneCategory: willPin ? category : null
          };
        });

        let updatedMilestones = [...sub.pinnedMilestones];
        if (willPin) {
          updatedMilestones.push({
            nodeId: targetNode.nodeId,
            title: `Turn #${targetNode.nodeId.split('-').pop()}: ${targetNode.content.substring(0, 35)}...`,
            reflectionNote: reflectionNote || 'Curated inquiry milestone turn.',
            category,
            timestamp: targetNode.timestamp,
            branchName: targetNode.branchName
          });
        } else {
          updatedMilestones = updatedMilestones.filter(m => m.nodeId !== nodeId);
        }

        return {
          ...sub,
          promptTree: updatedPromptTree,
          pinnedMilestones: updatedMilestones
        };
      });
    });

    showToast('Milestone status updated', 'info');
  }, [activeSubmissionId, showToast]);

  // Flag hallucination in an AI response turn
  const flagHallucination = useCallback((nodeId, { reason, resolution, sourceRefId }) => {
    setSubmissions(prevSubmissions => {
      return prevSubmissions.map(sub => {
        if (sub.id !== activeSubmissionId) return sub;

        const updatedTree = sub.promptTree.map(n => {
          if (n.nodeId !== nodeId) return n;
          return {
            ...n,
            hallucinationFlag: {
              flagged: true,
              reason: reason || 'Inaccurate or unverified statement flagged by student.',
              resolution: resolution || 'Student refutation attached.',
              sourceRefId: sourceRefId || sub.sources[0]?.id || 'src-1',
              instructorApproved: true
            }
          };
        });

        return {
          ...sub,
          promptTree: updatedTree
        };
      });
    });

    showToast('Hallucination flagged & audit log updated', 'warning');
  }, [activeSubmissionId, showToast]);

  // Toggle instructor verification stamp on hallucination
  const toggleInstructorVerification = useCallback((nodeId) => {
    setSubmissions(prevSubmissions => {
      return prevSubmissions.map(sub => {
        if (sub.id !== activeSubmissionId) return sub;

        const updatedTree = sub.promptTree.map(n => {
          if (n.nodeId !== nodeId || !n.hallucinationFlag) return n;
          return {
            ...n,
            hallucinationFlag: {
              ...n.hallucinationFlag,
              instructorApproved: !n.hallucinationFlag.instructorApproved
            }
          };
        });

        return {
          ...sub,
          promptTree: updatedTree
        };
      });
    });

    showToast('Instructor verification status updated', 'info');
  }, [activeSubmissionId, showToast]);

  // Update student's essay draft
  const updateEssay = useCallback((newText) => {
    setSubmissions(prevSubmissions => {
      return prevSubmissions.map(sub => {
        if (sub.id !== activeSubmissionId) return sub;
        return {
          ...sub,
          essayDraft: newText
        };
      });
    });
  }, [activeSubmissionId]);

  // Reset to default mock scenarios
  const resetToDefaults = useCallback(() => {
    const defaultData = resetStorage();
    setSubmissions(defaultData);
    setActiveSubmissionId(defaultData[0].id);
    setActiveNodeId(null);
    setActiveBranch('all');
    showToast('Workspace reset to pristine baseline scenarios!', 'success', 4000);
  }, [showToast]);

  const value = {
    submissions,
    activeSubmission,
    activeSubmissionId,
    activePerspective,
    activeBranch,
    activeNodeId,
    toast,
    selectSubmission,
    togglePerspective,
    selectNode,
    selectBranch,
    addPromptTurn,
    createBranch,
    toggleMilestonePin,
    flagHallucination,
    toggleInstructorVerification,
    updateEssay,
    resetToDefaults,
    showToast
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
