/**
 * Core capsule implementation for creating isolated web components
 */

import { CapsuleElement } from './element'
import type { CapsuleOptions, CapsuleConfig } from './types'

/**
 * Creates a new isolated web component class
 */
export function createCapsule(options: CapsuleOptions, config: CapsuleConfig = {}): typeof CapsuleElement {
  class IsolatedCapsule extends CapsuleElement {
    static get observedAttributes() {
      return config.observedAttributes || []
    }

    constructor() {
      super()
      this.initialize(options, config)
    }
  }

  return IsolatedCapsule
}

/**
 * Default CSS reset for isolated components
 */
export const DEFAULT_CSS_RESET = `
  :host {
    all: initial;
    display: block;
    box-sizing: border-box;
  }
  
  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }
` 