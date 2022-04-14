import axios from 'axios'

const api = axios.create()

api.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:8000/api/v1/'


api.interceptors.request.use((config)=>{
  const token = localStorage.getItem("token")
  if(token){
    if(config.headers)
    config.headers["authorization"] = `Bearer ${token}`
    else
    config.headers = {
      authorization: `Bearer ${token}`
    }
  }
  //console.log(config)
  return config;
})

api.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default api

export const swrFetcher = async (url: any, init: any) => {
  const res = await api.get(url)
  return res.data
}
