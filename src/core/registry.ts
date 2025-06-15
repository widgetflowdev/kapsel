/**
 * Registry system for managing capsule components
 */

import type { CapsuleRegistry } from './types'

/**
 * Global registry for capsule components
 */
class CapsuleRegistryImpl implements CapsuleRegistry {
  private components = new Map<string, CustomElementConstructor>()

  register(name: string, component: CustomElementConstructor): void {
    if (this.components.has(name)) {
      console.warn(`Component '${name}' is already registered`)
      return
    }
    
    this.components.set(name, component)
  }

  get(name: string): CustomElementConstructor | undefined {
    return this.components.get(name)
  }

  has(name: string): boolean {
    return this.components.has(name)
  }

  names(): string[] {
    return Array.from(this.components.keys())
  }
}

// Global registry instance
const registry = new CapsuleRegistryImpl()

/**
 * Get the global capsule registry
 */
export function getCapsuleRegistry(): CapsuleRegistry {
  return registry
}

/**
 * Register a capsule component in the global registry
 */
export function registerCapsule(name: string, component: CustomElementConstructor): void {
  registry.register(name, component)
  
  // Also register as custom element if not already registered
  if (!customElements.get(name)) {
    customElements.define(name, component)
  }
}

/**
 * Define and register a capsule component
 */
export function defineCapsule(name: string, component: CustomElementConstructor): void {
  registerCapsule(name, component)
} 