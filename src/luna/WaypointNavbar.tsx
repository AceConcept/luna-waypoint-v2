import { useCallback, useEffect, useRef, useState } from 'react'
import { FLOW_SIDEBAR_ITEMS } from '../flowSidebarItems'
import {
  useFlowStep,
  useFlowStore,
  type FlowStepId,
} from '../store/flowStore'
import { WaypointManagerMenu } from './WaypointManagerMenu'
import './waypointSidebar.css'

const PRIMARY_NAV_STEPS: {
  className: string
  label: string
  flowId: FlowStepId
}[] = [
  { className: 'step-1', label: 'Step One', flowId: '1' },
  { className: 'step-2', label: 'Step Two', flowId: '2' },
  { className: 'step-3', label: 'Step Three', flowId: '3' },
]

type StepTabProps = {
  className: string
  label: string
  flowId: FlowStepId
  isCurrent: boolean
  onSelect: (id: FlowStepId) => void
}

function StepTab({ className, label, flowId, isCurrent, onSelect }: StepTabProps) {
  return (
    <button
      type="button"
      className={`step-tab ${className}`}
      aria-current={isCurrent ? 'step' : undefined}
      onClick={() => onSelect(flowId)}
    >
      <span className="step-label">
        <span className="step-label-inner">
          <span className="step-diamond" aria-hidden="true" />
          <span className="step-label-text">{label}</span>
        </span>
      </span>
    </button>
  )
}

export function WaypointNavbar() {
  const { step } = useFlowStep()
  const goToStepById = useFlowStore((s) => s.goToStepById)
  const [managerOpen, setManagerOpen] = useState(false)
  const managerRef = useRef<HTMLDivElement>(null)

  const selectStep = useCallback(
    (id: FlowStepId) => {
      goToStepById(id)
      setManagerOpen(false)
    },
    [goToStepById],
  )

  useEffect(() => {
    if (!managerOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setManagerOpen(false)
    }

    const onPointerDown = (event: MouseEvent) => {
      const root = managerRef.current
      if (!root?.contains(event.target as Node)) {
        setManagerOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [managerOpen])

  return (
    <div className="luna-absolute-pad">
      <div className="waypoint-navbar">
        <div className="navbar-left">
          <div className="navbar-left-brand">
            <a className="navbar-left-label" href="https://www.atencium-ui.com/">
              atencium-ui.com
            </a>
          </div>
        </div>
        <div className="navbar-steps">
          {PRIMARY_NAV_STEPS.map(({ className, label, flowId }) => (
            <StepTab
              key={flowId}
              className={className}
              label={label}
              flowId={flowId}
              isCurrent={step.id === flowId}
              onSelect={selectStep}
            />
          ))}
          <div
            ref={managerRef}
            className={`navbar-manager-dropdown step-tab-dropdown${
              managerOpen ? ' is-open' : ''
            }`}
          >
            <button
              type="button"
              className={`step-tab step-manager step-tab-dropdown__trigger${
                managerOpen ? ' is-active' : ''
              }`}
              aria-expanded={managerOpen}
              aria-haspopup="menu"
              onClick={() => setManagerOpen((open) => !open)}
            >
              <span className="step-label step-label--manager">
                <span className="navbar-manager-trigger">
                  <span className="navbar-manager-label">
                    <span className="navbar-manager-label-line">Waypoint</span>
                    <span className="navbar-manager-label-line">Manager</span>
                  </span>
                  <span className="navbar-manager-icon" aria-hidden="true">
                    <span className="navbar-manager-icon__plus" />
                  </span>
                </span>
              </span>
            </button>
            {managerOpen ? (
              <div
                className="step-tab-dropdown__panel"
                role="menu"
                aria-label="Waypoint steps"
              >
                <WaypointManagerMenu
                  items={FLOW_SIDEBAR_ITEMS}
                  activeId={step.id}
                  onSelect={(id) => selectStep(id as FlowStepId)}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className="navbar-right" />
      </div>
    </div>
  )
}
