import path from 'path'

// eslint-disable-next-line
export default function PreventMultiTabsModule(this: any): void {
  const defaults = {
    layout: 'multitab',
  }

  const options = Object.assign({}, defaults, this.options.preventMultitabs)

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    ssr: 'false',
    options,
  })
}
