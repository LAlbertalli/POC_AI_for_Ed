import { INITIAL_SUBMISSIONS } from '../data/mockData.js';
import { STORAGE_KEY } from '../types/index.js';

/**
 * Validates that loaded submissions structure conforms to expected schema
 * @param {any} data
 * @returns {boolean}
 */
function isValidSubmissionArray(data) {
  if (!Array.isArray(data) || data.length === 0) return false;
  return data.every(sub => (
    sub &&
    typeof sub.id === 'string' &&
    typeof sub.studentName === 'string' &&
    Array.isArray(sub.promptTree) &&
    Array.isArray(sub.sources)
  ));
}

/**
 * Load submissions from localStorage or fall back to baseline mock data
 * @returns {Array} List of student submissions
 */
export function loadSubmissions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveSubmissions(INITIAL_SUBMISSIONS);
      return INITIAL_SUBMISSIONS;
    }
    const parsed = JSON.parse(raw);
    if (isValidSubmissionArray(parsed)) {
      return parsed;
    } else {
      console.warn('Storage schema invalid or corrupted. Resetting to initial mock dataset.');
      saveSubmissions(INITIAL_SUBMISSIONS);
      return INITIAL_SUBMISSIONS;
    }
  } catch (err) {
    console.error('Failed to read from localStorage:', err);
    saveSubmissions(INITIAL_SUBMISSIONS);
    return INITIAL_SUBMISSIONS;
  }
}

/**
 * Save current submissions state to localStorage
 * @param {Array} submissions
 */
export function saveSubmissions(submissions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  } catch (err) {
    console.error('Failed to write to localStorage:', err);
  }
}

/**
 * Reset storage to pristine initial state
 * @returns {Array} Fresh baseline submissions
 */
export function resetStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SUBMISSIONS));
  } catch (err) {
    console.error('Failed to reset storage:', err);
  }
  return INITIAL_SUBMISSIONS;
}
