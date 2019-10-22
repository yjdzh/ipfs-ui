import axios from 'axios'
import {router} from '@/router'

axios.defaults.baseURL = '/api'

const interceptor = axios.interceptors.response.use(
    (res) => {
        return res
    },
    (err) => {
        if (err && err.response) {
            switch (err.response.status) {
                case 401:
                    router.replace({
                        name: 'error401'
                    })
                    break
                case 404:
                    router.replace({
                        name: 'error404'
                    })
                    break
                case 500:
                    router.replace({
                        name: 'error500'
                    })
                    break
            }
        }
    }
)

export default interceptor
