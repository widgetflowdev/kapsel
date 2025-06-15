/**
 * Basic tests for @widgetflow/capsule
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { createCapsule, CapsuleElement } from '../src/index'

describe('createCapsule', () => {
  beforeEach(() => {
    // Clean up custom elements
    document.body.innerHTML = ''
  })

  it('should create a custom element class', () => {
    const MyElement = createCapsule({
      template: '<div>Hello World</div>',
      styles: 'div { color: red; }'
    })

    expect(MyElement).toBeDefined()
    expect(MyElement.prototype).toBeInstanceOf(HTMLElement)
  })

  it('should create an element with shadow DOM', () => {
    const MyElement = createCapsule({
      template: '<div>Test Content</div>'
    })

    customElements.define('test-element', MyElement)
    const element = document.createElement('test-element') as InstanceType<typeof MyElement>
    
    expect(element.shadowRoot).toBeTruthy()
  })

  it('should render template content', () => {
    const MyElement = createCapsule({
      template: '<div id="test">Template Test</div>',
      styles: '#test { font-weight: bold; }'
    })

    customElements.define('template-test', MyElement)
    const element = document.createElement('template-test') as InstanceType<typeof MyElement>
    document.body.appendChild(element)

    // Wait for element to be connected and rendered
    const testDiv = element.shadowRoot?.querySelector('#test')
    expect(testDiv?.textContent).toBe('Template Test')
  })

  it('should handle observed attributes', () => {
    const MyElement = createCapsule(
      {
        template: '<div>Attribute Test</div>'
      },
      {
        observedAttributes: ['test-attr']
      }
    )

    expect(MyElement.observedAttributes).toEqual(['test-attr'])
  })
})

describe('CapsuleElement', () => {
  it('should be a proper HTMLElement subclass', () => {
    expect(CapsuleElement.prototype).toBeInstanceOf(HTMLElement)
  })
}) 