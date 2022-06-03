import axios from "axios"

export const postsAPI = {
    getPosts() {
        return axios.get('http://localhost:5000/posts/get')
        .then(res => res.data)
    }
}