import { NavLink } from 'react-router-dom'
import s from './NavBar.module.css'
import searchIcon from '../../img/search_icon.png'

export const NavBar = () => {
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
                    <button className={s.link}><img className={s.search_icon} src={searchIcon} alt="search icon" />Search</button>
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