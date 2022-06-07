import axios from "axios"

export const productsAPI = {
    getProducts({name='', type='', sex='', collectionType='', sort='Alphabetically, A-Z'}) {
        return axios.get(`http://localhost:5000/products/get?name=${name}&type=${type}&sex=${sex}&collectionType=${collectionType}&sort=${sort}`)
        .then(res => res.data)
    },
    getProduct({name, collectionType}) {
        return axios.get(`http://localhost:5000/products/product?name=${name}&collectionType=${collectionType}`)
    },
}