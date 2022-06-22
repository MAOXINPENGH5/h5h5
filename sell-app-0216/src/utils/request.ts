/* ajax工具函数 */
import axios from 'axios'
//创建一个实例
const instance = axios.create({
    baseURL: '', //默认请地址
    timeout: 10000, //默认超时时间
})

//请求拦截器
instance.interceptors.request.use(
    (config) => {
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

//响应拦截器
instance.interceptors.response.use(
    (response) => {
        return response
    },
    (err) => {
        return Promise.reject(err)
    }
)

//导出实例
export default instance
