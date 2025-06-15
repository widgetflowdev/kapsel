/**
 * Core type definitions for @widgetflow/capsule
 */

export interface CapsuleOptions {
  /** Template content for the component */
  template: string | HTMLElement
  /** CSS styles to apply within the shadow DOM */
  styles?: string | CSSStyleSheet[]
  /** Shadow DOM mode */
  shadowMode?: 'open' | 'closed'
  /** Custom element lifecycle callbacks */
  lifecycle?: CapsuleLifecycle
}

export interface CapsuleConfig {
  /** Attributes to observe for changes */
  observedAttributes?: string[]
  /** Mapping between attribute names and prop names */
  propMap?: Record<string, string>
  /** Shadow DOM configuration */
  shadowMode?: 'open' | 'closed'
  /** Whether to adopt global styles */
  adoptGlobalStyles?: boolean
}

export interface IsolationOptions {
  /** Enable style isolation */
  isolateStyles?: boolean
  /** Enable script isolation */
  isolateScripts?: boolean
  /** Custom CSS reset rules */
  cssReset?: string
}

export interface CapsuleLifecycle {
  /** Called when element is connected to DOM */
  connected?: () => void
  /** Called when element is disconnected from DOM */
  disconnected?: () => void
  /** Called when observed attribute changes */
  attributeChanged?: (name: string, oldValue: string | null, newValue: string | null) => void
  /** Called when element is adopted to new document */
  adopted?: () => void
}

export interface CapsuleRegistry {
  /** Register a capsule component */
  register: (name: string, component: CustomElementConstructor) => void
  /** Get registered component */
  get: (name: string) => CustomElementConstructor | undefined
  /** Check if component is registered */
  has: (name: string) => boolean
  /** Get all registered component names */
  names: () => string[]
}

// Framework-specific types
export interface VueComponentWrapper {
  component: any
  props?: Record<string, any>
  emits?: string[]
}

export interface ReactComponentWrapper {
  component: React.ComponentType<any>
  props?: Record<string, any>
}

// Vite plugin types
export interface VitePluginOptions {
  /** Auto-register components */
  autoRegister?: boolean
  /** Custom element prefix */
  prefix?: string
  /** Include patterns */
  include?: string[]
  /** Exclude patterns */
  exclude?: string[]
} 