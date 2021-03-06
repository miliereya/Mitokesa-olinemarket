import { NavLink } from 'react-router-dom'
import s from './NavBar.module.css'
import searchIcon from '../../img/search_icon.png'
import { useEffect, useRef, useState } from 'react'
import { productsAPI } from '../../api'
import { spaceSplit } from '../../util'

export const NavBar = () => {
    const [popup, setPopup] = useState('none')
    const [searchBack, setSearchback] = useState('#f7f6f5')
    const [search, setSearch] = useState('')
    const [catalog, setCatalog] = useState([])
    const inputEl = useRef(null)

    const popupHandler = () => {
        return popup==='none' ? (
            setPopup('flex'), setSearchback('#e4e3e2')
        ) : (setPopup('none') , setSearchback('#f7f6f5'))
        
    }
    const refHandler = () => {
        inputEl.current.focus();
    }

    useEffect(()=> {
        if(search.length>2) {
            const fetchData = async () => {
                try {
                    const data = await productsAPI.getProducts({
                        name: search
                    })
                    setCatalog(data)
                } catch (e) {
                    console.log(e)
                }
            }
            fetchData()
        } else {
            setCatalog([])
        }
    },[search])

    return (
        <div>
            <header className={s.header}>
                <div className={s.name}>MIKOTESA</div>
                <div className={s.wrapper}>
                    <NavLink
                        className={s.link}
                        to="catalog/woman"
                    >
                        Woman
                    </NavLink>
                    <NavLink
                        className={s.link}
                        to="catalog/man"
                    >
                        Man
                    </NavLink>
                    <button
                        style={{backgroundColor: searchBack}}
                        onClick={()=>{popupHandler();refHandler()}}
                        className={s.link}>
                            <img
                                className={s.search_icon}
                                src={searchIcon}
                                alt="search icon"
                            />
                        Search
                    </button>
                    <div ref={inputEl} style={{display: popup}} className={s.search_container}>
                        <input
                            className={s.search_input}
                            type="text"
                            placeholder='Type here...'
                            onInput={e=>setSearch(e.target.value)}
                            value={search}
                        />
                        <div className={s.product_list}>
                            {catalog.map(product => {
                                let {_id, img, name, collectionType} = product

                                const pathname = '../catalog/' + collectionType + '/' + name 
                                return (
                                    <NavLink 
                                        key={_id} 
                                        to={pathname} 
                                        className={s.product}
                                    >
                                        <img className={s.img} src={img} alt={name} />
                                        <p className={s.info}>{spaceSplit(name)} / {spaceSplit(collectionType)}</p>
                                    </NavLink>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className={s.wrapper}>
                    <NavLink
                        className={s.link}
                        to="account"
                    >
                        Account
                    </NavLink>
                    <NavLink
                        className={s.link}
                        to="blog"
                    >
                        Blog
                    </NavLink>
                    <NavLink
                        className={s.link}
                        to="cart"
                    >
                        Cart
                    </NavLink>
                </div>
            </header>
            <div className={s.header_padding}></div>
        </div>
    )
}
