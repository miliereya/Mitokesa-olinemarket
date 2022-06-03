import axios from "axios"

export const cartAPI = {
    createCart(userId) {
        return axios.post('http://localhost:5000/cart/create', userId)
        .then(res => res.data)
    },
    getCart(userId) {
        return axios.get(`http://localhost:5000/cart/get?userId=${userId}`)
        .then(res => res.data)
    },
    updateCart(data) {
        return axios.post('http://localhost:5000/cart/update', data)
        .then(res => res.data)
    }
}
