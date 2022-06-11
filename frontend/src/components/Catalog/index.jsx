import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { productsAPI } from '../../api'
import { spaceSplit } from '../../util'
import s from './Catalog.module.css'
import arrow from '../../img/arrow.png'


export const Catalog = () => {
    window.scrollTo({top:0})

    const params = useParams()

    const [catalog, setCatalog] = useState([])
    const [sort, setSort] = useState('Alphabetically, A-Z')
    const [popup, setPopup] = useState('none')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await productsAPI.getProducts({
                    sex: params.sex,
                    sort: sort
                })
                setCatalog(data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    },[sort, params])

    const sortHandler = sort => {
        setPopup('none')
        setSort(sort)
    }

    const popupHandler = () => {
        popup==='none' ? setPopup('flex') : setPopup('none')
    }

    return (
        <section className={s.section}>
            <h2 className={s.heading}>New arrivals</h2>
            <p className={s.sub_heading}>Discover the latest arrivals on Nanushka.com, new-season pieces that explore our long-standing values of refined minimalism, comfort and functionality in timeless yet modern ways.</p>
            <button onClick={()=>popupHandler()} className={s.params}>Sort by <img className={s.arrow} src={arrow} alt="arrow" /></button>
            <div className={s.sort_popup} style={{display: popup}} >
                <button onClick={() => sortHandler('Alphabetically, A-Z')} className={s.sort_button}>Alphabetically, A-Z</button>
                <button onClick={() => sortHandler('Alphabetically, Z-A')} className={s.sort_button}>Alphabetically, Z-A</button>
                <button onClick={() => sortHandler('Price low to high')} className={s.sort_button}>Price low to high</button>
                <button onClick={() => sortHandler('Price high to low')} className={s.sort_button}>Price high to low</button>
            </div>
            <div className={s.catalog}>
                {catalog.map(product => {
                    let {_id, img, name, type, collectionType, price} = product

                    const pathname = '../catalog/' + collectionType + '/' + name

                    return (
                        <Link className={s.product} key={_id} to={pathname}>
                            <img className={s.img} src={img} alt={name} />
                            <div className={s.info_container}>
                                <div className={s.name_price_wrapper}>
                                    <p className={s.name}>{spaceSplit(name)}</p>
                                    <p className={s.price}>{price} EUR</p>
                                </div>
                                <p className={s.type}>{type} / {spaceSplit(collectionType)}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
