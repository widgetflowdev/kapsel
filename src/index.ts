/**
 * @widgetflow/capsule - Tiny Lit-powered runtime for isolated Web Components
 * 
 * Main entry point that exports core functionality for creating
 * isolated web components with Shadow DOM encapsulation.
 */

export { createCapsule } from './core/capsule'
export { CapsuleElement } from './core/element'
export type { 
  CapsuleOptions,
  CapsuleConfig,
  IsolationOptions 
} from './core/types'

// Re-export utilities
export { 
  defineCapsule,
  registerCapsule,
  getCapsuleRegistry 
} from './core/registry'

// Version info
export const VERSION = '0.1.0' 