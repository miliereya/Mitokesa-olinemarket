import { useEffect, useState } from "react"
import { cartAPI, postsAPI, productsAPI, userAPI } from "./api"

export const Test = () => {
    const [log, setLog] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await productsAPI.getProducts({sex: "man"})
                console.log(data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    },[log])

    return (
        <div>
            <button onClick={()=>setLog(true)}>
                API button
            </button>
        </div>
    )
}