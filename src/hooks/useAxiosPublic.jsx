import axios from 'axios'

const axiosPublic =  axios.create({
    baseURL: 'https://edteksmartboard-appserver.onrender.com',
  })

const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic;