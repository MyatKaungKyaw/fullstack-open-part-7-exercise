import axios from 'axios'
const baseUrl = '/api/login'

const validateUser = async credentials => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}

const login = { validateUser }

export default login