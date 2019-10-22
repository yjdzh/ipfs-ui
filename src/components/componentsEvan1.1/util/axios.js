import axios from 'axios';
import { Message } from 'iview';
import {router} from '@/router'
// 统一请求路径前缀
let access_token = 'access_token=' + JSON.parse(sessionStorage.getItem('wtcp-user-token'));
// 超时设定
axios.defaults.timeout = 15000;

axios.interceptors.request.use(config => {
    return config;
}, err => {
    Message.error('请求超时');
    return Promise.resolve(err);
});

// http response 拦截器
axios.interceptors.response.use(response => {
    const data = response.data;

    // 根据返回的code值来做不同的处理(和后端约定)
    switch (data.code) {
        case 401:
            if (data.message !== null) {
                Message.error('401'+data.message);
            } else {
                Message.error("401 未知错误");
            }
            router.replace({
            name: 'Error401'
        })
            break;
        case 403:
            // 没有权限
            if (data.message !== null) {
                Message.error('403'+data.message);
            } else {
                Message.error("403 未知错误");
            }
            break;
        case 500:
            // 错误
            if (data.message !== null) {
                Message.error('500'+data.message);
            } else {
                Message.error("500 未知错误");
            }
            break;
        default:
            return data;
    }

    return data;
}, (err) => {
    // 返回状态码不为200时候的错误处理
    Message.error(err.toString());
    return Promise.resolve(err);
});

export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${url}${access_token}`,
        params: params,
        
    });
};

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${url}${access_token}`,
        data: params,
        
    });
};

export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${url}${access_token}`,
        data: params,
        
    });
};

export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${url}${access_token}`,
        params: params,
        
    });
};


export const uploadFileRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${url}${access_token}`,
        params: params,
        headers: {
        
        }
    });
};
