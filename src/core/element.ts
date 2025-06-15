/**
 * Base CapsuleElement class that provides Shadow DOM isolation
 */

import type { CapsuleOptions, CapsuleConfig } from './types'
import { DEFAULT_CSS_RESET } from './capsule'

export class CapsuleElement extends HTMLElement {
  declare shadowRoot: ShadowRoot
  private options?: CapsuleOptions
  private config?: CapsuleConfig

  constructor() {
    super()
    this.shadowRoot = this.attachShadow({ mode: 'open' })
  }

  /**
   * Initialize the capsule with options and configuration
   */
  protected initialize(options: CapsuleOptions, config: CapsuleConfig = {}) {
    this.options = options
    this.config = config

    // Set up shadow DOM mode
    if (config.shadowMode && config.shadowMode !== 'open') {
      // Re-create shadow root with correct mode if needed
      this.shadowRoot = this.attachShadow({ mode: config.shadowMode })
    }

    this.render()
  }

  /**
   * Render the component content
   */
  private render() {
    if (!this.options) return

    // Clear existing content
    this.shadowRoot.innerHTML = ''

    // Add CSS reset if enabled
    if (this.config?.adoptGlobalStyles !== false) {
      const resetStyle = document.createElement('style')
      resetStyle.textContent = DEFAULT_CSS_RESET
      this.shadowRoot.appendChild(resetStyle)
    }

    // Add component styles
    if (this.options.styles) {
      const styleEl = document.createElement('style')
      if (typeof this.options.styles === 'string') {
        styleEl.textContent = this.options.styles
      } else if (Array.isArray(this.options.styles)) {
        styleEl.textContent = this.options.styles.join('\n')
      }
      this.shadowRoot.appendChild(styleEl)
    }

    // Add template content
    if (typeof this.options.template === 'string') {
      const template = document.createElement('template')
      template.innerHTML = this.options.template
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    } else if (this.options.template instanceof HTMLElement) {
      this.shadowRoot.appendChild(this.options.template.cloneNode(true))
    }
  }

  /**
   * Lifecycle: Connected to DOM
   */
  connectedCallback() {
    this.options?.lifecycle?.connected?.()
  }

  /**
   * Lifecycle: Disconnected from DOM
   */
  disconnectedCallback() {
    this.options?.lifecycle?.disconnected?.()
  }

  /**
   * Lifecycle: Attribute changed
   */
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    this.options?.lifecycle?.attributeChanged?.(name, oldValue, newValue)
    
    // Handle prop mapping
    if (this.config?.propMap?.[name]) {
      const propName = this.config.propMap[name]
      this.updateProperty(propName, newValue)
    }
  }

  /**
   * Lifecycle: Adopted to new document
   */
  adoptedCallback() {
    this.options?.lifecycle?.adopted?.()
  }

  /**
   * Update a property on the component
   */
  private updateProperty(propName: string, value: string | null) {
    // This can be overridden by framework-specific implementations
    if (value !== null) {
      ;(this as any)[propName] = value
    }
  }
} 