const minorUpdatesOnly = [
  '@nuxt/types',
  '@nuxt/typescript-build',
  'nuxt',
  'typescript',
  '@types/uuid',
  'uuid',
]

module.exports = {
  upgrade: true,
  install: 'always',
  target: (name) => {
    if (minorUpdatesOnly.includes(name)) return 'minor'

    return 'latest'
  },
}
