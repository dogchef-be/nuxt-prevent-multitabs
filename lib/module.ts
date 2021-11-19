import path from 'path'

// eslint-disable-next-line
export default function PreventMultiTabModule(this: any): void {
  const defaults = {
    layout: 'multitab',
  }

  const options = Object.assign({}, defaults, this.options.preventMultitab)

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    ssr: 'false',
    options,
  })
}
