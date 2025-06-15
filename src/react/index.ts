/**
 * React adapter for @widgetflow/capsule
 * Note: This is a stub implementation - full React integration requires additional setup
 */

export function defineIsolatedReact(_componentFactory: () => any, _config: any = {}) {
  // Stub implementation - to be fully implemented
  console.warn('React adapter not yet implemented')
  return class ReactCapsule extends HTMLElement {}
}

export type ReactComponentWrapper = {
  component: any
  props?: Record<string, any>
} 