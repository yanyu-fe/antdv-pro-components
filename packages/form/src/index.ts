import type { App, Plugin } from 'vue'
import ProForm from './layouts/ProForm'
export * from './interface'

ProForm.install = (app: App) => {
  app.component(ProForm.name, ProForm)
  return app
}

export default ProForm as typeof ProForm & Plugin
