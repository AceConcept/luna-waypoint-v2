/**
 * Sidebar + left-story titles and body copy — ordered for flow ids: 1–3.
 * Navbar tab labels stay in WaypointNavbar.tsx (Step One / Two / Three).
 */

export const STEP_TITLES = [
  'Code Editor Origin',
  'Extensions Page',
  'Python Environs',
] as const

export const STEP_DESCRIPTIONS = [
  'This guided flow demonstrates the transition from the code editor to installing a new extension update.',
  'Review your installed extensions on this page, then select Python Environments to proceed.',
  'The Python Environments detail view is now open. Click Download to install the extension and trigger the confirmation pop-up, completing the flow.',
] as const
