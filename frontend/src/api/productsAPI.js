import axios from "axios"

export const productsAPI = {
    getProducts({name='', type='', sex='', collectionType=''}) {
        return axios.get(`http://localhost:5000/products/get?name=${name}&type=${type}&sex=${sex}&collectionType=${collectionType}`)
        .then(res => res.data)
    },
    getProduct(id) {
        return axios.get('http://localhost:5000/products/id' + id)
    },
}