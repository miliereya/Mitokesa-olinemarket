import { NavLink } from 'react-router-dom'
import s from './NavBar.module.css'
import searchIcon from '../../img/search_icon.png'
import { useEffect, useState } from 'react'
import { productsAPI } from '../../api'

export const NavBar = () => {
    const [popup, setPopup] = useState('none')
    const [searchBack, setSearchback] = useState('#f7f6f5')
    const [search, setSearch] = useState('')
    const [catalog, setCatalog] = useState([])

    const popupHandler = () => {
        popup==='none' ? (
            setPopup('flex'), setSearchback('#e4e3e2')
        ) : (setPopup('none') , setSearchback('#f7f6f5'))
    }

    useEffect(()=> {
        if(search.length>2) {
            const fetchData = async () => {
                try {
                    const data = await productsAPI.getProducts({
                        name: search
                    })
                    console.log(data)
                } catch (e) {
                    console.log(e)
                }
            }
            fetchData()
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
                        onClick={()=>popupHandler()} 
                        className={s.link}>
                            <img 
                                className={s.search_icon} 
                                src={searchIcon} 
                                alt="search icon" 
                            />
                        Search
                    </button>
                    <div style={{display: popup}} className={s.search_container}>
                        <input 
                            className={s.search_input} 
                            type="text" 
                            placeholder='Type here...'
                            onInput={e=>setSearch(e.target.value)}
                            value={search}
                        />
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