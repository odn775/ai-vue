import axios from 'axios'
import { ElMessage } from 'element-plus'
 
const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})
//请求拦截器
service.interceptors.request.use(
    // 在发送请求之前做些什么
    
    config => {
        const token = localStorage.getItem('token')
        if (token){
            config.headers['token'] = token
        }
        return config
    },
    // 对请求错误做些什么
    error => {
        return Promise.reject(error)
        
    }

)

//响应拦截器
service.interceptors.response.use(
    // 对响应数据做点什么
    response => {
        const {data,config} = response
        console.log('响应数据:', {
            url: config.url,
            code: data.code,
            msg: data.msg
        })
        
        //处理业务状态码
        if(data.code === '200' || data.code === 200){
            return data.data
        }else if(data.code ==='-1' || data.code === -1){
            if(!config.url?.includes('/login')){
                ElMessage.error(data.msg || '登录过期，请重新登录')
                //清除登录信息
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')
                window.location.href = '/auth/login'
            }
            return Promise.reject(data.msg || '未登录')
        }else{
            ElMessage.error(data.msg || '请求失败')
            return Promise.reject('网络请求失败...')
        }
    },
    // 对响应错误做点什么
    (error) => {
        console.error('请求错误:', error)
        ElMessage.error('网络请求失败，请稍后重试')
        return Promise.reject(error)
    }
)


export default service