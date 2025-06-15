/**
 * Vue adapter for @widgetflow/capsule
 */

import { createApp, type App, type Component } from 'vue'
import { CapsuleElement } from '../core/element'
import type { CapsuleConfig, VueComponentWrapper } from '../core/types'

/**
 * Creates an isolated Vue component wrapped in a Web Component
 */
export function defineIsolatedVue(
  componentFactory: () => Component,
  config: CapsuleConfig = {}
): typeof CapsuleElement {
  class VueCapsule extends CapsuleElement {
    private app: App | undefined
    private mountPoint?: HTMLElement

    static get observedAttributes() {
      return config.observedAttributes || []
    }

    constructor() {
      super()
      this.setupVueComponent(componentFactory(), config)
    }

    private setupVueComponent(component: Component, capsuleConfig: CapsuleConfig) {
      // Create mount point
      this.mountPoint = document.createElement('div')
      
      const options = {
        template: this.mountPoint,
        styles: '', // Vue handles its own styling
        lifecycle: {
          connected: () => this.mountVueApp(component),
          disconnected: () => this.unmountVueApp(),
          attributeChanged: (name: string, _oldValue: string | null, newValue: string | null) => {
            this.updateVueProps(name, newValue)
          }
        }
      }

      this.initialize(options, capsuleConfig)
    }

    private mountVueApp(component: Component) {
      if (this.app || !this.mountPoint) return

      // Create Vue app
      this.app = createApp(component, this.getPropsFromAttributes())
      
      // Mount to shadow DOM
      const shadowContainer = document.createElement('div')
      this.shadowRoot.appendChild(shadowContainer)
      this.app.mount(shadowContainer)
    }

    private unmountVueApp() {
      if (this.app) {
        this.app.unmount()
        this.app = undefined
      }
    }

    private getPropsFromAttributes(): Record<string, any> {
      const props: Record<string, any> = {}
      const vueConfig = this.vueConfig
      
      if (vueConfig?.observedAttributes) {
        for (const attr of vueConfig.observedAttributes) {
          const value = this.getAttribute(attr)
          if (value !== null) {
            const propName = vueConfig.propMap?.[attr] || attr
            props[propName] = this.parseAttributeValue(value)
          }
        }
      }
      
      return props
    }

    private updateVueProps(attrName: string, value: string | null) {
      // Update Vue component props when attributes change
      if (this.app && value !== null) {
        const vueConfig = this.vueConfig
        const propName = vueConfig?.propMap?.[attrName] || attrName
        // Vue reactivity will handle the update
        console.log(`Updating Vue prop: ${propName} = ${value}`)
      }
    }

    private parseAttributeValue(value: string): any {
      // Try to parse as JSON first, fallback to string
      try {
        return JSON.parse(value)
      } catch {
        return value
      }
    }

    private get vueConfig() {
      return this.getConfig()
    }

    private getConfig(): CapsuleConfig {
      // Access to private config - this is a workaround for TypeScript
      return (this as any).config
    }
  }

  return VueCapsule
}

/**
 * Utility to create a Vue component wrapper
 */
export function createVueWrapper(component: Component, props?: Record<string, any>): VueComponentWrapper {
  return {
    component,
    props: props || {},
    emits: []
  }
}

export type { VueComponentWrapper } 