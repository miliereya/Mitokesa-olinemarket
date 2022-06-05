import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { userAPI } from '../../api'
import s from './Account.module.css'
import { Signup } from './signup'

export const Account = () => {
    const [user, setUser] = useState(false)
    const [hash, setHash] = useState(localStorage.getItem("hash"))

    const nav = useNavigate()
    

    useEffect(() => {
        if(hash){
            const fetchData = async () => {
                try {
                    const data = await userAPI.getUserByHash({hash})
                    if(data[0] === 'Hash is on date!') { 
                        setUser(data[1])
                    }
                } catch (e) {
                    console.log(e)
                }
            }   
            fetchData()
        }
    }, [hash])

    const hashHanlder = (hash) => {
        setHash(hash)
        localStorage.setItem('hash', hash)
        if(hash==='') {
            setUser(false)
        }
    }
    
    return (
        <section className={s.section}>
            {user===false ? <Signup hashHanlder={hashHanlder} /> : (
                <div>
                    <h2 className={s.heading}>Acconut {user.name}</h2>
                    <div className={s.wrapper}>
                        <p className={s.key}>Mail</p>
                        <p className={s.value}>{user.mail}</p>
                    </div>
                    <NavLink
                        to="/cart"
                        className={s.link}
                    >
                        Go to cart
                    </NavLink>
                    <button onClick={() => hashHanlder('')} className={s.logout}>Log out</button>
                </div>
            )
            }
        </section>
    )
}
