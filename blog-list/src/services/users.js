import axios from "axios";
const baseUrl = '/api/users'

const getAll = () => axios.get(baseUrl).then(res => res.data)

const users = {getAll}

export default users