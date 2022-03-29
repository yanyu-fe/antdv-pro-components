import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import ProField from '@yanyu-fe/pro-field'
import ProForm from '@yanyu-fe/pro-form'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.less'
import '@yanyu-fe/pro-field/style/index.ts'

const app = createApp(App)

app.use(ProField)
app.use(ProForm)

app.use(router)
app.use(Antd)

app.mount('#app')
