import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { productsAPI } from '../../api'
import { spaceSplit } from '../../util'
import s from './Product.module.css'

export const Product = () => {
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)

    const params = useParams()
    const nav = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await productsAPI.getProduct({
                    name: params.name,
                    collectionType: params.collection
                })
                if(data.data===null){
                    nav('../catalog')
                }
                setProduct(data.data)
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    },[params])

    return (
        <div className={s.section}>
            {loading===true ? (
                <div className={s.loading}>
                    Loading
                </div>
            ) : ( <div className={s.wrapper}>
                    <div className={s.img}></div>
                    <div className={s.info}>
                        <h2 className={s.name}>{spaceSplit(product.name)}<span>{product.price} €</span></h2>
                        <p className={s.type}>Type: {product.type}</p>
                        <p className={s.type}>Collection: {spaceSplit(product.collectionType)}</p>
                        <div className={s.divider}></div>
                        <p className={s.description}>{product.description}</p>
                        <p className={s.stock}>In stock: {product.stock}</p>
                        <button className={s.btn}>Add to cart</button>
                    </div>
                </div>
            )}
        </div>
    )
}