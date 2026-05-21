import { getStageEmbedMessageOrigin } from './stageEmbedConfig'

export const STAGE_EMBED_SET_STEP = 'atencium-set-step' as const
/** iframe → shell when user changes step inside the embed */
export const STAGE_EMBED_STEP_CHANGED = 'atencium-step-changed' as const
/** shell asks iframe for current step (polling fallback) */
export const STAGE_EMBED_REQUEST_STEP = 'atencium-request-step' as const

let stageIframe: HTMLIFrameElement | null = null
let stageEmbedLoaded = false

export function registerStageEmbedFrame(frame: HTMLIFrameElement | null) {
  stageIframe = frame
  if (!frame) stageEmbedLoaded = false
}

/** Call when iframe fires load (or false when src is about to change). */
export function setStageEmbedLoaded(loaded: boolean) {
  stageEmbedLoaded = loaded
}

function canPostToEmbed(): boolean {
  if (!stageIframe?.contentWindow || !stageEmbedLoaded) return false
  try {
    const src = stageIframe.src
    if (!src || src === 'about:blank') return false
    const origin = new URL(src, window.location.href).origin
    return origin === getStageEmbedMessageOrigin()
  } catch {
    return false
  }
}

function safePostToEmbed(data: object) {
  if (!canPostToEmbed()) return
  const win = stageIframe!.contentWindow!
  try {
    win.postMessage(data, getStageEmbedMessageOrigin())
  } catch {
    /* iframe mid-navigation or origin mismatch */
  }
}

export function postStageEmbedStep(step: number) {
  safePostToEmbed({ type: STAGE_EMBED_SET_STEP, step })
}

/** Ask the iframe to report its current step (optional; Luna uses URL routes). */
export function requestStageEmbedStep() {
  safePostToEmbed({ type: STAGE_EMBED_REQUEST_STEP })
}
