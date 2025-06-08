import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CanvasToolbar = ({
  workflowName,
  onWorkflowNameChange,
  isSaved,
  onSave,
  onTest,
  onDeploy,
  validationErrors,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  canvasScale,
  showGrid,
  onToggleGrid,
  showMiniMap,
  onToggleMiniMap
}) => {
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [tempName, setTempName] = useState(workflowName);

  const handleNameSubmit = () => {
    onWorkflowNameChange(tempName);
    setIsNameEditing(false);
  };

  const handleNameCancel = () => {
    setTempName(workflowName);
    setIsNameEditing(false);
  };

  const errorCount = validationErrors.filter(e => e.type === 'error').length;
  const warningCount = validationErrors.filter(e => e.type === 'warning').length;

  return (
    <div className="bg-surface border-b border-border px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section - Workflow Name */}
        <div className="flex items-center space-x-4">
          {isNameEditing ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNameSubmit();
                  if (e.key === 'Escape') handleNameCancel();
                }}
                className="px-3 py-1 border border-border rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary"
                autoFocus
              />
              <button
                onClick={handleNameSubmit}
                className="p-1 text-success hover:bg-success-50 rounded transition-smooth"
              >
                <Icon name="Check" size={16} strokeWidth={2} />
              </button>
              <button
                onClick={handleNameCancel}
                className="p-1 text-error hover:bg-error-50 rounded transition-smooth"
              >
                <Icon name="X" size={16} strokeWidth={2} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsNameEditing(true)}
              className="flex items-center space-x-2 px-3 py-1 hover:bg-secondary-50 rounded transition-smooth group"
            >
              <h1 className="text-lg font-semibold text-text-primary">{workflowName}</h1>
              <Icon 
                name="Edit2" 
                size={14} 
                className="text-text-secondary group-hover:text-text-primary transition-smooth" 
                strokeWidth={2}
              />
            </button>
          )}

          {/* Save Status */}
          <div className="flex items-center space-x-2">
            {!isSaved && (
              <div className="flex items-center space-x-1 text-warning">
                <div className="w-2 h-2 bg-warning rounded-full" />
                <span className="text-xs font-medium">Unsaved changes</span>
              </div>
            )}
            {isSaved && (
              <div className="flex items-center space-x-1 text-success">
                <Icon name="Check" size={14} strokeWidth={2} />
                <span className="text-xs font-medium">Saved</span>
              </div>
            )}
          </div>

          {/* Validation Status */}
          {(errorCount > 0 || warningCount > 0) && (
            <div className="flex items-center space-x-2">
              {errorCount > 0 && (
                <div className="flex items-center space-x-1 text-error">
                  <Icon name="AlertTriangle" size={14} strokeWidth={2} />
                  <span className="text-xs font-medium">{errorCount} errors</span>
                </div>
              )}
              {warningCount > 0 && (
                <div className="flex items-center space-x-1 text-warning">
                  <Icon name="AlertCircle" size={14} strokeWidth={2} />
                  <span className="text-xs font-medium">{warningCount} warnings</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Center Section - Canvas Controls */}
        <div className="flex items-center space-x-2">
          {/* Zoom Controls */}
          <div className="flex items-center bg-secondary-50 rounded-lg">
            <button
              onClick={onZoomOut}
              className="p-2 hover:bg-secondary-100 transition-smooth rounded-l-lg"
              title="Zoom Out"
            >
              <Icon name="Minus" size={16} strokeWidth={2} />
            </button>
            <button
              onClick={onZoomReset}
              className="px-3 py-2 hover:bg-secondary-100 transition-smooth text-xs font-medium min-w-16"
              title="Reset Zoom"
            >
              {Math.round(canvasScale * 100)}%
            </button>
            <button
              onClick={onZoomIn}
              className="p-2 hover:bg-secondary-100 transition-smooth rounded-r-lg"
              title="Zoom In"
            >
              <Icon name="Plus" size={16} strokeWidth={2} />
            </button>
          </div>

          {/* View Controls */}
          <div className="flex items-center space-x-1">
            <button
              onClick={onToggleGrid}
              className={`p-2 rounded transition-smooth ${
                showGrid 
                  ? 'bg-primary-50 text-primary border border-primary-200' :'hover:bg-secondary-50 text-text-secondary'
              }`}
              title="Toggle Grid"
            >
              <Icon name="Grid3X3" size={16} strokeWidth={2} />
            </button>
            <button
              onClick={onToggleMiniMap}
              className={`p-2 rounded transition-smooth ${
                showMiniMap 
                  ? 'bg-primary-50 text-primary border border-primary-200' :'hover:bg-secondary-50 text-text-secondary'
              }`}
              title="Toggle Mini Map"
            >
              <Icon name="Map" size={16} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Save Button */}
          <button
            onClick={onSave}
            disabled={isSaved}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
              isSaved
                ? 'bg-secondary-100 text-text-secondary cursor-not-allowed' :'bg-secondary-100 text-text-primary hover:bg-secondary-200'
            }`}
          >
            <Icon name="Save" size={16} strokeWidth={2} />
            <span>Save</span>
          </button>

          {/* Test Button */}
          <button
            onClick={onTest}
            className="flex items-center space-x-2 px-4 py-2 bg-accent-50 text-accent-700 border border-accent-200 rounded-lg text-sm font-medium transition-smooth hover:bg-accent-100 hover:border-accent-300"
          >
            <Icon name="Play" size={16} strokeWidth={2} />
            <span>Test</span>
          </button>

          {/* Deploy Button */}
          <button
            onClick={onDeploy}
            disabled={errorCount > 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
              errorCount > 0
                ? 'bg-secondary-100 text-text-secondary cursor-not-allowed' :'bg-primary text-white hover:bg-primary-700'
            }`}
          >
            <Icon name="Rocket" size={16} strokeWidth={2} />
            <span>Deploy</span>
          </button>

          {/* More Options */}
          <div className="relative">
            <button className="p-2 hover:bg-secondary-50 rounded-lg transition-smooth">
              <Icon name="MoreVertical" size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="mt-2 flex items-center justify-between text-xs text-text-secondary">
        <div className="flex items-center space-x-4">
          <span>Ctrl+S to save</span>
          <span>Ctrl+Z to undo</span>
          <span>Delete to remove selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Last saved: Never</span>
        </div>
      </div>
    </div>
  );
};

export default CanvasToolbar;