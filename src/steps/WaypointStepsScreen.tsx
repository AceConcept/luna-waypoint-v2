import { useEffect, useRef } from 'react'
import { polarFlowIdFromHash, useFlowStore } from '../store/flowStore'

/** Stage iframe image — put file in `public/` and set path here (e.g. `/motorcycle.png`). */
const STAGE_EMBED_URL = '/motorcycle.png'

type WaypointStepsScreenProps = {
  polarHash: string
}

export default function WaypointStepsScreen({ polarHash }: WaypointStepsScreenProps) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.location.hash !== polarHash) {
      window.location.hash = polarHash
    }
  }, [polarHash])

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
        <iframe
          className="stepscreen-embed"
          title="Motorcycle"
          src={STAGE_EMBED_URL}
        />
      </div>
    </div>
  )
}
