/** Generic numbered step ids (1–3). */
export type FlowStepId = '1' | '2' | '3'

export const FLOW_STEP_IDS = ['1', '2', '3'] as const satisfies readonly FlowStepId[]

/** Waypoint shell URL hashes (parent page only). */
export const POLAR_SYS_HASH: Record<FlowStepId, string> = {
  '1': '#1',
  '2': '#2',
  '3': '#3',
}

/** Luna code editor routes per step (Next.js paths inside the iframe). */
export const STAGE_EMBED_ROUTE: Record<FlowStepId, string> = {
  '1': '/',
  '2': '/extensions',
  '3': '/extensions?extDetail=python-environments',
}

/** iframe target — Luna code editor (production). */
export const STAGE_EMBED_ORIGIN = 'https://luna-code-editor.guildconcept.workers.dev'

/** Base URL or path used for iframe `src` (override with VITE_STAGE_EMBED_ORIGIN). */
export function getStageEmbedBase(): string {
  const envOrigin = import.meta.env.VITE_STAGE_EMBED_ORIGIN as string | undefined
  if (envOrigin?.trim()) return envOrigin.trim().replace(/\/$/, '')
  return STAGE_EMBED_ORIGIN
}

/** Origin for postMessage / message events (resolves relative dev paths to window.origin). */
export function getStageEmbedMessageOrigin(): string {
  const base = getStageEmbedBase()
  if (base.startsWith('http://') || base.startsWith('https://')) return base
  if (typeof window !== 'undefined') return window.location.origin
  return STAGE_EMBED_ORIGIN
}

export function getStageEmbedOrigin(): string {
  return getStageEmbedMessageOrigin()
}

export function stageEmbedUrlForStep(id: FlowStepId): string {
  const base = getStageEmbedBase().replace(/\/$/, '')
  const route = STAGE_EMBED_ROUTE[id]
  if (base.startsWith('http://') || base.startsWith('https://')) {
    return `${base}${route}`
  }
  return `${base}${route}`
}
