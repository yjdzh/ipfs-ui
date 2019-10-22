import Vue from 'vue'
import {router} from './router'
import {appRouter} from './router/router'
import axios from 'axios'
import vueAxios from 'vue-axios'
import App from './App'
import iView from 'iview'
import 'babel-polyfill'


import '@/common/css/reset.less'
import 'iview/dist/styles/iview.css'
import '@/common/iconfont/iconfont.css'
import '@/common/css/animate.less'
import '@/common/css/common.less'
import '@/common/css/evan.less'
import '@/common/css/style.css'
import interceptor from './common/interceptor'
import Global from '@/common/js/global.js'
import Regex from '@/common/js/regex.js'


import '../node_modules/jsoneditor/dist/jsoneditor.min.css'
import Print from '@/components/componentsEvan1.1/newEvan1.1/print'
import jsoneditor from '../node_modules/jsoneditor/dist/jsoneditor.min.js'

Vue.prototype.JSONeditor = jsoneditor

import '@/components/componentsEvan1.1/css/evanStyle.less'
import '@/components/componentsEvan1.1'

import '../static/ueditor/ueditor.config.js'
import '../static/ueditor/ueditor.all.js'
import '../static/ueditor/lang/zh-cn/zh-cn.js'
import '../static/ueditor/ueditor.parse.min.js'

Vue.use(Print)

Vue.prototype.Global = Global
Vue.prototype.Regex = Regex

Vue.use(vueAxios, axios)
Vue.use(iView)

Vue.config.productionTip = false

Vue.prototype.$Message.config({
    top: 100,
    duration: 2.5
});

new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
