import { useEffect, useRef } from 'react'
import {
  postStageEmbedStep,
  registerStageEmbedFrame,
  setStageEmbedLoaded,
} from '../store/stageEmbedBridge'
import { useFlowStore } from '../store/flowStore'

type StageEmbedFrameProps = {
  src: string
  title: string
  className?: string
}

function resolveEmbedSrc(src: string): string {
  try {
    return new URL(src, window.location.href).href
  } catch {
    return src
  }
}

/** Luna editor iframe — single element; `src` updates in place (no remount key). */
export function StageEmbedFrame({ src, title, className }: StageEmbedFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const loadedSrcRef = useRef<string | null>(null)

  useEffect(() => {
    registerStageEmbedFrame(iframeRef.current)
    return () => registerStageEmbedFrame(null)
  }, [])

  useEffect(() => {
    const frame = iframeRef.current
    if (!frame) return
    const target = resolveEmbedSrc(src)
    if (frame.src === target) return
    setStageEmbedLoaded(false)
    frame.src = target
  }, [src])

  return (
    <iframe
      ref={iframeRef}
      className={className}
      src={src}
      title={title}
      allow="fullscreen"
      loading="eager"
      onLoad={() => {
        const frame = iframeRef.current
        if (!frame) return
        const resolved = resolveEmbedSrc(src)
        if (frame.src !== resolved) return
        loadedSrcRef.current = resolved
        setStageEmbedLoaded(true)
        const { stepIndex } = useFlowStore.getState()
        postStageEmbedStep(stepIndex + 1)
      }}
    />
  )
}
