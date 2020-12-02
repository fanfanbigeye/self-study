import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.cat-shop.penkuoer.com',
  timeout: 5000,
})

// 请求拦截
instance.interceptors.request.use(
  function(config) {
    console.group('全局请求拦截')  // 分组展示
    console.log(config)
    console.groupEnd()
    config.headers.token = '123456'
    return config
  }
)

//响应拦截
instance.interceptors.response.use(
  function(response) {
    console.group('全局响应拦截')
    console.log(response)
    console.groupEnd()
    
    return response
  }
)

export function get(url, params) {
  return instance.get(url, {
    params
  })

}

export function post(url, data) {
  return instance.post(url, data)
}

export function del(url) {
  return instance.delete(url)
}

export function put(url, data) {
  instance.put(url, data)
}
