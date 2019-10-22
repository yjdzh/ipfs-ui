import Vue from 'vue'




import EVpage_form from '@/components/componentsEvan1.1/newEvan1.1/newEvanPage_form'
Vue.component('EVpageForm', EVpage_form)
// import EVpage_tabForm from '@/components/componentsEvan1.1/newEvan1.1/newEvanPage_tabForm'
// Vue.component('EVpageTabForm', EVpage_tabForm)
import EVpage_list from '@/components/componentsEvan1.1/newEvan1.1/newEvanPage_list'
Vue.component('EVpageList', EVpage_list)



import EVdivider from '@/components/componentsEvan1.1/newEvan1.1/newEvan_divider'
Vue.component('EVdivider', EVdivider)
import EVinputNumber from '@/components/componentsEvan1.1/newEvan1.1/newEvan_inputNumber'
Vue.component('EVinputNumber', EVinputNumber)
import EVtags from '@/components/componentsEvan1.1/newEvan1.1/newEvan_tags'
Vue.component('EVtags', EVtags)
import EVupload from '@/components/componentsEvan1.1/newEvan1.1/newEvan_upload'
Vue.component('EVupload', EVupload)


import EVupload2 from '@/components/componentsEvan1.1/newEvan1.1/newEvan_upload2'
Vue.component('EVupload2', EVupload2)



import jsoneditor from '@/components/componentsEvan1.1/newEvan1.1/jsoneditor'
Vue.component('jsoneditor', jsoneditor)

import evtab from '@/components/componentsEvan1.1/newEvan1.1/table/table'
Vue.component('evtab', evtab)

import EVitemContainer from '@/components/componentsEvan1.1/newEvan1.1/newEvan_itemContainer'
Vue.component('EVitemContainer', EVitemContainer)
import EVueDitor from '@/components/componentsEvan1.1/newEvan1.1/newEvan_ueDitor'
Vue.component('EVueDitor', EVueDitor)


import EVselectTree from '@/components/componentsEvan1.1/newEvan1.1/newEvan_selectTree'
Vue.component('EVselectTree', EVselectTree)
// import EVauthTree from '@/components/componentsEvan1.1/newEvan1.1/newEvan_authTree'
// Vue.component('EVauthTree', EVauthTree)
// import EVexpandTree from '@/components/componentsEvan1.1/newEvan1.1/newEvan_expandTree'
// Vue.component('EVexpandTree', EVexpandTree)

import Global from '@/common/js/global.js'
import Regex from '@/common/js/regex.js'
//
//
//
Vue.prototype.Global = Global
Vue.prototype.Regex = Regex
