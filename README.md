# @widgetflow/kapsel

[![npm version](https://badge.fury.io/js/@widgetflow%2Fkapsel.svg)](https://badge.fury.io/js/@widgetflow%2Fkapsel)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/widgetflowdev/kapsel/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

Tiny Lit-powered runtime + framework adapters for fully-isolated Web Component widgets.

Perfect for embedding components across different applications without style conflicts or JavaScript namespace pollution.

## ✨ Features

- 🔒 **Full Isolation** - Shadow DOM + scoped styles
- 🚀 **Framework Agnostic** - Works with Vue, React, vanilla JS
- 📦 **Tiny Bundle** - Minimal runtime overhead
- 🎯 **Easy Integration** - Simple API for any framework
- 🔧 **Vite Plugin** - Seamless development experience
- 📘 **TypeScript First** - Built with TypeScript, full type support
- 🧪 **Well Tested** - Comprehensive test suite

## 📦 Installation

```bash
npm install @widgetflow/kapsel
# or
pnpm add @widgetflow/kapsel
# or  
yarn add @widgetflow/kapsel
```

## 🚀 Quick Start

### Vue 3

```ts
import { defineIsolatedVue } from '@widgetflow/kapsel/vue'
import MyWidget from './MyWidget.vue'

// Register as a custom element
customElements.define('my-widget', defineIsolatedVue(() => MyWidget))
```

```html
<!-- Use anywhere -->
<my-widget prop="value"></my-widget>
```

### React

```tsx
import { defineIsolatedReact } from '@widgetflow/kapsel/react'
import MyWidget from './MyWidget'

customElements.define('my-widget', defineIsolatedReact(() => MyWidget))
```

### Vanilla JavaScript

```ts
import { createKapsel } from '@widgetflow/kapsel'

const widget = createKapsel({
  template: '<div>Hello, World!</div>',
  styles: 'div { color: blue; }'
})

customElements.define('my-widget', widget)
```

## 🔧 Framework Integrations

### Vite Plugin

Add seamless development experience:

```ts
// vite.config.ts
import { kapselPlugin } from '@widgetflow/kapsel/vite'

export default {
  plugins: [
    kapselPlugin({
      // Auto-register components
      autoRegister: true,
      // Custom element prefix
      prefix: 'my-app'
    })
  ]
}
```

### Advanced Vue Example

```vue
<!-- MyWidget.vue -->
<template>
  <div class="widget">
    <h1>{{ title }}</h1>
    <button @click="handleClick">{{ buttonText }}</button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  buttonText?: string
}

const props = withDefaults(defineProps<Props>(), {
  buttonText: 'Click me'
})

const emit = defineEmits<{
  click: [value: string]
}>()

const handleClick = () => {
  emit('click', props.title)
}
</script>

<style scoped>
.widget {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
```

```ts
// register.ts
import { defineIsolatedVue } from '@widgetflow/kapsel/vue'
import MyWidget from './MyWidget.vue'

const WidgetElement = defineIsolatedVue(() => MyWidget, {
  // Define which props to observe as attributes
  observedAttributes: ['title', 'button-text'],
  // Map attribute names to prop names
  propMap: {
    'button-text': 'buttonText'
  }
})

customElements.define('my-widget', WidgetElement)
```

## 📚 API Reference

### Core API

#### `createKapsel(options)`

Creates a base web component with Shadow DOM isolation.

```ts
interface KapselOptions {
  template: string | HTMLElement
  styles?: string | CSSStyleSheet[]
  shadowMode?: 'open' | 'closed'
}
```

### Vue Integration

#### `defineIsolatedVue(component, options?)`

Wraps a Vue component in an isolated web component.

```ts
interface VueOptions {
  observedAttributes?: string[]
  propMap?: Record<string, string>
  shadowMode?: 'open' | 'closed'
}
```

### React Integration

#### `defineIsolatedReact(component, options?)`

Wraps a React component in an isolated web component.

```ts
interface ReactOptions {
  observedAttributes?: string[]
  propMap?: Record<string, string>
  shadowMode?: 'open' | 'closed'
}
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup

```bash
git clone https://github.com/widgetflowdev/kapsel.git
cd kapsel
pnpm install
```

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm preview          # Preview built package

# Testing  
pnpm test             # Run tests
pnpm test:ui          # Run tests with UI
pnpm test:coverage    # Run tests with coverage

# Quality
pnpm lint             # Lint code
pnpm format           # Format code
pnpm typecheck        # Check types

# Release
pnpm changeset        # Create changeset
pnpm version          # Version packages
pnpm release          # Build and publish
```

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests if applicable
5. Run tests: `pnpm test`
6. Create a changeset: `pnpm changeset`
7. Commit changes: `git commit -m 'Add amazing feature'`
8. Push to branch: `git push origin feature/amazing-feature`
9. Submit a Pull Request

## 📄 License

MIT © [WidgetFlow Team](https://widgetflow.dev)

## 🙏 Acknowledgments

- [Lit](https://lit.dev/) - For the excellent web components foundation
- [Vite](https://vitejs.dev/) - For the amazing build tool
- [Changesets](https://github.com/changesets/changesets) - For the versioning workflow

---

*Made with ❤️ for the open source community* 