import { useEffect, useRef } from 'react'
import { StageEmbedFrame } from '../luna/StageEmbedFrame'
import { useLunaStageEmbed } from '../luna/LunaStageEmbedContext'
import {
  polarFlowIdFromHash,
  stageEmbedUrlForStep,
  useFlowStep,
  useFlowStore,
} from '../store/flowStore'

export default function WaypointStepsScreen() {
  const hostRef = useRef<HTMLDivElement>(null)
  const { step } = useFlowStep()
  const { stageEmbedVisible } = useLunaStageEmbed()
  const embedSrc = stageEmbedUrlForStep(step.id)

  useEffect(() => {
    const onHashChange = () => {
      useFlowStore.getState().goToStepById(polarFlowIdFromHash(window.location.hash))
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <div ref={hostRef} className="viewport">
      <div id="artboard" className="artboard">
        <div
          className={`stepscreen-embed-shell${
            stageEmbedVisible ? '' : ' stepscreen-embed-shell--hidden'
          }`}
        >
          <StageEmbedFrame
            className="stepscreen-embed"
            src={embedSrc}
            title="Luna code editor"
          />
        </div>
      </div>
    </div>
  )
}
