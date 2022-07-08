import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { productsAPI } from '../../api'
import {useLocalStorage} from "../../hooks/useLocalStorage.hook";
import { spaceSplit } from '../../util'
import s from './Product.module.css'

export const Product = () => {
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useLocalStorage('cart', [])
    const [color, setColor] = useState('#1e1e20')

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

    const addProductCart = () => {
        setColor('gray')
        const findProductCart = cart.find(p => p.name === product.name)
        if (findProductCart) return

        const productToCart = {
            img: product.img,
            name: product.name,
            price: product.price,
            stock: product.stock,
            size: product.size,
            quantity: 1,
            collectionType: product.collectionType
        }
        setCart([...cart, productToCart])
    }

    return (
        <div className={s.section}>
            {loading===true ? (
                <div className={s.loading}>
                    Loading
                </div>
            ) : ( <div className={s.wrapper}>
                    <img className={s.img} src={product.img} alt={product.name} />
                    <div className={s.info}>
                        <h2 className={s.name}>{spaceSplit(product.name)}<span>{product.price} €</span></h2>
                        <p className={s.type}>Type: {product.type}</p>
                        <p className={s.type}>Collection: {spaceSplit(product.collectionType)}</p>
                        <div className={s.divider}></div>
                        <p className={s.description}>{product.description}</p>
                        <p className={s.stock}>In stock: {product.stock}</p>
                        <button style={{backgroundColor: color}} className={s.btn} onClick={addProductCart}>Add to cart</button>
                    </div>
                </div>
            )}
        </div>
    )
}
