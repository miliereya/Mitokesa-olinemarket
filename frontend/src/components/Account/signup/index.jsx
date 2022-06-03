import { useEffect, useState } from 'react'
import { userAPI } from '../../../api'
import s from '../Account.module.css'

export const Signup = ({hashHanlder}) => {
    //Sing in
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [logUser, setLogUser] = useState('')
    const [error, setError] = useState('')

    //Sign up
    const [newMail, setNewMail] = useState('')
    const [newName, setName] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [newUser, setNewUser] = useState('')
    const [newError, setNewError] = useState('')

    useEffect(() => {
        if(logUser!==''){
            const fetchData = async () => {
                try {
                    const data = await userAPI.logUser(logUser)
                    if(data[0] === 'logged') {
                        localStorage.setItem('hash', data[1])
                        hashHanlder(data[1])
                    } else {
                        setError('Wrong Данные')
                        setLogUser('')
                        setPassword('')
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            fetchData()
        }
    },[logUser])

    useEffect(() => {
        if(newUser!==''){
            const fetchData = async () => {
                try {
                    const data = await userAPI.addUser(newUser)
                    if(data==='Used mail') {
                        setNewError('Email is already used!')
                        setNewUser('')
                    } else {
                        localStorage.setItem('hash', data.hash)
                        hashHanlder(data.hash)
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            fetchData()
        }
    },[newUser])

    const mailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    const logHandler = () => {
        if(!mail.match(mailReg)){
            setError('Invalid mail!')
        } else {
            setLogUser({
                mail: mail,
                password: password
            })  
        }
    }

    const signupHandler = () => {
        if(!newMail.match(mailReg)){
            setNewError('Invalid mail!')
        }
        else if(newPassword!==repeatPassword) {
            setNewError("Passwords are different")
        }
        else if(!document.getElementById('terms').checked) {
            setNewError("Accept all terms!")
        } 
        else {
            setNewUser({
                mail: newMail,
                name: newName,
                password: newPassword
            })
            setNewError('')
        }
    }

    return (
        <section className={s.sign}>
            <div className={s.form}>
                <h2 className={s.heading}>Sign In</h2>
                <input
                    className={s.input}
                    value={mail} 
                    type="text" 
                    placeholder='Email address'
                    onChange={(e)=>setMail(e.target.value)}
                    required
                />
                <input
                    className={s.input}
                    value={password} 
                    type="password" 
                    placeholder='Password'
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    minLength={8}
                />
                <button onClick={logHandler} className={s.link}>Sign In</button>
                <p className={s.error}>{error}</p>
            </div>
            <div className={s.form}>
                <h2 className={s.heading}>Sign Up</h2>
                <input
                    className={s.input}
                    value={newMail} 
                    type="text" 
                    placeholder='Email address*'
                    onChange={(e)=>setNewMail(e.target.value)}
                />
                <input
                    className={s.input}
                    value={newName} 
                    type="text" 
                    placeholder='Name*'
                    onChange={(e)=>setName(e.target.value)}
                    required
                    minLength={3}
                />
                <input
                    className={s.input}
                    value={newPassword} 
                    type="password" 
                    placeholder='Password*'
                    onChange={(e)=>setNewPassword(e.target.value)}
                    required
                    minLength={8}
                />
                <input
                    className={s.input}
                    value={repeatPassword} 
                    type="password" 
                    placeholder='Password again*'
                    onChange={(e)=>setRepeatPassword(e.target.value)}
                    required
                    minLength={8}
                />
                <div>
                <input id='terms' name='terms' type="checkbox" />
                <label htmlFor="terms">I promise to take this guy on a job</label>
                </div>
                <button onClick={signupHandler} className={s.link}>Sign In</button>
                <p className={s.error}>{newError}</p>
            </div>
        </section>
    )
}