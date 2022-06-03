import axios from "axios"

export const userAPI = {
    addUser(user) {
        return axios.post('http://localhost:5000/user/add', user)
        .then(res => res.data)
    },
    getUser(mail) {
        return axios.get(`http://localhost:5000/user/get?mail=${mail}`)
        .then(res => res.data)
    },
    getUserByHash(hash) {
        return axios.post('http://localhost:5000/user/hash', hash)
        .then(res => res.data)
    },
    logUser(user) {
        return axios.post('http://localhost:5000/user/log', user)
        .then(res => res.data)
    }
}