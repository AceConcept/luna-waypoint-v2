/**
 * Sidebar + left-story titles and body copy — ordered for flow ids: 1–3.
 * Navbar tab labels stay in WaypointNavbar.tsx (Step One / Two / Three).
 */

import type { ReactNode } from 'react'

export const STEP_TITLES = [
  'Code Editor Origin',
  'Extensions Page',
  'Python Environs',
] as const

export const STEP_DESCRIPTIONS = [
  'This guided flow demonstrates the transition from the code editor to installing a new extension update. Select the 3rd tab on the sidebar, the extensions button to advance to the next step.',
  'Review your installed extensions on this page, then select Python Environments to proceed.',
  'The Python Environments detail view is now open. Click Download to install the extension and trigger the confirmation pop-up, completing the flow.',
] as const

/** Left-story panel bodies; key instruction phrases are bold in the UI. */
export const STEP_STORY_BODIES: ReactNode[] = [
  <>
    This guided flow demonstrates the transition from the code editor to installing a new extension update.
    <br />
    <br />
    <strong>Select the 3rd tab on the sidebar, the extensions button to advance to the next step.</strong>
  </>,
  <>
    Review your installed extensions on this page, then{' '}
    <strong>select Python Environments to proceed.</strong>
  </>,
  STEP_DESCRIPTIONS[2],
]
