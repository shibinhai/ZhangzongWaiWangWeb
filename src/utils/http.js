import axios from 'axios'
axios.defaults.timeout = 500000
axios.defaults.baseURL = 'http://124.115.223.204:9502'
axios.defaults.withCredentials = true// 跨域时如果要带上cookie话则需要设置withCrendentials
/**
 *  封装get方法 跟 post 方法
 *  @param url
 *  @param params
 *  @returns {Promise}
 */

export default {
  install: (Vue) => {
    Vue.prototype.$get = (url, params = {}, header) => {
      return new Promise((resolve, reject) => {
        axios.get(url, {params}, header)
          .then(response => resolve(response.data))
          .catch(error => reject(error))
      })
    }
    Vue.prototype.$post = (url, params = {}) => {
      return new Promise((resolve, reject) => {
        axios.post(url, params)
          .then(response => resolve(response.data))
          .catch(error => reject(error))
      })
    }
  }
}
