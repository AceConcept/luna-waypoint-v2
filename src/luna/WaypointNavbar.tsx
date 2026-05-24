import { useCallback } from 'react'
import {
  FLOW_STEPS,
  useFlowStep,
  useFlowStore,
  type FlowStepId,
} from '../store/flowStore'

const NAV_STEP_LABELS = ['Step One', 'Step Two', 'Step Three'] as const

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

  const selectStep = useCallback(
    (id: FlowStepId) => {
      goToStepById(id)
    },
    [goToStepById],
  )

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
          {FLOW_STEPS.map(({ id }, i) => (
            <StepTab
              key={id}
              className={`step-${id}`}
              label={NAV_STEP_LABELS[i] ?? `Step ${id}`}
              flowId={id}
              isCurrent={step.id === id}
              onSelect={selectStep}
            />
          ))}
        </div>
        <div className="navbar-right" />
      </div>
    </div>
  )
}
