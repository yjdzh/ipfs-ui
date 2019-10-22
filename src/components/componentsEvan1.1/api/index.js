// 统一请求路径前缀在util/axios.js中修改
import { getRequest, postRequest, putRequest, deleteRequest, uploadFileRequest } from '../util/axios';


// upload API
export const uploadUrl = "http://10.18.13.8:8090/yyf"
// 文件上传接口



// demoForm
export const demoFormAddSubmit = (params) => {
    return postRequest('/login', params)
}
// 提交表单数据

export const demoFormEditOpen = (params) => {
    return getRequest('/common/ip/info', params)
}
// 获取编辑页数据

export const demoFormEditSubmit = (params) => {
    return putRequest('/user/edit', params)
}
// 提交编辑页数据

export const demoForm1validate = (email, params) => {
    return getRequest(`/email/sendCode/${email}`, params)
}
// 表单输入1校验

export const demoForm2validate = (params) => {
    return getRequest('/email/editEmail', params)
}
// 表单输入2校验

export const demoForm3upload = (params) => {
    return uploadFileRequest('/email/editEmail', params)
}
// 表单3文件上传





// demoList
export const githubLogin = (params) => {
    return getRequest('/social/github/login', params)
}
// 获取列表数据（刷新列表）

export const qqLogin = (params) => {
    return deleteRequest('/social/qq/login', params)
}
// 删除列表某项




