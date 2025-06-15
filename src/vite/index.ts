/**
 * Vite plugin for @widgetflow/capsule
 */

import type { Plugin } from 'vite'
import type { VitePluginOptions } from '../core/types'

export function capsulePlugin(options: VitePluginOptions = {}): Plugin {
  return {
    name: 'capsule',
    configResolved() {
      console.log('Capsule Vite plugin loaded with options:', options)
    },
    // Add plugin implementation here
  }
}

export type { VitePluginOptions } 