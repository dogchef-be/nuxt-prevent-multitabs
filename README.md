<h1 align="center">
  nuxt-prevent-multitabs
</h1>
<p align="center">
  NuxtJS module to prevent opening the app in multiple tabs
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/nuxt-prevent-multitabs"><img src="https://img.shields.io/npm/v/nuxt-prevent-multitabs?style=flat-square"></a> <a href="https://www.npmjs.com/package/nuxt-prevent-multitabs"><img src="https://img.shields.io/npm/dt/nuxt-prevent-multitabs?style=flat-square"></a> <a href="#"><img src="https://img.shields.io/github/license/dogchef-be/nuxt-prevent-multitabs?style=flat-square"></a>
</p>

## Table of contents

- [Setup](#setup)
- [Options](#options)
- [Usage](#usage)
- [License](#license)

## Setup

1. Add `nuxt-prevent-multitabs` dependency to your project:

```bash
npm install nuxt-prevent-multitabs
```

2. Create the layout to be used when the client opens another tab. An example:

```html
<template>
  <main class="section">
    <div class="container">
      <div class="has-text-centered">
        <b-icon class="mb-2" icon="alert-circle" size="is-large" />
        <h1 class="is-size-4 has-text-weight-bold">
          Cannot open multiple windows
        </h1>
        <div class="mt-10">
          <p>APP_NAME is already open in another window.</p>
          <p>Make sure you close it before opening a new one.</p>
        </div>
        <b-button type="is-primary mt-8" rounded @click="reload()">
          Click here to access
        </b-button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    methods: {
      reload(): void {
        location.reload()
      },
    },
  })
</script>
```

3. Add `nuxt-prevent-multitabs` module and configuration to `nuxt.config.js`:

```js
export default {
  // ...other config options
  modules: ["nuxt-prevent-multitabs"];
  preventMultitabs: {
    layout: 'multitab', // optional. default is multitab.vue
  }
}
```

## Options

### `layout`

- Type: `String`
- Default: `multitab`

The layout to be used when the client opens another tab
